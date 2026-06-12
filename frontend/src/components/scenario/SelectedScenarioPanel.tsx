import { ArrowRight } from "lucide-react";
import { RiskPill, SectionCard, StatusBadge } from "@/components/shared";
import type { ScenarioSimulationImpact } from "@/data";
import type { Scenario } from "@/types";

export interface SelectedScenarioPanelProps {
  scenario: Scenario;
  impact: ScenarioSimulationImpact;
}

const severityToRisk = {
  critical: "critical",
  high: "high",
  moderate: "medium",
  low: "low"
} as const;

export function SelectedScenarioPanel({
  scenario,
  impact
}: SelectedScenarioPanelProps) {
  return (
    <SectionCard
      title="Selected Scenario Details"
      description="Mock estimates for operator preview only."
      action={<RiskPill level={severityToRisk[scenario.severity]} />}
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{scenario.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {scenario.impactSummary}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <DetailItem label="Affected Nodes" value={String(scenario.affectedNodes.length)} />
          <DetailItem label="Estimated Delay" value={impact.estimatedDelay} />
          <DetailItem label="Economic Impact" value={impact.estimatedEconomicImpact} />
          <DetailItem label="Carbon Impact" value={impact.estimatedCarbonImpact} />
        </div>

        <div className="rounded-md border border-border bg-background p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Recommended Next Page
          </p>
          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-foreground">
              {impact.recommendedResponse}
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          </div>
        </div>

        <StatusBadge label={impact.status} variant="info" />
      </div>
    </SectionCard>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
