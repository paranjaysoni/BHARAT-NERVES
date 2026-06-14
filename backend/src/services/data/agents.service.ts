import type { AIAgent } from "../../types/agent.types.js";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const agentsData = require("../../data/agents.json") as AIAgent[];

export function getAllAgents(): AIAgent[] {
  return agentsData;
}

export function getAgentById(id: string): AIAgent | null {
  return agentsData.find((a) => a.id === id) ?? null;
}

export function getAgentsByDomain(domain: AIAgent["domain"]): AIAgent[] {
  return agentsData.filter((a) => a.domain === domain);
}
