# Glow Color Analysis — web app

Live product in progress. What it has now:

- Your full 16-season, PCCS-mapped diagnostic taxonomy, encoded as real data (`src/data/seasons.ts`), including a numeric `axes` score (depth/warmth/clarity/contrast) per season used by the photo classifier below.
- Real, research-grounded recommended color palettes per season (also in `seasons.ts`, see `claude/16-season-output-palettes.md` in the project for full sourcing/citations). Three seasons (Vivid Spring, Bright Summer, Strong Autumn) are flagged `needsReview: true` and show an on-page notice — their source grounding is weaker and they'd benefit from an actual colorist's pass.
- A real Claude-written "Personalized notes" section per season (`src/lib/narrative.ts`) — it's given the season's already-determined palette and profile and only asked to write about them, never to invent new colors. Requires an `ANTHROPIC_API_KEY` environment variable (see below); without it, the site still builds fine and shows a plain fallback message instead.
- Real, deterministic photo-based season detection on `/upload` (`src/lib/faceSample.ts` + `src/lib/classifySeason.ts`) — see "How photo detection works" below.
- A home page, an upload page, a results page per season, and a `/seasons` QA gallery showing all 16 at once

## Setting up the LLM narrative (one-time)

1. Go to console.anthropic.com and create an account — this is separate from a claude.ai login.
2. In the left sidebar, go to **API keys → Create Key**. Copy it immediately (starts with `sk-ant-`) — you can't view it again later.
3. Go to **Settings → Billing**, add a payment method, and set a monthly spend limit (recommended — this app's usage should cost pennies, but a limit is good practice).
4. In your Vercel project, go to **Settings → Environment Variables**, add a new variable named `ANTHROPIC_API_KEY` with the key you copied as the value, and save.
5. Trigger a redeploy (Deployments tab → **…** on the latest one → Redeploy) so the new build picks up the key.

## How photo detection works

When someone uploads a photo on `/upload`, all of this happens in their own
browser — the photo is never sent to any server:

1. Google's MediaPipe Face Landmarker (a free, open model loaded from
   Google's CDN the first time it's needed) finds the face and 478 detail
   points on it.
2. We sample the pixel colors at a few of those points — cheeks (skin),
   iris centers (eyes), and an estimated point above the forehead (hair).
3. Those colors are converted into the same measurable traits colorists use
   — depth (light/dark), warmth (cool/warm undertone), clarity
   (clear/muted), and contrast — using standard, published color-science
   formulas (CIELAB color space).
4. Those four numbers are compared against every season's own profile (the
   new `axes` field in `seasons.ts`) to find the closest match, plus two
   runner-up alternates, each with a rough confidence percentage.

No AI/LLM is involved in this step at all — it's pure measurement, same
philosophy as the rest of the app. The person always sees the detected
season and can change it before continuing, since photo quality, lighting,
and camera color all genuinely affect the result.

**Honest limitation to know about:** I could not test this against real
photographs of people before handing it to you — this sandbox can't reach
the external image sites or the MediaPipe model itself to run a live end-to-
end test. What I *did* verify: the underlying color-math is correct on
hand-built test swatches (`scripts/test-classify.ts` — run with
`npx tsx scripts/test-classify.ts` if you ever want to sanity-check it), and
the app degrades gracefully (falls back to the manual dropdown with a clear
message) if detection fails for any reason. Please try it with a few real
photos once it's live, and tell me the results — especially any that seem
clearly wrong — so I can recalibrate the weighting (all the tunable
constants are isolated together in `src/lib/classifySeason.ts`).

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
2. ~~Wire up the LLM-generated "Personalized notes"~~ — done (confirmed live).
3. ~~Replace the manual season dropdown on `/upload` with a real deterministic color-classification step~~ — done, pending real-photo testing (see "How photo detection works" above).
4. Optional, longer-term: pull this classification logic out from behind the website into its own API, so a future mobile app (or anything else) could call it directly — the 2nd piece of the original three-part web app → API → app plan.
