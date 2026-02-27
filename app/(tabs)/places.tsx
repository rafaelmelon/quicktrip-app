import { View, FlatList, StyleSheet, Alert } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listPlaces, deletePlace } from "../../src/services/places";
import { PlaceCard } from "../../src/components/PlaceCard";
import { EmptyState } from "../../src/components/EmptyState";
import { colors, spacing } from "../../src/constants/theme";

export default function PlacesScreen() {
  const queryClient = useQueryClient();

  const { data: places = [], isLoading } = useQuery({
    queryKey: ["places"],
    queryFn: listPlaces,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePlace,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["places"] }),
    onError: (err: Error) => Alert.alert("Error", err.message),
  });

  function handleDelete(id: string, name: string) {
    Alert.alert("Remove place", `Remove "${name}" from favorites?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => deleteMutation.mutate(id),
      },
    ]);
  }

  if (!isLoading && places.length === 0) {
    return (
      <EmptyState
        icon="heart-outline"
        title="No saved places"
        subtitle="Bookmark places you love and they'll show up here"
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <PlaceCard
            place={item}
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
