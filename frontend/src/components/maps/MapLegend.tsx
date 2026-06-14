"use client";

import clsx from "clsx";
import type { BackendRouteType, ImpactLevel } from "./types";

export interface MapLegendProps {
  showRouteTypes?: boolean;
  showImpact?: boolean;
  compact?: boolean;
}

const statusItems = [
  ["Operational", "bg-[#16a34a]"],
  ["Warning", "bg-[#facc15]"],
  ["At Risk", "bg-[#f97316]"],
  ["Disrupted", "bg-[#dc2626]"]
] as const;

const routeItems: Array<[BackendRouteType, string, string]> = [
  ["ROAD", "Road", "bg-[#60a5fa]"],
  ["RAIL", "Rail", "bg-[#a78bfa]"],
  ["PORT_LINK", "Port Link", "bg-[#38bdf8]"],
  ["EMERGENCY", "Emergency", "bg-[#ef4444]"]
];

const impactItems: Array<[ImpactLevel, string, string]> = [
  ["LOW", "Low", "bg-[#38bdf8]"],
  ["MEDIUM", "Medium", "bg-[#facc15]"],
  ["HIGH", "High", "bg-[#f97316]"],
  ["CRITICAL", "Critical", "bg-[#dc2626]"]
];

export function MapLegend({
  showRouteTypes = true,
  showImpact = false,
  compact = false
}: MapLegendProps) {
  return (
    <div
      className={clsx(
        "pointer-events-auto absolute bottom-3 left-3 z-[500] rounded-md border border-white/10 bg-slate-950/80 text-white shadow-lg backdrop-blur-md",
        compact ? "p-2" : "p-3"
      )}
    >
      <div className={clsx("grid gap-2", compact ? "text-[10px]" : "text-xs")}>
        <LegendGroup title="Node Status" items={statusItems} />
        {showRouteTypes ? <LegendGroup title="Route Type" items={routeItems.map(([, label, color]) => [label, color] as const)} line /> : null}
        {showImpact ? <LegendGroup title="Impact" items={impactItems.map(([, label, color]) => [label, color] as const)} /> : null}
      </div>
    </div>
  );
}

function LegendGroup({
  title,
  items,
  line = false
}: {
  title: string;
  items: ReadonlyArray<readonly [string, string]>;
  line?: boolean;
}) {
  return (
    <div>
      <p className="mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
        {title}
      </p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
        {items.map(([label, color]) => (
          <span key={label} className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <span className={clsx(line ? "h-0.5 w-4 rounded-full" : "h-2 w-2 rounded-full", color)} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

