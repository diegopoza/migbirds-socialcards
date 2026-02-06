"use client";

import { PostType, CardFormat, ColorVariant } from "@/lib/types";

interface CardTypeSelectorProps {
  postType: PostType;
  format: CardFormat;
  colorVariant: ColorVariant;
  onPostTypeChange: (type: PostType) => void;
  onFormatChange: (format: CardFormat) => void;
  onColorVariantChange: (variant: ColorVariant) => void;
}

export default function CardTypeSelector({
  postType,
  format,
  colorVariant,
  onPostTypeChange,
  onFormatChange,
  onColorVariantChange,
}: CardTypeSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Post Type */}
      <div>
        <label className="block text-sm font-semibold text-migbirds-navy mb-3">
          Post Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onPostTypeChange("insightful")}
            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              postType === "insightful"
                ? "bg-migbirds-navy text-white shadow-lg"
                : "bg-white text-migbirds-navy border border-migbirds-navy/20 hover:border-migbirds-navy/40"
            }`}
          >
            Insightful
          </button>
          <button
            onClick={() => onPostTypeChange("poll")}
            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              postType === "poll"
                ? "bg-migbirds-navy text-white shadow-lg"
                : "bg-white text-migbirds-navy border border-migbirds-navy/20 hover:border-migbirds-navy/40"
            }`}
          >
            Poll
          </button>
          <button
            disabled
            className="px-4 py-3 rounded-xl text-sm font-medium bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
          >
            Storytelling
            <span className="block text-[10px] mt-0.5 text-gray-300">Coming Soon</span>
          </button>
        </div>
      </div>

      {/* Format */}
      <div>
        <label className="block text-sm font-semibold text-migbirds-navy mb-3">
          Format
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onFormatChange("linkedin")}
            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              format === "linkedin"
                ? "bg-migbirds-navy text-white shadow-lg"
                : "bg-white text-migbirds-navy border border-migbirds-navy/20 hover:border-migbirds-navy/40"
            }`}
          >
            <svg width="20" height="10" viewBox="0 0 20 10" className="opacity-60">
              <rect width="20" height="10" rx="2" fill="currentColor" />
            </svg>
            LinkedIn
          </button>
          <button
            onClick={() => onFormatChange("square")}
            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              format === "square"
                ? "bg-migbirds-navy text-white shadow-lg"
                : "bg-white text-migbirds-navy border border-migbirds-navy/20 hover:border-migbirds-navy/40"
            }`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" className="opacity-60">
              <rect width="12" height="12" rx="2" fill="currentColor" />
            </svg>
            Square
          </button>
        </div>
      </div>

      {/* Color Variant (only for Insightful) */}
      {postType === "insightful" && (
        <div>
          <label className="block text-sm font-semibold text-migbirds-navy mb-3">
            Color Scheme
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onColorVariantChange("light")}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                colorVariant === "light"
                  ? "bg-migbirds-navy text-white shadow-lg"
                  : "bg-white text-migbirds-navy border border-migbirds-navy/20 hover:border-migbirds-navy/40"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-[#F7F5F3] border border-gray-300" />
              Light
            </button>
            <button
              onClick={() => onColorVariantChange("dark")}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                colorVariant === "dark"
                  ? "bg-migbirds-navy text-white shadow-lg"
                  : "bg-white text-migbirds-navy border border-migbirds-navy/20 hover:border-migbirds-navy/40"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-[#0A0632]" />
              Dark
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
