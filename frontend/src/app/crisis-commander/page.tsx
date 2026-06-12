import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";

export default function CrisisCommanderPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Crisis Commander"
        description="Future command workspace for response actions, escalation paths, and operational recommendations."
      />
      <SectionCard title="Crisis Commander Skeleton">
        Page skeleton ready.
      </SectionCard>
    </div>
  );
}
