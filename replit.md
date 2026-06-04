# Magic Key Property

A UK property investment and mortgage advisory enquiry hub. Collects client enquiries via three professional forms and forwards them to a configured webhook.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite (artifacts/magic-key-property)
- API: Express 5 (artifacts/api-server)
- Validation: Zod (`zod/v4`), Orval codegen
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth)
- `lib/api-client-react/src/generated/` — generated React Query hooks
- `lib/api-zod/src/generated/` — generated Zod validation schemas
- `artifacts/api-server/src/routes/enquiries.ts` — form submission routes + webhook forwarding
- `artifacts/magic-key-property/src/` — React frontend

## Architecture decisions

- No database — enquiries are forwarded directly to a webhook (WEBHOOK_URL secret). This keeps the stack lean and lets the business use Make.com / Zapier / n8n downstream.
- Three form types: BTL Property Investment, Mortgage, Tax/Accounting/Ltd Co Formation.
- Each POST route validates with Zod, forwards to the webhook with a `formType` field, and returns a success/error JSON response.
- Frontend uses generated hooks (`useSubmitBtlEnquiry`, `useSubmitMortgageEnquiry`, `useSubmitTaxEnquiry`) so the API contract is always type-safe.

## Product

- Home page with headline, three service cards linking to each form
- Three enquiry forms with full field validation and thank-you confirmation
- Disclaimer on every page: no regulated advice is given; all recommendations after full professional review
- Webhook forwarding: every submission POSTs JSON to WEBHOOK_URL with a `formType` field

## Secrets

- `WEBHOOK_URL` — required. The URL to POST form submissions to (e.g. Make.com, Zapier, n8n webhook)
- `SESSION_SECRET` — pre-existing

## Branding / editing guide

Search for these comments in the source to customise:
- `// BRANDING:` — business name
- `// CONTACT:` — phone number
- Privacy policy text is in each form component near the consent checkboxes

## Gotchas

- After any OpenAPI spec change, run codegen before typecheck or the generated types will be stale.
- The webhook URL must be set as `WEBHOOK_URL` in Replit Secrets, not as a plain env var.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
