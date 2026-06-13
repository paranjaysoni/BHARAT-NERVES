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
    <article className="surface-card rounded-md p-4 text-card-foreground lg:p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary shadow-sm">
          <Brain className="h-4 w-4" aria-hidden="true" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="type-section-title">{name}</h3>
            {status ? <StatusBadge label={status} variant="neutral" size="sm" /> : null}
          </div>
          <p className="type-caption mt-1 font-medium">{role}</p>
        </div>
      </div>
      <p className="type-body mt-4">{description}</p>
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
