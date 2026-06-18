"use client";
import { useEffect, useState } from "react";

/**
 * Returns true when <html> has the `dark` class, watching for changes.
 * Use this to feed dark/light color choices into inline styles.
 */
export function useIsDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

/**
 * A small palette object that swaps based on the current theme.
 */
export function useThemeColors() {
  const isDark = useIsDark();
  return isDark
    ? {
        page: "#0a0a0f",
        section: "#0a0a0f",
        sectionAlt: "#0f0f18",
        surface: "#131320",
        surfaceAlt: "#1a1a2e",
        border: "#232336",
        text: "#f3f4f6",
        textMuted: "#9ca3af",
        textFaint: "#6b7280",
        topbar: "#1f2937",
        topbarText: "#cbd5e1",
      }
    : {
        page: "#fafafa",
        section: "#fff",
        sectionAlt: "#f7f7f5",
        surface: "#fff",
        surfaceAlt: "#fafafa",
        border: "#eee",
        text: "#111",
        textMuted: "#666",
        textFaint: "#888",
        topbar: "#111827",
        topbarText: "#d1d5db",
      };
}
