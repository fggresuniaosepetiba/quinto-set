# Relatório 002 — Migração para monorepo

- **Data:** 2026-08-13
- **Status:** Concluído
- **Commits:** `d9d68d5` (refactor), `cbb6223` (chore)

## Objetivo

Reestruturar o repositório (que era um único app Next.js na raiz) em um **monorepo com npm workspaces**, para acomodar a futura API sem misturar stacks.

## Execução

1. **Workspaces:** root `package.json` com `"workspaces": ["apps/*", "packages/*"]` e scripts agregadores (`dev`, `dev:api`, `build`, `start`, `lint`, `test`).
2. **Web → `apps/web`:** app Next.js inteiro movido com `git mv` (src, public, configs, package.json, lock), renomeado para `@quinto-set/web`, com script `typecheck` e dependência `@quinto-set/contracts`.
3. **Contracts → `packages/contracts`:** criado `@quinto-set/contracts` (Zod v4), consumido como fonte TS (`main`/`types`/`exports` → `./src/index.ts`).
4. **`.gitignore`:** padrões ajustados (sem âncora de raiz) para cobrir `apps/web/.next`, `dist/`, etc.; `AGENTS.md`/`CLAUDE.md` adicionados (auto-gerados pelo `next dev`).
5. **Dependências:** instalação única na raiz; removido `eslint@10` órfão e `apps/web/package-lock.json` obsoleto (quebravam o lint).

## Verificação (evidência)

- `npm run build --workspace @quinto-set/web`: OK, 9 rotas estáticas.
- `npm run typecheck --workspace @quinto-set/web`: OK.
- `npm ls eslint --workspace @quinto-set/web`: `eslint@9.39.5` (deduped) — sem conflito.
- `git status`: renames preservados (R), sem perda de histórico.

## Estrutura resultante

```
.
├── apps/web          @quinto-set/web   — Next.js 16
├── apps/api          @quinto-set/api   — Express 5 (criado na Fase 3)
├── packages/contracts @quinto-set/contracts — Zod schemas
├── package.json      — workspaces
```

## Observações

- **TypeScript 7 duplicado** em `apps/web` e `apps/api`: o `typescript-eslint` (raiz, via `eslint-config-next`) ainda usa TS 6.0.3, então o npm não deduplica o `^7.0.2` dos workspaces. Será resolvido quando o `typescript-eslint` suportar TS 7.
- **Deploy Vercel:** passa a exigir Root Directory = `apps/web`.

## Decisões registradas

- ADR-005 (monorepo npm workspaces), ADR-002 (TS7, sem `baseUrl` na API).
