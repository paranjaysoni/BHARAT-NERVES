import { SectionCard, TimelineItem } from "@/components/shared";
import type { ReportActivity } from "@/types/report";

interface RecentReportsProps {
  activities: ReportActivity[];
}

export function RecentReports({ activities }: RecentReportsProps) {
  return (
    <SectionCard
      title="Recent Reports"
      description="Latest reporting activity across all domains"
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
