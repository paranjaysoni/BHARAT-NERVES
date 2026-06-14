"use client";

import { Activity, RotateCcw, X } from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useSimulationStore } from "@/hooks/use-simulation-store";
import { resetSimulation } from "@/lib/simulation-store";

const RISK_CLASS: Record<string, string> = {
  CRITICAL: "text-danger",
  HIGH: "text-warning",
  MEDIUM: "text-info",
  LOW: "text-success",
};

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export function GlobalSimulationIndicator() {
  const store = useSimulationStore();
  const router = useRouter();

  if (store.phase === "idle") {
    return (
      <span className="hidden items-center gap-1.5 rounded-md border border-border/60 bg-secondary/50 px-2.5 py-1 text-[0.65rem] text-muted-foreground xl:flex">
        <Activity className="h-3 w-3 opacity-50" />
        No active simulation
      </span>
    );
  }

  if (store.phase === "running") {
    return (
      <span className="hidden animate-pulse items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-[0.65rem] text-primary xl:flex">
        <Activity className="h-3 w-3" />
        Simulation running…
      </span>
    );
  }

  if (store.phase === "error") {
    return (
      <div className="hidden items-center gap-2 rounded-md border border-danger/30 bg-danger/10 px-2.5 py-1 text-[0.65rem] xl:flex">
        <X className="h-3 w-3 text-danger" />
        <span className="text-danger">Simulation failed</span>
        <button
          onClick={() => resetSimulation()}
          className="ml-1 rounded border border-border px-1.5 py-0.5 text-[0.6rem] font-medium text-muted-foreground hover:bg-secondary"
        >
          Reset
        </button>
      </div>
    );
  }

  if (store.phase === "done" && store.result) {
    const { dashboard, scenario } = store.result;
    const riskClass = RISK_CLASS[dashboard.riskLevel] ?? "text-foreground";

    return (
      <div className="hidden items-center gap-2 rounded-md border border-success/25 bg-success/8 px-2.5 py-1 text-[0.65rem] xl:flex">
        <span className="flex items-center gap-1 font-semibold text-foreground">
          <Activity className="h-3 w-3 text-success" />
          {scenario.scenarioName}
        </span>
        <span className="text-border">|</span>
        <span>
          Risk:{" "}
          <span className={clsx("font-bold", riskClass)}>{dashboard.riskLevel}</span>
        </span>
        {store.lastUpdatedAt && (
          <>
            <span className="text-border">|</span>
            <span className="text-muted-foreground">
              Updated: {formatTime(store.lastUpdatedAt)}
            </span>
          </>
        )}
        <span className="text-border">|</span>
        <button
          onClick={() => router.push("/scenario-simulator")}
          className="rounded border border-border px-1.5 py-0.5 text-[0.6rem] font-medium text-primary hover:bg-secondary"
        >
          View
        </button>
        <button
          onClick={() => resetSimulation()}
          title="Reset simulation"
          className="flex h-5 w-5 items-center justify-center rounded border border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <RotateCcw className="h-2.5 w-2.5" />
        </button>
      </div>
    );
  }

  return null;
}
