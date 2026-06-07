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

**Making forms work on Vercel:** the frontend reads `VITE_API_BASE_URL` (set in both
`vercel.json` files) and calls `setBaseUrl()` from `@workspace/api-client-react` in `main.tsx`.
When set, the generated client prepends that absolute origin to the relative `/api/...` paths,
so a Vercel-hosted frontend can reach the Replit-hosted API. When unset (Replit), relative
paths route through the proxy as before — so this is safe in both environments.

**Two external prerequisites for Vercel forms to actually reach the webhook:**
1. The Replit API deployment must be **public** — a private deployment returns HTTP 307
   (login redirect) to anonymous browser traffic, silently breaking submissions.
2. `WEBHOOK_URL` must be set in the Replit **production** deployment secrets (not just dev),
   or the API can't forward.

CORS: the API uses `app.use(cors())` (wildcard, no credentials) and forms send no cookies,
so cross-origin POSTs work without extra CORS config.
