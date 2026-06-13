import { SectionCard, TimelineItem } from "@/components/shared";
import { controlRoomActivityItems } from "@/data";

export function RecentActivity() {
  return (
    <SectionCard
      title="Recent Activity"
      description="Mock decision and monitoring timeline for the control room."
    >
      <div className="app-scroll-region space-y-4 pr-1">
        {controlRoomActivityItems.map((item) => (
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
