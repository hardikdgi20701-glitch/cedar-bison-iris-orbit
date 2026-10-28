import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Theme = "light" | "dark";

const KEY = "pv-theme";

function readTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = window.localStorage.getItem(KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }
  return "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#131314" : "#ffffff");
}

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const next = readTheme();
    setThemeState(next);
    applyTheme(next);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (t: Theme) => {
        setThemeState(t);
        try {
          window.localStorage.setItem(KEY, t);
        } catch {
          /* ignore */
        }
        applyTheme(t);
      },
      toggle: () => {
        setThemeState((prev) => {
          const next = prev === "dark" ? "light" : "dark";
          try {
            window.localStorage.setItem(KEY, next);
          } catch {
            /* ignore */
          }
          applyTheme(next);
          return next;
        });
      },
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
