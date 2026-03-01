import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../../src/stores/auth.store";
import { Button } from "../../src/components/Button";
import {
  TRANSPORT_OPTIONS,
  INTEREST_OPTIONS,
  type TransportMode,
} from "../../src/types";
import {
  colors,
  spacing,
  fontSize,
  borderRadius,
} from "../../src/constants/theme";

export default function ProfileScreen() {
  const { user, logout, completeOnboarding } = useAuthStore();

  const [editingTransport, setEditingTransport] = useState(false);
  const [editingInterests, setEditingInterests] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState<TransportMode>(
    user?.transportMode || "walking"
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    user?.interests || []
  );
  const [saving, setSaving] = useState(false);

  function toggleInterest(id: string) {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  async function saveTransport() {
    setSaving(true);
    try {
      await completeOnboarding({
        transportMode: selectedTransport,
        interests: user?.interests || [],
      });
      setEditingTransport(false);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setSaving(false);
    }
  }

  async function saveInterests() {
    if (selectedInterests.length === 0) {
      Alert.alert("Error", "Select at least one interest");
      return;
    }
    setSaving(true);
    try {
      await completeOnboarding({
        transportMode: user?.transportMode || "walking",
        interests: selectedInterests,
      });
      setEditingInterests(false);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  }

  const currentTransport = TRANSPORT_OPTIONS.find(
    (t) => t.id === user?.transportMode
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scroll}
    >
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={36} color={colors.primary} />
        </View>
        <View>
          <Text style={styles.username}>{user?.username}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Preferences</Text>

      {/* Transport Mode */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardIcon}>
            <Ionicons
              name={(currentTransport?.icon as any) || "walk"}
              size={20}
              color={colors.primary}
            />
          </View>
          <View style={styles.cardHeaderText}>
            <Text style={styles.cardTitle}>Transport mode</Text>
            <Text style={styles.cardValue}>
              {currentTransport?.label || "Walking"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setSelectedTransport(user?.transportMode || "walking");
              setEditingTransport(!editingTransport);
              setEditingInterests(false);
            }}
          >
            <Ionicons
              name={editingTransport ? "chevron-up" : "chevron-down"}
              size={22}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {editingTransport && (
          <View style={styles.editSection}>
            {TRANSPORT_OPTIONS.map((opt) => {
              const active = selectedTransport === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  style={[styles.transportRow, active && styles.transportRowActive]}
                  onPress={() => setSelectedTransport(opt.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.transportIcon,
                      active && styles.transportIconActive,
                    ]}
                  >
                    <Ionicons
                      name={opt.icon as any}
                      size={22}
                      color={active ? "#fff" : colors.textSecondary}
                    />
                  </View>
                  <View style={styles.transportInfo}>
                    <Text
                      style={[
                        styles.transportLabel,
                        active && styles.transportLabelActive,
                      ]}
                    >
                      {opt.label}
                    </Text>
                    <Text style={styles.transportDesc}>{opt.description}</Text>
                  </View>
                  {active && (
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
            <Button
              title="Save"
              onPress={saveTransport}
              loading={saving}
              disabled={selectedTransport === user?.transportMode}
              style={styles.saveBtn}
            />
          </View>
        )}
      </View>

      {/* Interests */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardIcon}>
            <Ionicons name="heart" size={20} color={colors.primary} />
          </View>
          <View style={styles.cardHeaderText}>
            <Text style={styles.cardTitle}>Interests</Text>
            <Text style={styles.cardValue} numberOfLines={1}>
              {user?.interests
                .map(
                  (id) =>
                    INTEREST_OPTIONS.find((o) => o.id === id)?.label || id
                )
                .join(", ") || "None set"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setSelectedInterests(user?.interests || []);
              setEditingInterests(!editingInterests);
              setEditingTransport(false);
            }}
          >
            <Ionicons
              name={editingInterests ? "chevron-up" : "chevron-down"}
              size={22}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {editingInterests && (
          <View style={styles.editSection}>
            <View style={styles.chipGrid}>
              {INTEREST_OPTIONS.map((opt) => {
                const active = selectedInterests.includes(opt.id);
                return (
                  <TouchableOpacity
                    key={opt.id}
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => toggleInterest(opt.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={opt.icon as any}
                      size={16}
                      color={active ? "#fff" : colors.textSecondary}
                    />
                    <Text
                      style={[
                        styles.chipLabel,
                        active && styles.chipLabelActive,
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Button
              title={`Save (${selectedInterests.length} selected)`}
              onPress={saveInterests}
              loading={saving}
              disabled={
                selectedInterests.length === 0 ||
                (selectedInterests.length === user?.interests.length &&
                  selectedInterests.every((i) => user?.interests.includes(i)))
              }
              style={styles.saveBtn}
            />
          </View>
        )}
      </View>

      <Text style={styles.sectionTitle}>Account</Text>

      <View style={styles.card}>
        <TouchableOpacity style={styles.menuRow} onPress={handleLogout}>
          <View style={[styles.cardIcon, styles.cardIconDanger]}>
            <Ionicons name="log-out-outline" size={20} color={colors.error} />
          </View>
          <Text style={styles.menuLabel}>Log out</Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryLight + "20",
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.text,
  },
  email: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: fontSize.xs,
    fontWeight: "600",
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    gap: spacing.md,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primaryLight + "15",
    alignItems: "center",
    justifyContent: "center",
  },
  cardIconDanger: {
    backgroundColor: colors.error + "12",
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.text,
  },
  cardValue: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  editSection: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  transportRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.background,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  transportRowActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "06",
  },
  transportIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  transportIconActive: {
    backgroundColor: colors.primary,
  },
  transportInfo: {
    flex: 1,
  },
  transportLabel: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.text,
  },
  transportLabelActive: {
    color: colors.primary,
  },
  transportDesc: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background,
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
  saveBtn: {
    marginTop: spacing.xs,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    gap: spacing.md,
  },
  menuLabel: {
    flex: 1,
    fontSize: fontSize.md,
    fontWeight: "500",
    color: colors.error,
  },
});
