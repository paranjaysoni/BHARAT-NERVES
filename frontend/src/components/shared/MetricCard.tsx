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
  success: "border-success/25 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  danger: "border-danger/25 bg-danger/10 text-danger",
  info: "border-info/25 bg-info/10 text-info",
  neutral: "border-border bg-secondary text-muted-foreground"
};

const accentClasses: Record<MetricStatus, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  neutral: "bg-primary"
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
        "surface-card group relative overflow-hidden rounded-md p-3.5 text-card-foreground lg:p-4",
        className
      )}
    >
      <span
        className={clsx(
          "absolute inset-x-0 top-0 h-0.5 opacity-80",
          accentClasses[status]
        )}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="type-micro-label truncate">
            {title}
          </p>
          <p className="mt-2 text-[1.65rem] font-semibold leading-8 tracking-normal text-foreground">
            {value}
          </p>
        </div>
        {icon ? (
          <div
            className={clsx(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5",
              statusClasses[status]
            )}
          >
            {icon}
          </div>
        ) : null}
      </div>
      {subtitle || trend ? (
        <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-4">
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
