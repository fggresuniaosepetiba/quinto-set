# Backend — Todo

> Pendências específicas da API (`apps/api`). Última atualização: 2026-08-13.

## Feito

- [x] Scaffold Express 5 + TypeScript em camadas (`config`, `domain`, `application`, `interfaces`).
- [x] `GET /health` com resposta validada por `@quinto-set/contracts`.
- [x] DI com tsyringe + reflect-metadata.
- [x] Log estruturado com pino.
- [x] Validação de env com Zod (fail-fast).
- [x] Jest + @swc/jest + Supertest (1 teste passando).
- [x] Docker Compose para Postgres local.

## Pendências

### Banco de dados
- [ ] Definir modelos Drizzle (inscrições, contatos, patrocinadores).
- [ ] Gerar migrations (`drizzle-kit generate`) e aplicá-las (`drizzle-kit migrate`).

### Endpoints
- [ ] `POST /enrollments` — matrícula (schema já existe em contracts).
- [ ] `POST /contacts` — contato (schema já existe).
- [ ] `POST /sponsors` — patrocínio (schema já existe).
- [ ] Persistência no Postgres via Drizzle.

### Qualidade
- [ ] Middleware de tratamento de erros (centralizado).
- [ ] Validação de entrada em rotas (Zod, com 400).
- [ ] CORS (liberar origem do web).
- [ ] ESLint + Prettier no workspace da API.
- [ ] Mais testes (unitários de serviços + integração com Supertest).

### Operacional
- [ ] Deploy da API (Render/Railway/Fly).
- [ ] CI no GitHub Actions (`lint` + `typecheck` + `test` + `build`).
