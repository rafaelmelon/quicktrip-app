import { apiFetch, storeTokens, clearTokens } from "./api";
import type { AuthResponse, User, OnboardingInput } from "../types";

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const data = await apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  await storeTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function signup(
  email: string,
  username: string,
  password: string
): Promise<AuthResponse> {
  const data = await apiFetch<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, username, password }),
  });
  await storeTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function logout(): Promise<void> {
  await clearTokens();
}

export async function getMe(): Promise<User> {
  return apiFetch<User>("/auth/me");
}

export async function completeOnboarding(
  input: OnboardingInput
): Promise<User> {
  return apiFetch<User>("/auth/onboarding", {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}
