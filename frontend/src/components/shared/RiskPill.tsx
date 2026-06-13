import clsx from "clsx";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface RiskPillProps {
  level: RiskLevel;
  label?: string;
}

const riskClasses: Record<RiskLevel, string> = {
  low: "border-success/25 bg-success/10 text-success",
  medium: "border-info/25 bg-info/10 text-info",
  high: "border-warning/30 bg-warning/10 text-warning",
  critical: "border-danger/25 bg-danger/10 text-danger"
};

const dotClasses: Record<RiskLevel, string> = {
  low: "bg-success",
  medium: "bg-info",
  high: "bg-warning",
  critical: "bg-danger"
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
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold leading-4 shadow-sm transition-colors duration-200",
        riskClasses[level]
      )}
    >
      <span className={clsx("h-1.5 w-1.5 rounded-full", dotClasses[level])} />
      {label ?? defaultLabels[level]}
    </span>
  );
}
