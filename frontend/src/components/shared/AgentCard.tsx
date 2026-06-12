import { Brain } from "lucide-react";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { StatusBadge } from "@/components/shared/StatusBadge";

export interface AgentCardProps {
  name: string;
  role: string;
  priority: string;
  description: string;
  confidence?: number;
  status?: string;
}

export function AgentCard({
  name,
  role,
  priority,
  description,
  confidence,
  status
}: AgentCardProps) {
  return (
    <article className="rounded-lg border border-border bg-card p-5 text-card-foreground">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
          <Brain className="h-4 w-4" aria-hidden="true" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-foreground">{name}</h3>
            {status ? <StatusBadge label={status} variant="neutral" size="sm" /> : null}
          </div>
          <p className="mt-1 text-sm font-medium text-muted-foreground">{role}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{description}</p>
      <p className="mt-4 text-sm">
        <span className="font-medium text-foreground">Priority:</span>{" "}
        <span className="text-muted-foreground">{priority}</span>
      </p>
      {typeof confidence === "number" ? (
        <div className="mt-4">
          <ProgressBar value={confidence} label="Confidence" variant="info" />
        </div>
      ) : null}
    </article>
  );
}
