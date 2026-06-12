import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { aiParliamentPage, pageSkeletonMessage } from "@/data";

export default function AiParliamentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title={aiParliamentPage.title}
        description={aiParliamentPage.description}
      />
      <SectionCard title={aiParliamentPage.skeletonTitle}>
        {pageSkeletonMessage}
      </SectionCard>
    </div>
  );
}
