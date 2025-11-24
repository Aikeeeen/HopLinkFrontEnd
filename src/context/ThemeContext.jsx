/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const THEME_KEY = "hoplink_theme_v1"; // "light" | "dark"
const ThemeContext = createContext(null);

function getPreferredTheme() {
  if (typeof window === "undefined") return "light";

  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;

  // Fallback to system setting
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => getPreferredTheme());

  // Keep <html> data-theme in sync and persist choice
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme; // <-- THIS is what Tailwind v4 uses now
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // If user hasn't chosen explicitly, follow system changes
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq) return;

    const handleChange = (event) => {
      const stored = localStorage.getItem(THEME_KEY);
      // If user chose a theme, don't override it
      if (stored === "light" || stored === "dark") return;
      setTheme(event.matches ? "dark" : "light");
    };

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      setTheme,
      toggleTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
