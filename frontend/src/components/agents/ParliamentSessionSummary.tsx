import { SectionCard, StatusBadge } from "@/components/shared";
import { parliamentSession } from "@/data";

export function ParliamentSessionSummary() {
  return (
    <SectionCard
      title="Active Session Summary"
      description="Prepared multi-agent review context for the current crisis scenario."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <SummaryItem label="Current Scenario" value={parliamentSession.currentScenario} />
        <SummaryItem label="Session Status" value={parliamentSession.sessionStatus} />
        <SummaryItem
          label="Participating Agents"
          value={String(parliamentSession.participatingAgents)}
        />
        <SummaryItem label="Expected Output" value={parliamentSession.expectedOutput} />
      </div>
      <div className="mt-4 rounded-md border border-border bg-background p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Primary Decision Question
        </p>
        <p className="mt-2 text-sm font-semibold text-foreground">
          {parliamentSession.primaryDecisionQuestion}
        </p>
      </div>
      <div className="mt-4">
        <StatusBadge label="Mock Deliberation" variant="info" />
      </div>
    </SectionCard>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
