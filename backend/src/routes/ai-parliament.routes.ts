import { Router } from "express";
import { createAIParliamentSessionController } from "../controllers/ai-parliament.controller.js";

const router = Router();

router.post("/session", createAIParliamentSessionController);

export default router;
