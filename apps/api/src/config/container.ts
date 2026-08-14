import "reflect-metadata";
import { container } from "tsyringe";
import { HealthService } from "../application/services/health-service.js";
import { LeadService } from "../application/services/lead-service.js";
import { InMemoryLeadRepository } from "../application/repositories/in-memory-lead-repository.js";
import { HealthController } from "../interfaces/http/controllers/health-controller.js";
import { FormController } from "../interfaces/http/controllers/form-controller.js";

container.register("HealthService", { useClass: HealthService });
container.register("LeadRepository", { useClass: InMemoryLeadRepository });
container.register("LeadService", { useClass: LeadService });

export { container };

export function resolveHealthController(): HealthController {
  return container.resolve(HealthController);
}

export function resolveFormController(): FormController {
  return container.resolve(FormController);
}