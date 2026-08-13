import { createApp } from "./interfaces/http/app.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";

const app = createApp();
const server = app.listen(env.PORT, () => {
  logger.info(`API rodando em http://localhost:${env.PORT}`);
});

const shutdown = (signal: string) => {
  logger.info(`Recebido ${signal}, encerrando...`);
  server.close(() => process.exit(0));
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
