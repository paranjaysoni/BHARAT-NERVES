import type { Request, Response } from "express";
import {
  getAllScenarios,
  getScenarioById,
  getAllInternationalScenarios,
  getInternationalScenarioById,
} from "../services/data/scenarios.service.js";
import { sendSuccess, sendError } from "../utils/response.js";

export async function listScenarios(_req: Request, res: Response): Promise<void> {
  const scenarios = await getAllScenarios();
  sendSuccess(res, scenarios, `${scenarios.length} local scenarios`);
}

export async function getScenario(req: Request<{ id: string }>, res: Response): Promise<void> {
  const scenario = await getScenarioById(req.params.id);
  if (!scenario) {
    sendError(res, "NOT_FOUND", `Scenario not found: ${req.params.id}`, 404);
    return;
  }
  sendSuccess(res, scenario);
}

export async function listInternationalScenarios(_req: Request, res: Response): Promise<void> {
  const scenarios = await getAllInternationalScenarios();
  sendSuccess(res, scenarios, `${scenarios.length} international scenarios`);
}

export async function getInternationalScenario(req: Request<{ id: string }>, res: Response): Promise<void> {
  const scenario = await getInternationalScenarioById(req.params.id);
  if (!scenario) {
    sendError(res, "NOT_FOUND", `International scenario not found: ${req.params.id}`, 404);
    return;
  }
  sendSuccess(res, scenario);
}
