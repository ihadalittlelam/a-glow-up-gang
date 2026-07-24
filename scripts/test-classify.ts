// Standalone sanity test for the classification math, run with:
//   npx tsx scripts/test-classify.ts
// Bypasses MediaPipe/the browser entirely — feeds hand-picked RGB triples
// (representative of real skin/hair/eye tones) straight into measureAxes /
// classifySeason to confirm the math produces plausible, distinct results.
import { measureAxes, classifySeason } from "../src/lib/classifySeason";
import type { RGB } from "../src/lib/colorScience";

interface Case {
  label: string;
  skin: RGB;
  hair: RGB;
  eye: RGB;
  expectFamily: string;
}

// Rule of thumb used when hand-picking these RGB triples: warm = yellow
// undertone (R and G notably higher than B), cool = pink/blue undertone (B
// not much lower than G, sometimes higher than G). This matters more than
// how the swatch "looks" — the classifier only ever sees the numbers.
const cases: Case[] = [
  {
    label: "Very fair cool-pink skin, ash-blonde hair, icy blue eyes",
    skin: { r: 244, g: 220, b: 218 },
    hair: { r: 205, g: 195, b: 185 },
    eye: { r: 150, g: 190, b: 210 },
    expectFamily: "Summer (light, cool)",
  },
  {
    label: "Deep golden-bronze skin, black hair, dark brown eyes",
    skin: { r: 140, g: 95, b: 65 },
    hair: { r: 25, g: 18, b: 14 },
    eye: { r: 60, g: 40, b: 25 },
    expectFamily: "Autumn (deep/warm)",
  },
  {
    label: "Porcelain cool-pink skin, jet black hair, icy blue eyes (high contrast)",
    skin: { r: 250, g: 228, b: 230 },
    hair: { r: 20, g: 18, b: 20 },
    eye: { r: 120, g: 165, b: 200 },
    expectFamily: "Winter (clear, cool, high contrast)",
  },
  {
    label: "Golden-tan skin, copper-red hair, warm green eyes",
    skin: { r: 210, g: 160, b: 115 },
    hair: { r: 150, g: 70, b: 40 },
    eye: { r: 110, g: 140, b: 70 },
    expectFamily: "Spring/Autumn (warm)",
  },
  {
    label: "Muted cool-toned olive-beige skin, ashy brown hair, muted grey-hazel eyes",
    skin: { r: 205, g: 185, b: 180 },
    hair: { r: 110, g: 100, b: 92 },
    eye: { r: 130, g: 130, b: 120 },
    expectFamily: "Summer (muted, cool)",
  },
];

for (const c of cases) {
  const axes = measureAxes(c.skin, c.hair, c.eye);
  const result = classifySeason(c.skin, c.hair, c.eye);
  console.log(`\n${c.label}`);
  console.log(`  expected family-ish: ${c.expectFamily}`);
  console.log(
    `  axes: depth=${axes.depth.toFixed(1)} warmth=${axes.warmth.toFixed(1)} clarity=${axes.clarity.toFixed(1)} contrast=${axes.contrast.toFixed(1)}`
  );
  console.log(
    `  BEST: ${result.best.season.name} (${result.best.season.family}) - ${result.best.confidence}% confidence`
  );
  console.log(
    `  alternates: ${result.alternates.map((a) => `${a.season.name} (${a.confidence}%)`).join(", ")}`
  );
}
