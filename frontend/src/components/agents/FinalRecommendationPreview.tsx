import Link from "next/link";
import { finalRecommendation } from "@/data";

const BAR_COLOR: Record<string, string> = {
  High:   "bg-success",
  Medium: "bg-warning",
  Low:    "bg-danger",
};
const LEVEL_TEXT: Record<string, string> = {
  High:   "text-success",
  Medium: "text-warning",
  Low:    "text-danger",
};
// Visual bar widths matching reference proportions
const BAR_WIDTH: Record<string, string> = {
  "Evacuation & Safety":       "90%",
  "Medical & Relief":          "78%",
  "Trade & Logistics":         "56%",
  "Infrastructure Protection": "50%",
};

export function FinalRecommendationPreview() {
  return (
    <section className="surface-card flex h-full min-h-0 flex-col rounded-md p-3.5 text-card-foreground">
      {/* Header */}
      <div className="mb-2 flex shrink-0 items-center justify-between gap-2">
        <p className="text-[0.62rem] font-semibold uppercase tracking-widest text-muted-foreground">
          Parliament Recommendation
        </p>
        <span className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[0.6rem] font-bold text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Recommended
        </span>
      </div>

      {/* Proposed decision */}
      <div className="mb-2 shrink-0">
        <p className="mb-1 text-[0.58rem] font-semibold uppercase tracking-wide text-muted-foreground">
          Proposed Decision
        </p>
        <p className="text-[0.7rem] leading-[1.32] text-foreground">
          {finalRecommendation.proposedDecision}
        </p>
      </div>

      {/* Implementation priority bars */}
      <div className="min-h-0 flex-1">
        <p className="mb-1.5 text-[0.58rem] font-semibold uppercase tracking-wide text-muted-foreground">
          Implementation Priority
        </p>
        <div className="space-y-1">
          {finalRecommendation.implementationPriorities.map((p, i) => (
            <div key={p.label} className="flex items-center gap-2">
              <span className="w-4 shrink-0 text-[0.6rem] tabular-nums text-muted-foreground">{i + 1}.</span>
              <span className="w-32 shrink-0 text-[0.62rem] text-muted-foreground">{p.label}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                <div
                  className={`h-full rounded-full ${BAR_COLOR[p.level]}`}
                  style={{ width: BAR_WIDTH[p.label] ?? "60%" }}
                />
              </div>
              <span className={`w-11 shrink-0 text-right text-[0.6rem] font-bold ${LEVEL_TEXT[p.level]}`}>
                {p.level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex shrink-0 items-center justify-between border-t border-border pt-2">
        <Link
          href={finalRecommendation.href}
          className="text-[0.65rem] font-medium text-primary hover:text-primary/75"
        >
          View Full Recommendation →
        </Link>
        <Link href={finalRecommendation.href} className="btn btn-primary h-7 px-3 text-[0.68rem]">
          Send to Crisis Commander
        </Link>
      </div>
    </section>
  );
}
