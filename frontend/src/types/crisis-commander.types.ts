// ─── Request ─────────────────────────────────────────────────────────────────

export interface CrisisCommanderPlanRequest {
  scenarioId: string;
  simulationId?: string;
  includeChecklist?: boolean;
}

// ─── Response shapes (mirror backend) ────────────────────────────────────────

export type CommanderPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type CommanderItemStatus = "READY" | "ASSIGNED" | "PENDING";
export type ExecutiveReviewStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface SituationReport {
  event: string;
  affectedRegions: string[];
  affectedNodes: number;
  affectedRoutes: number;
  blockedRoutes: number;
  estimatedDuration: string;
}

export interface ExecutiveSummary {
  summary: string;
  keyRecommendation: string;
  estimatedBenefit: string;
}

export interface ActiveIncident {
  id: string;
  title: string;
  severity: CommanderPriority;
  region: string;
  status: CommanderItemStatus;
  summary: string;
}

export interface ResponseAction {
  id: string;
  title: string;
  priority: CommanderPriority;
  owner: string;
  status: CommanderItemStatus;
  expectedImpact: string;
}

export interface ResourceDeploymentItem {
  resourceId: string;
  name: string;
  quantity: number;
  unit: string;
  assignedRegion: string;
  status: "ASSIGNED";
  priority: CommanderPriority;
}

export interface RiskAssessmentItem {
  label: string;
  score: number;
  level: string;
  summary: string;
}

export interface ExpectedOutcome {
  label: string;
  value: string;
  description: string;
}

export interface CommanderChecklistItem {
  label: string;
  status: CommanderItemStatus;
  required: boolean;
}

export interface ApprovalStatus {
  aiParliamentConsensus: number;
  executiveReview: ExecutiveReviewStatus;
  humanApprovalRequired: boolean;
  responseStatus: "READY_FOR_EXECUTION";
}

export interface CrisisCommanderPlan {
  planId: string;
  scenarioId: string;
  scenarioName: string;
  status: "READY_FOR_REVIEW";
  severity: string;
  situationReport: SituationReport;
  executiveSummary: ExecutiveSummary;
  activeIncidents: ActiveIncident[];
  responseActions: ResponseAction[];
  resourceDeployment: ResourceDeploymentItem[];
  riskAssessment: RiskAssessmentItem[];
  expectedOutcomes: ExpectedOutcome[];
  checklist: CommanderChecklistItem[];
  approval: ApprovalStatus;
  finalRecommendation: string;
  generatedAt: string;
}

// ─── UI state ────────────────────────────────────────────────────────────────

export type CommanderUIState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "done"; plan: CrisisCommanderPlan }
  | { phase: "error"; message: string };
