import { CrisisCommanderClient } from "@/components/commander/CrisisCommanderClient";
import {
  Anchor,
  ArrowRight,
  Bell,
  CircleDot,
  CloudLightning,
  Home,
  Layers,
  LocateFixed,
  MapPin,
  Minus,
  Plus,
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
      action={
        <button className="btn btn-outline h-8 gap-2 px-2.5 text-xs">
          All Threats
          <span className="text-muted-foreground">⌄</span>
        </button>
      }
      className="min-h-[438px]"
      bodyClassName="h-[385px]"
    >
      <div className="relative h-full overflow-hidden rounded-md border border-border bg-[hsl(var(--background))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_45%,hsl(var(--primary)/0.18),transparent_19rem),radial-gradient(circle_at_70%_62%,hsl(var(--danger)/0.18),transparent_9rem),linear-gradient(135deg,hsl(var(--card)),hsl(var(--background)))]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(hsl(var(--primary)/0.16)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.16)_1px,transparent_1px)] [background-size:28px_28px]" />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 760 420"
          role="img"
          aria-label="India crisis command map"
        >
          <path
            d="M210 70 L285 35 L360 58 L430 50 L495 88 L548 142 L568 210 L610 260 L575 315 L515 345 L455 374 L390 388 L340 356 L300 296 L258 260 L230 202 L188 160 Z"
            fill="hsl(var(--primary) / 0.16)"
            stroke="hsl(var(--info) / 0.72)"
            strokeWidth="1.6"
          />
          <path
            d="M230 96 L310 112 L376 96 L452 120 L520 168 M214 155 L305 175 L385 166 L482 205 L565 228 M246 225 L324 242 L420 235 L510 275 M305 296 L388 307 L468 292 M355 74 L338 150 L356 231 L336 350 M455 88 L436 170 L450 250 L425 355"
            fill="none"
            stroke="hsl(var(--info) / 0.36)"
            strokeDasharray="4 5"
            strokeWidth="1"
          />
          <path
            d="M205 74 L265 42 L334 60 L358 95 L352 150 L312 178 L255 165 L212 130 Z"
            fill="hsl(var(--danger) / 0.2)"
            stroke="hsl(var(--danger) / 0.55)"
          />
          <path
            d="M350 245 L430 228 L515 245 L570 288 L548 330 L470 353 L405 337 Z"
            fill="hsl(var(--danger) / 0.18)"
            stroke="hsl(var(--danger) / 0.62)"
          />
          <path
            d="M270 202 L342 192 L395 222 L374 278 L300 274 L255 244 Z"
            fill="hsl(var(--warning) / 0.16)"
            stroke="hsl(var(--warning) / 0.55)"
          />
          {[
            [505, 280, "Bhubaneswar"],
            [285, 352, "Bengaluru"],
            [210, 290, "Mumbai"],
            [340, 70, "Jammu"],
            [372, 126, "Delhi"],
            [455, 175, "Lucknow"],
            [530, 190, "Patna"],
            [628, 165, "Guwahati"],
            [350, 305, "Hyderabad"],
            [420, 358, "Chennai"],
            [275, 230, "Ahmedabad"],
            [410, 230, "Nagpur"]
          ].map(([x, y, label]) => (
            <g key={label as string}>
              <circle cx={x as number} cy={y as number} r="3" fill="hsl(var(--foreground))" />
              <text
                x={(x as number) + 8}
                y={(y as number) + 4}
                fill="hsl(var(--foreground) / 0.78)"
                fontSize="12"
                fontWeight="600"
              >
                {label}
              </text>
            </g>
          ))}
          <ThreatMarker x={505} y={278} tone="danger" icon="cyclone" />
          <ThreatMarker x={292} y={246} tone="warning" icon="alert" />
          <ThreatMarker x={305} y={105} tone="danger" icon="alert" />
        </svg>

        <div className="absolute left-4 top-4 flex flex-col overflow-hidden rounded-md border border-border bg-card/80 backdrop-blur">
          <MapControl icon={<Plus className="h-4 w-4" />} />
          <MapControl icon={<Minus className="h-4 w-4" />} />
          <MapControl icon={<LocateFixed className="h-4 w-4" />} />
          <MapControl icon={<Layers className="h-4 w-4" />} />
        </div>

        <div className="absolute bottom-4 left-4 right-4 rounded-md border border-border bg-card/82 px-4 py-3 backdrop-blur">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-foreground">
            {[
              ["Critical", "bg-danger"],
              ["High", "bg-warning"],
              ["Medium", "bg-yellow-300"],
              ["Low", "bg-success"],
              ["Normal", "bg-info"],
              ["No Data", "bg-muted-foreground"]
            ].map(([label, color]) => (
              <span key={label} className="inline-flex items-center gap-2">
                <span className={clsx("h-2.5 w-2.5 rounded-sm", color)} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </CommandPanel>
  );
}

function ThreatMarker({
  x,
  y,
  tone,
  icon
}: {
  x: number;
  y: number;
  tone: "danger" | "warning";
  icon: "alert" | "cyclone";
}) {
  const color = tone === "danger" ? "hsl(var(--danger))" : "hsl(var(--warning))";

  return (
    <g>
      <circle cx={x} cy={y} r="26" fill={color} opacity="0.12" />
      <circle cx={x} cy={y} r="18" fill={color} opacity="0.22" />
      <circle cx={x} cy={y} r="10" fill={color} />
      {icon === "alert" ? (
        <path
          d={`M${x} ${y - 8} L${x + 8} ${y + 7} L${x - 8} ${y + 7} Z`}
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d={`M${x - 5} ${y}a5 5 0 0 1 10 0a5 5 0 0 1-8 4c6 1 11-2 12-7c-3 2-7 1-9-1`}
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </g>
  );
}

function MapControl({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="flex h-9 w-9 items-center justify-center border-b border-border text-muted-foreground last:border-b-0 hover:bg-secondary hover:text-foreground">
      {icon}
    </button>
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
