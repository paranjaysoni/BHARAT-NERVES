import { RiskPill, SectionCard } from "@/components/shared";
import { futureRiskIndicators } from "@/data";
import type { TradeRiskLevel } from "@/types";

const riskToPillLevel: Record<TradeRiskLevel, "low" | "medium" | "high" | "critical"> = {
  critical: "critical",
  high: "high",
  low: "low",
  medium: "medium"
};

export function FutureRiskIndicators() {
  return (
    <SectionCard
      title="Future Risk Indicators"
      description="Static outlook only. No prediction model or AI is running."
    >
      <div className="space-y-3">
        {futureRiskIndicators.map((risk) => (
          <div
            key={risk.id}
            className="rounded-md border border-border bg-background p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">{risk.horizon}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {risk.summary}
                </p>
              </div>
              <RiskPill level={riskToPillLevel[risk.riskLevel]} />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
