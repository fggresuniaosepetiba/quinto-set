# Changelog

> Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/). As entradas refletem os commits reais do `main`. Última atualização: 2026-08-13.

## [Não publicado]

### Adicionado
- **API** (`apps/api`): scaffold Express 5 + TypeScript em camadas (config, domain, application, interfaces), DI com tsyringe, log com pino, validação de env com Zod, endpoint `GET /health`, Docker Compose para Postgres local.
- **Contratos** (`packages/contracts`): pacote compartilhado com schemas Zod v4 (`healthResponseSchema`, `phoneSchema`, `emailSchema`, `enrollmentSchema`, `contactSchema`, `sponsorSchema`) e tipos inferidos.
- **Testes da API:** Jest 30 + @swc/jest + Supertest (1 teste passando).
- **Documentação:** `README.md`, `docs/` (contexto, arquitetura, backend, decisões, roadmap, todos, guias de dev/deploy, relatórios), changelog.

### Alterado
- **`npm run dev` (raiz):** agora sobe web (`:3000`) e API (`:3001`) em paralelo via `concurrently` (devDependency da raiz). Novos scripts `dev:web`/`dev:api`; `dev:api` mantido.

### Refatorado
- **Monorepo:** web movido para `apps/web` (workspace `@quinto-set/web`); raiz com `package.json` de workspaces; `packages/contracts` como workspace compartilhado.
- **`.gitignore`:** padrões ajustados para cobrir pastas aninhadas; `AGENTS.md` e `CLAUDE.md` agora ignorados.

### Corrigido
- **ESLint do web:** dependências instaladas (`eslint@9` + `eslint-config-next`); removido `eslint@10` órfão e `apps/web/package-lock.json` obsoleto (incompatíveis e quebravam o lint).

## [2026-08-13] — Seção Futuro com planetas

### Adicionado
- **Planetas do sistema solar:** Mercúrio, Vênus, Terra, Marte, Júpiter e Saturno com gradientes CSS orbitando na seção "Futuro" da home (commits `78f1b5f`, `58871bf`).
  - Animações `--animate-orbit-*` por planeta (16s–60s), todos no mesmo sentido, sem `reverse`.
  - Saturno com anel em elipse.

### Corrigido
- **Reduced motion:** a animação continua rodando com `prefers-reduced-motion: reduce` (decisão do projeto, commit `435b8f1`).

### Alterado
- **Turbopack:** habilitado `turbopackPluginRuntimeStrategy: "workerThreads"` no `next.config.ts` (commit `e44bd2b`).

---

## Guia de versões

- **Adicionado** — novos recursos.
- **Corrigido** — correções de bugs.
- **Alterado** — mudanças em recursos existentes.
- **Refatorado** — mudanças internas sem alterar comportamento (este projeto usa a extensão do conventional-changelog para refactors).
- **Removido** — recursos removidos.
