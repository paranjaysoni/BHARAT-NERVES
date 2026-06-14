"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Brain, Loader2, RefreshCw } from "lucide-react";
import clsx from "clsx";
import { useSimulationStore } from "@/hooks/use-simulation-store";
import { runParliamentSession } from "@/lib/api/ai-parliament.api";
import { setParliamentSession } from "@/lib/simulation-store";
import type { AIParliamentSession, ParliamentConflictLevel } from "@/types/ai-parliament.types";

// ── Domain accent colours matching AgentGrid ──────────────────────────────────
const DOMAIN_ACCENT: Record<string, { card: string; bar: string; text: string }> = {
  INFRASTRUCTURE: { card: "border-blue-400/30 bg-blue-500/10",   bar: "bg-blue-500",   text: "text-blue-400" },
  ENVIRONMENT:    { card: "border-emerald-400/30 bg-emerald-500/10", bar: "bg-emerald-500", text: "text-emerald-400" },
  HUMANITARIAN:   { card: "border-violet-400/30 bg-violet-500/10", bar: "bg-violet-500", text: "text-violet-400" },
  ECONOMIC:       { card: "border-amber-400/30 bg-amber-500/10",  bar: "bg-amber-500",  text: "text-amber-400" },
  LOGISTICS:      { card: "border-cyan-400/30 bg-cyan-500/10",    bar: "bg-cyan-500",   text: "text-cyan-400" },
  RISK:           { card: "border-red-400/30 bg-red-500/10",      bar: "bg-red-500",    text: "text-red-400" },
  TECHNOLOGY:     { card: "border-indigo-400/30 bg-indigo-500/10", bar: "bg-indigo-500", text: "text-indigo-400" },
  POLICY:         { card: "border-orange-400/30 bg-orange-500/10", bar: "bg-orange-500", text: "text-orange-400" },
};
const FALLBACK_ACCENT = { card: "border-primary/20 bg-primary/10", bar: "bg-primary", text: "text-primary" };

function conflictBadge(level: ParliamentConflictLevel) {
  if (level === "HIGH")     return "border-danger/30 bg-danger/15 text-danger";
  if (level === "MODERATE") return "border-warning/30 bg-warning/15 text-warning";
  return "border-success/30 bg-success/15 text-success";
}

// ── Main client component ─────────────────────────────────────────────────────

export function ParliamentPageClient() {
  const store = useSimulationStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastTriggeredSimId = useRef<string | null>(null);

  const session = store.parliament;

  // Auto-call parliament when a new simulation finishes
  useEffect(() => {
    if (
      store.phase !== "done" ||
      !store.result ||
      store.activeSimulationId === lastTriggeredSimId.current
    ) return;

    lastTriggeredSimId.current = store.activeSimulationId;

    const backendScenarioId = store.result.scenario.scenarioId;
    const simulationId = store.result.simulationId;

    setLoading(true);
    setError(null);

    runParliamentSession({ scenarioId: backendScenarioId, simulationId, includeFullMatrix: true })
      .then((s) => {
        setParliamentSession(s);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Unable to load AI Parliament");
        setLoading(false);
      });
  }, [store.phase, store.result, store.activeSimulationId]);

  if (store.phase === "idle") {
    return (
      <div className="flex h-60 flex-col items-center justify-center gap-3 rounded-md border border-border bg-card/60 text-center">
        <Brain className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm font-medium text-muted-foreground">No simulation running</p>
        <p className="max-w-xs text-xs text-muted-foreground">
          Go to <span className="font-semibold text-primary">Scenario Simulator</span>, select a scenario, and click{" "}
          <span className="font-semibold text-primary">Run Simulation</span> to trigger the AI Parliament.
        </p>
      </div>
    );
  }

  if (store.phase === "running" || loading) {
    return (
      <div className="flex h-60 flex-col items-center justify-center gap-3 rounded-md border border-border bg-card/60">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium text-foreground">
          {store.phase === "running" ? "Simulation Running…" : "Loading Parliament…"}
        </p>
        <p className="text-xs text-muted-foreground">AI Parliament will convene once the simulation completes</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-60 flex-col items-center justify-center gap-3 rounded-md border border-danger/20 bg-danger/5 text-center">
        <AlertCircle className="h-8 w-8 text-danger" />
        <p className="text-sm font-medium text-danger">Unable to load AI Parliament</p>
        <p className="max-w-xs text-xs text-muted-foreground">{error}</p>
        <button
          onClick={() => {
            if (!store.result) return;
            lastTriggeredSimId.current = null;
          }}
          className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Retry
        </button>
      </div>
    );
  }

  if (!session) return null;

  return <ParliamentSessionView session={session} />;
}

// ── Session view ──────────────────────────────────────────────────────────────

function ParliamentSessionView({ session }: { session: AIParliamentSession }) {
  const consensusScore = session.consensus.score;
  const filledArc = (consensusScore / 100) * Math.PI * 50;

  return (
    <div className="space-y-3">
      {/* Session header */}
      <section className="surface-card rounded-md p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[0.6rem] font-bold uppercase tracking-widest text-muted-foreground">Live Parliament Session</p>
            <h2 className="mt-1 text-lg font-bold text-foreground">{session.scenarioName}</h2>
            <p className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[0.65rem] text-muted-foreground">
              <span>Session: <span className="font-medium text-foreground">{session.sessionId.slice(0, 12)}…</span></span>
              <span>Participants: <span className="font-medium text-foreground">{session.participants} AI Agents</span></span>
              <span>Question: <span className="font-medium text-foreground">{session.currentQuestion}</span></span>
            </p>
          </div>
          <span className={clsx("rounded-md border px-3 py-1 text-xs font-bold",
            session.severity === "CRITICAL" ? "border-danger/30 bg-danger/15 text-danger" :
            session.severity === "HIGH" ? "border-warning/30 bg-warning/15 text-warning" :
            "border-info/30 bg-info/15 text-info")}>
            {session.severity}
          </span>
        </div>
      </section>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Agents grid */}
        <div className="space-y-3">
          <section className="surface-card rounded-md p-4">
            <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-widest text-muted-foreground">AI Agents in Session</p>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {session.agents.map((agent) => {
                const accent = DOMAIN_ACCENT[agent.domain] ?? FALLBACK_ACCENT;
                return (
                  <article key={agent.agentId} className={clsx("rounded-md border p-3", accent.card)}>
                    <p className={clsx("text-[0.72rem] font-bold leading-tight", accent.text)}>{agent.name}</p>
                    <p className="mt-1 text-[0.6rem] text-muted-foreground">{agent.role}</p>
                    <p className="mt-2 text-[0.66rem] font-semibold leading-tight text-foreground">{agent.position}</p>
                    <div className="mt-2">
                      <div className="mb-1 flex items-center justify-between text-[0.58rem] text-muted-foreground">
                        <span>Confidence</span>
                        <span className={clsx("font-bold", accent.text)}>{agent.confidence}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-black/20">
                        <div className={clsx("h-full rounded-full", accent.bar)} style={{ width: `${agent.confidence}%` }} />
                      </div>
                    </div>
                    <span className={clsx("mt-2 inline-block rounded-full border px-2 py-0.5 text-[0.58rem] font-semibold", conflictBadge(agent.conflictLevel))}>
                      {agent.conflictLevel}
                    </span>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Recommendation */}
          <section className="surface-card rounded-md p-4">
            <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-widest text-muted-foreground">
              Parliament Recommendation
            </p>
            <h3 className="text-sm font-bold text-foreground">{session.recommendation.title}</h3>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{session.recommendation.summary}</p>
            <div className="mt-3 space-y-2">
              {session.recommendation.priorityActions.map((action) => (
                <div key={action.rank} className="flex items-center gap-3 rounded-md border border-border bg-background/60 px-3 py-2">
                  <span className="text-xs font-bold text-muted-foreground">#{action.rank}</span>
                  <span className="flex-1 text-xs font-medium text-foreground">{action.label}</span>
                  <span className={clsx("rounded border px-2 py-0.5 text-[0.62rem] font-bold",
                    action.priority === "CRITICAL" ? "border-danger/30 bg-danger/15 text-danger" :
                    action.priority === "HIGH" ? "border-warning/30 bg-warning/15 text-warning" :
                    "border-info/30 bg-info/15 text-info")}>
                    {action.priority}
                  </span>
                  <span className="text-xs font-semibold text-foreground">{action.score}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Insights */}
          <section className="surface-card rounded-md p-4">
            <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-widest text-muted-foreground">Key Insights</p>
            <div className="space-y-2">
              {session.insights.map((insight) => (
                <div key={insight.id} className="rounded-md border border-border bg-background/60 p-3">
                  <div className="flex items-start gap-2">
                    <span className={clsx("mt-0.5 rounded px-1.5 py-0.5 text-[0.58rem] font-bold",
                      insight.type === "RISK" ? "bg-danger/20 text-danger" :
                      insight.type === "DEBATE" ? "bg-warning/20 text-warning" :
                      insight.type === "ACTION" ? "bg-primary/20 text-primary" :
                      "bg-success/20 text-success")}>
                      {insight.type}
                    </span>
                    <div>
                      <p className="text-xs font-medium text-foreground">{insight.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{insight.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-3">
          {/* Consensus */}
          <section className="surface-card rounded-md p-4">
            <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-widest text-muted-foreground">Consensus Summary</p>
            <div className="flex items-center gap-4">
              <div className="relative h-[80px] w-[120px] shrink-0">
                <svg width="120" height="80" viewBox="0 0 140 76" aria-hidden="true">
                  <path d="M 20 68 A 50 50 0 0 1 120 68" fill="none" stroke="hsl(var(--border))" strokeWidth="10" strokeLinecap="round" />
                  <path d="M 20 68 A 50 50 0 0 1 120 68" fill="none" stroke="hsl(var(--success))" strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${filledArc} ${Math.PI * 50}`} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                  <p className="text-xl font-bold tabular-nums text-foreground">{consensusScore}%</p>
                  <p className="text-[0.58rem] font-semibold text-success">Consensus</p>
                </div>
              </div>
              <div className="space-y-1.5 text-xs">
                <p className="font-bold text-foreground">{session.consensus.level.replace(/_/g, " ")}</p>
                <p className={clsx("font-semibold",
                  session.consensus.conflictLevel === "HIGH" ? "text-danger" :
                  session.consensus.conflictLevel === "MODERATE" ? "text-warning" : "text-success")}>
                  Conflict: {session.consensus.conflictLevel}
                </p>
                {session.consensus.humanReviewRequired && (
                  <p className="text-warning">⚠ Human review required</p>
                )}
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="surface-card rounded-md p-4">
            <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-widest text-muted-foreground">Decision Timeline</p>
            <div className="space-y-3">
              {session.timeline.map((event, i) => (
                <div key={event.id} className="flex items-start gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/20 text-success">
                      <span className="text-[0.6rem] font-bold">{i + 1}</span>
                    </div>
                    {i < session.timeline.length - 1 && <div className="w-px flex-1 bg-border" style={{ minHeight: 12 }} />}
                  </div>
                  <div className="pb-1">
                    <p className="text-[0.68rem] font-medium text-foreground">{event.label}</p>
                    <p className="text-[0.6rem] text-muted-foreground">{new Date(event.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Final recommendation badge */}
          <section className="surface-card rounded-md p-4">
            <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-widest text-muted-foreground">Send to Commander</p>
            <div className={clsx("rounded-md border px-3 py-2 text-xs font-semibold",
              session.recommendation.sendToCrisisCommander
                ? "border-success/30 bg-success/15 text-success"
                : "border-border bg-secondary/60 text-muted-foreground")}>
              {session.recommendation.sendToCrisisCommander
                ? "✓ Recommendation sent to Crisis Commander"
                : "Pending — awaiting consensus threshold"}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
