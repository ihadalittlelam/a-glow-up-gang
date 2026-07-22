// Calls the Claude API to write the "Personalized notes" text on each
// results page. This is intentionally the ONLY place an LLM touches this
// product: it is given the season's already-determined diagnostic profile
// and already-determined recommended palette (both real, structured data
// from src/data/seasons.ts) and asked only to WRITE about them — never to
// invent colors or re-diagnose the season itself. That split is what keeps
// the output trustworthy: the LLM is a writer here, not a color-measuring
// instrument.
//
// This runs at build time (called from the static results pages), so it
// costs roughly 16 API calls per deploy, not one per visitor. If
// ANTHROPIC_API_KEY isn't set, or the call fails for any reason, it falls
// back to a plain-but-honest message instead of breaking the build.

import type { SeasonProfile } from "@/data/seasons";

const MODEL = "claude-haiku-4-5"; // cheap + fast; swap to "claude-sonnet-5" for richer prose at higher cost

const SYSTEM_PROMPT = `You are a warm, encouraging personal stylist writing the result page for a color-analysis app.
You will be given one season's diagnostic profile and its recommended palette — both already determined by a
separate color-science process. Your only job is to WRITE about them.
Rules:
- Do not invent new colors, hex codes, or a different palette. Only reference the color names you're given.
- Do not re-diagnose or contradict the season profile you're given.
- Write 120-160 words: a short warm explanation of why these colors suit this profile, then 2-3 concise styling tips.
- Plain prose, no headers, no bullet lists, no markdown formatting.
- Second person ("you"), friendly and specific, not generic filler.`;

function buildUserPrompt(season: SeasonProfile): string {
  const paletteList = season.recommendedPalette.map((c) => c.name).join(", ");
  return `Season: ${season.name} (${season.family} family)
Keywords: ${season.keywords.join(", ")}
Diagnostic profile: skin ${season.blueprint.skin} hair ${season.blueprint.hair} eyes ${season.blueprint.eyeColor}, ${season.blueprint.eyeExpression}
Recommended palette: ${paletteList}
Existing style note to build on (don't just repeat it verbatim): ${season.styleNote}`;
}

function fallbackText(season: SeasonProfile): string {
  return `We couldn't generate your personalized notes right now, so here's the short version: ${season.name} colors are chosen to match your ${season.family.toLowerCase()}-family diagnostic profile. ${season.styleNote}`;
}

export async function generateNarrative(season: SeasonProfile): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return fallbackText(season);

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 320,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: buildUserPrompt(season) }],
      }),
      // This runs during `next build` for static generation. By default in
      // this Next.js version, fetch() is NOT cached and would force the page
      // to render per-request instead of statically — force-cache keeps
      // each season's narrative as static, build-time-only content (one API
      // call per season per deploy, not one per visitor).
      cache: "force-cache",
    });

    if (!res.ok) {
      console.error(`Narrative API error for ${season.slug}: ${res.status} ${await res.text()}`);
      return fallbackText(season);
    }

    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    const text = data.content?.find((block) => block.type === "text")?.text;
    return typeof text === "string" && text.trim().length > 0
      ? text.trim()
      : fallbackText(season);
  } catch (err) {
    console.error(`Narrative generation failed for ${season.slug}:`, err);
    return fallbackText(season);
  }
}
