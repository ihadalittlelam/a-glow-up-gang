// Turns sampled skin/hair/eye colors into the same four axes the 16-season
// taxonomy is scored on (depth, warmth, clarity, contrast — see
// `SeasonAxes` in src/data/seasons.ts), then finds the closest-matching
// season. Entirely deterministic: same photo colors always produce the same
// answer, no LLM involved anywhere in this file.
//
// Be upfront with yourself reading this: these formulas are a reasonable,
// commonly-used approximation (CIELAB lightness/chroma/hue — standard,
// citable color science), not a clinically validated classifier. Lighting,
// camera white balance, filters, and makeup all shift the numbers. That's
// exactly why the UI built on top of this (see /upload) always shows the
// result as a suggestion the person can override, never a verdict.

import { rgbToLab, labChroma, labHueAngle, type RGB } from "./colorScience";
import { SEASONS, type SeasonProfile, type SeasonAxes } from "@/data/seasons";

export interface MeasuredAxes extends SeasonAxes {}

export interface ClassificationResult {
  axes: MeasuredAxes;
  best: { season: SeasonProfile; confidence: number };
  alternates: { season: SeasonProfile; confidence: number }[];
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

// Skin and hair color are naturally confined to a narrow slice of the hue
// wheel (roughly 10-90 degrees — from pink through orange to yellow-brown;
// human skin/hair never reads blue or green). Within that narrow band, the
// warm/cool "undertone" distinction is a MONOTONIC slide, not a wheel
// position: lower hue (pinker/redder) reads cooler, higher hue
// (yellower/golder) reads warmer. This is unlike a full warm/cool color
// wheel — it's calibrated only for the realistic skin/hair range.
function skinOrHairWarmth(hueDeg: number): number {
  return clamp(((hueDeg - 50) / 40) * 10, -10, 10);
}

// Eye color, unlike skin/hair, genuinely spans the full hue wheel (blue,
// green, grey, hazel, brown), so it needs the traditional warm/cool color
// wheel instead: red-orange-yellow is warm, its opposite side (blue/violet
// — where blue eyes live) is cool. A cosine centered on the warmest
// realistic hue (~55 degrees) peaks at +10 there and reaches -10 exactly on
// the far side of the wheel, which is where blue eyes land.
function eyeWarmth(hueDeg: number): number {
  const rad = ((hueDeg - 55) * Math.PI) / 180;
  return 10 * Math.cos(rad);
}

// Hue is numerically unstable/meaningless for near-neutral colors (very
// low chroma — think near-black hair or grey eyes): a tiny a*/b* wobble
// swings the angle wildly. This turns raw chroma into a 0-1 confidence
// weight so low-chroma regions barely move the warmth estimate instead of
// injecting noise.
function chromaConfidence(chroma: number): number {
  return chroma / (chroma + 6);
}

export function measureAxes(skin: RGB, hair: RGB, eye: RGB): MeasuredAxes {
  const skinLab = rgbToLab(skin);
  const hairLab = rgbToLab(hair);
  const eyeLab = rgbToLab(eye);

  // Depth: mainly driven by hair (the strongest, dye-independent depth cue
  // in most seasonal-color guides), with skin lightness contributing less.
  const depthRaw = hairLab.L * 0.65 + skinLab.L * 0.35;
  const depth = clamp((depthRaw / 100) * 10, 0, 10);

  // Warmth: primarily the skin's undertone, nudged by hair/eye hue — each
  // region's vote is weighted by how much chroma it actually has, so a
  // near-neutral grey/black region (unreliable hue) doesn't drown out a
  // region with real, trustworthy color in it.
  const regions = [
    { lab: skinLab, base: 0.6, fn: skinOrHairWarmth },
    { lab: hairLab, base: 0.25, fn: skinOrHairWarmth },
    { lab: eyeLab, base: 0.15, fn: eyeWarmth },
  ];
  let weightedSum = 0;
  let weightTotal = 0;
  for (const { lab, base, fn } of regions) {
    const chroma = labChroma(lab);
    const weight = base * chromaConfidence(chroma);
    weightedSum += weight * fn(labHueAngle(lab));
    weightTotal += weight;
  }
  const warmth = clamp(weightTotal > 0 ? weightedSum / weightTotal : 0, -10, 10);

  // Clarity: average chroma (saturation) of skin and eyes, scaled against a
  // typical real-world max (~40 Lab chroma units for vivid, clear coloring).
  const chromaAvg = (labChroma(skinLab) + labChroma(eyeLab)) / 2;
  const clarity = clamp((chromaAvg / 40) * 10, 0, 10);

  // Contrast: how different the hair is from the skin and eyes in
  // lightness — the classic "does your hair disappear into your skin, or
  // stand apart from it" test.
  const contrastRaw =
    (Math.abs(hairLab.L - skinLab.L) + Math.abs(hairLab.L - eyeLab.L)) / 2;
  const contrast = clamp((contrastRaw / 70) * 10, 0, 10);

  return { depth, warmth, clarity, contrast };
}

// Depth/warmth are weighted highest because they're the two axes classic
// seasonal-color-analysis systems treat as primary; clarity and contrast
// are secondary/tie-breaking signals.
const AXIS_WEIGHTS = { depth: 1.2, warmth: 1.5, clarity: 1.0, contrast: 0.8 };

function weightedDistance(a: SeasonAxes, b: MeasuredAxes): number {
  const dDepth = (a.depth - b.depth) * AXIS_WEIGHTS.depth;
  const dWarmth = (a.warmth - b.warmth) * AXIS_WEIGHTS.warmth;
  const dClarity = (a.clarity - b.clarity) * AXIS_WEIGHTS.clarity;
  const dContrast = (a.contrast - b.contrast) * AXIS_WEIGHTS.contrast;
  return Math.sqrt(dDepth ** 2 + dWarmth ** 2 + dClarity ** 2 + dContrast ** 2);
}

// Converts a distance into a rough, honestly-conservative confidence
// percentage. Calibrated so a near-perfect axis match (~distance 2) reads
// as clearly confident (~85%), while typical real-photo distances (6-12)
// read as moderate, and poor matches (20+) read as low. This is a
// presentation choice, not a statistically validated probability.
function distanceToConfidence(distance: number): number {
  const pct = 100 * Math.exp(-distance / 9);
  return Math.round(clamp(pct, 5, 97));
}

export function classifySeason(skin: RGB, hair: RGB, eye: RGB): ClassificationResult {
  const axes = measureAxes(skin, hair, eye);

  const scored = SEASONS.map((season) => ({
    season,
    distance: weightedDistance(season.axes, axes),
  })).sort((x, y) => x.distance - y.distance);

  const [bestEntry, ...restEntries] = scored;

  return {
    axes,
    best: { season: bestEntry.season, confidence: distanceToConfidence(bestEntry.distance) },
    alternates: restEntries.slice(0, 2).map((e) => ({
      season: e.season,
      confidence: distanceToConfidence(e.distance),
    })),
  };
}
