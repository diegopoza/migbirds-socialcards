"use client";

import { TemplateConfig } from "@/lib/types";
import { renderCardSvg } from "@/lib/templates";

interface ExportButtonsProps {
  template: TemplateConfig;
  text: string;
  disabled: boolean;
}

export default function ExportButtons({ template, text, disabled }: ExportButtonsProps) {
  const downloadSvg = () => {
    const svgString = renderCardSvg(template, text);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `migbirds-${template.postType}-${template.format}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPng = async () => {
    const svgString = renderCardSvg(template, text);
    const scale = 2; // 2x resolution for sharp output
    const canvas = document.createElement("canvas");
    canvas.width = template.width * scale;
    canvas.height = template.height * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, template.width, template.height);
      URL.revokeObjectURL(url);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const pngUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = `migbirds-${template.postType}-${template.format}.png`;
        a.click();
        URL.revokeObjectURL(pngUrl);
      }, "image/png");
    };

    img.src = url;
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-migbirds-navy mb-1">
        Download
      </label>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={downloadPng}
          disabled={disabled}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-migbirds-purple text-white hover:bg-migbirds-purple/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-migbirds-purple/25"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 10v3a1 1 0 001 1h10a1 1 0 001-1v-3M8 2v8m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          PNG
        </button>
        <button
          onClick={downloadSvg}
          disabled={disabled}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-white text-migbirds-navy border border-migbirds-navy/20 hover:border-migbirds-navy/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 10v3a1 1 0 001 1h10a1 1 0 001-1v-3M8 2v8m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          SVG
        </button>
      </div>
    </div>
  );
}
