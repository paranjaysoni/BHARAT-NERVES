import { Router } from "express";
import { createCrisisCommanderPlanController } from "../controllers/crisis-commander.controller.js";

const router = Router();

router.post("/plan", createCrisisCommanderPlanController);

export default router;
