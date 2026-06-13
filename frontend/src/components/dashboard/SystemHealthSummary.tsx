import clsx from "clsx";
import { RiskPill, SectionCard } from "@/components/shared";
import { controlRoomHealthItems } from "@/data";
import type { HealthRiskLevel } from "@/data";

const barTone: Record<HealthRiskLevel, string> = {
  critical: "bg-danger",
  high: "bg-warning",
  low: "bg-success",
  medium: "bg-info"
};

const compactItems = controlRoomHealthItems.slice(0, 4);

export function SystemHealthSummary() {
  return (
    <SectionCard
      title="Operational Health"
      description="Live corridor stress indicators."
    >
      <div className="space-y-2.5">
        {compactItems.map((item) => (
          <div key={item.id} className="grid gap-1.5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{item.label}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <RiskPill level={item.riskLevel} label={`${item.value}%`} />
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <div
                className={clsx("h-full rounded-full", barTone[item.riskLevel])}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
