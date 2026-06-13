import Link from "next/link";
import { ArrowRight, Brain, FileText, Radar, Route, ShieldAlert } from "lucide-react";
import { SectionCard } from "@/components/shared";
import { controlRoomQuickActions } from "@/data";

const actionIcons = {
  "action-generate-report": FileText,
  "action-open-scenario-simulator": Radar,
  "action-review-ai-parliament": Brain,
  "action-review-trade-sentinel": Route,
  "action-view-crisis-commander": ShieldAlert
} as const;

export function QuickActions() {
  return (
    <SectionCard
      title="Quick Actions"
      description="Command handoffs."
      className="h-full"
    >
      <div className="grid gap-2">
        {controlRoomQuickActions.slice(0, 4).map((action) => {
          const Icon = actionIcons[action.id as keyof typeof actionIcons] ?? ArrowRight;

          return (
            <Link
              key={action.id}
              href={action.href}
              className="group flex items-center gap-3 rounded-md border border-border bg-background/70 px-3 py-2.5 transition-colors hover:border-border-strong hover:bg-secondary/45"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-foreground">
                  {action.label}
                </span>
              </span>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>
    </SectionCard>
  );
}
