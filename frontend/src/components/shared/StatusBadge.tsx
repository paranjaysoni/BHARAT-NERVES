import clsx from "clsx";

type StatusBadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";
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
  neutral: "border-border bg-secondary/70 text-muted-foreground"
};

const dotClasses: Record<StatusBadgeVariant, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  neutral: "bg-muted-foreground"
};

const sizeClasses: Record<StatusBadgeSize, string> = {
  sm: "px-2 py-0.5 text-[0.68rem]",
  md: "px-2.5 py-1 text-xs"
};

export function StatusBadge({ label, variant, size = "md" }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold leading-4 shadow-sm transition-colors duration-200",
        variantClasses[variant],
        sizeClasses[size]
      )}
    >
      <span className={clsx("h-1.5 w-1.5 rounded-full", dotClasses[variant])} />
      {label}
    </span>
  );
}
