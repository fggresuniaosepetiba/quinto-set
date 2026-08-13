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
- [x] **`npm run dev` unificado** — web + API em paralelo via `concurrently` (root `dev`; novos `dev:web`/`dev:api`).

## Próximo (curto prazo)

- [ ] **Resolver lint do web** — 1 erro real em `apps/web/src/components/layout/Navbar.tsx:16` (`setState` síncrono em `useEffect` — regra `react-hooks/set-state-in-effect`) + 12 warnings (ex.: `<img>` no `Footer.tsx` → usar `next/image`).
- [ ] **Configurar deploy da API** (Render/Railway/Fly ou similar) e o banco Postgres em produção.
- [ ] **Registrar/confirmar domínio** `quintoset.com.br` na Vercel e atualizar `siteConfig.url` (ADR-007).

## Médio prazo

- [ ] **Modelos de dados no Postgres** via Drizzle ORM (schema `users/leads/inscrições`).
- [ ] **Endpoints REST de formulários**: `POST /enrollments`, `POST /contacts`, `POST /sponsors` (schemas já existem em `packages/contracts`).
- [ ] **Envio de formulários do web para a API** (hoje os formulários validam no cliente apenas).
- [ ] **Testes do frontend**: Jest + `next/jest` + Testing Library (componentes, formulários).
- [ ] **Configurar GitHub Actions**: CI com `lint`, `typecheck`, `test`, `build`.
- [ ] **Preencher redes sociais** no `siteConfig` (Instagram, TikTok, YouTube).

## Longo prazo (ideias)

- [ ] Área administrativa (painel para gerência de inscrições/patrocinadores).
- [ ] Notificações por e-mail ao receber novas inscrições.
- [ ] Galeria integrada com upload.
