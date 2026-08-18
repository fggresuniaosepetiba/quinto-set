# Backend — Todo

> Pendências específicas da API (`apps/backend`). Última atualização: 2026-08-14.

## Feito

- [x] Scaffold Express 5 + TypeScript em camadas (`config`, `domain`, `application`, `interfaces`).
- [x] `GET /health` com resposta validada por `@quinto-set/contracts`.
- [x] DI com tsyringe + reflect-metadata.
- [x] Log estruturado com pino.
- [x] Validação de env com Zod (fail-fast), incluindo `CORS_ORIGIN`.
- [x] Jest + @swc/jest + Supertest (7 testes passando: health + forms).
- [x] Docker Compose para Postgres local.
- [x] `POST /contacts`, `POST /enrollments`, `POST /sponsors` (201 com `{id, type, createdAt}`; 400 `invalid_input`).
- [x] Persistência em memória via `LeadRepository`/`InMemoryLeadRepository` (interface pronta para trocar por Drizzle).
- [x] CORS configurável (`CORS_ORIGIN`, default `*`).
- [x] Middleware centralizado de tratamento de erros (ZodError → 400; demais → 500 com pino).

## Pendências

### Banco de dados
- [ ] Implementar `PostgresLeadRepository` com Drizzle e trocar o registro no container.
- [ ] Definir modelos Drizzle (inscrições, contatos, patrocinadores).
- [ ] Gerar migrations (`drizzle-kit generate`) e aplicá-las (`drizzle-kit migrate`).

### Qualidade
- [x] ESLint + Prettier no workspace da API (format:check no CI).
- [ ] Mais testes (unitários de serviços + integração com Supertest).

### Operacional
- [ ] Deploy da API (Render/Railway/Fly) e Postgres gerenciado em produção (`DATABASE_URL`).
- [ ] CI no GitHub Actions (`lint` + `typecheck` + `test` + `build`).
