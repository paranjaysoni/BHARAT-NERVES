import { Activity, Clock, Cloud, IndianRupee, Route, Users } from "lucide-react";
import { MetricCard } from "@/components/shared";
import { expectedOutcomes } from "@/data";

const iconByOutcomeId = {
  "outcome-economic-loss": <IndianRupee className="h-4 w-4" aria-hidden="true" />,
  "outcome-population-protected": <Users className="h-4 w-4" aria-hidden="true" />,
  "outcome-routes-preserved": <Route className="h-4 w-4" aria-hidden="true" />,
  "outcome-recovery-time": <Clock className="h-4 w-4" aria-hidden="true" />,
  "outcome-carbon-managed": <Cloud className="h-4 w-4" aria-hidden="true" />
} as const;

export function ExpectedOutcomes() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {expectedOutcomes.map((outcome) => (
        <MetricCard
          key={outcome.id}
          title={outcome.title}
          value={outcome.value}
          subtitle={outcome.subtitle}
          icon={
            iconByOutcomeId[outcome.id as keyof typeof iconByOutcomeId] ?? (
              <Activity className="h-4 w-4" aria-hidden="true" />
            )
          }
          status={outcome.status}
        />
      ))}
    </section>
  );
}
