# Quinto Set — Escolinha de Vôlei

Site institucional da **Quinto Set Escolinha de Vôlei** (Cesarão, Rio de Janeiro), construído com Next.js, e API de backend em Node.js/Express. Monorepo gerenciado com npm workspaces.

> **Tagline:** "Do Cesarão para o mundo." — O quinto set é o momento em que tudo pode mudar: é o set da decisão.

## Stack

| Camada | Tecnologia | Pasta |
| --- | --- | --- |
| **Web** | Next.js 16 · React 19 · TypeScript 7 · Tailwind CSS 4 | `apps/web` |
| **API** | Express 5 · TypeScript 7 · Drizzle ORM · tsyringe · pino | `apps/backend` |
| **Contracts** | Zod 4 (schemas compartilhados web ↔ api) | `packages/contracts` |
| **Testes API** | Jest 30 · @swc/jest · Supertest | `apps/backend/tests` |

## Estrutura

```
.
├── apps/
│   ├── web/          # Site institucional (Next.js)
│   └── api/          # API REST (Express, arquitetura em camadas)
├── packages/
│   └── contracts/    # Schemas Zod compartilhados + tipos inferidos
├── docs/             # Documentação técnica do projeto
├── package.json      # Workspaces + scripts raiz
└── package-lock.json
```

## Pré-requisitos

- Node.js 22+ (npm 10+)
- PostgreSQL 16+ (opcional — necessário apenas para a API com banco)

## Como rodar

```bash
# instala todas as dependências dos workspaces (hoisted na raiz)
npm install

# web + API em modo dev, juntos (web: http://localhost:3000, API: http://localhost:3001)
npm run dev

# ou apenas um deles
npm run dev:web   # só o site web
npm run dev:backend   # só a API (tsx watch)
```

### API com banco de dados (opcional)

```bash
# sobe o Postgres local (porta 5432)
docker compose -f apps/backend/docker-compose.yml up -d
```

Variáveis de ambiente da API: copie `apps/backend/.env.example` para `apps/backend/.env` e ajuste os valores (o arquivo `.env` é ignorado pelo git).

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Web + API em modo dev, juntos (concurrently) |
| `npm run dev:web` | Só o site web (`next dev`, porta 3000) |
| `npm run dev:backend` | Só a API (tsx watch, porta 3001) |
| `npm run build` | Build de produção do web |
| `npm run start` | Serve o build de produção do web |
| `npm run lint` | ESLint em todos os workspaces |
| `npm run test` | Jest em todos os workspaces (com `--if-present`) |

Por workspace:

```bash
npm run dev --workspace @quinto-set/web
npm run test --workspace @quinto-set/backend
npm run build --workspace @quinto-set/backend   # compila TS -> dist/
npm run typecheck --workspace @quinto-set/backend
```

## Endpoints

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/health` | Health check (status, timestamp, uptime) |
| `POST` | `/contacts` | Contato via site (name, email, phone, subject?, message) |
| `POST` | `/enrollments` | Matrícula (student + guardian) |
| `POST` | `/sponsors` | Patrocínio (company, segment, contactName, phone, email, support?, message) |

Os endpoints `POST` validam o corpo com os schemas de `@quinto-set/contracts` (Zod). Respostas:

- `201` → `{ "id": "<uuid>", "type": "contact|enrollment|sponsor", "createdAt": "<ISO>" }`
- `400` → `{ "error": "invalid_input", "issues": [{ "path", "message" }] }`
- `500` → `{ "error": "internal_server_error" }`

Exemplo de resposta de health:

```json
{ "status": "ok", "timestamp": "2026-08-13T16:06:23.921Z", "uptime": 4.03 }
```

> **Persistência:** os dados dos formulários ficam em memória enquanto a API estiver rodando (troca para Postgres via Drizzle é o próximo passo). A variável `CORS_ORIGIN` controla as origens liberadas (default `*`).

## Testes

```bash
npm run test --workspace @quinto-set/backend
```

## Deploy

- **Vercel:** Root Directory do projeto deve apontar para `apps/web`.
- Veja [docs/deploy-guide.md](docs/deploy-guide.md) para o passo a passo.

## Documentação

- [Contexto do projeto](docs/project-context.md)
- [Arquitetura geral](docs/architecture.md)
- [Arquitetura do backend](docs/backend-architecture.md)
- [Decisões (ADR)](docs/decisions.md)
- [Roadmap](docs/roadmap.md)
- [Todo / tarefas](docs/todo.md)
- [Guia de desenvolvimento](docs/dev-guide.md)
- [Guia de deploy](docs/deploy-guide.md)
- [Relatórios por fase](docs/reports/)
- [Changelog](docs/changelog/)

## Licença

Projeto privado — todos os direitos reservados à Quinto Set.
