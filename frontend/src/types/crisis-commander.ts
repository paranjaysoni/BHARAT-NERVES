export type CrisisRiskLevel = "low" | "medium" | "high" | "critical";
export type CrisisActionStatus = "prepared" | "in-progress" | "pending" | "blocked";
export type ChecklistStatus = "complete" | "pending";

export interface CrisisKpi {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  status: "success" | "warning" | "danger" | "info" | "neutral";
}

export interface SituationOverview {
  scenario: string;
  currentStatus: string;
  affectedRegions: string[];
  affectedNodes: string[];
  expectedDuration: string;
}

export interface CommanderAction {
  id: string;
  priority: string;
  action: string;
  owner: string;
  resource: string;
  status: CrisisActionStatus;
  expectedImpact: string;
}

export interface ResourceDeployment {
  id: string;
  resource: string;
  availability: string;
  assignedStatus: string;
  deploymentRegion: string;
  riskLevel: CrisisRiskLevel;
}

export interface ExecutiveSummary {
  summary: string;
  keyRecommendation: string;
  estimatedBenefit: string;
}

export interface CrisisRiskItem {
  id: string;
  label: string;
  value: number;
  riskLevel: CrisisRiskLevel;
}

export interface ApprovalStatus {
  decisionPrepared: string;
  aiParliamentConsensus: string;
  executiveReview: string;
  humanApproval: string;
  responseStatus: string;
}

export interface CommandTimelineItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "success" | "warning" | "danger" | "info" | "neutral";
}

export interface ExpectedOutcome {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  status: "success" | "warning" | "danger" | "info" | "neutral";
}

export interface CommanderChecklistItem {
  id: string;
  label: string;
  status: ChecklistStatus;
}
