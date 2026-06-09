// Native-SVG renderer for the carousel slides. A single source of truth used
// for BOTH the live preview (inline SVG, external font/image refs) and PNG/SVG
// export (Image→canvas, with fonts + images embedded as base64 data URLs).
//
// No <foreignObject> is used, so the export canvas is never tainted and the
// proven SVG-string→canvas pipeline works everywhere.

import { Palette, SlideRenderData, SlideType, Variant, SLIDE_NUMBER } from "./carousel-types";

const S = 1080;
const PAD_X = 88;
const PAD_T = 84;

const DISPLAY = "'Space Grotesk'";
const BODY = "'Hanken Grotesk'";
const MONO = "ui-monospace, 'SFMono-Regular', Menlo, monospace";

const LOGO_ASPECT = 483 / 123; // width / height

const PAL: Record<Palette, { bg: string; fg: string; muted: string; line: string; card: string; soft: string }> = {
  light: { bg: "#F7F5F3", fg: "#0A0632", muted: "#6E6B82", line: "rgba(10,6,50,0.10)", card: "#FFFFFF", soft: "rgba(10,6,50,0.05)" },
  dark:  { bg: "#0A0632", fg: "#F7F5F3", muted: "#9C99B5", line: "rgba(255,255,255,0.14)", card: "rgba(255,255,255,0.05)", soft: "rgba(255,255,255,0.06)" },
  pink:  { bg: "#FF72D0", fg: "#0A0632", muted: "rgba(10,6,50,0.62)", line: "rgba(10,6,50,0.16)", card: "rgba(255,255,255,0.18)", soft: "rgba(10,6,50,0.07)" },
  amber: { bg: "#FFB300", fg: "#0A0632", muted: "rgba(10,6,50,0.60)", line: "rgba(10,6,50,0.16)", card: "rgba(255,255,255,0.20)", soft: "rgba(10,6,50,0.07)" },
  blue:  { bg: "#0A57FF", fg: "#FFFFFF", muted: "rgba(255,255,255,0.78)", line: "rgba(255,255,255,0.20)", card: "rgba(255,255,255,0.12)", soft: "rgba(255,255,255,0.10)" },
};
const isDark = (p: Palette) => p === "dark" || p === "blue";
const bodyMuted = (p: Palette) => (isDark(p) ? "#C9C7DB" : PAL[p].muted);

function esc(s: string): string {
  return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ── text measurement (uses document-loaded fonts) ──
let _ctx: CanvasRenderingContext2D | null = null;
function mctx(): CanvasRenderingContext2D {
  if (!_ctx) _ctx = document.createElement("canvas").getContext("2d")!;
  return _ctx;
}
function measure(text: string, size: number, weight: number, family: string, spacingEm = 0): number {
  const ctx = mctx();
  ctx.font = `${weight} ${size}px ${family}`;
  let w = ctx.measureText(text).width;
  if (spacingEm) w += spacingEm * size * Math.max(0, text.length - 1);
  return w;
}

interface FontSpec { size: number; weight: number; family: string; spacing?: number }

function wrapGreedy(text: string, maxW: number, f: FontSpec): string[] {
  const words = (text || "").split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const word of words) {
    const t = cur ? cur + " " + word : word;
    if (!cur || measure(t, f.size, f.weight, f.family, f.spacing) <= maxW) cur = t;
    else { lines.push(cur); cur = word; }
  }
  if (cur) lines.push(cur);
  return lines.length ? lines : [""];
}

// Balanced wrap: minimal width that still yields the greedy line count → even lines.
function wrapBalanced(text: string, maxW: number, f: FontSpec): string[] {
  const greedy = wrapGreedy(text, maxW, f);
  if (greedy.length <= 1) return greedy;
  let lo = 0, hi = maxW, best = greedy;
  for (let i = 0; i < 16; i++) {
    const mid = (lo + hi) / 2;
    const w = wrapGreedy(text, mid, f);
    if (w.length <= greedy.length) { best = w; hi = mid; } else lo = mid; }
  return best;
}

// Shrink font until wrapped text fits within (maxW × maxH); returns chosen size + lines.
function fitWrap(text: string, maxW: number, maxH: number, base: number, min: number, weight: number, family: string, lineRatio: number, spacing = 0, balance = false): { size: number; lines: string[]; lineHeight: number } {
  let size = base;
  for (;;) {
    const f = { size, weight, family, spacing };
    const lines = balance ? wrapBalanced(text, maxW, f) : wrapGreedy(text, maxW, f);
    const lh = size * lineRatio;
    if (lines.length * lh <= maxH || size <= min) return { size, lines, lineHeight: lh };
    size -= 2;
  }
}

// ── word-level mixed-color wrap (lead + highlighted phrase) ──
interface Word { t: string; color: string; under?: boolean }
function wrapWords(words: Word[], maxW: number, f: FontSpec): Word[][] {
  const lines: Word[][] = [];
  let cur: Word[] = [];
  const lineText = (arr: Word[], extra?: Word) => [...arr, ...(extra ? [extra] : [])].map((w) => w.t).join(" ");
  for (const word of words) {
    if (!cur.length) { cur = [word]; continue; }
    if (measure(lineText(cur, word), f.size, f.weight, f.family, f.spacing) <= maxW) cur.push(word);
    else { lines.push(cur); cur = [word]; }
  }
  if (cur.length) lines.push(cur);
  return lines.length ? lines : [[]];
}
function wrapWordsBalanced(words: Word[], maxW: number, f: FontSpec): Word[][] {
  const greedy = wrapWords(words, maxW, f);
  if (greedy.length <= 1) return greedy;
  let lo = 0, hi = maxW, best = greedy;
  for (let i = 0; i < 16; i++) {
    const mid = (lo + hi) / 2;
    const w = wrapWords(words, mid, f);
    if (w.length <= greedy.length) { best = w; hi = mid; } else lo = mid; }
  return best;
}

// Build words[] from a lead string + highlight string (highlight gets its color/underline).
function mixWords(lead: string, leadColor: string, highlight: string, hiColor: string, under = false): Word[] {
  const out: Word[] = [];
  for (const t of (lead || "").split(/\s+/).filter(Boolean)) out.push({ t, color: leadColor });
  for (const t of (highlight || "").split(/\s+/).filter(Boolean)) out.push({ t, color: hiColor, under });
  return out;
}

// ── primitive SVG fragments ──
function textEl(x: number, y: number, str: string, o: { size: number; weight: number; family: string; color: string; spacing?: number; anchor?: string; gradId?: string }): string {
  const fill = o.gradId ? `url(#${o.gradId})` : o.color;
  const ls = o.spacing ? ` letter-spacing="${o.spacing * o.size}"` : "";
  const anchor = o.anchor ? ` text-anchor="${o.anchor}"` : "";
  return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-family="${o.family}" font-weight="${o.weight}" font-size="${o.size}"${ls}${anchor} fill="${fill}">${esc(str)}</text>`;
}

// Render wrapped mixed-color lines starting with first baseline at y0; returns svg + nextY.
function mixedLines(words: Word[][], xLeft: number, y0: number, lineHeight: number, f: FontSpec, anchor: "start" | "middle", centerX = 0): string {
  let out = "";
  words.forEach((line, i) => {
    const baseY = y0 + i * lineHeight;
    const full = line.map((w) => w.t).join(" ");
    const lineW = measure(full, f.size, f.weight, f.family, f.spacing);
    const startX = anchor === "middle" ? centerX - lineW / 2 : xLeft;
    // underline washes (for highlighted words)
    let cursor = startX;
    let segs = "";
    line.forEach((w, j) => {
      const wWidth = measure(w.t, f.size, f.weight, f.family, f.spacing);
      const spaceW = measure(" ", f.size, f.weight, f.family, f.spacing);
      if (w.under) {
        const uy = baseY - f.size * 0.62 + f.size * 0.62; // band over lower third
        segs += `<rect x="${(cursor - 2).toFixed(1)}" y="${(baseY - f.size * 0.42).toFixed(1)}" width="${(wWidth + 4).toFixed(1)}" height="${(f.size * 0.42).toFixed(1)}" fill="rgba(10,6,50,0.18)"/>`;
        void uy;
      }
      cursor += wWidth + (j < line.length - 1 ? spaceW + (f.spacing ? f.spacing * f.size : 0) : 0);
    });
    out += segs;
    // text tspans grouped by color
    let runs = "";
    let cx = startX;
    for (let j = 0; j < line.length; j++) {
      const w = line[j];
      const seg = w.t + (j < line.length - 1 ? " " : "");
      runs += `<tspan fill="${w.color}">${esc(seg)}</tspan>`;
    }
    void cx;
    const ls = f.spacing ? ` letter-spacing="${f.spacing * f.size}"` : "";
    out += `<text x="${startX.toFixed(1)}" y="${baseY.toFixed(1)}" font-family="${f.family}" font-weight="${f.weight}" font-size="${f.size}"${ls}>${runs}</text>`;
  });
  return out;
}

function eyebrow(label: string, palette: Palette, accent: string): string {
  const y = PAD_T + 16;
  const dotR = 6.5;
  const dotX = PAD_X + dotR;
  const textX = PAD_X + 13 + 14;
  return (
    `<circle cx="${dotX}" cy="${y - 6}" r="${dotR}" fill="${accent}"/>` +
    textEl(textX, y, label, { size: 21, weight: 700, family: DISPLAY, color: PAL[palette].fg, spacing: 0.17 })
  );
}

function progress(index: number, palette: Palette): string {
  const cols = ["#FF72D0", "#0A57FF", "#00AAFF", "#FFB300", "#00DB9D"];
  const h = 8, gap = 9;
  let totalW = 0;
  for (let n = 1; n <= 5; n++) totalW += (n === index ? 34 : 18) + (n < 5 ? gap : 0);
  let x = S - PAD_X - totalW;
  const y = PAD_T + 4;
  let out = "";
  for (let n = 1; n <= 5; n++) {
    const w = n === index ? 34 : 18;
    out += `<rect x="${x.toFixed(1)}" y="${y}" width="${w}" height="${h}" rx="4" fill="${n === index ? cols[n - 1] : PAL[palette].line}"/>`;
    x += w + gap;
  }
  return out;
}

function slideNo(n: number, palette: Palette): string {
  const baseY = S - PAD_T - 4;
  const num = `0${n}`;
  const numW = measure(num, 44, 700, DISPLAY, -0.02);
  const denW = measure("/05", 26, 600, DISPLAY);
  const denX = S - PAD_X - denW;
  const numX = denX - numW - 4;
  return (
    textEl(numX, baseY, num, { size: 44, weight: 700, family: DISPLAY, color: PAL[palette].fg, spacing: -0.02 }) +
    textEl(denX, baseY, "/05", { size: 26, weight: 600, family: DISPLAY, color: PAL[palette].muted })
  );
}

function imgHref(name: string, embed: boolean, assets?: ExportAssets): string {
  return embed && assets ? assets.img[name] : `/carousel/${name}.png`;
}

function logo(palette: Palette, width: number, embed: boolean, assets?: ExportAssets, x = PAD_X): string {
  const name = isDark(palette) ? "migbirds-logo-light" : "migbirds-logo-dark";
  const h = width / LOGO_ASPECT;
  const y = S - PAD_T - h + 2;
  return `<image x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${width}" height="${h.toFixed(1)}" preserveAspectRatio="xMinYMid meet" href="${imgHref(name, embed, assets)}"/>`;
}

function mark(tile: "dark" | "light", x: number, y: number, size: number, embed: boolean, assets?: ExportAssets): string {
  const name = tile === "dark" ? "migbirds-mark-dark" : "migbirds-mark-light";
  return `<image x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${size}" height="${size}" href="${imgHref(name, embed, assets)}"/>`;
}

function talkLineDef(id: string): string {
  return `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FF72D0"/><stop offset="0.52" stop-color="#0A57FF"/><stop offset="1" stop-color="#FFB300"/></linearGradient>`;
}

function dotField(seed: number): string {
  const cols = ["#FF72D0", "#0A57FF", "#FFB300", "#00AAFF", "#00DB9D"];
  const base: [number, number][] = [
    [10, 16], [27, 9], [46, 19], [64, 11], [82, 21], [91, 13],
    [16, 38], [38, 33], [58, 41], [76, 36], [88, 44],
    [12, 62], [33, 70], [52, 64], [70, 72], [86, 66],
    [22, 88], [44, 84], [62, 92], [80, 86], [94, 90],
  ];
  const pts = base.filter((_, i) => (i + seed) % 2 === 0);
  let out = "";
  pts.forEach(([px, py], i) => {
    const c = cols[(i + seed) % cols.length];
    const dia = (i + seed) % 3 === 0;
    const sz = 9 + ((i * 7 + seed) % 6);
    const cx = (px / 100) * S, cy = (py / 100) * S;
    if (dia) out += `<rect x="${(cx - sz / 2).toFixed(1)}" y="${(cy - sz / 2).toFixed(1)}" width="${sz}" height="${sz}" fill="${c}" transform="rotate(45 ${cx.toFixed(1)} ${cy.toFixed(1)})"/>`;
    else out += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(sz / 2).toFixed(1)}" fill="${c}"/>`;
  });
  return out;
}

function glow(kind: "blue" | "pink", defs: string[]): string {
  const id = `glow_${kind}`;
  if (kind === "blue") {
    defs.push(`<radialGradient id="${id}"><stop offset="0" stop-color="rgba(10,87,255,0.55)"/><stop offset="0.38" stop-color="rgba(0,170,255,0.18)"/><stop offset="0.68" stop-color="rgba(0,170,255,0)"/></radialGradient>`);
    return `<ellipse cx="${S * 0.5}" cy="${S * 0.44}" rx="450" ry="450" fill="url(#${id})"/>`;
  }
  defs.push(`<radialGradient id="${id}"><stop offset="0" stop-color="rgba(255,114,208,0.40)"/><stop offset="0.42" stop-color="rgba(151,77,255,0.20)"/><stop offset="0.70" stop-color="rgba(151,77,255,0)"/></radialGradient>`);
  return `<ellipse cx="${S * 0.7}" cy="${S * 0.38}" rx="450" ry="450" fill="url(#${id})"/>`;
}

function sourcePill(text: string, cx: number, y: number, color: string, border: string): string {
  if (!text) return "";
  const w = measure(text, 20, 400, MONO) + 48;
  const h = 44;
  return (
    `<rect x="${(cx - w / 2).toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h}" rx="22" fill="none" stroke="${border}"/>` +
    textEl(cx, y + 29, text, { size: 20, weight: 400, family: MONO, color, anchor: "middle" })
  );
}

// rounded-rect path with per-corner radii (for chat bubbles)
function roundRectPath(x: number, y: number, w: number, h: number, r: [number, number, number, number]): string {
  const [tl, tr, br, bl] = r;
  return `M${x + tl},${y} H${x + w - tr} A${tr},${tr} 0 0 1 ${x + w},${y + tr} V${y + h - br} A${br},${br} 0 0 1 ${x + w - br},${y + h} H${x + bl} A${bl},${bl} 0 0 1 ${x},${y + h - bl} V${y + tl} A${tl},${tl} 0 0 1 ${x + tl},${y} Z`;
}

// gradient text helper: registers a userSpace gradient spanning [x1,x2]
function gradTextDef(defs: string[], id: string, x1: number, x2: number): void {
  defs.push(`<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${x1.toFixed(1)}" y1="0" x2="${x2.toFixed(1)}" y2="0"><stop offset="0" stop-color="#FF72D0"/><stop offset="0.52" stop-color="#0A57FF"/><stop offset="1" stop-color="#FFB300"/></linearGradient>`);
}

const CONTENT_W = S - PAD_X * 2;
const CENTER_X = S / 2;
const CENTER_Y = 532;

// ── per-slide content ──
function renderContent(data: SlideRenderData, embed: boolean, assets: ExportAssets | undefined, defs: string[]): string {
  const { type, variant, palette: theme, content: c, seriesLabel: label } = data;
  const p = PAL[theme];
  const key = `${type}_${variant}` as `${SlideType}_${Variant}`;
  let body = "";

  switch (key) {
    /* ===== HOOK ===== */
    case "hook_A": {
      const words = mixWords(c.mainText, p.fg, c.highlightText, "#FF72D0");
      const fit = fitWrapWords(words, CONTENT_W, 600, 132, 60, 700, DISPLAY, 0.98, -0.03);
      const totalH = fit.lines.length * fit.lineHeight;
      const top = CENTER_Y - totalH / 2 + 30;
      // watermark
      body += textEl(S - 56, S - 150 + 40, "01", { size: 460, weight: 700, family: DISPLAY, color: p.soft, anchor: "end" });
      body += dotField(1);
      // talk line above headline
      const tlid = "tl_hookA"; defs.push(talkLineDef(tlid));
      body += `<rect x="${PAD_X}" y="${(top - 56).toFixed(1)}" width="92" height="7" rx="3.5" fill="url(#${tlid})"/>`;
      const baseY0 = top + fit.size * 0.8;
      body += mixedLines(fit.lines, PAD_X, baseY0, fit.lineHeight, { size: fit.size, weight: 700, family: DISPLAY, spacing: -0.03 }, "start");
      const subY = baseY0 + (fit.lines.length - 1) * fit.lineHeight + 44 + 28;
      body += subParagraph(c.secondaryText, PAD_X, subY, 760, p.muted);
      body += logo(theme, 150, embed, assets);
      body += slideNo(1, theme);
      break;
    }
    case "hook_B": {
      const words = mixWords(c.mainText, p.fg, c.highlightText, "#FFFFFF");
      const fit = fitWrapWords(words, CONTENT_W, 640, 150, 64, 700, DISPLAY, 0.92, -0.035, true);
      const totalH = fit.lines.length * fit.lineHeight;
      const top = CENTER_Y - totalH / 2;
      const baseY0 = top + fit.size * 0.8;
      body += mixedLines(fit.lines, PAD_X, baseY0, fit.lineHeight, { size: fit.size, weight: 700, family: DISPLAY, spacing: -0.035 }, "start");
      const subY = baseY0 + (fit.lines.length - 1) * fit.lineHeight + 40 + 28;
      body += subParagraph(c.secondaryText, PAD_X, subY, 720, p.muted, 600);
      body += logo(theme, 150, embed, assets);
      // amber mark + slide no
      const sn = slideNo(1, theme);
      body += mark("light", S - PAD_X - 66 - measure("01", 44, 700, DISPLAY, -0.02) - measure("/05", 26, 600, DISPLAY) - 22, S - PAD_T - 66 + 8, 66, embed, assets);
      body += sn;
      break;
    }
    case "hook_C": {
      const words = mixWords(c.mainText, p.fg, c.highlightText, "#FFB300");
      const fit = fitWrapWords(words, CONTENT_W, 560, 122, 56, 700, DISPLAY, 1.0, -0.03);
      const bubbleH = 30 + 36, totalH = bubbleH + fit.lines.length * fit.lineHeight;
      const top = CENTER_Y - totalH / 2;
      body += dotField(3);
      // bubble
      const tlid = "tl_hookC"; defs.push(talkLineDef(tlid));
      const bw = measure("We need to talk.", 30, 700, DISPLAY, -0.01) + 68;
      body += `<path d="${roundRectPath(PAD_X, top, bw, 66, [28, 28, 28, 6])}" fill="url(#${tlid})"/>`;
      body += textEl(PAD_X + 34, top + 43, "We need to talk.", { size: 30, weight: 700, family: DISPLAY, color: "#fff", spacing: -0.01 });
      const baseY0 = top + 66 + 36 + fit.size * 0.8;
      body += mixedLines(fit.lines, PAD_X, baseY0, fit.lineHeight, { size: fit.size, weight: 700, family: DISPLAY, spacing: -0.03 }, "start");
      const subY = baseY0 + (fit.lines.length - 1) * fit.lineHeight + 40 + 28;
      body += subParagraph(c.secondaryText, PAD_X, subY, 760, p.muted);
      body += logo(theme, 150, embed, assets);
      body += slideNo(1, theme);
      break;
    }

    /* ===== CONSTAT ===== */
    case "constat_A":
    case "constat_C": {
      const isC = key === "constat_C";
      const accent = isC ? "#00AAFF" : "#0A57FF";
      const kicker = isC ? "PICTURE THIS" : "THE SCENARIO";
      if (isC) body += dotField(7); else body += dotField(2);
      const stmt = fitWrap(c.mainText, CONTENT_W, 520, isC ? 70 : 72, 36, 600, DISPLAY, 1.12, -0.02, true);
      const convSize = 56;
      const totalH = 30 + 26 + stmt.lines.length * stmt.lineHeight + 48 + convSize * 1.0;
      const top = CENTER_Y - totalH / 2;
      body += textEl(PAD_X, top + 20, kicker, { size: 22, weight: 700, family: DISPLAY, color: accent, spacing: 0.16 });
      const stmtY0 = top + 30 + 26 + stmt.size * 0.82;
      stmt.lines.forEach((ln, i) => { body += textEl(PAD_X, stmtY0 + i * stmt.lineHeight, ln, { size: stmt.size, weight: 600, family: DISPLAY, color: p.fg, spacing: -0.02 }); });
      const convY = stmtY0 + (stmt.lines.length - 1) * stmt.lineHeight + 48 + convSize * 0.8;
      body += textEl(PAD_X, convY, c.secondaryText, { size: convSize, weight: 700, family: DISPLAY, color: isC ? "#FF72D0" : p.fg, spacing: -0.01 });
      body += logo(theme, 150, embed, assets);
      body += slideNo(2, theme);
      break;
    }
    case "constat_B": {
      const inMax = 760, inText = fitWrap(c.mainText, inMax - 80, 400, 40, 26, 500, BODY, 1.32, 0);
      const inH = inText.lines.length * inText.lineHeight + 72;
      const inW = Math.min(inMax, Math.max(...inText.lines.map((l) => measure(l, inText.size, 500, BODY))) + 80);
      const outText = c.secondaryText;
      const outSize = 46;
      const outW = Math.min(520, measure(outText, outSize, 700, DISPLAY) + 72);
      const outH = outSize * 1.0 + 72;
      const gap = 28;
      const totalH = inH + gap + outH;
      const top = CENTER_Y - totalH / 2;
      // incoming bubble
      body += `<path d="${roundRectPath(PAD_X, top, inW, inH, [32, 32, 32, 8])}" fill="${p.card === "#FFFFFF" ? "#FFFFFF" : p.card}" stroke="${p.line}"/>`;
      let iy = top + 36 + inText.size * 0.82;
      inText.lines.forEach((ln) => { body += textEl(PAD_X + 40, iy, ln, { size: inText.size, weight: 500, family: BODY, color: p.fg }); iy += inText.lineHeight; });
      // outgoing bubble (right)
      const ox = S - PAD_X - outW;
      const oy = top + inH + gap;
      body += `<path d="${roundRectPath(ox, oy, outW, outH, [32, 32, 8, 32])}" fill="#0A57FF"/>`;
      body += textEl(ox + outW / 2, oy + 36 + outSize * 0.78, outText, { size: outSize, weight: 700, family: DISPLAY, color: "#fff", anchor: "middle" });
      body += logo(theme, 150, embed, assets);
      body += slideNo(2, theme);
      break;
    }

    /* ===== DATA ===== */
    case "data_A":
    case "data_B":
    case "data_C": {
      const isB = key === "data_B", isC = key === "data_C";
      if (key === "data_A") body += dotField(4);
      if (isB) body += glow("blue", defs);
      const statBase = isB ? 420 : isC ? 410 : 400;
      let statSize = statBase;
      while (measure(c.mainText || "", statSize, 700, DISPLAY, -0.05) > CONTENT_W && statSize > 80) statSize -= 8;
      const statColor = isC ? "#FFFFFF" : isB ? "" : "#0A0632";
      const label = fitWrap(c.secondaryText, 740, 220, 36, 24, 500, BODY, 1.4, 0, true);
      const tickH = 7, tickGap = 50;
      const labelH = label.lines.length * label.lineHeight;
      const totalH = statSize * 0.84 + tickGap + labelH + 34 + 44;
      const top = CENTER_Y - totalH / 2;
      const statBaseline = top + statSize * 0.72;
      if (isB) { const gid = "grad_dataB"; gradTextDef(defs, gid, CENTER_X - measure(c.mainText, statSize, 700, DISPLAY, -0.05) / 2, CENTER_X + measure(c.mainText, statSize, 700, DISPLAY, -0.05) / 2); body += textEl(CENTER_X, statBaseline, c.mainText, { size: statSize, weight: 700, family: DISPLAY, color: "", spacing: -0.05, anchor: "middle", gradId: gid }); }
      else body += textEl(CENTER_X, statBaseline, c.mainText, { size: statSize, weight: 700, family: DISPLAY, color: statColor, spacing: -0.05, anchor: "middle" });
      let ny = statBaseline + statSize * 0.12 + 30;
      if (!isB) {
        const tickW = 120;
        if (isC) body += `<rect x="${CENTER_X - tickW / 2}" y="${ny.toFixed(1)}" width="${tickW}" height="${tickH}" rx="3.5" fill="#FFB300"/>`;
        else { const tlid = "tl_dataA"; defs.push(talkLineDef(tlid)); body += `<rect x="${CENTER_X - tickW / 2}" y="${ny.toFixed(1)}" width="${tickW}" height="${tickH}" rx="3.5" fill="url(#${tlid})"/>`; }
        ny += tickH + 24;
      } else ny += 28;
      const labelColor = isC ? "#FFFFFF" : isB ? "#F7F5F3" : p.fg;
      let ly = ny + label.size * 0.82;
      label.lines.forEach((ln) => { body += textEl(CENTER_X, ly, ln, { size: label.size, weight: 500, family: BODY, color: labelColor, anchor: "middle" }); ly += label.lineHeight; });
      const srcColor = isC ? "rgba(255,255,255,0.9)" : p.muted;
      const srcBorder = isC ? "rgba(255,255,255,0.34)" : p.line;
      body += sourcePill(c.source, CENTER_X, ly - label.size * 0.82 + labelH + 34, srcColor, srcBorder);
      body += logo(theme, 150, embed, assets);
      body += slideNo(3, theme);
      break;
    }

    /* ===== INSIGHT ===== */
    case "insight_A": {
      body += dotField(5);
      const words = mixWords(c.mainText, p.fg, c.highlightText, "#974DFF");
      const fit = fitWrapWords(words, 760, 460, 78, 44, 700, DISPLAY, 1.08, -0.02);
      const totalH = fit.lines.length * fit.lineHeight;
      const top = CENTER_Y - totalH / 2 + 10;
      body += textEl(PAD_X, top - 30, "“", { size: 200, weight: 700, family: DISPLAY, color: "#FF72D0" });
      const baseY0 = top + fit.size * 0.8;
      body += mixedLines(fit.lines, PAD_X, baseY0, fit.lineHeight, { size: fit.size, weight: 700, family: DISPLAY, spacing: -0.02 }, "start");
      const subY = baseY0 + (fit.lines.length - 1) * fit.lineHeight + 40 + 28;
      body += subParagraph(c.secondaryText, PAD_X, subY, 760, p.muted);
      body += logo(theme, 150, embed, assets);
      body += slideNo(4, theme);
      break;
    }
    case "insight_B": {
      const words = mixWords(c.mainText, p.fg, c.highlightText, p.fg, true);
      const fit = fitWrapWords(words, 740, 460, 92, 50, 700, DISPLAY, 1.04, -0.025);
      const totalH = 22 + 24 + fit.lines.length * fit.lineHeight;
      const top = CENTER_Y - totalH / 2;
      body += textEl(PAD_X, top + 20, "THE TAKEAWAY", { size: 22, weight: 700, family: DISPLAY, color: "#0A0632", spacing: 0.16 });
      const baseY0 = top + 22 + 24 + fit.size * 0.8;
      body += mixedLines(fit.lines, PAD_X, baseY0, fit.lineHeight, { size: fit.size, weight: 700, family: DISPLAY, spacing: -0.025 }, "start");
      const subY = baseY0 + (fit.lines.length - 1) * fit.lineHeight + 44 + 28;
      body += subParagraph(c.secondaryText, PAD_X, subY, 740, p.muted, 600);
      body += logo(theme, 150, embed, assets);
      body += slideNo(4, theme);
      break;
    }
    case "insight_C": {
      body += glow("pink", defs);
      const words = mixWords(c.mainText, p.fg, c.highlightText, "GRAD");
      const fit = fitWrapWords(words, 900, 460, 80, 44, 700, DISPLAY, 1.1, -0.02, true);
      const totalH = fit.lines.length * fit.lineHeight;
      const top = CENTER_Y - totalH / 2 - 20;
      const baseY0 = top + fit.size * 0.8;
      // gradient id spanning content width centered
      const gid = "grad_insightC"; gradTextDef(defs, gid, CENTER_X - 450, CENTER_X + 450);
      body += mixedLinesGrad(fit.lines, baseY0, fit.lineHeight, { size: fit.size, weight: 700, family: DISPLAY, spacing: -0.02 }, CENTER_X, gid);
      const subY = baseY0 + (fit.lines.length - 1) * fit.lineHeight + 38 + 28;
      body += subParagraphCenter(c.secondaryText, CENTER_X, subY, 720, bodyMuted(theme));
      body += logo(theme, 150, embed, assets);
      body += slideNo(4, theme);
      break;
    }

    /* ===== SOLUTION ===== */
    case "solution_A":
    case "solution_C": {
      const isC = key === "solution_C";
      const markTile = isC ? "light" : "dark";
      body += dotField(isC ? 8 : 5);
      if (!isC) body += glow("pink", defs);
      const claim = fitWrap(c.mainText, 820, 300, isC ? 116 : 118, 60, 700, DISPLAY, 0.98, -0.03, true);
      const body2 = fitWrap(c.secondaryText, 760, 160, 34, 22, 400, BODY, 1.45, 0);
      const markSize = 104;
      const claimH = claim.lines.length * claim.lineHeight;
      const bodyH = body2.lines.length * body2.lineHeight;
      const ctaH = 74;
      const totalH = markSize + 40 + claimH + 30 + bodyH + (isC ? 50 : 52) + ctaH;
      const top = CENTER_Y - totalH / 2;
      body += mark(markTile, PAD_X, top, markSize, embed, assets);
      const claimY0 = top + markSize + 40 + claim.size * 0.8;
      const gid = "grad_sol" + variant;
      const claimMaxW = Math.max(...claim.lines.map((l) => measure(l, claim.size, 700, DISPLAY, -0.03)));
      gradTextDef(defs, gid, PAD_X, PAD_X + claimMaxW);
      claim.lines.forEach((ln, i) => { body += textEl(PAD_X, claimY0 + i * claim.lineHeight, ln, { size: claim.size, weight: 700, family: DISPLAY, color: "", spacing: -0.03, gradId: gid }); });
      let by = claimY0 + (claim.lines.length - 1) * claim.lineHeight + 30 + body2.size * 0.82;
      body2.lines.forEach((ln) => { body += textEl(PAD_X, by, ln, { size: body2.size, weight: 400, family: BODY, color: bodyMuted(theme) }); by += body2.lineHeight; });
      // CTA row
      const cy = by - body2.size * 0.82 + (isC ? 50 : 52);
      const ctaText = c.cta, url = c.url;
      const ctaBg = isDark(theme) ? "#F7F5F3" : "#0A0632";
      const ctaFg = isDark(theme) ? "#0A0632" : "#F7F5F3";
      if (ctaText) {
        const cw = measure(ctaText, 30, 700, DISPLAY, -0.01) + 84;
        body += `<rect x="${PAD_X}" y="${cy.toFixed(1)}" width="${cw.toFixed(1)}" height="74" rx="37" fill="${ctaBg}"/>`;
        body += textEl(PAD_X + cw / 2, cy + 48, ctaText, { size: 30, weight: 700, family: DISPLAY, color: ctaFg, spacing: -0.01, anchor: "middle" });
        if (url) body += textEl(PAD_X + cw + 32, cy + 48, url, { size: 28, weight: 400, family: MONO, color: p.fg });
      } else if (url) body += textEl(PAD_X, cy + 48, url, { size: 28, weight: 400, family: MONO, color: p.fg });
      body += logo(theme, 230, embed, assets);
      body += slideNo(5, theme);
      break;
    }
    case "solution_B": {
      body += dotField(6);
      const cardW = 720, padIn = 72;
      const claim = fitWrap(c.mainText, cardW - padIn * 2, 220, 92, 50, 700, DISPLAY, 1.0, -0.03, true);
      const body2 = fitWrap(c.secondaryText, 620, 140, 34, 22, 400, BODY, 1.45, 0);
      const markSize = 92, ctaH = 70;
      const innerH = 80 + markSize + 26 + claim.lines.length * claim.lineHeight + 20 + body2.lines.length * body2.lineHeight + 38 + ctaH + 22 + 30 + 80;
      const cardH = innerH;
      const cardX = CENTER_X - cardW / 2;
      const cardY = CENTER_Y - cardH / 2;
      const gborder = "tl_solB"; defs.push(talkLineDef(gborder));
      body += `<rect x="${cardX - 4}" y="${cardY - 4}" width="${cardW + 8}" height="${cardH + 8}" rx="44" fill="url(#${gborder})"/>`;
      body += `<rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="40" fill="#0B0735"/>`;
      let yy = cardY + 80;
      body += mark("dark", CENTER_X - markSize / 2, yy, markSize, embed, assets);
      yy += markSize + 26 + claim.size * 0.8;
      const gid = "grad_solB"; const claimMaxW = Math.max(...claim.lines.map((l) => measure(l, claim.size, 700, DISPLAY, -0.03)));
      gradTextDef(defs, gid, CENTER_X - claimMaxW / 2, CENTER_X + claimMaxW / 2);
      claim.lines.forEach((ln, i) => { body += textEl(CENTER_X, yy + i * claim.lineHeight, ln, { size: claim.size, weight: 700, family: DISPLAY, color: "", spacing: -0.03, anchor: "middle", gradId: gid }); });
      yy += (claim.lines.length - 1) * claim.lineHeight + 20 + body2.size * 0.82;
      body2.lines.forEach((ln) => { body += textEl(CENTER_X, yy, ln, { size: body2.size, weight: 400, family: BODY, color: "#C9C7DB", anchor: "middle" }); yy += body2.lineHeight; });
      yy += 38 - body2.lineHeight + body2.size * 0.18;
      if (c.cta) { const cw = measure(c.cta, 30, 700, DISPLAY, -0.01) + 84; body += `<rect x="${CENTER_X - cw / 2}" y="${yy.toFixed(1)}" width="${cw.toFixed(1)}" height="${ctaH}" rx="35" fill="#F7F5F3"/>`; body += textEl(CENTER_X, yy + 46, c.cta, { size: 30, weight: 700, family: DISPLAY, color: "#0A0632", spacing: -0.01, anchor: "middle" }); yy += ctaH + 22; }
      if (c.url) body += textEl(CENTER_X, yy + 24, c.url, { size: 28, weight: 400, family: MONO, color: "#F7F5F3", anchor: "middle" });
      body += logo(theme, 200, embed, assets);
      body += slideNo(5, theme);
      break;
    }
  }
  return body;
}

// helper paragraphs (sub text)
function subParagraph(text: string, x: number, y0: number, maxW: number, color: string, weight = 400): string {
  const f = fitWrap(text, maxW, 300, 34, 20, weight, BODY, 1.45, 0);
  let out = "", y = y0;
  f.lines.forEach((ln) => { out += textEl(x, y, ln, { size: f.size, weight, family: BODY, color }); y += f.lineHeight; });
  return out;
}
function subParagraphCenter(text: string, cx: number, y0: number, maxW: number, color: string): string {
  const f = fitWrap(text, maxW, 300, 34, 20, 400, BODY, 1.45, 0, true);
  let out = "", y = y0;
  f.lines.forEach((ln) => { out += textEl(cx, y, ln, { size: f.size, weight: 400, family: BODY, color, anchor: "middle" }); y += f.lineHeight; });
  return out;
}

// gradient mixed lines (centered) for insight C: lead in fg, highlight in gradient
function mixedLinesGrad(lines: Word[][], y0: number, lineHeight: number, f: FontSpec, centerX: number, gid: string): string {
  let out = "";
  lines.forEach((line, i) => {
    const baseY = y0 + i * lineHeight;
    const full = line.map((w) => w.t).join(" ");
    const lineW = measure(full, f.size, f.weight, f.family, f.spacing);
    const startX = centerX - lineW / 2;
    let runs = "";
    for (let j = 0; j < line.length; j++) {
      const w = line[j];
      const seg = w.t + (j < line.length - 1 ? " " : "");
      const fill = w.color === "GRAD" ? `url(#${gid})` : w.color;
      runs += `<tspan fill="${fill}">${esc(seg)}</tspan>`;
    }
    const ls = f.spacing ? ` letter-spacing="${f.spacing * f.size}"` : "";
    out += `<text x="${startX.toFixed(1)}" y="${baseY.toFixed(1)}" font-family="${f.family}" font-weight="${f.weight}" font-size="${f.size}"${ls}>${runs}</text>`;
  });
  return out;
}

// fit + wrap for word arrays (mixed color)
function fitWrapWords(words: Word[], maxW: number, maxH: number, base: number, min: number, weight: number, family: string, lineRatio: number, spacing: number, balance = false): { size: number; lines: Word[][]; lineHeight: number } {
  let size = base;
  for (;;) {
    const f = { size, weight, family, spacing };
    const lines = balance ? wrapWordsBalanced(words, maxW, f) : wrapWords(words, maxW, f);
    const lh = size * lineRatio;
    if (lines.length * lh <= maxH || size <= min) return { size, lines, lineHeight: lh };
    size -= 2;
  }
}

// ── public API ──
export interface ExportAssets { fontsCss: string; img: Record<string, string> }

export function buildSlideSvg(data: SlideRenderData, opts: { embed: boolean; assets?: ExportAssets }): string {
  const { embed, assets } = opts;
  const p = PAL[data.palette];
  const defs: string[] = [];
  const content = renderContent(data, embed, assets, defs);
  const header = eyebrow(data.seriesLabel, data.palette, accentFor(data)) + progress(SLIDE_NUMBER[data.type], data.palette);
  const fontStyle = embed && assets ? `<style>${assets.fontsCss}</style>` : "";
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">` +
    fontStyle +
    `<defs>${defs.join("")}</defs>` +
    `<rect width="${S}" height="${S}" fill="${p.bg}"/>` +
    content +
    header +
    `</svg>`
  );
}

function accentFor(data: SlideRenderData): string {
  const key = `${data.type}_${data.variant}`;
  const map: Record<string, string> = {
    hook_A: "#FF72D0", hook_B: "#0A0632", hook_C: "#FFB300",
    constat_A: "#0A57FF", constat_B: "#0A57FF", constat_C: "#00AAFF",
    data_A: "#FFB300", data_B: "#00AAFF", data_C: "#FFFFFF",
    insight_A: "#974DFF", insight_B: "#0A0632", insight_C: "#974DFF",
    solution_A: "#00DB9D", solution_B: "#00DB9D", solution_C: "#0A57FF",
  };
  return map[key] || (isDark(data.palette) ? "#FF72D0" : "#0A57FF");
}

// preload fonts + images as base64 for export embedding (cached)
let _assets: ExportAssets | null = null;
async function dataUrl(url: string): Promise<string> {
  const r = await fetch(url);
  const b = await r.blob();
  return await new Promise<string>((res) => { const fr = new FileReader(); fr.onloadend = () => res(fr.result as string); fr.readAsDataURL(b); });
}
export async function loadExportAssets(): Promise<ExportAssets> {
  if (_assets) return _assets;
  const [sg, hk, hki, ld, ll, md, ml] = await Promise.all([
    dataUrl("/fonts/SpaceGrotesk-VariableFont_wght.ttf"),
    dataUrl("/fonts/HankenGrotesk-VariableFont_wght.ttf"),
    dataUrl("/fonts/HankenGrotesk-Italic-VariableFont_wght.ttf"),
    dataUrl("/carousel/migbirds-logo-dark.png"),
    dataUrl("/carousel/migbirds-logo-light.png"),
    dataUrl("/carousel/migbirds-mark-dark.png"),
    dataUrl("/carousel/migbirds-mark-light.png"),
  ]);
  _assets = {
    fontsCss:
      `@font-face{font-family:'Space Grotesk';src:url(${sg}) format('truetype');font-weight:300 700;}` +
      `@font-face{font-family:'Hanken Grotesk';src:url(${hk}) format('truetype');font-weight:100 900;}` +
      `@font-face{font-family:'Hanken Grotesk';src:url(${hki}) format('truetype');font-weight:100 900;font-style:italic;}`,
    img: { "migbirds-logo-dark": ld, "migbirds-logo-light": ll, "migbirds-mark-dark": md, "migbirds-mark-light": ml },
  };
  return _assets;
}
