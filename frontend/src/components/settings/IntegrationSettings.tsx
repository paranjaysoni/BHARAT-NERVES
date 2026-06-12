import { SectionCard, StatusBadge } from "@/components/shared";
import type { IntegrationItem } from "@/types/settings";

interface IntegrationSettingsProps {
  integrations: IntegrationItem[];
}

const statusVariant: Record<string, "success" | "warning" | "neutral"> = {
  connected: "success",
  mocked: "warning",
  planned: "neutral"
};

const statusLabel: Record<string, string> = {
  connected: "Connected",
  mocked: "Mock Active",
  planned: "Planned"
};

export function IntegrationSettings({ integrations }: IntegrationSettingsProps) {
  return (
    <SectionCard
      title="Integrations"
      description="External system connections and readiness status"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.category}</p>
              </div>
              <StatusBadge
                label={statusLabel[item.status]}
                variant={statusVariant[item.status]}
                size="sm"
              />
            </div>
            <div className="rounded bg-muted/40 px-2 py-1">
              <span className="text-xs font-medium text-muted-foreground">Readiness: </span>
              <span className="text-xs text-foreground">{item.readiness}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.note}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
