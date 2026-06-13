"use client";

import { useState } from "react";
import { SectionCard } from "@/components/shared";
import type { NotificationChannel } from "@/types/settings";

interface NotificationSettingsProps {
  channels: NotificationChannel[];
}

export function NotificationSettings({ channels }: NotificationSettingsProps) {
  const [states, setStates] = useState<Record<string, boolean>>(
    Object.fromEntries(channels.map((c) => [c.id, c.enabled]))
  );

  function toggle(id: string) {
    setStates((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <SectionCard
      title="Notifications"
      description="Configure alert and update notification channels"
    >
      <div className="space-y-2">
        {channels.map((channel) => {
          const enabled = states[channel.id] ?? channel.enabled;
          return (
            <div
              key={channel.id}
              className="surface-card flex items-center justify-between rounded-md px-4 py-3"
            >
              <div className="min-w-0 pr-4">
                <p className="text-sm font-medium text-foreground">{channel.label}</p>
                <p className="text-xs text-muted-foreground">{channel.description}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={enabled}
                onClick={() => toggle(channel.id)}
                className={[
                  "focus-ring relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200",
                  enabled ? "bg-primary" : "bg-muted"
                ].join(" ")}
              >
                <span
                  className={[
                    "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                    enabled ? "translate-x-4" : "translate-x-0"
                  ].join(" ")}
                />
              </button>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Toggle state is visual only in this MVP. Notification delivery is not implemented.
      </p>
    </SectionCard>
  );
}
