import type { ReactNode } from "react";
import { Inbox } from "lucide-react";
import clsx from "clsx";

export interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
  compact?: boolean;
}

export function EmptyState({
  title,
  description,
  action,
  icon,
  compact = false
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        "surface-card flex flex-col items-center justify-center rounded-md border-dashed text-center text-card-foreground",
        compact ? "min-h-32 p-5" : "min-h-48 p-8"
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground shadow-sm">
        {icon ?? <Inbox className="h-5 w-5" aria-hidden="true" />}
      </div>
      <h3 className="type-section-title mt-4">{title}</h3>
      <p className="type-body mt-2 max-w-md">
        {description}
      </p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
