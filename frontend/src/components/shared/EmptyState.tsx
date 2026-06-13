import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

export interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="surface-card flex min-h-48 flex-col items-center justify-center rounded-md border-dashed p-8 text-center text-card-foreground">
      <div className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground shadow-sm">
        <Inbox className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="type-section-title mt-4">{title}</h3>
      <p className="type-body mt-2 max-w-md">
        {description}
      </p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
