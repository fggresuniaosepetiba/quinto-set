# Decisões (ADR)

> Registro de decisões de arquitetura/engenharia com o contexto e o racional de cada uma. Última atualização: 2026-08-14.

## ADR-001 — Framework único de testes: Jest (sem Vitest)

- **Data:** 2026-08-10
- **Status:** Aceita

### Contexto

O projeto precisava de um framework de testes para a API. Duas opções consideradas: **Jest** e **Vitest**. O usuário tem interesse em aprender Jest porque ele aparece recorrentemente em vagas de emprego, e queria configuração manual para aprender de verdade.

### Decisão

Usar **Jest** como framework único em todo o monorepo:
- API: Jest + `@swc/jest` + Supertest.
- Web: Jest + `next/jest` + `@testing-library/react` (a configurar na fase de testes do frontend).

### Consequências

- API do Vitest é um clone da API do Jest, então o aprendizado de Jest não se perderia com Vitest.
- Dois frameworks = mais configuração e mais CI, sem ganho de velocidade (velocidade não é aditiva).
- `@swc/jest` (Rust) no lugar de `ts-jest` para transformação rápida de TS, com suporte a decorators (necessário para tsyringe).

## ADR-002 — TypeScript 7: remoção do `baseUrl` e paths relativas

- **Data:** 2026-08-13
- **Status:** Aceita

### Contexto

O TypeScript 7 (instalado nos workspaces) **removeu** a opção `baseUrl` (erros TS5102) e exige `paths` não-relativos com resolução explícita (TS5090). A API usa ESM puro com imports de sufixo `.js` para rodar compilada com `node` nativamente.

### Decisão

- `apps/api`: **sem aliases de caminho** — todas as imports são **relativas** (`../../config/container.js`, etc.).
- `apps/web`: mantém o alias `@/*` (Next.js já resolve nativamente, sem `baseUrl`).

### Consequências

- O `dist/` da API roda com `node dist/index.js` sem nenhum passo extra.
- Jest usa `moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" }` para resolver imports com sufixo `.js` em modo CommonJS.

## ADR-003 — Estrutura em camadas para a API

- **Data:** 2026-08-13
- **Status:** Aceita

### Contexto

A API começou como scaffold. O objetivo é um código organizado, testável e de fácil evolução.

### Decisão

Arquitetura em camadas:
- `config/` — env, logger, container de DI.
- `domain/` — entidades e tipos puros.
- `application/` — serviços/casos de uso.
- `interfaces/` — adaptadores externos (Express: app, rotas, controllers).

Injeção de dependência com **tsyringe**.

### Consequências

- Controllers finos, serviços testáveis isoladamente.
- Separação clara entre regra de negócio e framework HTTP.

## ADR-004 — Contratos compartilhados entre web e api (`packages/contracts`)

- **Data:** 2026-08-13
- **Status:** Aceita

### Contexto

Web e API validam os mesmos dados (matrícula, contato, patrocínio, health). Duplicar schemas criaria divergências.

### Decisão

Criar o pacote privado **`@quinto-set/contracts`** com schemas Zod 4 e tipos inferidos, consumido por ambos os workspaces. Publicado como fonte TS (sem build): `main`/`types`/`exports` → `./src/index.ts`.

### Consequências

- Fonte única de verdade para validação e tipos.
- O Jest da API precisa de `transformIgnorePatterns` para transformar o pacote em `node_modules` (regex de negação `@quinto-set/contracts`).

## ADR-005 — Monorepo com npm workspaces

- **Data:** 2026-08-13
- **Status:** Aceita

### Contexto

O app web existia como raiz do repositório. Foi necessário adicionar uma API sem misturar tecnologias no mesmo projeto.

### Decisão

Reestruturar como monorepo:
- `apps/web` (Next.js), `apps/api` (Express), `packages/contracts` (Zod).
- Root `package.json` com `workspaces: ["apps/*", "packages/*"]` e scripts agregadores.
- Dependências hoisted na raiz; `node_modules` local apenas em caso de conflito (ex.: TypeScript).

### Consequências

- Instalação única na raiz (`npm install`).
- Deploy na Vercel exige **Root Directory = `apps/web`**.
- TypeScript 7 fica duplicado em `apps/web` e `apps/api` porque o `typescript-eslint` (na raiz, via `eslint-config-next`) ainda usa TS 6.0.3.

## ADR-006 — Tipografia de commits: conventional commits em inglês

- **Data:** 2026-08-10
- **Status:** Aceita

### Contexto

O histórico anterior usava mensagens livres (ex.: `:ok_hand: Ribeiro`).

### Decisão

Usar **Conventional Commits** e **mensagens em inglês** (`feat:`, `fix:`, `refactor:`, `chore:`).

### Consequências

- Histórico padronizado, passível de geração de changelog automático.

## ADR-007 — Domínio do site em produção

- **Data:** 2026-08-13
- **Status:** Resolvida (2026-08-17)

### Contexto

`apps/web/src/data/site.ts` define `url: "https://quintoset.com.br"`, mas o deploy atual está em `quintoset.vercel.app`. O domínio real não foi confirmado/registrado no painel Vercel.

### Decisão

Manter o código como está por enquanto; o valor em produção (`vercel.app`) não é afetado por essa constante (usada principalmente para metadados/links). **Não alterar sem confirmação do domínio real.**

### Resolução

Domínio real confirmado pelo usuário: `https://quintoset.vercel.app`. `siteConfig.url` atualizado para refletir o deploy real.

### Consequências

- Potencial inconsistência em metadados (ex.: Open Graph) até o domínio ser configurado.
- Ação futura: registrar/confirmar domínio e atualizar `siteConfig.url`.

## ADR-008 — Planetas da seção "Futuro" com CSS puro (sem imagens)

- **Data:** 2026-08-13
- **Status:** Aceita

### Contexto

A seção "Futuro" da home tinha bolinhas orbitando anéis. O usuário pediu planetas do sistema solar.

### Decisão

Substituir as bolinhas por **6 planetas com gradientes CSS** (Mercúrio, Vênus, Terra, Marte, Júpiter, Saturno), mantendo as animações orbitais em CSS (`--animate-orbit-*` renomeadas por planeta, períodos 16s–60s, todos no mesmo sentido, sem `reverse`).

### Consequências

- Zero assets de imagem; performance e renderização simples.
- Decisão mantida (commit `435b8f1`): **a animação continua rodando mesmo com `prefers-reduced-motion: reduce`**, pois é um elemento decorativo/informativo e o usuário optou por manter.

## ADR-009 — Tailwind v4 (CSS-first) e animações via tokens CSS

- **Data:** 2026-08-10
- **Status:** Aceita

### Contexto

O projeto usa Tailwind CSS **v4** (CSS-first config, sem `tailwind.config.js`).

### Decisão

- Configuração via CSS (`@import "tailwindcss"` em `globals.css`).
- Animações orbitais definidas com tokens CSS (`--animate-orbit-*`) e `@keyframes` no CSS global.

### Consequências

- Não existe `tailwind.config.js`/`tailwind.config.ts` no projeto.
- Qualquer customização (tema, keyframes) vai em `apps/web/src/app/globals.css`.

## ADR-010 — Turbopack como bundler do Next.js

- **Data:** 2026-08-10
- **Status:** Aceita

### Contexto

Next.js 16 usa Turbopack por padrão no dev e no build.

### Decisão

Habilitar `experimental.turbopackPluginRuntimeStrategy: "workerThreads"` no `next.config.ts` (estabilidade com plugins).

### Consequências

- Builds mais rápidos; configuração fica em `apps/web/next.config.ts`.

## ADR-011 — `npm run dev` unificado com concurrently

- **Data:** 2026-08-13
- **Status:** Aceita

### Contexto

Com o monorepo, era preciso abrir dois terminais para rodar web e API em desenvolvimento. O usuário pediu que um único `npm run dev` na raiz subisse os dois.

### Decisão

Usar **concurrently** (devDependency da raiz) para rodar web (`next dev`, porta 3000) e API (`tsx watch`, porta 3001) em paralelo:

- `dev` → `concurrently -n web,api -c blue,green "npm:dev:web" "npm:dev:api"`
- `dev:web` → só o site web
- `dev:api` → só a API (mantido)

### Consequências

- Logs de cada processo rotulados com cor (`web`/`api`).
- Uma única janela de terminal para o dev completo.
- `Ctrl+C` encerra os dois processos.
- Sintaxe `npm:dev:web` (shorthand do concurrently) em vez de `npm run dev --workspace ...` para leitura mais limpa.

## ADR-012 — Endpoints de formulários com persistência em memória (Drizzle adiado)

- **Data:** 2026-08-14
- **Status:** Aceita

### Contexto

Os formulários do web (matrícula, contato, patrocínio) precisavam de endpoints reais na API. A persistência em Postgres via Drizzle exigiria definir modelos/migrations e subir o banco — um passo maior do que o necessário para validar o fluxo ponta a ponta.

### Decisão

- Criar `POST /contacts`, `POST /enrollments`, `POST /sponsors` validando com os schemas de `@quinto-set/contracts` (Zod).
- Persistir em memória (`InMemoryLeadRepository`) atrás da interface `LeadRepository`; a troca por `PostgresLeadRepository` (Drizzle) é uma implementação substituta, sem alterar `LeadService` nem os controllers.
- Respostas: `201 { id, type, createdAt }`; `400 { error: "invalid_input", issues }`; erros não mapeados → `500 { error: "internal_server_error" }` (middleware centralizado).

### Consequências

- Fluxo ponta a end-to-end (web → API) funcional e testável sem banco.
- Dados não persistem entre reinicializações da API — migração para Drizzle fica registrada no `backend-todo.md`.
- Contratos tiveram ajustes: `subject` opcional em `contactSchema`; `city`/`state` opcionais e `support` opcional em `sponsorSchema` (alinhados aos formulários reais).

## ADR-013 — Fluxo de PRs: eu crio, o usuário revisa; merge com Rebase

- **Data:** 2026-08-14
- **Status:** Aceita

### Contexto

O merge do PR #1 (`feat/backend-api` → `main`) foi feito manualmente pelo usuário na interface do GitHub, que quer ganhar prática com PRs. Daqui em diante, o agente (eu) passa a criar os PRs, e o usuário revisa antes do merge. O projeto usa Conventional Commits em inglês (ADR-006) e changelog baseado nos commits reais.

### Decisão

- **Criação de PR:** o agente cria via `gh pr create --base main --head <branch>` com `--title`/`--body` descritivos (resumo das mudanças e commits) para facilitar a revisão.
- **Estratégia de merge padrão:** **Rebase and merge** — commits entram na `main` como estão (história linear, sem commit de merge), preservando a granularidade dos commits convencionais/atômicos.
- **Exceção:** PRs com commits bagunçados/WIP podem usar **Squash and merge** caso a caso.
- **Branches de feature:** mantidas após o merge (local e remota) enquanto houver pendências associadas; só são deletadas quando a pendência for resolvida e o usuário concordar.

### Consequências

- Histórico linear e legível; changelog continua mapeável aos commits reais.
- Revisão humana obrigatória antes do merge (o usuário decide quando mergear).
- Branches abertas por mais tempo podem acumular pendências — exige disciplina de rebase antes de novos merges.
