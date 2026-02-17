export type PostType = "insightful" | "poll" | "storytelling";
export type CardFormat = "square" | "linkedin";
export type ColorVariant = "light" | "dark";

export interface CardConfig {
  postType: PostType;
  format: CardFormat;
  colorVariant: ColorVariant;
  text: string;
}

export interface TemplateConfig {
  id: string;
  postType: PostType;
  format: CardFormat;
  colorVariant: ColorVariant;
  label: string;
  width: number;
  height: number;
  textArea: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  textColor: string;
  bgColor: string;
  tagLabel: string;
}

export const TEMPLATES: TemplateConfig[] = [
  // Insightful Light
  {
    id: "insightful-light-square",
    postType: "insightful",
    format: "square",
    colorVariant: "light",
    label: "Insightful (Light)",
    width: 627,
    height: 627,
    textArea: { x: 50, y: 130, width: 430, height: 320 },
    textColor: "#0A0632",
    bgColor: "#F7F5F3",
    tagLabel: "INSIGHT",
  },
  {
    id: "insightful-light-linkedin",
    postType: "insightful",
    format: "linkedin",
    colorVariant: "light",
    label: "Insightful (Light)",
    width: 1200,
    height: 627,
    textArea: { x: 50, y: 130, width: 680, height: 320 },
    textColor: "#0A0632",
    bgColor: "#F7F5F3",
    tagLabel: "INSIGHT",
  },
  // Insightful Dark
  {
    id: "insightful-dark-square",
    postType: "insightful",
    format: "square",
    colorVariant: "dark",
    label: "Insightful (Dark)",
    width: 627,
    height: 627,
    textArea: { x: 50, y: 130, width: 430, height: 320 },
    textColor: "#F7F5F3",
    bgColor: "#0A0632",
    tagLabel: "INSIGHT",
  },
  {
    id: "insightful-dark-linkedin",
    postType: "insightful",
    format: "linkedin",
    colorVariant: "dark",
    label: "Insightful (Dark)",
    width: 1200,
    height: 627,
    textArea: { x: 50, y: 130, width: 680, height: 320 },
    textColor: "#F7F5F3",
    bgColor: "#0A0632",
    tagLabel: "INSIGHT",
  },
  // Poll
  {
    id: "poll-light-square",
    postType: "poll",
    format: "square",
    colorVariant: "light",
    label: "Poll / Quiz",
    width: 627,
    height: 627,
    textArea: { x: 50, y: 130, width: 430, height: 320 },
    textColor: "#0A0632",
    bgColor: "#F7F5F3",
    tagLabel: "POLL",
  },
  {
    id: "poll-light-linkedin",
    postType: "poll",
    format: "linkedin",
    colorVariant: "light",
    label: "Poll / Quiz",
    width: 1200,
    height: 627,
    textArea: { x: 50, y: 130, width: 680, height: 320 },
    textColor: "#0A0632",
    bgColor: "#F7F5F3",
    tagLabel: "POLL",
  },
];

export interface PersonPhoto {
  id: string;
  src: string;
  label: string;
}

export const PEOPLE_PHOTOS: PersonPhoto[] = [
  { id: "talent-1", src: "/people/talent-1.jpg", label: "Talent 1" },
  { id: "talent-2", src: "/people/talent-2.jpg", label: "Talent 2" },
  { id: "talent-3", src: "/people/talent-3.jpg", label: "Talent 3" },
  { id: "talent-4", src: "/people/talent-4.jpg", label: "Talent 4" },
  { id: "talent-5", src: "/people/talent-5.jpg", label: "Talent 5" },
  { id: "talent-6", src: "/people/talent-6.jpg", label: "Talent 6" },
  { id: "talent-7", src: "/people/talent-7.jpg", label: "Talent 7" },
  { id: "talent-8", src: "/people/talent-8.jpg", label: "Talent 8" },
  { id: "talent-9", src: "/people/talent-9.jpg", label: "Talent 9" },
  { id: "talent-10", src: "/people/talent-10.jpg", label: "Talent 10" },
  { id: "talent-11", src: "/people/talent-11.jpg", label: "Talent 11" },
  { id: "talent-12", src: "/people/talent-12.jpg", label: "Talent 12" },
  { id: "team-1", src: "/people/team-1.jpg", label: "Team 1" },
  { id: "team-2", src: "/people/team-2.jpg", label: "Team 2" },
];

export function getTemplate(
  postType: PostType,
  format: CardFormat,
  colorVariant: ColorVariant
): TemplateConfig | undefined {
  return TEMPLATES.find(
    (t) =>
      t.postType === postType &&
      t.format === format &&
      t.colorVariant === colorVariant
  );
}
