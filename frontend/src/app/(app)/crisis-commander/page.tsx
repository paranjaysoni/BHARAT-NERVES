import { CrisisCommanderClient } from "@/components/commander/CrisisCommanderClient";
import { CrisisMapPanel } from "@/components/commander/CrisisMapPanel";
import {
  Anchor,
  ArrowRight,
  Bell,
  CircleDot,
  CloudLightning,
  Home,
  MapPin,
  Route,
  ShieldAlert,
  ShipWheel,
  Siren,
  TrafficCone,
  Users,
  Waves,
  Zap
} from "lucide-react";
import clsx from "clsx";
import { PageHeader } from "@/components/shared";
import { crisisCommanderPage } from "@/data";

const kpis = [
  {
    title: "Overall Situation",
    value: "High Risk",
    description: "Multiple active threats detected",
    tone: "danger"
  },
  {
    title: "Affected Population",
    value: "12.4 Lakh",
    description: "Across 3 States",
    tone: "neutral"
  },
  {
    title: "Economic Exposure",
    value: "₹ 12.4 Cr",
    description: "Estimated Impact",
    tone: "info"
  },
  {
    title: "Recovery Time (Est.)",
    value: "8-12 Days",
    description: "With Current Response",
    tone: "warning"
  },
  {
    title: "Active Incidents",
    value: "05",
    description: "Requires Attention",
    tone: "neutral"
  },
  {
    title: "Response Readiness",
    value: "85%",
    description: "All Systems Active",
    tone: "success",
    progress: 85
  }
] as const;

const incidents = [
  {
    icon: CloudLightning,
    title: "Cyclone Landfall",
    location: "Odisha Coast",
    description: "Landfall expected in 2-3 hrs",
    severity: "Critical",
    time: "11:30 AM",
    tone: "critical"
  },
  {
    icon: Anchor,
    title: "Port Disruption",
    location: "Paradip Port",
    description: "Operations partially halted",
    severity: "High",
    time: "10:45 AM",
    tone: "high"
  },
  {
    icon: TrafficCone,
    title: "NH-16 Corridor Blockage",
    location: "Vizag Sector",
    description: "Heavy congestion due to landslide",
    severity: "High",
    time: "10:10 AM",
    tone: "high"
  },
  {
    icon: Zap,
    title: "Power Outage",
    location: "Coastal Odisha",
    description: "Multiple districts affected",
    severity: "Medium",
    time: "09:50 AM",
    tone: "medium"
  },
  {
    icon: Waves,
    title: "Flood Warning",
    location: "Mahanadi Basin",
    description: "Water levels rising",
    severity: "Medium",
    time: "09:20 AM",
    tone: "medium"
  }
] as const;

const responseActions = [
  {
    icon: Siren,
    action: "NDRF Teams Deployed",
    region: "Odisha Coast",
    status: "In Progress",
    tone: "danger"
  },
  {
    icon: Users,
    action: "Evacuation Initiated",
    region: "3 Districts",
    status: "In Progress",
    tone: "danger"
  },
  {
    icon: ShipWheel,
    action: "Port Operations",
    region: "Paradip Port",
    status: "Partial",
    tone: "warning"
  },
  {
    icon: Route,
    action: "Traffic Diversion",
    region: "NH-16 Corridor",
    status: "Completed",
    tone: "info"
  },
  {
    icon: Zap,
    action: "Power Restoration",
    region: "Coastal Districts",
    status: "In Progress",
    tone: "neutral"
  }
] as const;

const situationRows = [
  ["Affected States", "Odisha, Andhra Pradesh, Maharashtra"],
  ["Districts Affected", "12"],
  ["People at Risk", "12.4 Lakh"],
  ["Evacuated", "2.8 Lakh"],
  ["Shelters Open", "156"],
  ["Relief Camps", "42"]
] as const;

const deploymentRows = [
  ["NDRF Teams", "18 / 25", "bg-info"],
  ["Medical Teams", "12 / 20", "bg-success"],
  ["Helicopters", "06 / 10", "bg-emerald-300"],
  ["Boats", "24 / 40", "bg-warning"],
  ["Relief Vehicles", "35 / 60", "bg-orange-500"]
] as const;

const impactRows = [
  ["Economic Impact", "₹ 12.4 Cr", "High", ShieldAlert, "danger"],
  ["Infrastructure Damage", "₹ 4.6 Cr", "High", TrafficCone, "warning"],
  ["Agriculture Impact", "₹ 2.1 Cr", "Medium", Home, "success"],
  ["Trade Disruption", "₹ 5.7 Cr", "High", Bell, "danger"]
] as const;

const communications = [
  ["11:35 AM", "NDRF Team 7 reached Puri, Odisha", "Team Leader", "success"],
  ["11:28 AM", "Evacuation completed in Kendrapara", "District Collector", "success"],
  ["11:20 AM", "Heavy winds reported near Paradip Port", "IMD Alert", "warning"],
  ["11:10 AM", "NH-16 traffic diversion successful", "Traffic Control", "success"],
  ["10:55 AM", "Medical camp setup in Bhadrak", "Health Department", "info"]
] as const;

const toneClasses = {
  critical: "border-danger/30 bg-danger/15 text-danger",
  danger: "border-danger/30 bg-danger/15 text-danger",
  high: "border-warning/30 bg-warning/15 text-warning",
  warning: "border-warning/30 bg-warning/15 text-warning",
  medium: "border-yellow-400/30 bg-yellow-400/15 text-yellow-300",
  info: "border-info/30 bg-info/15 text-info",
  success: "border-success/30 bg-success/15 text-success",
  neutral: "border-border bg-secondary/60 text-muted-foreground"
} as const;

export default function CrisisCommanderPage() {
  return (
    <div className="space-y-3.5">
      <PageHeader
        title={crisisCommanderPage.title}
        description="Executive Decision Support & Real-time Crisis Management"
      />

      {/* Live backend-driven plan — appears after simulation runs */}
      <CrisisCommanderClient />

      <KpiStrip />

      <section className="grid gap-3 xl:grid-cols-[minmax(0,1.9fr)_minmax(285px,0.95fr)_minmax(285px,0.95fr)]">
        <CrisisMap />
        <ActiveIncidentsPanel />
        <ResponseActionsPanel />
      </section>

      <section className="grid gap-3 xl:grid-cols-4">
        <SituationOverviewPanel />
        <ResourceDeploymentPanel />
        <ImpactSummaryPanel />
        <CommunicationsLogPanel />
      </section>
    </div>
  );
}

function KpiStrip() {
  return (
    <section className="surface-card grid overflow-hidden rounded-md text-card-foreground sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {kpis.map((kpi, index) => (
        <article
          key={kpi.title}
          className={clsx(
            "min-h-[92px] px-4 py-3.5",
            index > 0 ? "border-t border-border/70 sm:border-l sm:border-t-0" : "",
            index === 2 ? "lg:border-l" : "",
            index === 3 ? "lg:border-t xl:border-t-0" : ""
          )}
        >
          <div className="flex h-full items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="type-micro-label truncate">{kpi.title}</p>
              <p
                className={clsx(
                  "mt-2 text-[1.55rem] font-semibold leading-7 tracking-normal",
                  kpi.tone === "danger" && "text-danger",
                  kpi.tone === "warning" && "text-warning",
                  kpi.tone === "success" && "text-success",
                  kpi.tone === "info" && "text-info",
                  kpi.tone === "neutral" && "text-foreground"
                )}
              >
                {kpi.value}
              </p>
              <p className="mt-1 text-xs leading-4 text-muted-foreground">
                {kpi.description}
              </p>
            </div>
            {"progress" in kpi ? <ReadinessRing value={kpi.progress} /> : null}
          </div>
        </article>
      ))}
    </section>
  );
}

function ReadinessRing({ value }: { value: number }) {
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-secondary"
        />
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="6"
          strokeDasharray={`${(value / 100) * 113} 113`}
          className="text-success"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-foreground">
        {value}%
      </span>
    </div>
  );
}

function CrisisMap() {
  return (
    <CommandPanel
      title="CRISIS MAP"
      className="min-h-[438px]"
      bodyClassName="h-[385px] overflow-hidden rounded-md"
    >
      <CrisisMapPanel />
    </CommandPanel>
  );
}

function ActiveIncidentsPanel() {
  return (
    <CommandPanel
      title="ACTIVE INCIDENTS"
      action={<button className="text-xs font-medium text-primary">View All</button>}
      className="min-h-[438px]"
    >
      <div className="divide-y divide-border/70">
        {incidents.map((incident) => {
          const Icon = incident.icon;

          return (
            <article key={incident.title} className="grid grid-cols-[36px_1fr_auto] gap-3 py-3 first:pt-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-info/20 bg-info/15 text-info">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold leading-5 text-foreground">
                  {incident.title}
                </h3>
                <p className="text-xs font-medium leading-4 text-muted-foreground">
                  {incident.location}
                </p>
                <p className="mt-0.5 line-clamp-1 text-xs leading-4 text-muted-foreground">
                  {incident.description}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className={clsx(
                    "rounded-md border px-2 py-0.5 text-[0.66rem] font-semibold",
                    toneClasses[incident.tone]
                  )}
                >
                  {incident.severity}
                </span>
                <span className="text-[0.68rem] text-muted-foreground">
                  {incident.time}
                </span>
              </div>
            </article>
          );
        })}
      </div>
      <PanelLink label="View All Incidents" />
    </CommandPanel>
  );
}

function ResponseActionsPanel() {
  return (
    <CommandPanel title="RESPONSE ACTIONS" className="min-h-[438px]">
      <div className="divide-y divide-border/70">
        {responseActions.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.action} className="grid grid-cols-[36px_1fr_auto] items-center gap-3 py-3 first:pt-0">
              <div className={clsx("flex h-9 w-9 items-center justify-center rounded-md border", toneClasses[item.tone])}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold leading-5 text-foreground">
                  {item.action}
                </h3>
                <p className="text-xs leading-4 text-muted-foreground">
                  {item.region}
                </p>
              </div>
              <span
                className={clsx(
                  "whitespace-nowrap text-xs font-medium",
                  item.status === "Completed" && "text-success",
                  item.status === "Partial" && "text-warning",
                  item.status === "In Progress" && "text-success"
                )}
              >
                {item.status}
              </span>
            </article>
          );
        })}
      </div>
      <PanelLink label="View Action Plan" />
    </CommandPanel>
  );
}

function SituationOverviewPanel() {
  return (
    <CommandPanel title="SITUATION OVERVIEW">
      <div className="divide-y divide-border/70">
        {situationRows.map(([label, value], index) => (
          <div key={label} className="flex items-center gap-3 py-2 first:pt-0">
            <div className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-secondary/60 text-muted-foreground">
              {index === 0 ? <MapPin className="h-3.5 w-3.5" /> : <CircleDot className="h-3.5 w-3.5" />}
            </div>
            <span className="min-w-0 flex-1 text-xs text-muted-foreground">
              {label}
            </span>
            <span className="max-w-[52%] truncate text-right text-xs font-medium text-foreground">
              {value}
            </span>
          </div>
        ))}
      </div>
      <PanelLink label="View Full Situation Report" />
    </CommandPanel>
  );
}

function ResourceDeploymentPanel() {
  return (
    <CommandPanel title="RESOURCE DEPLOYMENT">
      <div className="grid grid-cols-[120px_1fr] items-center gap-4 py-2">
        <div className="relative h-[112px] w-[112px]">
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(hsl(var(--info))_0_28%,hsl(var(--success))_28%_47%,hsl(82_70%_60%)_47%_62%,hsl(var(--warning))_62%_80%,hsl(24_95%_55%)_80%_100%)]" />
          <div className="absolute inset-[19px] flex flex-col items-center justify-center rounded-full border border-border bg-card">
            <span className="text-2xl font-semibold leading-none text-foreground">
              68%
            </span>
            <span className="mt-1 text-[0.68rem] text-muted-foreground">
              Deployed
            </span>
          </div>
        </div>
        <div className="space-y-2">
          {deploymentRows.map(([label, value, color]) => (
            <div key={label} className="flex items-center gap-2 text-xs">
              <span className={clsx("h-2.5 w-2.5 rounded-full", color)} />
              <span className="min-w-0 flex-1 truncate text-muted-foreground">
                {label}
              </span>
              <span className="font-medium text-foreground">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <PanelLink label="View Resources" />
    </CommandPanel>
  );
}

function ImpactSummaryPanel() {
  return (
    <CommandPanel title="IMPACT SUMMARY">
      <div className="divide-y divide-border/70">
        {impactRows.map(([label, value, severity, Icon, tone]) => (
          <div key={label as string} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 py-2.5 first:pt-0">
            <div className={clsx("flex h-8 w-8 items-center justify-center rounded-md border", toneClasses[tone as keyof typeof toneClasses])}>
              <Icon className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-foreground">{label}</span>
            <div className="text-right">
              <p className="text-sm font-semibold leading-4 text-foreground">{value}</p>
              <p className="text-[0.68rem] text-muted-foreground">{severity}</p>
            </div>
          </div>
        ))}
      </div>
      <PanelLink label="View Impact Dashboard" />
    </CommandPanel>
  );
}

function CommunicationsLogPanel() {
  return (
    <CommandPanel
      title="COMMUNICATIONS LOG"
      action={<button className="text-xs font-medium text-primary">View All</button>}
    >
      <div className="space-y-2.5">
        {communications.map(([time, event, department, status]) => (
          <div key={`${time}-${event}`} className="grid grid-cols-[52px_10px_1fr] gap-3 text-xs">
            <span className="text-muted-foreground">{time}</span>
            <span
              className={clsx(
                "mt-1.5 h-2.5 w-2.5 rounded-full",
                status === "success" && "bg-success",
                status === "warning" && "bg-warning",
                status === "info" && "bg-info"
              )}
            />
            <div className="min-w-0">
              <p className="truncate font-medium text-foreground">{event}</p>
              <p className="truncate text-muted-foreground">{department}</p>
            </div>
          </div>
        ))}
      </div>
      <PanelLink label="View Communication Center" />
    </CommandPanel>
  );
}

function CommandPanel({
  title,
  action,
  children,
  className,
  bodyClassName
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={clsx("surface-card rounded-md p-3.5 text-card-foreground", className)}>
      <div className="mb-3 flex min-h-7 items-center justify-between gap-3 border-b border-border/70 pb-3">
        <h2 className="text-sm font-semibold uppercase leading-5 text-foreground">
          {title}
        </h2>
        {action}
      </div>
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

function PanelLink({ label }: { label: string }) {
  return (
    <button className="mt-3 flex h-8 w-full items-center justify-center gap-2 rounded-md border border-border bg-background/60 text-xs font-medium text-primary hover:bg-secondary">
      {label}
      <ArrowRight className="h-3.5 w-3.5" />
    </button>
  );
}
