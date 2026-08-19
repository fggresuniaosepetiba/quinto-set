import "reflect-metadata";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL_LOCAL: z
    .string()
    .default("postgres://quinto_set:quinto_set@localhost:5433/quinto_set"),
  DATABASE_URL_PROD: z
    .string()
    .default("postgres://quinto_set:quinto_set@localhost:5433/quinto_set"),
  STORAGE: z.enum(["postgres", "memory"]).default("postgres"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),
  CORS_ORIGIN: z.string().default("*"),
  AUTH_SECRET: z.string().min(1).default("dev-secret-change-me"),
  ADMIN_USERNAME: z.string().min(1).default("admin"),
  ADMIN_PASSWORD: z.string().min(1).default("quinto-set"),
  AUTH_TOKEN_TTL: z.coerce.number().int().positive().default(604800),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const details = JSON.stringify(parsed.error.flatten().fieldErrors, null, 2);
  console.error(`Configuração de ambiente inválida: ${details}`);
  process.exit(1);
}

export const env = {
  ...parsed.data,
  DATABASE_URL:
    process.env.DATABASE_URL ??
    (parsed.data.NODE_ENV === "production"
      ? parsed.data.DATABASE_URL_PROD
      : parsed.data.DATABASE_URL_LOCAL),
};
