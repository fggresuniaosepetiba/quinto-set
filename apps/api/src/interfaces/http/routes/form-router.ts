import { Router } from "express";
import type { FormController } from "../controllers/form-controller.js";

export function formRouter(controller: FormController): Router {
  const router = Router();

  router.post("/contacts", (req, res, next) =>
    void controller.create("contact", req, res, next),
  );
  router.post("/enrollments", (req, res, next) =>
    void controller.create("enrollment", req, res, next),
  );
  router.post("/sponsors", (req, res, next) =>
    void controller.create("sponsor", req, res, next),
  );

  return router;
}