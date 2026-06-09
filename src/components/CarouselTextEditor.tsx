"use client";

import { CarouselSlideConfig } from "@/lib/carousel-types";

interface CarouselTextEditorProps {
  slideConfig: CarouselSlideConfig;
  mainText: string;
  secondaryText: string;
  onMainTextChange: (text: string) => void;
  onSecondaryTextChange: (text: string) => void;
}

export default function CarouselTextEditor({
  slideConfig,
  mainText,
  secondaryText,
  onMainTextChange,
  onSecondaryTextChange,
}: CarouselTextEditorProps) {
  const showSecondary =
    slideConfig.secondaryTextMaxLength !== undefined &&
    slideConfig.secondaryTextMaxLength > 0;

  // Contextual labels based on slide type
  const mainLabel =
    slideConfig.slideNumber === 3
      ? "Key Statistic"
      : slideConfig.slideNumber === 1
      ? "Headline"
      : slideConfig.slideNumber === 5
      ? "Solution Text"
      : "Main Text";

  const secondaryLabel =
    slideConfig.slideNumber === 3
      ? "Source"
      : slideConfig.slideNumber === 1
      ? "Subheadline"
      : "Secondary Text";

  return (
    <div className="space-y-4">
      {/* Main text */}
      <div>
        <label className="block text-sm font-semibold text-migbirds-navy mb-2">
          {mainLabel}
        </label>
        <textarea
          value={mainText}
          onChange={(e) => onMainTextChange(e.target.value)}
          maxLength={slideConfig.mainTextMaxLength}
          rows={slideConfig.slideNumber === 3 ? 2 : 4}
          placeholder={slideConfig.mainTextPlaceholder}
          className="w-full px-4 py-3 rounded-xl border border-migbirds-navy/20 bg-white text-migbirds-navy placeholder:text-migbirds-navy/30 focus:outline-none focus:ring-2 focus:ring-migbirds-purple/50 focus:border-migbirds-purple resize-none text-sm"
        />
        <div className="flex justify-between mt-1">
          <p className="text-xs text-migbirds-navy/40">
            {slideConfig.slideNumber === 3
              ? "Use a big, impactful number"
              : "Text size adjusts automatically"}
          </p>
          <p className="text-xs text-migbirds-navy/40">
            {mainText.length}/{slideConfig.mainTextMaxLength}
          </p>
        </div>
      </div>

      {/* Secondary text */}
      {showSecondary && (
        <div>
          <label className="block text-sm font-semibold text-migbirds-navy mb-2">
            {secondaryLabel}
          </label>
          <textarea
            value={secondaryText}
            onChange={(e) => onSecondaryTextChange(e.target.value)}
            maxLength={slideConfig.secondaryTextMaxLength}
            rows={2}
            placeholder={slideConfig.secondaryTextPlaceholder}
            className="w-full px-4 py-3 rounded-xl border border-migbirds-navy/20 bg-white text-migbirds-navy placeholder:text-migbirds-navy/30 focus:outline-none focus:ring-2 focus:ring-migbirds-purple/50 focus:border-migbirds-purple resize-none text-sm"
          />
          <div className="flex justify-end mt-1">
            <p className="text-xs text-migbirds-navy/40">
              {secondaryText.length}/{slideConfig.secondaryTextMaxLength}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
