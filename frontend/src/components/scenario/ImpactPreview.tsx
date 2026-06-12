import { MapPlaceholder, SectionCard, StatusBadge } from "@/components/shared";
import type { ScenarioSimulationImpact } from "@/data";
import type { Scenario } from "@/types";

export interface ImpactPreviewProps {
  scenario: Scenario;
  impact: ScenarioSimulationImpact;
}

export function ImpactPreview({ scenario, impact }: ImpactPreviewProps) {
  return (
    <SectionCard
      title="Impact Preview"
      description="Digital Twin placeholder for affected districts, blocked routes, and high-risk nodes."
      action={<StatusBadge label={impact.expectedStressIncrease} variant="warning" />}
    >
      <div className="space-y-4">
        <MapPlaceholder
          title={`${scenario.title} Preview`}
          description="No Leaflet map is loaded here. This panel previews how affected routes and nodes may be visualized later."
          variant="risk"
        />

        <div className="grid gap-3 md:grid-cols-3">
          <ImpactList title="Affected Districts" items={impact.affectedDistricts} />
          <ImpactList title="Blocked Routes" items={impact.blockedRoutes} />
          <ImpactList title="High-Risk Nodes" items={impact.highRiskNodes} />
        </div>
      </div>
    </SectionCard>
  );
}

function ImpactList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border border-border bg-background p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm text-foreground">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
