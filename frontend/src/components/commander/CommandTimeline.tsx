import { SectionCard, TimelineItem } from "@/components/shared";
import { commandTimeline } from "@/data";

export function CommandTimeline() {
  return (
    <SectionCard
      title="Command Timeline"
      description="Static command sequence for the current response plan."
    >
      <div className="space-y-5">
        {commandTimeline.map((item) => (
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
