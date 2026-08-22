import type { Request, Response } from "express";
import {
  createAIParliamentSession,
  isAIParliamentValidationError,
} from "../services/ai-parliament/ai-parliament.service.js";
import type { AIParliamentSessionRequest } from "../types/ai-parliament.types.js";
import { sendError, sendSuccess } from "../utils/response.js";

export async function createAIParliamentSessionController(
  req: Request<unknown, unknown, AIParliamentSessionRequest>,
  res: Response
): Promise<void> {
  try {
    const result = await createAIParliamentSession(req.body);
    sendSuccess(res, result, "AI Parliament session completed");
  } catch (error) {
    if (isAIParliamentValidationError(error)) {
      sendError(res, error.code, error.message, error.statusCode);
      return;
    }

    sendError(res, "AI_PARLIAMENT_ENGINE_ERROR", "AI Parliament session failed", 500);
  }
}

