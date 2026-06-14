import type { ExpectedOutcome } from "../../types/crisis-commander.types.js";
import type { SimulationResult } from "../../types/simulation.types.js";

export function buildExpectedOutcomes(simulation: SimulationResult): ExpectedOutcome[] {
  return [
    {
      label: "Economic Loss Reduced",
      value: `₹${simulation.impact.economic.savingsCr} Cr`,
      description: "Projected avoided loss through alternate routing and prioritization.",
    },
    {
      label: "Population Protected",
      value: formatPeople(simulation.impact.population.protectedAfterRecovery),
      description: "People protected after recovery routing and resource prioritization.",
    },
    {
      label: "Medical Supply Continuity Improved",
      value: simulation.impact.resources.medicalStress,
      description: "Medical routes and supplies are prioritized for continuity.",
    },
    {
      label: "Recovery Time Reduced",
      value: simulation.impact.delay.recoveryTimeDays,
      description: "Recovery window after route and resource stabilization.",
    },
    {
      label: "Carbon Impact Controlled",
      value: `${simulation.impact.carbon.finalCarbonTons} tons`,
      description: "Estimated final carbon impact after route recovery assumptions.",
    },
  ];
}

function formatPeople(value: number): string {
  if (value >= 1_000_000) return `${Number((value / 1_000_000).toFixed(2))}M`;
  if (value >= 1_000) return `${Number((value / 1_000).toFixed(1))}K`;
  return String(value);
}

