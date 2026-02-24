import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const defaultTheme = {
  text: "#0f172a",
  bgStart: "#fde68a",
  bgEnd: "#f8fafc",
  sidebarBg: "#0f172a",
  sidebarText: "#f8fafc",
  accent: "#fbbf24",
  button: "#0ea5e9"
};

export const useThemeStore = create(
  persist(
    (set) => ({
      mode: "light",
      theme: defaultTheme,
      setMode: (mode) => set({ mode }),
      toggleMode: () =>
        set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
      setThemeValue: (key, value) =>
        set((state) => ({ theme: { ...state.theme, [key]: value } })),
      resetTheme: () => set({ theme: defaultTheme })
    }),
    {
      name: "bms-theme",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
