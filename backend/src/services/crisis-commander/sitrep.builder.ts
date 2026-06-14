import type { SimulationResult } from "../../types/simulation.types.js";
import type { ActiveIncident, SituationReport } from "../../types/crisis-commander.types.js";

export function buildSituationReport(simulation: SimulationResult): SituationReport {
  return {
    event: `${simulation.scenario.scenarioName} disruption across ${simulation.scenario.region}.`,
    affectedRegions: getAffectedRegions(simulation),
    affectedNodes: simulation.scenario.affectedNodes.length,
    affectedRoutes: simulation.scenario.affectedRoutes.length,
    blockedRoutes: simulation.scenario.blockedRoutes.length,
    estimatedDuration: simulation.impact.delay.recoveryTimeDays,
  };
}

export function buildActiveIncidents(simulation: SimulationResult): ActiveIncident[] {
  const regions = getAffectedRegions(simulation);

  return [
    {
      id: "incident_blocked_routes",
      title: "Blocked coastal logistics corridors",
      severity: "CRITICAL",
      region: regions.slice(0, 2).join(" / ") || simulation.scenario.region,
      status: "READY",
      summary: `${simulation.scenario.blockedRoutes.length} blocked routes require immediate route recovery monitoring.`,
    },
    {
      id: "incident_population_risk",
      title: "Population and shelter exposure",
      severity: simulation.impact.population.riskLevel === "HIGH" ? "HIGH" : "MEDIUM",
      region: regions.join(", ") || simulation.scenario.region,
      status: "READY",
      summary: `${simulation.impact.population.affected.toLocaleString("en-IN")} people remain in the affected population envelope.`,
    },
    {
      id: "incident_medical_supply",
      title: "Medical supply continuity risk",
      severity: "HIGH",
      region: "Bhubaneswar / Cuttack medical corridor",
      status: "READY",
      summary: "Medical movement must remain prioritized across inland recovery routes.",
    },
  ];
}

function getAffectedRegions(simulation: SimulationResult): string[] {
  return Array.from(
    new Set(
      simulation.scenario.affectedNodes
        .map((node) => node.district)
        .filter(Boolean)
    )
  );
}

