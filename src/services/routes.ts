import { apiFetch } from "./api";
import type { TripRoute, CreateRouteInput } from "../types";

export async function listRoutes(): Promise<TripRoute[]> {
  return apiFetch<TripRoute[]>("/routes");
}

export async function getRoute(id: string): Promise<TripRoute> {
  return apiFetch<TripRoute>(`/routes/${id}`);
}

export async function createRoute(
  input: CreateRouteInput
): Promise<TripRoute> {
  return apiFetch<TripRoute>("/routes", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function deleteRoute(id: string): Promise<void> {
  return apiFetch<void>(`/routes/${id}`, { method: "DELETE" });
}
