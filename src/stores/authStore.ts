import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Admin } from "@/types";

interface AuthState {
  user: Admin | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: Admin, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      setAuth: (user, token) =>
        set({
          user,
          accessToken: token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "sungrak_auth",
    }
  )
);
