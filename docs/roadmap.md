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

## Próximo (curto prazo)

- [ ] **Configurar deploy da API** (Render/Railway/Fly ou similar) e o banco Postgres em produção.
- [x] **Registrar/confirmar domínio** — confirmado `quintoset.vercel.app` e `siteConfig.url` atualizado (ADR-007 resolvida).
- [x] **Root Directory** = `apps/web` no painel Vercel (feito pelo usuário).

## Médio prazo

- [ ] **Persistência no Postgres** via Drizzle ORM (`PostgresLeadRepository` + migrations; hoje em memória).
- [x] **ESLint + Prettier** no workspace da API (format:check no CI).
- [ ] **Testes do frontend**: Jest + `next/jest` + Testing Library (componentes, formulários).
- [ ] **Configurar GitHub Actions**: CI com `lint`, `typecheck`, `test`, `build`.
- [ ] **Preencher redes sociais** no `siteConfig` (Instagram, TikTok, YouTube).

## Longo prazo (ideias)

- [ ] Área administrativa (painel para gerência de inscrições/patrocinadores).
- [ ] Notificações por e-mail ao receber novas inscrições.
- [ ] Galeria integrada com upload.
