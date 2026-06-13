import { SectionCard, TimelineItem } from "@/components/shared";
import type { ResourceUpdate } from "@/data";

interface RecentResourceUpdatesProps {
  updates: ResourceUpdate[];
}

export function RecentResourceUpdates({ updates }: RecentResourceUpdatesProps) {
  return (
    <SectionCard
      title="Recent Updates"
      description="Latest staged changes in the MVP resource library."
    >
      <div className="app-scroll-region space-y-4 pr-1">
        {updates.map((update) => (
          <TimelineItem
            key={update.id}
            title={update.title}
            description={update.description}
            timestamp={update.timestamp}
            status={update.status}
          />
        ))}
      </div>
    </SectionCard>
  );
}
