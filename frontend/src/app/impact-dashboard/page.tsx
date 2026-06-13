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
    <div className="app-page-stack">
      <PageHeader
        title={impactDashboardPage.title}
        description={impactDashboardPage.description}
        actions={<StatusBadge label="Impact Model Ready" variant="success" />}
      />

      <ImpactKpiRow />

      <section className="app-section-grid xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]">
        <div className="app-column-stack">
          <ImpactOverTimeChart />
          <RecoveryComparisonChart />
          <SectorImpactBreakdown />
          <GeographicImpactPanel />
        </div>

        <aside className="app-column-stack">
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
