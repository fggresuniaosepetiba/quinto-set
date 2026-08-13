import { Router } from "express";
import type { HealthController } from "../controllers/health-controller.js";

export function healthRouter(controller: HealthController): Router {
  const router = Router();
  router.get("/health", (req, res) => void controller.check(req, res));
  return router;
}
