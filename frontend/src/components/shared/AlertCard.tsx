import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import clsx from "clsx";
import type { AlertSeverity } from "@/types";

export interface AlertCardProps {
  title: string;
  description: string;
  severity: AlertSeverity;
  timestamp: string;
  icon?: ReactNode;
}

const severityClasses: Record<AlertSeverity, string> = {
  info: "text-info bg-info/10 border-info/30",
  warning: "text-warning bg-warning/10 border-warning/40",
  danger: "text-danger bg-danger/10 border-danger/35",
  critical: "text-danger bg-danger/10 border-danger/35"
};

export function AlertCard({
  title,
  description,
  severity,
  timestamp,
  icon
}: AlertCardProps) {
  return (
    <article className="rounded-md border border-border bg-card p-3.5 text-card-foreground">
      <div className="flex gap-2.5">
        <div
          className={clsx(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border",
            severityClasses[severity]
          )}
        >
          {icon ?? <AlertTriangle className="h-4 w-4" aria-hidden="true" />}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            <span className="text-xs capitalize text-muted-foreground">
              {severity}
            </span>
          </div>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            {description}
          </p>
          <time className="mt-1.5 block text-xs text-muted-foreground">
            {timestamp}
          </time>
        </div>
      </div>
    </article>
  );
}
