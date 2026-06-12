import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function ControlRoomPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Control Room"
        description="Mission-control overview for national corridor resilience, operational readiness, and priority interventions."
      />
      <SectionCard title="Control Room Skeleton">
        <div className="flex items-center justify-between gap-4">
          <span>Page skeleton ready.</span>
          <StatusBadge label="Ready" variant="success" />
        </div>
      </SectionCard>
    </div>
  );
}
