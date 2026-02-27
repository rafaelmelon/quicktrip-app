import { apiFetch } from "./api";
import type { Place, CreatePlaceInput } from "../types";

export async function listPlaces(): Promise<Place[]> {
  return apiFetch<Place[]>("/places");
}

export async function createPlace(input: CreatePlaceInput): Promise<Place> {
  return apiFetch<Place>("/places", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function deletePlace(id: string): Promise<void> {
  return apiFetch<void>(`/places/${id}`, { method: "DELETE" });
}
