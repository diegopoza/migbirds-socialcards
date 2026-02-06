"use client";

import { useState } from "react";
import { PostType, CardFormat, ColorVariant, getTemplate } from "@/lib/types";
import { CardPreview } from "@/lib/templates";
import CardTypeSelector from "@/components/CardTypeSelector";
import TextEditor from "@/components/TextEditor";
import ExportButtons from "@/components/ExportButtons";

export default function Home() {
  const [postType, setPostType] = useState<PostType>("insightful");
  const [format, setFormat] = useState<CardFormat>("linkedin");
  const [colorVariant, setColorVariant] = useState<ColorVariant>("light");
  const [text, setText] = useState("");

  // Reset color variant when switching to poll (poll is always light)
  const handlePostTypeChange = (type: PostType) => {
    setPostType(type);
    if (type === "poll") {
      setColorVariant("light");
    }
  };

  const template = getTemplate(postType, format, colorVariant);

  return (
    <div className="min-h-screen bg-migbirds-cream">
      {/* Header */}
      <header className="border-b border-migbirds-navy/10 bg-white/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          {/* Migbirds Logo (original SVG paths) */}
          <svg
            width="170"
            height="32"
            viewBox="48 486 175 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            {/* Icon squares */}
            <path d="M193.607 486V490.373H200.142V496.907H204.515V486H193.607Z" fill="#FF72D0" />
            <path d="M208.012 486V490.373H214.55V496.907H218.922V486H208.012Z" fill="#0A57FF" />
            <path d="M208.012 500.405V504.778H214.55V511.316H218.922V500.405H208.012Z" fill="#FFB300" />
            {/* migbirds text */}
            <path d="M54.7714 501.367V503.753H55.1562C55.8873 502.291 57.388 501.06 60.1585 501.06C62.929 501.06 64.5067 502.252 65.3917 504.061H65.7765C66.7 502.445 68.1237 501.06 71.2406 501.06C74.7807 501.06 77.6281 503.291 77.6281 507.909V520.453H72.7797V508.14C72.7797 506.062 71.6254 504.984 69.7014 504.984C67.4696 504.984 66.2383 506.447 66.2383 509.063V520.453H61.3899V508.14C61.3899 506.062 60.2355 504.984 58.3115 504.984C56.0797 504.984 54.8484 506.447 54.8484 509.063V520.453H50V501.367H54.7714Z" fill="#0A0632" />
            <path d="M87.1316 501.364H82.2832V520.449H87.1316V501.364Z" fill="#0A0632" />
            <path d="M106.18 501.364V503.942H105.795C104.641 502.287 102.794 500.825 99.4846 500.825C94.944 500.825 90.8652 504.673 90.8652 510.599C90.8652 516.525 94.944 520.373 99.4846 520.373C102.794 520.373 104.641 518.872 105.718 517.371H106.103V519.218C106.103 522.912 103.948 524.605 100.793 524.605C97.6376 524.605 96.1789 523.066 95.4688 521.023L91.1871 523.038C92.3239 525.802 95.2379 528.684 100.87 528.684C106.95 528.684 110.951 525.49 110.951 519.334V501.364H106.18ZM100.947 516.22C97.9454 516.22 95.7136 514.066 95.7136 510.602C95.7136 507.139 97.9454 504.984 100.947 504.984C103.948 504.984 106.18 507.139 106.18 510.602C106.18 514.066 103.948 516.22 100.947 516.22Z" fill="#0A0632" />
            <path d="M120.495 493.563V503.83H120.88C121.957 502.291 123.804 500.829 127.113 500.829C131.654 500.829 135.733 504.677 135.733 510.91C135.733 517.144 131.654 520.992 127.113 520.992C123.804 520.992 121.957 519.53 120.803 517.875H120.418V520.453H115.646V493.563H120.495ZM120.418 510.91C120.418 514.681 122.65 516.836 125.651 516.836C128.652 516.836 130.884 514.681 130.884 510.91C130.884 507.139 128.652 504.984 125.651 504.984C122.65 504.984 120.418 507.139 120.418 510.91Z" fill="#0A0632" />
            <path d="M144.313 501.364H139.465V520.449H144.313V501.364Z" fill="#0A0632" />
            <path d="M153.967 504.061H154.352C155.083 502.022 156.699 501.291 159.123 501.291H161.124V505.369H158.276C155.814 505.369 154.044 506.678 154.044 509.371V520.453H149.195V501.367H153.967V504.061Z" fill="#0A0632" />
            <path d="M182.52 520.453H177.748V517.875H177.364C176.209 519.53 174.362 520.992 171.053 520.992C166.512 520.992 162.434 517.144 162.434 510.91C162.434 504.677 166.512 500.829 171.053 500.829C174.362 500.829 176.209 502.291 177.287 503.83H177.671V493.563H182.52V520.453ZM167.282 510.91C167.282 514.681 169.514 516.836 172.515 516.836C175.517 516.836 177.748 514.681 177.748 510.91C177.748 507.139 175.517 504.984 172.515 504.984C169.514 504.984 167.282 507.139 167.282 510.91Z" fill="#0A0632" />
            <path d="M194.256 500.829C198.527 500.829 201.336 502.945 202.26 506.023L197.873 507.37C197.411 505.292 196.103 504.523 194.256 504.523C192.409 504.523 191.409 505.254 191.409 506.408C191.409 507.678 192.486 508.217 194.487 508.601L195.487 508.794C199.797 509.64 203.029 510.718 203.029 514.72C203.029 518.721 199.874 520.992 195.026 520.992C190.177 520.992 186.676 518.76 186.021 514.758L190.485 513.604C190.985 516.374 192.794 517.298 195.026 517.298C197.257 517.298 198.335 516.336 198.335 515.104C198.335 513.873 197.257 513.296 194.872 512.834L193.871 512.642C189.869 511.872 186.714 510.487 186.714 506.716C186.714 502.945 189.715 500.829 194.256 500.829Z" fill="#0A0632" />
            {/* Dots for i letters */}
            <path d="M87.4723 496.327C87.4723 497.852 86.234 499.09 84.7088 499.09C83.1836 499.09 81.9453 497.852 81.9453 496.327C81.9453 494.801 83.1836 493.563 84.7088 493.563C86.234 493.563 87.4723 494.801 87.4723 496.327Z" fill="#0A0632" />
            <path d="M144.652 496.327C144.652 497.852 143.414 499.09 141.889 499.09C140.363 499.09 139.125 497.852 139.125 496.327C139.125 494.801 140.363 493.563 141.889 493.563C143.414 493.563 144.652 494.801 144.652 496.327Z" fill="#0A0632" />
          </svg>
          <p className="text-[11px] text-migbirds-navy/50 leading-none ml-1">
            Social Card Creator
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 items-start">
          {/* Sidebar Controls */}
          <div className="space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-migbirds-navy/10 shadow-sm">
            <CardTypeSelector
              postType={postType}
              format={format}
              colorVariant={colorVariant}
              onPostTypeChange={handlePostTypeChange}
              onFormatChange={setFormat}
              onColorVariantChange={setColorVariant}
            />
            <hr className="border-migbirds-navy/10" />
            <TextEditor text={text} onTextChange={setText} />
            <hr className="border-migbirds-navy/10" />
            {template && (
              <ExportButtons
                template={template}
                text={text}
                disabled={!text.trim()}
              />
            )}
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-migbirds-navy/60">
                Preview
              </h2>
              <span className="text-xs text-migbirds-navy/40">
                {template ? `${template.width} x ${template.height}px` : ""}
              </span>
            </div>
            <div
              className={`rounded-2xl overflow-hidden shadow-xl border border-migbirds-navy/10 bg-white ${
                format === "linkedin" ? "max-w-full" : "max-w-[500px]"
              }`}
            >
              {template && <CardPreview template={template} text={text} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
