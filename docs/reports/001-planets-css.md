# Relatório 001 — Seção "Futuro": planetas CSS

- **Data:** 2026-08-10 e 2026-08-13
- **Status:** Concluído
- **Commits:** `58871bf`, `435b8f1`, `78f1b5f`

## Objetivo

Substituir as bolinhas que orbitavam os anéis da seção "Futuro" (home) por representações dos planetas do sistema solar, mantendo as animações orbitais em CSS puro (sem imagens).

## Execução

1. **Animação das bolinhas** (commit `58871bf`): criado `--animate-orbit-*` + `@keyframes` em `globals.css`, dots orbitando em `Future.tsx`.
2. **Reduced motion** (commit `435b8f1`): decisão de manter a animação rodando mesmo com `prefers-reduced-motion: reduce` — elemento decorativo/informativo; usuário optou por manter.
3. **Planetas** (commit `78f1b5f`):
   - 6 planetas com gradientes CSS: Mercúrio, Vênus, Terra, Marte, Júpiter, Saturno.
   - Tamanhos crescentes (10px → 18px).
   - Planetas internos com anel interno via `inset` (Vênus `inset-[22%]`, Terra/Marte `inset-[11%]`, Júpiter/Saturno `inset-0`).
   - Saturno com anel em elipse.
   - Tokens renomeados por planeta (`--animate-orbit-mercury` … `--animate-orbit-saturn`), períodos 16s–60s, todos no mesmo sentido, sem `reverse`.

## Verificação (evidência)

- Validação via Playwright: as 6 animações reportadas como `running`, inclusive com `reducedMotion: 'reduce'`.
- Build do web: OK (9 páginas estáticas).

## Arquivos afetados

- `apps/web/src/components/home/Future.tsx`
- `apps/web/src/app/globals.css`

## Decisões registradas

- ADR-008 (planetas com CSS puro), ADR-009 (Tailwind v4 CSS-first + tokens CSS).
