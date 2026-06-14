import type { Request, Response } from "express";
import {
  getAllScenarios,
  getScenarioById,
  getAllInternationalScenarios,
  getInternationalScenarioById,
} from "../services/data/scenarios.service.js";
import { sendSuccess, sendError } from "../utils/response.js";

export function listScenarios(_req: Request, res: Response): void {
  const scenarios = getAllScenarios();
  sendSuccess(res, scenarios, `${scenarios.length} local scenarios`);
}

export function getScenario(req: Request<{ id: string }>, res: Response): void {
  const scenario = getScenarioById(req.params.id);
  if (!scenario) {
    sendError(res, "NOT_FOUND", `Scenario not found: ${req.params.id}`, 404);
    return;
  }
  sendSuccess(res, scenario);
}

export function listInternationalScenarios(_req: Request, res: Response): void {
  const scenarios = getAllInternationalScenarios();
  sendSuccess(res, scenarios, `${scenarios.length} international scenarios`);
}

export function getInternationalScenario(req: Request<{ id: string }>, res: Response): void {
  const scenario = getInternationalScenarioById(req.params.id);
  if (!scenario) {
    sendError(res, "NOT_FOUND", `International scenario not found: ${req.params.id}`, 404);
    return;
  }
  sendSuccess(res, scenario);
}
