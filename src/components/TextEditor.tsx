"use client";

interface TextEditorProps {
  text: string;
  onTextChange: (text: string) => void;
  maxLength?: number;
}

export default function TextEditor({ text, onTextChange, maxLength = 300 }: TextEditorProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-migbirds-navy mb-3">
        Card Text
      </label>
      <textarea
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        maxLength={maxLength}
        rows={5}
        placeholder="Type your message here... The text will auto-fit to the card."
        className="w-full px-4 py-3 rounded-xl border border-migbirds-navy/20 bg-white text-migbirds-navy placeholder:text-migbirds-navy/30 focus:outline-none focus:ring-2 focus:ring-migbirds-purple/50 focus:border-migbirds-purple resize-none text-sm"
      />
      <div className="flex justify-between mt-1.5">
        <p className="text-xs text-migbirds-navy/40">
          Text size adjusts automatically to fit the card
        </p>
        <p className="text-xs text-migbirds-navy/40">
          {text.length}/{maxLength}
        </p>
      </div>
    </div>
  );
}
