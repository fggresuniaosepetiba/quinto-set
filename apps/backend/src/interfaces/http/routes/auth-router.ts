import { Router } from "express";
import type { AuthController } from "../controllers/auth-controller.js";
import { requireAuth } from "../middleware/require-auth.js";
import type { AuthTokenPayload } from "../../../application/services/auth-service.js";

export function authRouter(
  controller: AuthController,
  verifyToken?: (token: string) => AuthTokenPayload,
): Router {
  const router = Router();
  router.post(
    "/auth/login",
    (req, res, next) => void controller.login(req, res, next),
  );
  if (verifyToken) {
    router.post(
      "/auth/refresh",
      requireAuth(verifyToken),
      (req, res, next) => void controller.refresh(req, res, next),
    );
  }
  return router;
}
