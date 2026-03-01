import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../../src/components/Button";
import { useAuthStore } from "../../src/stores/auth.store";
import { INTEREST_OPTIONS, type TransportMode } from "../../src/types";
import { colors, spacing, fontSize, borderRadius } from "../../src/constants/theme";

export default function InterestsScreen() {
  const { transportMode } = useLocalSearchParams<{ transportMode: TransportMode }>();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  async function handleFinish() {
    if (selected.length === 0) {
      Alert.alert("Select interests", "Pick at least one category");
      return;
    }
    setLoading(true);
    try {
      await completeOnboarding({
        transportMode: transportMode || "walking",
        interests: selected,
      });
      router.replace("/(tabs)/explore");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>What interests you?</Text>
        <Text style={styles.subtitle}>
          Select the types of places you'd like to discover along your routes
        </Text>

        <View style={styles.grid}>
          {INTEREST_OPTIONS.map((opt) => {
            const isActive = selected.includes(opt.id);
            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => toggle(opt.id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={opt.icon as any}
                  size={22}
                  color={isActive ? "#fff" : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.chipLabel,
                    isActive && styles.chipLabelActive,
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.step}>Step 3 of 3</Text>
        <Button
          title={`Finish (${selected.length} selected)`}
          onPress={handleFinish}
          loading={loading}
          disabled={selected.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl + spacing.xl,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipLabel: {
    fontSize: fontSize.sm,
    fontWeight: "500",
    color: colors.text,
  },
  chipLabelActive: {
    color: "#fff",
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  step: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
});
