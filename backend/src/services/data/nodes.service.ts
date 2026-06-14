import type { InfrastructureNode } from "../../types/node.types.js";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const nodesData = require("../../data/nodes.json") as InfrastructureNode[];

export function getAllNodes(): InfrastructureNode[] {
  return nodesData;
}

export function getNodeById(id: string): InfrastructureNode | null {
  return nodesData.find((n) => n.id === id) ?? null;
}

export function getNodesByType(type: InfrastructureNode["type"]): InfrastructureNode[] {
  return nodesData.filter((n) => n.type === type);
}

export function getNodesByStatus(status: InfrastructureNode["status"]): InfrastructureNode[] {
  return nodesData.filter((n) => n.status === status);
}
