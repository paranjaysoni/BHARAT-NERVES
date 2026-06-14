import { Router } from "express";
import { listRoutes, getRoute } from "../controllers/routes.controller.js";

const router = Router();

router.get("/", listRoutes);
router.get("/:id", getRoute);

export default router;
