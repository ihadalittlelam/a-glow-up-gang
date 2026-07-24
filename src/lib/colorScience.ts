// Small, dependency-free color science helpers used to turn raw pixel colors
// (sampled from a photo) into the same measurable axes the 16-season
// taxonomy is already described in: depth (light <-> dark), warmth
// (cool <-> warm), clarity (muted <-> clear/high-chroma), and contrast
// (how different two regions are in depth).
//
// These are standard, published formulas (CIELAB color space, and the
// dermatology-standard "Individual Typology Angle" for skin lightness) —
// nothing here is invented or LLM-guessed. This file has no knowledge of
// seasons at all; it only converts colors into numbers.

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface Lab {
  L: number;
  a: number;
  b: number;
}

// sRGB -> linear -> CIE XYZ (D65 white point) -> CIELAB.
// Reference: standard sRGB->Lab conversion (CIE 1976).
export function rgbToLab({ r, g, b }: RGB): Lab {
  const toLinear = (c: number) => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const R = toLinear(r);
  const G = toLinear(g);
  const B = toLinear(b);

  // sRGB -> XYZ (D65)
  const X = R * 0.4124564 + G * 0.3575761 + B * 0.1804375;
  const Y = R * 0.2126729 + G * 0.7151522 + B * 0.072175;
  const Z = R * 0.0193339 + G * 0.119192 + B * 0.9503041;

  // Normalize by D65 reference white
  const Xn = 0.95047;
  const Yn = 1.0;
  const Zn = 1.08883;

  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const fx = f(X / Xn);
  const fy = f(Y / Yn);
  const fz = f(Z / Zn);

  return {
    L: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

// Individual Typology Angle — the standard dermatology formula for skin-tone
// depth, independent of hue. Higher ITA = lighter skin, lower/negative ITA =
// deeper skin. Formula: ITA° = atan((L* - 50) / b*) * (180 / pi).
export function individualTypologyAngle({ L, b }: Lab): number {
  return (Math.atan((L - 50) / (b || 0.0001)) * 180) / Math.PI;
}

// Hue angle in CIELAB a*/b* space, in degrees 0-360. Used for undertone:
// roughly 0-90° leans red/yellow (warm), 180-270° leans blue/green (cool).
// We don't use this raw angle directly for the "warmth" score below (a
// simple a*/b* ratio is more stable for skin-tone-range colors, which sit
// in a narrow part of the hue wheel) but it's kept here as it's a standard,
// citable metric and useful for eye-color hue in particular.
export function labHueAngle({ a, b }: Lab): number {
  let angle = (Math.atan2(b, a) * 180) / Math.PI;
  if (angle < 0) angle += 360;
  return angle;
}

// Chroma (saturation) in CIELAB — distance from neutral grey.
export function labChroma({ a, b }: Lab): number {
  return Math.sqrt(a * a + b * b);
}

export function rgbToChroma(rgb: RGB): number {
  return labChroma(rgbToLab(rgb));
}

export function averageRgb(pixels: RGB[]): RGB {
  if (pixels.length === 0) return { r: 128, g: 128, b: 128 };
  const sum = pixels.reduce(
    (acc, p) => ({ r: acc.r + p.r, g: acc.g + p.g, b: acc.b + p.b }),
    { r: 0, g: 0, b: 0 }
  );
  return {
    r: sum.r / pixels.length,
    g: sum.g / pixels.length,
    b: sum.b / pixels.length,
  };
}
