import { ThemeConfig } from "../interfaces/ui";
import { ThemeMode } from "../types/ui.type";
import { Environment } from "../types/ui.type";

const lightThemeProd: ThemeConfig = {
  primary: "#0f172a",
  secondary: "#1e293b",
  background: "#ffffff",
  text: "#0f172a",
};

const darkThemeProd: ThemeConfig = {
  primary: "#e2e8f0",
  secondary: "#94a3b8",
  background: "#0f172a",
  text: "#e2e8f0",
};

const lightThemeDev: ThemeConfig = {
  primary: "#166534",
  secondary: "#15803d",
  background: "#f0fdf4",
  text: "#166534",
};

const darkThemeDev: ThemeConfig = {
  primary: "#4ade80",
  secondary: "#86efac",
  background: "#052e16",
  text: "#4ade80",
};

export const getThemeConfig = (
  mode: ThemeMode,
  env: Environment
): ThemeConfig => {
  const isDev = env === "development";
  const isDark =
    mode === "dark" ||
    (mode === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  if (isDev) {
    return isDark ? darkThemeDev : lightThemeDev;
  }
  return isDark ? darkThemeProd : lightThemeProd;
};
