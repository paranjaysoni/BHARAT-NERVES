export type ParliamentConflictLevel = "low" | "moderate" | "high";
export type ParliamentReadiness = "low" | "medium" | "high";
export type ParliamentAgentStatus = "prepared" | "reviewing" | "aligned";

export interface ParliamentSession {
  currentScenario: string;
  sessionStatus: string;
  participatingAgents: number;
  primaryDecisionQuestion: string;
  expectedOutput: string;
}

export interface AgentRecommendation {
  agentId: string;
  recommendation: string;
  confidence: number;
  conflictLevel: ParliamentConflictLevel;
  status: ParliamentAgentStatus;
}

export interface ParliamentConsensus {
  consensusScore: number;
  decisionReadiness: ParliamentReadiness;
  conflictLevel: ParliamentConflictLevel;
  humanReviewNeeded: boolean;
}

export interface StakeholderPriority {
  id: string;
  label: string;
  value: number;
}

export interface ParliamentTimelineItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "success" | "warning" | "danger" | "info" | "neutral";
}

export interface FinalRecommendation {
  priorityAction: string;
  reasoning: string;
  expectedBenefit: string;
  nextStep: string;
  href: string;
}
