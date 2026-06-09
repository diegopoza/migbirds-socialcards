"use client";

import { useEffect, useState } from "react";
import { SlideRenderData } from "./carousel-types";
import { buildSlideSvg } from "./carousel-svg";

// Renders a slide as inline native SVG, scaled into a `size`×`size` box.
// SVG is built client-side only (text measurement needs the DOM) and re-built
// once fonts are ready so wrapping is accurate.
export function CarouselSlideView({ data, size }: { data: SlideRenderData; size: number }) {
  const [mounted, setMounted] = useState(false);
  const [, setFontsReady] = useState(false);

  useEffect(() => {
    setMounted(true);
    let active = true;
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => { if (active) setFontsReady(true); });
    }
    return () => { active = false; };
  }, []);

  const svg = mounted ? buildSlideSvg(data, { embed: false }) : "";

  return (
    <div style={{ width: size, height: size, overflow: "hidden" }}>
      <div
        style={{ width: 1080, height: 1080, transform: `scale(${size / 1080})`, transformOrigin: "top left" }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
