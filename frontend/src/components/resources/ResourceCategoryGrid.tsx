import { Database, FileText, Globe2, Map, PackageCheck, ScrollText } from "lucide-react";

import { SectionCard, StatusBadge } from "@/components/shared";
import type { ResourceCategory } from "@/data";
import type { Resource } from "@/types";

interface ResourceCategoryGridProps {
  categories: ResourceCategory[];
  resources: Resource[];
}

const categoryIcons = [
  Database,
  Map,
  FileText,
  ScrollText,
  PackageCheck,
  FileText,
  Globe2,
  Database
];

const statusVariant = {
  ready: "success",
  mocked: "info",
  planned: "warning",
  static: "neutral"
} as const;

export function ResourceCategoryGrid({
  categories,
  resources
}: ResourceCategoryGridProps) {
  return (
    <SectionCard
      title="Resource Categories"
      description="Organized reference material for datasets, documents, maps and MVP simulation inputs."
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {categories.map((category, index) => {
          const Icon = categoryIcons[index % categoryIcons.length];
          const count = resources.filter(
            (resource) => resource.category === category.name
          ).length;

          return (
            <article
              key={category.id}
              className="rounded-lg border border-border bg-background p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <StatusBadge
                  label={category.status}
                  variant={statusVariant[category.status]}
                  size="sm"
                />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">
                {category.name}
              </h3>
              <p className="mt-2 min-h-12 text-xs leading-5 text-muted-foreground">
                {category.description}
              </p>
              <p className="mt-4 text-xs font-medium text-primary">
                {count} items
              </p>
            </article>
          );
        })}
      </div>
    </SectionCard>
  );
}
