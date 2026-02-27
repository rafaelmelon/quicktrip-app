import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { getRoute } from "../../src/services/routes";
import { createNote, deleteNote } from "../../src/services/notes";
import { Button } from "../../src/components/Button";
import { colors, spacing, fontSize, borderRadius } from "../../src/constants/theme";

export default function RouteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [noteText, setNoteText] = useState("");

  const { data: route, isLoading } = useQuery({
    queryKey: ["route", id],
    queryFn: () => getRoute(id),
    enabled: !!id,
  });

  const addNoteMutation = useMutation({
    mutationFn: () => createNote(id, noteText.trim()),
    onSuccess: () => {
      setNoteText("");
      queryClient.invalidateQueries({ queryKey: ["route", id] });
    },
    onError: (err: Error) => Alert.alert("Error", err.message),
  });

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["route", id] }),
  });

  if (isLoading || !route) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const allCoords = [
    { latitude: route.originLat, longitude: route.originLng },
    ...route.stops.map((s) => ({ latitude: s.lat, longitude: s.lng })),
    { latitude: route.destinationLat, longitude: route.destinationLng },
  ];

  const hours = Math.floor(route.estimatedMinutes / 60);
  const mins = route.estimatedMinutes % 60;
  const duration = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: route.originLat,
            longitude: route.originLng,
            latitudeDelta: 0.06,
            longitudeDelta: 0.06,
          }}
          scrollEnabled={false}
        >
          <Marker
            coordinate={{
              latitude: route.originLat,
              longitude: route.originLng,
            }}
            title={route.originName}
            pinColor={colors.success}
          />
          <Marker
            coordinate={{
              latitude: route.destinationLat,
              longitude: route.destinationLng,
            }}
            title={route.destinationName}
            pinColor={colors.error}
          />
          {route.stops.map((stop) => (
            <Marker
              key={stop.id}
              coordinate={{ latitude: stop.lat, longitude: stop.lng }}
              title={stop.name}
              pinColor={colors.primary}
            />
          ))}
          {allCoords.length > 1 && (
            <Polyline
              coordinates={allCoords}
              strokeColor={colors.primary}
              strokeWidth={3}
            />
          )}
        </MapView>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{route.name}</Text>

        <View style={styles.badges}>
          <View style={styles.badge}>
            <Ionicons name="time-outline" size={14} color={colors.primary} />
            <Text style={styles.badgeText}>{duration}</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons
              name="navigate-outline"
              size={14}
              color={colors.primary}
            />
            <Text style={styles.badgeText}>{route.stops.length} stops</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons name="pricetag-outline" size={14} color={colors.primary} />
            <Text style={styles.badgeText}>{route.category}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Route</Text>
          <View style={styles.routePoint}>
            <Ionicons name="radio-button-on" size={16} color={colors.success} />
            <Text style={styles.routeText}>{route.originName}</Text>
          </View>
          {route.stops.map((stop, i) => (
            <View key={stop.id} style={styles.routePoint}>
              <Text style={styles.stopNumber}>{i + 1}</Text>
              <View>
                <Text style={styles.routeText}>{stop.name}</Text>
                <Text style={styles.routeSubtext}>{stop.address}</Text>
              </View>
            </View>
          ))}
          <View style={styles.routePoint}>
            <Ionicons name="flag" size={16} color={colors.error} />
            <Text style={styles.routeText}>{route.destinationName}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>

          <View style={styles.noteInput}>
            <TextInput
              style={styles.textInput}
              placeholder="Write a note about this route..."
              placeholderTextColor={colors.textSecondary}
              multiline
              value={noteText}
              onChangeText={setNoteText}
            />
            <Button
              title="Add"
              onPress={() => addNoteMutation.mutate()}
              disabled={!noteText.trim()}
              loading={addNoteMutation.isPending}
              style={styles.addBtn}
            />
          </View>

          {route.notes?.map((note) => (
            <View key={note.id} style={styles.noteCard}>
              <Text style={styles.noteContent}>{note.content}</Text>
              <View style={styles.noteFooter}>
                <Text style={styles.noteDate}>
                  {new Date(note.createdAt).toLocaleDateString()}
                </Text>
                <TouchableOpacity
                  onPress={() => deleteNoteMutation.mutate(note.id)}
                  hitSlop={8}
                >
                  <Ionicons
                    name="trash-outline"
                    size={16}
                    color={colors.error}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {(!route.notes || route.notes.length === 0) && (
            <Text style={styles.emptyNotes}>
              No notes yet. Share your experience!
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: colors.textSecondary,
  },
  mapContainer: {
    height: 220,
  },
  map: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  name: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.primaryLight + "15",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  badgeText: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderLeftWidth: 2,
    borderLeftColor: colors.border,
    paddingLeft: spacing.md,
    marginLeft: 7,
  },
  stopNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    color: "#fff",
    textAlign: "center",
    lineHeight: 22,
    fontSize: fontSize.xs,
    fontWeight: "700",
    overflow: "hidden",
  },
  routeText: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: "500",
  },
  routeSubtext: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  noteInput: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fontSize.sm,
    color: colors.text,
    minHeight: 48,
  },
  addBtn: {
    minHeight: 48,
    paddingHorizontal: spacing.md,
  },
  noteCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  noteContent: {
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: 20,
  },
  noteFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.sm,
  },
  noteDate: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  emptyNotes: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: spacing.lg,
  },
});
