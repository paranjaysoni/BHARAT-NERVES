import { SectionCard, MetricCard } from "@/components/shared";
import { CalendarDays, CalendarRange, Clock, AlertTriangle } from "lucide-react";

interface ReportStatisticsProps {
  reportsThisWeek: number;
  reportsThisMonth: number;
  avgReviewTimeHours: number;
  criticalFindings: number;
}

export function ReportStatistics({
  reportsThisWeek,
  reportsThisMonth,
  avgReviewTimeHours,
  criticalFindings
}: ReportStatisticsProps) {
  return (
    <SectionCard title="Report Statistics" description="Current reporting cadence and output">
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          title="This Week"
          value={String(reportsThisWeek)}
          subtitle="Reports generated"
          icon={<CalendarDays className="h-4 w-4" />}
          status="info"
        />
        <MetricCard
          title="This Month"
          value={String(reportsThisMonth)}
          subtitle="Total reports"
          icon={<CalendarRange className="h-4 w-4" />}
          status="neutral"
        />
        <MetricCard
          title="Avg Review"
          value={`${avgReviewTimeHours}h`}
          subtitle="Review turnaround"
          icon={<Clock className="h-4 w-4" />}
          status="success"
        />
        <MetricCard
          title="Critical"
          value={String(criticalFindings)}
          subtitle="Active findings"
          icon={<AlertTriangle className="h-4 w-4" />}
          status="danger"
        />
      </div>
    </SectionCard>
  );
}
