import clsx from "clsx";

type StatusBadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";
type StatusBadgeSize = "sm" | "md";

export interface StatusBadgeProps {
  label: string;
  variant: StatusBadgeVariant;
  size?: StatusBadgeSize;
}

const variantClasses: Record<StatusBadgeVariant, string> = {
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/40 bg-warning/10 text-warning",
  danger: "border-danger/35 bg-danger/10 text-danger",
  info: "border-info/35 bg-info/10 text-info",
  neutral: "border-border text-muted-foreground"
};

const sizeClasses: Record<StatusBadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs"
};

export function StatusBadge({ label, variant, size = "md" }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border font-medium",
        variantClasses[variant],
        sizeClasses[size]
      )}
    >
      {label}
    </span>
  );
}
