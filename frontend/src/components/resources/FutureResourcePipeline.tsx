import { ArrowRight } from "lucide-react";

import { SectionCard, StatusBadge } from "@/components/shared";
import type { FutureResourceIntegration } from "@/data";

interface FutureResourcePipelineProps {
  integrations: FutureResourceIntegration[];
}

export function FutureResourcePipeline({
  integrations
}: FutureResourcePipelineProps) {
  return (
    <SectionCard
      title="Future Resource Pipeline"
      description="Planned real-world integrations for later production-grade data ingestion."
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {integrations.map((integration) => (
          <article
            key={integration.id}
            className="rounded-lg border border-border bg-background p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />
              <StatusBadge label={integration.status} variant="warning" size="sm" />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-foreground">
              {integration.name}
            </h3>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {integration.description}
            </p>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
