import type { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";
import { sendError } from "../utils/response.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  logger.error(`Unhandled error on ${req.method} ${req.originalUrl}`, {
    message: err.message,
    stack: err.stack,
  });

  // Check for known validation error from config service
  if (err.message && err.message.includes('Invalid configuration')) {
    // Return a 400 Bad Request with a specific error code
    sendError(res, "INVALID_CONFIGURATION", err.message, 400);
  } else {
    sendError(res, "INTERNAL_SERVER_ERROR", "An unexpected error occurred.", 500);
  }
}
