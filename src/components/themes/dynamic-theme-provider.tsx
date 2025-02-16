"use client";
import dynamic from "next/dynamic";

// Importamos ThemeProvider de manera dinámica sin SSR
const DynamicThemeProvider = dynamic(
  () =>
    import("@/components/themes/theme-provider").then(
      (mod) => mod.ThemeProvider
    ),
  { ssr: false }
);

export { DynamicThemeProvider };
