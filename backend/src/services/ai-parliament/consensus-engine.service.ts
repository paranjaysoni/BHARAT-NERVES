import type {
  AgentDeliberation,
  ParliamentConsensus,
  ParliamentConflictLevel,
} from "../../types/ai-parliament.types.js";
import type { ScenarioSeverity } from "../../types/scenario.types.js";

export function calculateConsensus(
  agents: AgentDeliberation[],
  severity: ScenarioSeverity
): ParliamentConsensus {
  const averageConfidence =
    agents.reduce((total, agent) => total + agent.confidence, 0) / agents.length;
  const conflictLevel = getConflictLevel(agents, severity);
  const conflictPenalty = conflictLevel === "HIGH" ? 18 : conflictLevel === "MODERATE" ? 10 : 3;
  const severityAdjustment = severity === "CRITICAL" ? -4 : severity === "HIGH" ? 0 : 5;
  const score = clamp(Math.round(averageConfidence + severityAdjustment - conflictPenalty));

  return {
    score,
    level: getConsensusLevel(score),
    conflictLevel,
    humanReviewRequired: severity === "CRITICAL" || severity === "HIGH",
  };
}

function getConflictLevel(
  agents: AgentDeliberation[],
  severity: ScenarioSeverity
): ParliamentConflictLevel {
  const moderateConflicts = agents.filter((agent) => agent.conflictLevel === "MODERATE").length;
  const highConflicts = agents.filter((agent) => agent.conflictLevel === "HIGH").length;

  if (highConflicts > 0 || (severity === "CRITICAL" && moderateConflicts >= 5)) return "HIGH";
  if (moderateConflicts > 0 || severity === "CRITICAL") return "MODERATE";
  return "LOW";
}

function getConsensusLevel(score: number): ParliamentConsensus["level"] {
  if (score >= 88) return "STRONG_CONSENSUS";
  if (score >= 72) return "GOOD_AGREEMENT";
  if (score >= 58) return "PARTIAL_ALIGNMENT";
  return "LOW_ALIGNMENT";
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

