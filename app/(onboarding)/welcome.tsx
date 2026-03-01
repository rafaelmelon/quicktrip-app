import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../../src/components/Button";
import { useAuthStore } from "../../src/stores/auth.store";
import { colors, spacing, fontSize } from "../../src/constants/theme";

export default function WelcomeScreen() {
  const user = useAuthStore((s) => s.user);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="compass" size={48} color="#fff" />
        </View>
        <Text style={styles.title}>Welcome, {user?.username}!</Text>
        <Text style={styles.subtitle}>
          Let's personalize your experience so we can recommend the best points
          of interest along your routes.
        </Text>

        <View style={styles.features}>
          {[
            { icon: "map-outline" as const, text: "Optimized walking routes between two points" },
            { icon: "star-outline" as const, text: "Personalized POI recommendations" },
            { icon: "time-outline" as const, text: "Time-aware itineraries that fit your schedule" },
          ].map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Ionicons name={f.icon} size={22} color={colors.primary} />
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.step}>Step 1 of 3</Text>
        <Button
          title="Let's go"
          onPress={() => router.push("/(onboarding)/transport")}
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.sm,
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  features: {
    marginTop: spacing.xl,
    gap: spacing.md,
    width: "100%",
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
  },
  featureText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
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
