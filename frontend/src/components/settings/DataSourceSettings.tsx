import { SectionCard, StatusBadge } from "@/components/shared";
import type { DataSourceItem } from "@/types/settings";
import { RefreshCw } from "lucide-react";

interface DataSourceSettingsProps {
  sources: DataSourceItem[];
}

const statusVariant: Record<string, "success" | "warning" | "neutral"> = {
  connected: "success",
  mocked: "warning",
  planned: "neutral"
};

const statusLabel: Record<string, string> = {
  connected: "Connected",
  mocked: "Mocked",
  planned: "Planned"
};

export function DataSourceSettings({ sources }: DataSourceSettingsProps) {
  return (
    <SectionCard
      title="Data Sources"
      description="Status of platform data feeds and integrations"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {sources.map((source) => (
          <div
            key={source.id}
            className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold text-foreground">{source.name}</p>
              <StatusBadge
                label={statusLabel[source.status]}
                variant={statusVariant[source.status]}
                size="sm"
              />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{source.description}</p>
            <div className="flex items-center gap-1.5 mt-auto pt-2 border-t border-border">
              <RefreshCw className="h-3 w-3 text-muted-foreground/60" />
              <span className="text-xs text-muted-foreground">{source.lastSync}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
