import {
  Activity,
  AlertTriangle,
  BarChart3,
  Boxes,
  ShieldCheck
} from "lucide-react";
import {
  AgentCard,
  AlertCard,
  ChartCard,
  DataTable,
  EmptyState,
  MapPlaceholder,
  MetricCard,
  PageHeader,
  ProgressBar,
  RiskPill,
  ScenarioCard,
  SectionCard,
  StatusBadge,
  TimelineItem,
  type DataTableColumn
} from "@/components/shared";
import {
  agents,
  alerts,
  metrics,
  reports,
  scenarios,
  selectedCorridor,
  systemStatus
} from "@/data";
import type { Report, ReportStatus } from "@/types";

const reportColumns: DataTableColumn<Report>[] = [
  {
    key: "title",
    header: "Report",
    cell: (report) => (
      <span className="font-medium text-foreground">{report.title}</span>
    )
  },
  {
    key: "category",
    header: "Category",
    cell: (report) => report.category
  },
  {
    key: "status",
    header: "Status",
    cell: (report) => (
      <StatusBadge
        label={report.status}
        variant={reportStatusVariant[report.status]}
        size="sm"
      />
    )
  },
  {
    key: "version",
    header: "Version",
    cell: (report) => report.version
  }
];

const reportStatusVariant: Record<
  ReportStatus,
  "success" | "warning" | "danger" | "info" | "neutral"
> = {
  archived: "neutral",
  draft: "warning",
  published: "success",
  review: "info"
};

export default function ComponentPreviewPage() {
  const previewMetrics = metrics.slice(0, 4);
  const previewReports = reports.slice(0, 5);
  const previewAgent = agents[0];
  const previewScenario = scenarios[0];
  const previewAlert = alerts[0];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Component Preview"
        description="Internal development route for inspecting reusable Project Aegis dashboard components before composing full product pages."
        actions={<StatusBadge label="Development" variant="info" />}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {previewMetrics.map((metric, index) => (
          <MetricCard
            key={metric.id}
            title={metric.label}
            value={`${metric.value}${metric.unit ? ` ${metric.unit}` : ""}`}
            subtitle={metric.description}
            icon={metricIcons[index]}
            trend={metric.trend}
            trendDirection={metric.trend === "down" ? "down" : metric.trend === "up" ? "up" : "neutral"}
            status={index === 0 ? "success" : index === 1 ? "warning" : "info"}
          />
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard
          title="Status and Risk Primitives"
          description="Reusable compact indicators for operational surfaces."
        >
          <div className="flex flex-wrap gap-3">
            <StatusBadge label={systemStatus.status} variant="success" />
            <StatusBadge label={systemStatus.uptime} variant="info" />
            <RiskPill level="low" />
            <RiskPill level="medium" />
            <RiskPill level="high" />
            <RiskPill level="critical" />
          </div>
          <div className="mt-6 max-w-md">
            <ProgressBar
              value={78}
              label={`${selectedCorridor.name} resilience readiness`}
              variant="success"
            />
          </div>
        </SectionCard>

        <AlertCard
          title={previewAlert.title}
          description={previewAlert.description}
          severity={previewAlert.severity}
          timestamp={previewAlert.timestamp}
          icon={<AlertTriangle className="h-4 w-4" aria-hidden="true" />}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ScenarioCard
          title={previewScenario.title}
          description={previewScenario.description}
          severity={previewScenario.severity}
          status="Scenario Draft"
          icon={<Activity className="h-4 w-4" aria-hidden="true" />}
          actionLabel="Preview Scenario"
        />

        <AgentCard
          name={previewAgent.name}
          role={previewAgent.role}
          priority={previewAgent.priority}
          description={previewAgent.description}
          confidence={86}
          status="Standby"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard
          title="Chart Card"
          description="Wrapper for future Recharts visualizations."
        >
          <div className="text-center">
            <BarChart3
              className="mx-auto h-10 w-10 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="mt-3 text-sm text-muted-foreground">
              Chart placeholder only. Recharts will be added in a later issue.
            </p>
          </div>
        </ChartCard>

        <MapPlaceholder
          title="Odisha Cyclone Corridor"
          description="Digital twin placeholder for future map integration. No map library is loaded in this issue."
          variant="corridor"
        />
      </div>

      <SectionCard
        title="Decision Timeline"
        description="Activity log primitive for commander and response workflows."
      >
        <div className="space-y-5">
          <TimelineItem
            title="Corridor status reviewed"
            description="Operations cell reviewed active corridor stress and relief staging posture."
            timestamp="11:42 AM"
            status="success"
          />
          <TimelineItem
            title="Port congestion alert escalated"
            description="Paradip Port congestion marked for review by logistics coordination."
            timestamp="11:18 AM"
            status="warning"
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Data Table"
        description="Simple typed table wrapper for reports, resources, and future tabular data."
      >
        <DataTable
          columns={reportColumns}
          rows={previewReports}
          emptyMessage="No reports available."
        />
      </SectionCard>

      <EmptyState
        title="No selected simulation"
        description="Use this component when a page section has no data, filters remove all results, or a workflow has not started yet."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <Boxes className="h-4 w-4" aria-hidden="true" />
            Prepare Workspace
          </button>
        }
      />

      <SectionCard title="Semantic Action Example">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Confirm Readiness
        </button>
      </SectionCard>
    </div>
  );
}

const metricIcons = [
  <ShieldCheck key="shield" className="h-4 w-4" aria-hidden="true" />,
  <AlertTriangle key="alert" className="h-4 w-4" aria-hidden="true" />,
  <Activity key="activity" className="h-4 w-4" aria-hidden="true" />,
  <BarChart3 key="chart" className="h-4 w-4" aria-hidden="true" />
];
