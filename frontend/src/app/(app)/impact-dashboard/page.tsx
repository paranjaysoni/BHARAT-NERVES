import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Building2,
  Download,
  Factory,
  IndianRupee,
  Leaf,
  Minus,
  Plus,
  ShieldAlert,
  Target,
  Users,
  Zap
} from "lucide-react";
import clsx from "clsx";
import { PageHeader } from "@/components/shared";
import { impactDashboardPage } from "@/data";

const kpis = [
  {
    title: "Economic Impact",
    value: "₹ 12.4 Cr",
    trend: "18.6% vs yesterday",
    icon: IndianRupee,
    tone: "info",
    sparkline: "M0 38 L14 35 L28 37 L42 30 L56 27 L70 20 L84 24 L98 18 L112 22 L126 12 L140 16 L154 8"
  },
  {
    title: "Population Affected",
    value: "1.24M",
    trend: "8.3% vs yesterday",
    icon: Users,
    tone: "purple",
    sparkline: "M0 42 L16 41 L32 40 L48 34 L64 36 L80 25 L96 31 L112 18 L128 28 L144 23 L154 14"
  },
  {
    title: "Infrastructure Damage",
    value: "₹ 4.6 Cr",
    trend: "22.1% vs yesterday",
    icon: Building2,
    tone: "warning",
    sparkline: "M0 43 L18 38 L36 40 L54 31 L72 26 L90 17 L108 27 L126 15 L140 23 L154 10"
  },
  {
    title: "Trade Disruption",
    value: "₹ 5.7 Cr",
    trend: "14.2% vs yesterday",
    icon: Factory,
    tone: "cyan",
    sparkline: "M0 42 L14 38 L28 31 L42 34 L56 22 L70 27 L84 18 L98 29 L112 19 L126 24 L140 15 L154 7"
  },
  {
    title: "Environmental Impact",
    value: "8.7K tCO₂",
    trend: "16.4% vs yesterday",
    icon: Leaf,
    tone: "success",
    sparkline: "M0 43 L14 41 L28 35 L42 37 L56 25 L70 30 L84 18 L98 29 L112 21 L126 31 L140 19 L154 10"
  }
] as const;

const sectorRows = [
  ["Infrastructure", "28%", "bg-primary"],
  ["Trade", "22%", "bg-info"],
  ["Agriculture", "18%", "bg-success"],
  ["Environment", "14%", "bg-warning"],
  ["Social", "10%", "bg-violet-500"],
  ["Others", "8%", "bg-slate-500"]
] as const;

const stateRows = [
  ["Odisha", "85", "up", "18%", "320K", "danger"],
  ["Andhra Pradesh", "78", "up", "12%", "280K", "danger"],
  ["Maharashtra", "65", "up", "9%", "210K", "warning"],
  ["West Bengal", "62", "up", "15%", "180K", "warning"],
  ["Gujarat", "58", "down", "5%", "120K", "success"]
] as const;

const dimensionRows = [
  ["Economic", 78, "bg-primary"],
  ["Infrastructure", 72, "bg-warning"],
  ["Social", 65, "bg-violet-500"],
  ["Environmental", 55, "bg-success"],
  ["Security", 48, "bg-danger"]
] as const;

const insights = [
  {
    icon: ShieldAlert,
    title: "Economic impact in Odisha has increased by 18.6%",
    detail: "Due to port disruptions and supply chain delays.",
    tone: "danger"
  },
  {
    icon: Zap,
    title: "Infrastructure damage is concentrated in coastal corridors",
    detail: "Industrial zones and road links show the highest exposure.",
    tone: "warning"
  },
  {
    icon: Leaf,
    title: "Environmental impact is driven by increased emissions",
    detail: "Resource depletion and rerouting load remain elevated.",
    tone: "success"
  }
] as const;

const panelClass = "surface-card rounded-md p-3.5 text-card-foreground";

export default function ImpactDashboardPage() {
  return (
    <div className="space-y-3.5">
      <PageHeader
        title={impactDashboardPage.title}
        description="Track, analyze and visualize real-time impact across all dimensions"
      />

      <KpiStrip />

      <section className="grid gap-3 xl:grid-cols-[minmax(0,1.2fr)_minmax(380px,1.05fr)_minmax(300px,0.9fr)]">
        <ImpactHeatmap />
        <ImpactOverTime />
        <SectorWiseImpact />
      </section>

      <section className="grid gap-3 xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,1fr)_minmax(300px,0.82fr)]">
        <ImpactByState />
        <ImpactByDimension />
        <KeyInsights />
      </section>

      <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_300px]">
        <ImpactForecast />
        <ForecastSummary />
      </section>
    </div>
  );
}

function KpiStrip() {
  return (
    <section className="surface-card grid overflow-hidden rounded-md text-card-foreground lg:grid-cols-3 xl:grid-cols-[repeat(5,minmax(0,1fr))_216px]">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;

        return (
          <article
            key={kpi.title}
            className={clsx(
              "relative min-h-[104px] overflow-hidden border-border/70 px-4 py-3",
              index > 0 && "border-t lg:border-l lg:border-t-0"
            )}
          >
            <div className="flex items-start gap-3">
              <div className={clsx("flex h-9 w-9 shrink-0 items-center justify-center rounded-md border", toneClasses[kpi.tone])}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs leading-4 text-muted-foreground">{kpi.title}</p>
                <p className="mt-2 text-xl font-semibold leading-6 text-foreground">{kpi.value}</p>
                <p className="mt-1 flex items-center gap-1 text-[0.7rem] leading-4 text-muted-foreground">
                  <ArrowUp className={clsx("h-3 w-3", kpi.tone === "warning" ? "text-warning" : "text-success")} />
                  {kpi.trend}
                </p>
              </div>
            </div>
            <Sparkline path={kpi.sparkline} tone={kpi.tone} />
          </article>
        );
      })}

      <article className="min-h-[104px] border-t border-border/70 px-4 py-3 lg:border-l xl:border-t-0">
        <button className="ml-auto flex h-8 items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 text-xs font-medium text-primary">
          <Download className="h-3.5 w-3.5" />
          Export Report
        </button>
        <div className="mt-3 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/25 bg-primary/15 text-primary">
            <Target className="h-7 w-7" />
          </div>
          <div>
            <p className="text-3xl font-semibold leading-8 text-foreground">72</p>
            <p className="mt-1 text-xs font-medium text-warning">High Impact</p>
          </div>
        </div>
      </article>
    </section>
  );
}

function ImpactHeatmap() {
  return (
    <Panel title="IMPACT HEATMAP" subtitle="Impact intensity across states" className="min-h-[330px]">
      <div className="relative h-[282px] overflow-hidden rounded-md border border-border bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_54%,hsl(var(--primary)/0.18),transparent_16rem),linear-gradient(135deg,hsl(var(--card)),hsl(var(--background)))]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(hsl(var(--info)/0.14)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--info)/0.14)_1px,transparent_1px)] [background-size:26px_26px]" />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 560 310" role="img" aria-label="India impact heatmap">
          <path
            d="M168 35 L230 18 L294 35 L344 28 L397 58 L438 104 L455 155 L490 194 L462 240 L410 264 L356 287 L303 294 L260 268 L232 222 L196 196 L176 150 L137 112 Z"
            fill="hsl(var(--primary) / 0.15)"
            stroke="hsl(var(--info) / 0.68)"
            strokeWidth="1.4"
          />
          <path
            d="M170 62 L230 78 L292 68 L350 82 L420 122 M152 115 L236 132 L310 122 L388 154 L464 168 M192 170 L260 186 L342 178 L424 212 M240 220 L310 235 L380 224 M284 42 L274 114 L290 180 L274 270 M358 58 L342 128 L355 198 L338 270"
            fill="none"
            stroke="hsl(var(--foreground) / 0.22)"
            strokeDasharray="3 4"
          />
          <HeatBlob x={335} y={204} color="danger" size={64} />
          <HeatBlob x={275} y={250} color="danger" size={58} />
          <HeatBlob x={246} y={160} color="warning" size={46} />
          <HeatBlob x={188} y={186} color="warning" size={40} />
          <HeatBlob x={304} y={134} color="yellow" size={36} />
          <HeatBlob x={388} y={184} color="yellow" size={34} />
          <HeatBlob x={414} y={100} color="info" size={46} />
          <HeatBlob x={214} y={86} color="info" size={42} />
        </svg>

        <div className="absolute left-3 top-16 flex flex-col overflow-hidden rounded-md border border-border bg-card/80 backdrop-blur">
          <button className="flex h-8 w-8 items-center justify-center border-b border-border text-muted-foreground hover:bg-secondary">
            <Plus className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center border-b border-border text-muted-foreground hover:bg-secondary">
            <Minus className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:bg-secondary">
            <Target className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute bottom-4 left-5 space-y-2 text-xs text-muted-foreground">
          {[
            ["Very High", "bg-danger"],
            ["High", "bg-warning"],
            ["Medium", "bg-yellow-300"],
            ["Low", "bg-primary"],
            ["Very Low", "bg-blue-700"]
          ].map(([label, color]) => (
            <div key={label} className="flex items-center gap-2">
              <span className={clsx("h-2.5 w-2.5 rounded-sm", color)} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function ImpactOverTime() {
  const points = [
    [22, 210],
    [68, 175],
    [114, 192],
    [160, 178],
    [206, 146],
    [252, 128],
    [298, 137],
    [344, 130],
    [390, 124],
    [436, 105],
    [482, 78],
    [528, 78]
  ];
  const d = points.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ");

  return (
    <Panel
      title="IMPACT OVER TIME"
      subtitle="Overall impact trend"
      action={<button className="btn btn-outline h-8 px-2.5 text-xs">7 Days</button>}
      className="min-h-[330px]"
    >
      <div className="relative h-[260px] rounded-md border border-border bg-background/50 px-3 py-3">
        <svg className="h-full w-full" viewBox="0 0 560 240" preserveAspectRatio="none" aria-hidden="true">
          {[0, 50, 100, 150, 200].map((y) => (
            <line key={y} x1="34" x2="548" y1={20 + y} y2={20 + y} stroke="hsl(var(--border) / 0.55)" />
          ))}
          <path d={`${d} L528 220 L22 220 Z`} fill="hsl(var(--primary) / 0.14)" />
          <path d={d} fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {points.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="hsl(var(--primary))" stroke="hsl(var(--card))" strokeWidth="1.5" />
          ))}
          <g>
            <rect x="514" y="46" width="34" height="24" rx="5" fill="hsl(var(--primary))" />
            <text x="531" y="63" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">72</text>
          </g>
          {["22 Nov", "23 Nov", "24 Nov", "25 Nov", "26 Nov", "27 Nov", "28 Nov"].map((label, index) => (
            <text key={label} x={44 + index * 78} y="236" fill="hsl(var(--muted-foreground))" fontSize="12">
              {label}
            </text>
          ))}
          {[0, 25, 50, 75, 100].map((label, index) => (
            <text key={label} x="2" y={224 - index * 50} fill="hsl(var(--muted-foreground))" fontSize="12">
              {label}
            </text>
          ))}
        </svg>
      </div>
    </Panel>
  );
}

function SectorWiseImpact() {
  return (
    <Panel title="SECTOR WISE IMPACT" className="min-h-[330px]">
      <div className="grid min-h-[238px] grid-cols-[145px_1fr] items-center gap-4">
        <div className="relative h-[142px] w-[142px]">
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(hsl(var(--primary))_0_28%,hsl(var(--info))_28%_50%,hsl(var(--success))_50%_68%,hsl(var(--warning))_68%_82%,rgb(139_92_246)_82%_92%,rgb(100_116_139)_92%_100%)]" />
          <div className="absolute inset-[28px] flex flex-col items-center justify-center rounded-full border border-border bg-card text-center">
            <span className="text-2xl font-semibold leading-none text-foreground">72</span>
            <span className="mt-1 text-[0.67rem] leading-3 text-muted-foreground">
              Total Impact<br />Score
            </span>
          </div>
        </div>
        <div className="space-y-3">
          {sectorRows.map(([label, value, color]) => (
            <div key={label} className="flex items-center gap-2 text-xs">
              <span className={clsx("h-2.5 w-2.5 rounded-full", color)} />
              <span className="min-w-0 flex-1 truncate text-muted-foreground">{label}</span>
              <span className="font-semibold text-foreground">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <PanelLink label="View Detailed Breakdown" />
    </Panel>
  );
}

function ImpactByState() {
  return (
    <Panel title="IMPACT BY STATE" titleSuffix="(Top 5)" className="min-h-[245px]">
      <div className="grid grid-cols-[1.25fr_0.8fr_0.75fr_1fr] border-b border-border/70 pb-2 text-[0.68rem] text-muted-foreground">
        <span>State</span>
        <span className="text-center">Impact Score</span>
        <span className="text-center">Trend (24h)</span>
        <span className="text-right">Population Affected</span>
      </div>
      <div className="divide-y divide-border/60">
        {stateRows.map(([state, score, direction, trend, population, tone]) => (
          <div key={state} className="grid grid-cols-[1.25fr_0.8fr_0.75fr_1fr] items-center py-2 text-xs">
            <span className="font-medium text-foreground">{state}</span>
            <span className="text-center">
              <span className={clsx("inline-flex min-w-10 justify-center rounded-md border px-2 py-0.5 font-semibold", toneClasses[tone])}>
                {score}
              </span>
            </span>
            <span className={clsx("flex items-center justify-center gap-1 font-medium", direction === "up" ? "text-success" : "text-success")}>
              {direction === "up" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {trend}
            </span>
            <span className="text-right font-medium text-foreground">{population}</span>
          </div>
        ))}
      </div>
      <PanelLink label="View All States" />
    </Panel>
  );
}

function ImpactByDimension() {
  return (
    <Panel title="IMPACT BY DIMENSION" className="min-h-[245px]">
      <div className="space-y-4 pt-2">
        {dimensionRows.map(([label, value, color]) => (
          <div key={label} className="grid grid-cols-[92px_1fr_28px] items-center gap-3 text-xs">
            <span className="text-foreground">{label}</span>
            <div className="h-2 rounded-full bg-secondary">
              <div className={clsx("h-full rounded-full", color)} style={{ width: `${value}%` }} />
            </div>
            <span className="text-right font-semibold text-foreground">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-5 pl-[104px] text-[0.68rem] text-muted-foreground">
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span className="text-right">100</span>
      </div>
      <PanelLink label="View Detailed Analysis" />
    </Panel>
  );
}

function KeyInsights() {
  return (
    <Panel title="KEY INSIGHTS" className="min-h-[245px]">
      <div className="space-y-2.5">
        {insights.map((insight) => {
          const Icon = insight.icon;

          return (
            <article key={insight.title} className="grid grid-cols-[34px_1fr] gap-3 rounded-md border border-border bg-background/55 p-3">
              <div className={clsx("flex h-8 w-8 items-center justify-center rounded-md border", toneClasses[insight.tone])}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium leading-4 text-foreground">{insight.title}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-4 text-muted-foreground">{insight.detail}</p>
              </div>
            </article>
          );
        })}
      </div>
      <PanelLink label="View All Insights" />
    </Panel>
  );
}

function ImpactForecast() {
  const low = "M18 104 L112 98 L206 88 L300 88 L394 88 L488 88 L582 88";
  const medium = "M18 86 L112 70 L206 58 L300 58 L394 58 L488 58 L582 66";
  const high = "M18 54 L112 40 L206 32 L300 26 L394 22 L488 34 L582 44";

  return (
    <Panel title="IMPACT FORECAST" subtitle="Predicted impact for next 7 days" className="min-h-[152px]">
      <div className="grid grid-cols-[180px_1fr] gap-4">
        <div className="space-y-4 pt-3 text-xs text-muted-foreground">
          <LegendItem label="Low Impact" color="bg-success" dashed />
          <LegendItem label="Medium Impact" color="bg-warning" dashed />
          <LegendItem label="High Impact" color="bg-danger" dashed />
        </div>
        <svg className="h-[106px] w-full" viewBox="0 0 610 120" preserveAspectRatio="none" aria-hidden="true">
          <line x1="18" y1="104" x2="592" y2="104" stroke="hsl(var(--border))" />
          <line x1="18" y1="54" x2="592" y2="54" stroke="hsl(var(--border) / 0.55)" />
          <line x1="18" y1="4" x2="592" y2="4" stroke="hsl(var(--border) / 0.55)" />
          <path d={`${high} L582 104 L18 104 Z`} fill="hsl(var(--danger) / 0.09)" />
          <path d={high} fill="none" stroke="hsl(var(--danger))" strokeWidth="2.2" />
          <path d={medium} fill="none" stroke="hsl(var(--warning))" strokeWidth="2.2" />
          <path d={low} fill="none" stroke="hsl(var(--success))" strokeWidth="2.2" />
          {[18, 112, 206, 300, 394, 488, 582].map((x, index) => (
            <g key={x}>
              <circle cx={x} cy={[54, 40, 32, 26, 22, 34, 44][index]} r="3.5" fill="hsl(var(--danger))" />
              <circle cx={x} cy={[86, 70, 58, 58, 58, 58, 66][index]} r="3.5" fill="hsl(var(--warning))" />
              <circle cx={x} cy={[104, 98, 88, 88, 88, 88, 88][index]} r="3.5" fill="hsl(var(--success))" />
            </g>
          ))}
          {["29 Nov", "30 Nov", "1 Dec", "2 Dec", "3 Dec", "4 Dec", "5 Dec"].map((label, index) => (
            <text key={label} x={18 + index * 94} y="119" fill="hsl(var(--muted-foreground))" fontSize="11">
              {label}
            </text>
          ))}
          <text x="0" y="8" fill="hsl(var(--muted-foreground))" fontSize="11">100</text>
          <text x="4" y="58" fill="hsl(var(--muted-foreground))" fontSize="11">50</text>
          <text x="10" y="108" fill="hsl(var(--muted-foreground))" fontSize="11">0</text>
        </svg>
      </div>
    </Panel>
  );
}

function ForecastSummary() {
  return (
    <Panel title="Forecast Summary" className="min-h-[152px]">
      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        High impact levels likely to persist over the next 3 days before gradual improvement.
      </p>
      <PanelLink label="View Full Forecast" />
    </Panel>
  );
}

function Panel({
  title,
  titleSuffix,
  subtitle,
  action,
  className,
  children
}: {
  title: string;
  titleSuffix?: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={clsx(panelClass, className)}>
      <div className="mb-3 flex min-h-7 items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold uppercase leading-5 text-foreground">
            {title}
            {titleSuffix ? (
              <span className="ml-1 font-normal normal-case text-muted-foreground">{titleSuffix}</span>
            ) : null}
          </h2>
          {subtitle ? <p className="mt-0.5 text-xs leading-4 text-muted-foreground">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
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

function Sparkline({ path, tone }: { path: string; tone: keyof typeof toneClasses }) {
  return (
    <svg className="absolute bottom-2 right-3 h-10 w-28 opacity-95" viewBox="0 0 154 46" aria-hidden="true">
      <path d={`${path} L154 46 L0 46 Z`} className={sparkFillClasses[tone]} />
      <path d={path} fill="none" stroke="currentColor" strokeWidth="2" className={sparkStrokeClasses[tone]} />
    </svg>
  );
}

function HeatBlob({
  x,
  y,
  color,
  size
}: {
  x: number;
  y: number;
  color: "danger" | "warning" | "yellow" | "info";
  size: number;
}) {
  const fill = {
    danger: "hsl(var(--danger))",
    warning: "hsl(var(--warning))",
    yellow: "rgb(250 204 21)",
    info: "hsl(var(--primary))"
  }[color];

  return (
    <g>
      <circle cx={x} cy={y} r={size * 0.55} fill={fill} opacity="0.12" />
      <circle cx={x} cy={y} r={size * 0.34} fill={fill} opacity="0.28" />
      <circle cx={x} cy={y} r={size * 0.14} fill={fill} opacity="0.72" />
    </g>
  );
}

function LegendItem({
  label,
  color,
  dashed
}: {
  label: string;
  color: string;
  dashed?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={clsx("h-px w-6", color, dashed && "border-t border-dashed bg-transparent")} />
      {label}
    </div>
  );
}

const toneClasses = {
  danger: "border-danger/30 bg-danger/15 text-danger",
  warning: "border-warning/30 bg-warning/15 text-warning",
  success: "border-success/30 bg-success/15 text-success",
  info: "border-primary/30 bg-primary/15 text-primary",
  cyan: "border-info/30 bg-info/15 text-info",
  purple: "border-violet-500/30 bg-violet-500/15 text-violet-300"
} as const;

const sparkStrokeClasses = {
  danger: "text-danger",
  warning: "text-warning",
  success: "text-success",
  info: "text-primary",
  cyan: "text-info",
  purple: "text-violet-400"
} as const;

const sparkFillClasses = {
  danger: "fill-danger/15",
  warning: "fill-warning/15",
  success: "fill-success/15",
  info: "fill-primary/15",
  cyan: "fill-info/15",
  purple: "fill-violet-500/15"
} as const;
