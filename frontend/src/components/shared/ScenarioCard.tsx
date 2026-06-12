import type { ReactNode } from "react";
import clsx from "clsx";
import type { ScenarioSeverity } from "@/types";
import { RiskPill } from "@/components/shared/RiskPill";
import { StatusBadge } from "@/components/shared/StatusBadge";

export interface ScenarioCardProps {
  title: string;
  description: string;
  severity: ScenarioSeverity;
  status: string;
  icon?: ReactNode;
  actionLabel?: string;
}

const severityToRisk: Record<ScenarioSeverity, "low" | "medium" | "high" | "critical"> = {
  low: "low",
  moderate: "medium",
  high: "high",
  critical: "critical"
};

export function ScenarioCard({
  title,
  description,
  severity,
  status,
  icon,
  actionLabel
}: ScenarioCardProps) {
  return (
    <article className="rounded-lg border border-border bg-card p-5 text-card-foreground">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          {icon ? (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
              {icon}
            </div>
          ) : null}
          <div>
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
        <RiskPill level={severityToRisk[severity]} />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <StatusBadge label={status} variant="info" size="sm" />
        {actionLabel ? (
          <button
            type="button"
            className={clsx(
              "rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground",
              "transition-colors hover:bg-secondary"
            )}
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </article>
  );
}
