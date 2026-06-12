import { ProgressBar, RiskPill, SectionCard, StatusBadge } from "@/components/shared";
import { crisisRiskItems } from "@/data";
import type { CrisisRiskLevel } from "@/types";

const riskToPillLevel: Record<CrisisRiskLevel, "low" | "medium" | "high" | "critical"> = {
  critical: "critical",
  high: "high",
  low: "low",
  medium: "medium"
};

const progressVariant: Record<CrisisRiskLevel, "success" | "warning" | "danger" | "info" | "neutral"> = {
  critical: "danger",
  high: "warning",
  low: "success",
  medium: "info"
};

export function RiskAssessment() {
  return (
    <SectionCard
      title="Risk Assessment"
      description="Mock risk posture for commander review."
      action={<StatusBadge label="Human Review" variant="info" size="sm" />}
    >
      <div className="space-y-4">
        {crisisRiskItems.map((risk) => (
          <div key={risk.id} className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-foreground">{risk.label}</span>
              <RiskPill level={riskToPillLevel[risk.riskLevel]} />
            </div>
            <ProgressBar value={risk.value} variant={progressVariant[risk.riskLevel]} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
