import { RiskPill, SectionCard, StatusBadge } from "@/components/shared";
import { portStatuses } from "@/data";
import type { PortOperatingStatus, TradeRiskLevel } from "@/types";

const statusVariant: Record<PortOperatingStatus, "success" | "warning" | "danger" | "info" | "neutral"> = {
  congested: "warning",
  disrupted: "danger",
  normal: "success",
  watch: "info"
};

const riskToPillLevel: Record<TradeRiskLevel, "low" | "medium" | "high" | "critical"> = {
  critical: "critical",
  high: "high",
  low: "low",
  medium: "medium"
};

export function PortStatusPanel() {
  return (
    <SectionCard
      title="Port Status"
      description="Dummy port operations health for key coastal trade gateways."
    >
      <div className="space-y-3">
        {portStatuses.map((port) => (
          <div
            key={port.id}
            className="rounded-md border border-border bg-background p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">{port.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Congestion {port.congestionLevel} · Delay {port.delay}
                </p>
              </div>
              <StatusBadge
                label={port.status}
                variant={statusVariant[port.status]}
                size="sm"
              />
            </div>
            <div className="mt-3">
              <RiskPill level={riskToPillLevel[port.riskLevel]} />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
