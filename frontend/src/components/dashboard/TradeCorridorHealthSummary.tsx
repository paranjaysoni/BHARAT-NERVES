import { ProgressBar, RiskPill, SectionCard, StatusBadge } from "@/components/shared";
import { tradeCorridorHealth } from "@/data";
import type { TradeRiskLevel } from "@/types";

const riskToPillLevel: Record<TradeRiskLevel, "low" | "medium" | "high" | "critical"> = {
  critical: "critical",
  high: "high",
  low: "low",
  medium: "medium"
};

const progressVariant: Record<TradeRiskLevel, "success" | "warning" | "danger" | "info" | "neutral"> = {
  critical: "danger",
  high: "warning",
  low: "success",
  medium: "info"
};

export function TradeCorridorHealthSummary() {
  return (
    <SectionCard
      title="Corridor Health Summary"
      description="Mock trade corridor health, risk level, and active alert count."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {tradeCorridorHealth.map((corridor) => (
          <article
            key={corridor.id}
            className="rounded-md border border-border bg-background p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {corridor.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Health {corridor.health}%
                </p>
              </div>
              <RiskPill level={riskToPillLevel[corridor.riskLevel]} />
            </div>
            <div className="mt-4">
              <ProgressBar
                value={corridor.health}
                variant={progressVariant[corridor.riskLevel]}
              />
            </div>
            <div className="mt-4">
              <StatusBadge
                label={`${corridor.activeAlerts} active alerts`}
                variant={corridor.activeAlerts > 3 ? "warning" : "info"}
                size="sm"
              />
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
