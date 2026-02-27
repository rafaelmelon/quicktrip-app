import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, borderRadius, spacing, fontSize } from "../constants/theme";
import type { Place } from "../types";

interface Props {
  place: Place;
  onDelete?: () => void;
}

export function PlaceCard({ place, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name="heart" size={20} color={colors.primary} />
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {place.name}
        </Text>
        <Text style={styles.address} numberOfLines={1}>
          {place.address}
        </Text>
        {place.category && (
          <Text style={styles.category}>{place.category}</Text>
        )}
      </View>

      {onDelete && (
        <TouchableOpacity onPress={onDelete} hitSlop={8} style={styles.delete}>
          <Ionicons name="close-circle-outline" size={22} color={colors.error} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight + "15",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.text,
  },
  address: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  category: {
    fontSize: fontSize.xs,
    color: colors.primary,
    marginTop: 4,
    textTransform: "capitalize",
  },
  delete: {
    marginLeft: spacing.sm,
  },
});
