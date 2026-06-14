"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

export const THEME_STORAGE_KEY = "project-aegis-theme";
const THEME_CHANGE_EVENT = "project-aegis-theme-change";

type ThemeMode = "light" | "dark";

function getThemeSnapshot(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "dark") return "dark";
  if (stored === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
}

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function toggleTheme() {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  const Icon = theme === "dark" ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn btn-secondary"
      aria-label="Toggle theme"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span>{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
