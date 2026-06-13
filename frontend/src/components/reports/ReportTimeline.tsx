import { SectionCard, TimelineItem } from "@/components/shared";
import type { ReportActivity } from "@/types/report";

interface ReportTimelineProps {
  activities: ReportActivity[];
}

export function ReportTimeline({ activities }: ReportTimelineProps) {
  return (
    <SectionCard
      title="Report Activity Timeline"
      description="Chronological log of reporting actions during the current operational period"
    >
      <div className="app-scroll-region space-y-1 pr-1">
        {activities.map((activity) => (
          <TimelineItem
            key={activity.id}
            title={activity.title}
            description={activity.description}
            timestamp={activity.timestamp}
            status={activity.status}
          />
        ))}
      </div>
    </SectionCard>
  );
}
