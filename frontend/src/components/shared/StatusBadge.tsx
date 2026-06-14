import clsx from "clsx";

type StatusBadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "critical"
  | "high"
  | "medium"
  | "low"
  | "operational"
  | "draft"
  | "published"
  | "ready"
  | "mock"
  | "planned";
type StatusBadgeSize = "sm" | "md";

export interface StatusBadgeProps {
  label: string;
  variant: StatusBadgeVariant;
  size?: StatusBadgeSize;
}

const variantClasses: Record<StatusBadgeVariant, string> = {
  success: "border-success/25 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  danger: "border-danger/25 bg-danger/10 text-danger",
  info: "border-info/25 bg-info/10 text-info",
  neutral: "border-border bg-secondary/70 text-muted-foreground",
  critical: "border-danger/30 bg-danger/15 text-danger",
  high: "border-warning/30 bg-warning/15 text-warning",
  medium: "border-yellow-400/30 bg-yellow-400/15 text-yellow-300",
  low: "border-success/30 bg-success/15 text-success",
  operational: "border-success/30 bg-success/15 text-success",
  draft: "border-border bg-secondary/70 text-muted-foreground",
  published: "border-success/30 bg-success/15 text-success",
  ready: "border-info/30 bg-info/15 text-info",
  mock: "border-violet-500/30 bg-violet-500/15 text-violet-300",
  planned: "border-warning/30 bg-warning/15 text-warning"
};

const dotClasses: Record<StatusBadgeVariant, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  neutral: "bg-muted-foreground",
  critical: "bg-danger",
  high: "bg-warning",
  medium: "bg-yellow-300",
  low: "bg-success",
  operational: "bg-success",
  draft: "bg-muted-foreground",
  published: "bg-success",
  ready: "bg-info",
  mock: "bg-violet-400",
  planned: "bg-warning"
};

const sizeClasses: Record<StatusBadgeSize, string> = {
  sm: "px-2 py-0.5 text-[0.68rem]",
  md: "px-2.5 py-1 text-xs"
};

export function StatusBadge({ label, variant, size = "md" }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold leading-4 shadow-sm transition-colors duration-200 ease-out",
        variantClasses[variant],
        sizeClasses[size]
      )}
    >
      <span className={clsx("h-1.5 w-1.5 rounded-full", dotClasses[variant])} />
      {label}
    </span>
  );
}
