import { AlertTriangle, Anchor, ExternalLink, Route, Warehouse } from "lucide-react";
import { SectionCard } from "@/components/shared";

const alerts = [
  {
    description: "High congestion",
    icon: <Anchor className="h-4 w-4" aria-hidden="true" />,
    severity: "danger",
    time: "11:31 AM",
    title: "Paradip Port"
  },
  {
    description: "Heavy traffic",
    icon: <Route className="h-4 w-4" aria-hidden="true" />,
    severity: "warning",
    time: "11:24 AM",
    title: "NH-16 Corridor"
  },
  {
    description: "Weather impact",
    icon: <AlertTriangle className="h-4 w-4" aria-hidden="true" />,
    severity: "warning",
    time: "11:18 AM",
    title: "Assam Corridor"
  },
  {
    description: "Operational delay",
    icon: <Anchor className="h-4 w-4" aria-hidden="true" />,
    severity: "info",
    time: "11:10 AM",
    title: "Chennai Port"
  },
  {
    description: "Normal operations",
    icon: <Warehouse className="h-4 w-4" aria-hidden="true" />,
    severity: "success",
    time: "11:05 AM",
    title: "ICD Tughlakabad"
  }
];

const severityClass = {
  danger: "bg-danger/15 text-danger ring-danger/30",
  info: "bg-info/15 text-info ring-info/30",
  success: "bg-success/15 text-success ring-success/30",
  warning: "bg-warning/15 text-warning ring-warning/30"
};

export function TradeAlertsPanel() {
  return (
    <SectionCard
      title="Active Alerts"
      action={<button className="text-xs font-medium text-primary">View All</button>}
      className="h-full"
    >
      <div className="divide-y divide-border/70">
        {alerts.map((alert) => (
          <div key={alert.title} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-md ring-1 ${severityClass[alert.severity as keyof typeof severityClass]}`}>
              {alert.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-card-foreground">{alert.title}</p>
              <p className="truncate text-xs text-muted-foreground">{alert.description}</p>
            </div>
            <p className="shrink-0 text-xs text-muted-foreground">{alert.time}</p>
          </div>
        ))}
      </div>
      <button className="btn btn-secondary mt-4 w-full justify-center">
        View All Alerts
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </SectionCard>
  );
}
