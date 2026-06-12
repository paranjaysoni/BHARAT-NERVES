import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Future configuration area for platform preferences, corridor scope, and user-level options."
      />
      <SectionCard title="Settings Skeleton">Page skeleton ready.</SectionCard>
    </div>
  );
}
