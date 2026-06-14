import type { Request, Response } from "express";
import {
  runInternationalScenario,
  runLocalScenario,
  ScenarioNotFoundError,
} from "../services/scenario-engine/scenario-engine.service.js";
import type { ScenarioRunRequest } from "../types/scenario-engine.types.js";
import { sendError, sendSuccess } from "../utils/response.js";

type ScenarioRunParams = {
  id: string;
};

export function runScenarioController(
  req: Request<ScenarioRunParams, unknown, ScenarioRunRequest>,
  res: Response
): void {
  try {
    const result = runLocalScenario(req.params.id, req.body ?? {});
    sendSuccess(res, result, "Scenario simulated");
  } catch (error) {
    handleScenarioEngineError(error, res);
  }
}

export function runInternationalScenarioController(
  req: Request<ScenarioRunParams, unknown, ScenarioRunRequest>,
  res: Response
): void {
  try {
    const result = runInternationalScenario(req.params.id, req.body ?? {});
    sendSuccess(res, result, "International scenario simulated");
  } catch (error) {
    handleScenarioEngineError(error, res);
  }
}

function handleScenarioEngineError(error: unknown, res: Response): void {
  if (error instanceof ScenarioNotFoundError) {
    sendError(res, "SCENARIO_NOT_FOUND", "Scenario not found", 404);
    return;
  }

  sendError(res, "SCENARIO_ENGINE_ERROR", "Scenario execution failed", 500);
}

