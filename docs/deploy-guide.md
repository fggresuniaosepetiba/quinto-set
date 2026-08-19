# Guia de Deploy

> Como publicar web e API. Última atualização: 2026-08-19.

## Web — Vercel

O site é um monorepo. Configuração atual no painel Vercel:

1. **Root Directory:** deve apontar para **`apps/web`** (senão o build falha — o Next não está mais na raiz do repo).
2. **Build Command:** `npm run build` (ou deixar default — a Vercel detecta Next).
3. **Output:** `.next` (gerenciado pela Vercel).
4. **Framework preset:** Next.js (detectado automaticamente pelo `apps/web/package.json`).

> ⚠️ **Ação pendente:** confirmar que o Root Directory do projeto Vercel está setado para `apps/web`. Se o deploy atual quebrar após a migração do monorepo, essa é a causa.

### Domínio

- Domínio confirmado e em uso: `quintoset.vercel.app` (ADR-007 resolvida).
- Deploy atual visível em `quintoset.vercel.app`; `siteConfig.url` já reflete esse domínio.
- Para usar um domínio próprio, registrar no painel Vercel (DNS) e atualizar `siteConfig.url` em `apps/web/src/data/site.ts`.

### Variáveis de ambiente (web)

Os formulários enviam os dados para a API via `NEXT_PUBLIC_API_URL` (default local `http://localhost:3001`). Na Vercel, defina:

- `NEXT_PUBLIC_API_URL` = URL pública da API (ex.: `https://api.quintoset.com.br`).

Modelo em `apps/web/.env.example`.

## API — Render + Neon

A API publicada no Render como Web Service, usando Postgres gerenciado no Neon.

### Web Service (Render)

- **Repo:** `quinto-set`
- **Name:** `quinto-set-api`
- **Root Directory:** `.` (raiz do monorepo — necessário para resolver o workspace `@quinto-set/contracts`)
- **Runtime:** Node
- **Build Command:** `npm ci --include=dev && npm run build --workspace @quinto-set/backend`
- **Start Command:** `npm run start --workspace @quinto-set/backend`
- **Instance Type:** Free
- `npm ci --include=dev` garante que `typescript` e `@types/node` (devDeps) estejam presentes mesmo com `NODE_ENV=production` no install.

### Variáveis de ambiente (API)

| Variável | Valor |
| --- | --- |
| `NODE_ENV` | `production` |
| `DATABASE_URL` | connection string do Neon (override; prioridade sobre `DATABASE_URL_PROD`) |
| `CORS_ORIGIN` | `https://quintoset.vercel.app` |
| `AUTH_SECRET` | segredo forte (32+ chars) |
| `ADMIN_USERNAME` | `quintoset.adm` |
| `ADMIN_PASSWORD` | senha forte (diferente da de dev) |
| `LOG_LEVEL` | `info` |
| `PORT` | não setar (Render injeta) |

> O `PORT` é injetado automaticamente pelo Render. As migrations do Drizzle rodam no boot (não precisa de passo extra no pipeline).

### Seed do admin em produção

Rode **localmente** apontando para o Neon (o free tier do Render não tem Shell):

```powershell
$env:DATABASE_URL="<connection string do Neon>"
$env:ADMIN_USERNAME="quintoset.adm"
$env:ADMIN_PASSWORD="<senha de produção>"
npm run db:seed --workspace @quinto-set/backend
```

O `DATABASE_URL` no shell vence o `.env` (dotenv não sobrescreve env já definido).

### Banco de dados em produção (Neon)

- Postgres serverless free (0.5 GB, auto-wake ~570ms, sem expiração).
- Connection string (Primary, usuário `neondb_owner`) vai em `DATABASE_URL` no Render.

## Checklist de release

- [x] `npm run lint` sem erros
- [x] `npm run test` passando
- [x] `npm run build` (web) e `npm run build --workspace @quinto-set/backend` OK
- [x] Root Directory = `apps/web` na Vercel
- [x] Variáveis de ambiente da API configuradas
- [x] Domínio confirmado e `siteConfig.url` atualizado
- [x] `GET https://quinto-set-api.onrender.com/health` retorna `{"status":"ok"}`
- [x] Login `quintoset.adm` em `quintoset.vercel.app/admin/login` abre o painel
- [x] Matrícula no site retorna sucesso e o lead aparece no painel
