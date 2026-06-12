import { Building2, Cloud, IndianRupee, ShieldCheck, Truck, Users } from "lucide-react";
import { MetricCard } from "@/components/shared";
import { impactKpis } from "@/data";

const iconByKpiId = {
  "impact-economic": <IndianRupee className="h-4 w-4" aria-hidden="true" />,
  "impact-population": <Users className="h-4 w-4" aria-hidden="true" />,
  "impact-infrastructure": <Building2 className="h-4 w-4" aria-hidden="true" />,
  "impact-trade": <Truck className="h-4 w-4" aria-hidden="true" />,
  "impact-carbon": <Cloud className="h-4 w-4" aria-hidden="true" />,
  "impact-recovery-savings": <ShieldCheck className="h-4 w-4" aria-hidden="true" />
} as const;

export function ImpactKpiRow() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
      {impactKpis.map((kpi) => (
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
