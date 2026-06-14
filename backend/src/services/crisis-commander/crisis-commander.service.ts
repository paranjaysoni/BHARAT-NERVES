import { createAIParliamentSession } from "../ai-parliament/ai-parliament.service.js";
import { runUnifiedSimulation } from "../simulation/simulation.service.js";
import type {
  CrisisCommanderPlan,
  CrisisCommanderPlanRequest,
} from "../../types/crisis-commander.types.js";
import { CrisisCommanderValidationError } from "../../types/crisis-commander.types.js";
import { AIParliamentValidationError } from "../../types/ai-parliament.types.js";
import { SimulationValidationError } from "../../types/simulation.types.js";
import { buildCommanderChecklist } from "./commander-checklist.builder.js";
import {
  buildExecutiveSummary,
  buildFinalRecommendation,
} from "./executive-summary.builder.js";
import { buildExpectedOutcomes } from "./expected-outcomes.builder.js";
import { buildResourceDeployment } from "./resource-deployment.builder.js";
import { buildResponseActions } from "./response-actions.builder.js";
import { buildRiskAssessment } from "./risk-assessment.builder.js";
import { buildActiveIncidents, buildSituationReport } from "./sitrep.builder.js";

export function createCrisisCommanderPlan(
  request: CrisisCommanderPlanRequest
): CrisisCommanderPlan {
  validateRequest(request);

  try {
    const simulation = runUnifiedSimulation({ scenarioId: request.scenarioId });
    const parliament = createAIParliamentSession({
      scenarioId: request.scenarioId,
      simulationId: request.simulationId,
      includeFullMatrix: false,
    });
    const includeChecklist = request.includeChecklist ?? true;

    return {
      planId: `cmd_${Date.now()}`,
      scenarioId: simulation.scenario.scenarioId,
      scenarioName: simulation.scenario.scenarioName,
      status: "READY_FOR_REVIEW",
      severity: simulation.scenario.severity,
      situationReport: buildSituationReport(simulation),
      executiveSummary: buildExecutiveSummary(simulation, parliament),
      activeIncidents: buildActiveIncidents(simulation),
      responseActions: buildResponseActions(simulation),
      resourceDeployment: buildResourceDeployment(simulation),
      riskAssessment: buildRiskAssessment(simulation),
      expectedOutcomes: buildExpectedOutcomes(simulation),
      checklist: buildCommanderChecklist(includeChecklist),
      approval: {
        aiParliamentConsensus: parliament.consensus.score,
        executiveReview: "PENDING",
        humanApprovalRequired: parliament.consensus.humanReviewRequired,
        responseStatus: "READY_FOR_EXECUTION",
      },
      finalRecommendation: buildFinalRecommendation(parliament),
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    if (
      error instanceof SimulationValidationError ||
      error instanceof AIParliamentValidationError
    ) {
      throw new CrisisCommanderValidationError(
        "CRISIS_SCENARIO_NOT_FOUND",
        "Crisis scenario not found",
        404
      );
    }

    throw error;
  }
}

function validateRequest(request: CrisisCommanderPlanRequest): void {
  if (
    request.includeChecklist !== undefined &&
    typeof request.includeChecklist !== "boolean"
  ) {
    throw new CrisisCommanderValidationError(
      "INVALID_CHECKLIST_FLAG",
      "includeChecklist must be a boolean",
      400
    );
  }
}

export function isCrisisCommanderValidationError(
  error: unknown
): error is CrisisCommanderValidationError {
  return error instanceof CrisisCommanderValidationError;
}

