import { Router } from "express";
import { listNodes, getNode } from "../controllers/nodes.controller.js";

const router = Router();

router.get("/", listNodes);
router.get("/:id", getNode);

export default router;
