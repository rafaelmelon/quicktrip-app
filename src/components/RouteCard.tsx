import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, borderRadius, spacing, fontSize } from "../constants/theme";
import type { TripRoute } from "../types";

interface Props {
  route: TripRoute;
  onPress: () => void;
  onDelete?: () => void;
}

export function RouteCard({ route, onPress, onDelete }: Props) {
  const hours = Math.floor(route.estimatedMinutes / 60);
  const mins = route.estimatedMinutes % 60;
  const duration = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{route.category}</Text>
        </View>
        {onDelete && (
          <TouchableOpacity onPress={onDelete} hitSlop={8}>
            <Ionicons name="trash-outline" size={20} color={colors.error} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.name} numberOfLines={1}>
        {route.name}
      </Text>

      <View style={styles.info}>
        <View style={styles.infoRow}>
          <Ionicons
            name="location-outline"
            size={14}
            color={colors.textSecondary}
          />
          <Text style={styles.infoText} numberOfLines={1}>
            {route.originName}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons
            name="flag-outline"
            size={14}
            color={colors.textSecondary}
          />
          <Text style={styles.infoText} numberOfLines={1}>
            {route.destinationName}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.infoRow}>
          <Ionicons
            name="time-outline"
            size={14}
            color={colors.primaryLight}
          />
          <Text style={styles.footerText}>{duration}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons
            name="navigate-outline"
            size={14}
            color={colors.primaryLight}
          />
          <Text style={styles.footerText}>
            {route.stops.length} stops
          </Text>
        </View>
        {route._count?.notes ? (
          <View style={styles.infoRow}>
            <Ionicons
              name="document-text-outline"
              size={14}
              color={colors.primaryLight}
            />
            <Text style={styles.footerText}>
              {route._count.notes} notes
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  categoryBadge: {
    backgroundColor: colors.primaryLight + "20",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  categoryText: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  name: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  info: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  infoText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  footerText: {
    fontSize: fontSize.xs,
    color: colors.primaryLight,
    fontWeight: "500",
  },
});
