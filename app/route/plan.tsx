import { useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
  Image,
} from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoute } from "../../src/services/routes";
import { Button } from "../../src/components/Button";
import {
  colors,
  spacing,
  fontSize,
  borderRadius,
} from "../../src/constants/theme";
import type { RouteStop, TransportMode } from "../../src/types";

const { height: SCREEN_H } = Dimensions.get("window");
const MAP_HEIGHT = SCREEN_H * 0.42;

const MOCK_POIS: Omit<RouteStop, "id" | "routeId">[] = [
  {
    name: "Sagrada Família",
    address: "C/ de Mallorca, 401",
    lat: 41.4036,
    lng: 2.1744,
    position: 0,
    category: "architecture",
    rating: 4.8,
    description:
      "Antoni Gaudí's renowned unfinished basilica, under construction since 1882, with a striking façade and ornate interior.",
  },
  {
    name: "Park Güell",
    address: "Carrer d'Olot, 5",
    lat: 41.4145,
    lng: 2.1527,
    position: 1,
    category: "architecture",
    rating: 4.6,
    description:
      "Whimsical park designed by Gaudí featuring colorful mosaic work, unique stone structures, and city views.",
  },
  {
    name: "Casa Batlló",
    address: "Passeig de Gràcia, 43",
    lat: 41.3916,
    lng: 2.165,
    position: 2,
    category: "architecture",
    rating: 4.7,
    description:
      "Iconic Gaudí building with a skeletal façade, dragon-like roof, and imaginative interior design.",
  },
  {
    name: "Gothic Quarter",
    address: "Barri Gòtic, Barcelona",
    lat: 41.3833,
    lng: 2.1761,
    position: 3,
    category: "history",
    rating: 4.5,
    description:
      "Medieval neighborhood with narrow streets, historic buildings, and the Barcelona Cathedral.",
  },
];

export default function RoutePlanScreen() {
  const params = useLocalSearchParams<{
    originName: string;
    originLat: string;
    originLng: string;
    destinationName: string;
    destinationLat: string;
    destinationLng: string;
    departureTime: string;
    arrivalTime: string;
    estimatedMinutes: string;
    transportMode: string;
    interests: string;
  }>();

  const queryClient = useQueryClient();
  const mapRef = useRef<MapView>(null);
  const [selectedPoi, setSelectedPoi] = useState<number | null>(null);

  const originLat = parseFloat(params.originLat);
  const originLng = parseFloat(params.originLng);
  const destLat = parseFloat(params.destinationLat);
  const destLng = parseFloat(params.destinationLng);

  const stops = MOCK_POIS;

  const allCoords = useMemo(
    () => [
      { latitude: originLat, longitude: originLng },
      ...stops.map((s) => ({ latitude: s.lat, longitude: s.lng })),
      { latitude: destLat, longitude: destLng },
    ],
    [originLat, originLng, destLat, destLng, stops]
  );

  const saveMutation = useMutation({
    mutationFn: () =>
      createRoute({
        name: `${params.originName} → ${params.destinationName}`,
        category: (params.interests || "").split(",")[0] || "general",
        transportMode: (params.transportMode as TransportMode) || "walking",
        estimatedMinutes: parseInt(params.estimatedMinutes) || 180,
        departureTime: params.departureTime,
        arrivalTime: params.arrivalTime,
        originName: params.originName,
        originLat,
        originLng,
        destinationName: params.destinationName,
        destinationLat: destLat,
        destinationLng: destLng,
        stops,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
      Alert.alert("Saved!", "Route saved to My Routes", [
        { text: "OK", onPress: () => router.back() },
      ]);
    },
    onError: (err: Error) => Alert.alert("Error", err.message),
  });

  const selected = selectedPoi !== null ? stops[selectedPoi] : null;

  return (
    <>
      <Stack.Screen
        options={{
          title: "Your Route",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => saveMutation.mutate()}
              disabled={saveMutation.isPending}
            >
              <Ionicons name="bookmark-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: (originLat + destLat) / 2,
            longitude: (originLng + destLng) / 2,
            latitudeDelta: Math.abs(originLat - destLat) * 1.5 + 0.02,
            longitudeDelta: Math.abs(originLng - destLng) * 1.5 + 0.02,
          }}
        >
          <Marker
            coordinate={{ latitude: originLat, longitude: originLng }}
            title={params.originName}
            pinColor={colors.success}
          />
          <Marker
            coordinate={{ latitude: destLat, longitude: destLng }}
            title={params.destinationName}
            pinColor={colors.error}
          />
          {stops.map((stop, i) => (
            <Marker
              key={i}
              coordinate={{ latitude: stop.lat, longitude: stop.lng }}
              title={stop.name}
              onPress={() => setSelectedPoi(i)}
            >
              <View
                style={[
                  styles.poiMarker,
                  selectedPoi === i && styles.poiMarkerActive,
                ]}
              >
                <Text style={styles.poiMarkerText}>{i + 1}</Text>
              </View>
            </Marker>
          ))}
          <Polyline
            coordinates={allCoords}
            strokeColor={colors.primary}
            strokeWidth={4}
          />
        </MapView>

        <View style={styles.infoBar}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={16} color={colors.primary} />
            <Text style={styles.infoText}>
              {params.departureTime} — {params.arrivalTime}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="navigate-outline" size={16} color={colors.primary} />
            <Text style={styles.infoText}>{stops.length} stops</Text>
          </View>
        </View>

        {selected ? (
          <View style={styles.detail}>
            <View style={styles.detailHeader}>
              <View style={styles.detailBadge}>
                <Text style={styles.detailBadgeText}>
                  #{(selectedPoi ?? 0) + 1}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.detailName}>{selected.name}</Text>
                <Text style={styles.detailAddress}>{selected.address}</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedPoi(null)}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {selected.rating && (
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color={colors.warning} />
                <Text style={styles.ratingText}>{selected.rating}</Text>
                {selected.category && (
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{selected.category}</Text>
                  </View>
                )}
              </View>
            )}

            {selected.description && (
              <Text style={styles.detailDesc}>{selected.description}</Text>
            )}
          </View>
        ) : (
          <FlatList
            data={stops}
            keyExtractor={(_, i) => i.toString()}
            contentContainerStyle={styles.list}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  styles.stopCard,
                  selectedPoi === index && styles.stopCardActive,
                ]}
                onPress={() => {
                  setSelectedPoi(index);
                  mapRef.current?.animateToRegion(
                    {
                      latitude: item.lat,
                      longitude: item.lng,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    },
                    400
                  );
                }}
              >
                <View style={styles.stopNum}>
                  <Text style={styles.stopNumText}>{index + 1}</Text>
                </View>
                <View style={styles.stopInfo}>
                  <Text style={styles.stopName}>{item.name}</Text>
                  <Text style={styles.stopAddress} numberOfLines={1}>
                    {item.address}
                  </Text>
                </View>
                {item.rating && (
                  <View style={styles.stopRating}>
                    <Ionicons name="star" size={12} color={colors.warning} />
                    <Text style={styles.stopRatingText}>{item.rating}</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        )}

        <View style={styles.bottomBar}>
          <Button
            title="Save this route"
            onPress={() => saveMutation.mutate()}
            loading={saveMutation.isPending}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  map: {
    height: MAP_HEIGHT,
  },
  poiMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  poiMarkerActive: {
    backgroundColor: colors.warning,
    transform: [{ scale: 1.2 }],
  },
  poiMarkerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  infoBar: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: "500",
  },
  detail: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },
  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  detailBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  detailBadgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: fontSize.sm,
  },
  detailName: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    color: colors.text,
  },
  detailAddress: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  ratingText: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.text,
  },
  categoryBadge: {
    backgroundColor: colors.primaryLight + "20",
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  categoryText: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  detailDesc: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 24,
  },
  list: {
    padding: spacing.sm,
  },
  stopCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  stopCardActive: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  stopNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  stopNumText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  stopInfo: {
    flex: 1,
  },
  stopName: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.text,
  },
  stopAddress: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  stopRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  stopRatingText: {
    fontSize: fontSize.xs,
    fontWeight: "600",
    color: colors.text,
  },
  bottomBar: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
