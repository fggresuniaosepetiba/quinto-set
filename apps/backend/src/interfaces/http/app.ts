import cors from "cors";
import express from "express";
import { healthRouter } from "./routes/health-router.js";
import { formRouter } from "./routes/form-router.js";
import { authRouter } from "./routes/auth-router.js";
import { errorHandler } from "./middleware/error-handler.js";
import { requireAuth } from "./middleware/require-auth.js";
import { env } from "../../config/env.js";
import {
  container,
  resolveAuthController,
  resolveFormController,
  resolveHealthController,
} from "../../config/container.js";
import { AuthService } from "../../application/services/auth-service.js";

function corsOptions(): cors.CorsOptions {
  if (env.CORS_ORIGIN === "*") {
    return { origin: true };
  }
  return {
    origin: env.CORS_ORIGIN.split(",").map((origin) => origin.trim()),
  };
}

export function createApp(authService?: AuthService): express.Express {
  const app = express();
  app.use(cors(corsOptions()));
  app.use(express.json());
  app.use(healthRouter(resolveHealthController()));
  app.use(authRouter(resolveAuthController()));

  const auth = authService ?? container.resolve(AuthService);
  app.use(
    formRouter(
      resolveFormController(),
      requireAuth((token) => auth.verifyToken(token)),
    ),
  );

  app.use(errorHandler);
  return app;
}
