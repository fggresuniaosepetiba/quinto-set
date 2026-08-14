# Frontend — Todo

> Pendências específicas do frontend (`apps/web`). Última atualização: 2026-08-14.

## Lint

- [x] **Erro corrigido:** `Navbar.tsx:16` — `setOpen(false)` síncrono dentro de `useEffect` (regra `react-hooks/set-state-in-effect`). Agora usa o padrão de ajuste de estado durante render (comparando `prevPathname`), sem `useEffect` para o pathname.
- [x] **Warnings resolvidos:** 12 `<img>` → `next/image` em `Footer`, `SponsorsMarquee`, `Formation`, `Categories`, `Purpose`, `Gallery`, `sobre`, `competicoes`, `treinamentos`.
- [x] Lint do web limpo: `eslint` sem erros nem warnings.

## Testes (a configurar)

- [ ] Jest + `next/jest` no `@quinto-set/web`.
- [ ] `@testing-library/react` + `@testing-library/jest-dom` + `jest-environment-jsdom`.
- [ ] Cobertura inicial: componentes de UI e formulários.

## Integração com a API

- [x] Formulários (matrícula/contato/patrocínio) enviam para a API via `apps/web/src/lib/api.ts` (`postLead`), com `NEXT_PUBLIC_API_URL` (default `http://localhost:3001`).
- [ ] Consumir os tipos de `@quinto-set/contracts` nas respostas (hoje `CreatedLead` é definido manualmente em `src/lib/api.ts`).

## Dados

- [ ] Preencher redes sociais (`instagram`, `tiktok`, `youtube`) em `apps/web/src/data/site.ts`.
- [ ] Confirmar domínio real e atualizar `siteConfig.url` (ADR-007).
