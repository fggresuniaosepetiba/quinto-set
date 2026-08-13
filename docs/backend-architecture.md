# Arquitetura do Backend (API)

> **Status:** Em desenvolvimento (scaffold funcional)
> **Última atualização:** 2026-08-13

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
apps/api/
├── src/
│   ├── config/                      # Infra de configuração
│   │   ├── env.ts                   #   Validação de variáveis de ambiente (Zod)
│   │   ├── logger.ts                #   Instância pino
│   │   └── container.ts             #   Registro tsyringe (DI) + reflect-metadata
│   ├── domain/                      # Entidades e tipos do domínio (puro, sem frameworks)
│   │   └── entities/
│   │       └── service-status.ts    #   Tipo ServiceStatus
│   ├── application/                 # Casos de uso / serviços de aplicação
│   │   └── services/
│   │       └── health-service.ts    #   HealthService (@injectable)
│   └── interfaces/                  # Adaptadores do mundo externo
│       └── http/
│           ├── app.ts               #   createApp(): Express app
│           ├── controllers/
│           │   └── health-controller.ts
│           └── routes/
│               └── health-router.ts
├── tests/
│   └── health.test.ts               # Teste do endpoint /health
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

## Injeção de dependência (tsyringe)

O container é montado em `src/config/container.ts`:

```ts
container.register("HealthService", { useClass: HealthService });

export function resolveHealthController(): HealthController {
  return container.resolve(HealthController);
}
```

`HealthController` recebe `HealthService` por injeção via `@inject("HealthService")`. Requer `reflect-metadata` (importado em `container.ts` e `env.ts`), `experimentalDecorators` e `emitDecoratorMetadata` no `tsconfig.json`.

## Variáveis de ambiente (validadas com Zod)

| Variável | Default | Descrição |
| --- | --- | --- |
| `NODE_ENV` | `development` | `development` \| `test` \| `production` |
| `PORT` | `3001` | Porta HTTP da API |
| `DATABASE_URL` | `postgres://quinto_set:quinto_set@localhost:5432/quinto_set` | URL do Postgres |
| `LOG_LEVEL` | `info` | Nível do pino |

Se a validação falhar, o processo aborta com mensagem de erro (fail-fast).

## Banco de dados

- `docker-compose.yml` sobe `postgres:17-alpine` na porta 5432 com banco/usuario/senha `quinto_set`.
- Drizzle ORM está instalado e pronto para definição de esquemas/migrations, mas **nenhuma tabela foi criada ainda** (ver [Roadmap](roadmap.md)).

## Testes

```bash
npm run test --workspace @quinto-set/api
```

O Jest usa `@swc/jest` para transformar TypeScript (com suporte a decorators), e o `moduleNameMapper` remove o sufixo `.js` dos imports relativos (compat ESM). Teste atual:

- `GET /health` → `200` com corpo `{ status: "ok", timestamp: <ISO>, uptime: <number> }`.

## Build e execução

```bash
npm run build --workspace @quinto-set/api   # tsc -p tsconfig.build.json → dist/
npm run start --workspace @quinto-set/api   # node dist/index.js
```

Comportamento observado (evidência):

```
$ node dist/index.js   # com PORT=3099
{"status":"ok","timestamp":"2026-08-13T16:06:23.921Z","uptime":4.03}
```
