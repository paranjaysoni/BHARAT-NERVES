import { apiPost } from "./client";
import type { SimulationRunRequest, SimulationResult } from "@/types/simulation.types";

export async function runSimulation(
  request: SimulationRunRequest
): Promise<SimulationResult> {
  return apiPost<SimulationRunRequest, SimulationResult>(
    "/api/simulations/run",
    request
  );
}
