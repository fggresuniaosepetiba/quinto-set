# Todo — Tarefas do projeto

> Status geral e pendências atuais. Última atualização: 2026-08-13.

## Pendências ativas

| Prioridade | Tarefa | Onde | Status |
| --- | --- | --- | --- |
| Alta | Corrigir erro de lint `set-state-in-effect` | `apps/web/src/components/layout/Navbar.tsx:16` | Aberto |
| Alta | Vercel: Root Directory = `apps/web` | Painel Vercel (ação manual) | Bloqueado por ação do usuário |
| Média | Warnings de lint (`<img>` → `next/image`, etc.) | `apps/web` | Aberto |
| Média | Definir domínio real e atualizar `siteConfig.url` | `apps/web/src/data/site.ts` | Aberto (ADR-007) |
| Média | Enviar formulários do web para a API | `apps/web` | Planejado |

## Concluído nesta etapa

- [x] Monorepo npm workspaces (`apps/web`, `apps/api`, `packages/contracts`).
- [x] API Express em camadas com `GET /health`.
- [x] Teste Jest/Supertest da API (1/1 passando).
- [x] `.env` local da API criado (gitignored).
- [x] `AGENTS.md`/`CLAUDE.md` adicionados ao `.gitignore`.
- [x] Documentação em `README.md` e `docs/`.

## Como atualizar este arquivo

Ao iniciar uma tarefa, mova-a para "em andamento". Ao concluir, mova para "concluído" com a referência do commit. Os relatórios por fase vivem em `docs/reports/`.
