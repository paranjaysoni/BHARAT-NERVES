import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { crisisCommanderPage, pageSkeletonMessage } from "@/data";

export default function CrisisCommanderPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title={crisisCommanderPage.title}
        description={crisisCommanderPage.description}
      />
      <SectionCard title={crisisCommanderPage.skeletonTitle}>
        {pageSkeletonMessage}
      </SectionCard>
    </div>
  );
}
