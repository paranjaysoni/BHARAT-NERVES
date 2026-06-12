import { SectionCard, TimelineItem } from "@/components/shared";
import { parliamentTimeline } from "@/data";

export function AgentTimeline() {
  return (
    <SectionCard
      title="Recommendation Timeline"
      description="Static multi-agent deliberation flow. No AI process is running."
    >
      <div className="space-y-5">
        {parliamentTimeline.map((item) => (
          <TimelineItem
            key={item.id}
            title={item.title}
            description={item.description}
            timestamp={item.timestamp}
            status={item.status}
          />
        ))}
      </div>
    </SectionCard>
  );
}
