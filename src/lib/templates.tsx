import React from "react";
import { TemplateConfig } from "./types";

interface TemplateProps {
  template: TemplateConfig;
  textLines: string[];
  fontSize: number;
  lineHeight: number;
}

// Migbirds logo (3 colored squares)
function MigbirdsLogo({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect width="10.908" height="10.907" fill="#FF72D0" />
      <rect x="14.405" width="10.908" height="10.907" fill="#0A57FF" />
      <rect x="14.405" y="14.405" width="10.908" height="10.911" fill="#FFB300" />
    </g>
  );
}

// "migbirds" text as paths (simplified brand logotype)
function MigbirdsWordmark({ x, y, color, scale = 1 }: { x: number; y: number; color: string; scale?: number }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <text
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="16"
        fill={color}
        dominantBaseline="hanging"
      >
        migbirds
      </text>
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
function LightGradientBg({ width, height, seed }: { width: number; height: number; seed: number }) {
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
function DarkGradientBg({ width, height, seed }: { width: number; height: number; seed: number }) {
  const filterId1 = `blur1d_${seed}`;
  const filterId2 = `blur2d_${seed}`;
  const gradId1 = `grad1d_${seed}`;
  const gradId2 = `grad2d_${seed}`;

  return (
    <>
      <defs>
        <filter id={filterId1} x="-50%" y="-50%" width="200%" height="200%"
          colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="150" />
        </filter>
        <filter id={filterId2} x="-50%" y="-50%" width="200%" height="200%"
          colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="125" />
        </filter>
        <radialGradient id={gradId1} cx="0.5" cy="0.3" r="0.6">
          <stop offset="0.21" stopColor="#974DFF" />
          <stop offset="0.72" stopColor="#FF72D0" />
          <stop offset="1" stopColor="#FFDF61" />
        </radialGradient>
        <linearGradient id={gradId2} x1="0.2" y1="0.8" x2="0.8" y2="0.2">
          <stop offset="0.14" stopColor="#40FFC7" />
          <stop offset="0.53" stopColor="#61D8FF" />
          <stop offset="1" stopColor="#0A57FF" />
        </linearGradient>
      </defs>
      <ellipse
        cx={width * 0.7}
        cy={height * 0.15}
        rx={width * 0.4}
        ry={height * 0.3}
        fill={`url(#${gradId1})`}
        filter={`url(#${filterId1})`}
      />
      <ellipse
        cx={width * 0.25}
        cy={height * 0.75}
        rx={width * 0.45}
        ry={height * 0.35}
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
  const avgCharWidth = fontSize * 0.58;
  return Math.floor(textAreaWidth / avgCharWidth);
}

function calcTextLayout(template: TemplateConfig, text: string) {
  const isLinkedin = template.format === "linkedin";
  const maxFontSize = isLinkedin ? 42 : 34;
  const minFontSize = isLinkedin ? 18 : 14;

  let fontSize = maxFontSize;
  let maxChars = calcMaxChars(fontSize, template.textArea.width);
  let wrappedLines = wrapText(text || "Your text here...", maxChars);
  const maxLines = Math.floor(template.textArea.height / (maxFontSize * 1.35));

  while (wrappedLines.length > maxLines && fontSize > minFontSize) {
    fontSize -= 2;
    maxChars = calcMaxChars(fontSize, template.textArea.width);
    wrappedLines = wrapText(text || "Your text here...", maxChars);
  }

  const lineHeight = fontSize * 1.35;
  const totalTextHeight = wrappedLines.length * lineHeight;
  const textStartY = template.textArea.y + (template.textArea.height - totalTextHeight) / 2 + fontSize;

  return { fontSize, wrappedLines, lineHeight, textStartY };
}

export function renderCardSvg(template: TemplateConfig, text: string): string {
  const { fontSize, wrappedLines, lineHeight, textStartY } = calcTextLayout(template, text);
  return buildSvgString(template, wrappedLines, fontSize, lineHeight, textStartY);
}

function buildSvgString(
  template: TemplateConfig,
  lines: string[],
  fontSize: number,
  lineHeight: number,
  textStartY: number
): string {
  const { width, height, textColor, bgColor, tagLabel, postType, colorVariant } = template;
  const isLinkedin = width > 700;
  const isDark = colorVariant === "dark";

  // Frame position
  const frameX = isLinkedin ? -56 : -63;
  const frameWidth = isLinkedin ? 1005 : 640;

  // Icon position
  const iconSize = isLinkedin ? 128 : 128;
  const iconCx = isLinkedin ? width * 0.79 : width * 0.69;
  const iconCy = isLinkedin ? height * 0.28 : height * 0.54;

  // Build gradient defs
  const gradientBg = isDark ? `
    <defs>
      <filter id="blur1" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="150"/>
      </filter>
      <filter id="blur2" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="125"/>
      </filter>
      <radialGradient id="grad1" cx="0.5" cy="0.3" r="0.6">
        <stop offset="0.21" stop-color="#974DFF"/>
        <stop offset="0.72" stop-color="#FF72D0"/>
        <stop offset="1" stop-color="#FFDF61"/>
      </radialGradient>
      <linearGradient id="grad2" x1="0.2" y1="0.8" x2="0.8" y2="0.2">
        <stop offset="0.14" stop-color="#40FFC7"/>
        <stop offset="0.53" stop-color="#61D8FF"/>
        <stop offset="1" stop-color="#0A57FF"/>
      </linearGradient>
    </defs>
    <ellipse cx="${width * 0.7}" cy="${height * 0.15}" rx="${width * 0.4}" ry="${height * 0.3}" fill="url(#grad1)" filter="url(#blur1)"/>
    <ellipse cx="${width * 0.25}" cy="${height * 0.75}" rx="${width * 0.45}" ry="${height * 0.35}" fill="url(#grad2)" filter="url(#blur2)"/>
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

  // Icon - always use cream for inner fill
  const iconFill = "#F7F5F3";
  const iconSvg = postType === "poll" ? `
    <circle cx="${iconCx}" cy="${iconCy}" r="${iconSize / 2}" fill="#FFB300"/>
    <rect x="${iconCx - iconSize * 0.33}" y="${iconCy - iconSize * 0.22}" width="${iconSize * 0.49}" height="${iconSize * 0.46}" rx="${iconSize * 0.05}" fill="#FFDF61"/>
    <rect x="${iconCx - iconSize * 0.23}" y="${iconCy - iconSize * 0.35}" width="${iconSize * 0.46}" height="${iconSize * 0.43}" rx="${iconSize * 0.05}" fill="${iconFill}"/>
    <path d="${iconCx - iconSize * 0.23} ${iconCy + iconSize * 0.2}V${iconCy - iconSize * 0.05}C${iconCx - iconSize * 0.23} ${iconCy - iconSize * 0.13} ${iconCx - iconSize * 0.16} ${iconCy - iconSize * 0.2} ${iconCx - iconSize * 0.08} ${iconCy - iconSize * 0.2}H${iconCx + iconSize * 0.08}C${iconCx + iconSize * 0.18} ${iconCy - iconSize * 0.2} ${iconCx + iconSize * 0.2} ${iconCy - iconSize * 0.04} ${iconCx + iconSize * 0.12} ${iconCy + iconSize * 0.04}L${iconCx - iconSize * 0.08} ${iconCy + iconSize * 0.23}C${iconCx - iconSize * 0.16} ${iconCy + iconSize * 0.3} ${iconCx - iconSize * 0.23} ${iconCy + iconSize * 0.25} ${iconCx - iconSize * 0.23} ${iconCy + iconSize * 0.2}Z" fill="${iconFill}"/>
    <text x="${iconCx}" y="${iconCy - iconSize * 0.05}" text-anchor="middle" dominant-baseline="central" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="${iconSize * 0.38}" fill="#0A0632">?</text>
  ` : `
    <circle cx="${iconCx}" cy="${iconCy}" r="${iconSize / 2}" fill="#0A57FF"/>
    <rect x="${iconCx - iconSize * 0.26}" y="${iconCy - iconSize * 0.26}" width="${iconSize * 0.52}" height="${iconSize * 0.48}" rx="${iconSize * 0.05}" fill="${iconFill}"/>
    <path d="M${iconCx - iconSize * 0.19} ${iconCy + iconSize * 0.32}V${iconCy + iconSize * 0.05}C${iconCx - iconSize * 0.19} ${iconCy - iconSize * 0.03} ${iconCx - iconSize * 0.12} ${iconCy - iconSize * 0.1} ${iconCx - iconSize * 0.05} ${iconCy - iconSize * 0.1}H${iconCx + iconSize * 0.14}C${iconCx + iconSize * 0.26} ${iconCy - iconSize * 0.1} ${iconCx + iconSize * 0.32} ${iconCy + iconSize * 0.07} ${iconCx + iconSize * 0.22} ${iconCy + iconSize * 0.17}L${iconCx - iconSize * 0.02} ${iconCy + iconSize * 0.38}C${iconCx - iconSize * 0.12} ${iconCy + iconSize * 0.46} ${iconCx - iconSize * 0.19} ${iconCy + iconSize * 0.38} ${iconCx - iconSize * 0.19} ${iconCy + iconSize * 0.32}Z" fill="${iconFill}"/>
    <text x="${iconCx}" y="${iconCy - iconSize * 0.12}" text-anchor="middle" dominant-baseline="central" font-family="Georgia, serif" font-weight="bold" font-size="${iconSize * 0.35}" fill="#0A0632">\u201C\u201D</text>
  `;

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

  // Logo + brand
  const logoY = height - 145;
  const logoSvg = `
    <rect x="${template.textArea.x - 0.393}" y="${logoY}" width="10.908" height="10.373" fill="#FF72D0"/>
    <rect x="${template.textArea.x + 14.405}" y="${logoY}" width="10.908" height="10.373" fill="#0A57FF"/>
    <rect x="${template.textArea.x + 14.405}" y="${logoY + 14.405}" width="10.908" height="10.911" fill="#FFB300"/>
    <text x="${template.textArea.x}" y="${logoY + 35}" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="15" fill="${textColor}">migbirds</text>
  `;

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  ${gradientBg}
  <rect x="${frameX}" y="50" width="${frameWidth}" height="527" rx="29.64" fill="${isDark ? 'none' : bgColor}" stroke="${isDark ? bgColor : textColor}" stroke-width="1"/>
  <rect x="50.5" y="27.5" width="${tagWidth}" height="45" rx="14.5" fill="${bgColor}" stroke="${textColor}" stroke-width="1"/>
  <text x="${50.5 + tagWidth / 2}" y="54" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="13" fill="${textColor}" letter-spacing="0.5">${tagLabel}</text>
  ${iconSvg}
  ${textSvg}
  ${logoSvg}
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

  // Logo position
  const logoY = height - 145;

  // Icon position
  const iconSize = 128;
  const iconCx = isLinkedin ? width * 0.79 : width * 0.69;
  const iconCy = isLinkedin ? height * 0.28 : height * 0.54;

  const seed = Math.floor(Math.random() * 10000);

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

      {/* Migbirds logo */}
      <MigbirdsLogo x={template.textArea.x - 0.393} y={logoY} />
      <MigbirdsWordmark x={template.textArea.x} y={logoY + 28} color={textColor} />

      {/* Icon */}
      {postType === "poll" ? (
        <QuestionIcon cx={iconCx} cy={iconCy} size={iconSize} bgColor="#F7F5F3" />
      ) : (
        <QuoteIcon cx={iconCx} cy={iconCy} size={iconSize} bgColor="#F7F5F3" />
      )}

      {/* Decorative elements */}
      <DecoElements width={width} height={height} variant={isDark ? "dark" : postType} />
    </svg>
  );
}
