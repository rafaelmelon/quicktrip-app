import { apiFetch } from "./api";
import type { Note } from "../types";

export async function listNotes(routeId: string): Promise<Note[]> {
  return apiFetch<Note[]>(`/notes?routeId=${routeId}`);
}

export async function createNote(
  routeId: string,
  content: string
): Promise<Note> {
  return apiFetch<Note>("/notes", {
    method: "POST",
    body: JSON.stringify({ routeId, content }),
  });
}

export async function updateNote(id: string, content: string): Promise<Note> {
  return apiFetch<Note>(`/notes/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });
}

export async function deleteNote(id: string): Promise<void> {
  return apiFetch<void>(`/notes/${id}`, { method: "DELETE" });
}
