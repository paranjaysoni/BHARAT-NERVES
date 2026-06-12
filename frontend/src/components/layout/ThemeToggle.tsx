"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

type ThemeMode = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light");

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem("project-aegis-theme", nextTheme);
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
