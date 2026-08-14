# Relatório 005 — Formulários → API (endpoints + integração web)

- **Data:** 2026-08-14
- **Status:** Concluído
- **Branch:** `feat/backend-api`
- **Commits:** a definir (commits desta fase)

## Objetivo

Implementar os endpoints de formulários na API e conectar os formulários do web a eles, fechando o fluxo ponta a ponta (web → HTTP → validação → persistência).

## Entregas

### API (`apps/api`)

| Arquivo | Responsabilidade |
| --- | --- |
| `src/domain/entities/lead.ts` | `LeadType` (`contact`/`enrollment`/`sponsor`), `LeadData`, `Lead` |
| `src/application/services/lead-service.ts` | `LeadService.submit(type, input)`: valida com schemas de contracts e salva |
| `src/application/repositories/lead-repository.ts` | Interface `LeadRepository` (`save`, `list`) |
| `src/application/repositories/in-memory-lead-repository.ts` | Implementação em memória (troca futura por Drizzle) |
| `src/interfaces/http/controllers/form-controller.ts` | `POST` → `201 {id, type, createdAt}` |
| `src/interfaces/http/routes/form-router.ts` | Rotas `/contacts`, `/enrollments`, `/sponsors` |
| `src/interfaces/http/middleware/error-handler.ts` | ZodError → 400 `invalid_input`; demais → 500 (pino) |
| `src/interfaces/http/app.ts` | CORS (`CORS_ORIGIN`), `express.json()`, rotas, error handler |
| `src/config/container.ts` | Registro de `LeadRepository`/`LeadService` |
| `src/config/env.ts` + `.env.example` | Env `CORS_ORIGIN` (default `*`) |
| `tests/forms.test.ts` | Supertest: 6 testes de formulários |

### Contratos (`packages/contracts`)

- `contactSchema`: `subject` agora opcional.
- `sponsorSchema`: `city`/`state` opcionais; `support` opcional (alinhado ao formulário real).

### Web (`apps/web`)

- `src/lib/api.ts`: `postLead<T>()` (fetch → `NEXT_PUBLIC_API_URL`; erros `invalid_input` → mensagem amigável).
- `ContactForm`, `MatriculaForm`, `SponsorForm`: enviam para a API com estados de envio/erro e máscara de telefone.
- `.env.example`: `NEXT_PUBLIC_API_URL` (default `http://localhost:3001`).

### Lint do web

- `Navbar.tsx:16` (`set-state-in-effect`): corrigido com ajuste de estado durante render (`prevPathname`).
- 12 warnings `<img>` → `next/image`: `Footer`, `SponsorsMarquee`, `Formation` (4×), `Categories`, `Purpose`, `Gallery`, `sobre`, `competicoes`, `treinamentos`.

## Evidências (verificadas)

- `npm run test` → 2 suites, **7/7 testes passando** (health + forms).
- `npm run typecheck` → OK em `@quinto-set/api` e `@quinto-set/web`.
- `npm run lint --workspace @quinto-set/web` → **0 erros, 0 warnings**.
- `npm run build --workspace @quinto-set/web` → build Next.js 16.3.0 OK, 9 páginas estáticas.
- Smoke test real (API rodando): `POST /contacts` válido → **201** com `{id, type, createdAt}`; `POST` inválido → **400**; `GET /health` → `{"status":"ok",...}`.

## Pendências registradas (não bloqueiam)

- Persistência real: `PostgresLeadRepository` com Drizzle + migrations (hoje em memória).
- Deploy da API em produção + `CORS_ORIGIN` do domínio do site.
- Root Directory = `apps/web` na Vercel (ação manual).
- ESLint/Prettier da API; testes do frontend; CI GitHub Actions.
