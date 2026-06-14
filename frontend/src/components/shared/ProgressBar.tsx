import clsx from "clsx";

export type ProgressBarVariant = "success" | "warning" | "danger" | "info" | "neutral";

export interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressBarVariant;
  label?: string;
}

const variantClasses: Record<ProgressBarVariant, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  neutral: "bg-primary"
};

export function ProgressBar({
  value,
  max = 100,
  variant = "neutral",
  label
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div>
      {label ? (
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      ) : null}
      <div
        className="h-2 overflow-hidden rounded-full border border-border bg-secondary shadow-inner"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={clsx("animate-progress-fill h-full rounded-full transition-[width] duration-200 ease-out", variantClasses[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
