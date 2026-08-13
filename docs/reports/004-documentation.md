# Relatório 004 — Documentação

- **Data:** 2026-08-13
- **Status:** Concluído
- **Commit:** a definir (documentação desta fase)

## Objetivo

Documentar o projeto com base em evidências reais (estrutura de código, commits, outputs verificados), cobrindo contexto, arquitetura, decisões e guias.

## Entregas

| Arquivo | Conteúdo |
| --- | --- |
| `README.md` | Visão geral, stack, estrutura, como rodar, scripts, endpoints |
| `docs/project-context.md` | O que é o projeto, missão, público, instituições, páginas |
| `docs/architecture.md` | Monorepo, fluxo de dados, camadas web/API, contracts |
| `docs/backend-architecture.md` | Stack, camadas, fluxo de request, DI, env, banco, testes |
| `docs/decisions.md` | ADR-001 a ADR-010 (decisões com contexto e racional) |
| `docs/roadmap.md` | Concluído / curto / médio / longo prazo |
| `docs/todo.md` | Pendências ativas + concluído |
| `docs/dev-guide.md` | Setup, comandos, convenções de código |
| `docs/deploy-guide.md` | Vercel (web), deploy da API, checklist |
| `docs/frontend-todo.md` | Pendências do web (lint, testes, integração) |
| `docs/backend-todo.md` | Pendências da API (banco, endpoints, qualidade) |
| `docs/changelog/index.md` | Changelog baseado nos commits reais |
| `docs/reports/index.md` + `001`–`003` | Relatórios por fase com evidência |

## Evidências usadas

- Histórico de commits (`git log`): `c312dde` → `cbb6223`.
- Arquivos de código reais (package.json, configs, serviços, rotas).
- Outputs verificados (build web, build API, teste Jest 1/1, resposta de `/health`).
- Versões de dependências confirmadas via `npm view`.

## Pendências registradas (não bloqueiam)

- Lint do web (1 erro em `Navbar.tsx:16` + 12 warnings).
- Root Directory = `apps/web` na Vercel (ação manual).
- Deploy da API e banco em produção.

## Ajuste posterior (2026-08-13)

- **`npm run dev` unificado:** web + API em paralelo via `concurrently` (ADR-011). Verificado: `GET :3001/health` → `{"status":"ok",...}` e web `HTTP 200` com ambos rodando juntos.
- Documentação atualizada: `README`, `dev-guide`, `roadmap`, `todo`, `decisions` (ADR-011), changelog.
