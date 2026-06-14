export type ParliamentConflictLevel = "low" | "moderate" | "high";
export type ParliamentReadiness = "low" | "medium" | "high";
export type ParliamentAgentStatus = "prepared" | "reviewing" | "aligned";

export interface ParliamentSession {
  currentScenario: string;
  sessionStatus: string;
  participatingAgents: number;
  primaryDecisionQuestion: string;
  expectedOutput: string;
  sessionId: string;
  startedAt: string;
  timeRemaining: string;
  objectives: string;
}

export interface AgentRecommendation {
  agentId: string;
  recommendation: string;
  position: string;
  confidence: number;
  conflictLevel: ParliamentConflictLevel;
  status: ParliamentAgentStatus;
}

export interface ParliamentConsensus {
  consensusScore: number;
  decisionReadiness: ParliamentReadiness;
  conflictLevel: ParliamentConflictLevel;
  humanReviewNeeded: boolean;
  agreePercent: number;
  partialPercent: number;
  disagreePercent: number;
  neutralPercent: number;
  topAgreedPriority: string;
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

export interface ImplementationPriority {
  label: string;
  level: "High" | "Medium" | "Low";
  value: number;
}

export interface FinalRecommendation {
  proposedDecision: string;
  priorityAction: string;
  reasoning: string;
  expectedBenefit: string;
  nextStep: string;
  href: string;
  implementationPriorities: ImplementationPriority[];
}

export interface KeyDiscussionInsight {
  id: string;
  text: string;
  type: "agree" | "debate" | "info";
}

export interface ParliamentMetric {
  id: string;
  label: string;
  value: string;
}
