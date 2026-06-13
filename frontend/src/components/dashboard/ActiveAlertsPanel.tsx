import clsx from "clsx";
import { SectionCard } from "@/components/shared";
import { alerts } from "@/data";
import type { AlertSeverity } from "@/types";

const severityTone: Record<AlertSeverity, string> = {
  critical: "bg-danger text-danger border-danger/30",
  danger: "bg-danger text-danger border-danger/30",
  info: "bg-info text-info border-info/30",
  warning: "bg-warning text-warning border-warning/30"
};

export function ActiveAlertsPanel() {
  return (
    <SectionCard
      title="Active Alerts"
      description="Command stream"
      className="h-full"
      action={<span className="text-xs font-medium text-primary">View All</span>}
    >
      <div className="max-h-[310px] space-y-1.5 overflow-auto pr-1">
        {alerts.slice(0, 4).map((alert) => (
          <article
            key={alert.id}
            className="group border-b border-border px-1 py-2.5 last:border-b-0"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className={clsx(
                    "h-2.5 w-2.5 shrink-0 rounded-full border",
                    severityTone[alert.severity]
                  )}
                />
                <p className="truncate text-sm font-semibold text-foreground">
                  {alert.title}
                </p>
              </div>
              <time className="shrink-0 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                {formatAlertTime(alert.timestamp)}
              </time>
            </div>
            <div className="mt-1 flex items-center justify-between gap-3">
              <p className="truncate text-xs text-muted-foreground">
                {alert.affectedArea}
              </p>
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {alert.severity}
              </span>
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}

function formatAlertTime(timestamp: string) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(timestamp));
}
