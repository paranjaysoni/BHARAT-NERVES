import type { SimulationResult, SimulationRunRequest } from "../../types/simulation.types.js";
import { runSimulation } from "./simulation-orchestrator.service.js";

export function runUnifiedSimulation(request: SimulationRunRequest): SimulationResult {
  return runSimulation(request);
}

