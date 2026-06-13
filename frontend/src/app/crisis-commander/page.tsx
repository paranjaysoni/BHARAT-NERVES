import {
  ActionChecklist,
  ActionPlan,
  ActiveIncidents,
  ApprovalStatus,
  CommandTimeline,
  CrisisKpiRow,
  ExecutiveSummary,
  ExpectedOutcomes,
  ResourceDeployment,
  ResponseMatrix,
  RiskAssessment,
  SituationOverview
} from "@/components/commander";
import { PageHeader, StatusBadge } from "@/components/shared";
import { crisisCommanderPage } from "@/data";

export default function CrisisCommanderPage() {
  return (
    <div className="app-page-stack">
      <PageHeader
        title={crisisCommanderPage.title}
        description={crisisCommanderPage.description}
        actions={<StatusBadge label="Command Active" variant="danger" />}
      />

      <CrisisKpiRow />

      <section className="app-section-grid xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
        <div className="app-column-stack">
          <SituationOverview />
          <ActionPlan />
          <ResourceDeployment />
          <CommandTimeline />
        </div>

        <aside className="app-column-stack">
          <ExecutiveSummary />
          <ActiveIncidents />
          <RiskAssessment />
          <ApprovalStatus />
        </aside>
      </section>

      <ResponseMatrix />
      <ExpectedOutcomes />
      <ActionChecklist />
    </div>
  );
}
