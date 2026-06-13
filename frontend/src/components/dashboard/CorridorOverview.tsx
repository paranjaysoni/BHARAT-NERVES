import {
  Anchor,
  Building2,
  Hospital,
  RadioTower,
  ShieldAlert,
  Warehouse
} from "lucide-react";
import { SectionCard, StatusBadge } from "@/components/shared";
import { controlRoomFeaturedNodeIds, nodes, selectedCorridor } from "@/data";
import type { AegisNodeStatus, AegisNodeType } from "@/types";

const statusVariant: Record<AegisNodeStatus, "success" | "warning" | "danger" | "info" | "neutral"> = {
  disrupted: "danger",
  operational: "success",
  stressed: "warning",
  watch: "info"
};

const iconByType: Record<AegisNodeType, typeof RadioTower> = {
  "district-hub": Building2,
  hospital: Hospital,
  port: Anchor,
  "power-station": RadioTower,
  "relief-center": ShieldAlert,
  "transport-junction": RadioTower,
  warehouse: Warehouse
};

const importanceByStatus: Record<AegisNodeStatus, string> = {
  disrupted: "Critical",
  operational: "Stable",
  stressed: "Priority",
  watch: "Watch"
};

export function CorridorOverview() {
  const featuredNodes = controlRoomFeaturedNodeIds
    .map((nodeId) => nodes.find((node) => node.id === nodeId))
    .filter((node) => node !== undefined);

  return (
    <SectionCard
      title="Corridor Assets"
      description={`${selectedCorridor.name} infrastructure currently surfaced for command review.`}
    >
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {featuredNodes.map((node) => {
          const Icon = iconByType[node.type];

          return (
            <article
              key={node.id}
              className="rounded-md border border-border bg-background/70 p-3 transition-colors hover:border-border-strong hover:bg-secondary/40"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-foreground">
                        {node.name}
                      </h3>
                      <p className="mt-0.5 truncate text-xs capitalize text-muted-foreground">
                        {node.type.replace("-", " ")} · {node.district}
                      </p>
                    </div>
                    <StatusBadge
                      label={node.status}
                      variant={statusVariant[node.status]}
                      size="sm"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2 border-t border-border pt-2">
                    <span className="type-micro-label">Importance</span>
                    <span className="text-xs font-semibold text-foreground">
                      {importanceByStatus[node.status]}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </SectionCard>
  );
}
