"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Flame,
  Gauge,
  Pause,
  Play,
  RotateCcw,
  Ship,
  TrafficCone,
  Waves
} from "lucide-react";
import clsx from "clsx";
import { AegisMap } from "@/components/maps";
import { RiskPill, StatusBadge } from "@/components/shared";
import { scenarioSimulationImpacts, scenarios } from "@/data";
import type { ScenarioSimulationImpact } from "@/data";
import type { Scenario, ScenarioSeverity } from "@/types";

type ScenarioOption = Scenario & {
  location: string;
  type: string;
  weather: string;
  confidence: number;
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
  "scenario-highway-blockage": [
    "route_cuttack_balasore",
    "route_ndrf_balasore"
  ],
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
  "scenario-highway-blockage": [
    "balasore_district_hub",
    "cuttack_logistics_hub",
    "cuttack_rail_hub"
  ],
  "scenario-port-shutdown": [
    "paradip_port",
    "paradip_fuel_depot",
    "jagatsinghpur_district_hub",
    "cuttack_logistics_hub"
  ],
  "scenario-warehouse-fire": [
    "cuttack_logistics_hub",
    "cuttack_warehouse",
    "bhubaneswar_command"
  ]
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
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarios[0]?.id ?? "");
  const [mode, setMode] = useState<SimulationMode>("idle");
  const [speed, setSpeed] = useState("1x");

  const scenarioOptions = useMemo<ScenarioOption[]>(
    () =>
      scenarios
        .map((scenario) => ({ ...scenario, ...scenarioMeta[scenario.id] }))
        .concat(customScenario),
    []
  );

  const selectedScenario = useMemo(
    () =>
      scenarioOptions.find((scenario) => scenario.id === selectedScenarioId) ??
      scenarioOptions[0],
    [scenarioOptions, selectedScenarioId]
  );

  const selectedImpact = useMemo(
    () =>
      scenarioSimulationImpacts.find(
        (impact) => impact.scenarioId === selectedScenario.id
      ) ?? scenarioSimulationImpacts[0],
    [selectedScenario.id]
  );

  return (
    <div className="grid min-h-0 gap-4">
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(420px,0.75fr)]">
        <ScenarioSelectionRow
          scenarios={scenarioOptions}
          selectedScenarioId={selectedScenario.id}
          onSelectScenario={(scenarioId) => {
            if (scenarioId === "scenario-custom") return;
            setSelectedScenarioId(scenarioId);
            setMode("idle");
          }}
        />
        <SimulationOverview scenario={selectedScenario} impact={selectedImpact} />
      </section>

      <section className="grid min-h-0 gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="grid gap-4">
          <ScenarioDetailsPanel scenario={selectedScenario} />
          <ImpactSummaryPanel scenario={selectedScenario} impact={selectedImpact} />
        </aside>
        <ImpactPreviewMap scenario={selectedScenario} impact={selectedImpact} />
      </section>

      <section className="grid gap-4 pb-1 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <SimulationControlsPanel
          mode={mode}
          speed={speed}
          onPause={() => setMode("paused")}
          onReset={() => setMode("idle")}
          onRun={() => setMode("running")}
          onSpeedChange={setSpeed}
        />
        <ResultsPreviewPanel impact={selectedImpact} />
      </section>
    </div>
  );
}

function ScenarioSelectionRow({
  scenarios: scenarioOptions,
  selectedScenarioId,
  onSelectScenario
}: {
  scenarios: ScenarioOption[];
  selectedScenarioId: string;
  onSelectScenario: (scenarioId: string) => void;
}) {
  return (
    <section className="surface-card rounded-md p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
        Select Scenario
      </h2>
      <div className="mt-3 grid gap-2 lg:grid-cols-5">
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
              <span className="mt-3 block text-sm font-semibold text-foreground">
                {scenario.title}
              </span>
              <span className="mt-2 line-clamp-1 text-xs leading-5 text-muted-foreground">
                {isCustom ? "Configure Your Own" : scenario.description}
              </span>
              <span className="mt-2 block text-xs text-muted-foreground">
                {scenario.location}
              </span>
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

function SimulationOverview({
  scenario,
  impact
}: {
  scenario: ScenarioOption;
  impact: ScenarioSimulationImpact;
}) {
  const affectedRoutes = impactedRouteIds[scenario.id]?.length ?? 0;

  return (
    <section className="surface-card rounded-md p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
        Simulation Overview
      </h2>
      <div className="mt-3 grid grid-cols-3 overflow-hidden rounded-md border border-border bg-background/70 xl:grid-cols-6">
        <OverviewItem label="Selected Scenario" value={scenario.title} tone="primary" />
        <OverviewItem label="Predicted Impact" value={scenario.severity} tone="danger" />
        <OverviewItem label="Affected Nodes" value={String(scenario.affectedNodes.length || 23)} />
        <OverviewItem label="Affected Routes" value={String(affectedRoutes || 17)} />
        <OverviewItem label="Est. Economic Loss" value={impact.estimatedEconomicImpact} />
        <OverviewItem label="Est. Recovery Time" value={recoveryWindowForScenario(scenario.id)} />
      </div>
    </section>
  );
}

function ScenarioDetailsPanel({ scenario }: { scenario: ScenarioOption }) {
  return (
    <section className="surface-card rounded-md p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
        Scenario Details
      </h2>
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

function ImpactSummaryPanel({
  scenario,
  impact
}: {
  scenario: ScenarioOption;
  impact: ScenarioSimulationImpact;
}) {
  const summaryRows = [
    ["Ports Affected", scenario.id === "scenario-port-shutdown" ? "2" : "1"],
    ["Warehouses Affected", String(Math.max(2, scenario.affectedNodes.length + 2))],
    ["Hospitals at Risk", scenario.id === "scenario-cyclone-landfall" ? "3" : "1"],
    ["Relief Centers Impacted", scenario.id === "scenario-cyclone-landfall" ? "4" : "2"],
    ["Population Affected", impact.populationRisk],
    ["Supply Chain Disruption", scenario.severity === "critical" ? "High" : "Medium"],
    ["Economic Impact", impact.estimatedEconomicImpact]
  ];

  return (
    <section className="surface-card rounded-md p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
        Impact Summary
      </h2>
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
      <button className="btn btn-secondary mt-4 w-full" type="button">
        View Detailed Impact
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </section>
  );
}

function ImpactPreviewMap({
  scenario,
  impact
}: {
  scenario: ScenarioOption;
  impact: ScenarioSimulationImpact;
}) {
  const affectedRouteIds = impactedRouteIds[scenario.id] ?? [];
  const affectedNodeIds = impactedNodeIds[scenario.id] ?? [];

  return (
    <section className="surface-card overflow-hidden rounded-md">
      <div className="flex flex-col gap-2 border-b border-border p-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Impact Preview <span className="text-muted-foreground">({scenario.title})</span>
          </h2>
          <p className="type-caption mt-1">
            Visual-only digital twin preview for affected routes, nodes, and risk zones.
          </p>
        </div>
        <StatusBadge label={impact.expectedStressIncrease} variant="warning" />
      </div>
      <AegisMap
        title={`${scenario.title} Scenario Overlay`}
        description="Affected nodes and corridors are highlighted for preview only."
        affectedNodeIds={affectedNodeIds}
        affectedRouteIds={affectedRouteIds}
        heightClassName="min-h-[380px] xl:min-h-[420px]"
      />
    </section>
  );
}

function SimulationControlsPanel({
  mode,
  speed,
  onPause,
  onReset,
  onRun,
  onSpeedChange
}: {
  mode: SimulationMode;
  speed: string;
  onPause: () => void;
  onReset: () => void;
  onRun: () => void;
  onSpeedChange: (speed: string) => void;
}) {
  return (
    <section className="surface-card rounded-md p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
        Simulation Controls
      </h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr_160px] lg:items-end">
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
            <button type="button" onClick={mode === "running" ? onPause : onRun} className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              {mode === "running" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <div className="h-1.5 flex-1 rounded-full bg-secondary">
              <div className="h-full w-1/3 rounded-full bg-primary" />
            </div>
            <span className="text-xs text-muted-foreground">29 Nov 2024, 06:00 AM</span>
          </div>
        </div>
        <div className="grid gap-2">
          <button type="button" onClick={onRun} className="btn btn-primary">
            Run Simulation
          </button>
          <button type="button" onClick={onReset} className="btn btn-secondary">
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

function ResultsPreviewPanel({ impact }: { impact: ScenarioSimulationImpact }) {
  return (
    <section className="surface-card rounded-md p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
        Results Preview <span className="text-xs font-medium normal-case text-muted-foreground">(Estimated)</span>
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <ResultStat label="Economic Loss" value={impact.estimatedEconomicImpact} delta="-28% vs baseline" tone="danger" />
        <ResultStat label="Carbon Impact" value={impact.estimatedCarbonImpact} delta="+32% vs baseline" tone="success" />
        <ResultStat label="Recovery Time" value={recoveryWindowForScenario(impact.scenarioId)} delta="+2 days vs baseline" tone="warning" />
        <ResultStat label="Service Disruption" value={impact.resilienceDrop} delta="Resilience movement" tone="danger" />
      </div>
    </section>
  );
}

function DetailRow({
  label,
  risk,
  value
}: {
  label: string;
  risk?: "low" | "medium" | "high" | "critical";
  value: string;
}) {
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

function OverviewItem({
  label,
  tone = "foreground",
  value
}: {
  label: string;
  tone?: "danger" | "foreground" | "primary";
  value: string;
}) {
  const toneClass = tone === "danger" ? "text-danger" : tone === "primary" ? "text-primary" : "text-foreground";

  return (
    <div className="border-r border-border p-3 last:border-r-0">
      <p className="type-caption">{label}</p>
      <p className={clsx("mt-3 text-lg font-semibold capitalize", toneClass)}>{value}</p>
    </div>
  );
}

function ResultStat({
  delta,
  label,
  tone,
  value
}: {
  delta: string;
  label: string;
  tone: "danger" | "success" | "warning";
  value: string;
}) {
  const toneClass = {
    danger: "text-danger",
    success: "text-success",
    warning: "text-warning"
  }[tone];

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
