import type { AIAgent, AgentDomain } from "../../types/agent.types.js";
import type {
  AgentDeliberation,
  ParliamentConflictLevel,
} from "../../types/ai-parliament.types.js";
import type { SimulationResult } from "../../types/simulation.types.js";

const cyclonePositions: Record<AgentDomain, Pick<AgentDeliberation, "position" | "priority" | "recommendation" | "riskConcern">> = {
  ECONOMIC: {
    position: "Secure critical trade routes and reduce port-related losses.",
    priority: "Protect trade continuity",
    recommendation: "Delay low-priority industrial cargo while preserving essential port and fuel movement.",
    riskConcern: "Paradip port throughput loss and cascading freight delays",
  },
  ENVIRONMENT: {
    position: "Protect wetlands, reduce high-emission rerouting where possible.",
    priority: "Limit environmental damage",
    recommendation: "Avoid unnecessary coastal rerouting and monitor storm surge-sensitive wetland areas.",
    riskConcern: "Storm surge, emissions from rerouting, and coastal ecosystem stress",
  },
  HUMANITARIAN: {
    position: "Maximize shelter readiness and medical aid movement.",
    priority: "Protect vulnerable populations",
    recommendation: "Prioritize shelters, AIIMS supply continuity, and district-level medical dispatch.",
    riskConcern: "Medical supply interruption and shelter overload",
  },
  INFRASTRUCTURE: {
    position: "Prioritize coastal evacuation and protect critical route redundancy.",
    priority: "Protect critical nodes",
    recommendation: "Restore inland road redundancy and protect Paradip-Cuttack logistics continuity.",
    riskConcern: "NH-16 and Paradip corridor exposure",
  },
  LOGISTICS: {
    position: "Keep ports and corridors active using alternate inland routes.",
    priority: "Maintain route continuity",
    recommendation: "Shift critical movement through Cuttack and Bhubaneswar inland connectors.",
    riskConcern: "Blocked coastal links and route saturation",
  },
  POLICY: {
    position: "Enforce disaster protocol and coordinate inter-agency approvals.",
    priority: "Coordinate governance response",
    recommendation: "Activate state disaster protocols and synchronize district approvals.",
    riskConcern: "Slow inter-agency authorization during fast-moving disruption",
  },
  RISK: {
    position: "Flag cascading risks around Paradip, Puri, Kendrapara and NH-16.",
    priority: "Reduce cascade failure",
    recommendation: "Continuously reassess cascading failures around blocked evacuation and fuel links.",
    riskConcern: "Compound failures across port, fuel, shelter, and road systems",
  },
  TECHNOLOGY: {
    position: "Deploy drones, sensors, and live route monitoring.",
    priority: "Improve live visibility",
    recommendation: "Deploy drone reconnaissance and live route telemetry for blocked corridors.",
    riskConcern: "Loss of situational awareness in coastal corridors",
  },
};

export function buildAgentDeliberations(
  agents: AIAgent[],
  simulation: SimulationResult
): AgentDeliberation[] {
  return agents.map((agent) => {
    const rule = getRuleForAgent(agent, simulation);
    const conflictLevel = getAgentConflictLevel(agent.domain, simulation);

    return {
      agentId: agent.id,
      name: agent.name,
      domain: agent.domain,
      role: agent.role,
      position: rule.position,
      priority: rule.priority,
      recommendation: rule.recommendation,
      confidence: getConfidence(agent.decisionWeight, simulation.impact.score.impactScore, conflictLevel),
      status: "PREPARED",
      riskConcern: rule.riskConcern,
      conflictLevel,
    };
  });
}

function getRuleForAgent(
  agent: AIAgent,
  simulation: SimulationResult
): Pick<AgentDeliberation, "position" | "priority" | "recommendation" | "riskConcern"> {
  if (simulation.scenario.category === "CYCLONE") return cyclonePositions[agent.domain];

  return {
    position: `Prioritize ${agent.priority.toLowerCase()} for ${simulation.scenario.scenarioName}.`,
    priority: agent.priority,
    recommendation: `${agent.name} recommends applying ${agent.specializations[0] ?? "domain expertise"} to reduce ${simulation.impact.score.riskLevel.toLowerCase()} risk.`,
    riskConcern: `${simulation.scenario.category.toLowerCase().replace(/_/g, " ")} impact across affected nodes and routes`,
  };
}

function getAgentConflictLevel(
  domain: AgentDomain,
  simulation: SimulationResult
): ParliamentConflictLevel {
  if (
    simulation.scenario.severity === "CRITICAL" &&
    (domain === "ECONOMIC" || domain === "ENVIRONMENT" || domain === "LOGISTICS")
  ) {
    return "MODERATE";
  }
  if (simulation.scenario.severity === "CRITICAL") return "LOW";
  if (simulation.scenario.severity === "HIGH" && domain === "ECONOMIC") return "MODERATE";
  return "LOW";
}

function getConfidence(
  decisionWeight: number,
  impactScore: number,
  conflictLevel: ParliamentConflictLevel
): number {
  const conflictPenalty = conflictLevel === "HIGH" ? 10 : conflictLevel === "MODERATE" ? 5 : 0;
  const confidence = 70 + decisionWeight * 18 + impactScore * 0.08 - conflictPenalty;
  return Math.max(60, Math.min(96, Math.round(confidence)));
}

