import { SectionCard, StatusBadge } from "@/components/shared";
import { impactInsights } from "@/data";

export function KeyInsights() {
  return (
    <SectionCard title="Key Insights" description="Mock decision-grade findings from the impact model.">
      <div className="space-y-3">
        {impactInsights.map((insight) => (
          <article key={insight.id} className="rounded-md border border-border bg-background p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">{insight.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{insight.description}</p>
              </div>
              <StatusBadge label={insight.status} variant={insight.status} size="sm" />
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
