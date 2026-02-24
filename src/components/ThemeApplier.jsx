import { useEffect } from "react";
import { useThemeStore } from "../state/themeStore";

export default function ThemeApplier() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--app-text", theme.text);
    root.style.setProperty("--app-bg-start", theme.bgStart);
    root.style.setProperty("--app-bg-end", theme.bgEnd);
    root.style.setProperty("--app-sidebar-bg", theme.sidebarBg);
    root.style.setProperty("--app-sidebar-text", theme.sidebarText);
    root.style.setProperty("--app-accent", theme.accent);
    root.style.setProperty("--app-button", theme.button);
  }, [theme]);

  return null;
}
