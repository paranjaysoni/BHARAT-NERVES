import type { Request, Response } from "express";
import { getAllRoutes, getRouteById } from "../services/data/routes.service.js";
import { sendSuccess, sendError } from "../utils/response.js";

export async function listRoutes(_req: Request, res: Response): Promise<void> {
  const routes = await getAllRoutes();
  sendSuccess(res, routes, `${routes.length} corridor routes`);
}

export async function getRoute(req: Request<{ id: string }>, res: Response): Promise<void> {
  const route = await getRouteById(req.params.id);
  if (!route) {
    sendError(res, "NOT_FOUND", `Route not found: ${req.params.id}`, 404);
    return;
  }
  sendSuccess(res, route);
}
