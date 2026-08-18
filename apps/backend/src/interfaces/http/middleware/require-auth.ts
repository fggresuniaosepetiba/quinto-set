import type { NextFunction, Request, Response } from "express";
import type { AuthTokenPayload } from "../../../application/services/auth-service.js";

export class UnauthorizedError extends Error {
  constructor(message = "Não autorizado") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export function requireAuth(
  verifyToken: (token: string) => AuthTokenPayload,
): (req: Request, res: Response, next: NextFunction) => void {
  return (req, res, next) => {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
    if (!token) {
      next(new UnauthorizedError());
      return;
    }
    try {
      req.auth = verifyToken(token);
      next();
    } catch {
      next(new UnauthorizedError());
    }
  };
}