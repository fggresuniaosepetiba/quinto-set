# Roadmap

> Visão de curto e médio prazo. **Concluído** = entregue e commitado. Itens sem marcação estão planejados.

## Concluído

- [x] **Fase 1 — Seção "Futuro" com planetas CSS** (`feat: replace orbit dots with css solar system planets`).
  - 6 planetas com gradientes CSS orbitando (16s–60s, mesmo sentido).
- [x] **Fase 2 — Migração para monorepo** (`refactor: migrate web app into apps/web workspace`).
  - Web em `apps/web`, workspaces raiz, `packages/contracts` criado.
- [x] **Fase 3 — Scaffold da API** (`feat: add express api with health endpoint and jest tests`).
  - Express 5 + TS 7 em camadas, tsyringe, pino, Zod, endpoint `GET /health`, teste Jest/Supertest 1/1 passando.
- [x] **Fase 4 — Documentação** (`docs/README/…`).
  - README, `docs/*`, relatórios por fase, changelog.
- [x] **`npm run dev` unificado** — web + API em paralelo via `concurrently` (root `dev`; novos `dev:web`/`dev:backend`).
- [x] **Endpoints de formulários** — `POST /contacts`, `POST /enrollments`, `POST /sponsors` com validação Zod (400 `invalid_input`) e persistência em memória (repositório com interface para trocar por Drizzle).
- [x] **Web → API** — formulários de matrícula/contato/patrocínio enviam para a API (`src/lib/api.ts` + `NEXT_PUBLIC_API_URL`).
- [x] **Lint do web limpo** — erro `Navbar.tsx:16` corrigido + 12 warnings `<img>` → `next/image`.
- [x] **Deploy da API + banco em produção** — API no Render (`https://quinto-set-api.onrender.com`) e Postgres no Neon; `DATABASE_URL` com override e `DATABASE_URL_LOCAL`/`DATABASE_URL_PROD` (PRs #10/#11); `GET /health` → `{"status":"ok"}`.
- [x] **Registrar/confirmar domínio** — confirmado `quintoset.vercel.app` e `siteConfig.url` atualizado (ADR-007 resolvida).
- [x] **Root Directory** = `apps/web` no painel Vercel (feito pelo usuário).
- [x] **Persistência no Postgres** via Drizzle ORM (`PostgresLeadRepository` + migrations; tabelas `leads`/`admins`; PR #5).
- [x] **ESLint + Prettier** no workspace da API (format:check no CI).
- [x] **Testes do frontend** — Jest + `next/jest` + Testing Library (49/49 passando; PR #4).
- [x] **Configurar GitHub Actions** — CI com `lint`, `typecheck`, `test`, `build` (`.github/workflows/ci.yml`).
- [x] **Admin login + painel de leads** — cookie httpOnly, proteção das rotas e export Excel (PR #6).

## Próximo (curto prazo)

- [ ] **Preencher redes sociais** no `siteConfig` (Instagram, TikTok, YouTube).

## Longo prazo (ideias)

- [ ] Evoluir a área administrativa (gerência de contatos/patrocinadores, não só leads).
- [ ] Notificações por e-mail ao receber novas inscrições.
- [ ] Galeria integrada com upload.