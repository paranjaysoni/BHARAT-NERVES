import type {
  AgentDeliberation,
  ParliamentInsight,
  ParliamentMatrixRow,
  ParliamentRecommendation,
} from "../../types/ai-parliament.types.js";
import type { SimulationResult } from "../../types/simulation.types.js";

export function buildFinalRecommendation(simulation: SimulationResult): ParliamentRecommendation {
  const critical = simulation.scenario.severity === "CRITICAL";

  return {
    title: critical
      ? "Execute phased coastal logistics protection plan"
      : "Execute targeted logistics stabilization plan",
    summary: critical
      ? "Prioritize vulnerable districts, preserve medical supply movement, activate alternate inland routing, and delay low-priority industrial cargo."
      : "Stabilize affected routes, protect essential supplies, and monitor risk escalation.",
    priorityActions: [
      {
        rank: 1,
        label: "Evacuation & Safety",
        score: critical ? 94 : 86,
        priority: "HIGH",
      },
      {
        rank: 2,
        label: "Medical Supply Continuity",
        score: critical ? 91 : 84,
        priority: "HIGH",
      },
      {
        rank: 3,
        label: "Alternate Inland Routing",
        score: simulation.routeRecovery.recoveryStatus === "RECOVERED" ? 89 : 72,
        priority: simulation.routeRecovery.recoveryStatus === "RECOVERED" ? "HIGH" : "MEDIUM",
      },
      {
        rank: 4,
        label: "Trade Flow Protection",
        score: critical ? 82 : 78,
        priority: critical ? "HIGH" : "MEDIUM",
      },
    ],
    sendToCrisisCommander: simulation.scenario.severity === "CRITICAL" || simulation.scenario.severity === "HIGH",
  };
}

export function buildRecommendationMatrix(agents: AgentDeliberation[]): ParliamentMatrixRow[] {
  return agents.map((agent) => ({
    agent: agent.name,
    priority: agent.priority,
    recommendation: agent.recommendation,
    confidence: agent.confidence,
    conflictLevel: agent.conflictLevel,
    status: agent.status,
  }));
}

export function buildKeyInsights(simulation: SimulationResult): ParliamentInsight[] {
  return [
    {
      id: "insight-evacuation-priority",
      type: "AGREEMENT",
      title: "Strong agreement on evacuation priority",
      detail: "Agents align on prioritizing Puri, Kendrapara, Jagatsinghpur, and shelter-linked relief movement.",
    },
    {
      id: "insight-resource-debate",
      type: "DEBATE",
      title: "Debate on resource allocation",
      detail: "Infrastructure recovery and relief operations compete for logistics capacity during the first response window.",
    },
    {
      id: "insight-economic-safety",
      type: "RISK",
      title: "Port economics remain secondary to safety",
      detail: `${simulation.scenario.scenarioName} creates ₹${simulation.impact.economic.lossAfterRecoveryCr} Cr exposure after recovery assumptions.`,
    },
    {
      id: "insight-inland-routing",
      type: "ACTION",
      title: "Consensus on inland medical routing",
      detail: "The parliament supports alternate inland routing for medical supplies and command-linked relief movement.",
    },
  ];
}

