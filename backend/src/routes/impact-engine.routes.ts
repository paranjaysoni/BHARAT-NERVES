import { Router } from "express";
import { calculateImpactController } from "../controllers/impact-engine.controller.js";

const router = Router();

router.post("/calculate", calculateImpactController);

export default router;
