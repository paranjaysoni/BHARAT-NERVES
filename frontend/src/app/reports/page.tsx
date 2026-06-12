import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { pageSkeletonMessage, reportsPage } from "@/data";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title={reportsPage.title}
        description={reportsPage.description}
      />
      <SectionCard title={reportsPage.skeletonTitle}>
        {pageSkeletonMessage}
      </SectionCard>
    </div>
  );
}
