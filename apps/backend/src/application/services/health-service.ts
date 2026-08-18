import { injectable } from "tsyringe";
import type { ServiceStatus } from "../../domain/entities/service-status.js";
import { healthResponseSchema } from "@quinto-set/contracts";

@injectable()
export class HealthService {
  check(): ServiceStatus {
    return healthResponseSchema.parse({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  }
}
