import type { Request, Response, NextFunction } from "express";
import { EventEmitter } from "events";
import { logger } from "../utils/logger.js";

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();

  (res as unknown as EventEmitter).once("finish", () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info";
    logger[level](
      `${req.method} ${req.originalUrl} ${res.statusCode} — ${duration}ms`,
      { ip: req.ip, ua: req.headers["user-agent"] }
    );
  });

  next();
}
