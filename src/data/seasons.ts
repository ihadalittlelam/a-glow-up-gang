// 16-season PCCS-mapped color analysis taxonomy.
// This is the DIAGNOSTIC layer (how to recognize each season from a person's
// features) that Jess supplied. The `placeholderPalette` hex arrays below are
// NOT the real recommended-color output yet — they're visually distinct
// stand-ins so the results page renders something coherent. Swap these for
// the actual "colors this person should wear" palette per season later.

export type SeasonFamily = "Spring" | "Summer" | "Autumn" | "Winter";

export interface SeasonProfile {
  slug: string;
  name: string;
  family: SeasonFamily;
  keywords: string[];
  pccsLocation: string;
  blueprint: {
    skin: string;
    hair: string;
    eyeColor: string;
    eyeExpression: string;
  };
  placeholderPalette: string[];
}

export const FAMILY_META: Record<
  SeasonFamily,
  { emoji: string; tagline: string; accent: string }
> = {
  Spring: { emoji: "\u{1F3DB}\u{FE0F}", tagline: "Warm • Light • Clear", accent: "#F4A300" },
  Summer: { emoji: "\u{1F30A}", tagline: "Cool • Light • Muted", accent: "#5C7AA0" },
  Autumn: { emoji: "\u{1F341}", tagline: "Warm • Deep • Muted", accent: "#A4462E" },
  Winter: { emoji: "❄\u{FE0F}", tagline: "Cool • Deep • Clear", accent: "#274690" },
};

export const SEASONS: SeasonProfile[] = [
  // ---------------- SPRING ----------------
  {
    slug: "light-spring",
    name: "Light Spring",
    family: "Spring",
    keywords: ["Luminous", "Delicate", "Translucent", "Airy", "Fresh"],
    pccsLocation:
      "Pale (p) and Light (lt) rings. High value, low-to-medium saturation, warm hue.",
    blueprint: {
      skin: "Translucent ivory, peach-porcelain, or fair beige; highly prone to blushing.",
      hair: "Light golden blonde, strawberry blonde, or flaxen.",
      eyeColor: "Light clear blue, pale green, or soft hazel.",
      eyeExpression: "A glass-like, innocent, and highly reflective sparkle.",
    },
    placeholderPalette: ["#FFD9C7", "#FFF3B0", "#B7E4C7", "#FFB6A3", "#F7E1D7"],
  },
  {
    slug: "bright-spring",
    name: "Bright Spring",
    family: "Spring",
    keywords: ["Vibrant", "Sparkling", "Radiant", "Energizing", "Punchy"],
    pccsLocation:
      "Bridges Light (lt) and Bright (b) rings. High value, medium-high chroma, clear warm-neutral hue.",
    blueprint: {
      skin: "Clear ivory, luminous golden beige, or bright warm ruddy tones.",
      hair: "Honey brown, bright golden brown, or copper-blonde.",
      eyeColor: "Vivid teal green, bright sparkling topaz, or clear warm hazel.",
      eyeExpression: "Twinkling, animated, and highly refractive; the eyes act as a focal point.",
    },
    placeholderPalette: ["#FF6F61", "#FFD23F", "#06D6A0", "#FF9F1C", "#4CC9F0"],
  },
  {
    slug: "vivid-spring",
    name: "Vivid Spring",
    family: "Spring",
    keywords: ["Striking", "High-Chroma", "Electric", "Playful", "High-Contrast"],
    pccsLocation:
      "Anchored in Vivid (v) and Strong (str) rings. Maximum saturation, medium value, warm-neutral hue.",
    blueprint: {
      skin: "Radiant golden-beige, clear bronze, or glowing dark warm skin with high clarity.",
      hair: "Medium to deep golden chestnut, dark coppery brown, or glossy black with golden highlights.",
      eyeColor: "Clear intense dark brown, striking warm amber, or vivid turquoise green.",
      eyeExpression: "Compelling, impactful, and intensely alert with a jewel-like shine.",
    },
    placeholderPalette: ["#FF4500", "#FFD700", "#00A86B", "#E63946", "#F4A300"],
  },
  {
    slug: "warm-spring",
    name: "Warm Spring",
    family: "Spring",
    keywords: ["Honeyed", "Sunny", "Golden", "Richly-Warm", "Cozy"],
    pccsLocation:
      "Spans Bright (b), Vivid (v), Strong (str) rings; defined by the absolute Warmest Axis (yellow-dominant).",
    blueprint: {
      skin: "Noticeably golden, warm peach, or copper-tan with distinct warm undertones.",
      hair: "True red, ginger, rich copper, or golden auburn.",
      eyeColor: "Topaz brown, warm olive-hazel, or golden green.",
      eyeExpression: "Friendly, radiant, and radiating a sunlit heat.",
    },
    placeholderPalette: ["#C1440E", "#E09F3E", "#9E2A2B", "#FFB703", "#540B0E"],
  },
  // ---------------- SUMMER ----------------
  {
    slug: "light-summer",
    name: "Light Summer",
    family: "Summer",
    keywords: ["Ethereal", "Pastel", "Delicate", "Watercolor", "Misty"],
    pccsLocation:
      "Pale (p) and Light (lt) rings. High value, low-to-medium saturation, cool hue.",
    blueprint: {
      skin: "Cool porcelain, pale pinkish-beige, or delicate rosy alabaster.",
      hair: "Ash blonde, ultra-light ash brown, or platinum flaxen.",
      eyeColor: "Light icy blue, soft grey, or pale grey-green.",
      eyeExpression: "Dreamy, diffuse, and visually soft; low contrast against the sclera.",
    },
    placeholderPalette: ["#D8E2F0", "#E6D9E8", "#F4E4E6", "#C9D6DF", "#B8C5D6"],
  },
  {
    slug: "bright-summer",
    name: "Bright Summer",
    family: "Summer",
    keywords: ["Refreshing", "Breezy", "Fluid", "Clear-Cool", "Crisp"],
    pccsLocation:
      "Light (lt) and Bright (b) rings. High-to-medium value, medium-high clarity, cool-neutral hue.",
    blueprint: {
      skin: "Clear cool pink, bright rose-beige, or clear light cool-olive.",
      hair: "Medium ash blonde or light-to-medium ash brown with a soft natural sheen.",
      eyeColor: "Clear sky blue, vibrant grey, or bright cool violet-grey.",
      eyeExpression: "Luminous and clear-sighted, but gentle rather than sharp.",
    },
    placeholderPalette: ["#4EA5D9", "#A0D2DB", "#C77DFF", "#F4A6C1", "#6C91BF"],
  },
  {
    slug: "muted-summer",
    name: "Muted Summer",
    family: "Summer",
    keywords: ["Elegant", "Smoky", "Matte", "Sophisticated", "Slate"],
    pccsLocation:
      "Soft (sf), Dull (d), Light Grayish (ltg), Grayish (g) rings. Medium value, low saturation, cool-neutral hue.",
    blueprint: {
      skin: "Muted pink-beige, dusty rose overtones, or soft grey-toned cool olive.",
      hair: "Medium to dark ash brown (often described as “mousey” or “dishwater” brown).",
      eyeColor: "Muted hazel-grey, soft grey-blue, or cloudy cool brown.",
      eyeExpression: "Velvety, calm, and shrouded; the iris features blended colors with no distinct borders.",
    },
    placeholderPalette: ["#A6A6A8", "#9CAFAA", "#8E9AAF", "#B0A8B9", "#C9BBC8"],
  },
  {
    slug: "cool-summer",
    name: "Cool Summer",
    family: "Summer",
    keywords: ["Serene", "Aristocratic", "Icy-Soft", "Blue-Heavy", "Regal"],
    pccsLocation:
      "Sweeps Light (lt), Bright (b), Soft (sf), Dull (d) rings; defined by the absolute Coolest Axis (blue-dominant).",
    blueprint: {
      skin: "Deep cool porcelain or pink-beige with prominent blue undertones.",
      hair: "Medium to dark ash brown with no traces of red or gold.",
      eyeColor: "Cool blue, slate grey, or deep cool charcoal-grey.",
      eyeExpression: "Serene, placid, and coolly poised.",
    },
    placeholderPalette: ["#5C7AA0", "#3E5C76", "#748CAB", "#1D3557", "#A9BCD0"],
  },
  // ---------------- AUTUMN ----------------
  {
    slug: "muted-autumn",
    name: "Muted Autumn",
    family: "Autumn",
    keywords: ["Earthy", "Understated", "Chic", "Khaki", "Sage"],
    pccsLocation:
      "Soft (sf), Dull (d), Light Grayish (ltg), Grayish (g) rings. Medium value, low saturation, warm-neutral hue.",
    blueprint: {
      skin: "Soft warm beige, light ivory-olive, or low-contrast warm complexions.",
      hair: "Muted golden brown, dark honey blonde, or soft faded auburn.",
      eyeColor: "Soft olive green, warm amber-grey, or light muddy brown.",
      eyeExpression: "Grounded, matte, and diffuse with a quiet, calm depth.",
    },
    placeholderPalette: ["#A9927D", "#6B705C", "#B08968", "#7F5539", "#DDBEA9"],
  },
  {
    slug: "strong-autumn",
    name: "Strong Autumn",
    family: "Autumn",
    keywords: ["Rich", "Textured", "Splendid", "Abundant", "Dynamic"],
    pccsLocation:
      "Strong (str) and Deep (dp) rings. Medium-low value, medium-high saturation, warm hue.",
    blueprint: {
      skin: "Rich golden beige, amber, or warm deep bronze.",
      hair: "Deep chestnut brown, rich auburn, or dark brown shot with copper.",
      eyeColor: "Dark olive green, deep golden hazel, or rich medium warm brown.",
      eyeExpression: "Magnetic, solid, and structurally heavy; highly textured iris.",
    },
    placeholderPalette: ["#A4462E", "#6F1D1B", "#B08B2D", "#8A5A44", "#C97C5D"],
  },
  {
    slug: "deep-autumn",
    name: "Deep Autumn",
    family: "Autumn",
    keywords: ["Mysterious", "Majestic", "Espresso", "Heavy", "Brooding"],
    pccsLocation:
      "Deep (dp), Dark (dk), Dark Grayish (dkg) rings. Low value, medium saturation, warm-neutral hue.",
    blueprint: {
      skin: "Deep golden brown, rich bronze, dark olive, or warm terracotta black.",
      hair: "Dark chocolate brown, espresso black, or deep warm black.",
      eyeColor: "Dark espresso brown, black-brown, or deep olive-black.",
      eyeExpression: "Penetrating and dense, with an absorbing, opaque gaze.",
    },
    placeholderPalette: ["#4A2E19", "#6B4226", "#7A3B1E", "#3E2723", "#5B3A29"],
  },
  {
    slug: "warm-autumn",
    name: "Warm Autumn",
    family: "Autumn",
    keywords: ["Terracotta", "Harvest", "Spicy", "Deep-Gold", "Radiant"],
    pccsLocation:
      "Spans Strong (str), Deep (dp), Dark (dk), Dull (d) rings; anchored to the absolute Warmest Axis (orange-dominant).",
    blueprint: {
      skin: "Heavy golden-amber skin, glowing copper tones, or rich warm gold undertones.",
      hair: "Vibrant copper, rich auburn, fiery dark red, or golden chestnut.",
      eyeColor: "True amber, topaz, rich golden brown, or dark warm green.",
      eyeExpression: "Deeply glowing and intense, evoking a crackling flame.",
    },
    placeholderPalette: ["#C1440E", "#B5651D", "#DA9A00", "#8B3A2B", "#E08E45"],
  },
  // ---------------- WINTER ----------------
  {
    slug: "clear-winter",
    name: "Clear Winter",
    family: "Winter",
    keywords: ["Crystalline", "Stark", "Glacial", "High-Contrast", "Crisp"],
    pccsLocation:
      "Pale (p), Light (lt), Bright (b) rings paired in high-contrast with Dark (dk)/pure black. High clarity, cool-neutral hue.",
    blueprint: {
      skin: "Translucent cool white, clear alabaster, or highly luminous dark cool skin.",
      hair: "Stark jet black, dark ash brown, or icy platinum-white.",
      eyeColor: "Piercing clear blue, vivid emerald green, or striking violet.",
      eyeExpression: "Laser-sharp and crystalline; the iris stands out dramatically against the bright sclera.",
    },
    placeholderPalette: ["#101820", "#2E294E", "#1B98E0", "#DDEEFF", "#7A28CB"],
  },
  {
    slug: "deep-winter",
    name: "Deep Winter",
    family: "Winter",
    keywords: ["Charcoal", "Intense", "Royal", "Regal", "Enigmatic"],
    pccsLocation:
      "Deep (dp), Dark (dk), Dark Grayish (dkg) rings. Low value, medium saturation, cool-neutral hue.",
    blueprint: {
      skin: "Cool espresso, deep cool olive, or stark chalk-white with an icy undertone.",
      hair: "Inky black, charcoal brown, or deep silver-black.",
      eyeColor: "Black-brown, deep obsidian, or dark cool hazel.",
      eyeExpression: "Enigmatic, magnetic, and commanding with a dense gaze.",
    },
    placeholderPalette: ["#1B1B2F", "#3C1053", "#22223B", "#4A4E69", "#0D1321"],
  },
  {
    slug: "vivid-winter",
    name: "Vivid Winter",
    family: "Winter",
    keywords: ["Electric", "Neon", "Dramatic", "High-Chroma", "High-Impact"],
    pccsLocation:
      "Anchored in Vivid (v) and Strong (str) rings. Maximum saturation, medium value, cool-neutral hue.",
    blueprint: {
      skin: "Highly radiant cool beige, clear porcelain, or bright ebony.",
      hair: "Glossy jet black, dark silver, or pure white-streaked black.",
      eyeColor: "Electric sapphire blue, clear vivid violet, or intense clear dark brown.",
      eyeExpression: "Theatrical and sharp, commanding immediate attention.",
    },
    placeholderPalette: ["#3A86FF", "#8338EC", "#FF006E", "#06FFA5", "#1B998B"],
  },
  {
    slug: "cool-winter",
    name: "Cool Winter",
    family: "Winter",
    keywords: ["Sapphire", "Slate", "True-Blue", "Pure-Cool", "Regal-Chill"],
    pccsLocation:
      "Spans Vivid (v), Strong (str), Deep (dp), Dark (dk) rings; aligned to the absolute Coolest Axis (blue-dominant).",
    blueprint: {
      skin: "Classic blue-based undertones, cool pinkish-white, or cool slate-brown.",
      hair: "Ashy blue-black, charcoal, or uniform deep silver (no warmth).",
      eyeColor: "Deep sapphire blue, clear cool grey, or dark icy brown.",
      eyeExpression: "Chilled, majestic, and formal, free of yellow interference.",
    },
    placeholderPalette: ["#14213D", "#274690", "#7A9CC6", "#B0C4DE", "#1D2B53"],
  },
];

export function getSeasonBySlug(slug: string): SeasonProfile | undefined {
  return SEASONS.find((s) => s.slug === slug);
}
