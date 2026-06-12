import { ProgressBar, RiskPill, SectionCard } from "@/components/shared";
import { controlRoomHealthItems } from "@/data";

const progressVariantByRisk = {
  low: "success",
  medium: "info",
  high: "warning",
  critical: "danger"
} as const;

export function SystemHealthSummary() {
  return (
    <SectionCard
      title="System Health / Risk Summary"
      description="Mock stress indicators for corridor operations."
    >
      <div className="space-y-5">
        {controlRoomHealthItems.map((item) => (
          <div key={item.id} className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <RiskPill level={item.riskLevel} />
            </div>
            <ProgressBar
              value={item.value}
              variant={progressVariantByRisk[item.riskLevel]}
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
