import { SectionCard, StatusBadge } from "@/components/shared";
import { Zap } from "lucide-react";

interface ScenarioReport {
  id: string;
  title: string;
  category: string;
  status: string;
}

interface ScenarioReportsProps {
  reports: ScenarioReport[];
  scenarioName?: string;
}

const statusVariant: Record<string, "success" | "warning" | "info" | "neutral"> = {
  published: "success",
  review: "warning",
  draft: "info",
  archived: "neutral"
};

export function ScenarioReports({
  reports,
  scenarioName = "Cyclone Landfall Scenario"
}: ScenarioReportsProps) {
  return (
    <SectionCard
      title="Current Scenario Reports"
      description={scenarioName}
    >
      <div className="space-y-2">
        {reports.map((report) => (
          <div
            key={report.id}
            className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-2.5"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Zap className="h-3.5 w-3.5 shrink-0 text-warning" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{report.title}</p>
                <p className="text-xs text-muted-foreground">{report.category}</p>
              </div>
            </div>
            <StatusBadge
              label={report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              variant={statusVariant[report.status] ?? "neutral"}
              size="sm"
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
