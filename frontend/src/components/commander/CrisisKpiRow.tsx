import { Activity, Gauge, IndianRupee, ShieldAlert, Users } from "lucide-react";
import { MetricCard } from "@/components/shared";
import { crisisKpis } from "@/data";

const iconByKpiId = {
  "crisis-severity": <ShieldAlert className="h-4 w-4" aria-hidden="true" />,
  "decision-readiness": <Gauge className="h-4 w-4" aria-hidden="true" />,
  "population-risk": <Users className="h-4 w-4" aria-hidden="true" />,
  "economic-exposure": <IndianRupee className="h-4 w-4" aria-hidden="true" />,
  "recovery-confidence": <Activity className="h-4 w-4" aria-hidden="true" />
} as const;

export function CrisisKpiRow() {
  return (
    <section className="app-kpi-grid xl:grid-cols-5">
      {crisisKpis.map((kpi) => (
        <MetricCard
          key={kpi.id}
          title={kpi.title}
          value={kpi.value}
          subtitle={kpi.subtitle}
          icon={iconByKpiId[kpi.id as keyof typeof iconByKpiId]}
          status={kpi.status}
        />
      ))}
    </section>
  );
}
