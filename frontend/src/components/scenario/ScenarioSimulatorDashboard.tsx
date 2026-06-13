"use client";

import { useMemo, useState } from "react";
import {
  Anchor,
  ArrowRight,
  Boxes,
  Flame,
  Gauge,
  Home,
  Pause,
  Play,
  RotateCcw,
  Ship,
  TrafficCone,
  Waves,
  Warehouse
} from "lucide-react";
import type { ReactNode } from "react";
import clsx from "clsx";
import { RiskPill, StatusBadge } from "@/components/shared";
import { nodes, routes, scenarioSimulationImpacts, scenarios } from "@/data";
import type { ScenarioSimulationImpact } from "@/data";
import type { Scenario, ScenarioSeverity } from "@/types";

type ScenarioOption = Scenario & {
  location: string;
  type: string;
  weather: string;
  confidence: number;
};

type NodePoint = {
  id: string;
  x: number;
  y: number;
  label?: string;
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

const nodePoints: NodePoint[] = [
  { id: "node-balasore-hub", x: 75, y: 22, label: "Balasore" },
  { id: "node-bhadrak-hub", x: 67, y: 34 },
  { id: "node-dhamra-port", x: 78, y: 36 },
  { id: "node-kendrapara-hub", x: 67, y: 47 },
  { id: "node-relief-alpha", x: 72, y: 48 },
  { id: "node-paradip-port", x: 78, y: 58, label: "Paradip Port" },
  { id: "node-jajpur-road-junction", x: 57, y: 41 },
  { id: "node-cuttack-warehouse", x: 58, y: 55, label: "Cuttack" },
  { id: "node-scb-medical-college", x: 62, y: 54 },
  { id: "node-bhubaneswar-warehouse", x: 51, y: 66 },
  { id: "node-aiims-bhubaneswar", x: 47, y: 69 },
  { id: "node-khurda-road-junction", x: 43, y: 71 },
  { id: "node-puri-hub", x: 59, y: 78, label: "Puri" },
  { id: "node-relief-bravo", x: 66, y: 80, label: "Jagatsinghpur" },
  { id: "node-talcher-power-station", x: 39, y: 43 },
  { id: "node-gopalpur-logistics-yard", x: 47, y: 89, label: "Gopalpur Port" }
];

const pointById = new Map(nodePoints.map((point) => [point.id, point]));

const impactedRouteIds: Record<string, string[]> = {
  "scenario-cyclone-landfall": [
    "route-paradip-kendrapara",
    "route-bhubaneswar-puri",
    "route-puri-relief-bravo",
    "route-dhamra-paradip",
    "route-gopalpur-puri"
  ],
  "scenario-highway-blockage": [
    "route-khurda-puri",
    "route-bhubaneswar-puri",
    "route-puri-relief-bravo"
  ],
  "scenario-port-shutdown": [
    "route-paradip-cuttack",
    "route-dhamra-paradip",
    "route-paradip-kendrapara"
  ],
  "scenario-warehouse-fire": [
    "route-cuttack-bhubaneswar",
    "route-cuttack-scb",
    "route-paradip-cuttack"
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
  const affectedRouteIds = new Set(impactedRouteIds[scenario.id] ?? []);
  const affectedNodeIds = new Set(scenario.affectedNodes);

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
      <div className="relative min-h-[380px] overflow-hidden bg-slate-950 xl:min-h-[420px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_58%,rgba(59,130,246,0.18),transparent_16rem),radial-gradient(circle_at_45%_43%,rgba(34,197,94,0.12),transparent_18rem),linear-gradient(135deg,rgba(2,6,23,0.96),rgba(8,47,73,0.78))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.07)_1px,transparent_1px)] bg-[size:36px_36px]" />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-label="Odisha simulation map">
          <path
            d="M20 64 L24 47 L34 32 L50 20 L70 20 L84 35 L88 52 L79 70 L62 83 L39 85 Z"
            className="fill-info/10 stroke-info/55"
            strokeWidth="0.7"
          />
          <text x="47" y="61" className="fill-white/25 text-[4px] font-semibold tracking-[0.18em]">
            ODISHA
          </text>
          {routes.map((route) => {
            const source = pointById.get(route.source);
            const destination = pointById.get(route.destination);
            if (!source || !destination) return null;
            const isAffected = affectedRouteIds.has(route.id);

            return (
              <line
                key={route.id}
                x1={source.x}
                y1={source.y}
                x2={destination.x}
                y2={destination.y}
                className={isAffected ? "stroke-danger" : route.status === "clear" ? "stroke-success" : "stroke-warning"}
                strokeWidth={isAffected ? 1.1 : 0.65}
                strokeDasharray={isAffected ? "3 2" : "2 2"}
                opacity={isAffected ? 0.95 : 0.75}
              />
            );
          })}
        </svg>

        <div className="absolute right-[7%] top-[28%] h-56 w-56 rounded-full border border-white/10 bg-[conic-gradient(from_30deg,rgba(148,163,184,0.08),rgba(255,255,255,0.35),rgba(30,64,175,0.20),rgba(148,163,184,0.05))] blur-[1px]" />
        <div className="absolute right-[9%] top-[34%] h-36 w-36 animate-pulse rounded-full border border-white/20 bg-white/10 blur-sm" />
        <div className="absolute right-[14%] top-[42%] h-10 w-10 rounded-full bg-slate-100/70 blur-md" />

        <div className="absolute left-5 top-5 flex flex-col gap-2 rounded-md border border-white/10 bg-slate-950/70 p-2 shadow-lg backdrop-blur">
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded border border-white/10 text-lg text-white/80">+</button>
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded border border-white/10 text-lg text-white/80">-</button>
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded border border-white/10 text-white/80">⊙</button>
        </div>

        {nodes.map((node) => {
          const point = pointById.get(node.id);
          if (!point) return null;
          const isAffected = affectedNodeIds.has(node.id);
          const Icon = iconForNode(node.type);

          return (
            <div
              key={node.id}
              className="absolute"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              {isAffected ? (
                <span className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-danger/30" />
              ) : null}
              <span
                className={clsx(
                  "relative flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 shadow-lg",
                  isAffected
                    ? "border-danger bg-danger text-white"
                    : node.status === "operational"
                      ? "border-success bg-success text-white"
                      : "border-warning bg-warning text-slate-950"
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              {point.label ? (
                <span className="absolute left-3 top-2 whitespace-nowrap rounded bg-slate-950/75 px-1.5 py-0.5 text-[0.65rem] font-medium text-white shadow-sm">
                  {point.label}
                </span>
              ) : null}
            </div>
          );
        })}

        <div className="absolute right-6 top-20 rounded-md border border-white/10 bg-slate-950/75 p-4 text-xs text-white/85 shadow-lg backdrop-blur">
          <div className="space-y-3">
            <LegendDot className="bg-success" label="Operational" />
            <LegendDot className="bg-warning" label="At Risk" />
            <LegendDot className="bg-danger" label="Disrupted" />
            <LegendDot className="bg-muted-foreground" label="Unknown" />
          </div>
          <div className="my-3 border-t border-white/10" />
          <div className="space-y-3">
            <LegendIcon icon={<Anchor className="h-4 w-4" />} label="Port" />
            <LegendIcon icon={<Warehouse className="h-4 w-4" />} label="Warehouse" />
            <LegendIcon icon={<Home className="h-4 w-4" />} label="Hospital" />
            <LegendIcon icon={<Boxes className="h-4 w-4" />} label="Relief Center" />
          </div>
        </div>
      </div>
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

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${className}`} />
      {label}
    </span>
  );
}

function LegendIcon({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="text-primary">{icon}</span>
      {label}
    </span>
  );
}

function iconForNode(type: string) {
  if (type === "port") return Anchor;
  if (type === "warehouse") return Warehouse;
  if (type === "hospital") return Home;
  if (type === "relief-center") return Boxes;
  return Home;
}

function recoveryWindowForScenario(scenarioId: string) {
  if (scenarioId === "scenario-cyclone-landfall") return "4-6 Days";
  if (scenarioId === "scenario-port-shutdown") return "3-5 Days";
  if (scenarioId === "scenario-highway-blockage") return "1-2 Days";
  return "2-3 Days";
}
