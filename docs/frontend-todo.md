# Frontend — Todo

> Pendências específicas do frontend (`apps/web`). Última atualização: 2026-08-13.

## Lint

- [ ] **Corrigir erro:** `Navbar.tsx:16` — `setOpen(false)` síncrono dentro de `useEffect` (regra `react-hooks/set-state-in-effect`). Alternativa: re-render controlado por navegação/evento em vez de effect.
- [ ] **Warnings:** `Footer.tsx:118` — `<img>` → usar `next/image`.
- [ ] Revisar os demais warnings do lint (12 no total).

## Testes (a configurar)

- [ ] Jest + `next/jest` no `@quinto-set/web`.
- [ ] `@testing-library/react` + `@testing-library/jest-dom` + `jest-environment-jsdom`.
- [ ] Cobertura inicial: componentes de UI e formulários.

## Integração com a API

- [ ] Enviar formulários (matrícula/contato/patrocínio) para a API quando os endpoints existirem.
- [ ] Usar os tipos de `@quinto-set/contracts` nas respostas.

## Dados

- [ ] Preencher redes sociais (`instagram`, `tiktok`, `youtube`) em `apps/web/src/data/site.ts`.
- [ ] Confirmar domínio real e atualizar `siteConfig.url` (ADR-007).
