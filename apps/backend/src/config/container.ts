import "reflect-metadata";
import { container } from "tsyringe";
import { HealthService } from "../application/services/health-service.js";
import { LeadService } from "../application/services/lead-service.js";
import { InMemoryLeadRepository } from "../application/repositories/in-memory-lead-repository.js";
import { PostgresLeadRepository } from "../application/repositories/postgres-lead-repository.js";
import { db } from "../infra/db/connection.js";
import { env } from "./env.js";
import { HealthController } from "../interfaces/http/controllers/health-controller.js";
import { FormController } from "../interfaces/http/controllers/form-controller.js";

container.register("HealthService", { useClass: HealthService });
container.register("LeadService", { useClass: LeadService });

const usePostgres = env.STORAGE === "postgres" && env.NODE_ENV !== "test";

if (usePostgres) {
  container.register("db", { useValue: db });
  container.register("LeadRepository", { useClass: PostgresLeadRepository });
} else {
  container.register("LeadRepository", { useClass: InMemoryLeadRepository });
}

export { container };

export function resolveHealthController(): HealthController {
  return container.resolve(HealthController);
}

export function resolveFormController(): FormController {
  return container.resolve(FormController);
}
