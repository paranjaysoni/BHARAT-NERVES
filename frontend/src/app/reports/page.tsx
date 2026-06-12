"use client";

import { useState } from "react";
import {
  FeaturedBrief,
  FutureReportingPipeline,
  RecentReports,
  ReportCategories,
  ReportKpiRow,
  ReportPreview,
  ReportStatistics,
  ReportTimeline,
  ReportsTable,
  ScenarioReports
} from "@/components/reports";
import { PageHeader, StatusBadge } from "@/components/shared";
import {
  featuredIntelligenceBrief,
  futureReportingPipeline,
  recentReportActivities,
  reportActivityTimeline,
  reportCategories,
  reports,
  reportStatistics,
  reportsPageMeta,
  scenarioReports
} from "@/data";
import type { Report } from "@/types";

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title={reportsPageMeta.title}
        description={reportsPageMeta.description}
        actions={<StatusBadge label="Reporting Center Active" variant="success" />}
      />

      <ReportKpiRow />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <ReportCategories categories={reportCategories} />

          <ReportsTable
            reports={reports}
            onSelectReport={setSelectedReport}
            selectedReportId={selectedReport?.id}
          />

          <ReportPreview report={selectedReport} />
        </div>

        <aside className="space-y-6">
          <RecentReports activities={recentReportActivities} />

          <ReportStatistics
            reportsThisWeek={reportStatistics.reportsThisWeek}
            reportsThisMonth={reportStatistics.reportsThisMonth}
            avgReviewTimeHours={reportStatistics.avgReviewTimeHours}
            criticalFindings={reportStatistics.criticalFindings}
          />

          <FeaturedBrief brief={featuredIntelligenceBrief} />

          <ScenarioReports reports={scenarioReports} />
        </aside>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <ReportTimeline activities={reportActivityTimeline} />
        <FutureReportingPipeline items={futureReportingPipeline} />
      </div>
    </div>
  );
}
