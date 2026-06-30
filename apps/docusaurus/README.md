# Docusaurus + Encatch

## Setup

Copy `.env.example` → `.env` and set `ENCATCH_*` values (publishable key + combined form slug and question slugs).

**Publishable key:** [admin.encatch.com](https://admin.encatch.com) → **Settings** → **Publishable key**.

## Run

From repo root (recommended — locale switcher works):

```bash
pnpm dev:docusaurus
```

From this folder:

```bash
pnpm preview
```

Open http://localhost:3000/docs. Spanish: http://localhost:3000/es/docs (use the locale dropdown or this URL).

For English-only hot reload during development:

```bash
pnpm start
```

Docusaurus serves one locale at a time in dev mode, so the locale dropdown 404s under `pnpm start`. Use `pnpm preview` (or `pnpm start:es` for Spanish-only dev) to test translations.

## Encatch — what to refer to

| File | Purpose |
|------|---------|
| `.env.example` | Env var names and default combined form / question slugs |
| `docusaurus.config.ts` | `customFields.encatch` exposes env to the client |
| `src/lib/encatch.tsx` | SDK init, locale sync, `open*Form` helpers |
| `src/components/DocsPageFeedback.tsx` | Footer UI (helpful / suggest edit / raise issue) |
| `src/theme/Root.tsx` | `<EncatchInit locale={...} />` |
| `src/theme/DocItem/Footer/index.tsx` | `<DocsPageFeedback />` on each docs page |

In-app overview: `docs/docs-feedback.mdx`.
