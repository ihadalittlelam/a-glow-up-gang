# Glow Color Analysis — web app skeleton

This is a working skeleton, not the finished product. It has no real photo
analysis and no LLM feedback yet — both are deliberately deferred to later
steps. What it *does* have:

- Your full 16-season, PCCS-mapped taxonomy, encoded as real data (`src/data/seasons.ts`)
- A home page, an upload page (photo picker + manual season selector standing in for real analysis), a results page per season, and a `/seasons` QA gallery showing all 16 at once
- Placeholder color swatches per season (clearly labeled placeholder — these are NOT the real recommended-color output yet, just visually distinct stand-ins)

## Running it locally (optional — you don't need to do this to deploy)

```
npm install
npm run dev
```
Then open http://localhost:3000

## Deploying (no terminal needed)

1. Create a free account at github.com if you haven't already.
2. On GitHub, click "New repository," name it (e.g. `glow-color-analysis`), leave it empty (no README), and create it.
3. On the new repo's page, click "uploading an existing file" and drag in every file/folder from this project EXCEPT `node_modules` and `.next` (they're not included in what I've handed you anyway). Commit the upload.
4. Go to vercel.com, sign up with "Continue with GitHub," then click "Add New… > Project" and import the repo you just created. Vercel auto-detects Next.js — just click Deploy.
5. Once deployed, go to the project's Settings > Domains in Vercel, add your existing domain, and update your domain's DNS records at your registrar the way Vercel shows you.

## What's next (in order)

1. Define the actual *recommended* color palette per season (what someone should wear) — separate from the diagnostic profile already in `seasons.ts`.
2. Replace the manual season dropdown on `/upload` with a real deterministic color-classification step.
3. Replace the "Personalized notes — placeholder" box on the results page with a real LLM-generated narrative, constrained to the structured season data (not free-guessing colors).
