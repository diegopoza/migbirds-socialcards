"use client";

import { CarouselSlideNumber, CarouselTheme, CAROUSEL_SLIDES } from "@/lib/carousel-types";

interface CarouselSlideSelectorProps {
  slideNumber: CarouselSlideNumber;
  theme: CarouselTheme;
  onSlideChange: (slide: CarouselSlideNumber) => void;
  onThemeChange: (theme: CarouselTheme) => void;
}

export default function CarouselSlideSelector({
  slideNumber,
  theme,
  onSlideChange,
  onThemeChange,
}: CarouselSlideSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Slide Selector */}
      <div>
        <label className="block text-sm font-semibold text-migbirds-navy mb-3">
          Slide
        </label>
        <div className="space-y-1.5">
          {CAROUSEL_SLIDES.map((slide) => (
            <button
              key={slide.slideNumber}
              onClick={() => onSlideChange(slide.slideNumber)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${
                slideNumber === slide.slideNumber
                  ? "bg-migbirds-navy text-white shadow-lg"
                  : "bg-white text-migbirds-navy border border-migbirds-navy/10 hover:border-migbirds-navy/30"
              }`}
            >
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                  slideNumber === slide.slideNumber
                    ? "bg-white/20 text-white"
                    : "bg-migbirds-navy/5 text-migbirds-navy/50"
                }`}
              >
                {slide.slideNumber}
              </span>
              <div className="min-w-0">
                <div className="font-semibold truncate">{slide.label}</div>
                <div
                  className={`text-[11px] truncate ${
                    slideNumber === slide.slideNumber
                      ? "text-white/60"
                      : "text-migbirds-navy/40"
                  }`}
                >
                  {slide.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div>
        <label className="block text-sm font-semibold text-migbirds-navy mb-3">
          Theme
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onThemeChange("light")}
            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              theme === "light"
                ? "bg-migbirds-navy text-white shadow-lg"
                : "bg-white text-migbirds-navy border border-migbirds-navy/20 hover:border-migbirds-navy/40"
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-[#F7F5F3] border border-gray-300" />
            Light
          </button>
          <button
            onClick={() => onThemeChange("dark")}
            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              theme === "dark"
                ? "bg-migbirds-navy text-white shadow-lg"
                : "bg-white text-migbirds-navy border border-migbirds-navy/20 hover:border-migbirds-navy/40"
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-[#0A0632]" />
            Dark
          </button>
        </div>
      </div>
    </div>
  );
}
