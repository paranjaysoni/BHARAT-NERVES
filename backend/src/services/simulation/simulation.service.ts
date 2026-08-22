import type { SimulationResult, SimulationRunRequest } from "../../types/simulation.types.js";
import { runSimulation } from "./simulation-orchestrator.service.js";

export async function runUnifiedSimulation(request: SimulationRunRequest): Promise<SimulationResult> {
  return await runSimulation(request);
}

