import Link from "next/link";
import { ArrowRight, CloudRain } from "lucide-react";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { metrics } from "@/data";

function getMetricValue(metricId: string) {
  const metric = metrics.find((item) => item.id === metricId);
  return metric ? `${metric.value}${metric.unit ? metric.unit : ""}` : "N/A";
}

export function ControlRoomAnalyticsRow() {
  return (
    <section className="grid gap-4 xl:grid-cols-[1fr_1.35fr_0.95fr_1fr]">
      <ResilienceTrend />
      <EconomicImpact />
      <WeatherOutlook />
      <QuickActions />
    </section>
  );
}

function ResilienceTrend() {
  return (
    <article className="surface-card rounded-md p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
        Resilience Trend
      </h3>
      <div className="mt-4 grid grid-cols-[120px_minmax(0,1fr)] items-center gap-4">
        <div className="relative h-28 w-28">
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(hsl(var(--success))_0_78%,hsl(var(--secondary))_78%_100%)]" />
          <div className="absolute inset-3 rounded-full bg-card" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-semibold leading-8 text-foreground">78</p>
            <p className="text-sm text-muted-foreground">/100</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-success">↑ 8 pts</p>
          <p className="mt-1 text-xs text-muted-foreground">vs yesterday</p>
          <svg className="mt-4 h-12 w-full" viewBox="0 0 120 40" aria-hidden="true">
            <path
              d="M2 34 C15 28 20 32 30 22 S48 20 56 15 S71 20 82 10 S101 12 118 4"
              className="fill-none stroke-success"
              strokeWidth="2"
            />
          </svg>
          <p className="mt-1 text-sm font-medium text-success">Stable</p>
        </div>
      </div>
    </article>
  );
}

function EconomicImpact() {
  return (
    <article className="surface-card rounded-md p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
        Economic Impact <span className="text-xs font-medium normal-case text-muted-foreground">(Potential)</span>
      </h3>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <ImpactStat label="Potential Loss" value={getMetricValue("metric-economic-impact")} tone="danger" detail="Without Recovery" />
        <ImpactStat label="After Recovery" value="₹4.3 Cr" tone="success" detail="With Plan" />
        <ImpactStat label="Loss Reduction" value="65%" tone="info" detail="Estimated" />
      </div>
      <Link href="/impact-dashboard" className="btn btn-secondary mt-5 w-full">
        View Impact Dashboard
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}

function WeatherOutlook() {
  return (
    <article className="surface-card rounded-md p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
        Weather Outlook
      </h3>
      <div className="mt-5 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-info/25 bg-info/10 text-info">
          <CloudRain className="h-9 w-9" aria-hidden="true" />
        </div>
        <div>
          <p className="type-caption">Odisha coast</p>
          <p className="text-3xl font-semibold leading-9 text-primary">18 Hrs</p>
          <p className="text-sm text-muted-foreground">High Risk Weather</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Wind Speed</span>
        <span className="font-semibold text-foreground">120 km/h</span>
      </div>
      <Link href="/impact-dashboard" className="btn btn-secondary mt-4 w-full">
        View Full Forecast
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}

function ImpactStat({
  label,
  value,
  detail,
  tone
}: {
  label: string;
  value: string;
  detail: string;
  tone: "danger" | "success" | "info";
}) {
  const toneClass = {
    danger: "text-danger",
    info: "text-primary",
    success: "text-success"
  }[tone];

  return (
    <div className="border-r border-border last:border-r-0 last:pr-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`mt-2 text-xl font-semibold ${toneClass}`}>{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}
