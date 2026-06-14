import { getAllAgents } from "../data/agents.service.js";
import { runUnifiedSimulation } from "../simulation/simulation.service.js";
import type {
  AIParliamentSession,
  AIParliamentSessionRequest,
} from "../../types/ai-parliament.types.js";
import { AIParliamentValidationError } from "../../types/ai-parliament.types.js";
import { SimulationValidationError } from "../../types/simulation.types.js";
import { buildAgentDeliberations } from "./agent-deliberation.service.js";
import { calculateConsensus } from "./consensus-engine.service.js";
import { buildParliamentTimeline } from "./parliament-timeline.builder.js";
import {
  buildFinalRecommendation,
  buildKeyInsights,
  buildRecommendationMatrix,
} from "./recommendation-builder.service.js";

export function createAIParliamentSession(
  request: AIParliamentSessionRequest
): AIParliamentSession {
  validateRequest(request);

  const agents = getAllAgents();
  if (agents.length === 0) {
    throw new AIParliamentValidationError(
      "AI_PARLIAMENT_AGENTS_NOT_FOUND",
      "AI Parliament agents not found",
      500
    );
  }

  try {
    const simulation = runUnifiedSimulation({ scenarioId: request.scenarioId });
    const deliberations = buildAgentDeliberations(agents, simulation);
    const consensus = calculateConsensus(deliberations, simulation.scenario.severity);
    const generatedAt = new Date();

    return {
      sessionId: `parl_${Date.now()}`,
      scenarioId: simulation.scenario.scenarioId,
      scenarioName: simulation.scenario.scenarioName,
      severity: simulation.scenario.severity,
      status: "COMPLETED",
      currentQuestion: "Which routes and resources should be prioritized?",
      participants: deliberations.length,
      consensus,
      agents: deliberations,
      recommendation: buildFinalRecommendation(simulation),
      timeline: buildParliamentTimeline(generatedAt),
      insights: buildKeyInsights(simulation),
      matrix: request.includeFullMatrix === false ? [] : buildRecommendationMatrix(deliberations),
      generatedAt: generatedAt.toISOString(),
    };
  } catch (error) {
    if (error instanceof SimulationValidationError) {
      throw new AIParliamentValidationError(
        "AI_PARLIAMENT_SCENARIO_NOT_FOUND",
        "AI Parliament scenario not found",
        404
      );
    }
    throw error;
  }
}

function validateRequest(request: AIParliamentSessionRequest): void {
  if (request.simulationId !== undefined && typeof request.simulationId !== "string") {
    throw new AIParliamentValidationError(
      "INVALID_AI_PARLIAMENT_SIMULATION_ID",
      "Simulation ID must be a string",
      400
    );
  }
}

export function isAIParliamentValidationError(
  error: unknown
): error is AIParliamentValidationError {
  return error instanceof AIParliamentValidationError;
}

