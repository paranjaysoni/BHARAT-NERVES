import type { Resource } from "../../types/resource.types.js";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const resourcesData = require("../../data/resources.json") as Resource[];

export function getAllResources(): Resource[] {
  return resourcesData;
}

export function getResourceById(id: string): Resource | null {
  return resourcesData.find((r) => r.id === id) ?? null;
}

export function getResourcesByLocation(nodeId: string): Resource[] {
  return resourcesData.filter((r) => r.locationNodeId === nodeId);
}

export function getResourcesByCategory(category: Resource["category"]): Resource[] {
  return resourcesData.filter((r) => r.category === category);
}

export function getResourcesByStatus(status: Resource["status"]): Resource[] {
  return resourcesData.filter((r) => r.status === status);
}
