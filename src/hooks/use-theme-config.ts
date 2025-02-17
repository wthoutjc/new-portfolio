"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { getThemeConfig } from "@/components/themes/theme-config";
import { ThemeConfig } from "../lib/interfaces/ui";
import { Environment, ThemeMode } from "../lib/types/ui.type";

export const useThemeConfig = () => {
  const { theme } = useTheme();
  const [themeConfig, setThemeConfig] = useState<ThemeConfig | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && theme) {
      const environment = (process.env.NEXT_PUBLIC_ENVIRONMENT ||
        "development") as Environment;
      const config = getThemeConfig(theme as ThemeMode, environment);
      setThemeConfig(config);
    }
  }, [theme, mounted]);

  return { themeConfig, mounted };
};
