import type { RiskAssessmentItem } from "../../types/crisis-commander.types.js";
import type { ImpactRiskLevel } from "../../types/impact-engine.types.js";
import type { SimulationResult } from "../../types/simulation.types.js";

export function buildRiskAssessment(simulation: SimulationResult): RiskAssessmentItem[] {
  return [
    {
      label: "Logistics Risk",
      score: clamp(70 + simulation.scenario.blockedRoutes.length * 6),
      level: simulation.routeRecovery.recoveryStatus === "RECOVERED" ? "HIGH" : "CRITICAL",
      summary: "Blocked coastal corridors require immediate recovery routing.",
    },
    {
      label: "Medical Risk",
      score: simulation.impact.resources.medicalStress === "HIGH" ? 84 : 66,
      level: stressToRisk(simulation.impact.resources.medicalStress),
      summary: "Medical supply movement must remain protected across inland corridors.",
    },
    {
      label: "Trade Risk",
      score: simulation.impact.economic.lossAfterRecoveryCr > 500 ? 82 : 64,
      level: simulation.impact.economic.lossAfterRecoveryCr > 500 ? "HIGH" : "MEDIUM",
      summary: "Port and industrial cargo must be sequenced behind relief movement.",
    },
    {
      label: "Infrastructure Risk",
      score: simulation.impact.infrastructure.riskLevel === "CRITICAL" ? 88 : 74,
      level: simulation.impact.infrastructure.riskLevel,
      summary: "Critical node and route redundancy requires monitoring and rapid repair staging.",
    },
    {
      label: "Environmental Risk",
      score: simulation.impact.carbon.carbonIncreasePercent > 20 ? 76 : 58,
      level: simulation.impact.carbon.carbonIncreasePercent > 20 ? "HIGH" : "MEDIUM",
      summary: "Rerouting and storm impact require emissions and coastal exposure controls.",
    },
  ];
}

function stressToRisk(stress: string): ImpactRiskLevel {
  if (stress === "CRITICAL") return "CRITICAL";
  if (stress === "HIGH") return "HIGH";
  if (stress === "MEDIUM") return "MEDIUM";
  return "LOW";
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

