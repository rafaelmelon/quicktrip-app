import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../../src/components/Button";
import { TRANSPORT_OPTIONS, type TransportMode } from "../../src/types";
import { colors, spacing, fontSize, borderRadius } from "../../src/constants/theme";

export default function TransportScreen() {
  const [selected, setSelected] = useState<TransportMode>("walking");

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>How do you prefer to travel?</Text>
        <Text style={styles.subtitle}>
          This helps us calculate realistic travel times and route distances
        </Text>

        <View style={styles.options}>
          {TRANSPORT_OPTIONS.map((opt) => {
            const isActive = selected === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.option, isActive && styles.optionActive]}
                onPress={() => setSelected(opt.id)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.iconBox,
                    isActive && styles.iconBoxActive,
                  ]}
                >
                  <Ionicons
                    name={opt.icon as any}
                    size={28}
                    color={isActive ? "#fff" : colors.textSecondary}
                  />
                </View>
                <View style={styles.optionText}>
                  <Text
                    style={[
                      styles.optionLabel,
                      isActive && styles.optionLabelActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                  <Text style={styles.optionDesc}>{opt.description}</Text>
                </View>
                {isActive && (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={colors.primary}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.step}>Step 2 of 3</Text>
        <Button
          title="Continue"
          onPress={() =>
            router.push({
              pathname: "/(onboarding)/interests",
              params: { transportMode: selected },
            })
          }
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
  options: {
    gap: spacing.md,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: "transparent",
  },
  optionActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "08",
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  iconBoxActive: {
    backgroundColor: colors.primary,
  },
  optionText: {
    flex: 1,
  },
  optionLabel: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.text,
  },
  optionLabelActive: {
    color: colors.primary,
  },
  optionDesc: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
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
