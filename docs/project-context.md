# Contexto do Projeto

> **Status:** Em desenvolvimento (monorepo)
> **Última atualização:** 2026-08-13

## O que é

Site institucional e futura plataforma digital da **Quinto Set Escolinha de Vôlei**, uma escolinha social de vôlei no **Cesarão, Rio de Janeiro**, mantida em parceria com a **AMOCOC** (Associação de Moradores do Conjunto Otacílio Câmara) e o **Grêmio Recreativo Escola de Samba União de Sepetiba**.

## Missão (como descrita no site)

Escolinha social de vôlei no Cesarão, Rio de Janeiro. Inclusão esportiva, formação de jovens e adolescentes de 14 a 19 anos e educação como base de tudo. **Matrícula gratuita.**

## Conceito

> O quinto set é o momento em que tudo pode mudar. É o set da decisão — e todo grande jogo tem um momento decisivo.

## Público-alvo

- Jovens e adolescentes de **14 a 19 anos** (categorias SUB-14, SUB-16, SUB-18, SUB-19).
- Famílias/responsáveis interessados na matrícula gratuita.
- Potenciais patrocinadores e apoiadores do projeto social.

## Presença digital

| Item | Valor |
| --- | --- |
| Domínio configurado | `https://quintoset.com.br` (no código) |
| Deploy ativo | Vercel (`quintoset.vercel.app`) |
| E-mail | `contato@quintoset.com.br` |
| Redes sociais | Instagram, TikTok e YouTube (campos vazios no código — a preencher) |

> ⚠️ **Divergência conhecida:** o `siteConfig.url` em `apps/web/src/data/site.ts` aponta para `https://quintoset.com.br`, mas o deploy atual roda em `quintoset.vercel.app`. Ver [Decisões (ADR)](decisions.md).

## Instituições parceiras

- **AMOCOC** — Associação de Moradores do Conjunto Otacílio Câmara (instituição mantenedora).
- **Grêmio Recreativo Escola de Samba União de Sepetiba** (instituição parceira).
- Patrocinadores exibidos no site (logotipos em `apps/web/public/sponsors/`).

## Páginas do site (8 rotas + home)

| Rota | Página |
| --- | --- |
| `/` | Home (hero, categorias, formação, metodologia, núcleo, propósito, impacto social, patrocinadores, matrícula) |
| `/sobre` | A Quinto Set |
| `/treinamentos` | Treinamentos |
| `/equipe` | Equipe técnica (com quadro de diretores) |
| `/competicoes` | Competições |
| `/galeria` | Galeria de fotos |
| `/matricula` | Formulário de matrícula |
| `/patrocine` | Formulário de patrocínio |
| `/contato` | Formulário de contato |

Todos os formulários (matrícula, patrocínio, contato) usam schemas de validação compartilhados em `packages/contracts`.
