import "reflect-metadata";
import { container } from "tsyringe";
import { HealthService } from "../application/services/health-service.js";
import { HealthController } from "../interfaces/http/controllers/health-controller.js";

container.register("HealthService", { useClass: HealthService });

export { container };

export function resolveHealthController(): HealthController {
  return container.resolve(HealthController);
}
