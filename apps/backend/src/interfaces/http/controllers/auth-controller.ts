import type { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { loginInputSchema } from "@quinto-set/contracts";
import type { AuthService } from "../../../application/services/auth-service.js";

@injectable()
export class AuthController {
  constructor(
    @inject("AuthService") private readonly authService: AuthService,
  ) {}

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password } = loginInputSchema.parse(req.body);
      const session = await this.authService.login(username, password);
      res.status(200).json(session);
    } catch (error) {
      next(error);
    }
  }
}
