# Glow Color Analysis — web app

Live product in progress. It has no real photo-based analysis yet — that's
the one deliberately deferred piece. What it *does* have now:

- Your full 16-season, PCCS-mapped diagnostic taxonomy, encoded as real data (`src/data/seasons.ts`)
- Real, research-grounded recommended color palettes per season (also in `seasons.ts`, see `claude/16-season-output-palettes.md` in the project for full sourcing/citations). Three seasons (Vivid Spring, Bright Summer, Strong Autumn) are flagged `needsReview: true` and show an on-page notice — their source grounding is weaker and they'd benefit from an actual colorist's pass.
- A real Claude-written "Personalized notes" section per season (`src/lib/narrative.ts`) — it's given the season's already-determined palette and profile and only asked to write about them, never to invent new colors. Requires an `ANTHROPIC_API_KEY` environment variable (see below); without it, the site still builds fine and shows a plain fallback message instead.
- A home page, an upload page (photo picker + manual season selector standing in for real analysis), a results page per season, and a `/seasons` QA gallery showing all 16 at once

## Setting up the LLM narrative (one-time)

1. Go to console.anthropic.com and create an account — this is separate from a claude.ai login.
2. In the left sidebar, go to **API keys → Create Key**. Copy it immediately (starts with `sk-ant-`) — you can't view it again later.
3. Go to **Settings → Billing**, add a payment method, and set a monthly spend limit (recommended — this app's usage should cost pennies, but a limit is good practice).
4. In your Vercel project, go to **Settings → Environment Variables**, add a new variable named `ANTHROPIC_API_KEY` with the key you copied as the value, and save.
5. Trigger a redeploy (Deployments tab → **…** on the latest one → Redeploy) so the new build picks up the key.

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
2. ~~Wire up the LLM-generated "Personalized notes"~~ — done, pending your `ANTHROPIC_API_KEY` setup above.
3. Replace the manual season dropdown on `/upload` with a real deterministic color-classification step — the last remaining piece.
