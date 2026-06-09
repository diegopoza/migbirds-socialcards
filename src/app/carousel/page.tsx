"use client";

import "./carousel.css";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  SlideType,
  Variant,
  ThemeToggle,
  SlideConfig,
  SlideRenderData,
  SLIDE_TYPES,
  SLIDE_TYPE_META,
  SLIDE_NUMBER,
  CAROUSEL_SIZE,
  DEFAULT_SERIES_LABEL,
  defaultSlideConfig,
  resolvePalette,
  isLockedVariant,
  variantKey,
  VARIANT_BASE_PALETTE,
} from "@/lib/carousel-types";
import { CarouselSlide } from "@/lib/CarouselSlide";
import { exportSlidePng, exportSlideSvg, exportAllPng } from "@/lib/carousel-export";

// Which editable fields each slide type exposes, with contextual labels.
type FieldKey = "mainText" | "highlightText" | "secondaryText" | "source" | "cta" | "url";
const FIELDS: Record<SlideType, { key: FieldKey; label: string; placeholder: string; big?: boolean }[]> = {
  hook: [
    { key: "mainText", label: "Headline — lead", placeholder: "Your résumé predicts", big: true },
    { key: "highlightText", label: "Headline — highlight phrase", placeholder: "almost nothing." },
    { key: "secondaryText", label: "Subheadline", placeholder: "The tension line…", big: true },
  ],
  constat: [
    { key: "mainText", label: "Scenario", placeholder: "Describe the situation…", big: true },
    { key: "secondaryText", label: "Conversational line", placeholder: "Sound familiar?" },
  ],
  data: [
    { key: "mainText", label: "Statistic (one figure)", placeholder: "7.4s" },
    { key: "secondaryText", label: "Label", placeholder: "What the number means…", big: true },
    { key: "source", label: "Source", placeholder: "Author · Study, Year" },
  ],
  insight: [
    { key: "mainText", label: "Insight — lead", placeholder: "We keep hiring for what fits on a page —", big: true },
    { key: "highlightText", label: "Insight — emphasis phrase", placeholder: "then act surprised…", big: true },
    { key: "secondaryText", label: "Restatement", placeholder: "Supporting line…", big: true },
  ],
  solution: [
    { key: "mainText", label: "Claim", placeholder: "A new way to grow" },
    { key: "secondaryText", label: "Product body", placeholder: "What Migbirds does…", big: true },
    { key: "cta", label: "CTA label", placeholder: "Take the 20-min test" },
    { key: "url", label: "URL", placeholder: "migbirds.com" },
  ],
};

function toRenderData(cfg: SlideConfig, seriesLabel: string): SlideRenderData {
  return {
    type: cfg.type,
    variant: cfg.variant,
    palette: resolvePalette(cfg.type, cfg.variant, cfg.theme),
    seriesLabel,
    content: cfg.content,
  };
}

export default function CarouselPage() {
  const [configs, setConfigs] = useState<Record<SlideType, SlideConfig>>({
    hook: defaultSlideConfig("hook"),
    constat: defaultSlideConfig("constat"),
    data: defaultSlideConfig("data"),
    insight: defaultSlideConfig("insight"),
    solution: defaultSlideConfig("solution"),
  });
  const [activeType, setActiveType] = useState<SlideType>("hook");
  const [seriesLabel, setSeriesLabel] = useState(DEFAULT_SERIES_LABEL);
  const [exportingAll, setExportingAll] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string>("");

  const captureRefs = useRef<Record<SlideType, HTMLDivElement | null>>({
    hook: null, constat: null, data: null, insight: null, solution: null,
  });

  const active = configs[activeType];
  const meta = SLIDE_TYPE_META[activeType];
  const locked = isLockedVariant(activeType, active.variant);

  const update = (type: SlideType, patch: Partial<SlideConfig>) =>
    setConfigs((prev) => ({ ...prev, [type]: { ...prev[type], ...patch } }));

  const updateContent = (key: FieldKey, value: string) =>
    setConfigs((prev) => ({
      ...prev,
      [activeType]: { ...prev[activeType], content: { ...prev[activeType].content, [key]: value } },
    }));

  const handleVariant = (variant: Variant) => {
    // Default the theme toggle to the new variant's intended base look
    // (e.g. Manifesto → dark, Quote → light). Toggle still works afterwards;
    // locked colored variants ignore it.
    const base = VARIANT_BASE_PALETTE[variantKey(activeType, variant)];
    const theme: ThemeToggle = base === "dark" || base === "blue" ? "dark" : "light";
    update(activeType, { variant, theme });
  };

  const exportOne = async (type: SlideType) => {
    const node = captureRefs.current[type];
    if (!node) return;
    setBusy(true);
    setStatus("Rendering PNG…");
    try {
      await exportSlidePng(node, `migbirds-carousel-${SLIDE_NUMBER[type]}-${type}.png`);
      setStatus("Downloaded ✓");
    } catch (err) {
      console.error(err);
      setStatus("Export failed — see console");
    } finally {
      setBusy(false);
    }
  };
  const exportOneSvg = async (type: SlideType) => {
    const node = captureRefs.current[type];
    if (!node) return;
    setBusy(true);
    setStatus("Rendering SVG…");
    try {
      await exportSlideSvg(node, `migbirds-carousel-${SLIDE_NUMBER[type]}-${type}.svg`);
      setStatus("Downloaded ✓");
    } catch (err) {
      console.error(err);
      setStatus("Export failed — see console");
    } finally {
      setBusy(false);
    }
  };
  const exportAll = async () => {
    setExportingAll(true);
    setStatus("Rendering 5 slides…");
    const nodes = SLIDE_TYPES.map((t) => ({
      node: captureRefs.current[t],
      filename: `migbirds-carousel-${SLIDE_NUMBER[t]}-${t}.png`,
    })).filter((x): x is { node: HTMLDivElement; filename: string } => !!x.node);
    try {
      await exportAllPng(nodes);
      setStatus("All 5 downloaded ✓");
    } catch (err) {
      console.error(err);
      setStatus("Export failed — see console");
    } finally {
      setExportingAll(false);
    }
  };

  return (
    <div className="min-h-screen bg-migbirds-cream">
      {/* Header */}
      <header className="border-b border-migbirds-navy/10 bg-white/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <Link href="/">
            <svg width="170" height="32" viewBox="48 486 175 43" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M193.607 486V490.373H200.142V496.907H204.515V486H193.607Z" fill="#FF72D0" />
              <path d="M208.012 486V490.373H214.55V496.907H218.922V486H208.012Z" fill="#0A57FF" />
              <path d="M208.012 500.405V504.778H214.55V511.316H218.922V500.405H208.012Z" fill="#FFB300" />
              <path d="M54.7714 501.367V503.753H55.1562C55.8873 502.291 57.388 501.06 60.1585 501.06C62.929 501.06 64.5067 502.252 65.3917 504.061H65.7765C66.7 502.445 68.1237 501.06 71.2406 501.06C74.7807 501.06 77.6281 503.291 77.6281 507.909V520.453H72.7797V508.14C72.7797 506.062 71.6254 504.984 69.7014 504.984C67.4696 504.984 66.2383 506.447 66.2383 509.063V520.453H61.3899V508.14C61.3899 506.062 60.2355 504.984 58.3115 504.984C56.0797 504.984 54.8484 506.447 54.8484 509.063V520.453H50V501.367H54.7714Z" fill="#0A0632" />
              <path d="M87.1316 501.364H82.2832V520.449H87.1316V501.364Z" fill="#0A0632" />
              <path d="M106.18 501.364V503.942H105.795C104.641 502.287 102.794 500.825 99.4846 500.825C94.944 500.825 90.8652 504.673 90.8652 510.599C90.8652 516.525 94.944 520.373 99.4846 520.373C102.794 520.373 104.641 518.872 105.718 517.371H106.103V519.218C106.103 522.912 103.948 524.605 100.793 524.605C97.6376 524.605 96.1789 523.066 95.4688 521.023L91.1871 523.038C92.3239 525.802 95.2379 528.684 100.87 528.684C106.95 528.684 110.951 525.49 110.951 519.334V501.364H106.18ZM100.947 516.22C97.9454 516.22 95.7136 514.066 95.7136 510.602C95.7136 507.139 97.9454 504.984 100.947 504.984C103.948 504.984 106.18 507.139 106.18 510.602C106.18 514.066 103.948 516.22 100.947 516.22Z" fill="#0A0632" />
              <path d="M120.495 493.563V503.83H120.88C121.957 502.291 123.804 500.829 127.113 500.829C131.654 500.829 135.733 504.677 135.733 510.91C135.733 517.144 131.654 520.992 127.113 520.992C123.804 520.992 121.957 519.53 120.803 517.875H120.418V520.453H115.646V493.563H120.495ZM120.418 510.91C120.418 514.681 122.65 516.836 125.651 516.836C128.652 516.836 130.884 514.681 130.884 510.91C130.884 507.139 128.652 504.984 125.651 504.984C122.65 504.984 120.418 507.139 120.418 510.91Z" fill="#0A0632" />
              <path d="M144.313 501.364H139.465V520.449H144.313V501.364Z" fill="#0A0632" />
              <path d="M153.967 504.061H154.352C155.083 502.022 156.699 501.291 159.123 501.291H161.124V505.369H158.276C155.814 505.369 154.044 506.678 154.044 509.371V520.453H149.195V501.367H153.967V504.061Z" fill="#0A0632" />
              <path d="M182.52 520.453H177.748V517.875H177.364C176.209 519.53 174.362 520.992 171.053 520.992C166.512 520.992 162.434 517.144 162.434 510.91C162.434 504.677 166.512 500.829 171.053 500.829C174.362 500.829 176.209 502.291 177.287 503.83H177.671V493.563H182.52V520.453ZM167.282 510.91C167.282 514.681 169.514 516.836 172.515 516.836C175.517 516.836 177.748 514.681 177.748 510.91C177.748 507.139 175.517 504.984 172.515 504.984C169.514 504.984 167.282 507.139 167.282 510.91Z" fill="#0A0632" />
              <path d="M194.256 500.829C198.527 500.829 201.336 502.945 202.26 506.023L197.873 507.37C197.411 505.292 196.103 504.523 194.256 504.523C192.409 504.523 191.409 505.254 191.409 506.408C191.409 507.678 192.486 508.217 194.487 508.601L195.487 508.794C199.797 509.64 203.029 510.718 203.029 514.72C203.029 518.721 199.874 520.992 195.026 520.992C190.177 520.992 186.676 518.76 186.021 514.758L190.485 513.604C190.985 516.374 192.794 517.298 195.026 517.298C197.257 517.298 198.335 516.336 198.335 515.104C198.335 513.873 197.257 513.296 194.872 512.834L193.871 512.642C189.869 511.872 186.714 510.487 186.714 506.716C186.714 502.945 189.715 500.829 194.256 500.829Z" fill="#0A0632" />
              <path d="M87.4723 496.327C87.4723 497.852 86.234 499.09 84.7088 499.09C83.1836 499.09 81.9453 497.852 81.9453 496.327C81.9453 494.801 83.1836 493.563 84.7088 493.563C86.234 493.563 87.4723 494.801 87.4723 496.327Z" fill="#0A0632" />
              <path d="M144.652 496.327C144.652 497.852 143.414 499.09 141.889 499.09C140.363 499.09 139.125 497.852 139.125 496.327C139.125 494.801 140.363 493.563 141.889 493.563C143.414 493.563 144.652 494.801 144.652 496.327Z" fill="#0A0632" />
            </svg>
          </Link>
          <div className="flex items-center gap-1 ml-3 bg-migbirds-navy/5 rounded-lg p-0.5">
            <Link href="/" className="px-3 py-1.5 rounded-md text-[11px] font-medium text-migbirds-navy/50 hover:text-migbirds-navy/80 transition-colors">
              Social Cards
            </Link>
            <span className="px-3 py-1.5 rounded-md text-[11px] font-medium bg-white text-migbirds-navy shadow-sm">Carousel</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 items-start">
          {/* ── Sidebar controls ── */}
          <div className="space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-migbirds-navy/10 shadow-sm">
            {/* Slide tabs */}
            <div>
              <label className="block text-sm font-semibold text-migbirds-navy mb-3">Slide</label>
              <div className="space-y-1.5">
                {SLIDE_TYPES.map((t) => {
                  const m = SLIDE_TYPE_META[t];
                  return (
                    <button
                      key={t}
                      onClick={() => setActiveType(t)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${
                        activeType === t
                          ? "bg-migbirds-navy text-white shadow-lg"
                          : "bg-white text-migbirds-navy border border-migbirds-navy/10 hover:border-migbirds-navy/30"
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        activeType === t ? "bg-white/20 text-white" : "bg-migbirds-navy/5 text-migbirds-navy/50"
                      }`}>{m.number}</span>
                      <span className="min-w-0">
                        <span className="font-semibold block truncate">{m.name}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <hr className="border-migbirds-navy/10" />

            {/* Variant picker */}
            <div>
              <label className="block text-sm font-semibold text-migbirds-navy mb-3">Design variant</label>
              <div className="grid grid-cols-3 gap-2">
                {meta.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => handleVariant(v.id)}
                    className={`px-2 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      active.variant === v.id
                        ? "bg-migbirds-purple text-white shadow-lg shadow-migbirds-purple/25"
                        : "bg-white text-migbirds-navy border border-migbirds-navy/20 hover:border-migbirds-navy/40"
                    }`}
                  >
                    <span className="block font-bold text-sm">{v.id}</span>
                    <span className={`block text-[10px] leading-tight mt-0.5 ${active.variant === v.id ? "text-white/70" : "text-migbirds-navy/40"}`}>
                      {v.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme toggle */}
            <div>
              <label className="block text-sm font-semibold text-migbirds-navy mb-3">Theme</label>
              <div className="grid grid-cols-2 gap-2">
                {(["light", "dark"] as ThemeToggle[]).map((th) => (
                  <button
                    key={th}
                    disabled={locked}
                    onClick={() => update(activeType, { theme: th })}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                      locked
                        ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                        : active.theme === th
                        ? "bg-migbirds-navy text-white shadow-lg"
                        : "bg-white text-migbirds-navy border border-migbirds-navy/20 hover:border-migbirds-navy/40"
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full ${th === "light" ? "bg-[#F7F5F3] border border-gray-300" : "bg-[#0A0632]"}`} />
                    {th === "light" ? "Light" : "Dark"}
                  </button>
                ))}
              </div>
              {locked && (
                <p className="text-[11px] text-migbirds-navy/40 mt-2">
                  Variant {active.variant} ({meta.variants.find((v) => v.id === active.variant)?.label}) is an intrinsically colored look — theme toggle doesn&apos;t apply.
                </p>
              )}
            </div>

            <hr className="border-migbirds-navy/10" />

            {/* Text fields */}
            <div className="space-y-4">
              {FIELDS[activeType].map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-semibold text-migbirds-navy mb-2">{f.label}</label>
                  {f.big ? (
                    <textarea
                      value={active.content[f.key]}
                      onChange={(e) => updateContent(f.key, e.target.value)}
                      rows={2}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-migbirds-navy/20 bg-white text-migbirds-navy placeholder:text-migbirds-navy/30 focus:outline-none focus:ring-2 focus:ring-migbirds-purple/50 focus:border-migbirds-purple resize-none text-sm"
                    />
                  ) : (
                    <input
                      type="text"
                      value={active.content[f.key]}
                      onChange={(e) => updateContent(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-migbirds-navy/20 bg-white text-migbirds-navy placeholder:text-migbirds-navy/30 focus:outline-none focus:ring-2 focus:ring-migbirds-purple/50 focus:border-migbirds-purple text-sm"
                    />
                  )}
                </div>
              ))}

              {/* Series label */}
              <div>
                <label className="block text-sm font-semibold text-migbirds-navy mb-2">Series label (eyebrow)</label>
                <input
                  type="text"
                  value={seriesLabel}
                  onChange={(e) => setSeriesLabel(e.target.value)}
                  placeholder={DEFAULT_SERIES_LABEL}
                  className="w-full px-4 py-3 rounded-xl border border-migbirds-navy/20 bg-white text-migbirds-navy placeholder:text-migbirds-navy/30 focus:outline-none focus:ring-2 focus:ring-migbirds-purple/50 focus:border-migbirds-purple text-sm"
                />
              </div>
            </div>

            <hr className="border-migbirds-navy/10" />

            {/* Export */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-migbirds-navy mb-1">Export slide {meta.number}</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => exportOne(activeType)}
                  disabled={busy || exportingAll}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-migbirds-purple text-white hover:bg-migbirds-purple/90 transition-all shadow-lg shadow-migbirds-purple/25 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  PNG
                </button>
                <button
                  onClick={() => exportOneSvg(activeType)}
                  disabled={busy || exportingAll}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-white text-migbirds-navy border border-migbirds-navy/20 hover:border-migbirds-navy/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  SVG
                </button>
              </div>
              <button
                onClick={exportAll}
                disabled={exportingAll || busy}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-migbirds-navy text-white hover:bg-migbirds-navy/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {exportingAll ? "Exporting…" : "Export all 5 slides (PNG)"}
              </button>
              {status && <p className="text-[11px] text-migbirds-navy/50 text-center">{status}</p>}
            </div>
          </div>

          {/* ── Preview ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-migbirds-navy/60">
                Preview — Slide {meta.number}: {meta.name} · {active.variant} {meta.variants.find((v) => v.id === active.variant)?.label}
              </h2>
              <span className="text-xs text-migbirds-navy/40">{CAROUSEL_SIZE} × {CAROUSEL_SIZE}px</span>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl border border-migbirds-navy/10" style={{ width: 560, height: 560, maxWidth: "100%" }}>
              <div style={{ width: CAROUSEL_SIZE, height: CAROUSEL_SIZE, transform: `scale(${560 / CAROUSEL_SIZE})`, transformOrigin: "top left" }}>
                <CarouselSlide data={toRenderData(active, seriesLabel)} />
              </div>
            </div>

            {/* Mini strip */}
            <div className="flex gap-2 mt-4 flex-wrap">
              {SLIDE_TYPES.map((t) => {
                const size = 96;
                return (
                  <button
                    key={t}
                    onClick={() => setActiveType(t)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeType === t ? "border-migbirds-purple shadow-lg scale-105" : "border-migbirds-navy/10 hover:border-migbirds-navy/30 opacity-80"
                    }`}
                    style={{ width: size, height: size }}
                  >
                    <div style={{ width: CAROUSEL_SIZE, height: CAROUSEL_SIZE, transform: `scale(${size / CAROUSEL_SIZE})`, transformOrigin: "top left" }}>
                      <CarouselSlide data={toRenderData(configs[t], seriesLabel)} />
                    </div>
                    <span className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-[9px] font-bold py-0.5 text-center">{SLIDE_NUMBER[t]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* ── Hidden full-size render area for capture ── */}
      <div aria-hidden style={{ position: "fixed", left: -100000, top: 0, pointerEvents: "none" }}>
        {SLIDE_TYPES.map((t) => (
          <CarouselSlide
            key={t}
            ref={(el) => { captureRefs.current[t] = el; }}
            data={toRenderData(configs[t], seriesLabel)}
          />
        ))}
      </div>
    </div>
  );
}
