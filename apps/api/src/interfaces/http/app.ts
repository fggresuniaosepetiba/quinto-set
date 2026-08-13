import express from "express";
import { healthRouter } from "./routes/health-router.js";
import { resolveHealthController } from "../../config/container.js";

export function createApp(): express.Express {
  const app = express();
  app.use(express.json());
  app.use(healthRouter(resolveHealthController()));
  return app;
}
