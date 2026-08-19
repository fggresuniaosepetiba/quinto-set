# Arquitetura do Backend (API)

> **Status:** Em desenvolvimento (endpoints de formulários + validação Zod + persistência em memória)
> **Última atualização:** 2026-08-14

## Stack

| Componente | Escolha | Por quê |
| --- | --- | --- |
| Runtime | Node.js 22+ (ESM, `"type": "module"`) | Padrão atual, suporte a top-level await |
| Framework HTTP | Express 5.2 | Ecossistema maduro, simplicidade |
| Linguagem | TypeScript 7 (compilado com `tsc`) | Tipagem estática, contrato com contracts |
| ORM | Drizzle ORM 0.45 (com `drizzle-kit`) | Type-safe, migrations SQL, leve |
| Banco | PostgreSQL (driver `pg`) | Relacional, padrão de mercado |
| DI | tsyringe 4.10 | Injeção de dependência leve, decorators |
| Log | pino 10 | Log estruturado JSON, rápido |
| Validação | Zod 4 | Mesmos schemas do frontend (`@quinto-set/contracts`) |
| Testes | Jest 30 + `@swc/jest` + Supertest | Framework único (escolha do projeto), suporte nativo a ESM/decorators |

## Estrutura em camadas

```
apps/backend/
├── src/
│   ├── config/                      # Infra de configuração
│   │   ├── env.ts                   #   Validação de variáveis de ambiente (Zod)
│   │   ├── logger.ts                #   Instância pino
│   │   └── container.ts             #   Registro tsyringe (DI) + reflect-metadata
│   ├── domain/                      # Entidades e tipos do domínio (puro, sem frameworks)
│   │   └── entities/
│   │       ├── service-status.ts    #   Tipo ServiceStatus
│   │       └── lead.ts              #   LeadType, LeadData, Lead (contato/matrícula/patrocínio)
│   ├── application/                 # Casos de uso / serviços de aplicação
│   │   ├── services/
│   │   │   ├── health-service.ts    #   HealthService (@injectable)
│   │   │   └── lead-service.ts      #   LeadService — valida com contracts e salva
│   │   └── repositories/
│   │       ├── lead-repository.ts   #   Interface LeadRepository (save/list)
│   │       └── in-memory-lead-repository.ts  #   Implementação em memória
│   └── interfaces/                  # Adaptadores do mundo externo
│       └── http/
│           ├── app.ts               #   createApp(): Express app (cors, json, rotas, erro)
│           ├── middleware/
│           │   └── error-handler.ts #   ZodError → 400; demais → 500 (pino)
│           ├── controllers/
│           │   ├── health-controller.ts
│           │   └── form-controller.ts #   POST /contacts|enrollments|sponsors
│           └── routes/
│               ├── health-router.ts
│               └── form-router.ts
├── tests/
│   ├── health.test.ts               # Teste do endpoint /health
│   └── forms.test.ts                # Testes dos 3 endpoints de formulários
├── dist/                            # Build (gitignored)
├── .env.example                     # Modelo de variáveis de ambiente
├── docker-compose.yml               # Postgres local (17-alpine)
├── jest.config.cjs
├── tsconfig.json                    # Typecheck (noEmit) + Jest
├── tsconfig.build.json              # Build de produção (emite dist/)
└── package.json
```

## Fluxo de uma requisição

```
HTTP GET /health
   │
   ▼
createApp() → healthRouter(controller)     [interfaces/http]
   │ router.get("/health", controller.check)
   ▼
HealthController.check(req, res)           [interfaces/http/controllers]
   │ injeta HealthService via tsyringe
   ▼
HealthService.check()                      [application/services]
   │ parseia payload com healthResponseSchema (Zod, de @quinto-set/contracts)
   ▼
ServiceStatus { status, timestamp, uptime }  [domain/entities]
   │
   ▼
res.status(200).json(...)                  → resposta JSON
```

```
HTTP POST /contacts | /enrollments | /sponsors
   │
   ▼
createApp() → formRouter(controller)       [interfaces/http]
   │ router.post("/contacts", controller.create("contact", ...))
   ▼
FormController.create(type, req, res, next)  [interfaces/http/controllers]
   │ injeta LeadService via tsyringe
   ▼
LeadService.submit(type, req.body)         [application/services]
   │ valida com o schema Zod de @quinto-set/contracts (contactSchema, enrollmentSchema, sponsorSchema)
   │   — inválido → ZodError → errorHandler → 400 { error: "invalid_input", issues }
   ▼
Lead { id (uuid), type, data, createdAt }  [domain/entities/lead]
   │
   ▼
LeadRepository.save(lead)                  [application/repositories — em memória]
   │
   ▼
res.status(201).json({ id, type, createdAt })  → resposta JSON
```

## Injeção de dependência (tsyringe)

O container é montado em `src/config/container.ts`:

```ts
container.register("HealthService", { useClass: HealthService });
container.register("LeadRepository", { useClass: InMemoryLeadRepository });
container.register("LeadService", { useClass: LeadService });
```

`HealthController` recebe `HealthService` e `FormController` recebe `LeadService` por injeção via `@inject(...)`. Requer `reflect-metadata` (importado em `container.ts` e `env.ts`), `experimentalDecorators` e `emitDecoratorMetadata` no `tsconfig.json`.

> **Persistência:** hoje os leads ficam em memória (`InMemoryLeadRepository`). Para persistir no Postgres, basta criar `PostgresLeadRepository` (Drizzle) e trocar o `useClass` no container — a interface `LeadRepository` e o `LeadService` não mudam.

## Variáveis de ambiente (validadas com Zod)

| Variável | Default | Descrição |
| --- | --- | --- |
| `NODE_ENV` | `development` | `development` \| `test` \| `production` |
| `PORT` | `3001` | Porta HTTP da API |
| `DATABASE_URL_LOCAL` | `postgres://quinto_set:quinto_set@localhost:5433/quinto_set` | URL do Postgres (usada quando `NODE_ENV != "production"`) |
| `DATABASE_URL_PROD` | `postgres://quinto_set:quinto_set@localhost:5433/quinto_set` | URL do Postgres (usada quando `NODE_ENV = "production"`) |
| `DATABASE_URL` | — | Override com prioridade sobre `DATABASE_URL_LOCAL`/`DATABASE_URL_PROD` (ex.: conexão injetada pela plataforma) |
| `LOG_LEVEL` | `info` | Nível do pino |
| `CORS_ORIGIN` | `*` | Origens liberadas no CORS; `*` libera qualquer origem; separar múltiplas com vírgula |

Se a validação falhar, o processo aborta com mensagem de erro (fail-fast).

## Banco de dados

- `docker-compose.yml` sobe `postgres:17-alpine` na porta 5432 com banco/usuario/senha `quinto_set`.
- Drizzle ORM está instalado e pronto para definição de esquemas/migrations, mas **nenhuma tabela foi criada ainda**; os leads são persistidos em memória (ver [Roadmap](roadmap.md) e [backend-todo](backend-todo.md)).

## Testes

```bash
npm run test --workspace @quinto-set/backend
```

O Jest usa `@swc/jest` para transformar TypeScript (com suporte a decorators), e o `moduleNameMapper` remove o sufixo `.js` dos imports relativos (compat ESM). Testes atuais (7/7 passando):

- `GET /health` → `200` com corpo `{ status: "ok", timestamp: <ISO>, uptime: <number> }`.
- `POST /contacts`, `POST /enrollments`, `POST /sponsors` → `201` com `{ id, type, createdAt }` em dados válidos; `400 { error: "invalid_input", issues }` em dados inválidos.

## Build e execução

```bash
npm run build --workspace @quinto-set/backend   # tsc -p tsconfig.build.json → dist/
npm run start --workspace @quinto-set/backend   # node dist/index.js
```

Comportamento observado (evidência):

```
$ node dist/index.js   # com PORT=3099
{"status":"ok","timestamp":"2026-08-13T16:06:23.921Z","uptime":4.03}
```
