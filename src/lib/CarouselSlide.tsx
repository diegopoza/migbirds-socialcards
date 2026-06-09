"use client";

import React from "react";
import { Palette, SlideRenderData, SlideType, Variant, SLIDE_NUMBER } from "./carousel-types";

// ── palettes (hex inlined for reliable html-to-image capture) ──
const PAL: Record<Palette, { bg: string; fg: string; muted: string; line: string; card: string; soft: string }> = {
  light: { bg: "#F7F5F3", fg: "#0A0632", muted: "#6E6B82", line: "rgba(10,6,50,0.10)", card: "#FFFFFF", soft: "rgba(10,6,50,0.05)" },
  dark:  { bg: "#0A0632", fg: "#F7F5F3", muted: "#9C99B5", line: "rgba(255,255,255,0.14)", card: "rgba(255,255,255,0.05)", soft: "rgba(255,255,255,0.06)" },
  pink:  { bg: "#FF72D0", fg: "#0A0632", muted: "rgba(10,6,50,0.62)", line: "rgba(10,6,50,0.16)", card: "rgba(255,255,255,0.18)", soft: "rgba(10,6,50,0.07)" },
  amber: { bg: "#FFB300", fg: "#0A0632", muted: "rgba(10,6,50,0.60)", line: "rgba(10,6,50,0.16)", card: "rgba(255,255,255,0.20)", soft: "rgba(10,6,50,0.07)" },
  blue:  { bg: "#0A57FF", fg: "#FFFFFF", muted: "rgba(255,255,255,0.78)", line: "rgba(255,255,255,0.20)", card: "rgba(255,255,255,0.12)", soft: "rgba(255,255,255,0.10)" },
};

const isDark = (p: Palette) => p === "dark" || p === "blue";

// Dark-specific body color used in the prototype; resolves to muted on light themes.
const bodyMuted = (p: Palette) => (isDark(p) ? "#C9C7DB" : PAL[p].muted);

// CTA button: light pill on dark themes, navy pill on light themes.
const ctaBtnStyle = (p: Palette): React.CSSProperties =>
  isDark(p) ? { background: "#F7F5F3", color: "#0A0632" } : { background: "#0A0632", color: "#F7F5F3" };

// Simple length-based auto-shrink for large display text.
function fitSize(base: number, text: string, refLen: number, minRatio = 0.6): number {
  const len = (text || "").length;
  if (len <= refLen) return base;
  return Math.max(base * (refLen / len), base * minRatio);
}

// ── primitives ──
function Eyebrow({ palette, accent, label }: { palette: Palette; accent: string; label: string }) {
  return (
    <div className="sk-eyebrow" style={{ color: PAL[palette].fg }}>
      <span className="sk-eyebrow-dot" style={{ background: accent }} />
      <span>{label}</span>
    </div>
  );
}

function Progress({ index, palette }: { index: number; palette: Palette }) {
  const cols = ["#FF72D0", "#0A57FF", "#00AAFF", "#FFB300", "#00DB9D"];
  return (
    <div className="sk-progress">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className="sk-progress-seg"
          style={{ background: n === index ? cols[n - 1] : PAL[palette].line, width: n === index ? 34 : 18 }}
        />
      ))}
    </div>
  );
}

function Logo({ palette, size = 150 }: { palette: Palette; size?: number }) {
  const src = isDark(palette) ? "/carousel/migbirds-logo-light.png" : "/carousel/migbirds-logo-dark.png";
  /* eslint-disable-next-line @next/next/no-img-element */
  return <img className="sk-logo" src={src} alt="migbirds" style={{ width: size }} crossOrigin="anonymous" />;
}

function Mark({ tile, size = 64 }: { tile: "dark" | "light"; size?: number }) {
  const src = tile === "dark" ? "/carousel/migbirds-mark-dark.png" : "/carousel/migbirds-mark-light.png";
  /* eslint-disable-next-line @next/next/no-img-element */
  return <img src={src} alt="" style={{ width: size, height: size, objectFit: "contain" }} crossOrigin="anonymous" />;
}

function SlideNo({ n, palette }: { n: number; palette: Palette }) {
  return (
    <div className="sk-no" style={{ color: PAL[palette].fg }}>
      <span className="sk-no-num">0{n}</span>
      <span className="sk-no-den" style={{ color: PAL[palette].muted }}>/05</span>
    </div>
  );
}

function TalkLine({ h = 6, width = "100%" as number | string }: { h?: number; width?: number | string }) {
  return <div style={{ height: h, width, borderRadius: 999, background: "var(--talk-gradient)" }} />;
}

function DotField({ seed = 0 }: { seed?: number }) {
  const cols = ["#FF72D0", "#0A57FF", "#FFB300", "#00AAFF", "#00DB9D"];
  const base: [number, number][] = [
    [10, 16], [27, 9], [46, 19], [64, 11], [82, 21], [91, 13],
    [16, 38], [38, 33], [58, 41], [76, 36], [88, 44],
    [12, 62], [33, 70], [52, 64], [70, 72], [86, 66],
    [22, 88], [44, 84], [62, 92], [80, 86], [94, 90],
  ];
  const pts = base.filter((_, i) => (i + seed) % 2 === 0);
  return (
    <div className="sk-dotfield" aria-hidden="true">
      {pts.map(([x, y], i) => {
        const c = cols[(i + seed) % cols.length];
        const dia = (i + seed) % 3 === 0;
        const sz = 9 + ((i * 7 + seed) % 6);
        return (
          <span
            key={i}
            className={dia ? "sk-dia" : "sk-dot"}
            style={{ left: x + "%", top: y + "%", width: sz, height: sz, background: c }}
          />
        );
      })}
    </div>
  );
}

function Header({ index, palette, accent, label }: { index: number; palette: Palette; accent: string; label: string }) {
  return (
    <div className="sk-header">
      <Eyebrow palette={palette} accent={accent} label={label} />
      <Progress index={index} palette={palette} />
    </div>
  );
}

function Footer({ n, palette, logoSize = 150, right }: { n: number; palette: Palette; logoSize?: number; right?: React.ReactNode }) {
  return (
    <div className="sk-footer">
      <Logo palette={palette} size={logoSize} />
      {right !== undefined ? right : <SlideNo n={n} palette={palette} />}
    </div>
  );
}

// Highlighted headline: lead + emphasized closing phrase.
function HeadlineParts({
  lead,
  highlight,
  highlightStyle,
  highlightClass,
}: {
  lead: string;
  highlight: string;
  highlightStyle?: React.CSSProperties;
  highlightClass?: string;
}) {
  return (
    <>
      {lead}
      {highlight ? (
        <>
          {" "}
          <span className={highlightClass} style={highlightStyle}>{highlight}</span>
        </>
      ) : null}
    </>
  );
}

// ── slide compositions ──

function renderArm(data: SlideRenderData): React.ReactNode {
  const { type, variant, palette: theme, content: c, seriesLabel: label } = data;
  const p = PAL[theme];
  const n = SLIDE_NUMBER[type];
  const key = `${type}_${variant}` as `${SlideType}_${Variant}`;

  switch (key) {
    /* ===== SLIDE 1 · HOOK ===== */
    case "hook_A":
      return (
        <>
          <DotField seed={1} />
          <span className="sk-watermark" style={{ color: p.soft }}>01</span>
          <Header index={1} palette={theme} accent="#FF72D0" label={label} />
          <div className="sk-content" style={{ justifyContent: "center" }}>
            <div style={{ width: 92, marginBottom: 40 }}><TalkLine h={7} /></div>
            <h1 className="sk-display" style={{ fontSize: fitSize(132, c.mainText + c.highlightText, 36), lineHeight: 0.98, margin: 0, letterSpacing: "-0.03em" }}>
              <HeadlineParts lead={c.mainText} highlight={c.highlightText} highlightStyle={{ color: "#FF72D0" }} />
            </h1>
            <p className="sk-sub" style={{ color: p.muted, marginTop: 44, maxWidth: 760 }}>{c.secondaryText}</p>
          </div>
          <Footer n={1} palette={theme} />
        </>
      );
    case "hook_B":
      return (
        <>
          <Header index={1} palette={theme} accent="#0A0632" label={label} />
          <div className="sk-content" style={{ justifyContent: "center" }}>
            <h1 className="sk-display" style={{ fontSize: fitSize(150, c.mainText + c.highlightText, 32), lineHeight: 0.92, margin: 0, letterSpacing: "-0.035em", textWrap: "balance" }}>
              <HeadlineParts lead={c.mainText} highlight={c.highlightText} highlightStyle={{ color: "#FFFFFF" }} />
            </h1>
            <p className="sk-sub" style={{ color: p.muted, marginTop: 40, maxWidth: 720, fontWeight: 600 }}>{c.secondaryText}</p>
          </div>
          <div className="sk-footer">
            <Logo palette={theme} size={150} />
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <Mark tile="light" size={66} />
              <SlideNo n={1} palette={theme} />
            </div>
          </div>
        </>
      );
    case "hook_C":
      return (
        <>
          <DotField seed={3} />
          <Header index={1} palette={theme} accent="#FFB300" label={label} />
          <div className="sk-content" style={{ justifyContent: "center" }}>
            <div className="sk-bubble" style={{ alignSelf: "flex-start", background: "var(--talk-gradient)", color: "#fff", marginBottom: 36 }}>
              We need to talk.
            </div>
            <h1 className="sk-display" style={{ fontSize: fitSize(122, c.mainText + c.highlightText, 38), lineHeight: 1.0, margin: 0, letterSpacing: "-0.03em" }}>
              <HeadlineParts lead={c.mainText} highlight={c.highlightText} highlightStyle={{ color: "#FFB300" }} />
            </h1>
            <p className="sk-sub" style={{ color: p.muted, marginTop: 40, maxWidth: 760 }}>{c.secondaryText}</p>
          </div>
          <Footer n={1} palette={theme} />
        </>
      );

    /* ===== SLIDE 2 · CONSTAT ===== */
    case "constat_A":
      return (
        <>
          <DotField seed={2} />
          <Header index={2} palette={theme} accent="#0A57FF" label={label} />
          <div className="sk-content" style={{ justifyContent: "center" }}>
            <span className="sk-kicker" style={{ color: "#0A57FF" }}>THE SCENARIO</span>
            <p className="sk-statement" style={{ fontSize: fitSize(72, c.mainText, 110), lineHeight: 1.12, margin: "26px 0 0", letterSpacing: "-0.02em" }}>{c.mainText}</p>
            <p className="sk-conv" style={{ color: p.fg, marginTop: 48 }}>{c.secondaryText}</p>
          </div>
          <Footer n={2} palette={theme} />
        </>
      );
    case "constat_B":
      return (
        <>
          <Header index={2} palette={theme} accent="#0A57FF" label={label} />
          <div className="sk-content" style={{ justifyContent: "center", gap: 28 }}>
            <div className="sk-chat sk-chat--in" style={{ background: p.card, color: p.fg, borderColor: p.line }}>{c.mainText}</div>
            <div className="sk-chat sk-chat--out" style={{ background: "#0A57FF", color: "#fff", alignSelf: "flex-end" }}>{c.secondaryText}</div>
          </div>
          <Footer n={2} palette={theme} />
        </>
      );
    case "constat_C":
      return (
        <>
          <DotField seed={7} />
          <Header index={2} palette={theme} accent="#00AAFF" label={label} />
          <div className="sk-content" style={{ justifyContent: "center" }}>
            <span className="sk-kicker" style={{ color: "#00AAFF" }}>PICTURE THIS</span>
            <p className="sk-statement" style={{ fontSize: fitSize(70, c.mainText, 110), lineHeight: 1.12, margin: "26px 0 0", letterSpacing: "-0.02em", color: p.fg }}>{c.mainText}</p>
            <p className="sk-conv" style={{ color: "#FF72D0", marginTop: 44 }}>{c.secondaryText}</p>
          </div>
          <Footer n={2} palette={theme} />
        </>
      );

    /* ===== SLIDE 3 · DATA ===== */
    case "data_A":
      return (
        <>
          <DotField seed={4} />
          <Header index={3} palette={theme} accent="#FFB300" label={label} />
          <div className="sk-content" style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <div className="sk-stat" style={{ fontSize: fitSize(400, c.mainText, 4), lineHeight: 0.84, letterSpacing: "-0.05em", color: "#0A0632" }}>{c.mainText}</div>
            <div style={{ width: 120, margin: "20px 0 30px" }}><TalkLine h={7} /></div>
            <p className="sk-statlabel" style={{ color: p.fg, maxWidth: 720 }}>{c.secondaryText}</p>
            {c.source ? <span className="sk-source" style={{ color: p.muted, borderColor: p.line }}>{c.source}</span> : null}
          </div>
          <Footer n={3} palette={theme} right={<SlideNo n={3} palette={theme} />} />
        </>
      );
    case "data_B":
      return (
        <>
          <div className="sk-glow" aria-hidden="true" />
          <Header index={3} palette={theme} accent="#00AAFF" label={label} />
          <div className="sk-content" style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <div className="sk-stat sk-gradtext" style={{ fontSize: fitSize(420, c.mainText, 4), lineHeight: 0.82, letterSpacing: "-0.05em" }}>{c.mainText}</div>
            <p className="sk-statlabel" style={{ color: p.fg, maxWidth: 740, marginTop: 28 }}>{c.secondaryText}</p>
            {c.source ? <span className="sk-source" style={{ color: p.muted, borderColor: p.line }}>{c.source}</span> : null}
          </div>
          <Footer n={3} palette={theme} right={<SlideNo n={3} palette={theme} />} />
        </>
      );
    case "data_C":
      return (
        <>
          <Header index={3} palette={theme} accent="#FFFFFF" label={label} />
          <div className="sk-content" style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <div className="sk-stat" style={{ fontSize: fitSize(410, c.mainText, 4), lineHeight: 0.84, letterSpacing: "-0.05em", color: "#FFFFFF" }}>{c.mainText}</div>
            <div style={{ width: 120, height: 7, borderRadius: 999, background: "#FFB300", margin: "20px 0 30px" }} />
            <p className="sk-statlabel" style={{ color: "#FFFFFF", maxWidth: 740 }}>{c.secondaryText}</p>
            {c.source ? <span className="sk-source" style={{ color: "rgba(255,255,255,0.9)", borderColor: "rgba(255,255,255,0.34)" }}>{c.source}</span> : null}
          </div>
          <Footer n={3} palette={theme} right={<SlideNo n={3} palette={theme} />} />
        </>
      );

    /* ===== SLIDE 4 · INSIGHT ===== */
    case "insight_A":
      return (
        <>
          <DotField seed={5} />
          <Header index={4} palette={theme} accent="#974DFF" label={label} />
          <div className="sk-content" style={{ justifyContent: "center" }}>
            <span className="sk-quote" style={{ color: "#FF72D0" }}>&ldquo;</span>
            <h2 className="sk-display" style={{ fontSize: fitSize(78, c.mainText + c.highlightText, 95), lineHeight: 1.08, margin: "-40px 0 0", letterSpacing: "-0.02em" }}>
              <HeadlineParts lead={c.mainText} highlight={c.highlightText} highlightStyle={{ color: "#974DFF" }} />
            </h2>
            <p className="sk-sub" style={{ color: p.muted, marginTop: 40, maxWidth: 760 }}>{c.secondaryText}</p>
          </div>
          <Footer n={4} palette={theme} />
        </>
      );
    case "insight_B":
      return (
        <>
          <Header index={4} palette={theme} accent="#0A0632" label={label} />
          <div className="sk-content" style={{ justifyContent: "center" }}>
            <span className="sk-kicker" style={{ color: "#0A0632" }}>THE TAKEAWAY</span>
            <h2 className="sk-display" style={{ fontSize: fitSize(92, c.mainText + c.highlightText, 80), lineHeight: 1.04, margin: "24px 0 0", letterSpacing: "-0.025em" }}>
              <HeadlineParts lead={c.mainText} highlight={c.highlightText} highlightClass="sk-mark-under" />
            </h2>
            <p className="sk-sub" style={{ color: p.muted, marginTop: 44, maxWidth: 740, fontWeight: 600 }}>{c.secondaryText}</p>
          </div>
          <Footer n={4} palette={theme} />
        </>
      );
    case "insight_C":
      return (
        <>
          <div className="sk-glow sk-glow--pink" aria-hidden="true" />
          <Header index={4} palette={theme} accent="#974DFF" label={label} />
          <div className="sk-content" style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <h2 className="sk-display" style={{ fontSize: fitSize(80, c.mainText + c.highlightText, 95), lineHeight: 1.1, margin: 0, letterSpacing: "-0.02em", maxWidth: 900 }}>
              {c.mainText}
              {c.highlightText ? <> <span className="sk-gradtext">{c.highlightText}</span></> : null}
            </h2>
            <p className="sk-sub" style={{ color: bodyMuted(theme), marginTop: 38, maxWidth: 720, textAlign: "center" }}>{c.secondaryText}</p>
          </div>
          <Footer n={4} palette={theme} />
        </>
      );

    /* ===== SLIDE 5 · SOLUTION ===== */
    case "solution_A":
      return (
        <>
          <div className="sk-glow sk-glow--pink" aria-hidden="true" />
          <Header index={5} palette={theme} accent="#00DB9D" label={label} />
          <div className="sk-content" style={{ justifyContent: "center" }}>
            <Mark tile="dark" size={104} />
            <h2 className="sk-display sk-gradtext" style={{ fontSize: fitSize(118, c.mainText, 18), lineHeight: 0.98, margin: "40px 0 0", letterSpacing: "-0.03em" }}>{c.mainText}</h2>
            <p className="sk-sub" style={{ color: bodyMuted(theme), marginTop: 30, maxWidth: 760 }}>{c.secondaryText}</p>
            <div className="sk-cta-row" style={{ marginTop: 52 }}>
              {c.cta ? <span className="sk-cta-btn" style={ctaBtnStyle(theme)}>{c.cta}</span> : null}
              {c.url ? <span className="sk-url" style={{ color: p.fg, opacity: 0.92 }}>{c.url}</span> : null}
            </div>
          </div>
          <Footer n={5} palette={theme} logoSize={230} />
        </>
      );
    case "solution_B":
      return (
        <>
          <DotField seed={6} />
          <Header index={5} palette={theme} accent="#00DB9D" label={label} />
          <div className="sk-content" style={{ justifyContent: "center", alignItems: "center" }}>
            <div className="sk-gradcard">
              <div className="sk-gradcard-inner">
                <Mark tile="dark" size={92} />
                <h2 className="sk-display sk-gradtext" style={{ fontSize: fitSize(92, c.mainText, 18), lineHeight: 1.0, margin: "26px 0 0", letterSpacing: "-0.03em", textAlign: "center" }}>{c.mainText}</h2>
                <p className="sk-sub" style={{ color: "#C9C7DB", marginTop: 20, maxWidth: 620, textAlign: "center" }}>{c.secondaryText}</p>
                {c.cta ? <span className="sk-cta-btn" style={{ marginTop: 38 }}>{c.cta}</span> : null}
                {c.url ? <span className="sk-url" style={{ marginTop: 22 }}>{c.url}</span> : null}
              </div>
            </div>
          </div>
          <Footer n={5} palette={theme} logoSize={200} />
        </>
      );
    case "solution_C":
      return (
        <>
          <DotField seed={8} />
          <Header index={5} palette={theme} accent="#0A57FF" label={label} />
          <div className="sk-content" style={{ justifyContent: "center" }}>
            <Mark tile="light" size={104} />
            <h2 className="sk-display sk-gradtext" style={{ fontSize: fitSize(116, c.mainText, 18), lineHeight: 0.98, margin: "36px 0 0", letterSpacing: "-0.03em" }}>{c.mainText}</h2>
            <p className="sk-sub" style={{ color: p.muted, marginTop: 28, maxWidth: 760 }}>{c.secondaryText}</p>
            <div className="sk-cta-row" style={{ marginTop: 50 }}>
              {c.cta ? <span className="sk-cta-btn" style={ctaBtnStyle(theme)}>{c.cta}</span> : null}
              {c.url ? <span className="sk-url" style={{ color: p.fg }}>{c.url}</span> : null}
            </div>
          </div>
          <Footer n={5} palette={theme} logoSize={230} />
        </>
      );

    default:
      return null;
  }
}

// Full-size 1080×1080 slide. Wrap in a scaling container for preview.
export const CarouselSlide = React.forwardRef<HTMLDivElement, { data: SlideRenderData }>(
  function CarouselSlide({ data }, ref) {
    const p = PAL[data.palette];
    return (
      <div ref={ref} className="slide" data-theme={data.palette} style={{ background: p.bg, color: p.fg }}>
        {renderArm(data)}
      </div>
    );
  }
);
