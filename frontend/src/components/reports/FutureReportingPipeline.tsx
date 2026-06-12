import { SectionCard, StatusBadge } from "@/components/shared";
import type { FutureReportingItem } from "@/types/report";
import { Rocket } from "lucide-react";

interface FutureReportingPipelineProps {
  items: FutureReportingItem[];
}

export function FutureReportingPipeline({ items }: FutureReportingPipelineProps) {
  return (
    <SectionCard
      title="Future Reporting Pipeline"
      description="Planned capabilities for the Bharat Nerves reporting center"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 rounded-lg border border-border bg-muted/20 p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Rocket className="h-3.5 w-3.5 shrink-0 text-info" />
                <span className="text-sm font-semibold text-foreground">{item.name}</span>
              </div>
              <StatusBadge label="Planned" variant="neutral" size="sm" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
