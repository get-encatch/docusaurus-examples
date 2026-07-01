# Docusaurus example

Sample Docusaurus docs site with Encatch page feedback in the footer.

<table>
<tr>
<td valign="top">
<p><strong>Don't have the feedback form yet?</strong></p>
<p>Click the button to install a ready-made documentation feedback form in your Encatch workspace. It creates the combined form used in this example — helpful votes, suggest edits, and issue reports — with no manual form builder setup.</p>
</td>
<td align="center" valign="middle" width="210">
<a href="https://templates.encatch.com/templates/preview/documentation-frameworks/docs-feedback"><img src="https://encatch.com/button" alt="Encatch it" width="210" height="42"></a>
</td>
</tr>
</table>

## Setup

```bash
pnpm install
```

**Option A — Install the form:** use the button above if you need the feedback form created in Encatch.

**Option B — Wire this site:** Copy `.env.example` → `.env` in the app and set your Encatch publishable key and combined form slug / question slugs (see that app’s README for variable names).

**Publishable key:** [admin.encatch.com](https://admin.encatch.com) → **Settings** → **Publishable key**.

## Run

| App | Command | Docs |
|-----|---------|------|
| Docusaurus | `pnpm dev:docusaurus` | http://localhost:3000/docs |

From the app folder: `pnpm start`.

## Encatch integration

The app uses the same pattern as the Fumadocs examples:

1. **`.env`** — publishable key + combined form slug and question slugs (from `.env.example`).
2. **`src/lib/encatch.tsx`** — SDK init, env, and form helpers.
3. **`src/components/DocsPageFeedback.tsx`** — footer UI.
4. **`src/theme/Root.tsx`** — `<EncatchInit locale={...} />`.
5. **`src/theme/DocItem/Footer/index.tsx`** — `<DocsPageFeedback />` on each docs page.

Details: [`apps/docusaurus`](./apps/docusaurus).
