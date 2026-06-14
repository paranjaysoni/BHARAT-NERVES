import type { ImpactRiskLevel } from "./impact-engine.types.js";
import type { ScenarioSeverity } from "./scenario.types.js";

export type CrisisPlanStatus = "READY_FOR_REVIEW";
export type CommanderPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type CommanderItemStatus = "READY" | "ASSIGNED" | "PENDING";
export type ExecutiveReviewStatus = "PENDING" | "APPROVED" | "REJECTED";
export type CommanderResponseStatus = "READY_FOR_EXECUTION";

export interface CrisisCommanderPlanRequest {
  scenarioId: string;
  simulationId?: string;
  includeChecklist?: boolean;
}

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
  level: ImpactRiskLevel;
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
  responseStatus: CommanderResponseStatus;
}

export interface CrisisCommanderPlan {
  planId: string;
  scenarioId: string;
  scenarioName: string;
  status: CrisisPlanStatus;
  severity: ScenarioSeverity;
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

export class CrisisCommanderValidationError extends Error {
  constructor(
    public readonly code:
      | "CRISIS_SCENARIO_NOT_FOUND"
      | "INVALID_CHECKLIST_FLAG",
    message: string,
    public readonly statusCode: number
  ) {
    super(message);
    this.name = "CrisisCommanderValidationError";
  }
}

