import { AlertTriangle, Building2, IndianRupee, RadioTower, ShieldCheck } from "lucide-react";
import { MetricCard } from "@/components/shared";
import { alerts, metrics, systemStatus } from "@/data";

function getMetricValue(metricId: string) {
  const metric = metrics.find((item) => item.id === metricId);
  return metric ? `${metric.value}${metric.unit ? metric.unit : ""}` : "N/A";
}

export function ControlRoomKpis() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <MetricCard
        title="Resilience Score"
        value={getMetricValue("metric-resilience-score")}
        subtitle="Corridor readiness"
        icon={<ShieldCheck className="h-4 w-4" aria-hidden="true" />}
        trend="stable"
        trendDirection="neutral"
        status="success"
      />
      <MetricCard
        title="Active Alerts"
        value={String(alerts.length)}
        subtitle="Requires operator watch"
        icon={<AlertTriangle className="h-4 w-4" aria-hidden="true" />}
        trend="elevated"
        trendDirection="up"
        status="warning"
      />
      <MetricCard
        title="Nodes Monitored"
        value={String(systemStatus.nodesMonitored)}
        subtitle={`${systemStatus.uptime} platform uptime`}
        icon={<RadioTower className="h-4 w-4" aria-hidden="true" />}
        status="info"
      />
      <MetricCard
        title="Corridors Online"
        value={String(systemStatus.activeCorridors)}
        subtitle="National network view"
        icon={<Building2 className="h-4 w-4" aria-hidden="true" />}
        status="success"
      />
      <MetricCard
        title="Economic Exposure"
        value={getMetricValue("metric-economic-impact")}
        subtitle="Mock scenario estimate"
        icon={<IndianRupee className="h-4 w-4" aria-hidden="true" />}
        trend="watch"
        trendDirection="neutral"
        status="warning"
      />
    </section>
  );
}
