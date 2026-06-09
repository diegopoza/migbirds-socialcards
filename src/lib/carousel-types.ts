export type CarouselSlideNumber = 1 | 2 | 3 | 4 | 5;
export type CarouselTheme = "light" | "dark";

export interface CarouselSlideConfig {
  slideNumber: CarouselSlideNumber;
  name: string;
  label: string;
  description: string;
  mainTextPlaceholder: string;
  secondaryTextPlaceholder?: string;
  mainTextMaxLength: number;
  secondaryTextMaxLength?: number;
}

export interface CarouselSlideData {
  slideNumber: CarouselSlideNumber;
  mainText: string;
  secondaryText: string;
  theme: CarouselTheme;
}

export const CAROUSEL_SIZE = 1080;

export const CAROUSEL_SLIDES: CarouselSlideConfig[] = [
  {
    slideNumber: 1,
    name: "stop-to-scroll",
    label: "Stop-to-scroll",
    description: "Attention-grabbing headline + tension subheadline",
    mainTextPlaceholder: "Your bold headline here...",
    secondaryTextPlaceholder: "Tension subheadline...",
    mainTextMaxLength: 80,
    secondaryTextMaxLength: 120,
  },
  {
    slideNumber: 2,
    name: "constat",
    label: "Constat",
    description: "Scenario / problem situation + conversational subheading",
    mainTextPlaceholder: "Describe the problem situation...",
    secondaryTextPlaceholder: "Conversational subheading...",
    mainTextMaxLength: 200,
    secondaryTextMaxLength: 100,
  },
  {
    slideNumber: 3,
    name: "data",
    label: "Data",
    description: "One strong key statistic + source",
    mainTextPlaceholder: "72%",
    secondaryTextPlaceholder: "Source: Author, Year",
    mainTextMaxLength: 30,
    secondaryTextMaxLength: 150,
  },
  {
    slideNumber: 4,
    name: "insight",
    label: "Insight",
    description: "Editorial conclusion, restating the problem",
    mainTextPlaceholder: "Your editorial insight here...",
    secondaryTextPlaceholder: "Optional supporting line...",
    mainTextMaxLength: 250,
    secondaryTextMaxLength: 100,
  },
  {
    slideNumber: 5,
    name: "solution",
    label: "Solution Migbirds",
    description: "Product presentation + CTA to migbirds.com",
    mainTextPlaceholder: "Your solution statement...",
    secondaryTextPlaceholder: "",
    mainTextMaxLength: 150,
    secondaryTextMaxLength: 0,
  },
];

export function getSlideConfig(slideNumber: CarouselSlideNumber): CarouselSlideConfig {
  return CAROUSEL_SLIDES[slideNumber - 1];
}
