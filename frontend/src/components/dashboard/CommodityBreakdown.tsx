import { RiskPill, SectionCard, StatusBadge } from "@/components/shared";
import { commodityBreakdown } from "@/data";
import type { TradeRiskLevel } from "@/types";

const riskToPillLevel: Record<TradeRiskLevel, "low" | "medium" | "high" | "critical"> = {
  critical: "critical",
  high: "high",
  low: "low",
  medium: "medium"
};

export function CommodityBreakdown() {
  return (
    <SectionCard
      title="Commodity Breakdown"
      description="Mock commodity volumes and delay posture across monitored freight."
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {commodityBreakdown.map((commodity) => (
          <article
            key={commodity.id}
            className="rounded-md border border-border bg-background p-4"
          >
            <h3 className="text-sm font-semibold text-foreground">
              {commodity.name}
            </h3>
            <p className="mt-2 text-lg font-semibold text-foreground">
              {commodity.volume}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <RiskPill level={riskToPillLevel[commodity.riskStatus]} />
              <StatusBadge
                label={commodity.delayStatus}
                variant={commodity.riskStatus === "low" ? "success" : "warning"}
                size="sm"
              />
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
