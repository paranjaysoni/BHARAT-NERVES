import { SectionCard, StatusBadge } from "@/components/shared";
import { controlRoomFeaturedNodeIds, nodes, selectedCorridor } from "@/data";
import type { AegisNodeStatus } from "@/types";

const statusVariant: Record<AegisNodeStatus, "success" | "warning" | "danger" | "info" | "neutral"> = {
  disrupted: "danger",
  operational: "success",
  stressed: "warning",
  watch: "info"
};

export function CorridorOverview() {
  const featuredNodes = controlRoomFeaturedNodeIds
    .map((nodeId) => nodes.find((node) => node.id === nodeId))
    .filter((node) => node !== undefined);

  return (
    <SectionCard
      title="Corridor Overview"
      description={`${selectedCorridor.name} assets currently highlighted for operator review.`}
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {featuredNodes.map((node) => (
          <article
            key={node.id}
            className="rounded-md border border-border bg-background p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {node.name}
                </h3>
                <p className="mt-1 text-xs capitalize text-muted-foreground">
                  {node.type.replace("-", " ")} · {node.district}
                </p>
              </div>
              <StatusBadge
                label={node.status}
                variant={statusVariant[node.status]}
                size="sm"
              />
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
