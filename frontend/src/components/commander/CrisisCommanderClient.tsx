"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  CircleDot,
  Loader2,
  ShieldAlert,
  ShipWheel,
  Users
} from "lucide-react";
import clsx from "clsx";
import { useSimulationStore } from "@/hooks/use-simulation-store";
import { runCrisisCommanderPlan } from "@/lib/api/crisis-commander.api";
import { setCommanderPlan } from "@/lib/simulation-store";
import type {
  CrisisCommanderPlan,
  CommanderPriority,
  CommanderItemStatus
} from "@/types/crisis-commander.types";

// ── Helpers ───────────────────────────────────────────────────────────────────

const priorityClass: Record<CommanderPriority, string> = {
  CRITICAL: "border-danger/30 bg-danger/15 text-danger",
  HIGH:     "border-warning/30 bg-warning/15 text-warning",
  MEDIUM:   "border-info/30 bg-info/15 text-info",
  LOW:      "border-border bg-secondary/60 text-muted-foreground",
};

const statusClass: Record<CommanderItemStatus, string> = {
  READY:    "text-success",
  ASSIGNED: "text-info",
  PENDING:  "text-muted-foreground",
};

function Panel({ title, action, children, className }: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={clsx("surface-card rounded-md p-3.5 text-card-foreground", className)}>
      <div className="mb-3 flex min-h-7 items-center justify-between gap-3 border-b border-border/70 pb-3">
        <h2 className="text-sm font-semibold uppercase leading-5 text-foreground">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function PanelLink({ label }: { label: string }) {
  return (
    <button className="mt-3 flex h-8 w-full items-center justify-center gap-2 rounded-md border border-border bg-background/60 text-xs font-medium text-primary hover:bg-secondary">
      {label}
      <ArrowRight className="h-3.5 w-3.5" />
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function CrisisCommanderClient() {
  const store = useSimulationStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastTriggeredSimId = useRef<string | null>(null);

  const plan = store.commanderPlan;

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

    runCrisisCommanderPlan({ scenarioId: backendScenarioId, simulationId, includeChecklist: true })
      .then((p) => {
        setCommanderPlan(p);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Unable to generate Crisis Commander plan");
        setLoading(false);
      });
  }, [store.phase, store.result, store.activeSimulationId]);

  if (store.phase === "idle") {
    return (
      <div className="flex h-52 flex-col items-center justify-center gap-3 rounded-md border border-border bg-card/60 text-center">
        <ShieldAlert className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm font-medium text-muted-foreground">Awaiting simulation</p>
        <p className="max-w-xs text-xs text-muted-foreground">
          Run a simulation on the <span className="font-semibold text-primary">Scenario Simulator</span> page to generate a Crisis Commander plan.
        </p>
      </div>
    );
  }

  if (store.phase === "running" || loading) {
    return (
      <div className="flex h-52 flex-col items-center justify-center gap-3 rounded-md border border-border bg-card/60">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium text-foreground">
          {store.phase === "running" ? "Simulation Running…" : "Preparing Commander Plan…"}
        </p>
        <p className="text-xs text-muted-foreground">The plan will be ready once the simulation engine completes</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-52 flex-col items-center justify-center gap-3 rounded-md border border-danger/20 bg-danger/5 text-center">
        <AlertCircle className="h-8 w-8 text-danger" />
        <p className="text-sm font-medium text-danger">Unable to generate Crisis Commander plan</p>
        <p className="max-w-xs text-xs text-muted-foreground">{error}</p>
        <button
          onClick={() => { lastTriggeredSimId.current = null; }}
          className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!plan) return null;

  return <CommanderPlanView plan={plan} />;
}

// ── Plan view ─────────────────────────────────────────────────────────────────

function CommanderPlanView({ plan }: { plan: CrisisCommanderPlan }) {
  return (
    <div className="space-y-3">
      {/* Header KPIs */}
      <section className="surface-card grid overflow-hidden rounded-md text-card-foreground sm:grid-cols-2 lg:grid-cols-4">
        <KpiCell title="Scenario" value={plan.scenarioName} tone="primary" />
        <KpiCell title="Severity" value={plan.severity} tone={plan.severity === "CRITICAL" || plan.severity === "HIGH" ? "danger" : "warning"} />
        <KpiCell title="Affected Nodes" value={String(plan.situationReport.affectedNodes)} />
        <KpiCell title="Blocked Routes" value={String(plan.situationReport.blockedRoutes)} />
      </section>

      <section className="grid gap-3 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)_minmax(280px,0.9fr)]">
        {/* Executive summary */}
        <Panel title="EXECUTIVE SUMMARY">
          <p className="text-xs leading-5 text-muted-foreground">{plan.executiveSummary.summary}</p>
          <div className="mt-3 rounded-md border border-primary/20 bg-primary/8 px-3 py-2">
            <p className="text-[0.65rem] font-bold uppercase text-primary">Key Recommendation</p>
            <p className="mt-1 text-xs font-medium text-foreground">{plan.executiveSummary.keyRecommendation}</p>
          </div>
          <div className="mt-2 rounded-md border border-success/20 bg-success/8 px-3 py-2">
            <p className="text-[0.65rem] font-bold uppercase text-success">Estimated Benefit</p>
            <p className="mt-1 text-xs text-foreground">{plan.executiveSummary.estimatedBenefit}</p>
          </div>
          <div className="mt-3 text-xs leading-5 text-muted-foreground">
            <span className="font-semibold text-foreground">Situation: </span>
            {plan.situationReport.event} — affecting{" "}
            {plan.situationReport.affectedRegions.join(", ")}.
            Estimated duration: {plan.situationReport.estimatedDuration}.
          </div>
          <PanelLink label="View Full Situation Report" />
        </Panel>

        {/* Active incidents */}
        <Panel title="ACTIVE INCIDENTS">
          <div className="divide-y divide-border/60">
            {plan.activeIncidents.map((inc) => (
              <article key={inc.id} className="py-2.5 first:pt-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{inc.title}</p>
                    <p className="text-xs text-muted-foreground">{inc.region}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{inc.summary}</p>
                  </div>
                  <span className={clsx("shrink-0 rounded border px-2 py-0.5 text-[0.62rem] font-bold", priorityClass[inc.severity])}>
                    {inc.severity}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Panel>

        {/* Response actions */}
        <Panel title="RESPONSE ACTIONS">
          <div className="divide-y divide-border/60">
            {plan.responseActions.map((action) => (
              <article key={action.id} className="grid grid-cols-[1fr_auto] items-center gap-2 py-2.5 first:pt-0">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.owner}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{action.expectedImpact}</p>
                </div>
                <span className={clsx("whitespace-nowrap text-xs font-semibold", statusClass[action.status])}>
                  {action.status}
                </span>
              </article>
            ))}
          </div>
        </Panel>
      </section>

      <section className="grid gap-3 xl:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.95fr)_minmax(280px,0.95fr)]">
        {/* Resource deployment */}
        <Panel title="RESOURCE DEPLOYMENT">
          <div className="space-y-2">
            {plan.resourceDeployment.map((r) => (
              <div key={r.resourceId} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 text-xs">
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{r.name}</p>
                  <p className="text-muted-foreground">{r.assignedRegion}</p>
                </div>
                <span className="font-semibold text-foreground">{r.quantity} {r.unit}</span>
                <span className={clsx("rounded border px-1.5 py-0.5 text-[0.6rem] font-bold", priorityClass[r.priority])}>
                  {r.priority}
                </span>
              </div>
            ))}
          </div>
          <PanelLink label="View All Resources" />
        </Panel>

        {/* Risk assessment */}
        <Panel title="RISK ASSESSMENT">
          <div className="space-y-3">
            {plan.riskAssessment.map((risk) => (
              <div key={risk.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-foreground">{risk.label}</span>
                  <span className="font-bold text-foreground">{risk.score}</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary">
                  <div
                    className={clsx("h-full rounded-full",
                      risk.level === "CRITICAL" ? "bg-danger" :
                      risk.level === "HIGH" ? "bg-warning" :
                      risk.level === "MEDIUM" ? "bg-info" : "bg-success")}
                    style={{ width: `${risk.score}%` }}
                  />
                </div>
                <p className="mt-0.5 text-[0.62rem] text-muted-foreground">{risk.summary}</p>
              </div>
            ))}
          </div>
          <PanelLink label="View Detailed Risk Report" />
        </Panel>

        {/* Approval status + checklist */}
        <Panel title="APPROVAL STATUS">
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">AI Parliament Consensus</span>
              <span className="font-bold text-foreground">{plan.approval.aiParliamentConsensus}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Executive Review</span>
              <span className={clsx("font-semibold",
                plan.approval.executiveReview === "APPROVED" ? "text-success" :
                plan.approval.executiveReview === "REJECTED" ? "text-danger" : "text-warning")}>
                {plan.approval.executiveReview}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Human Approval Required</span>
              <span className={plan.approval.humanApprovalRequired ? "font-semibold text-warning" : "font-semibold text-success"}>
                {plan.approval.humanApprovalRequired ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Response Status</span>
              <span className="font-semibold text-info">{plan.approval.responseStatus.replace(/_/g, " ")}</span>
            </div>
          </div>
          <div className="mt-3 rounded-md border border-border bg-background/60 p-2">
            <p className="mb-1.5 text-[0.65rem] font-bold uppercase text-muted-foreground">Checklist</p>
            <div className="space-y-1">
              {plan.checklist.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  {item.status === "READY" ? (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />
                  ) : (
                    <CircleDot className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  )}
                  <span className={item.status === "READY" ? "text-foreground" : "text-muted-foreground"}>
                    {item.label}
                  </span>
                  {item.required && <span className="ml-auto text-[0.58rem] font-bold text-danger">REQ</span>}
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </section>

      {/* Final recommendation */}
      <section className="surface-card rounded-md p-4">
        <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-widest text-muted-foreground">Final Recommendation</p>
        <p className="text-sm leading-6 text-foreground">{plan.finalRecommendation}</p>
        <p className="mt-2 text-[0.65rem] text-muted-foreground">
          Plan generated: {new Date(plan.generatedAt).toLocaleString()} · Plan ID: {plan.planId.slice(0, 16)}…
        </p>
      </section>
    </div>
  );
}

function KpiCell({ title, value, tone = "foreground" }: { title: string; value: string; tone?: string }) {
  const toneClass = tone === "primary" ? "text-primary" : tone === "danger" ? "text-danger" : tone === "warning" ? "text-warning" : "text-foreground";
  return (
    <div className="border-r border-border/70 p-4 last:border-r-0">
      <p className="text-[0.68rem] font-semibold uppercase text-muted-foreground">{title}</p>
      <p className={clsx("mt-2 text-xl font-bold capitalize", toneClass)}>{value}</p>
    </div>
  );
}
