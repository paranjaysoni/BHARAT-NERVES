import { MetricCard } from "@/components/shared";
import { FileText, AlertTriangle, Clock, Brain, TrendingUp, Activity } from "lucide-react";

export function ReportKpiRow() {
  return (
    <div className="app-kpi-grid lg:grid-cols-3 xl:grid-cols-6">
      <MetricCard
        title="Total Reports"
        value="124"
        subtitle="All platform reports"
        icon={<FileText className="h-4 w-4" />}
        status="neutral"
      />
      <MetricCard
        title="Critical Reports"
        value="9"
        subtitle="Require attention"
        icon={<AlertTriangle className="h-4 w-4" />}
        status="danger"
      />
      <MetricCard
        title="Recent Reports"
        value="18"
        subtitle="Last 7 days"
        icon={<Clock className="h-4 w-4" />}
        status="info"
      />
      <MetricCard
        title="AI Briefings"
        value="22"
        subtitle="Parliament summaries"
        icon={<Brain className="h-4 w-4" />}
        status="info"
      />
      <MetricCard
        title="Trade Reports"
        value="31"
        subtitle="Corridor & port analysis"
        icon={<TrendingUp className="h-4 w-4" />}
        status="warning"
      />
      <MetricCard
        title="Impact Reports"
        value="27"
        subtitle="Economic & resilience"
        icon={<Activity className="h-4 w-4" />}
        status="warning"
      />
    </div>
  );
}
