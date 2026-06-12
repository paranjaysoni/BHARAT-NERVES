import { SectionCard, StatusBadge } from "@/components/shared";
import type { ReportCategoryCard } from "@/types/report";

interface ReportCategoriesProps {
  categories: ReportCategoryCard[];
}

const statusVariant: Record<string, "success" | "warning" | "info"> = {
  active: "success",
  review: "warning",
  pending: "info"
};

const statusLabel: Record<string, string> = {
  active: "Active",
  review: "In Review",
  pending: "Pending"
};

export function ReportCategories({ categories }: ReportCategoriesProps) {
  return (
    <SectionCard title="Report Categories" description="Browse reports by operational domain">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-semibold text-foreground leading-tight">{cat.title}</h4>
              <StatusBadge
                label={statusLabel[cat.status]}
                variant={statusVariant[cat.status]}
                size="sm"
              />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{cat.description}</p>
            <div className="mt-auto pt-2 border-t border-border">
              <span className="text-xs font-medium text-foreground">
                {cat.count} report{cat.count !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
