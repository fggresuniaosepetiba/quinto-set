import { fileURLToPath } from "node:url";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { createApp } from "./interfaces/http/app.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { db, pool } from "./infra/db/connection.js";
import { container } from "./config/container.js";
import { AuthService } from "./application/services/auth-service.js";

const migrationsFolder = fileURLToPath(new URL("../drizzle", import.meta.url));

async function bootstrap(): Promise<void> {
  if (env.STORAGE === "postgres") {
    logger.info("Aplicando migrations...");
    await migrate(db, { migrationsFolder });
  } else {
    const authService = container.resolve(AuthService);
    const admin = await authService.seedAdmin(
      env.ADMIN_USERNAME,
      env.ADMIN_PASSWORD,
    );
    logger.info(
      { username: admin.username },
      "Admin de memória criado/atualizado no boot",
    );
  }

  const app = createApp();
  const server = app.listen(env.PORT, () => {
    logger.info(`API rodando em http://localhost:${env.PORT}`);
  });

  const shutdown = async (signal: string) => {
    logger.info(`Recebido ${signal}, encerrando...`);
    server.close(async () => {
      await pool.end();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}

void bootstrap();
