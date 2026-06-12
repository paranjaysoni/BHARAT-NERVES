import { CheckCircle2, Circle } from "lucide-react";
import { SectionCard } from "@/components/shared";
import { commanderChecklist } from "@/data";

export function ActionChecklist() {
  return (
    <SectionCard
      title="Action Checklist"
      description="Visual checklist only. No command execution is triggered."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {commanderChecklist.map((item) => {
          const isComplete = item.status === "complete";

          return (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-md border border-border bg-background p-4"
            >
              {isComplete ? (
                <CheckCircle2 className="h-5 w-5 text-success" aria-hidden="true" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              )}
              <span className="text-sm font-medium text-foreground">{item.label}</span>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
