import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { pageSkeletonMessage, resourcesPage } from "@/data";

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title={resourcesPage.title}
        description={resourcesPage.description}
      />
      <SectionCard title={resourcesPage.skeletonTitle}>
        {pageSkeletonMessage}
      </SectionCard>
    </div>
  );
}
