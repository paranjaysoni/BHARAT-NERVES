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
  info: "text-info bg-info/10 border-info/25",
  warning: "text-warning bg-warning/10 border-warning/30",
  danger: "text-danger bg-danger/10 border-danger/25",
  critical: "text-danger bg-danger/10 border-danger/25"
};

export function AlertCard({
  title,
  description,
  severity,
  timestamp,
  icon
}: AlertCardProps) {
  return (
    <article className="surface-card rounded-md p-3.5 text-card-foreground">
      <div className="flex gap-2.5">
        <div
          className={clsx(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border shadow-sm",
            severityClasses[severity]
          )}
        >
          {icon ?? <AlertTriangle className="h-4 w-4" aria-hidden="true" />}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="type-card-title">{title}</h3>
            <span className="type-caption capitalize">
              {severity}
            </span>
          </div>
          <p className="type-body mt-1">
            {description}
          </p>
          <time className="type-caption mt-1.5 block">
            {timestamp}
          </time>
        </div>
      </div>
    </article>
  );
}
