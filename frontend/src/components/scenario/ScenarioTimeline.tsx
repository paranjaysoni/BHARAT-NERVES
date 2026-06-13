import { SectionCard, TimelineItem } from "@/components/shared";
import { scenarioTimelineSteps } from "@/data";

export function ScenarioTimeline() {
  return (
    <SectionCard
      title="Simulation Timeline Preview"
      description="Static future-flow preview. No actual simulation process is running."
    >
      <div className="app-scroll-region space-y-4 pr-1">
        {scenarioTimelineSteps.map((step) => (
          <TimelineItem
            key={step.id}
            title={step.title}
            description={step.description}
            timestamp={step.timestamp}
            status={step.status}
          />
        ))}
      </div>
    </SectionCard>
  );
}
