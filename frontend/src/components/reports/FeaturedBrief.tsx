import { RiskPill } from "@/components/shared";
import type { FeaturedBrief as FeaturedBriefType } from "@/types/report";
import { Star, Lightbulb } from "lucide-react";

interface FeaturedBriefProps {
  brief: FeaturedBriefType;
}

export function FeaturedBrief({ brief }: FeaturedBriefProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="border-b border-border bg-muted/40 px-5 py-3 flex items-center gap-2">
        <Star className="h-4 w-4 text-warning" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Featured Intelligence Brief
        </span>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-foreground leading-snug">{brief.title}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{brief.subtitle}</p>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="text-sm text-foreground leading-relaxed">{brief.summary}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Risk Level</span>
          <RiskPill level={brief.riskLevel} />
        </div>

        <div className="rounded-lg border border-success/30 bg-success/5 p-4">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 mt-0.5 text-success shrink-0" />
            <div>
              <p className="text-xs font-semibold text-success mb-1">Recommendation</p>
              <p className="text-xs text-foreground leading-relaxed">{brief.recommendation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
