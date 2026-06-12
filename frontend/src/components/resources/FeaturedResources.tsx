import { Star } from "lucide-react";

import { SectionCard, StatusBadge } from "@/components/shared";
import type { Resource, ResourceStatus } from "@/types";

interface FeaturedResourcesProps {
  resources: Resource[];
}

const statusVariant: Record<
  ResourceStatus,
  "success" | "warning" | "danger" | "info" | "neutral"
> = {
  ready: "success",
  mocked: "info",
  planned: "warning",
  static: "neutral",
  review: "warning"
};

export function FeaturedResources({ resources }: FeaturedResourcesProps) {
  const featuredResources = resources.filter((resource) => resource.featured).slice(0, 6);

  return (
    <SectionCard
      title="Featured Resources"
      description="High-value files connected to the Odisha Cyclone Corridor MVP demo."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {featuredResources.map((resource) => (
          <article
            key={resource.id}
            className="rounded-lg border border-border bg-background p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-primary">
                <Star className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs font-medium uppercase tracking-wide">
                  {resource.type}
                </span>
              </div>
              <StatusBadge
                label={resource.status}
                variant={statusVariant[resource.status]}
                size="sm"
              />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-foreground">
              {resource.title}
            </h3>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {resource.description}
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Last updated {resource.updatedDate}
            </p>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
