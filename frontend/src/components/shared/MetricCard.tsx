import type { ReactNode } from "react";
import clsx from "clsx";

export type MetricTrendDirection = "up" | "down" | "neutral";
export type MetricStatus = "success" | "warning" | "danger" | "info" | "neutral";

export interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  trend?: string;
  trendDirection?: MetricTrendDirection;
  status?: MetricStatus;
  className?: string;
}

const statusClasses: Record<MetricStatus, string> = {
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
  neutral: "text-muted-foreground"
};

const trendClasses: Record<MetricTrendDirection, string> = {
  up: "text-success",
  down: "text-danger",
  neutral: "text-muted-foreground"
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendDirection = "neutral",
  status = "neutral",
  className
}: MetricCardProps) {
  return (
    <article
      className={clsx(
        "rounded-md border border-border bg-card p-3.5 text-card-foreground lg:p-4",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {title}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-normal text-foreground">
            {value}
          </p>
        </div>
        {icon ? (
          <div
            className={clsx(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary",
              statusClasses[status]
            )}
          >
            {icon}
          </div>
        ) : null}
      </div>
      {subtitle || trend ? (
        <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          {trend ? (
            <span className={clsx("font-medium", trendClasses[trendDirection])}>
              {trend}
            </span>
          ) : null}
          {subtitle ? <span className="text-muted-foreground">{subtitle}</span> : null}
        </div>
      ) : null}
    </article>
  );
}
