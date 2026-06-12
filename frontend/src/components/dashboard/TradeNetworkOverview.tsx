import type { ReactNode } from "react";
import { Activity, Anchor, Boxes, Route } from "lucide-react";
import { ChartCard, MapPlaceholder, SectionCard, StatusBadge } from "@/components/shared";
import { nodes, routes, tradeFlowTrend } from "@/data";

export function TradeNetworkOverview() {
  const portNodes = nodes.filter((node) => node.type === "port").length;
  const warehouseNodes = nodes.filter((node) => node.type === "warehouse").length;
  const stressedRoutes = routes.filter((route) =>
    ["congested", "blocked", "rerouted", "watch"].includes(route.status)
  ).length;

  return (
    <div className="space-y-6">
      <SectionCard
        title="Trade Network Overview"
        description="Mock India trade corridor view with ports, warehouses, route stress, and bottleneck indicators."
        action={<StatusBadge label="Map Placeholder" variant="info" size="sm" />}
      >
        <div className="space-y-4">
          <MapPlaceholder
            title="India Trade Corridor Preview"
            description="Port nodes, warehouse nodes, and stressed route indicators are represented as a digital twin placeholder. No real map library is loaded."
            variant="corridor"
          />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <NetworkStat
              icon={<Anchor className="h-4 w-4" aria-hidden="true" />}
              label="Port Nodes"
              value={String(portNodes)}
            />
            <NetworkStat
              icon={<Boxes className="h-4 w-4" aria-hidden="true" />}
              label="Warehouse Nodes"
              value={String(warehouseNodes)}
            />
            <NetworkStat
              icon={<Route className="h-4 w-4" aria-hidden="true" />}
              label="Route Links"
              value={String(routes.length)}
            />
            <NetworkStat
              icon={<Activity className="h-4 w-4" aria-hidden="true" />}
              label="Stressed Routes"
              value={String(stressedRoutes)}
            />
          </div>
        </div>
      </SectionCard>

      <ChartCard
        title="Trade Flow Trend"
        description="Dummy trend placeholder. Recharts is not installed for this issue."
      >
        <div className="flex h-full w-full items-end gap-3 px-4 py-6">
          {tradeFlowTrend.map((point) => (
            <div key={point.id} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-36 w-full items-end rounded-md bg-secondary">
                <div
                  className="w-full rounded-md bg-primary"
                  style={{ height: `${point.value}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{point.label}</span>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}

function NetworkStat({
  icon,
  label,
  value
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-border bg-background p-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="mt-2 text-xl font-semibold text-foreground">{value}</p>
    </div>
  );
}
