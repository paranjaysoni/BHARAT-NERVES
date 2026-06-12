import { SectionCard, StatusBadge } from "@/components/shared";
import { commanderActions } from "@/data";
import type { CrisisActionStatus } from "@/types";

const statusVariant: Record<CrisisActionStatus, "success" | "warning" | "danger" | "info" | "neutral"> = {
  blocked: "danger",
  "in-progress": "info",
  pending: "warning",
  prepared: "success"
};

export function ActionPlan() {
  return (
    <SectionCard
      title="Recommended Action Plan"
      description="Command-ready response actions derived from mock platform insights."
    >
      <div className="space-y-3">
        {commanderActions.map((action) => (
          <article
            key={action.id}
            className="rounded-md border border-border bg-background p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-primary">
                  {action.priority}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-foreground">
                  {action.action}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Owner: {action.owner} · Resource: {action.resource}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Expected impact: {action.expectedImpact}
                </p>
              </div>
              <StatusBadge
                label={action.status}
                variant={statusVariant[action.status]}
                size="sm"
              />
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
