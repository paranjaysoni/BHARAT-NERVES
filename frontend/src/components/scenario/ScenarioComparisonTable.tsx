import { DataTable, SectionCard, StatusBadge } from "@/components/shared";
import type { DataTableColumn } from "@/components/shared";
import { scenarioSimulationImpacts, scenarios } from "@/data";
import type { Scenario } from "@/types";

const columns: DataTableColumn<Scenario>[] = [
  {
    key: "title",
    header: "Scenario",
    cell: (scenario) => (
      <span className="font-medium text-foreground">{scenario.title}</span>
    )
  },
  {
    key: "severity",
    header: "Severity",
    cell: (scenario) => (
      <StatusBadge
        label={scenario.severity}
        variant={scenario.severity === "critical" ? "danger" : "warning"}
        size="sm"
      />
    )
  },
  {
    key: "affectedNodes",
    header: "Affected Nodes",
    cell: (scenario) => String(scenario.affectedNodes.length)
  },
  {
    key: "delay",
    header: "Delay",
    cell: (scenario) =>
      scenarioSimulationImpacts.find((impact) => impact.scenarioId === scenario.id)
        ?.estimatedDelay ?? "TBD"
  },
  {
    key: "economicImpact",
    header: "Economic Impact",
    cell: (scenario) =>
      scenarioSimulationImpacts.find((impact) => impact.scenarioId === scenario.id)
        ?.estimatedEconomicImpact ?? "TBD"
  },
  {
    key: "recommendedResponse",
    header: "Recommended Response",
    cell: (scenario) =>
      scenarioSimulationImpacts.find((impact) => impact.scenarioId === scenario.id)
        ?.recommendedResponse ?? "TBD"
  }
];

export function ScenarioComparisonTable() {
  return (
    <SectionCard
      title="Scenario Comparison"
      description="Static comparison table for predefined mock scenarios."
    >
      <DataTable
        columns={columns}
        rows={scenarios}
        emptyMessage="No scenarios available."
      />
    </SectionCard>
  );
}
