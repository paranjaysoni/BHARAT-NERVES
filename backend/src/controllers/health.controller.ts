import type { Request, Response } from "express";
import { getHealthData } from "../services/health.service.js";
import { sendSuccess } from "../utils/response.js";

export function healthCheck(req: Request, res: Response): void {
  const data = getHealthData();
  sendSuccess(res, data, "Service is healthy");
}
