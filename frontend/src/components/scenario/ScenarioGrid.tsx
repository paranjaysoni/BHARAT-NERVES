import { Flame, Ship, TrafficCone, Waves } from "lucide-react";
import { ScenarioCard } from "@/components/shared";
import type { ScenarioSimulationImpact } from "@/data";
import type { Scenario } from "@/types";

export interface ScenarioGridProps {
  scenarios: Scenario[];
  impacts: ScenarioSimulationImpact[];
  selectedScenarioId: string;
  onSelectScenario: (scenarioId: string) => void;
}

const iconByScenarioId = {
  "scenario-cyclone-landfall": <Waves className="h-4 w-4" aria-hidden="true" />,
  "scenario-port-shutdown": <Ship className="h-4 w-4" aria-hidden="true" />,
  "scenario-highway-blockage": (
    <TrafficCone className="h-4 w-4" aria-hidden="true" />
  ),
  "scenario-warehouse-fire": <Flame className="h-4 w-4" aria-hidden="true" />
} as const;

export function ScenarioGrid({
  scenarios,
  impacts,
  selectedScenarioId,
  onSelectScenario
}: ScenarioGridProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {scenarios.map((scenario) => {
        const impact = impacts.find((item) => item.scenarioId === scenario.id);

        return (
          <ScenarioCard
            key={scenario.id}
            title={scenario.title}
            description={`${scenario.description} Affected nodes: ${scenario.affectedNodes.length}. Estimated impact: ${impact?.estimatedEconomicImpact ?? "TBD"}.`}
            severity={scenario.severity}
            status={impact?.status ?? "Ready"}
            icon={iconByScenarioId[scenario.id as keyof typeof iconByScenarioId]}
            actionLabel={
              selectedScenarioId === scenario.id ? "Selected" : "Select Scenario"
            }
            isSelected={selectedScenarioId === scenario.id}
            onSelect={() => onSelectScenario(scenario.id)}
          />
        );
      })}
    </section>
  );
}
