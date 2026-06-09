import React from "react";
import { CarouselSlideData, CarouselSlideNumber, CarouselTheme, CAROUSEL_SIZE } from "./carousel-types";

// ─── Design tokens ──────────────────────────────────────────
const COLORS = {
  navy: "#0A0632",
  cream: "#F7F5F3",
  purple: "#974DFF",
  pink: "#FF72D0",
  yellow: "#FFB300",
  blue: "#0A57FF",
  turquoise: "#40FFC7",
  cyan: "#61D8FF",
};

const S = CAROUSEL_SIZE; // 1080

// ─── Shared SVG sub-components ──────────────────────────────

function CarouselLightGradientBg({ seed }: { seed: string }) {
  return (
    <>
      <defs>
        <filter id={`cbl1_${seed}`} x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="220" />
        </filter>
        <filter id={`cbl2_${seed}`} x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="160" />
        </filter>
        <radialGradient id={`cg1_${seed}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.21" stopColor={COLORS.purple} />
          <stop offset="0.72" stopColor={COLORS.pink} />
          <stop offset="1" stopColor={COLORS.yellow} />
        </radialGradient>
        <linearGradient id={`cg2_${seed}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.14" stopColor={COLORS.turquoise} />
          <stop offset="0.53" stopColor={COLORS.cyan} />
          <stop offset="1" stopColor={COLORS.blue} />
        </linearGradient>
      </defs>
      <ellipse cx={S * 0.78} cy={S * 0.6} rx={S * 0.4} ry={S * 0.45} fill={`url(#cg1_${seed})`} filter={`url(#cbl1_${seed})`} />
      <ellipse cx={S * 0.12} cy={S * 0.05} rx={S * 0.3} ry={S * 0.25} fill={`url(#cg2_${seed})`} filter={`url(#cbl2_${seed})`} />
    </>
  );
}

function CarouselDarkGradientBg({ seed }: { seed: string }) {
  return (
    <>
      <defs>
        <filter id={`cbd1_${seed}`} x="-80%" y="-80%" width="260%" height="260%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="260" />
        </filter>
        <filter id={`cbd2_${seed}`} x="-80%" y="-80%" width="260%" height="260%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="140" />
        </filter>
        <radialGradient id={`cdg1_${seed}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.21" stopColor={COLORS.purple} />
          <stop offset="0.72" stopColor={COLORS.pink} />
          <stop offset="1" stopColor={COLORS.yellow} />
        </radialGradient>
        <linearGradient id={`cdg2_${seed}`} x1="0" y1="0.5" x2="1" y2="0.3">
          <stop offset="0.15" stopColor="#00DB9D" />
          <stop offset="1" stopColor={COLORS.blue} />
        </linearGradient>
      </defs>
      <ellipse cx={S * 0.85} cy={S * 0.2} rx={S * 0.55} ry={S * 0.6} fill={`url(#cdg1_${seed})`} filter={`url(#cbd1_${seed})`} />
      <ellipse cx={S * 0.05} cy={S * 0.0} rx={S * 0.3} ry={S * 0.3} fill={`url(#cdg2_${seed})`} filter={`url(#cbd2_${seed})`} />
    </>
  );
}

function MigbirdsLogo({ x, y, textColor, scale = 1 }: { x: number; y: number; textColor: string; scale?: number }) {
  const tx = x - 50 * scale;
  const ty = y - 486 * scale;
  return (
    <g transform={`translate(${tx}, ${ty}) scale(${scale})`}>
      <path d="M193.607 486V490.373H200.142V496.907H204.515V486H193.607Z" fill={COLORS.pink} />
      <path d="M208.012 486V490.373H214.55V496.907H218.922V486H208.012Z" fill={COLORS.blue} />
      <path d="M208.012 500.405V504.778H214.55V511.316H218.922V500.405H208.012Z" fill={COLORS.yellow} />
      <path d="M54.7714 501.367V503.753H55.1562C55.8873 502.291 57.388 501.06 60.1585 501.06C62.929 501.06 64.5067 502.252 65.3917 504.061H65.7765C66.7 502.445 68.1237 501.06 71.2406 501.06C74.7807 501.06 77.6281 503.291 77.6281 507.909V520.453H72.7797V508.14C72.7797 506.062 71.6254 504.984 69.7014 504.984C67.4696 504.984 66.2383 506.447 66.2383 509.063V520.453H61.3899V508.14C61.3899 506.062 60.2355 504.984 58.3115 504.984C56.0797 504.984 54.8484 506.447 54.8484 509.063V520.453H50V501.367H54.7714Z" fill={textColor} />
      <path d="M87.1316 501.364H82.2832V520.449H87.1316V501.364Z" fill={textColor} />
      <path d="M106.18 501.364V503.942H105.795C104.641 502.287 102.794 500.825 99.4846 500.825C94.944 500.825 90.8652 504.673 90.8652 510.599C90.8652 516.525 94.944 520.373 99.4846 520.373C102.794 520.373 104.641 518.872 105.718 517.371H106.103V519.218C106.103 522.912 103.948 524.605 100.793 524.605C97.6376 524.605 96.1789 523.066 95.4688 521.023L91.1871 523.038C92.3239 525.802 95.2379 528.684 100.87 528.684C106.95 528.684 110.951 525.49 110.951 519.334V501.364H106.18ZM100.947 516.22C97.9454 516.22 95.7136 514.066 95.7136 510.602C95.7136 507.139 97.9454 504.984 100.947 504.984C103.948 504.984 106.18 507.139 106.18 510.602C106.18 514.066 103.948 516.22 100.947 516.22Z" fill={textColor} />
      <path d="M120.495 493.563V503.83H120.88C121.957 502.291 123.804 500.829 127.113 500.829C131.654 500.829 135.733 504.677 135.733 510.91C135.733 517.144 131.654 520.992 127.113 520.992C123.804 520.992 121.957 519.53 120.803 517.875H120.418V520.453H115.646V493.563H120.495ZM120.418 510.91C120.418 514.681 122.65 516.836 125.651 516.836C128.652 516.836 130.884 514.681 130.884 510.91C130.884 507.139 128.652 504.984 125.651 504.984C122.65 504.984 120.418 507.139 120.418 510.91Z" fill={textColor} />
      <path d="M144.313 501.364H139.465V520.449H144.313V501.364Z" fill={textColor} />
      <path d="M153.967 504.061H154.352C155.083 502.022 156.699 501.291 159.123 501.291H161.124V505.369H158.276C155.814 505.369 154.044 506.678 154.044 509.371V520.453H149.195V501.367H153.967V504.061Z" fill={textColor} />
      <path d="M182.52 520.453H177.748V517.875H177.364C176.209 519.53 174.362 520.992 171.053 520.992C166.512 520.992 162.434 517.144 162.434 510.91C162.434 504.677 166.512 500.829 171.053 500.829C174.362 500.829 176.209 502.291 177.287 503.83H177.671V493.563H182.52V520.453ZM167.282 510.91C167.282 514.681 169.514 516.836 172.515 516.836C175.517 516.836 177.748 514.681 177.748 510.91C177.748 507.139 175.517 504.984 172.515 504.984C169.514 504.984 167.282 507.139 167.282 510.91Z" fill={textColor} />
      <path d="M194.256 500.829C198.527 500.829 201.336 502.945 202.26 506.023L197.873 507.37C197.411 505.292 196.103 504.523 194.256 504.523C192.409 504.523 191.409 505.254 191.409 506.408C191.409 507.678 192.486 508.217 194.487 508.601L195.487 508.794C199.797 509.64 203.029 510.718 203.029 514.72C203.029 518.721 199.874 520.992 195.026 520.992C190.177 520.992 186.676 518.76 186.021 514.758L190.485 513.604C190.985 516.374 192.794 517.298 195.026 517.298C197.257 517.298 198.335 516.336 198.335 515.104C198.335 513.873 197.257 513.296 194.872 512.834L193.871 512.642C189.869 511.872 186.714 510.487 186.714 506.716C186.714 502.945 189.715 500.829 194.256 500.829Z" fill={textColor} />
      <path d="M87.4723 496.327C87.4723 497.852 86.234 499.09 84.7088 499.09C83.1836 499.09 81.9453 497.852 81.9453 496.327C81.9453 494.801 83.1836 493.563 84.7088 493.563C86.234 493.563 87.4723 494.801 87.4723 496.327Z" fill={textColor} />
      <path d="M144.652 496.327C144.652 497.852 143.414 499.09 141.889 499.09C140.363 499.09 139.125 497.852 139.125 496.327C139.125 494.801 140.363 493.563 141.889 493.563C143.414 493.563 144.652 494.801 144.652 496.327Z" fill={textColor} />
    </g>
  );
}

function MigbirdsIconOnly({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <path d="M0 0V4.373H6.535V10.907H10.908V0H0Z" fill={COLORS.pink} />
      <path d="M14.405 0V4.373H20.943V10.907H25.315V0H14.405Z" fill={COLORS.blue} />
      <path d="M14.405 14.405V18.778H20.943V25.316H25.315V14.405H14.405Z" fill={COLORS.yellow} />
    </g>
  );
}

// ─── Text utilities ─────────────────────────────────────────

function wrapText(text: string, maxCharsPerLine: number): string[] {
  if (!text) return [];
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";
  for (const word of words) {
    if (word.length > maxCharsPerLine) {
      if (currentLine) lines.push(currentLine);
      let remaining = word;
      while (remaining.length > maxCharsPerLine) {
        lines.push(remaining.slice(0, maxCharsPerLine));
        remaining = remaining.slice(maxCharsPerLine);
      }
      currentLine = remaining;
    } else if (currentLine.length + word.length + 1 <= maxCharsPerLine) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function calcAutoFitText(
  text: string,
  areaWidth: number,
  areaHeight: number,
  maxFontSize: number,
  minFontSize: number,
  lineHeightRatio = 1.3
): { lines: string[]; fontSize: number; lineHeight: number } {
  let fontSize = maxFontSize;
  const avgCharWidth = (f: number) => f * 0.6;
  let maxChars = Math.floor(areaWidth / avgCharWidth(fontSize));
  let lines = wrapText(text, maxChars);
  let lineHeight = fontSize * lineHeightRatio;
  let maxLines = Math.floor(areaHeight / lineHeight);

  while (lines.length > maxLines && fontSize > minFontSize) {
    fontSize -= 2;
    lineHeight = fontSize * lineHeightRatio;
    maxChars = Math.floor(areaWidth / avgCharWidth(fontSize));
    lines = wrapText(text, maxChars);
    maxLines = Math.floor(areaHeight / lineHeight);
  }

  if (lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
    const last = lines[maxLines - 1];
    lines[maxLines - 1] = last.length > 3 ? last.slice(0, -3) + "..." : last;
  }

  return { lines, fontSize, lineHeight };
}

// ─── Decorative elements ────────────────────────────────────

function SlideNumberBadge({ num, theme }: { num: number; theme: CarouselTheme }) {
  const isDark = theme === "dark";
  const bg = isDark ? "rgba(255,255,255,0.1)" : "rgba(10,6,50,0.06)";
  const textFill = isDark ? "rgba(255,255,255,0.35)" : "rgba(10,6,50,0.2)";
  return (
    <g>
      <rect x={S - 120} y={S - 120} width={80} height={80} rx={20} fill={bg} />
      <text
        x={S - 80}
        y={S - 72}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="bold"
        fontSize={32}
        fill={textFill}
      >
        {`0${num}`}
      </text>
    </g>
  );
}

function SeriesTag({ theme }: { theme: CarouselTheme }) {
  const isDark = theme === "dark";
  const bgFill = isDark ? COLORS.navy : COLORS.cream;
  const strokeFill = isDark ? COLORS.cream : COLORS.navy;
  const tagText = "TODAY, WE NEED TO TALK";
  const tagWidth = tagText.length * 8.5 + 36;
  return (
    <g>
      <rect x={60} y={40} width={tagWidth} height={42} rx={21} fill={bgFill} stroke={strokeFill} strokeWidth={1} />
      <text
        x={60 + tagWidth / 2}
        y={64}
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="bold"
        fontSize={11}
        fill={strokeFill}
        letterSpacing="1.5"
      >
        {tagText}
      </text>
    </g>
  );
}

function AccentDots({ theme }: { theme: CarouselTheme }) {
  const isDark = theme === "dark";
  return (
    <>
      <rect x={S * 0.88} y={S * 0.06} width={8} height={8} rx={1} transform={`rotate(45 ${S * 0.88} ${S * 0.06})`} fill={COLORS.purple} />
      <circle cx={S * 0.08} cy={S * 0.93} r={5} fill={isDark ? COLORS.cream : COLORS.purple} />
      <circle cx={S * 0.94} cy={S * 0.88} r={3.5} fill={COLORS.pink} />
    </>
  );
}

// ─── 5 Slide Components (React/JSX for preview) ────────────

// SLIDE 1: Stop-to-scroll
function Slide1Preview({ data }: { data: CarouselSlideData }) {
  const isDark = data.theme === "dark";
  const bg = isDark ? COLORS.navy : COLORS.cream;
  const textColor = isDark ? COLORS.cream : COLORS.navy;
  const seed = `s1_${data.theme}`;

  const mainText = data.mainText || "Your bold headline here...";
  const subText = data.secondaryText || "Tension subheadline...";
  const hasContent = !!data.mainText;

  // Headline — large, bold, max ~60px
  const headline = calcAutoFitText(mainText, S - 160, 420, 72, 36, 1.15);
  const headlineStartY = 180 + (420 - headline.lines.length * headline.lineHeight) / 2;

  // Subheadline
  const sub = calcAutoFitText(subText, S - 160, 120, 26, 16, 1.4);
  const subStartY = headlineStartY + headline.lines.length * headline.lineHeight + 40;

  return (
    <svg viewBox={`0 0 ${S} ${S}`} className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <rect width={S} height={S} fill={bg} />
      {isDark ? <CarouselDarkGradientBg seed={seed} /> : <CarouselLightGradientBg seed={seed} />}

      {/* Colored accent stripe at top */}
      <rect x={0} y={0} width={S} height={8} fill={COLORS.pink} />

      <SeriesTag theme={data.theme} />
      <AccentDots theme={data.theme} />

      {/* Headline */}
      {headline.lines.map((line, i) => (
        <text
          key={i}
          x={80}
          y={headlineStartY + i * headline.lineHeight + headline.fontSize}
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="900"
          fontSize={headline.fontSize}
          fill={textColor}
          opacity={hasContent ? 1 : 0.25}
        >
          {line}
        </text>
      ))}

      {/* Subheadline */}
      {sub.lines.map((line, i) => (
        <text
          key={`sub-${i}`}
          x={80}
          y={subStartY + i * sub.lineHeight + sub.fontSize}
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="500"
          fontSize={sub.fontSize}
          fill={textColor}
          opacity={hasContent ? 0.6 : 0.15}
        >
          {line}
        </text>
      ))}

      {/* Swipe arrow */}
      <g transform={`translate(${S - 140}, ${S - 200})`}>
        <path d="M0 20 Q30 0 60 20" stroke={textColor} strokeWidth={2.5} fill="none" opacity={0.25} />
        <path d="M52 14 L60 20 L52 26" stroke={textColor} strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.25} />
      </g>

      <SlideNumberBadge num={1} theme={data.theme} />
      <MigbirdsLogo x={80} y={S - 105} textColor={textColor} scale={0.8} />
    </svg>
  );
}

// SLIDE 2: Constat
function Slide2Preview({ data }: { data: CarouselSlideData }) {
  const isDark = data.theme === "dark";
  const bg = isDark ? COLORS.navy : COLORS.cream;
  const textColor = isDark ? COLORS.cream : COLORS.navy;
  const seed = `s2_${data.theme}`;

  const mainText = data.mainText || "Describe the problem situation...";
  const subText = data.secondaryText || "Conversational subheading...";
  const hasContent = !!data.mainText;

  const main = calcAutoFitText(mainText, S - 160, 400, 42, 20, 1.4);
  const mainStartY = 200 + (400 - main.lines.length * main.lineHeight) / 2;

  const sub = calcAutoFitText(subText, S - 160, 100, 22, 14, 1.4);
  const subStartY = mainStartY + main.lines.length * main.lineHeight + 30;

  return (
    <svg viewBox={`0 0 ${S} ${S}`} className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <rect width={S} height={S} fill={bg} />
      {isDark ? <CarouselDarkGradientBg seed={seed} /> : <CarouselLightGradientBg seed={seed} />}

      <SeriesTag theme={data.theme} />
      <AccentDots theme={data.theme} />

      {/* Content frame */}
      <rect
        x={50} y={110} width={S - 100} height={S - 230}
        rx={30} fill="none"
        stroke={isDark ? "rgba(247,245,243,0.12)" : "rgba(10,6,50,0.08)"}
        strokeWidth={1}
      />

      {/* Conversation bubble icon */}
      <g transform="translate(80, 140)">
        <circle cx={22} cy={22} r={22} fill={COLORS.blue} opacity={0.12} />
        <text x={22} y={28} textAnchor="middle" fontFamily="Arial" fontSize={22} fill={COLORS.blue}>
          {"💬"}
        </text>
      </g>

      {/* Main text */}
      {main.lines.map((line, i) => (
        <text
          key={i}
          x={80}
          y={mainStartY + i * main.lineHeight + main.fontSize}
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="bold"
          fontSize={main.fontSize}
          fill={textColor}
          opacity={hasContent ? 1 : 0.25}
        >
          {line}
        </text>
      ))}

      {/* Subheading */}
      {sub.lines.map((line, i) => (
        <text
          key={`sub-${i}`}
          x={80}
          y={subStartY + i * sub.lineHeight + sub.fontSize}
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="400"
          fontSize={sub.fontSize}
          fill={isDark ? COLORS.pink : COLORS.purple}
          fontStyle="italic"
          opacity={hasContent ? 0.85 : 0.2}
        >
          {line}
        </text>
      ))}

      <SlideNumberBadge num={2} theme={data.theme} />
      <MigbirdsLogo x={80} y={S - 105} textColor={textColor} scale={0.8} />
    </svg>
  );
}

// SLIDE 3: Data
function Slide3Preview({ data }: { data: CarouselSlideData }) {
  const isDark = data.theme === "dark";
  const bg = isDark ? COLORS.navy : COLORS.cream;
  const textColor = isDark ? COLORS.cream : COLORS.navy;
  const seed = `s3_${data.theme}`;

  const stat = data.mainText || "72%";
  const source = data.secondaryText || "Source: Author, Year";
  const hasStat = !!data.mainText;

  // Calculate stat font size — as large as possible
  const avgCharWidth = (f: number) => f * 0.65;
  let statFontSize = 280;
  while (stat.length * avgCharWidth(statFontSize) > S - 120 && statFontSize > 60) {
    statFontSize -= 10;
  }
  // Cap at reasonable size based on text length
  if (stat.length > 8) statFontSize = Math.min(statFontSize, 140);
  if (stat.length > 15) statFontSize = Math.min(statFontSize, 80);

  return (
    <svg viewBox={`0 0 ${S} ${S}`} className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <rect width={S} height={S} fill={bg} />
      {isDark ? <CarouselDarkGradientBg seed={seed} /> : <CarouselLightGradientBg seed={seed} />}

      <SeriesTag theme={data.theme} />
      <AccentDots theme={data.theme} />

      {/* Huge centered statistic */}
      <text
        x={S / 2}
        y={S / 2 + statFontSize * 0.08}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="900"
        fontSize={statFontSize}
        fill={textColor}
        opacity={hasStat ? 1 : 0.15}
      >
        {stat}
      </text>

      {/* Accent line under stat */}
      <rect
        x={S / 2 - 40}
        y={S / 2 + statFontSize * 0.45 + 20}
        width={80}
        height={4}
        rx={2}
        fill={COLORS.pink}
      />

      {/* Source */}
      <text
        x={S / 2}
        y={S / 2 + statFontSize * 0.45 + 60}
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="400"
        fontSize={16}
        fill={textColor}
        opacity={hasStat ? 0.45 : 0.15}
      >
        {source}
      </text>

      <SlideNumberBadge num={3} theme={data.theme} />
      <MigbirdsLogo x={80} y={S - 105} textColor={textColor} scale={0.8} />
    </svg>
  );
}

// SLIDE 4: Insight
function Slide4Preview({ data }: { data: CarouselSlideData }) {
  const isDark = data.theme === "dark";
  const bg = isDark ? COLORS.navy : COLORS.cream;
  const textColor = isDark ? COLORS.cream : COLORS.navy;
  const seed = `s4_${data.theme}`;

  const mainText = data.mainText || "Your editorial insight here...";
  const subText = data.secondaryText || "";
  const hasContent = !!data.mainText;

  const main = calcAutoFitText(mainText, S - 200, 420, 46, 22, 1.4);
  const mainStartY = 200 + (420 - main.lines.length * main.lineHeight) / 2;

  const sub = subText ? calcAutoFitText(subText, S - 200, 80, 20, 14, 1.4) : null;
  const subStartY = mainStartY + main.lines.length * main.lineHeight + 30;

  return (
    <svg viewBox={`0 0 ${S} ${S}`} className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <rect width={S} height={S} fill={bg} />
      {isDark ? <CarouselDarkGradientBg seed={seed} /> : <CarouselLightGradientBg seed={seed} />}

      <SeriesTag theme={data.theme} />
      <AccentDots theme={data.theme} />

      {/* Large opening quote mark */}
      <text
        x={80}
        y={200}
        fontFamily="Georgia, serif"
        fontWeight="bold"
        fontSize={120}
        fill={COLORS.purple}
        opacity={0.15}
      >
        {"“"}
      </text>

      {/* Left accent bar */}
      <rect x={68} y={mainStartY + main.fontSize - 5} width={4} height={main.lines.length * main.lineHeight - 10} rx={2} fill={COLORS.purple} opacity={0.5} />

      {/* Main text */}
      {main.lines.map((line, i) => (
        <text
          key={i}
          x={100}
          y={mainStartY + i * main.lineHeight + main.fontSize}
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="bold"
          fontSize={main.fontSize}
          fill={textColor}
          opacity={hasContent ? 1 : 0.25}
        >
          {line}
        </text>
      ))}

      {/* Optional sub text */}
      {sub && sub.lines.map((line, i) => (
        <text
          key={`sub-${i}`}
          x={100}
          y={subStartY + i * sub.lineHeight + sub.fontSize}
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="400"
          fontSize={sub.fontSize}
          fill={textColor}
          opacity={0.5}
        >
          {line}
        </text>
      ))}

      <SlideNumberBadge num={4} theme={data.theme} />
      <MigbirdsLogo x={80} y={S - 105} textColor={textColor} scale={0.8} />
    </svg>
  );
}

// SLIDE 5: Solution Migbirds
function Slide5Preview({ data }: { data: CarouselSlideData }) {
  const isDark = data.theme === "dark";
  const bg = isDark ? COLORS.navy : COLORS.cream;
  const textColor = isDark ? COLORS.cream : COLORS.navy;
  const seed = `s5_${data.theme}`;

  const mainText = data.mainText || "Your solution statement...";
  const hasContent = !!data.mainText;

  const main = calcAutoFitText(mainText, S - 200, 200, 32, 18, 1.4);
  const mainStartY = 340;

  return (
    <svg viewBox={`0 0 ${S} ${S}`} className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <rect width={S} height={S} fill={bg} />
      {isDark ? <CarouselDarkGradientBg seed={seed} /> : <CarouselLightGradientBg seed={seed} />}

      <AccentDots theme={data.theme} />

      {/* Large Migbirds icon centered at top */}
      <MigbirdsIconOnly x={S / 2 - 52} y={140} scale={4} />

      {/* "A new way to grow" tagline */}
      <text
        x={S / 2}
        y={310}
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize={28}
        fill={COLORS.purple}
        letterSpacing="0.5"
      >
        A new way to grow
      </text>

      {/* Divider line */}
      <rect x={S / 2 - 40} y={330} width={80} height={2} rx={1} fill={textColor} opacity={0.1} />

      {/* Main text */}
      {main.lines.map((line, i) => (
        <text
          key={i}
          x={S / 2}
          y={mainStartY + 30 + i * main.lineHeight + main.fontSize}
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="500"
          fontSize={main.fontSize}
          fill={textColor}
          opacity={hasContent ? 0.75 : 0.2}
        >
          {line}
        </text>
      ))}

      {/* CTA button */}
      <rect
        x={S / 2 - 140}
        y={S - 260}
        width={280}
        height={56}
        rx={28}
        fill={COLORS.purple}
      />
      <text
        x={S / 2}
        y={S - 226}
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="bold"
        fontSize={16}
        fill={COLORS.cream}
        letterSpacing="0.5"
      >
        migbirds.com
      </text>

      <SlideNumberBadge num={5} theme={data.theme} />
      <MigbirdsLogo x={S / 2 - 70} y={S - 105} textColor={textColor} scale={0.8} />
    </svg>
  );
}

// ─── Slide preview dispatcher ───────────────────────────────

export function CarouselSlidePreview({ data }: { data: CarouselSlideData }) {
  switch (data.slideNumber) {
    case 1: return <Slide1Preview data={data} />;
    case 2: return <Slide2Preview data={data} />;
    case 3: return <Slide3Preview data={data} />;
    case 4: return <Slide4Preview data={data} />;
    case 5: return <Slide5Preview data={data} />;
  }
}

// ─── SVG string builders for export ─────────────────────────

function escapeXml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildGradientDefs(theme: CarouselTheme): string {
  if (theme === "dark") {
    return `
      <defs>
        <filter id="cbd1" x="-80%" y="-80%" width="260%" height="260%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="260"/></filter>
        <filter id="cbd2" x="-80%" y="-80%" width="260%" height="260%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="140"/></filter>
        <radialGradient id="cdg1" cx="0.5" cy="0.5" r="0.5"><stop offset="0.21" stop-color="${COLORS.purple}"/><stop offset="0.72" stop-color="${COLORS.pink}"/><stop offset="1" stop-color="${COLORS.yellow}"/></radialGradient>
        <linearGradient id="cdg2" x1="0" y1="0.5" x2="1" y2="0.3"><stop offset="0.15" stop-color="#00DB9D"/><stop offset="1" stop-color="${COLORS.blue}"/></linearGradient>
      </defs>
      <ellipse cx="${S * 0.85}" cy="${S * 0.2}" rx="${S * 0.55}" ry="${S * 0.6}" fill="url(#cdg1)" filter="url(#cbd1)"/>
      <ellipse cx="${S * 0.05}" cy="0" rx="${S * 0.3}" ry="${S * 0.3}" fill="url(#cdg2)" filter="url(#cbd2)"/>`;
  }
  return `
    <defs>
      <filter id="cbl1" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="220"/></filter>
      <filter id="cbl2" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="160"/></filter>
      <radialGradient id="cg1" cx="0.5" cy="0.5" r="0.5"><stop offset="0.21" stop-color="${COLORS.purple}"/><stop offset="0.72" stop-color="${COLORS.pink}"/><stop offset="1" stop-color="${COLORS.yellow}"/></radialGradient>
      <linearGradient id="cg2" x1="0" y1="0" x2="1" y2="0"><stop offset="0.14" stop-color="${COLORS.turquoise}"/><stop offset="0.53" stop-color="${COLORS.cyan}"/><stop offset="1" stop-color="${COLORS.blue}"/></linearGradient>
    </defs>
    <ellipse cx="${S * 0.78}" cy="${S * 0.6}" rx="${S * 0.4}" ry="${S * 0.45}" fill="url(#cg1)" filter="url(#cbl1)"/>
    <ellipse cx="${S * 0.12}" cy="${S * 0.05}" rx="${S * 0.3}" ry="${S * 0.25}" fill="url(#cg2)" filter="url(#cbl2)"/>`;
}

function buildLogoSvgString(x: number, y: number, textColor: string, scale = 1): string {
  const tx = x - 50 * scale;
  const ty = y - 486 * scale;
  return `<g transform="translate(${tx}, ${ty}) scale(${scale})">
    <path d="M193.607 486V490.373H200.142V496.907H204.515V486H193.607Z" fill="${COLORS.pink}"/>
    <path d="M208.012 486V490.373H214.55V496.907H218.922V486H208.012Z" fill="${COLORS.blue}"/>
    <path d="M208.012 500.405V504.778H214.55V511.316H218.922V500.405H208.012Z" fill="${COLORS.yellow}"/>
    <path d="M54.7714 501.367V503.753H55.1562C55.8873 502.291 57.388 501.06 60.1585 501.06C62.929 501.06 64.5067 502.252 65.3917 504.061H65.7765C66.7 502.445 68.1237 501.06 71.2406 501.06C74.7807 501.06 77.6281 503.291 77.6281 507.909V520.453H72.7797V508.14C72.7797 506.062 71.6254 504.984 69.7014 504.984C67.4696 504.984 66.2383 506.447 66.2383 509.063V520.453H61.3899V508.14C61.3899 506.062 60.2355 504.984 58.3115 504.984C56.0797 504.984 54.8484 506.447 54.8484 509.063V520.453H50V501.367H54.7714Z" fill="${textColor}"/>
    <path d="M87.1316 501.364H82.2832V520.449H87.1316V501.364Z" fill="${textColor}"/>
    <path d="M106.18 501.364V503.942H105.795C104.641 502.287 102.794 500.825 99.4846 500.825C94.944 500.825 90.8652 504.673 90.8652 510.599C90.8652 516.525 94.944 520.373 99.4846 520.373C102.794 520.373 104.641 518.872 105.718 517.371H106.103V519.218C106.103 522.912 103.948 524.605 100.793 524.605C97.6376 524.605 96.1789 523.066 95.4688 521.023L91.1871 523.038C92.3239 525.802 95.2379 528.684 100.87 528.684C106.95 528.684 110.951 525.49 110.951 519.334V501.364H106.18ZM100.947 516.22C97.9454 516.22 95.7136 514.066 95.7136 510.602C95.7136 507.139 97.9454 504.984 100.947 504.984C103.948 504.984 106.18 507.139 106.18 510.602C106.18 514.066 103.948 516.22 100.947 516.22Z" fill="${textColor}"/>
    <path d="M120.495 493.563V503.83H120.88C121.957 502.291 123.804 500.829 127.113 500.829C131.654 500.829 135.733 504.677 135.733 510.91C135.733 517.144 131.654 520.992 127.113 520.992C123.804 520.992 121.957 519.53 120.803 517.875H120.418V520.453H115.646V493.563H120.495ZM120.418 510.91C120.418 514.681 122.65 516.836 125.651 516.836C128.652 516.836 130.884 514.681 130.884 510.91C130.884 507.139 128.652 504.984 125.651 504.984C122.65 504.984 120.418 507.139 120.418 510.91Z" fill="${textColor}"/>
    <path d="M144.313 501.364H139.465V520.449H144.313V501.364Z" fill="${textColor}"/>
    <path d="M153.967 504.061H154.352C155.083 502.022 156.699 501.291 159.123 501.291H161.124V505.369H158.276C155.814 505.369 154.044 506.678 154.044 509.371V520.453H149.195V501.367H153.967V504.061Z" fill="${textColor}"/>
    <path d="M182.52 520.453H177.748V517.875H177.364C176.209 519.53 174.362 520.992 171.053 520.992C166.512 520.992 162.434 517.144 162.434 510.91C162.434 504.677 166.512 500.829 171.053 500.829C174.362 500.829 176.209 502.291 177.287 503.83H177.671V493.563H182.52V520.453ZM167.282 510.91C167.282 514.681 169.514 516.836 172.515 516.836C175.517 516.836 177.748 514.681 177.748 510.91C177.748 507.139 175.517 504.984 172.515 504.984C169.514 504.984 167.282 507.139 167.282 510.91Z" fill="${textColor}"/>
    <path d="M194.256 500.829C198.527 500.829 201.336 502.945 202.26 506.023L197.873 507.37C197.411 505.292 196.103 504.523 194.256 504.523C192.409 504.523 191.409 505.254 191.409 506.408C191.409 507.678 192.486 508.217 194.487 508.601L195.487 508.794C199.797 509.64 203.029 510.718 203.029 514.72C203.029 518.721 199.874 520.992 195.026 520.992C190.177 520.992 186.676 518.76 186.021 514.758L190.485 513.604C190.985 516.374 192.794 517.298 195.026 517.298C197.257 517.298 198.335 516.336 198.335 515.104C198.335 513.873 197.257 513.296 194.872 512.834L193.871 512.642C189.869 511.872 186.714 510.487 186.714 506.716C186.714 502.945 189.715 500.829 194.256 500.829Z" fill="${textColor}"/>
    <path d="M87.4723 496.327C87.4723 497.852 86.234 499.09 84.7088 499.09C83.1836 499.09 81.9453 497.852 81.9453 496.327C81.9453 494.801 83.1836 493.563 84.7088 493.563C86.234 493.563 87.4723 494.801 87.4723 496.327Z" fill="${textColor}"/>
    <path d="M144.652 496.327C144.652 497.852 143.414 499.09 141.889 499.09C140.363 499.09 139.125 497.852 139.125 496.327C139.125 494.801 140.363 493.563 141.889 493.563C143.414 493.563 144.652 494.801 144.652 496.327Z" fill="${textColor}"/>
  </g>`;
}

function buildSeriesTagString(theme: CarouselTheme): string {
  const isDark = theme === "dark";
  const bgFill = isDark ? COLORS.navy : COLORS.cream;
  const strokeFill = isDark ? COLORS.cream : COLORS.navy;
  const tagText = "TODAY, WE NEED TO TALK";
  const tagWidth = tagText.length * 8.5 + 36;
  return `<rect x="60" y="40" width="${tagWidth}" height="42" rx="21" fill="${bgFill}" stroke="${strokeFill}" stroke-width="1"/>
    <text x="${60 + tagWidth / 2}" y="64" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="11" fill="${strokeFill}" letter-spacing="1.5">${tagText}</text>`;
}

function buildAccentDotsString(theme: CarouselTheme): string {
  const isDark = theme === "dark";
  return `<rect x="${S * 0.88}" y="${S * 0.06}" width="8" height="8" rx="1" transform="rotate(45 ${S * 0.88} ${S * 0.06})" fill="${COLORS.purple}"/>
    <circle cx="${S * 0.08}" cy="${S * 0.93}" r="5" fill="${isDark ? COLORS.cream : COLORS.purple}"/>
    <circle cx="${S * 0.94}" cy="${S * 0.88}" r="3.5" fill="${COLORS.pink}"/>`;
}

function buildSlideNumberBadgeString(num: number, theme: CarouselTheme): string {
  const isDark = theme === "dark";
  const bg = isDark ? "rgba(255,255,255,0.1)" : "rgba(10,6,50,0.06)";
  const textFill = isDark ? "rgba(255,255,255,0.35)" : "rgba(10,6,50,0.2)";
  return `<rect x="${S - 120}" y="${S - 120}" width="80" height="80" rx="20" fill="${bg}"/>
    <text x="${S - 80}" y="${S - 72}" text-anchor="middle" dominant-baseline="central" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="32" fill="${textFill}">0${num}</text>`;
}

function buildIconOnlyString(x: number, y: number, scale = 1): string {
  return `<g transform="translate(${x}, ${y}) scale(${scale})">
    <path d="M0 0V4.373H6.535V10.907H10.908V0H0Z" fill="${COLORS.pink}"/>
    <path d="M14.405 0V4.373H20.943V10.907H25.315V0H14.405Z" fill="${COLORS.blue}"/>
    <path d="M14.405 14.405V18.778H20.943V25.316H25.315V14.405H14.405Z" fill="${COLORS.yellow}"/>
  </g>`;
}

// ─── Export-ready SVG string builders per slide ─────────────

function buildSlide1Svg(data: CarouselSlideData): string {
  const isDark = data.theme === "dark";
  const bg = isDark ? COLORS.navy : COLORS.cream;
  const textColor = isDark ? COLORS.cream : COLORS.navy;

  const mainText = data.mainText || "";
  const subText = data.secondaryText || "";

  const headline = calcAutoFitText(mainText, S - 160, 420, 72, 36, 1.15);
  const headlineStartY = 180 + (420 - headline.lines.length * headline.lineHeight) / 2;
  const sub = calcAutoFitText(subText, S - 160, 120, 26, 16, 1.4);
  const subStartY = headlineStartY + headline.lines.length * headline.lineHeight + 40;

  const headlineSvg = headline.lines.map((line, i) =>
    `<text x="80" y="${headlineStartY + i * headline.lineHeight + headline.fontSize}" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="${headline.fontSize}" fill="${textColor}">${escapeXml(line)}</text>`
  ).join("\n    ");

  const subSvg = sub.lines.map((line, i) =>
    `<text x="80" y="${subStartY + i * sub.lineHeight + sub.fontSize}" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="${sub.fontSize}" fill="${textColor}" opacity="0.6">${escapeXml(line)}</text>`
  ).join("\n    ");

  return `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${S}" height="${S}" fill="${bg}"/>
  ${buildGradientDefs(data.theme)}
  <rect x="0" y="0" width="${S}" height="8" fill="${COLORS.pink}"/>
  ${buildSeriesTagString(data.theme)}
  ${buildAccentDotsString(data.theme)}
  ${headlineSvg}
  ${subSvg}
  <g transform="translate(${S - 140}, ${S - 200})">
    <path d="M0 20 Q30 0 60 20" stroke="${textColor}" stroke-width="2.5" fill="none" opacity="0.25"/>
    <path d="M52 14 L60 20 L52 26" stroke="${textColor}" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.25"/>
  </g>
  ${buildSlideNumberBadgeString(1, data.theme)}
  ${buildLogoSvgString(80, S - 105, textColor, 0.8)}
</svg>`;
}

function buildSlide2Svg(data: CarouselSlideData): string {
  const isDark = data.theme === "dark";
  const bg = isDark ? COLORS.navy : COLORS.cream;
  const textColor = isDark ? COLORS.cream : COLORS.navy;

  const mainText = data.mainText || "";
  const subText = data.secondaryText || "";

  const main = calcAutoFitText(mainText, S - 160, 400, 42, 20, 1.4);
  const mainStartY = 200 + (400 - main.lines.length * main.lineHeight) / 2;
  const sub = calcAutoFitText(subText, S - 160, 100, 22, 14, 1.4);
  const subStartY = mainStartY + main.lines.length * main.lineHeight + 30;

  const mainSvg = main.lines.map((line, i) =>
    `<text x="80" y="${mainStartY + i * main.lineHeight + main.fontSize}" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="${main.fontSize}" fill="${textColor}">${escapeXml(line)}</text>`
  ).join("\n    ");

  const subSvg = sub.lines.map((line, i) =>
    `<text x="80" y="${subStartY + i * sub.lineHeight + sub.fontSize}" font-family="Arial, Helvetica, sans-serif" font-weight="400" font-size="${sub.fontSize}" fill="${isDark ? COLORS.pink : COLORS.purple}" font-style="italic" opacity="0.85">${escapeXml(line)}</text>`
  ).join("\n    ");

  return `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${S}" height="${S}" fill="${bg}"/>
  ${buildGradientDefs(data.theme)}
  ${buildSeriesTagString(data.theme)}
  ${buildAccentDotsString(data.theme)}
  <rect x="50" y="110" width="${S - 100}" height="${S - 230}" rx="30" fill="none" stroke="${isDark ? 'rgba(247,245,243,0.12)' : 'rgba(10,6,50,0.08)'}" stroke-width="1"/>
  ${mainSvg}
  ${subSvg}
  ${buildSlideNumberBadgeString(2, data.theme)}
  ${buildLogoSvgString(80, S - 105, textColor, 0.8)}
</svg>`;
}

function buildSlide3Svg(data: CarouselSlideData): string {
  const isDark = data.theme === "dark";
  const bg = isDark ? COLORS.navy : COLORS.cream;
  const textColor = isDark ? COLORS.cream : COLORS.navy;

  const stat = data.mainText || "";
  const source = data.secondaryText || "";

  const avgCharWidth = (f: number) => f * 0.65;
  let statFontSize = 280;
  while (stat.length * avgCharWidth(statFontSize) > S - 120 && statFontSize > 60) {
    statFontSize -= 10;
  }
  if (stat.length > 8) statFontSize = Math.min(statFontSize, 140);
  if (stat.length > 15) statFontSize = Math.min(statFontSize, 80);

  return `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${S}" height="${S}" fill="${bg}"/>
  ${buildGradientDefs(data.theme)}
  ${buildSeriesTagString(data.theme)}
  ${buildAccentDotsString(data.theme)}
  <text x="${S / 2}" y="${S / 2 + statFontSize * 0.08}" text-anchor="middle" dominant-baseline="central" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="${statFontSize}" fill="${textColor}">${escapeXml(stat)}</text>
  <rect x="${S / 2 - 40}" y="${S / 2 + statFontSize * 0.45 + 20}" width="80" height="4" rx="2" fill="${COLORS.pink}"/>
  <text x="${S / 2}" y="${S / 2 + statFontSize * 0.45 + 60}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="400" font-size="16" fill="${textColor}" opacity="0.45">${escapeXml(source)}</text>
  ${buildSlideNumberBadgeString(3, data.theme)}
  ${buildLogoSvgString(80, S - 105, textColor, 0.8)}
</svg>`;
}

function buildSlide4Svg(data: CarouselSlideData): string {
  const isDark = data.theme === "dark";
  const bg = isDark ? COLORS.navy : COLORS.cream;
  const textColor = isDark ? COLORS.cream : COLORS.navy;

  const mainText = data.mainText || "";
  const subText = data.secondaryText || "";

  const main = calcAutoFitText(mainText, S - 200, 420, 46, 22, 1.4);
  const mainStartY = 200 + (420 - main.lines.length * main.lineHeight) / 2;
  const sub = subText ? calcAutoFitText(subText, S - 200, 80, 20, 14, 1.4) : null;
  const subStartY = mainStartY + main.lines.length * main.lineHeight + 30;

  const mainSvg = main.lines.map((line, i) =>
    `<text x="100" y="${mainStartY + i * main.lineHeight + main.fontSize}" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="${main.fontSize}" fill="${textColor}">${escapeXml(line)}</text>`
  ).join("\n    ");

  const subSvg = sub ? sub.lines.map((line, i) =>
    `<text x="100" y="${subStartY + i * sub.lineHeight + sub.fontSize}" font-family="Arial, Helvetica, sans-serif" font-weight="400" font-size="${sub.fontSize}" fill="${textColor}" opacity="0.5">${escapeXml(line)}</text>`
  ).join("\n    ") : "";

  return `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${S}" height="${S}" fill="${bg}"/>
  ${buildGradientDefs(data.theme)}
  ${buildSeriesTagString(data.theme)}
  ${buildAccentDotsString(data.theme)}
  <text x="80" y="200" font-family="Georgia, serif" font-weight="bold" font-size="120" fill="${COLORS.purple}" opacity="0.15">“</text>
  <rect x="68" y="${mainStartY + main.fontSize - 5}" width="4" height="${main.lines.length * main.lineHeight - 10}" rx="2" fill="${COLORS.purple}" opacity="0.5"/>
  ${mainSvg}
  ${subSvg}
  ${buildSlideNumberBadgeString(4, data.theme)}
  ${buildLogoSvgString(80, S - 105, textColor, 0.8)}
</svg>`;
}

function buildSlide5Svg(data: CarouselSlideData): string {
  const isDark = data.theme === "dark";
  const bg = isDark ? COLORS.navy : COLORS.cream;
  const textColor = isDark ? COLORS.cream : COLORS.navy;

  const mainText = data.mainText || "";
  const main = calcAutoFitText(mainText, S - 200, 200, 32, 18, 1.4);
  const mainStartY = 340;

  const mainSvg = main.lines.map((line, i) =>
    `<text x="${S / 2}" y="${mainStartY + 30 + i * main.lineHeight + main.fontSize}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="${main.fontSize}" fill="${textColor}" opacity="0.75">${escapeXml(line)}</text>`
  ).join("\n    ");

  return `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${S}" height="${S}" fill="${bg}"/>
  ${buildGradientDefs(data.theme)}
  ${buildAccentDotsString(data.theme)}
  ${buildIconOnlyString(S / 2 - 52, 140, 4)}
  <text x="${S / 2}" y="310" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="28" fill="${COLORS.purple}" letter-spacing="0.5">A new way to grow</text>
  <rect x="${S / 2 - 40}" y="330" width="80" height="2" rx="1" fill="${textColor}" opacity="0.1"/>
  ${mainSvg}
  <rect x="${S / 2 - 140}" y="${S - 260}" width="280" height="56" rx="28" fill="${COLORS.purple}"/>
  <text x="${S / 2}" y="${S - 226}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="16" fill="${COLORS.cream}" letter-spacing="0.5">migbirds.com</text>
  ${buildSlideNumberBadgeString(5, data.theme)}
  ${buildLogoSvgString(S / 2 - 70, S - 105, textColor, 0.8)}
</svg>`;
}

// ─── Public export functions ────────────────────────────────

export function renderCarouselSlideSvg(data: CarouselSlideData): string {
  switch (data.slideNumber) {
    case 1: return buildSlide1Svg(data);
    case 2: return buildSlide2Svg(data);
    case 3: return buildSlide3Svg(data);
    case 4: return buildSlide4Svg(data);
    case 5: return buildSlide5Svg(data);
  }
}
