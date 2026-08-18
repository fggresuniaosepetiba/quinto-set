import type { NextFunction, Request, RequestHandler, Response } from "express";
import { Router } from "express";
import type { FormController } from "../controllers/form-controller.js";

export function formRouter(
  controller: FormController,
  requireLeadsAuth?: RequestHandler,
): Router {
  const router = Router();

  router.post(
    "/contacts",
    (req, res, next) => void controller.create("contact", req, res, next),
  );
  router.post(
    "/enrollments",
    (req, res, next) => void controller.create("enrollment", req, res, next),
  );
  router.post(
    "/sponsors",
    (req, res, next) => void controller.create("sponsor", req, res, next),
  );
  router.get(
    "/leads",
    ...(requireLeadsAuth
      ? [requireLeadsAuth]
      : []),
    (req: Request, res: Response, next: NextFunction) =>
      void controller.list(req, res, next),
  );

  return router;
}