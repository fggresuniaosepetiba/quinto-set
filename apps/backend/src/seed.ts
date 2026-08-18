import "reflect-metadata";
import { AuthService } from "./application/services/auth-service.js";
import { PostgresAdminRepository } from "./application/repositories/postgres-admin-repository.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { db, pool } from "./infra/db/connection.js";

async function seed(): Promise<void> {
  const service = new AuthService(new PostgresAdminRepository(db));
  const admin = await service.seedAdmin(env.ADMIN_USERNAME, env.ADMIN_PASSWORD);
  logger.info(
    { username: admin.username },
    "Admin criado/atualizado com sucesso",
  );
}

seed()
  .catch((error) => {
    logger.error({ error }, "Falha ao executar o seed");
    process.exitCode = 1;
  })
  .finally(() => void pool.end());
