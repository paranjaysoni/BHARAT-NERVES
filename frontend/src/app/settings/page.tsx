import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { pageSkeletonMessage, settingsPage } from "@/data";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title={settingsPage.title}
        description={settingsPage.description}
      />
      <SectionCard title={settingsPage.skeletonTitle}>
        {pageSkeletonMessage}
      </SectionCard>
    </div>
  );
}
