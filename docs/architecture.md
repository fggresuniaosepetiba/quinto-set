# Arquitetura — Visão Geral

> **Status:** Em desenvolvimento
> **Última atualização:** 2026-08-14

## Modelo: Monorepo (npm workspaces)

O repositório é um monorepo com npm workspaces. Todas as dependências são **hoisted na raiz** (`node_modules`), e cada workspace tem seu `node_modules` local apenas quando há conflito de versão (ex.: TypeScript 7 nos workspaces vs TypeScript 6.0.3 transitivo do `typescript-eslint` na raiz).

```
quinto-set/
├── apps/
│   ├── web/        @quinto-set/web     — Next.js 16, React 19, Tailwind 4
│   └── api/        @quinto-set/api     — Express 5, Drizzle, tsyringe, pino
├── packages/
│   └── contracts/  @quinto-set/contracts — Zod 4 schemas compartilhados
├── docs/                                — documentação
└── package.json                         — workspaces ["apps/*", "packages/*"]
```

## Fluxo de dados (atual)

```
[Web: apps/web]  --chama--  [API: apps/api]  --persiste--  [em memória (Postgres: futuro)]
       |                     (camadas, ver backend-architecture)
       |
       └── usa schemas Zod de [packages/contracts] para validar formulários
```

Os formulários do site (contato, matrícula, patrocínio) chamam `POST /contacts`, `POST /enrollments` e `POST /sponsors` na API, que valida com os schemas de `packages/contracts` e salva em memória (`InMemoryLeadRepository`). A persistência em Postgres via Drizzle ORM está preparada (dependências e docker-compose prontos), mas os modelos ainda não foram definidos — ver [Roadmap](roadmap.md).

## Camadas do projeto web (`apps/web`)

| Área | Conteúdo |
| --- | --- |
| `src/app/` | Rotas App Router (páginas + layout) |
| `src/components/` | Componentes React: `home/`, `layout/`, `equipe/`, `gallery/`, `matricula/`, `patrocine/`, `ui/` |
| `src/data/` | Dados estáticos (site, diretores, patrocinadores, imagens) |
| `src/lib/` | Utilitários (validação, helpers, `useFormState`) |

## Camadas do projeto API (`apps/api`)

```
src/
├── config/        env (Zod), logger (pino), container (tsyringe DI)
├── domain/        entidades/tipos de domínio (ex.: ServiceStatus, Lead)
├── application/   casos de uso / serviços (ex.: HealthService, LeadService) + repositórios (LeadRepository)
└── interfaces/    camada externa
    └── http/      Express: app, middleware, rotas, controllers
```

Detalhes em [backend-architecture.md](backend-architecture.md).

## Tipagem compartilhada (`packages/contracts`)

Pacote privado consumido por web e API. Contém schemas Zod v4 e tipos inferidos:

- `healthResponseSchema` / `HealthResponse`
- `phoneSchema`, `emailSchema`
- `enrollmentSchema` / `Enrollment` (aluno + responsável)
- `contactSchema` / `Contact` (`subject` opcional)
- `sponsorSchema` / `Sponsor` (`city`/`state` opcionais, `support` opcional)

O `package.json` do contracts aponta `main`/`types`/`exports` direto para `./src/index.ts` (sem build) — consumido em TS pelo `moduleResolution: bundler`/`NodeNext`.

## Configurações de build

- **Web:** `next build` (App Router, 9 páginas estáticas). Turbopack com `workerThreads`.
- **API:** `tsc -p tsconfig.build.json` → `dist/`, executado com `node dist/index.js` (ESM puro, imports com sufixo `.js`, sem path aliases).
- **Contracts:** sem build (consumido como TS fonte).

## Testes

- **API:** Jest 30 + `@swc/jest` + Supertest (`apps/api/tests/health.test.ts` e `forms.test.ts` — 7 testes).
- **Web:** lint via ESLint (`eslint-config-next` core-web-vitals) limpo. Testes de componente ainda não configurados (ver [frontend-todo](frontend-todo.md)).
