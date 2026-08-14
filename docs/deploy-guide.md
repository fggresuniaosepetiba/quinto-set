# Guia de Deploy

> Como publicar web e API. Última atualização: 2026-08-13.

## Web — Vercel

O site é um monorepo. Configuração atual no painel Vercel:

1. **Root Directory:** deve apontar para **`apps/web`** (senão o build falha — o Next não está mais na raiz do repo).
2. **Build Command:** `npm run build` (ou deixar default — a Vercel detecta Next).
3. **Output:** `.next` (gerenciado pela Vercel).
4. **Framework preset:** Next.js (detectado automaticamente pelo `apps/web/package.json`).

> ⚠️ **Ação pendente:** confirmar que o Root Directory do projeto Vercel está setado para `apps/web`. Se o deploy atual quebrar após a migração do monorepo, essa é a causa.

### Domínio

- Domínio configurado no código: `quintoset.com.br` (ver ADR-007).
- Deploy atual visível em `quintoset.vercel.app`.
- Para apontar o domínio real, registrar no painel Vercel (DNS) e atualizar `siteConfig.url` em `apps/web/src/data/site.ts`.

### Variáveis de ambiente (web)

Os formulários enviam os dados para a API via `NEXT_PUBLIC_API_URL` (default local `http://localhost:3001`). Na Vercel, defina:

- `NEXT_PUBLIC_API_URL` = URL pública da API (ex.: `https://api.quintoset.com.br`).

Modelo em `apps/web/.env.example`.

## API — ainda não publicada

A API ainda **não tem deploy configurado**. Opções recomendadas:

- **Render / Railway / Fly.io** — deploy simples de Node.js.
- Exigirá: build (`tsc -p tsconfig.build.json`), start (`node dist/index.js`), e as variáveis de ambiente (`PORT`, `DATABASE_URL`, `LOG_LEVEL`, `NODE_ENV`, `CORS_ORIGIN`).
- `CORS_ORIGIN`: liberar o domínio do site (ex.: `https://quintoset.vercel.app,https://quintoset.com.br`).

### Banco de dados em produção

- Usar Postgres gerenciado (Neon, Supabase, Render Postgres, Railway).
- Definir `DATABASE_URL` no ambiente do deploy.
- Rodar migrations do Drizzle (quando existirem) no pipeline de deploy.

## Checklist de release

- [ ] `npm run lint` sem erros
- [ ] `npm run test` passando
- [ ] `npm run build` (web) e `npm run build --workspace @quinto-set/api` OK
- [ ] Root Directory = `apps/web` na Vercel
- [ ] Variáveis de ambiente da API configuradas
- [ ] Domínio confirmado e `siteConfig.url` atualizado
