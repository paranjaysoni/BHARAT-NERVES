import type { Request, Response } from "express";
import { getAllNodes, getNodeById } from "../services/data/nodes.service.js";
import { sendSuccess, sendError } from "../utils/response.js";

export async function listNodes(_req: Request, res: Response): Promise<void> {
  const nodes = await getAllNodes();
  sendSuccess(res, nodes, `${nodes.length} infrastructure nodes`);
}

export async function getNode(req: Request<{ id: string }>, res: Response): Promise<void> {
  const node = await getNodeById(req.params.id);
  if (!node) {
    sendError(res, "NOT_FOUND", `Node not found: ${req.params.id}`, 404);
    return;
  }
  sendSuccess(res, node);
}
