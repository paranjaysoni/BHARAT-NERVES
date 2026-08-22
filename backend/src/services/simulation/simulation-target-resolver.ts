import { getAllNodes, getNodeById } from "../data/nodes.service.js";
import type { SimulationRunRequest, SimulationTarget } from "../../types/simulation.types.js";
import { SimulationValidationError } from "../../types/simulation.types.js";

const defaultSourceNodeId = "paradip_port";
const defaultDestinationNodeId = "aiims_bhubaneswar";

export async function resolveSimulationTarget(request: SimulationRunRequest): Promise<SimulationTarget> {
  if (request.sourceNodeId && !(await getNodeById(request.sourceNodeId))) {
    throw new SimulationValidationError(
      "INVALID_SIMULATION_SOURCE",
      "Simulation source node does not exist",
      400
    );
  }

  if (request.destinationNodeId && !(await getNodeById(request.destinationNodeId))) {
    throw new SimulationValidationError(
      "INVALID_SIMULATION_DESTINATION",
      "Simulation destination node does not exist",
      400
    );
  }

  if (request.sourceNodeId && request.destinationNodeId) {
    return {
      sourceNodeId: request.sourceNodeId,
      destinationNodeId: request.destinationNodeId,
    };
  }

  if ((await getNodeById(defaultSourceNodeId)) && (await getNodeById(defaultDestinationNodeId))) {
    return {
      sourceNodeId: request.sourceNodeId ?? defaultSourceNodeId,
      destinationNodeId: request.destinationNodeId ?? defaultDestinationNodeId,
    };
  }

  const nodes = await getAllNodes();
  const source = nodes.find((node) => node.type === "PORT") ?? nodes[0];
  const destination = nodes.find((node) => node.type === "HOSPITAL") ?? nodes[1] ?? source;

  return {
    sourceNodeId: request.sourceNodeId ?? source.id,
    destinationNodeId: request.destinationNodeId ?? destination.id,
  };
}

