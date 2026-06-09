// Export carousel slides via the native-SVG → Image → canvas pipeline.
// No <foreignObject>, so the canvas never taints and toBlob/toDataURL work.

import { buildSlideSvg, loadExportAssets } from "./carousel-svg";
import { SlideRenderData, CAROUSEL_SIZE } from "./carousel-types";

function triggerDownload(href: string, filename: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  a.click();
}

async function svgToImage(svg: string): Promise<HTMLImageElement> {
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("SVG image failed to load"));
      img.src = url;
    });
    return img;
  } finally {
    // revoke after load handlers have run on next tick
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}

async function rasterizePng(data: SlideRenderData): Promise<Blob> {
  const assets = await loadExportAssets();
  if ("fonts" in document) {
    try { await document.fonts.ready; } catch { /* noop */ }
  }
  const svg = buildSlideSvg(data, { embed: true, assets });
  const img = await svgToImage(svg);
  const scale = 2; // 2160×2160
  const canvas = document.createElement("canvas");
  canvas.width = CAROUSEL_SIZE * scale;
  canvas.height = CAROUSEL_SIZE * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no 2d context");
  ctx.scale(scale, scale);
  ctx.drawImage(img, 0, 0, CAROUSEL_SIZE, CAROUSEL_SIZE);
  return await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/png")
  );
}

export async function exportSlidePng(data: SlideRenderData, filename: string) {
  const blob = await rasterizePng(data);
  const url = URL.createObjectURL(blob);
  triggerDownload(url, filename);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function exportSlideSvg(data: SlideRenderData, filename: string) {
  const assets = await loadExportAssets();
  const svg = buildSlideSvg(data, { embed: true, assets });
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, filename);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function exportAllPng(items: { data: SlideRenderData; filename: string }[]) {
  for (const { data, filename } of items) {
    await exportSlidePng(data, filename);
    await new Promise((r) => setTimeout(r, 350));
  }
}
