"use client";

import { useMemo, useState } from "react";
import {
  scenarioSimulationImpacts,
  scenarios
} from "@/data";
import { EmptyState, SectionCard } from "@/components/shared";
import { ExpectedImpactSummary } from "@/components/scenario/ExpectedImpactSummary";
import { ImpactPreview } from "@/components/scenario/ImpactPreview";
import { ScenarioComparisonTable } from "@/components/scenario/ScenarioComparisonTable";
import { ScenarioGrid } from "@/components/scenario/ScenarioGrid";
import { ScenarioTimeline } from "@/components/scenario/ScenarioTimeline";
import {
  SimulationControls,
  type SimulationMode
} from "@/components/scenario/SimulationControls";
import { SelectedScenarioPanel } from "@/components/scenario/SelectedScenarioPanel";

export function ScenarioSimulatorDashboard() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarios[0]?.id ?? "");
  const [mode, setMode] = useState<SimulationMode>("idle");

  const selectedScenario = useMemo(
    () => scenarios.find((scenario) => scenario.id === selectedScenarioId) ?? scenarios[0],
    [selectedScenarioId]
  );

  const selectedImpact = useMemo(
    () =>
      scenarioSimulationImpacts.find(
        (impact) => impact.scenarioId === selectedScenario.id
      ) ?? scenarioSimulationImpacts[0],
    [selectedScenario.id]
  );

  if (!selectedScenario || !selectedImpact) {
    return (
      <EmptyState
        title="No scenarios available"
        description="Scenario mock data is required before the simulator preview can render."
      />
    );
  }

  return (
    <div className="app-page-stack">
      <section className="app-section-grid xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
        <div className="app-column-stack">
          <ScenarioGrid
            scenarios={scenarios}
            impacts={scenarioSimulationImpacts}
            selectedScenarioId={selectedScenarioId}
            onSelectScenario={(scenarioId) => {
              setSelectedScenarioId(scenarioId);
              setMode("idle");
            }}
          />
          <ImpactPreview scenario={selectedScenario} impact={selectedImpact} />
          <ScenarioTimeline />
        </div>

        <aside className="app-column-stack">
          <SelectedScenarioPanel
            scenario={selectedScenario}
            impact={selectedImpact}
          />
          <SimulationControls
            mode={mode}
            onActivate={() => setMode("activated")}
            onPreview={() => setMode("previewed")}
            onReset={() => setMode("idle")}
          />
          <ExpectedImpactSummary impact={selectedImpact} />
        </aside>
      </section>

      <ScenarioComparisonTable />

      <SectionCard
        title="Future Enhancements"
        description="This page is intentionally a frontend skeleton."
      >
        Future issues can connect this screen to a real simulation engine, map
        overlays, route analysis, AI Parliament handoff, and Crisis Commander
        activation. For now, all interactions are local UI state only.
      </SectionCard>
    </div>
  );
}
