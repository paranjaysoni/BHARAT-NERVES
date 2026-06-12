import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { pageSkeletonMessage, scenarioSimulatorPage } from "@/data";

export default function ScenarioSimulatorPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title={scenarioSimulatorPage.title}
        description={scenarioSimulatorPage.description}
      />
      <SectionCard title={scenarioSimulatorPage.skeletonTitle}>
        {pageSkeletonMessage}
      </SectionCard>
    </div>
  );
}
