# BlackDoctor Pro · 340B HCP

v2 of the BlackDoctor 340B tool, rebranded and rewritten for healthcare providers (HCPs).

## What this is
A provider-facing 340B resource with:
- **340B Smart Chat** — Claude-backed Q&A tuned for clinicians, policy, and advocacy.
- **About 340B** — snapshot of program facts, current debate, and what's at stake at the bedside.
- **Advocacy** — concrete HCP actions + a template email to federal and state lawmakers (editable, mailto + copy).
- **Covered entities** — zip-code lookup for 340B covered entities (AI-assisted, cross-link to HRSA).
- **Policy brief** — printable one-pager you can hand to a lawmaker, board, or colleague.
- **State selector** — surfaces PBM/340B protections state-by-state.
- **Spanish toggle** kept from v1.

## Stack
- Create React App (React 19)
- Vercel serverless functions in `/api`
- Claude `claude-sonnet-4-20250514` via `ANTHROPIC_API_KEY`

## Environment variables
- `ANTHROPIC_API_KEY` — required

## Local dev
```
npm install
npm start
```

## Branding
Styled after blackdoctor.pro — black background, teal `#1A8A8F` accent, Cormorant Garamond headings, Inter body.
