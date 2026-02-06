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
          {/* Migbirds Logo */}
          <div className="flex gap-0.5">
            <div className="flex flex-col gap-0.5">
              <div className="w-3 h-3 bg-migbirds-pink rounded-[1px]" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="w-3 h-3 bg-migbirds-blue rounded-[1px]" />
              <div className="w-3 h-3 bg-migbirds-yellow rounded-[1px]" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-migbirds-navy leading-tight">
              migbirds
            </h1>
            <p className="text-[11px] text-migbirds-navy/50 leading-none">
              Social Card Creator
            </p>
          </div>
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
