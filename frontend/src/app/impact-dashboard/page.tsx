import {
  DistrictImpactTable,
  ForecastNotes,
  GeographicImpactPanel,
  ImpactKpiRow,
  ImpactOverTimeChart,
  ImpactSummary,
  KeyInsights,
  RecoveryBenefitTable,
  RecoveryComparisonChart,
  ResilienceRecoveryScore,
  RiskDistribution,
  SectorImpactBreakdown
} from "@/components/dashboard";
import { PageHeader, StatusBadge } from "@/components/shared";
import { impactDashboardPage } from "@/data";

export default function ImpactDashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title={impactDashboardPage.title}
        description={impactDashboardPage.description}
        actions={<StatusBadge label="Impact Model Ready" variant="success" />}
      />

      <ImpactKpiRow />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.85fr)]">
        <div className="space-y-6">
          <ImpactOverTimeChart />
          <RecoveryComparisonChart />
          <SectorImpactBreakdown />
          <GeographicImpactPanel />
        </div>

        <aside className="space-y-6">
          <ImpactSummary />
          <RiskDistribution />
          <ResilienceRecoveryScore />
          <KeyInsights />
        </aside>
      </section>

      <DistrictImpactTable />
      <RecoveryBenefitTable />
      <ForecastNotes />
    </div>
  );
}
