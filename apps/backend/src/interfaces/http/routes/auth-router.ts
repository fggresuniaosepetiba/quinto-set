import { Router } from "express";
import type { AuthController } from "../controllers/auth-controller.js";

export function authRouter(controller: AuthController): Router {
  const router = Router();
  router.post(
    "/auth/login",
    (req, res, next) => void controller.login(req, res, next),
  );
  return router;
}
