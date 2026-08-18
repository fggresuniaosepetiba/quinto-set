import type { AuthTokenPayload } from "../application/services/auth-service.js";

declare global {
  namespace Express {
    interface Request {
      auth?: AuthTokenPayload;
    }
  }
}

export {};
