# PRDforge

> Cursor, but for product managers.

Synthesize customer calls. Draft PRDs. Ship roadmaps. The AI workbench PMs have been waiting for.

## Stack

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS v4 (`@tailwindcss/postcss`, CSS-first config)
- `next/font/google` for Inter
- pnpm

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|---|---|
| `/` | Landing page — hero, demo, features, waitlist form |
| `/try` | Paste customer-call notes, get a mocked PRD outline |
| `/api/waitlist` | POST `{ email }` → forwards to waitlist-api-sigma |

## Deploy

Push to Vercel — Next.js is auto-detected. No environment variables required.

## Status

v0 skeleton. Product in planning.
