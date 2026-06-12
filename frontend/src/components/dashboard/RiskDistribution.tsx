import { ProgressBar, RiskPill, SectionCard } from "@/components/shared";
import { impactRiskDistribution } from "@/data";
import type { ImpactRiskLevel } from "@/types";

const riskToPillLevel: Record<ImpactRiskLevel, "low" | "medium" | "high" | "critical"> = {
  critical: "critical",
  high: "high",
  low: "low",
  medium: "medium"
};

const progressVariant: Record<ImpactRiskLevel, "success" | "warning" | "danger" | "info" | "neutral"> = {
  critical: "danger",
  high: "warning",
  low: "success",
  medium: "info"
};

export function RiskDistribution() {
  return (
    <SectionCard title="Risk Distribution" description="Mock sector risk levels for the active disruption.">
      <div className="space-y-4">
        {impactRiskDistribution.map((risk) => (
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
