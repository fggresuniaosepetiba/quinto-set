# Relatório 003 — Scaffold da API (Express + TS + Jest)

- **Data:** 2026-08-13
- **Status:** Concluído (scaffold funcional)
- **Commit:** `e32aae4`

## Objetivo

Criar o backend da plataforma com arquitetura em camadas, validação compartilhada com o frontend e testes automatizados.

## Execução

1. **`apps/api` (`@quinto-set/api`):** Express 5 + TypeScript 7 (ESM, `"type": "module"`), arquitetura em camadas:
   - `src/config/`: `env.ts` (validação Zod), `logger.ts` (pino), `container.ts` (tsyringe DI + reflect-metadata).
   - `src/domain/entities/service-status.ts`: tipo `ServiceStatus`.
   - `src/application/services/health-service.ts`: `HealthService` `@injectable`.
   - `src/interfaces/http/`: `app.ts` (`createApp`), `controllers/health-controller.ts`, `routes/health-router.ts`.
   - `src/index.ts`: bootstrap com graceful shutdown (SIGINT/SIGTERM).
2. **Contracts:** `packages/contracts` com `healthResponseSchema` + tipos inferidos (`HealthResponse`).
3. **Testes:** Jest 30 + `@swc/jest` (transforma TS com decorators) + Supertest; `jest.config.cjs` com `moduleNameMapper` para resolver sufixo `.js` (ESM→CJS).
4. **Config:** `tsconfig.json` (noEmit) + `tsconfig.build.json` (emite `dist/`); `.env.example`; `docker-compose.yml` (Postgres 17-alpine).
5. **Dependências instaladas** (todas com versões verificadas via `npm view`).

## Verificação (evidência)

- `npm run test --workspace @quinto-set/api`: **1 suite / 1 teste passando** (`GET /health` → 200 + corpo JSON válido).
- `npm run build --workspace @quinto-set/api`: OK.
- Execução do build com `PORT=3099`:
  ```
  {"status":"ok","timestamp":"2026-08-13T16:06:23.921Z","uptime":4.03}
  ```

## Stack final da API

| Componente | Versão |
| --- | --- |
| express | 5.2.1 |
| drizzle-orm / drizzle-kit | 0.45.2 / 0.31.10 |
| pino | 10.3.1 |
| tsyringe | 4.10.0 |
| zod | 4.4.3 |
| pg | 8.23.0 |
| dotenv | 17.4.2 |
| jest / @swc/jest | 30.4.2 / 0.2.39 |
| supertest | 7.2.2 |
| tsx | 4.23.12 |
| typescript | 7.0.2 |

## Decisões registradas

- ADR-001 (Jest único, sem Vitest), ADR-002 (TS7/`baseUrl`), ADR-003 (camadas), ADR-004 (contracts).
