# Docusaurus example

Sample Docusaurus docs site with Encatch page feedback in the footer.

## Setup

```bash
pnpm install
```

Copy `.env.example` → `.env` in the app and set your Encatch publishable key and form slugs (see that app’s README for variable names).

**Publishable key:** [admin.encatch.com](https://admin.encatch.com) → **Settings** → **Publishable key**.

## Run

| App | Command | Docs |
|-----|---------|------|
| Docusaurus | `pnpm dev:docusaurus` | http://localhost:3000/docs |

From the app folder: `pnpm preview` (locale switcher works). Use `pnpm start` for English-only hot reload.

Spanish docs: http://localhost:3000/es/docs

## Encatch integration

The app uses the same pattern as the Fumadocs examples:

1. **`.env`** — publishable key + form slugs (from `.env.example`).
2. **`src/lib/encatch.tsx`** — SDK init, env, and form helpers.
3. **`src/components/DocsPageFeedback.tsx`** — footer UI.
4. **`src/theme/Root.tsx`** — `<EncatchInit locale={...} />`.
5. **`src/theme/DocItem/Footer/index.tsx`** — `<DocsPageFeedback />` on each docs page.

Details: [`apps/docusaurus`](./apps/docusaurus).
