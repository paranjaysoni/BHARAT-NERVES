import type { Request, Response } from "express";
import { getAllNodes, getNodeById } from "../services/data/nodes.service.js";
import { sendSuccess, sendError } from "../utils/response.js";

export function listNodes(_req: Request, res: Response): void {
  const nodes = getAllNodes();
  sendSuccess(res, nodes, `${nodes.length} infrastructure nodes`);
}

export function getNode(req: Request<{ id: string }>, res: Response): void {
  const node = getNodeById(req.params.id);
  if (!node) {
    sendError(res, "NOT_FOUND", `Node not found: ${req.params.id}`, 404);
    return;
  }
  sendSuccess(res, node);
}
