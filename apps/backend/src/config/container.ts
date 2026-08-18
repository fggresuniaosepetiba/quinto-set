import "reflect-metadata";
import { container, Lifecycle } from "tsyringe";
import { HealthService } from "../application/services/health-service.js";
import { LeadService } from "../application/services/lead-service.js";
import { AuthService } from "../application/services/auth-service.js";
import { InMemoryLeadRepository } from "../application/repositories/in-memory-lead-repository.js";
import { PostgresLeadRepository } from "../application/repositories/postgres-lead-repository.js";
import { InMemoryAdminRepository } from "../application/repositories/in-memory-admin-repository.js";
import { PostgresAdminRepository } from "../application/repositories/postgres-admin-repository.js";
import { db } from "../infra/db/connection.js";
import { env } from "./env.js";
import { HealthController } from "../interfaces/http/controllers/health-controller.js";
import { FormController } from "../interfaces/http/controllers/form-controller.js";
import { AuthController } from "../interfaces/http/controllers/auth-controller.js";

container.register("HealthService", { useClass: HealthService });
container.register("LeadService", { useClass: LeadService });
container.register("AuthService", { useClass: AuthService });

const usePostgres = env.STORAGE === "postgres" && env.NODE_ENV !== "test";

if (usePostgres) {
  container.register("db", { useValue: db });
  container.register("LeadRepository", { useClass: PostgresLeadRepository });
  container.register("AdminRepository", { useClass: PostgresAdminRepository });
} else {
  container.register(
    "LeadRepository",
    { useClass: InMemoryLeadRepository },
    { lifecycle: Lifecycle.Singleton },
  );
  container.register(
    "AdminRepository",
    { useClass: InMemoryAdminRepository },
    { lifecycle: Lifecycle.Singleton },
  );
}

export { container };

export function resolveHealthController(): HealthController {
  return container.resolve(HealthController);
}

export function resolveFormController(): FormController {
  return container.resolve(FormController);
}

export function resolveAuthController(): AuthController {
  return container.resolve(AuthController);
}