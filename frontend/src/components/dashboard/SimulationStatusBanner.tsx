"use client";

import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import clsx from "clsx";
import { useSimulationStore } from "@/hooks/use-simulation-store";

/**
 * Thin banner shown at the top of Control Room and Impact Dashboard when a
 * simulation is running or has completed. Gives users context that the data
 * below is live from the backend.
 */
export function SimulationStatusBanner() {
  const store = useSimulationStore();

  if (store.phase === "idle") return null;

  if (store.phase === "running") {
    return (
      <div className="flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-xs text-primary">
        <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />
        <span>Simulation running — dashboard will update when complete</span>
      </div>
    );
  }

  if (store.phase === "error") {
    return (
      <div className="flex items-center gap-2 rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
        <span>Simulation error: {store.error}</span>
      </div>
    );
  }

  if (store.phase === "done" && store.result) {
    const { dashboard, scenario } = store.result;
    return (
      <div className="flex flex-wrap items-center gap-3 rounded-md border border-success/30 bg-success/10 px-3 py-2 text-xs">
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />
        <span className="font-semibold text-foreground">
          Live simulation active: {scenario.scenarioName}
        </span>
        <span className="text-muted-foreground">|</span>
        <span className="text-muted-foreground">
          Risk: <span className={clsx("font-semibold",
            dashboard.riskLevel === "CRITICAL" ? "text-danger" :
            dashboard.riskLevel === "HIGH" ? "text-warning" :
            dashboard.riskLevel === "MEDIUM" ? "text-info" : "text-success")}>
            {dashboard.riskLevel}
          </span>
        </span>
        <span className="text-muted-foreground">|</span>
        <span className="text-muted-foreground">
          Resilience: <span className="font-semibold text-foreground">{dashboard.resilienceScore}</span>
        </span>
        <span className="text-muted-foreground">|</span>
        <span className="text-muted-foreground">
          Active alerts: <span className="font-semibold text-foreground">{dashboard.activeAlerts}</span>
        </span>
        <span className="text-muted-foreground">|</span>
        <span className="text-muted-foreground">
          Recovery: <span className="font-semibold text-foreground">{dashboard.recoveryTime}</span>
        </span>
      </div>
    );
  }

  return null;
}
