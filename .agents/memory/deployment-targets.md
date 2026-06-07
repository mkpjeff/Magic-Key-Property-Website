---
name: Deployment targets (Replit vs Vercel)
description: How this monorepo deploys, and the gotcha that Vercel only serves the frontend.
---

# Deploying Magic Key Property

This is a multi-artifact pnpm monorepo: a React+Vite frontend (`magic-key-property`, served
at `/`) and an Express API (`api-server`, served at `/api`). The frontend calls the API with
**relative `/api/...` paths** resolved against the current origin — there is no configured
absolute API base URL.

## Replit (recommended — full app works)
Both artifacts are already production-configured in their `.replit-artifact/artifact.toml`
files (frontend = static `dist/public` with SPA rewrite; API = `node dist/index.mjs` on `/api`
with a `/api/healthz` health check). The Replit proxy routes `/` and `/api` to the right
service, so the forms reach the API out of the box. Just publish.

## Vercel (frontend ONLY) — cross-origin API
Vercel deploys only the frontend. Two `vercel.json` files exist for robustness:
- repo-root `vercel.json` (used when Vercel Root Directory is blank)
- `artifacts/magic-key-property/vercel.json` (used when Root Directory = the frontend folder)

**Why two:** Vercel reads `vercel.json` from the configured Root Directory only. The user's
project had Root Directory set to the frontend subfolder, so the repo-root file was ignored.

**Making forms work on Vercel — chosen approach: Vercel serverless functions.**
The frontend calls relative `/api/enquiries/*`; on Vercel those resolve to serverless
functions that live in the artifact (`api/enquiries/{btl,mortgage,tax}.ts`), so everything
runs on Vercel and the Replit deployment does NOT need to be public.

Key conventions (learned the hard way / via review):
- Routable handlers go in `api/` ONLY; each is a thin `export default makeEnquiryHandler(...)`.
- Shared code (zod schemas, the forward helper) lives in a SIBLING dir `api-lib/`, NOT under
  `api/`. Do not rely on underscore-prefix exclusion inside `api/` — move helpers out entirely.
- Schemas are COPIED from the generated `@workspace/api-zod` into `api-lib/schemas.ts` so the
  functions are self-contained (Vercel's esbuild bundle doesn't build workspace libs). Mirror
  any OpenAPI change here too.
- `tsconfig.server.json` (nodenext, types:[node]) covers `api/`+`api-lib/` and is wired into
  the package `typecheck` script. The frontend `tsconfig.json` only includes `src/**`.
- `@vercel/node` is a devDependency (types only). Keep package.json specifier in lockstep with
  the lockfile or Vercel's frozen install fails.
- `VITE_API_BASE_URL` is now UNSET so the frontend uses relative `/api` (hitting the Vercel
  functions). The `setBaseUrl` hook in `main.tsx` stays as a harmless no-op escape hatch.

**Prerequisites for the Vercel serverless forms to work:**
1. Vercel project Root Directory MUST be `artifacts/magic-key-property` (so the right
   `vercel.json` and the `api/` tree are used).
2. `WEBHOOK_URL` must be set in the Vercel project's Environment Variables (Production +
   Preview) — server-side only, never in `vercel.json` (it's a secret and that file is committed).

**Alternative (Option A, not chosen):** point the frontend at the Replit API via
`VITE_API_BASE_URL` — but that requires the Replit deployment to be public (private returns
HTTP 307 login redirect) and `WEBHOOK_URL` in Replit production secrets.

CORS: the Express API uses `app.use(cors())` (wildcard, no credentials); not relevant to the
Vercel serverless path since frontend + functions are same-origin there.
