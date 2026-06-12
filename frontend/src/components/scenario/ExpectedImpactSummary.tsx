import { Activity, Cloud, Clock, IndianRupee, Users } from "lucide-react";
import { MetricCard } from "@/components/shared";
import type { ScenarioSimulationImpact } from "@/data";

export interface ExpectedImpactSummaryProps {
  impact: ScenarioSimulationImpact;
}

export function ExpectedImpactSummary({ impact }: ExpectedImpactSummaryProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
      <MetricCard
        title="Delay Increase"
        value={impact.estimatedDelay}
        subtitle="Mock logistics estimate"
        icon={<Clock className="h-4 w-4" aria-hidden="true" />}
        status="warning"
      />
      <MetricCard
        title="Economic Exposure"
        value={impact.estimatedEconomicImpact}
        subtitle="Dummy value"
        icon={<IndianRupee className="h-4 w-4" aria-hidden="true" />}
        status="warning"
      />
      <MetricCard
        title="Population Risk"
        value={impact.populationRisk}
        subtitle="Mock population exposure"
        icon={<Users className="h-4 w-4" aria-hidden="true" />}
        status="danger"
      />
      <MetricCard
        title="Carbon Impact"
        value={impact.estimatedCarbonImpact}
        subtitle="Dummy rerouting impact"
        icon={<Cloud className="h-4 w-4" aria-hidden="true" />}
        status="info"
      />
      <MetricCard
        title="Resilience Drop"
        value={impact.resilienceDrop}
        subtitle="Preview-only score movement"
        icon={<Activity className="h-4 w-4" aria-hidden="true" />}
        status="danger"
      />
    </section>
  );
}
