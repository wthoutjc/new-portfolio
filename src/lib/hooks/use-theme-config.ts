"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { getThemeConfig } from "../themes/theme-config";
import { ThemeConfig } from "../interfaces/ui";
import { Environment } from "../types/ui.type";

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
      const config = getThemeConfig(theme as any, environment);
      setThemeConfig(config);
    }
  }, [theme, mounted]);

  return { themeConfig, mounted };
};
