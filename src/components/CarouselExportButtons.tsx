"use client";

import { useState } from "react";
import { CarouselSlideData, CarouselSlideNumber, CAROUSEL_SIZE } from "@/lib/carousel-types";
import { renderCarouselSlideSvg } from "@/lib/carousel-templates";

interface CarouselExportButtonsProps {
  slideData: CarouselSlideData;
  allSlidesData: CarouselSlideData[];
  disabled: boolean;
}

function downloadPngFromSvg(svgString: string, filename: string) {
  const scale = 2; // 2x for sharp 2160x2160 output
  const canvas = document.createElement("canvas");
  canvas.width = CAROUSEL_SIZE * scale;
  canvas.height = CAROUSEL_SIZE * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const img = new Image();
  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  img.onload = () => {
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0, CAROUSEL_SIZE, CAROUSEL_SIZE);
    URL.revokeObjectURL(url);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const pngUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(pngUrl);
    }, "image/png");
  };

  img.src = url;
}

export default function CarouselExportButtons({
  slideData,
  allSlidesData,
  disabled,
}: CarouselExportButtonsProps) {
  const [exportingAll, setExportingAll] = useState(false);

  const downloadCurrentPng = () => {
    const svgString = renderCarouselSlideSvg(slideData);
    downloadPngFromSvg(svgString, `migbirds-carousel-slide${slideData.slideNumber}.png`);
  };

  const downloadCurrentSvg = () => {
    const svgString = renderCarouselSlideSvg(slideData);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `migbirds-carousel-slide${slideData.slideNumber}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAllPngs = async () => {
    setExportingAll(true);
    // Small delay between downloads so browser doesn't block them
    for (const slide of allSlidesData) {
      const svgString = renderCarouselSlideSvg(slide);
      downloadPngFromSvg(svgString, `migbirds-carousel-slide${slide.slideNumber}.png`);
      await new Promise((r) => setTimeout(r, 600));
    }
    setExportingAll(false);
  };

  const hasAnyContent = allSlidesData.some((s) => s.mainText.trim());

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-migbirds-navy mb-1">
        Export Slide {slideData.slideNumber}
      </label>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={downloadCurrentPng}
          disabled={disabled}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-migbirds-purple text-white hover:bg-migbirds-purple/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-migbirds-purple/25"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 10v3a1 1 0 001 1h10a1 1 0 001-1v-3M8 2v8m0 0l-3-3m3 3l3-3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          PNG
        </button>
        <button
          onClick={downloadCurrentSvg}
          disabled={disabled}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-white text-migbirds-navy border border-migbirds-navy/20 hover:border-migbirds-navy/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 10v3a1 1 0 001 1h10a1 1 0 001-1v-3M8 2v8m0 0l-3-3m3 3l3-3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          SVG
        </button>
      </div>

      {/* Export all */}
      <button
        onClick={downloadAllPngs}
        disabled={!hasAnyContent || exportingAll}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-migbirds-navy text-white hover:bg-migbirds-navy/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {exportingAll ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
            </svg>
            Exporting...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 10v3a1 1 0 001 1h10a1 1 0 001-1v-3M8 2v8m0 0l-3-3m3 3l3-3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Export All 5 Slides (PNG)
          </>
        )}
      </button>
    </div>
  );
}
