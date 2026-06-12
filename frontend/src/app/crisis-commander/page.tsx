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
    <div className="space-y-8">
      <PageHeader
        title={crisisCommanderPage.title}
        description={crisisCommanderPage.description}
        actions={<StatusBadge label="Command Active" variant="danger" />}
      />

      <CrisisKpiRow />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.85fr)]">
        <div className="space-y-6">
          <SituationOverview />
          <ActionPlan />
          <ResourceDeployment />
          <CommandTimeline />
        </div>

        <aside className="space-y-6">
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
