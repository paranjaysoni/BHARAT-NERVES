import { Router } from "express";
import {
  getRouteGraphHealthController,
  getShortestPathController,
  recoverRouteController,
} from "../controllers/route-graph.controller.js";

const router = Router();

router.get("/health", getRouteGraphHealthController);
router.post("/shortest-path", getShortestPathController);
router.post("/recover", recoverRouteController);

export default router;
