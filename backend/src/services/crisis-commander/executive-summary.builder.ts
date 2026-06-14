import type { AIParliamentSession } from "../../types/ai-parliament.types.js";
import type { ExecutiveSummary } from "../../types/crisis-commander.types.js";
import type { SimulationResult } from "../../types/simulation.types.js";

export function buildExecutiveSummary(
  simulation: SimulationResult,
  parliament: AIParliamentSession
): ExecutiveSummary {
  return {
    summary: `${simulation.scenario.scenarioName} creates ${simulation.impact.score.riskLevel.toLowerCase()} logistics and population risk. Immediate alternate routing and resource deployment are recommended.`,
    keyRecommendation: parliament.recommendation.summary,
    estimatedBenefit: `Projected loss reduction of ₹${simulation.impact.economic.savingsCr} Cr and protection of ${formatPeople(simulation.impact.population.protectedAfterRecovery)} people.`,
  };
}

export function buildFinalRecommendation(parliament: AIParliamentSession): string {
  return parliament.recommendation.title;
}

function formatPeople(value: number): string {
  if (value >= 1_000_000) return `${Number((value / 1_000_000).toFixed(2))}M`;
  if (value >= 1_000) return `${Number((value / 1_000).toFixed(1))}K`;
  return String(value);
}

