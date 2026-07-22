// 16-season PCCS-mapped color analysis taxonomy.
//
// Diagnostic fields (keywords, pccsLocation, blueprint) describe how to
// RECOGNIZE each season from a person's features — Jess supplied this layer.
//
// `recommendedPalette` is the OUTPUT layer: real colors a person of that
// season should wear, compiled from published seasonal-color-analysis
// sources (see the project doc `16-season-output-palettes.md` for full
// citations). Colors marked `estimated: true` had no published hex in any
// source found — a named color was matched to a reasonable hex instead.
// Seasons marked `needsReview: true` (Vivid Spring, Bright Summer, Strong
// Autumn) are the three with the weakest source grounding — worth a manual
// pass by an actual colorist before treating them as final.

export type SeasonFamily = "Spring" | "Summer" | "Autumn" | "Winter";

export interface PaletteColor {
  name: string;
  hex: string;
  estimated?: boolean;
}

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
  recommendedPalette: PaletteColor[];
  styleNote: string;
  needsReview?: boolean;
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
    recommendedPalette: [
      { name: "Warm Ivory", hex: "#FFF1D6" },
      { name: "Peach", hex: "#F6B38A" },
      { name: "Light Coral", hex: "#FF8F7A" },
      { name: "Warm Pink", hex: "#F7A6B8" },
      { name: "Butter Yellow", hex: "#F7D86A" },
      { name: "Fresh Mint", hex: "#9FD8B5" },
      { name: "Light Aqua", hex: "#68C7C1" },
      { name: "Clear Sky Blue", hex: "#67BDE0" },
      { name: "Golden Camel", hex: "#C99A5B" },
      { name: "Soft Grass Green", hex: "#B7C98F", estimated: true },
    ],
    styleNote:
      "Combine several soft-bright hues rather than going neutrals-only or monochrome; avoid black/white, deep jewel tones, and neon. Favor light gold or rose-gold metals.",
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
    recommendedPalette: [
      { name: "Clear Ivory", hex: "#FFF7E8" },
      { name: "Hot Coral", hex: "#FF5A5F" },
      { name: "Watermelon", hex: "#FF4F7B" },
      { name: "Poppy Red", hex: "#F53B2F" },
      { name: "Acid Yellow", hex: "#F4E04D" },
      { name: "Lime", hex: "#A7D129" },
      { name: "Clear Emerald", hex: "#00A676" },
      { name: "Bright Turquoise", hex: "#00B8C8" },
      { name: "Clear Warm Blue", hex: "#4FA3E3" },
      { name: "Warm Fuchsia", hex: "#CC5FA3" },
    ],
    styleNote:
      "Sits between Spring and Winter and can handle sharper contrast than other Spring seasons — pair bold accents with crisp warm neutrals, never dusty or ashy tones.",
  },
  {
    slug: "vivid-spring",
    name: "Vivid Spring",
    family: "Spring",
    keywords: ["Striking", "High-Chroma", "Electric", "Playful", "High-Contrast"],
    pccsLocation:
      "Vivid (v) and Strong (str) rings. Maximum saturation, medium value, warm-neutral hue.",
    blueprint: {
      skin: "Radiant golden-beige, clear bronze, or glowing dark warm skin with high clarity.",
      hair: "Medium to deep golden chestnut, dark coppery brown, or glossy black with golden highlights.",
      eyeColor: "Clear intense dark brown, striking warm amber, or vivid turquoise green.",
      eyeExpression: "Compelling, impactful, and intensely alert with a jewel-like shine.",
    },
    recommendedPalette: [
      { name: "Poppy/True Red", hex: "#E8352B", estimated: true },
      { name: "Golden Yellow", hex: "#FDBB2D", estimated: true },
      { name: "Bright Turquoise", hex: "#00B3B0", estimated: true },
      { name: "Grass/Kelly Green", hex: "#4CAF3C", estimated: true },
      { name: "Coral", hex: "#FF6B4A", estimated: true },
      { name: "Warm Fuchsia", hex: "#E8467F", estimated: true },
      { name: "Tangerine/Orange-Red", hex: "#F0592B", estimated: true },
      { name: "Camel", hex: "#C69963", estimated: true },
      { name: "Warm Ivory", hex: "#FFF2DC", estimated: true },
      { name: "Bright Navy", hex: "#223A5E", estimated: true },
    ],
    styleNote:
      "No source publishes a palette under this exact name — built from convergent \"True Spring\" guides, pushed toward max chroma to stay distinct from Bright Spring.",
    needsReview: true,
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
    recommendedPalette: [
      { name: "Cream", hex: "#FFF4D6" },
      { name: "Golden Yellow", hex: "#F5C542" },
      { name: "Marigold", hex: "#F4A51C" },
      { name: "Clear Coral", hex: "#FF6F61" },
      { name: "Tomato Red", hex: "#E94B35" },
      { name: "Grass Green", hex: "#54A24B" },
      { name: "Warm Turquoise", hex: "#28B7A8" },
      { name: "Warm Teal", hex: "#177E7A" },
      { name: "Cognac", hex: "#B86B2B" },
      { name: "Golden Brown", hex: "#8A5A2B" },
    ],
    styleNote:
      "Even \"neutrals\" must read golden, never gray. Gold, brass, or copper metals only.",
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
    recommendedPalette: [
      { name: "Powder Blue", hex: "#B0E0E6" },
      { name: "Soft Rose", hex: "#D8A2A8" },
      { name: "Lavender", hex: "#E6E6FA" },
      { name: "Periwinkle", hex: "#CCCCFF" },
      { name: "Soft Aqua", hex: "#AFDCD3" },
      { name: "Rose Quartz", hex: "#F7CAC9" },
      { name: "Pale Cool Lemon", hex: "#F5F0C9", estimated: true },
      { name: "Sky Blue", hex: "#87CEEB" },
      { name: "Muted Soft Navy", hex: "#3B4A5A", estimated: true },
      { name: "Dove Grey", hex: "#C0C0C0" },
    ],
    styleNote:
      "Stay light-to-medium value with moderate saturation and cool undertone throughout. Avoid pure black or stark white near the face; skip orange-based warmth. Silver, platinum, or white gold metals.",
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
    recommendedPalette: [
      { name: "Watermelon Pink", hex: "#E75480" },
      { name: "Turquoise", hex: "#30D5C8" },
      { name: "Soft Fuchsia", hex: "#C74375", estimated: true },
      { name: "Clear Sapphire Blue", hex: "#2E5FA3", estimated: true },
      { name: "Jade Green", hex: "#00A86B" },
      { name: "Raspberry Sorbet", hex: "#E4287C", estimated: true },
      { name: "Bright Periwinkle-Violet", hex: "#8B7FD4", estimated: true },
      { name: "Icy Pink", hex: "#F4C2C2" },
      { name: "Crisp White", hex: "#F7F9FA", estimated: true },
      { name: "Cool Navy", hex: "#1B2A4A", estimated: true },
    ],
    styleNote:
      "Needs to read clear and cool rather than muted or warm — pair one saturated accent with a clean cool neutral rather than two brights together.",
    needsReview: true,
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
      hair: "Medium to dark ash brown (\"mousey\"/\"dishwater\" brown).",
      eyeColor: "Muted hazel-grey, soft grey-blue, or cloudy cool brown.",
      eyeExpression: "Velvety, calm, and shrouded; blended iris colors with no distinct borders.",
    },
    recommendedPalette: [
      { name: "Dusty Rose", hex: "#C9A9A6" },
      { name: "Antique Rose", hex: "#D4AEB3" },
      { name: "Muted Sage", hex: "#B8C4BA" },
      { name: "Slate Blue", hex: "#B5BEC9" },
      { name: "Soft Plum", hex: "#8F6A76" },
      { name: "Dusky Violet", hex: "#ACA6B3" },
      { name: "Washed Denim", hex: "#8FA3BA" },
      { name: "Soft Navy", hex: "#4A5463" },
      { name: "Pewter", hex: "#9EA3A6" },
    ],
    styleNote:
      "Keep everything at the same low-saturation, smoky/matte level — tonal, low-contrast combinations read as sophisticated. Matte or brushed silver and rose gold over polished gold.",
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
    recommendedPalette: [
      { name: "Periwinkle", hex: "#8B87C7" },
      { name: "Dusty Cornflower Blue", hex: "#6C90C4", estimated: true },
      { name: "Deep Dusty Rose", hex: "#C48793", estimated: true },
      { name: "Soft Burgundy", hex: "#7B2D42", estimated: true },
      { name: "Plum", hex: "#6F4E7C", estimated: true },
      { name: "Regal Sapphire Blue", hex: "#1F4E8C", estimated: true },
      { name: "Muted Blue-Green Teal", hex: "#4C8C8B", estimated: true },
      { name: "Icy Lavender", hex: "#C9C0DE", estimated: true },
      { name: "Charcoal Grey", hex: "#3B3F42", estimated: true },
      { name: "Navy", hex: "#1B2A45", estimated: true },
    ],
    styleNote:
      "Carries the widest range of any Summer sub-type, but every color must sit on the true-blue axis with zero yellow/gold undertone. Avoid pure black, optical white, or warm camel.",
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
    recommendedPalette: [
      { name: "Oyster", hex: "#E7D8C3" },
      { name: "Camel", hex: "#B88957" },
      { name: "Muted Coral", hex: "#C97963" },
      { name: "Terracotta Rose", hex: "#B66A58" },
      { name: "Olive", hex: "#737435" },
      { name: "Moss", hex: "#6F7B45" },
      { name: "Warm Teal", hex: "#5C8E72" },
      { name: "Warm Taupe", hex: "#9A8570" },
      { name: "Soft Espresso", hex: "#5B4432" },
      { name: "Bronze", hex: "#9A6A3A" },
    ],
    styleNote:
      "Should look gently dusted with a warm, golden veil — matte, low-contrast, softened. Swap black for soft espresso; avoid optic white, icy pastels, fuchsia, and neons.",
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
    recommendedPalette: [
      { name: "Pumpkin", hex: "#C86828" },
      { name: "Rust", hex: "#A84828" },
      { name: "Mustard Gold", hex: "#B08820" },
      { name: "Forest Green", hex: "#486838" },
      { name: "Warm Olive", hex: "#787828" },
      { name: "Copper", hex: "#B87333" },
      { name: "Paprika / Brick Red", hex: "#9E4624" },
      { name: "Deep Teal", hex: "#006D77" },
      { name: "Sienna", hex: "#A0522D" },
    ],
    styleNote:
      "Rare as a distinct label outside Korean personal-color systems — built from the closest documented analogue, \"True/Rich Autumn.\" Favor medium-to-high saturation jewel tones with real texture; matte gold, aged bronze, or burnished copper over shiny finishes.",
    needsReview: true,
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
    recommendedPalette: [
      { name: "Burnt Sienna", hex: "#924819" },
      { name: "Deep Burgundy", hex: "#954344" },
      { name: "Muddy Olive", hex: "#675100" },
      { name: "Dark Chocolate Brown", hex: "#3D2914" },
      { name: "Deep Teal", hex: "#008080" },
      { name: "Deep Plum / Aubergine", hex: "#701C1C" },
      { name: "Deep Mustard Gold", hex: "#CC7722" },
      { name: "Forest Green", hex: "#228B22" },
      { name: "Warm Cream", hex: "#FFEBCD" },
    ],
    styleNote:
      "Favor substantial, deep-and-warm colors over pure black (use dark chocolate brown instead). Warm metals — gold, bronze, copper — and gemstones like amber and garnet.",
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
    recommendedPalette: [
      { name: "Terracotta", hex: "#E2725B" },
      { name: "Rust", hex: "#B7410E" },
      { name: "Burnt Orange", hex: "#CC5500" },
      { name: "Goldenrod", hex: "#DAA520" },
      { name: "Mustard Yellow", hex: "#FFDB58" },
      { name: "Olive Green", hex: "#6B8E23" },
      { name: "Saddle Brown", hex: "#8B4513" },
      { name: "Amber", hex: "#FFBF00" },
      { name: "Warm Bronze", hex: "#966E22" },
    ],
    styleNote:
      "Layer different earth tones together for cohesive, sophisticated outfits. Gold, brass, copper, or bronze metals — avoid silver/platinum, which fight the golden undertone.",
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
    recommendedPalette: [
      { name: "Optic White", hex: "#FFFFFF" },
      { name: "Jet Black", hex: "#000000" },
      { name: "Deep Navy", hex: "#0A1F44" },
      { name: "Cobalt Blue", hex: "#0047FF" },
      { name: "Icy Periwinkle", hex: "#9BB2DB" },
      { name: "Emerald/Jade Green", hex: "#009B77", estimated: true },
      { name: "Bright Fuchsia Pink", hex: "#E27EAB" },
      { name: "Amethyst Purple", hex: "#6E64A3" },
      { name: "True Red", hex: "#C63836" },
      { name: "Acid/Lemon Yellow", hex: "#F4E842", estimated: true },
    ],
    styleNote:
      "Apply one very clear accent near the face for maximum impact; avoid muted earth tones, which flatten the natural brilliance. Silk/satin over matte; silver jewelry over gold.",
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
    recommendedPalette: [
      { name: "Deep Charcoal Black", hex: "#1A1A1A" },
      { name: "Royal Navy", hex: "#102A56" },
      { name: "Royal Purple", hex: "#4B2E83" },
      { name: "Burgundy", hex: "#5B1235" },
      { name: "Emerald", hex: "#0B6E4F" },
      { name: "Sapphire Blue", hex: "#1F3A93" },
      { name: "True Red", hex: "#C8102E" },
      { name: "Fuchsia", hex: "#C2156E" },
      { name: "Pine Green", hex: "#14533C" },
      { name: "Optic/Icy White", hex: "#F7F7F4" },
    ],
    styleNote:
      "Pair a deep neutral with one clear, saturated color and let it do the talking — charcoal with true red, navy with icy pink, black with emerald. Silver, white gold, or platinum metals.",
  },
  {
    slug: "vivid-winter",
    name: "Vivid Winter",
    family: "Winter",
    keywords: ["Electric", "Neon", "Dramatic", "High-Chroma", "High-Impact"],
    pccsLocation:
      "Vivid (v) and Strong (str) rings. Maximum saturation, medium value, cool-neutral hue.",
    blueprint: {
      skin: "Highly radiant cool beige, clear porcelain, or bright ebony.",
      hair: "Glossy jet black, dark silver, or pure white-streaked black.",
      eyeColor: "Electric sapphire blue, clear vivid violet, or intense clear dark brown.",
      eyeExpression: "Theatrical and sharp, commanding immediate attention.",
    },
    recommendedPalette: [
      { name: "Electric Blue", hex: "#1060F0" },
      { name: "Clear/True Red", hex: "#E02020" },
      { name: "Hot Pink", hex: "#E01880" },
      { name: "Vivid Purple", hex: "#8020C0" },
      { name: "Emerald Green", hex: "#00C957" },
      { name: "Deep Sky Blue (Sapphire)", hex: "#00BFFF" },
      { name: "Magenta", hex: "#FF00FF" },
      { name: "Bright White", hex: "#F8F8F8" },
      { name: "Midnight Navy", hex: "#191970" },
      { name: "Icy Mint", hex: "#A0F0E0" },
    ],
    styleNote:
      "Thrives on saturation and contrast; muted or warm-toned alternatives diminish the natural vibrancy. Silver jewelry always; avoid dusty rose, olive, camel, rust.",
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
    recommendedPalette: [
      { name: "Royal Blue", hex: "#002366" },
      { name: "True/Sapphire Blue", hex: "#0073C2" },
      { name: "Icy White", hex: "#F0F8FF" },
      { name: "True Black", hex: "#000000" },
      { name: "Deep Charcoal/Slate", hex: "#333333" },
      { name: "Deep Lavender", hex: "#786CBF" },
      { name: "Emerald Ice", hex: "#009B77" },
      { name: "Vibrant Fuchsia", hex: "#FF00FF" },
      { name: "Crimson", hex: "#DC143C" },
      { name: "Icy Pink", hex: "#FFB7C5" },
    ],
    styleNote:
      "Zero warm or golden warmth in any color; every hue sits on the blue-dominant axis. Silver, platinum, or white gold — avoid gold/bronze entirely.",
  },
];

export function getSeasonBySlug(slug: string): SeasonProfile | undefined {
  return SEASONS.find((s) => s.slug === slug);
}
