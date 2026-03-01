import { create } from "zustand";
import type { User, OnboardingInput } from "../types";
import * as authService from "../services/auth";
import { getStoredTokens } from "../services/api";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<void>;
  completeOnboarding: (input: OnboardingInput) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  initialize: async () => {
    try {
      const { accessToken } = await getStoredTokens();
      if (!accessToken) {
        set({ isLoading: false });
        return;
      }
      const user = await authService.getMe();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: async (email, password) => {
    const { user } = await authService.login(email, password);
    set({ user, isAuthenticated: true });
  },

  signup: async (email, username, password) => {
    const { user } = await authService.signup(email, username, password);
    set({ user, isAuthenticated: true });
  },

  completeOnboarding: async (input) => {
    const user = await authService.completeOnboarding(input);
    set({ user });
  },

  logout: async () => {
    await authService.logout();
    set({ user: null, isAuthenticated: false });
  },
}));
