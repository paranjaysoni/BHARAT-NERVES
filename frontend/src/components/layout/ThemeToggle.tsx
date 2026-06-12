"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export const THEME_STORAGE_KEY = "project-aegis-theme";

type ThemeMode = "light" | "dark";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "dark") return "dark";
  if (stored === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function toggleTheme() {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }

  const Icon = theme === "dark" ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm font-medium text-card-foreground transition-colors hover:bg-secondary"
      aria-label="Toggle theme"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span>{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
