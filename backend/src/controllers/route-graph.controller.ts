import type { Request, Response } from "express";
import {
  getRecoveredRoute,
  getRouteGraphHealth,
  getShortestPath,
} from "../services/route-graph/route-graph.service.js";
import {
  RouteGraphValidationError,
  type RouteRecoveryRequest,
  type ShortestPathRequest,
} from "../types/route-graph.types.js";
import { sendError, sendSuccess } from "../utils/response.js";

export async function getRouteGraphHealthController(_req: Request, res: Response): Promise<void> {
  try {
    sendSuccess(res, await getRouteGraphHealth(), "Route graph health");
  } catch {
    sendError(res, "ROUTE_GRAPH_ERROR", "Route graph health check failed", 500);
  }
}

export async function getShortestPathController(
  req: Request<unknown, unknown, ShortestPathRequest>,
  res: Response
): Promise<void> {
  try {
    sendSuccess(res, await getShortestPath(req.body), "Shortest path result");
  } catch (error) {
    handleRouteGraphError(error, res);
  }
}

export async function recoverRouteController(
  req: Request<unknown, unknown, RouteRecoveryRequest>,
  res: Response
): Promise<void> {
  try {
    sendSuccess(res, await getRecoveredRoute(req.body), "Route recovery result");
  } catch (error) {
    handleRouteGraphError(error, res);
  }
}

function handleRouteGraphError(error: unknown, res: Response): void {
  if (error instanceof RouteGraphValidationError) {
    sendError(res, error.code, error.message, 400);
    return;
  }

  sendError(res, "ROUTE_GRAPH_ERROR", "Route graph request failed", 500);
}

