import React from "react";
import { TemplateConfig } from "./types";

interface TemplateProps {
  template: TemplateConfig;
  textLines: string[];
  fontSize: number;
  lineHeight: number;
}

// Original Migbirds logo (icon squares + wordmark as SVG paths, extracted from original templates)
// The original logo is positioned at absolute coordinates with the text starting at x=50, y=501
// and the icon squares at x=193.607, y=486. We use a translate to reposition.
function MigbirdsOriginalLogo({ x, y, textColor }: { x: number; y: number; textColor: string }) {
  // The original logo's top-left is at (50, 486) in the source SVGs.
  // We translate so that (50, 486) maps to (x, y).
  const tx = x - 50;
  const ty = y - 486;
  return (
    <g transform={`translate(${tx}, ${ty})`}>
      {/* Icon squares (L-shaped paths) */}
      <path d="M193.607 486V490.373H200.142V496.907H204.515V486H193.607Z" fill="#FF72D0" />
      <path d="M208.012 486V490.373H214.55V496.907H218.922V486H208.012Z" fill="#0A57FF" />
      <path d="M208.012 500.405V504.778H214.55V511.316H218.922V500.405H208.012Z" fill="#FFB300" />
      {/* "migbirds" text paths */}
      <path d="M54.7714 501.367V503.753H55.1562C55.8873 502.291 57.388 501.06 60.1585 501.06C62.929 501.06 64.5067 502.252 65.3917 504.061H65.7765C66.7 502.445 68.1237 501.06 71.2406 501.06C74.7807 501.06 77.6281 503.291 77.6281 507.909V520.453H72.7797V508.14C72.7797 506.062 71.6254 504.984 69.7014 504.984C67.4696 504.984 66.2383 506.447 66.2383 509.063V520.453H61.3899V508.14C61.3899 506.062 60.2355 504.984 58.3115 504.984C56.0797 504.984 54.8484 506.447 54.8484 509.063V520.453H50V501.367H54.7714Z" fill={textColor} />
      <path d="M87.1316 501.364H82.2832V520.449H87.1316V501.364Z" fill={textColor} />
      <path d="M106.18 501.364V503.942H105.795C104.641 502.287 102.794 500.825 99.4846 500.825C94.944 500.825 90.8652 504.673 90.8652 510.599C90.8652 516.525 94.944 520.373 99.4846 520.373C102.794 520.373 104.641 518.872 105.718 517.371H106.103V519.218C106.103 522.912 103.948 524.605 100.793 524.605C97.6376 524.605 96.1789 523.066 95.4688 521.023L91.1871 523.038C92.3239 525.802 95.2379 528.684 100.87 528.684C106.95 528.684 110.951 525.49 110.951 519.334V501.364H106.18ZM100.947 516.22C97.9454 516.22 95.7136 514.066 95.7136 510.602C95.7136 507.139 97.9454 504.984 100.947 504.984C103.948 504.984 106.18 507.139 106.18 510.602C106.18 514.066 103.948 516.22 100.947 516.22Z" fill={textColor} />
      <path d="M120.495 493.563V503.83H120.88C121.957 502.291 123.804 500.829 127.113 500.829C131.654 500.829 135.733 504.677 135.733 510.91C135.733 517.144 131.654 520.992 127.113 520.992C123.804 520.992 121.957 519.53 120.803 517.875H120.418V520.453H115.646V493.563H120.495ZM120.418 510.91C120.418 514.681 122.65 516.836 125.651 516.836C128.652 516.836 130.884 514.681 130.884 510.91C130.884 507.139 128.652 504.984 125.651 504.984C122.65 504.984 120.418 507.139 120.418 510.91Z" fill={textColor} />
      <path d="M144.313 501.364H139.465V520.449H144.313V501.364Z" fill={textColor} />
      <path d="M153.967 504.061H154.352C155.083 502.022 156.699 501.291 159.123 501.291H161.124V505.369H158.276C155.814 505.369 154.044 506.678 154.044 509.371V520.453H149.195V501.367H153.967V504.061Z" fill={textColor} />
      <path d="M182.52 520.453H177.748V517.875H177.364C176.209 519.53 174.362 520.992 171.053 520.992C166.512 520.992 162.434 517.144 162.434 510.91C162.434 504.677 166.512 500.829 171.053 500.829C174.362 500.829 176.209 502.291 177.287 503.83H177.671V493.563H182.52V520.453ZM167.282 510.91C167.282 514.681 169.514 516.836 172.515 516.836C175.517 516.836 177.748 514.681 177.748 510.91C177.748 507.139 175.517 504.984 172.515 504.984C169.514 504.984 167.282 507.139 167.282 510.91Z" fill={textColor} />
      <path d="M194.256 500.829C198.527 500.829 201.336 502.945 202.26 506.023L197.873 507.37C197.411 505.292 196.103 504.523 194.256 504.523C192.409 504.523 191.409 505.254 191.409 506.408C191.409 507.678 192.486 508.217 194.487 508.601L195.487 508.794C199.797 509.64 203.029 510.718 203.029 514.72C203.029 518.721 199.874 520.992 195.026 520.992C190.177 520.992 186.676 518.76 186.021 514.758L190.485 513.604C190.985 516.374 192.794 517.298 195.026 517.298C197.257 517.298 198.335 516.336 198.335 515.104C198.335 513.873 197.257 513.296 194.872 512.834L193.871 512.642C189.869 511.872 186.714 510.487 186.714 506.716C186.714 502.945 189.715 500.829 194.256 500.829Z" fill={textColor} />
      {/* Dots for "i" letters */}
      <path d="M87.4723 496.327C87.4723 497.852 86.234 499.09 84.7088 499.09C83.1836 499.09 81.9453 497.852 81.9453 496.327C81.9453 494.801 83.1836 493.563 84.7088 493.563C86.234 493.563 87.4723 494.801 87.4723 496.327Z" fill={textColor} />
      <path d="M144.652 496.327C144.652 497.852 143.414 499.09 141.889 499.09C140.363 499.09 139.125 497.852 139.125 496.327C139.125 494.801 140.363 493.563 141.889 493.563C143.414 493.563 144.652 494.801 144.652 496.327Z" fill={textColor} />
    </g>
  );
}

function wrapText(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if (currentLine.length + word.length + 1 <= maxCharsPerLine) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// Gradient blur background for light theme
function LightGradientBg({ width, height, seed }: { width: number; height: number; seed: string }) {
  const filterId1 = `blur1_${seed}`;
  const filterId2 = `blur2_${seed}`;
  const gradId1 = `grad1_${seed}`;
  const gradId2 = `grad2_${seed}`;

  return (
    <>
      <defs>
        <filter id={filterId1} x="-50%" y="-50%" width="200%" height="200%"
          colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="150" />
        </filter>
        <filter id={filterId2} x="-50%" y="-50%" width="200%" height="200%"
          colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="100" />
        </filter>
        <radialGradient id={gradId1} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.21" stopColor="#974DFF" />
          <stop offset="0.72" stopColor="#FF72D0" />
          <stop offset="1" stopColor="#FFB300" />
        </radialGradient>
        <linearGradient id={gradId2} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.14" stopColor="#40FFC7" />
          <stop offset="0.53" stopColor="#61D8FF" />
          <stop offset="1" stopColor="#0A57FF" />
        </linearGradient>
      </defs>
      <ellipse
        cx={width * 0.75}
        cy={height * 0.55}
        rx={width * 0.35}
        ry={height * 0.45}
        fill={`url(#${gradId1})`}
        filter={`url(#${filterId1})`}
      />
      <ellipse
        cx={width * 0.15}
        cy={height * 0.05}
        rx={width * 0.25}
        ry={height * 0.2}
        fill={`url(#${gradId2})`}
        filter={`url(#${filterId2})`}
      />
    </>
  );
}

// Gradient blur background for dark theme
// Matches original SVGs: large radial blob (purple→pink→orange) on right side,
// small linear blob (green→blue) on left/top
function DarkGradientBg({ width, height, seed }: { width: number; height: number; seed: string }) {
  const isLinkedin = width > 700;
  const filterId1 = `blur1d_${seed}`;
  const filterId2 = `blur2d_${seed}`;
  const gradId1 = `grad1d_${seed}`;
  const gradId2 = `grad2d_${seed}`;

  return (
    <>
      <defs>
        {/* Large radial blob uses higher blur (200 in original) */}
        <filter id={filterId1} x="-80%" y="-80%" width="260%" height="260%"
          colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="200" />
        </filter>
        {/* Small linear blob uses lower blur (101 in original) */}
        <filter id={filterId2} x="-80%" y="-80%" width="260%" height="260%"
          colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="101" />
        </filter>
        <radialGradient id={gradId1} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.21" stopColor="#974DFF" />
          <stop offset="0.72" stopColor="#FF72D0" />
          <stop offset="1" stopColor="#FFB300" />
        </radialGradient>
        <linearGradient id={gradId2} x1="0" y1="0.5" x2="1" y2="0.3">
          <stop offset="0.15" stopColor="#00DB9D" />
          <stop offset="1" stopColor="#0A57FF" />
        </linearGradient>
      </defs>
      {/* Large radial blob - positioned on the right side */}
      <ellipse
        cx={isLinkedin ? width * 0.85 : width * 0.85}
        cy={isLinkedin ? height * 0.2 : height * 0.15}
        rx={width * 0.55}
        ry={height * 0.65}
        fill={`url(#${gradId1})`}
        filter={`url(#${filterId1})`}
      />
      {/* Small linear blob - positioned on the left/top */}
      <ellipse
        cx={isLinkedin ? width * 0.05 : width * 0.05}
        cy={isLinkedin ? height * 0.05 : height * 0.0}
        rx={width * 0.3}
        ry={height * 0.3}
        fill={`url(#${gradId2})`}
        filter={`url(#${filterId2})`}
      />
    </>
  );
}

// Decorative elements
function DecoElements({ width, height, variant }: { width: number; height: number; variant: string }) {
  const isLinkedin = width > 700;
  return (
    <>
      {/* Small diamond */}
      <rect
        x={isLinkedin ? width * 0.18 : width * 0.72}
        y={height * 0.07}
        width="8"
        height="8"
        rx="1"
        transform={`rotate(45 ${isLinkedin ? width * 0.18 : width * 0.72} ${height * 0.07})`}
        fill="#974DFF"
      />
      {/* Small circle bottom */}
      <circle
        cx={isLinkedin ? width * 0.81 : width * 0.11}
        cy={height * 0.92}
        r={isLinkedin ? 5.5 : 4.5}
        fill={variant === "dark" ? "#F7F5F3" : "#974DFF"}
      />
      {/* Additional decorations for certain variants */}
      {variant === "poll" && (
        <>
          <circle
            cx={isLinkedin ? width * 0.92 : width * 0.94}
            cy={height * 0.63}
            r={4.5}
            fill="#FFB300"
          />
          <rect
            x={isLinkedin ? width * 0.79 : width * 0.09}
            y={height * 0.91}
            width="8"
            height="8"
            rx="1"
            transform={`rotate(45 ${isLinkedin ? width * 0.79 : width * 0.09} ${height * 0.91})`}
            fill="#FF72D0"
          />
        </>
      )}
    </>
  );
}

// Quote icon (for insightful posts)
function QuoteIcon({ cx, cy, size, bgColor }: { cx: number; cy: number; size: number; bgColor: string }) {
  const r = size / 2;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#0A57FF" />
      <rect x={cx - r * 0.5} y={cy - r * 0.5} width={r * 1.0} height={r * 0.94} rx={r * 0.09} fill={bgColor} />
      <path
        d={`M${cx - r * 0.42} ${cy + r * 0.6}V${cy + r * 0.15}C${cx - r * 0.42} ${cy + r * 0.07} ${cx - r * 0.35} ${cy} ${cx - r * 0.27} ${cy}H${cx + r * 0.13}C${cx + r * 0.25} ${cy} ${cx + r * 0.28} ${cy + r * 0.17} ${cx + r * 0.18} ${cy + r * 0.27}L${cx - r * 0.12} ${cy + r * 0.65}C${cx - r * 0.22} ${cy + r * 0.72} ${cx - r * 0.42} ${cy + r * 0.65} ${cx - r * 0.42} ${cy + r * 0.6}Z`}
        fill={bgColor}
      />
      <text
        x={cx}
        y={cy - r * 0.12}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Georgia, serif"
        fontWeight="bold"
        fontSize={size * 0.42}
        fill="#0A0632"
      >
        {"\u201C\u201D"}
      </text>
    </g>
  );
}

// Profile/document icon for dark insightful templates (extracted from original SVGs)
function DarkProfileIcon({ cx, cy, size }: { cx: number; cy: number; size: number }) {
  const r = size / 2;
  // Scale factor from original icon (radius 23.5 for square, 37.5 for linkedin)
  const s = r / 23.5;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#974DFF" />
      {/* White document/paper shape */}
      <rect
        x={cx - 11 * s}
        y={cy - 13.2 * s}
        width={22 * s}
        height={27.9 * s}
        rx={2.2 * s}
        fill="#F7F5F3"
      />
      {/* Decorative lines (pink diagonals, purple horizontal bars) via mask */}
      <g opacity={0.85}>
        <rect
          x={cx + 4.5 * s}
          y={cy - 13.5 * s}
          width={1.5 * s}
          height={9.6 * s}
          rx={0.73 * s}
          transform={`rotate(-45 ${cx + 4.5 * s} ${cy - 13.5 * s})`}
          fill="#FF72D0"
        />
        <rect
          x={cx - 4.8 * s}
          y={cy + 4 * s}
          width={1.47 * s}
          height={9.55 * s}
          rx={0.73 * s}
          transform={`rotate(-90 ${cx - 4.8 * s} ${cy + 4 * s})`}
          fill="#974DFF"
        />
        <rect
          x={cx - 3.7 * s}
          y={cy + 6.6 * s}
          width={1.47 * s}
          height={7.34 * s}
          rx={0.73 * s}
          transform={`rotate(-90 ${cx - 3.7 * s} ${cy + 6.6 * s})`}
          fill="#974DFF"
        />
        <rect
          x={cx + 12.5 * s}
          y={cy + 8.5 * s}
          width={1.49 * s}
          height={9.6 * s}
          rx={0.73 * s}
          transform={`rotate(-135 ${cx + 12.5 * s} ${cy + 8.5 * s})`}
          fill="#FF72D0"
        />
      </g>
      {/* Person silhouette: head circle */}
      <circle cx={cx} cy={cy - 5.9 * s} r={1.84 * s} fill="#974DFF" />
      {/* Person silhouette: body */}
      <path
        d={`M${cx - 3.3 * s} ${cy - 0.73 * s}C${cx - 3.3 * s} ${cy - 2.56 * s} ${cx - 1.82 * s} ${cy - 4.04 * s} ${cx} ${cy - 4.04 * s}C${cx + 1.82 * s} ${cy - 4.04 * s} ${cx + 3.3 * s} ${cy - 2.56 * s} ${cx + 3.3 * s} ${cy - 0.73 * s}V${cy - 0.19 * s}C${cx + 3.3 * s} ${cy - 0.09 * s} ${cx + 3.22 * s} ${cy} ${cx + 3.11 * s} ${cy}H${cx - 3.11 * s}C${cx - 3.22 * s} ${cy} ${cx - 3.3 * s} ${cy - 0.09 * s} ${cx - 3.3 * s} ${cy - 0.19 * s}V${cy - 0.73 * s}Z`}
        fill="#974DFF"
      />
    </g>
  );
}

// Question mark icon (for poll posts)
function QuestionIcon({ cx, cy, size, bgColor }: { cx: number; cy: number; size: number; bgColor: string }) {
  const r = size / 2;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#FFB300" />
      {/* Background paper shape */}
      <rect
        x={cx - r * 0.42}
        y={cy - r * 0.55}
        width={r * 0.65}
        height={r * 0.6}
        rx={r * 0.08}
        fill={bgColor}
      />
      {/* Folded corner */}
      <path
        d={`M${cx - r * 0.42} ${cy + r * 0.42}V${cy + r * 0.05}C${cx - r * 0.42} ${cy - r * 0.03} ${cx - r * 0.35} ${cy - r * 0.1} ${cx - r * 0.28} ${cy - r * 0.1}H${cx + r * 0.05}C${cx + r * 0.18} ${cy - r * 0.1} ${cx + r * 0.22} ${cy + r * 0.06} ${cx + r * 0.12} ${cy + r * 0.15}L${cx - r * 0.2} ${cy + r * 0.48}C${cx - r * 0.3} ${cy + r * 0.55} ${cx - r * 0.42} ${cy + r * 0.47} ${cx - r * 0.42} ${cy + r * 0.42}Z`}
        fill={bgColor}
      />
      {/* Yellow background rect */}
      <rect
        x={cx + r * 0.05}
        y={cy - r * 0.2}
        width={r * 0.5}
        height={r * 0.47}
        rx={r * 0.07}
        fill="#FFDF61"
      />
      {/* Question mark */}
      <text
        x={cx}
        y={cy - r * 0.1}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="bold"
        fontSize={size * 0.38}
        fill="#0A0632"
      >
        ?
      </text>
    </g>
  );
}

// Tag pill (e.g. "INSIGHT", "QUIZ")
function TagPill({ x, y, label, bgColor, strokeColor }: { x: number; y: number; label: string; bgColor: string; strokeColor: string }) {
  const labelWidth = label.length * 9 + 28;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={labelWidth}
        height="45"
        rx="15"
        fill={bgColor}
        stroke={strokeColor}
        strokeWidth="1"
      />
      <text
        x={x + labelWidth / 2}
        y={y + 27}
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="bold"
        fontSize="13"
        fill={strokeColor}
        letterSpacing="0.5"
      >
        {label}
      </text>
    </g>
  );
}

// Photo frame for dark insightful templates (two overlapping rounded photos)
function DarkPhotoFrame({ width, height, seed }: { width: number; height: number; seed: string }) {
  const isLinkedin = width > 700;

  // Positions from original SVG templates
  const frame = isLinkedin
    ? { x: 833, y: 192, w: 240, h: 285 }
    : { x: 139, y: 333, w: 180, h: 198 };

  const photo1 = isLinkedin
    ? { maskX: 756, maskY: 289.802, maskW: 233.866, maskH: 251.856, imgX: 541.922, imgY: 215.145, imgW: 623.508, imgH: 429.839 }
    : { maskX: 63, maskY: 355, maskW: 155, maskH: 155, imgX: -71.3691, imgY: 304.061, imgW: 398.212, imgH: 274.523 };

  const photo2 = isLinkedin
    ? { maskW: 233.866, maskH: 233.866, originX: 1149.97, originY: 118, imgX: 542.734, imgY: 21.9648, imgW: 992.005, imgH: 724.05 }
    : { maskW: 155, maskH: 155, originX: 392.713, originY: 355, imgX: -9.75, imgY: 291.35, imgW: 657.474, imgH: 479.881 };

  const maskId1 = `photomask1_${seed}`;
  const maskId2 = `photomask2_${seed}`;
  const clipId1 = `photoclip1_${seed}`;
  const clipId2 = `photoclip2_${seed}`;

  return (
    <>
      {/* Outer stroked frame */}
      <rect x={frame.x} y={frame.y} width={frame.w} height={frame.h} rx={20} stroke="#F7F5F3" fill="none" />

      {/* Photo 1 (left) */}
      <defs>
        <clipPath id={clipId1}>
          <rect x={photo1.maskX} y={photo1.maskY} width={photo1.maskW} height={photo1.maskH} rx={20} />
        </clipPath>
        <clipPath id={clipId2}>
          <rect width={photo2.maskW} height={photo2.maskH} rx={20} transform={`matrix(-1 0 0 1 ${photo2.originX} ${photo2.originY})`} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId1})`}>
        <image
          href="/templates/photo1.jpg"
          x={photo1.imgX}
          y={photo1.imgY}
          width={photo1.imgW}
          height={photo1.imgH}
          preserveAspectRatio="xMidYMid slice"
        />
      </g>

      {/* Photo 2 (right, mirrored) */}
      <g clipPath={`url(#${clipId2})`}>
        <image
          href="/templates/photo2.jpg"
          x={photo2.imgX}
          y={photo2.imgY}
          width={photo2.imgW}
          height={photo2.imgH}
          preserveAspectRatio="xMidYMid slice"
        />
      </g>
    </>
  );
}

// Photo frame for light insightful wide template (single rounded photo on the right)
function LightPhotoFrame({ seed }: { seed: string }) {
  const clipId = `lightphotoclip_${seed}`;
  // From original SVG: mask at x=784, y=110, w=352.757, h=407, rx=40
  // Photo rect: w=558, h=570, matrix(-1 0 0 1 1162 96) → effective x=604, y=96
  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <rect x={784} y={110} width={352.757} height={407} rx={40} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <image
          href="/templates/photo_light.jpg"
          x={604}
          y={96}
          width={558}
          height={570}
          preserveAspectRatio="xMidYMid slice"
        />
      </g>
    </>
  );
}

// Content frame (the rounded rectangle border)
function ContentFrame({ x, y, width, height, bgColor, strokeColor, filled }: {
  x: number; y: number; width: number; height: number;
  bgColor: string; strokeColor: string; filled: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx="29.64"
      fill={filled ? bgColor : "none"}
      stroke={strokeColor}
      strokeWidth="1"
    />
  );
}

function calcMaxChars(fontSize: number, textAreaWidth: number): number {
  const avgCharWidth = fontSize * 0.62;
  return Math.floor(textAreaWidth / avgCharWidth);
}

function calcTextLayout(template: TemplateConfig, text: string) {
  const isLinkedin = template.format === "linkedin";
  const isDarkSquareInsightful = template.colorVariant === "dark" && template.postType === "insightful" && !isLinkedin;
  const maxFontSize = isLinkedin ? 42 : (isDarkSquareInsightful ? 42 : 34);
  const minFontSize = isLinkedin ? 18 : 14;

  // Dark square insightful: use expanded text area using full frame width and top space
  const textAreaY = isDarkSquareInsightful ? 80 : template.textArea.y;
  const textAreaHeight = isDarkSquareInsightful ? 240 : template.textArea.height;
  const textAreaWidth = isDarkSquareInsightful ? 490 : template.textArea.width;

  let fontSize = maxFontSize;
  let maxChars = calcMaxChars(fontSize, textAreaWidth);
  let wrappedLines = wrapText(text || "Your text here...", maxChars);
  const maxLines = Math.floor(textAreaHeight / (maxFontSize * 1.35));

  while (wrappedLines.length > maxLines && fontSize > minFontSize) {
    fontSize -= 2;
    maxChars = calcMaxChars(fontSize, textAreaWidth);
    wrappedLines = wrapText(text || "Your text here...", maxChars);
  }

  const lineHeight = fontSize * 1.35;
  const totalTextHeight = wrappedLines.length * lineHeight;
  const textStartY = textAreaY + (textAreaHeight - totalTextHeight) / 2 + fontSize;

  return { fontSize, wrappedLines, lineHeight, textStartY };
}

// Cache for base64-encoded photo data (loaded on first export)
let darkPhotoCache: { photo1: string; photo2: string } | null = null;
let lightPhotoCache: string | null = null;

const toDataUrl = (blob: Blob): Promise<string> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });

async function loadDarkPhotos(): Promise<{ photo1: string; photo2: string }> {
  if (darkPhotoCache) return darkPhotoCache;
  const [res1, res2] = await Promise.all([
    fetch("/templates/photo1.jpg"),
    fetch("/templates/photo2.jpg"),
  ]);
  const [blob1, blob2] = await Promise.all([res1.blob(), res2.blob()]);
  const [data1, data2] = await Promise.all([toDataUrl(blob1), toDataUrl(blob2)]);
  darkPhotoCache = { photo1: data1, photo2: data2 };
  return darkPhotoCache;
}

async function loadLightPhoto(): Promise<string> {
  if (lightPhotoCache) return lightPhotoCache;
  const res = await fetch("/templates/photo_light.jpg");
  const blob = await res.blob();
  lightPhotoCache = await toDataUrl(blob);
  return lightPhotoCache;
}

export async function renderCardSvg(template: TemplateConfig, text: string): Promise<string> {
  const { fontSize, wrappedLines, lineHeight, textStartY } = calcTextLayout(template, text);
  let darkPhotoData: { photo1: string; photo2: string } | undefined;
  let lightPhotoData: string | undefined;
  if (template.colorVariant === "dark" && template.postType === "insightful") {
    darkPhotoData = await loadDarkPhotos();
  }
  if (template.colorVariant === "light" && template.postType === "insightful" && template.format === "linkedin") {
    lightPhotoData = await loadLightPhoto();
  }
  return buildSvgString(template, wrappedLines, fontSize, lineHeight, textStartY, darkPhotoData, lightPhotoData);
}

function buildSvgString(
  template: TemplateConfig,
  lines: string[],
  fontSize: number,
  lineHeight: number,
  textStartY: number,
  darkPhotoData?: { photo1: string; photo2: string },
  lightPhotoData?: string
): string {
  const { width, height, textColor, bgColor, tagLabel, postType, colorVariant } = template;
  const isLinkedin = width > 700;
  const isDark = colorVariant === "dark";

  // Frame position
  const frameX = isLinkedin ? -56 : -63;
  const frameWidth = isLinkedin ? 1005 : 640;

  const isDarkInsightful = isDark && postType === "insightful";

  // Icon position - dark insightful uses positions from original SVGs
  let iconSize: number;
  let iconCx: number;
  let iconCy: number;

  if (isDarkInsightful) {
    if (isLinkedin) {
      iconSize = 75;
      iconCx = 1072.5;
      iconCy = 415.5;
    } else {
      iconSize = 47;
      iconCx = 225.5;
      iconCy = 533.5;
    }
  } else {
    iconSize = 128;
    iconCx = isLinkedin ? width * 0.79 : width * 0.78;
    iconCy = isLinkedin ? height * 0.28 : height * 0.54;
  }

  // Build gradient defs
  const gradientBg = isDark ? `
    <defs>
      <filter id="blur1" x="-80%" y="-80%" width="260%" height="260%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="200"/>
      </filter>
      <filter id="blur2" x="-80%" y="-80%" width="260%" height="260%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="101"/>
      </filter>
      <radialGradient id="grad1" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0.21" stop-color="#974DFF"/>
        <stop offset="0.72" stop-color="#FF72D0"/>
        <stop offset="1" stop-color="#FFB300"/>
      </radialGradient>
      <linearGradient id="grad2" x1="0" y1="0.5" x2="1" y2="0.3">
        <stop offset="0.15" stop-color="#00DB9D"/>
        <stop offset="1" stop-color="#0A57FF"/>
      </linearGradient>
    </defs>
    <ellipse cx="${isLinkedin ? width * 0.85 : width * 0.85}" cy="${isLinkedin ? height * 0.2 : height * 0.15}" rx="${width * 0.55}" ry="${height * 0.65}" fill="url(#grad1)" filter="url(#blur1)"/>
    <ellipse cx="${isLinkedin ? width * 0.05 : width * 0.05}" cy="${isLinkedin ? height * 0.05 : height * 0.0}" rx="${width * 0.3}" ry="${height * 0.3}" fill="url(#grad2)" filter="url(#blur2)"/>
  ` : `
    <defs>
      <filter id="blur1" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="150"/>
      </filter>
      <filter id="blur2" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="100"/>
      </filter>
      <radialGradient id="grad1" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0.21" stop-color="#974DFF"/>
        <stop offset="0.72" stop-color="#FF72D0"/>
        <stop offset="1" stop-color="#FFB300"/>
      </radialGradient>
      <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0.14" stop-color="#40FFC7"/>
        <stop offset="0.53" stop-color="#61D8FF"/>
        <stop offset="1" stop-color="#0A57FF"/>
      </linearGradient>
    </defs>
    <ellipse cx="${width * 0.75}" cy="${height * 0.55}" rx="${width * 0.35}" ry="${height * 0.45}" fill="url(#grad1)" filter="url(#blur1)"/>
    <ellipse cx="${width * 0.15}" cy="${height * 0.05}" rx="${width * 0.25}" ry="${height * 0.2}" fill="url(#grad2)" filter="url(#blur2)"/>
  `;

  // Icon
  const iconFill = "#F7F5F3";
  const r = iconSize / 2;
  const s = r / 23.5; // scale factor for dark profile icon

  let iconSvg: string;
  if (postType === "poll") {
    iconSvg = `
    <circle cx="${iconCx}" cy="${iconCy}" r="${r}" fill="#FFB300"/>
    <rect x="${iconCx - iconSize * 0.33}" y="${iconCy - iconSize * 0.22}" width="${iconSize * 0.49}" height="${iconSize * 0.46}" rx="${iconSize * 0.05}" fill="#FFDF61"/>
    <rect x="${iconCx - iconSize * 0.23}" y="${iconCy - iconSize * 0.35}" width="${iconSize * 0.46}" height="${iconSize * 0.43}" rx="${iconSize * 0.05}" fill="${iconFill}"/>
    <path d="${iconCx - iconSize * 0.23} ${iconCy + iconSize * 0.2}V${iconCy - iconSize * 0.05}C${iconCx - iconSize * 0.23} ${iconCy - iconSize * 0.13} ${iconCx - iconSize * 0.16} ${iconCy - iconSize * 0.2} ${iconCx - iconSize * 0.08} ${iconCy - iconSize * 0.2}H${iconCx + iconSize * 0.08}C${iconCx + iconSize * 0.18} ${iconCy - iconSize * 0.2} ${iconCx + iconSize * 0.2} ${iconCy - iconSize * 0.04} ${iconCx + iconSize * 0.12} ${iconCy + iconSize * 0.04}L${iconCx - iconSize * 0.08} ${iconCy + iconSize * 0.23}C${iconCx - iconSize * 0.16} ${iconCy + iconSize * 0.3} ${iconCx - iconSize * 0.23} ${iconCy + iconSize * 0.25} ${iconCx - iconSize * 0.23} ${iconCy + iconSize * 0.2}Z" fill="${iconFill}"/>
    <text x="${iconCx}" y="${iconCy - iconSize * 0.05}" text-anchor="middle" dominant-baseline="central" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="${iconSize * 0.38}" fill="#0A0632">?</text>
    `;
  } else if (isDarkInsightful) {
    // Profile/document icon from original dark SVGs
    iconSvg = `
    <circle cx="${iconCx}" cy="${iconCy}" r="${r}" fill="#974DFF"/>
    <rect x="${iconCx - 11 * s}" y="${iconCy - 13.2 * s}" width="${22 * s}" height="${27.9 * s}" rx="${2.2 * s}" fill="#F7F5F3"/>
    <g opacity="0.85">
      <rect x="${iconCx + 4.5 * s}" y="${iconCy - 13.5 * s}" width="${1.5 * s}" height="${9.6 * s}" rx="${0.73 * s}" transform="rotate(-45 ${iconCx + 4.5 * s} ${iconCy - 13.5 * s})" fill="#FF72D0"/>
      <rect x="${iconCx - 4.8 * s}" y="${iconCy + 4 * s}" width="${1.47 * s}" height="${9.55 * s}" rx="${0.73 * s}" transform="rotate(-90 ${iconCx - 4.8 * s} ${iconCy + 4 * s})" fill="#974DFF"/>
      <rect x="${iconCx - 3.7 * s}" y="${iconCy + 6.6 * s}" width="${1.47 * s}" height="${7.34 * s}" rx="${0.73 * s}" transform="rotate(-90 ${iconCx - 3.7 * s} ${iconCy + 6.6 * s})" fill="#974DFF"/>
      <rect x="${iconCx + 12.5 * s}" y="${iconCy + 8.5 * s}" width="${1.49 * s}" height="${9.6 * s}" rx="${0.73 * s}" transform="rotate(-135 ${iconCx + 12.5 * s} ${iconCy + 8.5 * s})" fill="#FF72D0"/>
    </g>
    <circle cx="${iconCx}" cy="${iconCy - 5.9 * s}" r="${1.84 * s}" fill="#974DFF"/>
    <path d="M${iconCx - 3.3 * s} ${iconCy - 0.73 * s}C${iconCx - 3.3 * s} ${iconCy - 2.56 * s} ${iconCx - 1.82 * s} ${iconCy - 4.04 * s} ${iconCx} ${iconCy - 4.04 * s}C${iconCx + 1.82 * s} ${iconCy - 4.04 * s} ${iconCx + 3.3 * s} ${iconCy - 2.56 * s} ${iconCx + 3.3 * s} ${iconCy - 0.73 * s}V${iconCy - 0.19 * s}C${iconCx + 3.3 * s} ${iconCy - 0.09 * s} ${iconCx + 3.22 * s} ${iconCy}H${iconCx - 3.11 * s}C${iconCx - 3.22 * s} ${iconCy} ${iconCx - 3.3 * s} ${iconCy - 0.09 * s} ${iconCx - 3.3 * s} ${iconCy - 0.19 * s}V${iconCy - 0.73 * s}Z" fill="#974DFF"/>
    `;
  } else if (!isLinkedin || postType !== "insightful") {
    // Quote icon for light insightful square (not shown on light wide — photo replaces it)
    iconSvg = `
    <circle cx="${iconCx}" cy="${iconCy}" r="${r}" fill="#0A57FF"/>
    <rect x="${iconCx - iconSize * 0.26}" y="${iconCy - iconSize * 0.26}" width="${iconSize * 0.52}" height="${iconSize * 0.48}" rx="${iconSize * 0.05}" fill="${iconFill}"/>
    <path d="M${iconCx - iconSize * 0.19} ${iconCy + iconSize * 0.32}V${iconCy + iconSize * 0.05}C${iconCx - iconSize * 0.19} ${iconCy - iconSize * 0.03} ${iconCx - iconSize * 0.12} ${iconCy - iconSize * 0.1} ${iconCx - iconSize * 0.05} ${iconCy - iconSize * 0.1}H${iconCx + iconSize * 0.14}C${iconCx + iconSize * 0.26} ${iconCy - iconSize * 0.1} ${iconCx + iconSize * 0.32} ${iconCy + iconSize * 0.07} ${iconCx + iconSize * 0.22} ${iconCy + iconSize * 0.17}L${iconCx - iconSize * 0.02} ${iconCy + iconSize * 0.38}C${iconCx - iconSize * 0.12} ${iconCy + iconSize * 0.46} ${iconCx - iconSize * 0.19} ${iconCy + iconSize * 0.38} ${iconCx - iconSize * 0.19} ${iconCy + iconSize * 0.32}Z" fill="${iconFill}"/>
    <text x="${iconCx}" y="${iconCy - iconSize * 0.12}" text-anchor="middle" dominant-baseline="central" font-family="Georgia, serif" font-weight="bold" font-size="${iconSize * 0.35}" fill="#0A0632">\u201C\u201D</text>
    `;
  } else {
    iconSvg = "";
  }

  // Tag pill dimensions
  const tagWidth = tagLabel.length * 9 + 28;

  // Decorative elements
  const decoElements = `
    <rect x="${isLinkedin ? width * 0.18 : width * 0.72}" y="${height * 0.07}" width="8" height="8" rx="1" transform="rotate(45 ${isLinkedin ? width * 0.18 : width * 0.72} ${height * 0.07})" fill="#974DFF"/>
    <circle cx="${isLinkedin ? width * 0.81 : width * 0.11}" cy="${height * 0.92}" r="${isLinkedin ? 5.5 : 4.5}" fill="${isDark ? '#F7F5F3' : '#974DFF'}"/>
    ${postType === "poll" ? `
      <circle cx="${isLinkedin ? width * 0.92 : width * 0.94}" cy="${height * 0.63}" r="4.5" fill="#FFB300"/>
      <rect x="${isLinkedin ? width * 0.79 : width * 0.09}" y="${height * 0.91}" width="8" height="8" rx="1" transform="rotate(45 ${isLinkedin ? width * 0.79 : width * 0.09} ${height * 0.91})" fill="#FF72D0"/>
    ` : ""}
  `;

  // Text lines
  const textSvg = lines.map((line, i) => {
    const escaped = line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<text x="${template.textArea.x}" y="${textStartY + i * lineHeight}" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="${fontSize}" fill="${textColor}">${escaped}</text>`;
  }).join("\n    ");

  // Logo + brand (original SVG paths)
  // Dark square puts logo at bottom-right inside frame with padding, dark linkedin stays bottom-left
  const isDarkSquareInsightful = isDarkInsightful && !isLinkedin;
  const logoY = isDarkSquareInsightful ? 519 : height - 145;
  const logoBaseX = isDarkSquareInsightful ? 393 : template.textArea.x;
  const logoTx = logoBaseX - 50;
  const logoTy = logoY - 486;
  const logoSvg = `
    <g transform="translate(${logoTx}, ${logoTy})">
      <path d="M193.607 486V490.373H200.142V496.907H204.515V486H193.607Z" fill="#FF72D0"/>
      <path d="M208.012 486V490.373H214.55V496.907H218.922V486H208.012Z" fill="#0A57FF"/>
      <path d="M208.012 500.405V504.778H214.55V511.316H218.922V500.405H208.012Z" fill="#FFB300"/>
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
    </g>
  `;

  // Photo frame for dark insightful templates
  let photoFrameSvg = "";
  if (isDark && postType === "insightful" && darkPhotoData) {
    const frame = isLinkedin
      ? { x: 833, y: 192, w: 240, h: 285 }
      : { x: 139, y: 333, w: 180, h: 198 };
    const p1 = isLinkedin
      ? { maskX: 756, maskY: 289.802, maskW: 233.866, maskH: 251.856, imgX: 541.922, imgY: 215.145, imgW: 623.508, imgH: 429.839 }
      : { maskX: 63, maskY: 355, maskW: 155, maskH: 155, imgX: -71.3691, imgY: 304.061, imgW: 398.212, imgH: 274.523 };
    const p2 = isLinkedin
      ? { maskW: 233.866, maskH: 233.866, originX: 1149.97, originY: 118, imgX: 542.734, imgY: 21.9648, imgW: 992.005, imgH: 724.05 }
      : { maskW: 155, maskH: 155, originX: 392.713, originY: 355, imgX: -9.75, imgY: 291.35, imgW: 657.474, imgH: 479.881 };
    photoFrameSvg = `
      <rect x="${frame.x}" y="${frame.y}" width="${frame.w}" height="${frame.h}" rx="20" stroke="#F7F5F3" fill="none"/>
      <defs>
        <clipPath id="photoclip1"><rect x="${p1.maskX}" y="${p1.maskY}" width="${p1.maskW}" height="${p1.maskH}" rx="20"/></clipPath>
        <clipPath id="photoclip2"><rect width="${p2.maskW}" height="${p2.maskH}" rx="20" transform="matrix(-1 0 0 1 ${p2.originX} ${p2.originY})"/></clipPath>
      </defs>
      <g clip-path="url(#photoclip1)">
        <image href="${darkPhotoData.photo1}" x="${p1.imgX}" y="${p1.imgY}" width="${p1.imgW}" height="${p1.imgH}" preserveAspectRatio="xMidYMid slice"/>
      </g>
      <g clip-path="url(#photoclip2)">
        <image href="${darkPhotoData.photo2}" x="${p2.imgX}" y="${p2.imgY}" width="${p2.imgW}" height="${p2.imgH}" preserveAspectRatio="xMidYMid slice"/>
      </g>
    `;
  }

  // Photo frame for light insightful wide template
  if (!isDark && postType === "insightful" && isLinkedin && lightPhotoData) {
    photoFrameSvg = `
      <defs>
        <clipPath id="lightphotoclip"><rect x="784" y="110" width="352.757" height="407" rx="40"/></clipPath>
      </defs>
      <g clip-path="url(#lightphotoclip)">
        <image href="${lightPhotoData}" x="604" y="96" width="558" height="570" preserveAspectRatio="xMidYMid slice"/>
      </g>
    `;
  }

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  ${gradientBg}
  <rect x="${frameX}" y="50" width="${frameWidth}" height="527" rx="29.64" fill="${isDark ? 'none' : bgColor}" stroke="${isDark ? bgColor : textColor}" stroke-width="1"/>
  <rect x="50.5" y="27.5" width="${tagWidth}" height="45" rx="14.5" fill="${bgColor}" stroke="${textColor}" stroke-width="1"/>
  <text x="${50.5 + tagWidth / 2}" y="54" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="13" fill="${textColor}" letter-spacing="0.5">${tagLabel}</text>
  ${textSvg}
  ${logoSvg}
  ${photoFrameSvg}
  ${iconSvg}
  ${decoElements}
</svg>`;
}

// React component for preview
export function CardPreview({ template, text }: { template: TemplateConfig; text: string }) {
  const isLinkedin = template.format === "linkedin";
  const isDark = template.colorVariant === "dark";
  const { width, height, textColor, bgColor, tagLabel, postType } = template;

  // Calculate text layout
  const { fontSize, wrappedLines, lineHeight, textStartY } = calcTextLayout(template, text);

  // Frame
  const frameX = isLinkedin ? -56 : -63;
  const frameWidth = isLinkedin ? 1005 : 640;

  // Tag pill dimensions
  const tagWidth = tagLabel.length * 9 + 28;

  // Logo position - dark square puts logo at bottom-right inside frame with padding, otherwise bottom-left
  const isDarkSquareInsightful = isDark && !isLinkedin && postType === "insightful";
  const logoY = isDarkSquareInsightful ? 519 : height - 145;
  const logoX = isDarkSquareInsightful ? 393 : template.textArea.x;

  // Icon position - dark insightful uses different icon position (from original SVGs)
  const isDarkInsightful = isDark && postType === "insightful";
  let iconSize: number;
  let iconCx: number;
  let iconCy: number;

  if (isDarkInsightful) {
    // Original dark template icon positions (between/below photos, not overlapping)
    if (isLinkedin) {
      iconSize = 75; // radius 37.5 in original
      iconCx = 1072.5;
      iconCy = 415.5;
    } else {
      iconSize = 47; // radius 23.5 in original
      iconCx = 225.5;
      iconCy = 533.5;
    }
  } else {
    iconSize = 128;
    iconCx = isLinkedin ? width * 0.79 : width * 0.78;
    iconCy = isLinkedin ? height * 0.28 : height * 0.54;
  }

  // Deterministic seed from template properties to avoid hydration mismatch
  const seed = `${template.id}_${width}_${height}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width={width} height={height} fill={bgColor} />

      {/* Gradient blurs */}
      {isDark ? (
        <DarkGradientBg width={width} height={height} seed={seed} />
      ) : (
        <LightGradientBg width={width} height={height} seed={seed} />
      )}

      {/* Content frame */}
      <ContentFrame
        x={frameX}
        y={50}
        width={frameWidth}
        height={527}
        bgColor={bgColor}
        strokeColor={isDark ? bgColor : textColor}
        filled={!isDark}
      />

      {/* Tag pill */}
      <TagPill
        x={50.5}
        y={27.5}
        label={tagLabel}
        bgColor={bgColor}
        strokeColor={textColor}
      />

      {/* User text */}
      {wrappedLines.map((line, i) => (
        <text
          key={i}
          x={template.textArea.x}
          y={textStartY + i * lineHeight}
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="bold"
          fontSize={fontSize}
          fill={textColor}
          opacity={text ? 1 : 0.3}
        >
          {line}
        </text>
      ))}

      {/* Migbirds logo (original paths) */}
      <MigbirdsOriginalLogo x={logoX} y={logoY} textColor={textColor} />

      {/* Photo frames - rendered before icon so icon appears on top */}
      {isDarkInsightful && (
        <DarkPhotoFrame width={width} height={height} seed={seed} />
      )}
      {!isDark && postType === "insightful" && isLinkedin && (
        <LightPhotoFrame seed={seed} />
      )}

      {/* Icon - rendered after photo frame so it's on top of any frame lines */}
      {/* No icon for light insightful wide (photo replaces it) */}
      {postType === "poll" ? (
        <QuestionIcon cx={iconCx} cy={iconCy} size={iconSize} bgColor="#F7F5F3" />
      ) : isDarkInsightful ? (
        <DarkProfileIcon cx={iconCx} cy={iconCy} size={iconSize} />
      ) : (!isLinkedin || postType !== "insightful") ? (
        <QuoteIcon cx={iconCx} cy={iconCy} size={iconSize} bgColor="#F7F5F3" />
      ) : null}

      {/* Decorative elements */}
      <DecoElements width={width} height={height} variant={isDark ? "dark" : postType} />
    </svg>
  );
}
