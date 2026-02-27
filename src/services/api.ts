import * as SecureStore from "expo-secure-store";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";

const TOKEN_KEY = "quicktrip_access_token";
const REFRESH_KEY = "quicktrip_refresh_token";

export async function getStoredTokens() {
  const accessToken = await SecureStore.getItemAsync(TOKEN_KEY);
  const refreshToken = await SecureStore.getItemAsync(REFRESH_KEY);
  return { accessToken, refreshToken };
}

export async function storeTokens(access: string, refresh: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, access);
  await SecureStore.setItemAsync(REFRESH_KEY, refresh);
}

export async function clearTokens() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_KEY);
}

async function refreshAccessToken(): Promise<string | null> {
  const { refreshToken } = await getStoredTokens();
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      await clearTokens();
      return null;
    }

    const data = await res.json();
    await storeTokens(data.accessToken, data.refreshToken);
    return data.accessToken;
  } catch {
    await clearTokens();
    return null;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  let { accessToken } = await getStoredTokens();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  let res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (res.status === 401 && accessToken) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers.Authorization = `Bearer ${newToken}`;
      res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
    }
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}
