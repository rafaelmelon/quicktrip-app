import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useAuthStore } from "../../src/stores/auth.store";
import { Button } from "../../src/components/Button";
import { colors, spacing, fontSize, borderRadius } from "../../src/constants/theme";

const GOOGLE_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY || "";

interface LocationData {
  name: string;
  lat: number;
  lng: number;
}

export default function ExploreScreen() {
  const user = useAuthStore((s) => s.user);

  const [origin, setOrigin] = useState<LocationData | null>(null);
  const [destination, setDestination] = useState<LocationData | null>(null);
  const [departureTime, setDepartureTime] = useState(() => {
    const d = new Date();
    d.setMinutes(0, 0, 0);
    d.setHours(d.getHours() + 1);
    return d;
  });
  const [arrivalTime, setArrivalTime] = useState(() => {
    const d = new Date();
    d.setMinutes(0, 0, 0);
    d.setHours(d.getHours() + 4);
    return d;
  });
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  function handleDepartureChange(_: DateTimePickerEvent, date?: Date) {
    setShowDeparturePicker(Platform.OS === "ios");
    if (date) setDepartureTime(date);
  }

  function handleArrivalChange(_: DateTimePickerEvent, date?: Date) {
    setShowArrivalPicker(Platform.OS === "ios");
    if (date) setArrivalTime(date);
  }

  function handlePlanRoute() {
    if (!origin || !destination) {
      Alert.alert("Missing info", "Please select both origin and destination");
      return;
    }
    if (arrivalTime <= departureTime) {
      Alert.alert("Invalid times", "Arrival must be after departure");
      return;
    }

    const diffMs = arrivalTime.getTime() - departureTime.getTime();
    const estimatedMinutes = Math.round(diffMs / 60000);

    router.push({
      pathname: "/route/plan",
      params: {
        originName: origin.name,
        originLat: origin.lat.toString(),
        originLng: origin.lng.toString(),
        destinationName: destination.name,
        destinationLat: destination.lat.toString(),
        destinationLng: destination.lng.toString(),
        departureTime: formatTime(departureTime),
        arrivalTime: formatTime(arrivalTime),
        estimatedMinutes: estimatedMinutes.toString(),
        transportMode: user?.transportMode || "walking",
        interests: (user?.interests || []).join(","),
      },
    });
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.greeting}>
        Plan your <Text style={styles.bold}>route</Text>
      </Text>
      <Text style={styles.subtitle}>
        Choose origin, destination, and time — we'll find the best stops for you
      </Text>

      <View style={styles.card}>
        <View style={styles.fieldHeader}>
          <Ionicons name="radio-button-on" size={16} color={colors.success} />
          <Text style={styles.fieldLabel}>Origin</Text>
        </View>
        <GooglePlacesAutocomplete
          placeholder="Where are you starting?"
          onPress={(data, details) => {
            if (details?.geometry) {
              setOrigin({
                name: data.description,
                lat: details.geometry.location.lat,
                lng: details.geometry.location.lng,
              });
            }
          }}
          query={{ key: GOOGLE_KEY, language: "en", types: "geocode" }}
          fetchDetails
          enablePoweredByContainer={false}
          styles={{
            textInput: styles.placeInput,
            listView: styles.placeList,
          }}
        />

        <TouchableOpacity
          style={styles.timeRow}
          onPress={() => setShowDeparturePicker(true)}
        >
          <Ionicons name="time-outline" size={18} color={colors.primary} />
          <Text style={styles.timeLabel}>Departure</Text>
          <Text style={styles.timeValue}>{formatTime(departureTime)}</Text>
        </TouchableOpacity>
        {showDeparturePicker && (
          <DateTimePicker
            value={departureTime}
            mode="time"
            minuteInterval={15}
            onChange={handleDepartureChange}
          />
        )}

        <View style={styles.divider} />

        <View style={styles.fieldHeader}>
          <Ionicons name="flag" size={16} color={colors.error} />
          <Text style={styles.fieldLabel}>Destination</Text>
        </View>
        <GooglePlacesAutocomplete
          placeholder="Where are you going?"
          onPress={(data, details) => {
            if (details?.geometry) {
              setDestination({
                name: data.description,
                lat: details.geometry.location.lat,
                lng: details.geometry.location.lng,
              });
            }
          }}
          query={{ key: GOOGLE_KEY, language: "en", types: "geocode" }}
          fetchDetails
          enablePoweredByContainer={false}
          styles={{
            textInput: styles.placeInput,
            listView: styles.placeList,
          }}
        />

        <TouchableOpacity
          style={styles.timeRow}
          onPress={() => setShowArrivalPicker(true)}
        >
          <Ionicons name="time-outline" size={18} color={colors.error} />
          <Text style={styles.timeLabel}>Arrival</Text>
          <Text style={styles.timeValue}>{formatTime(arrivalTime)}</Text>
        </TouchableOpacity>
        {showArrivalPicker && (
          <DateTimePicker
            value={arrivalTime}
            mode="time"
            minuteInterval={15}
            onChange={handleArrivalChange}
          />
        )}
      </View>

      {origin && destination && (
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Ionicons name={user?.transportMode === "walking" ? "walk" : user?.transportMode === "transit" ? "bus" : "car"} size={16} color={colors.primary} />
            <Text style={styles.summaryText}>
              {Math.round(
                (arrivalTime.getTime() - departureTime.getTime()) / 60000
              )}{" "}
              min available
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Ionicons name="star" size={16} color={colors.warning} />
            <Text style={styles.summaryText}>
              {user?.interests.join(", ")}
            </Text>
          </View>
        </View>
      )}

      <Button
        title="Find route & places"
        onPress={handlePlanRoute}
        disabled={!origin || !destination}
        style={styles.planBtn}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  greeting: {
    fontSize: fontSize.xxl,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  bold: {
    fontWeight: "800",
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  fieldHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  fieldLabel: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.text,
  },
  placeInput: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    fontSize: fontSize.sm,
    color: colors.text,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  placeList: {
    borderRadius: borderRadius.md,
    zIndex: 10,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  timeLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    flex: 1,
  },
  timeValue: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  summary: {
    marginTop: spacing.md,
    backgroundColor: colors.primary + "08",
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  summaryText: {
    fontSize: fontSize.sm,
    color: colors.text,
    textTransform: "capitalize",
  },
  planBtn: {
    marginTop: spacing.lg,
  },
});
