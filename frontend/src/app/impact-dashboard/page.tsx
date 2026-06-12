import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";

export default function ImpactDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Impact Dashboard"
        description="Future analytics view for economic impact, carbon impact, and resilience indicators."
      />
      <SectionCard title="Impact Dashboard Skeleton">
        Page skeleton ready.
      </SectionCard>
    </div>
  );
}
