import type { Request, Response } from "express";
import { runUnifiedSimulation } from "../services/simulation/simulation.service.js";
import type { SimulationRunRequest } from "../types/simulation.types.js";
import { SimulationValidationError } from "../types/simulation.types.js";
import { sendError, sendSuccess } from "../utils/response.js";

export function runSimulationController(
  req: Request<unknown, unknown, SimulationRunRequest>,
  res: Response
): void {
  try {
    const result = runUnifiedSimulation(req.body);
    sendSuccess(res, result, "Simulation completed");
  } catch (error) {
    if (error instanceof SimulationValidationError) {
      sendError(res, error.code, error.message, error.statusCode);
      return;
    }

    sendError(res, "SIMULATION_ENGINE_ERROR", "Simulation engine failed", 500);
  }
}

