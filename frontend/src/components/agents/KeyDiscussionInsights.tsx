import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { keyDiscussionInsights } from "@/data";
import type { KeyDiscussionInsight } from "@/types";

const CFG: Record<KeyDiscussionInsight["type"], { icon: React.ReactNode; cls: string; rail: string }> = {
  agree: { icon: <CheckCircle2 className="h-4 w-4" />, cls: "text-success", rail: "bg-success" },
  debate:{ icon: <AlertCircle  className="h-4 w-4" />, cls: "text-warning", rail: "bg-warning" },
  info:  { icon: <Info         className="h-4 w-4" />, cls: "text-info", rail: "bg-info" },
};

export function KeyDiscussionInsights() {
  return (
    <section className="surface-card flex h-full min-h-0 flex-col rounded-md p-3.5 text-card-foreground">
      {/* Header */}
      <div className="mb-2.5 flex shrink-0 items-center justify-between gap-2">
        <p className="text-[0.62rem] font-semibold uppercase tracking-widest text-muted-foreground">
          Key Discussion Insights
        </p>
      </div>

      {/* Insight rows */}
      <div className="min-h-0 flex-1 space-y-1.5">
        {keyDiscussionInsights.map((insight) => {
          const cfg = CFG[insight.type];
          return (
            <div key={insight.id} className="grid grid-cols-[3px_24px_minmax(0,1fr)] items-center gap-2 rounded-md border border-border bg-background/45 px-2.5 py-1.5">
              <span className={`h-7 w-[3px] rounded-full ${cfg.rail}`} />
              <span className={`flex h-6 w-6 items-center justify-center rounded-full border border-current/25 bg-current/10 ${cfg.cls}`}>{cfg.icon}</span>
              <p className="text-[0.68rem] leading-[1.28] text-foreground">{insight.text}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-2.5 shrink-0 border-t border-border pt-2 text-center">
        <button className="text-[0.65rem] font-medium text-primary hover:text-primary/75">
          View Full Discussion →
        </button>
      </div>
    </section>
  );
}
