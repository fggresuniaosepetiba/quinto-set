# Guia de Desenvolvimento

> Como trabalhar neste projeto no dia a dia. Última atualização: 2026-08-13.

## Setup inicial

```bash
npm install        # instala tudo (hoisted na raiz)
npm run dev        # web em http://localhost:3000 + API em http://localhost:3001 (juntos)
```

Para rodar apenas um deles:

```bash
npm run dev:web    # só o site web (porta 3000)
npm run dev:api    # só a API (porta 3001)
```

Para a API com banco local:

```bash
docker compose -f apps/api/docker-compose.yml up -d
cp apps/api/.env.example apps/api/.env   # e ajuste se necessário
npm run dev:api                          # API em http://localhost:3001
```

> O `.env` não é commitado. Só o `.env.example` é versionado.

## Comandos por workspace

| Ação | Web (`@quinto-set/web`) | API (`@quinto-set/api`) |
| --- | --- | --- |
| Dev | `npm run dev --workspace @quinto-set/web` | `npm run dev:api` (raiz) |
| Build | `npm run build --workspace @quinto-set/web` | `npm run build --workspace @quinto-set/api` |
| Start | `npm run start --workspace @quinto-set/web` | `npm run start --workspace @quinto-set/api` |
| Typecheck | `npm run typecheck --workspace @quinto-set/web` | `npm run typecheck --workspace @quinto-set/api` |
| Testes | — (a configurar) | `npm run test --workspace @quinto-set/api` |
| Lint | `npm run lint --workspace @quinto-set/web` | — (a configurar) |

Na raiz: `npm run dev` (web + API juntos via `concurrently`), `npm run lint`, `npm run test`, `npm run build`, `npm run start` rodam agregados nos workspaces.

## Convenções de código

- **Commits:** Conventional Commits **em inglês** (`feat:`, `fix:`, `refactor:`, `chore:`, ...). Ver ADR-006.
- **Idioma do código:** código e mensagens internas em português nos textos de UI; nomes de variáveis/identificadores em inglês.
- **Validação:** sempre que houver dados de formulário, usar os schemas de `packages/contracts` (fonte única de verdade).
- **API — imports:** sempre relativos com sufixo `.js` (`../../config/env.js`) — ESM puro, sem aliases. Não reintroduzir `baseUrl`/`@/*` na API (ADR-002).
- **Web — imports:** alias `@/*` → `src/*` (Next.js resolve nativamente).

## CSS / Tailwind

- Tailwind v4, configuração CSS-first em `apps/web/src/app/globals.css`.
- **Não existe** `tailwind.config.js` — customizações de tema/keyframes vão no CSS global.
- Animações orbitais usam tokens `--animate-orbit-*` + `@keyframes` (ADR-009).

## API — adicionar um endpoint

1. Crie o tipo de domínio em `src/domain/entities/` (se aplicável).
2. Crie/atualize o serviço em `src/application/services/` (com `@injectable`).
3. Registre no container em `src/config/container.ts`.
4. Crie o controller em `src/interfaces/http/controllers/`.
5. Crie/atualize a rota em `src/interfaces/http/routes/` e monte em `createApp` (`src/interfaces/http/app.ts`).
6. Adicione testes em `apps/api/tests/`.

## API — variáveis de ambiente

A `config/env.ts` valida com Zod. Se adicionar variável nova, atualize o schema **e** o `.env.example`.

## Testes

```bash
npm run test --workspace @quinto-set/api
```

O Jest da API usa `@swc/jest` (suporta decorators) e `transformIgnorePatterns` para transformar `@quinto-set/contracts` (que está em `node_modules`).

## Deploy

Veja [deploy-guide.md](deploy-guide.md).
