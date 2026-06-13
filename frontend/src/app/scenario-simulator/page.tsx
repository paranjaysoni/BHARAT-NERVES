import { ScenarioSimulatorDashboard } from "@/components/scenario";
import { PageHeader, StatusBadge } from "@/components/shared";
import { scenarioSimulatorPage } from "@/data";

export default function ScenarioSimulatorPage() {
  return (
    <div className="app-page-stack">
      <PageHeader
        title={scenarioSimulatorPage.title}
        description={scenarioSimulatorPage.description}
        actions={<StatusBadge label="Simulation Ready" variant="success" />}
      />
      <ScenarioSimulatorDashboard />
    </div>
  );
}
