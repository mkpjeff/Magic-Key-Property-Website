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

## Vercel (frontend ONLY)
Vercel deploys only the frontend. Two `vercel.json` files exist for robustness:
- repo-root `vercel.json` (used when Vercel Root Directory is blank)
- `artifacts/magic-key-property/vercel.json` (used when Root Directory = the frontend folder)

**Why two:** Vercel reads `vercel.json` from the configured Root Directory only. The user's
project had Root Directory set to the frontend subfolder, so the repo-root file was ignored.

**Gotcha:** on Vercel the API is NOT deployed, so the enquiry forms cannot submit — the
relative `/api/...` calls hit Vercel, which has no `/api`. Forms only work where the API is
also reachable (i.e. Replit, or a separately hosted API).
