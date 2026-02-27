import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, fontSize, borderRadius } from "../../src/constants/theme";
import { Button } from "../../src/components/Button";
import { useAuthStore } from "../../src/stores/auth.store";

const DEFAULT_REGION: Region = {
  latitude: 41.387,
  longitude: 2.17,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function ExploreScreen() {
  const user = useAuthStore((s) => s.user);
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region>(DEFAULT_REGION);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
      setUserLocation(coords);
      setRegion({ ...coords, latitudeDelta: 0.04, longitudeDelta: 0.04 });
    })();
  }, []);

  function goToMyLocation() {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        { ...userLocation, latitudeDelta: 0.02, longitudeDelta: 0.02 },
        600
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>
          Hello, <Text style={styles.username}>{user?.username}</Text>
        </Text>
        <Text style={styles.hint}>Explore the map to plan your next trip</Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={region}
          showsUserLocation
          showsMyLocationButton={false}
          mapType={Platform.OS === "ios" ? "mutedStandard" : "standard"}
        >
          {userLocation && (
            <Marker
              coordinate={userLocation}
              title="You are here"
            >
              <View style={styles.marker}>
                <Ionicons name="navigate" size={18} color="#fff" />
              </View>
            </Marker>
          )}
        </MapView>

        <View style={styles.mapOverlay}>
          <Button
            title="My Location"
            variant="outline"
            onPress={goToMyLocation}
            style={styles.locationBtn}
          />
        </View>
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={20} color={colors.warning} />
        <Text style={styles.tipText}>
          Go to "My Routes" tab to create and save travel routes with stops along the way.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  greeting: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  greetingText: {
    fontSize: fontSize.xl,
    color: colors.text,
  },
  username: {
    fontWeight: "700",
  },
  hint: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  mapContainer: {
    flex: 1,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  mapOverlay: {
    position: "absolute",
    bottom: spacing.md,
    right: spacing.md,
  },
  locationBtn: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 40,
  },
  marker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    margin: spacing.md,
    marginTop: 0,
    padding: spacing.md,
    backgroundColor: colors.warning + "12",
    borderRadius: borderRadius.md,
  },
  tipText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
  },
});
