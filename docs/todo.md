# Todo — Tarefas do projeto

> Status geral e pendências atuais. Última atualização: 2026-08-14.

## Pendências ativas

| Prioridade | Tarefa | Onde | Status |
| --- | --- | --- | --- |
| Alta | Vercel: Root Directory = `apps/web` | Painel Vercel (ação manual) | Concluído pelo usuário |
| Média | Definir domínio real e atualizar `siteConfig.url` | `apps/web/src/data/site.ts` | Concluído (ADR-007 resolvida) |
| Média | Persistência dos formulários no Postgres (hoje em memória) | `apps/backend` | Aberto |
| Média | Deploy da API em produção | Render/Railway/Fly | Aberto |
| Média | ESLint + Prettier no workspace da API | `apps/backend` | Concluído (format:check no CI) |
| Média | Testes do frontend (Jest + `next/jest`) | `apps/web` | Aberto |
| Média | CI no GitHub Actions (`lint` + `typecheck` + `test` + `build`) | raiz | Aberto |
| Baixa | Preencher redes sociais no `siteConfig` | `apps/web/src/data/site.ts` | Aberto |

## Concluído nesta etapa

- [x] Monorepo npm workspaces (`apps/web`, `apps/backend`, `packages/contracts`).
- [x] API Express em camadas com `GET /health`.
- [x] Testes Jest/Supertest da API (7/7 passando: health + forms).
- [x] `.env` local da API criado (gitignored).
- [x] `AGENTS.md`/`CLAUDE.md` adicionados ao `.gitignore`.
- [x] Documentação em `README.md` e `docs/`.
- [x] `npm run dev` na raiz sobe web (`:3000`) + API (`:3001`) juntos via `concurrently` (scripts `dev:web`/`dev:backend`).
- [x] Endpoints da API: `POST /contacts`, `POST /enrollments`, `POST /sponsors` (validação Zod + repositório em memória).
- [x] Formulários do web enviando para a API (`apps/web/src/lib/api.ts` + `ContactForm`, `MatriculaForm`, `SponsorForm`).
- [x] Lint do web limpo (erro `Navbar.tsx:16` corrigido + 12 warnings `<img>` → `next/image` resolvidos).
- [x] Testes do frontend (Jest + `next/jest`): 49/49 passando.
- [x] CI no GitHub Actions (`lint` + `typecheck` + `test` + `build`).
- [x] Vercel: Root Directory = `apps/web` (feito pelo usuário).
- [x] Domínio real confirmado: `https://quintoset.vercel.app` (ADR-007 resolvida).
- [x] Setinha do Hero rola direto para o footer.

## Como atualizar este arquivo

Ao iniciar uma tarefa, mova-a para "em andamento". Ao concluir, mova para "concluído" com a referência do commit. Os relatórios por fase vivem em `docs/reports/`.
