"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import {
  AlertCircle,
  ArrowRight,
  Brain,
  Flame,
  Gauge,
  LayoutDashboard,
  Loader2,
  Play,
  Pause,
  RotateCcw,
  Ship,
  ShieldAlert,
  TrendingUp,
  TrafficCone,
  Waves
} from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { AegisMap } from "@/components/maps";
import { RiskPill, StatusBadge } from "@/components/shared";
import { scenarioSimulationImpacts, scenarios } from "@/data";
import type { ScenarioSimulationImpact } from "@/data";
import type { Scenario, ScenarioSeverity } from "@/types";
import { runSimulation } from "@/lib/api/simulation.api";
import { runParliamentSession } from "@/lib/api/ai-parliament.api";
import { runCrisisCommanderPlan } from "@/lib/api/crisis-commander.api";
import { safeNum } from "@/lib/api/client";
import {
  setSimulationRunning,
  setSimulationDone,
  setSimulationError,
  setParliamentSession,
  setCommanderPlan,
  setParliamentLoading,
  setCommanderLoading,
  resetSimulation,
  playSimulation,
  pauseSimulation,
  restartSimulationPlayback,
  setSimulationSpeed,
} from "@/lib/simulation-store";
import { useSimulationStore } from "@/hooks/use-simulation-store";
import type { SimulationResult } from "@/types/simulation.types";

// ── Frontend scenario ID → backend scenario ID ───────────────────────────────
const BACKEND_SCENARIO_ID: Record<string, string> = {
  "scenario-cyclone-landfall": "odisha_cyclone_corridor",
  "scenario-port-shutdown": "paradip_port_shutdown",
  "scenario-highway-blockage": "nh16_highway_blockage",
  "scenario-warehouse-fire": "warehouse_fire_cuttack",
};

type ScenarioOption = Scenario & {
  confidence: number;
  location: string;
  type: string;
  weather: string;
};

export type SimulationMode = "idle" | "running" | "paused";

const scenarioMeta: Record<string, Omit<ScenarioOption, keyof Scenario>> = {
  "scenario-cyclone-landfall": {
    confidence: 85,
    location: "Near Puri, Odisha",
    type: "Cyclone",
    weather: "120-150 km/h winds · 200-300 mm rain"
  },
  "scenario-port-shutdown": {
    confidence: 78,
    location: "Paradip Port",
    type: "Port disruption",
    weather: "Surge risk · berth safety hold"
  },
  "scenario-highway-blockage": {
    confidence: 72,
    location: "NH-16 coastal segment",
    type: "Route disruption",
    weather: "Flooded roadway · debris accumulation"
  },
  "scenario-warehouse-fire": {
    confidence: 81,
    location: "Cuttack District",
    type: "Infrastructure incident",
    weather: "Dry storage risk · smoke response"
  }
};

const customScenario = {
  affectedNodes: [],
  confidence: 0,
  description: "Configure your own multi-factor scenario.",
  id: "scenario-custom",
  impactSummary: "Custom scenario configuration is planned for a future simulation engine.",
  location: "Multi-factor",
  severity: "low",
  title: "Custom Scenario",
  type: "Custom",
  weather: "Operator-defined"
} satisfies ScenarioOption;

const impactedRouteIds: Record<string, string[]> = {
  "scenario-cyclone-landfall": [
    "route_paradip_bhubaneswar",
    "route_paradip_cuttack",
    "route_bhubaneswar_puri",
    "route_cuttack_kendrapara",
    "route_kendrapara_paradip",
    "route_fuel_depot_paradip",
    "route_shelters_puri",
    "route_shelters_kendrapara",
    "route_jagatsinghpur_paradip"
  ],
  "scenario-highway-blockage": ["route_cuttack_balasore", "route_ndrf_balasore"],
  "scenario-port-shutdown": [
    "route_paradip_bhubaneswar",
    "route_paradip_cuttack",
    "route_fuel_depot_paradip",
    "route_jagatsinghpur_paradip",
    "route_kendrapara_paradip"
  ],
  "scenario-warehouse-fire": [
    "route_bhubaneswar_cuttack",
    "route_cuttack_scb",
    "route_cuttack_balasore"
  ]
};

const impactedNodeIds: Record<string, string[]> = {
  "scenario-cyclone-landfall": [
    "paradip_port",
    "dhamra_port",
    "puri_district_hub",
    "kendrapara_district_hub",
    "jagatsinghpur_district_hub",
    "paradip_fuel_depot",
    "coastal_cyclone_shelters"
  ],
  "scenario-highway-blockage": ["balasore_district_hub", "cuttack_logistics_hub", "cuttack_rail_hub"],
  "scenario-port-shutdown": ["paradip_port", "paradip_fuel_depot", "jagatsinghpur_district_hub", "cuttack_logistics_hub"],
  "scenario-warehouse-fire": ["cuttack_logistics_hub", "cuttack_warehouse", "bhubaneswar_command"]
};

const iconByScenarioId = {
  "scenario-custom": Gauge,
  "scenario-cyclone-landfall": Waves,
  "scenario-highway-blockage": TrafficCone,
  "scenario-port-shutdown": Ship,
  "scenario-warehouse-fire": Flame
} as const;

const severityToRisk: Record<ScenarioSeverity, "low" | "medium" | "high" | "critical"> = {
  critical: "critical",
  high: "high",
  low: "low",
  moderate: "medium"
};

export function ScenarioSimulatorDashboard() {
  const store = useSimulationStore();
  const [selectedScenarioId, setSelectedScenarioId] = useState(
    store.activeScenarioId || scenarios[0]?.id || ""
  );

  // Sync if we navigate back and there's an active scenario
  useEffect(() => {
    if (store.activeScenarioId && store.activeScenarioId !== selectedScenarioId) {
      setSelectedScenarioId(store.activeScenarioId);
    }
  }, [store.activeScenarioId, selectedScenarioId]);

  const isRunningBackend = store.phase === "running";
  const isPlaying = store.playbackState === "playing";

  const scenarioOptions = useMemo<ScenarioOption[]>(
    () => scenarios.map((s) => ({ ...s, ...scenarioMeta[s.id] })).concat(customScenario),
    []
  );

  const selectedScenario = useMemo(
    () => scenarioOptions.find((s) => s.id === selectedScenarioId) ?? scenarioOptions[0]!,
    [scenarioOptions, selectedScenarioId]
  );

  const selectedImpact = useMemo(
    () =>
      scenarioSimulationImpacts.find((i) => i.scenarioId === selectedScenario.id) ??
      scenarioSimulationImpacts[0]!,
    [selectedScenario.id]
  );

  const handleRun = useCallback(async () => {
    const backendId = BACKEND_SCENARIO_ID[selectedScenarioId];
    if (!backendId) return;

    setSimulationRunning(selectedScenarioId);
    try {
      const result = await runSimulation({ scenarioId: backendId });
      setSimulationDone(result);

      // Auto-trigger parliament and commander in parallel after simulation completes
      const simId = result.simulationId;
      const scenId = result.scenario.scenarioId;

      setParliamentLoading(true);
      setCommanderLoading(true);

      Promise.all([
        runParliamentSession({ scenarioId: scenId, simulationId: simId, simulationResult: result, includeFullMatrix: true })
          .then((s) => setParliamentSession(s))
          .catch(() => setParliamentLoading(false)),
        runCrisisCommanderPlan({ scenarioId: scenId, simulationId: simId, simulationResult: result, includeChecklist: true })
          .then((p) => setCommanderPlan(p))
          .catch(() => setCommanderLoading(false)),
      ]);
    } catch (err) {
      setSimulationError(err instanceof Error ? err.message : "Simulation failed");
    }
  }, [selectedScenarioId]);

  const handleReset = useCallback(() => {
    resetSimulation();
  }, []);

  const handlePlayPause = useCallback(() => {
    if (store.phase === "done" && store.playbackState !== "completed") {
      if (isPlaying) pauseSimulation();
      else playSimulation();
    } else if (store.phase !== "running") {
      handleRun();
    }
  }, [store.phase, store.playbackState, isPlaying, handleRun]);

  const handleRestartPlayback = useCallback(() => {
    if (store.phase === "done") {
      restartSimulationPlayback();
    } else {
      resetSimulation();
    }
  }, [store.phase]);

  return (
    <div className="grid min-h-0 gap-4">
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        <ScenarioSelectionRow
          scenarios={scenarioOptions}
          selectedScenarioId={selectedScenario.id}
          onSelectScenario={(id) => {
            if (id === "scenario-custom") return;
            setSelectedScenarioId(id);
            resetSimulation();
          }}
        />
        <SimulationOverview scenario={selectedScenario} impact={selectedImpact} result={store.result} progress={store.playbackProgress} />
      </section>

      <section className="grid min-h-0 gap-4 xl:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        <aside className="grid gap-4">
          <ScenarioDetailsPanel scenario={selectedScenario} />
          <ImpactSummaryPanel scenario={selectedScenario} impact={selectedImpact} progress={store.playbackProgress} />
        </aside>
        <ImpactPreviewMap scenario={selectedScenario} impact={selectedImpact} progress={store.playbackProgress} />
      </section>

      <section className="grid gap-4 pb-1 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <SimulationControlsPanel
          isRunning={isRunningBackend}
          isPlaying={isPlaying}
          speed={String(store.playbackSpeed)}
          progress={store.playbackProgress}
          onReset={handleRestartPlayback}
          onPlayPause={handlePlayPause}
          onSpeedChange={(val) => setSimulationSpeed(Number(val.replace("x", "")))}
        />
        <ResultsPreviewPanel impact={selectedImpact} result={store.result} error={store.error} isRunning={isRunningBackend} playbackState={store.playbackState} />
      </section>
    </div>
  );
}

// ── Scenario selection ────────────────────────────────────────────────────────

function ScenarioSelectionRow({
  scenarios: scenarioOptions,
  selectedScenarioId,
  onSelectScenario
}: {
  scenarios: ScenarioOption[];
  selectedScenarioId: string;
  onSelectScenario: (id: string) => void;
}) {
  return (
    <section className="surface-card rounded-md p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Select Scenario</h2>
      <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {scenarioOptions.map((scenario) => {
          const Icon = iconByScenarioId[scenario.id as keyof typeof iconByScenarioId] ?? Gauge;
          const isSelected = selectedScenarioId === scenario.id;
          const isCustom = scenario.id === "scenario-custom";

          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => onSelectScenario(scenario.id)}
              className={clsx(
                "focus-ring group flex min-h-32 flex-col items-start rounded-md border bg-background/70 p-3 text-left transition-colors hover:border-border-strong hover:bg-secondary/40",
                isSelected && "border-primary bg-primary/10 shadow-[0_0_0_1px_hsl(var(--primary)/0.35)]"
              )}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="mt-3 block text-sm font-semibold text-foreground">{scenario.title}</span>
              <span className="mt-2 line-clamp-1 text-xs leading-5 text-muted-foreground">
                {isCustom ? "Configure Your Own" : scenario.description}
              </span>
              <span className="mt-2 block text-xs text-muted-foreground">{scenario.location}</span>
              <span className="mt-auto w-full rounded-md border border-border px-3 py-2 text-center text-xs font-semibold text-primary transition-colors group-hover:bg-secondary/50">
                {isCustom ? "Configure" : isSelected ? "Selected" : "Simulate"}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ── Overview ──────────────────────────────────────────────────────────────────

function SimulationOverview({
  scenario,
  impact,
  result,
  progress
}: {
  scenario: ScenarioOption;
  impact: ScenarioSimulationImpact;
  result: SimulationResult | null;
  progress: number;
}) {
  const affectedRoutes = impactedRouteIds[scenario.id]?.length ?? 0;
  
  // Interpolate numerical values based on progress (0 to 100)
  const p = progress / 100;

  const economicLoss = result
    ? `₹ ${(safeNum(result.impact.economic?.lossAfterRecoveryCr) * p).toFixed(1)} Cr`
    : impact.estimatedEconomicImpact;

  const recoveryTime = result
    ? (result.impact.delay?.recoveryTimeDays ?? result.dashboard.recoveryTime)
    : recoveryWindowForScenario(scenario.id);

  const affectedNodes = result
    ? String(Math.floor(result.digitalTwin.affectedNodeIds.length * p))
    : String(scenario.affectedNodes.length || 23);

  const affectedRoutesDisplay = result
    ? String(Math.floor(result.digitalTwin.affectedRouteIds.length * p))
    : String(affectedRoutes || 17);

  // Switch risk level at 70% progress
  const currentRiskLevel = result
    ? (progress > 70 ? result.impact.score?.riskLevel : "MEDIUM")
    : scenario.severity;

  return (
    <section className="surface-card rounded-md p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Simulation Overview</h2>
      <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-md border border-border bg-background/70 sm:grid-cols-3 xl:grid-cols-6">
        <OverviewItem label="Selected Scenario" value={scenario.title} tone="primary" />
        <OverviewItem label="Predicted Impact" value={currentRiskLevel ?? "MEDIUM"} tone="danger" />
        <OverviewItem label="Affected Nodes" value={affectedNodes} />
        <OverviewItem label="Affected Routes" value={affectedRoutesDisplay} />
        <OverviewItem label="Est. Economic Loss" value={economicLoss} />
        <OverviewItem label="Est. Recovery Time" value={recoveryTime} />
      </div>
    </section>
  );
}

// ── Scenario details ──────────────────────────────────────────────────────────

function ScenarioDetailsPanel({ scenario }: { scenario: ScenarioOption }) {
  return (
    <section className="surface-card rounded-md p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Scenario Details</h2>
      <div className="mt-4 space-y-3">
        <DetailRow label="Type" value={scenario.type} />
        <DetailRow label="Severity" value={scenario.severity} risk={severityToRisk[scenario.severity]} />
        <DetailRow label="Location" value={scenario.location} />
        <DetailRow label="Predicted Time" value="29 Nov 2024, 06:00 AM" />
        <DetailRow label="Weather" value={scenario.weather} />
        <div>
          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>Confidence Level</span>
            <span className="font-semibold text-foreground">{scenario.confidence}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-primary" style={{ width: `${scenario.confidence}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Impact summary ────────────────────────────────────────────────────────────

function ImpactSummaryPanel({ scenario, impact, progress }: { scenario: ScenarioOption; impact: ScenarioSimulationImpact; progress: number }) {
  const store = useSimulationStore();
  const result = store.result;
  const p = progress / 100;

  const summaryRows = result
    ? [
        ["Ports Affected", scenario.id === "scenario-port-shutdown" ? "2" : (progress > 20 ? "1" : "0")],
        ["Warehouses Affected", String(Math.floor(Math.max(2, scenario.affectedNodes.length + 2) * p))],
        ["Hospitals at Risk", scenario.id === "scenario-cyclone-landfall" ? (progress > 50 ? "3" : "1") : "1"],
        ["Relief Centers Impacted", scenario.id === "scenario-cyclone-landfall" ? (progress > 60 ? "4" : "1") : "2"],
        ["Population Affected", Math.floor(safeNum(result.impact.population?.affected ?? result.dashboard.populationAffected) * p).toLocaleString()],
        ["Supply Chain Disruption", progress > 70 && (result.dashboard.riskLevel === "CRITICAL" || result.dashboard.riskLevel === "HIGH") ? "High" : "Medium"],
        ["Economic Impact", `₹ ${(safeNum(result.impact.economic?.lossAfterRecoveryCr) * p).toFixed(1)} Cr`],
      ]
    : [
        ["Ports Affected", scenario.id === "scenario-port-shutdown" ? "2" : "1"],
        ["Warehouses Affected", String(Math.max(2, scenario.affectedNodes.length + 2))],
        ["Hospitals at Risk", scenario.id === "scenario-cyclone-landfall" ? "3" : "1"],
        ["Relief Centers Impacted", scenario.id === "scenario-cyclone-landfall" ? "4" : "2"],
        ["Population Affected", impact.populationRisk],
        ["Supply Chain Disruption", scenario.severity === "critical" ? "High" : "Medium"],
        ["Economic Impact", impact.estimatedEconomicImpact],
      ];

  return (
    <section className="surface-card rounded-md p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Impact Summary</h2>
      <div className="mt-4 space-y-2">
        {summaryRows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className={clsx("font-semibold", value === "High" ? "text-danger" : "text-foreground")}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Map ───────────────────────────────────────────────────────────────────────

function ImpactPreviewMap({ scenario, impact, progress }: { scenario: ScenarioOption; impact: ScenarioSimulationImpact; progress: number }) {
  const store = useSimulationStore();
  
  // Progressively reveal nodes and routes during playback
  const p = progress / 100;
  
  const allAffectedRouteIds = store.result
    ? store.result.digitalTwin.affectedRouteIds
    : (impactedRouteIds[scenario.id] ?? []);
  const allAffectedNodeIds = store.result
    ? store.result.digitalTwin.affectedNodeIds
    : (impactedNodeIds[scenario.id] ?? []);

  // Show subsets based on progress
  const affectedRouteIds = store.result && progress < 100 
    ? allAffectedRouteIds.slice(0, Math.max(1, Math.floor(allAffectedRouteIds.length * p)))
    : allAffectedRouteIds;
    
  const affectedNodeIds = store.result && progress < 100
    ? allAffectedNodeIds.slice(0, Math.max(1, Math.floor(allAffectedNodeIds.length * p)))
    : allAffectedNodeIds;

  return (
    <section className="surface-card overflow-hidden rounded-md">
      <div className="flex flex-col gap-2 border-b border-border p-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Impact Preview <span className="text-muted-foreground">({scenario.title})</span>
          </h2>
          <p className="type-caption mt-1">
            {store.phase === "done"
              ? progress === 100 
                ? "Live digital twin overlay from simulation result (Completed)."
                : `Live digital twin overlay progressing... (${progress}%)`
              : "Visual-only digital twin preview for affected routes, nodes, and risk zones."}
          </p>
        </div>
        <StatusBadge label={impact.expectedStressIncrease} variant="warning" />
      </div>
      <AegisMap
        title={`${scenario.title} Scenario Overlay`}
        description="Affected nodes and corridors are highlighted."
        affectedNodeIds={affectedNodeIds}
        affectedRouteIds={affectedRouteIds}
        stormPath={store.result?.scenario.stormPath}
        playbackProgress={progress}
        heightClassName="h-[300px] sm:h-[360px] xl:h-[420px]"
      />
    </section>
  );
}

// ── Simulation controls ───────────────────────────────────────────────────────

function SimulationControlsPanel({
  isRunning,
  isPlaying,
  speed,
  progress,
  onReset,
  onPlayPause,
  onSpeedChange
}: {
  isRunning: boolean;
  isPlaying: boolean;
  speed: string;
  progress: number;
  onReset: () => void;
  onPlayPause: () => void;
  onSpeedChange: (speed: string) => void;
}) {
  return (
    <section className="surface-card rounded-md p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Simulation Controls</h2>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr_160px] xl:items-end">
        <div>
          <p className="type-caption mb-2">Simulation Speed</p>
          <div className="grid grid-cols-4 overflow-hidden rounded-md border border-border">
            {["1x", "2x", "5x", "10x"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onSpeedChange(item)}
                className={clsx(
                  "px-3 py-2 text-sm font-medium transition-colors",
                  speed === item ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-secondary"
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="type-caption mb-2">Time Progression</p>
          <div className="flex items-center gap-3 rounded-md border border-border bg-background px-3 py-2">
            <button
              type="button"
              onClick={onPlayPause}
              disabled={isRunning}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground disabled:opacity-60"
            >
              {isRunning ? <Loader2 className="h-4 w-4 animate-spin" /> : isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <div className="h-1.5 flex-1 rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%`, transition: "width 0.1s linear" }} />
            </div>
            <span className="text-xs text-muted-foreground w-12 text-right">{progress}%</span>
          </div>
        </div>
        <div className="grid gap-2">
          <button
            type="button"
            onClick={onPlayPause}
            disabled={isRunning}
            className="btn btn-primary disabled:opacity-60"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Running…
              </>
            ) : isPlaying ? (
              "Pause Simulation"
            ) : progress > 0 && progress < 100 ? (
              "Resume Simulation"
            ) : (
              "Run Simulation"
            )}
          </button>
          <button type="button" onClick={onReset} disabled={isRunning} className="btn btn-secondary disabled:opacity-50">
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Results preview ───────────────────────────────────────────────────────────

function ResultsPreviewPanel({
  impact,
  result,
  error,
  isRunning,
  playbackState
}: {
  impact: ScenarioSimulationImpact;
  result: SimulationResult | null;
  error: string | null;
  isRunning: boolean;
  playbackState?: string;
}) {
  const router = useRouter();

  if (isRunning || (playbackState && playbackState !== "completed" && playbackState !== "idle")) {
    return (
      <section className="surface-card rounded-md p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
          Results Preview <span className="text-xs font-medium normal-case text-muted-foreground">(Live)</span>
        </h2>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 py-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Simulation Running…</p>
          <p className="text-xs text-muted-foreground">Processing scenario across the corridor network</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="surface-card rounded-md p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Results Preview</h2>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 py-6 text-center">
          <AlertCircle className="h-8 w-8 text-danger" />
          <p className="text-sm font-medium text-danger">Simulation Failed</p>
          <p className="max-w-xs text-xs text-muted-foreground">{error}</p>
          <p className="text-xs text-muted-foreground">Make sure the backend is running on port 4000, then retry.</p>
        </div>
      </section>
    );
  }

  if (result && playbackState === "completed") {
    return (
      <section className="surface-card rounded-md p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
          Results Preview <span className="text-xs font-medium normal-case text-success">✓ Completed</span>
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <ResultStat
            label="Economic Loss"
            value={`₹ ${safeNum(result.impact.economic?.lossAfterRecoveryCr).toFixed(1)} Cr`}
            delta={`${result.impact.score?.riskLevel ?? result.dashboard.riskLevel} risk level`}
            tone="danger"
          />
          <ResultStat
            label="Carbon Impact"
            value={`${safeNum(result.impact.carbon?.finalCarbonTons).toFixed(1)} t`}
            delta={`+${safeNum(result.dashboard.carbonImpactTons).toFixed(0)} tCO₂`}
            tone="success"
          />
          <ResultStat
            label="Recovery Time"
            value={result.impact.delay?.recoveryTimeDays ?? result.dashboard.recoveryTime}
            delta={result.dashboard.recoveryTime}
            tone="warning"
          />
          <ResultStat
            label="Resilience Score"
            value={String(safeNum(result.impact.resilience?.after ?? result.dashboard.resilienceScore))}
            delta={`Before: ${safeNum(result.impact.resilience?.before)}`}
            tone="danger"
          />
        </div>
        <div className="mt-4 rounded-md border border-border bg-background/60 p-3">
          <p className="text-xs font-medium text-muted-foreground">Simulation Summary</p>
          <p className="mt-1 text-xs leading-5 text-foreground">{result.summary}</p>
        </div>
        {result.recommendedNextSteps.length > 0 && (
          <div className="mt-3">
            <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Recommended Next Steps</p>
            <div className="space-y-1">
              {result.recommendedNextSteps.slice(0, 3).map((step, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <span className={clsx("mt-0.5 h-2 w-2 shrink-0 rounded-full", step.priority === "CRITICAL" ? "bg-danger" : "bg-warning")} />
                  <span className="text-foreground">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next-step navigation */}
        <div className="mt-4 border-t border-border pt-3">
          <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Explore Results</p>
          <div className="grid grid-cols-2 gap-2">
            <NextStepButton icon={LayoutDashboard} label="Control Room" onClick={() => router.push("/control-room")} />
            <NextStepButton icon={Brain} label="AI Parliament" onClick={() => router.push("/ai-parliament")} />
            <NextStepButton icon={ShieldAlert} label="Crisis Commander" onClick={() => router.push("/crisis-commander")} />
            <NextStepButton icon={TrendingUp} label="Impact Dashboard" onClick={() => router.push("/impact-dashboard")} />
          </div>
        </div>
      </section>
    );
  }

  // Idle / estimated
  return (
    <section className="surface-card rounded-md p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
        Results Preview <span className="text-xs font-medium normal-case text-muted-foreground">(Estimated)</span>
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <ResultStat label="Economic Loss" value={impact.estimatedEconomicImpact} delta="-28% vs baseline" tone="danger" />
        <ResultStat label="Carbon Impact" value={impact.estimatedCarbonImpact} delta="+32% vs baseline" tone="success" />
        <ResultStat label="Recovery Time" value={recoveryWindowForScenario(impact.scenarioId)} delta="+2 days vs baseline" tone="warning" />
        <ResultStat label="Service Disruption" value={impact.resilienceDrop} delta="Resilience movement" tone="danger" />
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Click <span className="font-semibold text-primary">Run Simulation</span> to get live results from the backend engine.
      </p>
    </section>
  );
}

function NextStepButton({
  icon: Icon,
  label,
  onClick
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between gap-2 rounded-md border border-border bg-background/60 px-3 py-2 text-xs font-medium text-foreground hover:border-primary/30 hover:bg-primary/8 hover:text-primary"
    >
      <span className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      <ArrowRight className="h-3 w-3 opacity-60" />
    </button>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function DetailRow({ label, risk, value }: { label: string; risk?: "low" | "medium" | "high" | "critical"; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      {risk ? (
        <RiskPill level={risk} label={value} />
      ) : (
        <span className="max-w-[170px] text-right text-sm font-medium text-foreground">{value}</span>
      )}
    </div>
  );
}

function OverviewItem({ label, tone = "foreground", value }: { label: string; tone?: "danger" | "foreground" | "primary"; value: string }) {
  const toneClass = tone === "danger" ? "text-danger" : tone === "primary" ? "text-primary" : "text-foreground";
  return (
    <div className="border-r border-border p-3 last:border-r-0">
      <p className="type-caption">{label}</p>
      <p className={clsx("mt-3 text-lg font-semibold capitalize", toneClass)}>{value}</p>
    </div>
  );
}

function ResultStat({ delta, label, tone, value }: { delta: string; label: string; tone: "danger" | "success" | "warning"; value: string }) {
  const toneClass = { danger: "text-danger", success: "text-success", warning: "text-warning" }[tone];
  return (
    <div className="border-r border-border last:border-r-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={clsx("mt-3 text-2xl font-semibold", toneClass)}>{value}</p>
      <p className="mt-2 text-xs text-muted-foreground">{delta}</p>
    </div>
  );
}

function recoveryWindowForScenario(scenarioId: string) {
  if (scenarioId === "scenario-cyclone-landfall") return "4-6 Days";
  if (scenarioId === "scenario-port-shutdown") return "3-5 Days";
  if (scenarioId === "scenario-highway-blockage") return "1-2 Days";
  return "2-3 Days";
}
