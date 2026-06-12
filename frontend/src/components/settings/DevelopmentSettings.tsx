import { SectionCard, StatusBadge } from "@/components/shared";
import type { DevSettingItem } from "@/types/settings";
import { Terminal } from "lucide-react";

interface DevelopmentSettingsProps {
  items: DevSettingItem[];
}

export function DevelopmentSettings({ items }: DevelopmentSettingsProps) {
  return (
    <SectionCard
      title="Development Settings"
      description="Current MVP platform mode configuration — read only"
      action={<StatusBadge label="Prototype" variant="warning" size="sm" />}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 p-3">
          <Terminal className="h-4 w-4 shrink-0 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Current MVP operates using structured mock datasets and simulated platform configurations. Future versions will support live integrations, authentication, API management, and enterprise deployment.
          </p>
        </div>

        <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-card px-4 py-2.5">
              <span className="text-sm text-foreground">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-mono">{item.value}</span>
                <StatusBadge
                  label={item.enabled ? "On" : "Off"}
                  variant={item.enabled ? "success" : "neutral"}
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
