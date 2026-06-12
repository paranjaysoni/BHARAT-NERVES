import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { controlRoomPage, pageSkeletonMessage } from "@/data";

export default function ControlRoomPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title={controlRoomPage.title}
        description={controlRoomPage.description}
      />
      <SectionCard title={controlRoomPage.skeletonTitle}>
        <div className="flex items-center justify-between gap-4">
          <span>{pageSkeletonMessage}</span>
          <StatusBadge label="Ready" variant="success" />
        </div>
      </SectionCard>
    </div>
  );
}
