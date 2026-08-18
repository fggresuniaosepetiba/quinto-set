import "reflect-metadata";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z
    .string()
    .default("postgres://quinto_set:quinto_set@localhost:5433/quinto_set"),
  STORAGE: z.enum(["postgres", "memory"]).default("postgres"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),
  CORS_ORIGIN: z.string().default("*"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const details = JSON.stringify(parsed.error.flatten().fieldErrors, null, 2);
  console.error(`Configuração de ambiente inválida: ${details}`);
  process.exit(1);
}

export const env = parsed.data;
