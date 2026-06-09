// Data model for the "Today, We Need to Talk" carousel generator.
// 5 fixed slide types, each with 3 design variants (A/B/C) = 15 compositions.

export const CAROUSEL_SIZE = 1080;
export const DEFAULT_SERIES_LABEL = "TODAY, WE NEED TO TALK";

export type SlideType = "hook" | "constat" | "data" | "insight" | "solution";
export type Variant = "A" | "B" | "C";
export type ThemeToggle = "light" | "dark";
// Resolved palette key (intrinsic colored variants add pink/amber/blue)
export type Palette = "light" | "dark" | "pink" | "amber" | "blue";

export const SLIDE_TYPES: SlideType[] = ["hook", "constat", "data", "insight", "solution"];

export const SLIDE_NUMBER: Record<SlideType, number> = {
  hook: 1,
  constat: 2,
  data: 3,
  insight: 4,
  solution: 5,
};

export interface SlideTypeMeta {
  type: SlideType;
  number: number;
  name: string;
  role: string;
  variants: { id: Variant; label: string }[];
}

export const SLIDE_TYPE_META: Record<SlideType, SlideTypeMeta> = {
  hook: {
    type: "hook",
    number: 1,
    name: "Stop-to-Scroll",
    role: "Attention-grabbing headline + tension subheadline",
    variants: [
      { id: "A", label: "Dark Statement" },
      { id: "B", label: "Pink Slam" },
      { id: "C", label: "Conversation" },
    ],
  },
  constat: {
    type: "constat",
    number: 2,
    name: "Constat",
    role: "Scenario / problem situation + conversational subheading",
    variants: [
      { id: "A", label: "Editorial" },
      { id: "B", label: "Chat" },
      { id: "C", label: "Picture This (Dark)" },
    ],
  },
  data: {
    type: "data",
    number: 3,
    name: "Data",
    role: "One dominant statistic + source",
    variants: [
      { id: "A", label: "Mono Giant" },
      { id: "B", label: "Dark Spotlight" },
      { id: "C", label: "Color Block" },
    ],
  },
  insight: {
    type: "insight",
    number: 4,
    name: "Insight",
    role: "Editorial conclusion, restating the problem",
    variants: [
      { id: "A", label: "Quote" },
      { id: "B", label: "Underline" },
      { id: "C", label: "Manifesto (Dark)" },
    ],
  },
  solution: {
    type: "solution",
    number: 5,
    name: "Solution",
    role: "Migbirds product + CTA → migbirds.com",
    variants: [
      { id: "A", label: "Dark Hero" },
      { id: "B", label: "Gradient Card" },
      { id: "C", label: "Light Hero" },
    ],
  },
};

// Intrinsic base palette for each composition.
export const VARIANT_BASE_PALETTE: Record<string, Palette> = {
  hook_A: "dark", hook_B: "pink", hook_C: "dark",
  constat_A: "light", constat_B: "light", constat_C: "dark",
  data_A: "light", data_B: "dark", data_C: "blue",
  insight_A: "light", insight_B: "amber", insight_C: "dark",
  solution_A: "dark", solution_B: "dark", solution_C: "light",
};

// Colored variants are locked to their palette — the Light/Dark toggle
// does not apply (pink / amber / blue are the variant's defining look).
export const LOCKED_VARIANTS = new Set(["hook_B", "data_C", "insight_B"]);

export function variantKey(type: SlideType, variant: Variant): string {
  return `${type}_${variant}`;
}

export function isLockedVariant(type: SlideType, variant: Variant): boolean {
  return LOCKED_VARIANTS.has(variantKey(type, variant));
}

// Resolve the palette to render: locked variants ignore the toggle.
export function resolvePalette(
  type: SlideType,
  variant: Variant,
  toggle: ThemeToggle
): Palette {
  const key = variantKey(type, variant);
  if (LOCKED_VARIANTS.has(key)) return VARIANT_BASE_PALETTE[key];
  return toggle; // "light" | "dark"
}

// Per-slide editable content. Field meaning varies by slide type.
export interface SlideContent {
  mainText: string;       // headline / scenario / stat / insight lead / claim
  highlightText: string;  // hook + insight: the emphasized closing phrase
  secondaryText: string;  // subheadline / conversational line / label / body
  source: string;         // data only
  cta: string;            // solution only
  url: string;            // solution only
}

// Full per-slide configuration held in generator state.
export interface SlideConfig {
  type: SlideType;
  variant: Variant;
  theme: ThemeToggle;
  content: SlideContent;
}

// Resolved data passed to a slide renderer.
export interface SlideRenderData {
  type: SlideType;
  variant: Variant;
  palette: Palette;
  seriesLabel: string;
  content: SlideContent;
}

// ── Sample edition copy: "Why résumés fail to predict performance" ──
export const SAMPLE_CONTENT: Record<SlideType, SlideContent> = {
  hook: {
    mainText: "Your résumé predicts",
    highlightText: "almost nothing.",
    secondaryText: "And we still let it decide who gets hired.",
    source: "",
    cta: "",
    url: "",
  },
  constat: {
    mainText:
      "You shortlist the five strongest CVs. Six months later, your top pick is your least engaged hire.",
    highlightText: "",
    secondaryText: "Sound familiar?",
    source: "",
    cta: "",
    url: "",
  },
  data: {
    mainText: "7.4s",
    highlightText: "",
    secondaryText:
      "the average time a recruiter spends on a résumé before judging a candidate.",
    source: "The Ladders · Eye-Tracking Study, 2018",
    cta: "",
    url: "",
  },
  insight: {
    mainText: "We keep hiring for what fits on a page —",
    highlightText: "then act surprised when it doesn't fit the job.",
    secondaryText:
      "Skills can be taught. Mindset, motivation and fit can't be read off a CV.",
    source: "",
    cta: "",
    url: "",
  },
  solution: {
    mainText: "A new way to grow",
    highlightText: "",
    secondaryText:
      "Migbirds matches companies with experts by mindset, soft skills and motivation. Beyond the CV.",
    source: "",
    cta: "Take the 20-min test",
    url: "migbirds.com",
  },
};

export function defaultSlideConfig(type: SlideType): SlideConfig {
  const base = VARIANT_BASE_PALETTE[variantKey(type, "A")];
  return {
    type,
    variant: "A",
    theme: base === "dark" ? "dark" : "light",
    content: { ...SAMPLE_CONTENT[type] },
  };
}
