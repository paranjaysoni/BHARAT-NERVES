import { SectionCard, StatusBadge } from "@/components/shared";
import type { PlatformInfo } from "@/types/settings";

interface PlatformInformationProps {
  info: PlatformInfo;
}

export function PlatformInformation({ info }: PlatformInformationProps) {
  const rows: { label: string; value: string }[] = [
    { label: "Project", value: info.project },
    { label: "Platform", value: info.platform },
    { label: "Version", value: info.version },
    { label: "Build", value: info.build },
    { label: "Environment", value: info.environment },
    { label: "Region", value: info.region },
    { label: "Release Date", value: info.releaseDate }
  ];

  return (
    <SectionCard
      title="Platform Information"
      action={<StatusBadge label="MVP" variant="info" size="sm" />}
    >
      <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between bg-card px-4 py-2.5">
            <span className="text-xs text-muted-foreground">{label}</span>
            <span className="text-sm font-medium text-foreground">{value}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
