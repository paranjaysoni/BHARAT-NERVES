import type { AgentDomain } from "./agent.types.js";
import type { ScenarioSeverity } from "./scenario.types.js";

export type ParliamentSessionStatus = "COMPLETED";
export type AgentDeliberationStatus = "PREPARED";
export type ParliamentConsensusLevel =
  | "STRONG_CONSENSUS"
  | "GOOD_AGREEMENT"
  | "PARTIAL_ALIGNMENT"
  | "LOW_ALIGNMENT";
export type ParliamentConflictLevel = "LOW" | "MODERATE" | "HIGH";
export type ParliamentPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type InsightType = "AGREEMENT" | "DEBATE" | "RISK" | "ACTION";

export interface AIParliamentSessionRequest {
  scenarioId: string;
  simulationId?: string;
  includeFullMatrix?: boolean;
}

export interface AgentDeliberation {
  agentId: string;
  name: string;
  domain: AgentDomain;
  role: string;
  position: string;
  priority: string;
  recommendation: string;
  confidence: number;
  status: AgentDeliberationStatus;
  riskConcern: string;
  conflictLevel: ParliamentConflictLevel;
}

export interface ParliamentConsensus {
  score: number;
  level: ParliamentConsensusLevel;
  conflictLevel: ParliamentConflictLevel;
  humanReviewRequired: boolean;
}

export interface ParliamentPriorityAction {
  rank: number;
  label: string;
  score: number;
  priority: ParliamentPriority;
}

export interface ParliamentRecommendation {
  title: string;
  summary: string;
  priorityActions: ParliamentPriorityAction[];
  sendToCrisisCommander: boolean;
}

export interface ParliamentTimelineEvent {
  id: string;
  label: string;
  status: "COMPLETED";
  timestamp: string;
}

export interface ParliamentInsight {
  id: string;
  type: InsightType;
  title: string;
  detail: string;
}

export interface ParliamentMatrixRow {
  agent: string;
  priority: string;
  recommendation: string;
  confidence: number;
  conflictLevel: ParliamentConflictLevel;
  status: AgentDeliberationStatus;
}

export interface AIParliamentSession {
  sessionId: string;
  scenarioId: string;
  scenarioName: string;
  severity: ScenarioSeverity;
  status: ParliamentSessionStatus;
  currentQuestion: string;
  participants: number;
  consensus: ParliamentConsensus;
  agents: AgentDeliberation[];
  recommendation: ParliamentRecommendation;
  timeline: ParliamentTimelineEvent[];
  insights: ParliamentInsight[];
  matrix: ParliamentMatrixRow[];
  generatedAt: string;
}

export class AIParliamentValidationError extends Error {
  constructor(
    public readonly code:
      | "AI_PARLIAMENT_SCENARIO_NOT_FOUND"
      | "AI_PARLIAMENT_AGENTS_NOT_FOUND"
      | "INVALID_AI_PARLIAMENT_SIMULATION_ID",
    message: string,
    public readonly statusCode: number
  ) {
    super(message);
    this.name = "AIParliamentValidationError";
  }
}

