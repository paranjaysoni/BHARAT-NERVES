import type { ReactNode } from "react";
import { GitBranch, RadioTower } from "lucide-react";
import { MapPlaceholder, SectionCard, StatusBadge } from "@/components/shared";
import { nodes, routes, selectedCorridor } from "@/data";

export function DigitalTwinOverview() {
  const operationalNodes = nodes.filter((node) => node.status === "operational").length;
  const watchNodes = nodes.filter((node) => node.status === "watch").length;
  const stressedNodes = nodes.filter((node) => node.status === "stressed").length;

  return (
    <SectionCard
      title="India Digital Twin"
      description="Odisha Corridor preview with mock infrastructure nodes and route lines."
      className="h-full"
      action={<StatusBadge label={selectedCorridor.status} variant="warning" size="sm" />}
    >
      <div className="space-y-4">
        <MapPlaceholder
          title={`${selectedCorridor.name} Preview`}
          description={`${nodes.length} monitored demo nodes and ${routes.length} route links represented as a polished placeholder. Leaflet integration is planned for a later issue.`}
          variant="corridor"
        />

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <TwinStat
            icon={<RadioTower className="h-4 w-4" aria-hidden="true" />}
            label="Mock Nodes"
            value={String(nodes.length)}
          />
          <TwinStat
            icon={<GitBranch className="h-4 w-4" aria-hidden="true" />}
            label="Route Lines"
            value={String(routes.length)}
          />
          <TwinStat label="Operational" value={String(operationalNodes)} />
          <TwinStat label="Watch/Stressed" value={String(watchNodes + stressedNodes)} />
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <LegendItem className="bg-success" label="Operational" />
          <LegendItem className="bg-warning" label="Watch" />
          <LegendItem className="bg-danger" label="Stressed" />
          <LegendItem className="bg-info" label="Route Link" />
        </div>
      </div>
    </SectionCard>
  );
}

function TwinStat({
  icon,
  label,
  value
}: {
  icon?: ReactNode;
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

function LegendItem({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${className}`} />
      {label}
    </span>
  );
}
