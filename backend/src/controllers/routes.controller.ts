import type { Request, Response } from "express";
import { getAllRoutes, getRouteById } from "../services/data/routes.service.js";
import { sendSuccess, sendError } from "../utils/response.js";

export function listRoutes(_req: Request, res: Response): void {
  const routes = getAllRoutes();
  sendSuccess(res, routes, `${routes.length} corridor routes`);
}

export function getRoute(req: Request<{ id: string }>, res: Response): void {
  const route = getRouteById(req.params.id);
  if (!route) {
    sendError(res, "NOT_FOUND", `Route not found: ${req.params.id}`, 404);
    return;
  }
  sendSuccess(res, route);
}
