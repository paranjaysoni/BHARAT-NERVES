// ─── Request ─────────────────────────────────────────────────────────────────

export interface AIParliamentSessionRequest {
  scenarioId: string;
  simulationId?: string;
  includeFullMatrix?: boolean;
}

// ─── Response shapes (mirror backend) ────────────────────────────────────────

export type ParliamentConsensusLevel =
  | "STRONG_CONSENSUS"
  | "GOOD_AGREEMENT"
  | "PARTIAL_ALIGNMENT"
  | "LOW_ALIGNMENT";

export type ParliamentConflictLevel = "LOW" | "MODERATE" | "HIGH";
export type ParliamentPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type InsightType = "AGREEMENT" | "DEBATE" | "RISK" | "ACTION";

export interface ParliamentConsensus {
  score: number;
  level: ParliamentConsensusLevel;
  conflictLevel: ParliamentConflictLevel;
  humanReviewRequired: boolean;
}

export interface AgentDeliberation {
  agentId: string;
  name: string;
  domain: string;
  role: string;
  position: string;
  priority: string;
  recommendation: string;
  confidence: number;
  status: "PREPARED";
  riskConcern: string;
  conflictLevel: ParliamentConflictLevel;
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
  status: "PREPARED";
}

export interface AIParliamentSession {
  sessionId: string;
  scenarioId: string;
  scenarioName: string;
  severity: string;
  status: "COMPLETED";
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

// ─── UI state ────────────────────────────────────────────────────────────────

export type ParliamentUIState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "done"; session: AIParliamentSession }
  | { phase: "error"; message: string };
