import { AlertTriangle, GitBranch, Network, ShieldCheck } from "lucide-react";
import clsx from "clsx";
import { SectionCard } from "@/components/shared";
import { alerts, metrics, nodes, routes } from "@/data";

function getMetricValue(metricId: string) {
  const metric = metrics.find((item) => item.id === metricId);
  return metric ? `${metric.value}${metric.unit ? metric.unit : ""}` : "N/A";
}

const overviewItems = [
  {
    id: "resilience",
    label: "Resilience Score",
    value: getMetricValue("metric-resilience-score").replace("/100", ""),
    suffix: "/100",
    detail: "Stable",
    icon: ShieldCheck,
    tone: "info"
  },
  {
    id: "alerts",
    label: "Active Alerts",
    value: String(alerts.length).padStart(2, "0"),
    detail: "High Priority",
    icon: AlertTriangle,
    tone: "warning"
  },
  {
    id: "risk-nodes",
    label: "At Risk Nodes",
    value: String(nodes.filter((node) => node.status !== "operational").length),
    detail: "Odisha Corridor",
    icon: Network,
    tone: "success"
  },
  {
    id: "routes",
    label: "Disrupted Routes",
    value: String(routes.filter((route) => route.status !== "clear").length),
    detail: "Needs Review",
    icon: GitBranch,
    tone: "danger"
  }
] as const;

const toneClasses = {
  danger: "text-danger border-danger/25 bg-danger/10",
  info: "text-primary border-primary/25 bg-primary/10",
  success: "text-success border-success/25 bg-success/10",
  warning: "text-warning border-warning/25 bg-warning/10"
};

export function ControlRoomKpis() {
  return (
    <SectionCard
      title="System Overview"
      description="National command posture."
      className="h-full"
    >
      <div className="grid grid-cols-2 gap-3">
        {overviewItems.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.id}
              className="rounded-md border border-border bg-background/70 p-3 transition-colors hover:border-border-strong hover:bg-secondary/40"
            >
              <div className="flex items-start gap-3">
                <span
                  className={clsx(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border",
                    toneClasses[item.tone]
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="type-caption">{item.label}</p>
                  <p className={clsx("mt-1 text-2xl font-semibold leading-7", toneClasses[item.tone].split(" ")[0])}>
                    {item.value}
                    {"suffix" in item ? (
                      <span className="ml-1 text-sm font-medium text-muted-foreground">
                        {item.suffix}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </SectionCard>
  );
}
