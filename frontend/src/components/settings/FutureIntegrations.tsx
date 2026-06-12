import { SectionCard, StatusBadge } from "@/components/shared";
import type { FutureIntegrationItem } from "@/types/settings";
import { Rocket } from "lucide-react";

interface FutureIntegrationsProps {
  items: FutureIntegrationItem[];
}

const priorityVariant: Record<string, "danger" | "warning" | "neutral"> = {
  high: "danger",
  medium: "warning",
  low: "neutral"
};

const priorityLabel: Record<string, string> = {
  high: "High Priority",
  medium: "Medium",
  low: "Low"
};

export function FutureIntegrations({ items }: FutureIntegrationsProps) {
  return (
    <SectionCard
      title="Future Integrations"
      description="Phase 2 and Phase 3 platform integration roadmap"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 rounded-lg border border-border bg-muted/20 p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <Rocket className="h-3.5 w-3.5 shrink-0 text-info" />
                <span className="text-sm font-semibold text-foreground">{item.name}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            <div className="mt-auto flex items-center justify-between pt-2 border-t border-border">
              <StatusBadge label="Planned" variant="neutral" size="sm" />
              <StatusBadge label={priorityLabel[item.priority]} variant={priorityVariant[item.priority]} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
