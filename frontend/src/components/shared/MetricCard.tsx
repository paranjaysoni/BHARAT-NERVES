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
        "rounded-lg border border-border bg-card p-5 text-card-foreground",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-normal text-foreground">
            {value}
          </p>
        </div>
        {icon ? (
          <div
            className={clsx(
              "flex h-10 w-10 items-center justify-center rounded-md bg-secondary",
              statusClasses[status]
            )}
          >
            {icon}
          </div>
        ) : null}
      </div>
      {subtitle || trend ? (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
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
