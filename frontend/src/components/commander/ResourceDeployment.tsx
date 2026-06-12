import { RiskPill, SectionCard, StatusBadge } from "@/components/shared";
import { resourceDeployments } from "@/data";
import type { CrisisRiskLevel } from "@/types";

const riskToPillLevel: Record<CrisisRiskLevel, "low" | "medium" | "high" | "critical"> = {
  critical: "critical",
  high: "high",
  low: "low",
  medium: "medium"
};

export function ResourceDeployment() {
  return (
    <SectionCard
      title="Resource Deployment Plan"
      description="Mock resource availability, assignment status, and deployment regions."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {resourceDeployments.map((resource) => (
          <article
            key={resource.id}
            className="rounded-md border border-border bg-background p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {resource.resource}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {resource.availability} · {resource.deploymentRegion}
                </p>
              </div>
              <RiskPill level={riskToPillLevel[resource.riskLevel]} />
            </div>
            <div className="mt-3">
              <StatusBadge
                label={resource.assignedStatus}
                variant="info"
                size="sm"
              />
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
