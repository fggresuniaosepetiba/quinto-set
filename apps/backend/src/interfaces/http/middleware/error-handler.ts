import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { logger } from "../../../config/logger.js";
import { UnauthorizedError } from "./require-auth.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: "invalid_input",
      issues: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  if (err instanceof UnauthorizedError) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  if (err instanceof Error && err.message === "invalid_credentials") {
    res.status(401).json({ error: "invalid_credentials" });
    return;
  }

  logger.error({ err }, "Erro não tratado");
  res.status(500).json({ error: "internal_server_error" });
};
