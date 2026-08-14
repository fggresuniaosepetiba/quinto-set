# Todo — Tarefas do projeto

> Status geral e pendências atuais. Última atualização: 2026-08-14.

## Pendências ativas

| Prioridade | Tarefa | Onde | Status |
| --- | --- | --- | --- |
| Alta | Vercel: Root Directory = `apps/web` | Painel Vercel (ação manual) | Bloqueado por ação do usuário |
| Média | Definir domínio real e atualizar `siteConfig.url` | `apps/web/src/data/site.ts` | Aberto (ADR-007) |
| Média | Persistência dos formulários no Postgres (hoje em memória) | `apps/api` | Aberto |
| Média | Deploy da API em produção | Render/Railway/Fly | Aberto |
| Média | ESLint + Prettier no workspace da API | `apps/api` | Aberto |
| Média | Testes do frontend (Jest + `next/jest`) | `apps/web` | Aberto |
| Média | CI no GitHub Actions (`lint` + `typecheck` + `test` + `build`) | raiz | Aberto |
| Baixa | Preencher redes sociais no `siteConfig` | `apps/web/src/data/site.ts` | Aberto |

## Concluído nesta etapa

- [x] Monorepo npm workspaces (`apps/web`, `apps/api`, `packages/contracts`).
- [x] API Express em camadas com `GET /health`.
- [x] Testes Jest/Supertest da API (7/7 passando: health + forms).
- [x] `.env` local da API criado (gitignored).
- [x] `AGENTS.md`/`CLAUDE.md` adicionados ao `.gitignore`.
- [x] Documentação em `README.md` e `docs/`.
- [x] `npm run dev` na raiz sobe web (`:3000`) + API (`:3001`) juntos via `concurrently` (scripts `dev:web`/`dev:api`).
- [x] Endpoints da API: `POST /contacts`, `POST /enrollments`, `POST /sponsors` (validação Zod + repositório em memória).
- [x] Formulários do web enviando para a API (`apps/web/src/lib/api.ts` + `ContactForm`, `MatriculaForm`, `SponsorForm`).
- [x] Lint do web limpo (erro `Navbar.tsx:16` corrigido + 12 warnings `<img>` → `next/image` resolvidos).

## Como atualizar este arquivo

Ao iniciar uma tarefa, mova-a para "em andamento". Ao concluir, mova para "concluído" com a referência do commit. Os relatórios por fase vivem em `docs/reports/`.
