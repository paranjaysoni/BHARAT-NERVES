import type { Request, Response } from "express";
import {
  calculateImpact,
  isImpactValidationError,
} from "../services/impact-engine/impact-engine.service.js";
import type { ImpactCalculationRequest } from "../types/impact-engine.types.js";
import { sendError, sendSuccess } from "../utils/response.js";
import { getConfig } from "../services/config/config.service.js";

export async function calculateImpactController(
  req: Request<unknown, unknown, ImpactCalculationRequest>,
  res: Response
): Promise<void> {
  try {
    const config = await getConfig();
    const result = calculateImpact(req.body, config);
    sendSuccess(res, result, "Impact calculated");
  } catch (error) {
    if (isImpactValidationError(error)) {
      sendError(res, error.code, error.message, error.statusCode);
      return;
    }

    sendError(res, "IMPACT_ENGINE_ERROR", "Impact calculation failed", 500);
  }
}

