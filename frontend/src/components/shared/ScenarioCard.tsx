"use client";

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
  isSelected?: boolean;
  onSelect?: () => void;
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
  actionLabel,
  isSelected = false,
  onSelect
}: ScenarioCardProps) {
  return (
    <article
      className={clsx(
        "surface-card focus-ring rounded-md p-4 text-card-foreground lg:p-5",
        isSelected ? "border-primary shadow-[0_0_0_1px_hsl(var(--primary)/0.35)]" : null,
        onSelect ? "cursor-pointer hover:bg-secondary/30" : null
      )}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (!onSelect) {
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-pressed={onSelect ? isSelected : undefined}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          {icon ? (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary shadow-sm">
              {icon}
            </div>
          ) : null}
          <div>
            <h3 className="type-section-title">{title}</h3>
            <p className="type-body mt-2">
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
            onClick={(event) => {
              event.stopPropagation();
              onSelect?.();
            }}
            className={clsx(
              "btn btn-outline h-8 px-2.5"
            )}
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </article>
  );
}
