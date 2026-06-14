import type { Request, Response } from "express";
import { getAllResources, getResourceById } from "../services/data/resources.service.js";
import { sendSuccess, sendError } from "../utils/response.js";

export function listResources(_req: Request, res: Response): void {
  const resources = getAllResources();
  sendSuccess(res, resources, `${resources.length} resources`);
}

export function getResource(req: Request<{ id: string }>, res: Response): void {
  const resource = getResourceById(req.params.id);
  if (!resource) {
    sendError(res, "NOT_FOUND", `Resource not found: ${req.params.id}`, 404);
    return;
  }
  sendSuccess(res, resource);
}
