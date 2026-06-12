import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { impactDashboardPage, pageSkeletonMessage } from "@/data";

export default function ImpactDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title={impactDashboardPage.title}
        description={impactDashboardPage.description}
      />
      <SectionCard title={impactDashboardPage.skeletonTitle}>
        {pageSkeletonMessage}
      </SectionCard>
    </div>
  );
}
