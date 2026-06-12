import clsx from "clsx";

type StatusBadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";

type StatusBadgeProps = {
  label: string;
  variant: StatusBadgeVariant;
};

const variantClasses: Record<StatusBadgeVariant, string> = {
  success: "border-success text-success",
  warning: "border-warning text-warning",
  danger: "border-danger text-danger",
  info: "border-info text-info",
  neutral: "border-border text-muted-foreground"
};

export function StatusBadge({ label, variant }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border bg-background px-2.5 py-1 text-xs font-medium",
        variantClasses[variant]
      )}
    >
      {label}
    </span>
  );
}
