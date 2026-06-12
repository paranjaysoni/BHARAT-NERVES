import { Anchor, Boxes, Clock, GitBranch, Gauge } from "lucide-react";
import { MetricCard } from "@/components/shared";
import { tradeKpis } from "@/data";

const iconByKpiId = {
  "trade-flow-index": <Gauge className="h-4 w-4" aria-hidden="true" />,
  "supply-chain-stress": <GitBranch className="h-4 w-4" aria-hidden="true" />,
  "transit-delay": <Clock className="h-4 w-4" aria-hidden="true" />,
  "active-bottlenecks": <Boxes className="h-4 w-4" aria-hidden="true" />,
  "port-health": <Anchor className="h-4 w-4" aria-hidden="true" />
} as const;

export function TradeKpiRow() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {tradeKpis.map((kpi) => (
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
