# Guia de Desenvolvimento

> Como trabalhar neste projeto no dia a dia. Última atualização: 2026-08-14.

## Setup inicial

```bash
npm install        # instala tudo (hoisted na raiz)
npm run dev        # web em http://localhost:3000 + API em http://localhost:3001 (juntos)
```

Para rodar apenas um deles:

```bash
npm run dev:web    # só o site web (porta 3000)
npm run dev:backend    # só a API (porta 3001)
```

Para a API com banco local:

```bash
docker compose -f apps/backend/docker-compose.yml up -d
cp apps/backend/.env.example apps/backend/.env   # e ajuste se necessário
npm run dev:backend                          # API em http://localhost:3001
```

> O `.env` não é commitado. Só o `.env.example` é versionado.

## Comandos por workspace

| Ação | Web (`@quinto-set/web`) | API (`@quinto-set/backend`) |
| --- | --- | --- |
| Dev | `npm run dev --workspace @quinto-set/web` | `npm run dev:backend` (raiz) |
| Build | `npm run build --workspace @quinto-set/web` | `npm run build --workspace @quinto-set/backend` |
| Start | `npm run start --workspace @quinto-set/web` | `npm run start --workspace @quinto-set/backend` |
| Typecheck | `npm run typecheck --workspace @quinto-set/web` | `npm run typecheck --workspace @quinto-set/backend` |
| Testes | — (a configurar) | `npm run test --workspace @quinto-set/backend` |
| Lint | `npm run lint --workspace @quinto-set/web` | — (a configurar) |

Na raiz: `npm run dev` (web + API juntos via `concurrently`), `npm run lint`, `npm run test`, `npm run build`, `npm run start` rodam agregados nos workspaces.

## Convenções de código

- **Commits:** Conventional Commits **em inglês** (`feat:`, `fix:`, `refactor:`, `chore:`, ...). Ver ADR-006.
- **Idioma do código:** código e mensagens internas em português nos textos de UI; nomes de variáveis/identificadores em inglês.
- **Validação:** sempre que houver dados de formulário, usar os schemas de `packages/contracts` (fonte única de verdade).
- **API — imports:** sempre relativos com sufixo `.js` (`../../config/env.js`) — ESM puro, sem aliases. Não reintroduzir `baseUrl`/`@/*` na API (ADR-002).
- **Web — imports:** alias `@/*` → `src/*` (Next.js resolve nativamente).

## Git e Pull Requests

- **Branches de feature:** trabalhe sempre em uma branch (ex.: `feat/...`); `main` só recebe via PR.
- **Criação do PR:** o agente (opencode) cria via `gh pr create --base main --head <branch>` com título/corpo descritivos.
- **Revisão:** o usuário revisa o diff no GitHub antes de mergear — nenhum merge é feito sem revisão.
- **Estratégia de merge padrão:** **Rebase and merge** (história linear, preserva os commits convencionais). Squash fica reservado para PRs com commits bagunçados. Ver ADR-013.
- **Branches pós-merge:** mantidas local e remota enquanto houver pendências associadas; deletar só com consentimento do usuário.
- **Commits:** Conventional Commits em inglês (ADR-006).

## CSS / Tailwind

- Tailwind v4, configuração CSS-first em `apps/web/src/app/globals.css`.
- **Não existe** `tailwind.config.js` — customizações de tema/keyframes vão no CSS global.
- Animações orbitais usam tokens `--animate-orbit-*` + `@keyframes` (ADR-009).

## API — adicionar um endpoint

1. Crie o tipo de domínio em `src/domain/entities/` (se aplicável).
2. Crie/atualize o serviço em `src/application/services/` (com `@injectable`).
3. Se houver persistência, defina a interface em `src/application/repositories/` e uma implementação.
4. Registre no container em `src/config/container.ts`.
5. Crie o controller em `src/interfaces/http/controllers/`.
6. Crie/atualize a rota em `src/interfaces/http/routes/` e monte em `createApp` (`src/interfaces/http/app.ts`).
7. Adicione testes em `apps/backend/tests/`.

Erros de validação (Zod) são convertidos em `400 { error: "invalid_input", issues }` pelo `error-handler` central — não precisa tratar ZodError em cada controller.

## API — variáveis de ambiente

A `config/env.ts` valida com Zod. Se adicionar variável nova, atualize o schema **e** o `.env.example`.

| Variável | Default | Descrição |
| --- | --- | --- |
| `PORT` | `3001` | Porta HTTP da API |
| `DATABASE_URL` | `postgres://quinto_set:...` | URL do Postgres (por enquanto não usado) |
| `LOG_LEVEL` | `info` | Nível do pino |
| `CORS_ORIGIN` | `*` | Origens liberadas no CORS (`*` = qualquer; vírgula = lista) |

## Web — variáveis de ambiente

- `NEXT_PUBLIC_API_URL` (default `http://localhost:3001`) — URL base que os formulários usam para chamar a API. Modelo em `apps/web/.env.example`.

## API — como funcionam os formulários

- Rotas `POST /contacts`, `/enrollments`, `/sponsors` → `FormController` → `LeadService` → `LeadRepository`.
- A validação usa os schemas de `packages/contracts` (fonte única). Erro de validação → `400 { error: "invalid_input", issues }`.
- Persistência é **em memória** por enquanto (`InMemoryLeadRepository`). Para trocar por Postgres, crie um `PostgresLeadRepository` com Drizzle e registre-o no `container.ts` em vez do `InMemoryLeadRepository`.

## Testes

```bash
npm run test --workspace @quinto-set/backend
```

O Jest da API usa `@swc/jest` (suporta decorators) e `transformIgnorePatterns` para transformar `@quinto-set/contracts` (que está em `node_modules`).

## Deploy

Veja [deploy-guide.md](deploy-guide.md).
