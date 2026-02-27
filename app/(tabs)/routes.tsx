import { View, FlatList, StyleSheet, Alert } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { listRoutes, deleteRoute } from "../../src/services/routes";
import { RouteCard } from "../../src/components/RouteCard";
import { EmptyState } from "../../src/components/EmptyState";
import { colors, spacing } from "../../src/constants/theme";

export default function RoutesScreen() {
  const queryClient = useQueryClient();

  const { data: routes = [], isLoading } = useQuery({
    queryKey: ["routes"],
    queryFn: listRoutes,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRoute,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["routes"] }),
    onError: (err: Error) => Alert.alert("Error", err.message),
  });

  function handleDelete(id: string, name: string) {
    Alert.alert("Delete route", `Delete "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteMutation.mutate(id),
      },
    ]);
  }

  if (!isLoading && routes.length === 0) {
    return (
      <EmptyState
        icon="map-outline"
        title="No routes yet"
        subtitle="Your saved travel routes will appear here"
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <RouteCard
            route={item}
            onPress={() => router.push(`/route/${item.id}`)}
            onDelete={() => handleDelete(item.id, item.name)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
  },
});
