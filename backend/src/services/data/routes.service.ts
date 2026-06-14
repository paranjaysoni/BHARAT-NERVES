import type { CorridorRoute } from "../../types/route.types.js";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const routesData = require("../../data/routes.json") as CorridorRoute[];

export function getAllRoutes(): CorridorRoute[] {
  return routesData;
}

export function getRouteById(id: string): CorridorRoute | null {
  return routesData.find((r) => r.id === id) ?? null;
}

export function getRoutesByStatus(status: CorridorRoute["status"]): CorridorRoute[] {
  return routesData.filter((r) => r.status === status);
}

export function getRoutesByNode(nodeId: string): CorridorRoute[] {
  return routesData.filter(
    (r) => r.sourceNodeId === nodeId || r.destinationNodeId === nodeId
  );
}
