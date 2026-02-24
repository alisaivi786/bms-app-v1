import { useEffect } from "react";
import { useThemeStore } from "../state/themeStore";

export default function ThemeApplier() {
  const mode = useThemeStore((state) => state.mode);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme-mode", mode);

    // Only apply custom color palette to light mode.
    // Dark mode uses dedicated CSS variables for readability/contrast.
    if (mode === "light") {
      root.style.setProperty("--app-text", theme.text);
      root.style.setProperty("--app-bg-start", theme.bgStart);
      root.style.setProperty("--app-bg-end", theme.bgEnd);
      root.style.setProperty("--app-sidebar-bg", theme.sidebarBg);
      root.style.setProperty("--app-sidebar-text", theme.sidebarText);
      root.style.setProperty("--app-accent", theme.accent);
      root.style.setProperty("--app-button", theme.button);
    } else {
      root.style.removeProperty("--app-text");
      root.style.removeProperty("--app-bg-start");
      root.style.removeProperty("--app-bg-end");
      root.style.removeProperty("--app-sidebar-bg");
      root.style.removeProperty("--app-sidebar-text");
      root.style.removeProperty("--app-accent");
      root.style.removeProperty("--app-button");
    }
  }, [mode, theme]);

  return null;
}
