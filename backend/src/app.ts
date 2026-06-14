import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { requestLogger } from "./middleware/request-logger.middleware.js";
import { notFound } from "./middleware/not-found.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import healthRouter from "./routes/health.routes.js";

const app = express();

// ── Core middleware ──────────────────────────────────────────────────────────
app.use(cors({ origin: env.FRONTEND_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestLogger);

// ── Routes ───────────────────────────────────────────────────────────────────
// Simple deployment probe — no prefix
app.get("/health", (_, res) => res.json({ status: "ok" }));

// Versioned API routes
app.use("/api/health", healthRouter);

// ── Error handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
