import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { pageSkeletonMessage, tradeSentinelPage } from "@/data";

export default function TradeSentinelPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title={tradeSentinelPage.title}
        description={tradeSentinelPage.description}
      />
      <SectionCard title={tradeSentinelPage.skeletonTitle}>
        {pageSkeletonMessage}
      </SectionCard>
    </div>
  );
}
