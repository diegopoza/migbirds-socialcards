import { toPng, toSvg } from "html-to-image";
import { CAROUSEL_SIZE } from "./carousel-types";

// Precompute an @font-face CSS string with base64 data-URLs for our local
// fonts and pass it as `fontEmbedCSS`, so html-to-image skips its own
// stylesheet scan (which can hang on cross-origin sheets) and the exported
// image still renders Space Grotesk / Hanken Grotesk correctly.
let fontCssCache: string | null = null;

async function fetchDataUrl(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return await new Promise<string>((resolve) => {
    const fr = new FileReader();
    fr.onloadend = () => resolve(fr.result as string);
    fr.readAsDataURL(blob);
  });
}

async function buildFontEmbedCss(): Promise<string> {
  if (fontCssCache) return fontCssCache;
  const [sg, hk, hki] = await Promise.all([
    fetchDataUrl("/fonts/SpaceGrotesk-VariableFont_wght.ttf"),
    fetchDataUrl("/fonts/HankenGrotesk-VariableFont_wght.ttf"),
    fetchDataUrl("/fonts/HankenGrotesk-Italic-VariableFont_wght.ttf"),
  ]);
  fontCssCache = `
    @font-face{font-family:'Space Grotesk';src:url(${sg}) format('truetype');font-weight:300 700;font-style:normal;}
    @font-face{font-family:'Hanken Grotesk';src:url(${hk}) format('truetype');font-weight:100 900;font-style:normal;}
    @font-face{font-family:'Hanken Grotesk';src:url(${hki}) format('truetype');font-weight:100 900;font-style:italic;}
  `;
  return fontCssCache;
}

async function baseOptions() {
  return {
    width: CAROUSEL_SIZE,
    height: CAROUSEL_SIZE,
    pixelRatio: 2, // 2160×2160 — crisp, downscales cleanly to 1080
    cacheBust: true,
    fontEmbedCSS: await buildFontEmbedCss(),
    style: { transform: "none", margin: "0" },
  };
}

function triggerDownload(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

async function ready() {
  if (typeof document !== "undefined" && "fonts" in document) {
    try {
      await document.fonts.ready;
    } catch {
      /* noop */
    }
  }
}

// Guard against environments where the capture step never resolves so the UI
// can recover and report instead of hanging forever.
function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Export timed out after ${ms}ms`)), ms)
    ),
  ]);
}

export async function exportSlidePng(node: HTMLElement, filename: string) {
  const opts = await baseOptions();
  await ready();
  // First pass warms the image cache; second renders reliably.
  await withTimeout(toPng(node, opts), 20000);
  const dataUrl = await withTimeout(toPng(node, opts), 20000);
  triggerDownload(dataUrl, filename);
}

export async function exportSlideSvg(node: HTMLElement, filename: string) {
  const opts = await baseOptions();
  await ready();
  const dataUrl = await withTimeout(toSvg(node, opts), 20000);
  triggerDownload(dataUrl, filename);
}

export async function exportAllPng(nodes: { node: HTMLElement; filename: string }[]) {
  const opts = await baseOptions();
  await ready();
  for (const { node, filename } of nodes) {
    await withTimeout(toPng(node, opts), 20000); // warm
    const dataUrl = await withTimeout(toPng(node, opts), 20000);
    triggerDownload(dataUrl, filename);
    await new Promise((r) => setTimeout(r, 400));
  }
}
