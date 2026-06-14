import type { Request, Response } from "express";
import {
  createCrisisCommanderPlan,
  isCrisisCommanderValidationError,
} from "../services/crisis-commander/crisis-commander.service.js";
import type { CrisisCommanderPlanRequest } from "../types/crisis-commander.types.js";
import { sendError, sendSuccess } from "../utils/response.js";

export function createCrisisCommanderPlanController(
  req: Request<unknown, unknown, CrisisCommanderPlanRequest>,
  res: Response
): void {
  try {
    const result = createCrisisCommanderPlan(req.body);
    sendSuccess(res, result, "Crisis commander plan ready");
  } catch (error) {
    if (isCrisisCommanderValidationError(error)) {
      sendError(res, error.code, error.message, error.statusCode);
      return;
    }

    sendError(res, "CRISIS_COMMANDER_ERROR", "Crisis commander plan failed", 500);
  }
}

