"use client";

import { useState } from "react";
import { SectionCard } from "@/components/shared";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import type { ThemePreference } from "@/types/settings";

const THEME_KEY = "project-aegis-theme";

const themeOptions: { value: ThemePreference; label: string; Icon: typeof Sun; description: string }[] = [
  { value: "light", label: "Light Theme", Icon: Sun, description: "Always use the light interface." },
  { value: "dark", label: "Dark Theme", Icon: Moon, description: "Always use the dark interface." },
  { value: "system", label: "System Theme", Icon: Monitor, description: "Follow the OS preference." }
];

function applyTheme(preference: ThemePreference) {
  if (preference === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", prefersDark);
  } else {
    document.documentElement.classList.toggle("dark", preference === "dark");
  }
  localStorage.setItem(THEME_KEY, preference);
}

function getInitialPreference(): ThemePreference {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") return stored;
  return "light";
}

export function AppearanceSettings() {
  const [selected, setSelected] = useState<ThemePreference>(getInitialPreference);

  function handleSelect(value: ThemePreference) {
    setSelected(value);
    applyTheme(value);
  }

  return (
    <SectionCard
      title="Appearance"
      description="Configure the visual theme for the Bharat Nerves Platform"
    >
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {themeOptions.map(({ value, label, Icon, description }) => {
            const isActive = selected === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => handleSelect(value)}
                className={[
                  "surface-card focus-ring relative flex flex-col items-start gap-2 rounded-md p-4 text-left",
                  isActive
                    ? "border-primary bg-primary/5 shadow-[0_0_0_1px_hsl(var(--primary)/0.25)]"
                    : "hover:bg-secondary/35"
                ].join(" ")}
              >
                {isActive && (
                  <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </span>
                )}
                <Icon className={["h-5 w-5", isActive ? "text-primary" : "text-muted-foreground"].join(" ")} />
                <div>
                  <p className={["text-sm font-semibold", isActive ? "text-primary" : "text-foreground"].join(" ")}>
                    {label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="surface-inset rounded-md p-3">
          <p className="text-xs text-muted-foreground">
            Theme preference is stored in your browser. The platform uses semantic CSS variables — all components respond automatically to theme changes.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
