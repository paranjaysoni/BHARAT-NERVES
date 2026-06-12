import clsx from "clsx";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface RiskPillProps {
  level: RiskLevel;
  label?: string;
}

const riskClasses: Record<RiskLevel, string> = {
  low: "border-success/30 bg-success/10 text-success",
  medium: "border-info/35 bg-info/10 text-info",
  high: "border-warning/40 bg-warning/10 text-warning",
  critical: "border-danger/35 bg-danger/10 text-danger"
};

const defaultLabels: Record<RiskLevel, string> = {
  low: "Low Risk",
  medium: "Medium Risk",
  high: "High Risk",
  critical: "Critical Risk"
};

export function RiskPill({ level, label }: RiskPillProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        riskClasses[level]
      )}
    >
      {label ?? defaultLabels[level]}
    </span>
  );
}
