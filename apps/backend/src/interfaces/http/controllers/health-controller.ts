import type { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import type { HealthService } from "../../../application/services/health-service.js";

@injectable()
export class HealthController {
  constructor(
    @inject("HealthService") private readonly healthService: HealthService,
  ) {}

  async check(_req: Request, res: Response): Promise<void> {
    res.status(200).json(this.healthService.check());
  }
}
