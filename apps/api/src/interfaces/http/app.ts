import cors from "cors";
import express from "express";
import { healthRouter } from "./routes/health-router.js";
import { formRouter } from "./routes/form-router.js";
import { errorHandler } from "./middleware/error-handler.js";
import { env } from "../../config/env.js";
import {
  resolveFormController,
  resolveHealthController,
} from "../../config/container.js";

function corsOptions(): cors.CorsOptions {
  if (env.CORS_ORIGIN === "*") {
    return { origin: true };
  }
  return {
    origin: env.CORS_ORIGIN.split(",").map((origin) => origin.trim()),
  };
}

export function createApp(): express.Express {
  const app = express();
  app.use(cors(corsOptions()));
  app.use(express.json());
  app.use(healthRouter(resolveHealthController()));
  app.use(formRouter(resolveFormController()));
  app.use(errorHandler);
  return app;
}