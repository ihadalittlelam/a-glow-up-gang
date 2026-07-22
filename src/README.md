# Glow Color Analysis — web app

Live product in progress. It has no real photo-based analysis and no LLM
feedback yet — both are deliberately deferred to later steps. What it
*does* have now:

- Your full 16-season, PCCS-mapped diagnostic taxonomy, encoded as real data (`src/data/seasons.ts`)
- Real, research-grounded recommended color palettes per season (also in `seasons.ts`, see `claude/16-season-output-palettes.md` in the project for full sourcing/citations). Three seasons (Vivid Spring, Bright Summer, Strong Autumn) are flagged `needsReview: true` and show an on-page notice — their source grounding is weaker and they'd benefit from an actual colorist's pass.
- A home page, an upload page (photo picker + manual season selector standing in for real analysis), a results page per season, and a `/seasons` QA gallery showing all 16 at once

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

1. ~~Define the actual *recommended* color palette per season~~ — done.
2. Replace the manual season dropdown on `/upload` with a real deterministic color-classification step.
3. Replace the "Personalized notes — placeholder" box on the results page with a real LLM-generated narrative, constrained to the structured season data (not free-guessing colors).
