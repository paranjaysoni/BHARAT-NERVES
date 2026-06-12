import { SectionCard, StatusBadge } from "@/components/shared";
import type { DataSourceHealthItem } from "@/data";

interface DataSourceHealthProps {
  sources: DataSourceHealthItem[];
}

const statusVariant = {
  mocked: "info",
  planned: "warning",
  static: "neutral"
} as const;

export function DataSourceHealth({ sources }: DataSourceHealthProps) {
  return (
    <SectionCard
      title="Data Source Health"
      description="Mock source posture for future integrations."
    >
      <div className="space-y-3">
        {sources.map((source) => (
          <div
            key={source.id}
            className="flex items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-2"
          >
            <span className="text-sm font-medium text-foreground">
              {source.source}
            </span>
            <StatusBadge
              label={source.status}
              variant={statusVariant[source.status]}
              size="sm"
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
