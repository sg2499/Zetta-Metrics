import Image from "next/image";
import { ImageOff, LayoutDashboard } from "lucide-react";

interface Props {
  screenshots: string[];
  productName: string;
  placeholderNote: string;
}

/**
 * Renders real product screenshots when available. Until then, shows a
 * clearly-labeled placeholder frame instead of faking screenshots —
 * swap in real images by populating `screenshots` in src/lib/content.ts.
 */
export default function ProductScreens({ screenshots, productName, placeholderNote }: Props) {
  if (screenshots.length > 0) {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        {screenshots.map((src) => (
          <div key={src} className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--border-subtle)" }}>
            <Image src={src} alt={`${productName} screenshot`} width={960} height={600} className="h-auto w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl border"
      style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-raised)" }}
    >
      <div
        className="flex items-center gap-1.5 border-b px-4 py-3"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--border-strong)" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--border-strong)" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--border-strong)" }} />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 px-8 py-24 text-center">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: "var(--accent-soft)" }}
        >
          <LayoutDashboard size={26} style={{ color: "var(--accent)" }} />
        </div>
        <p className="max-w-sm text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
          {placeholderNote}
        </p>
        <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
          <ImageOff size={13} /> Product screens not yet published
        </span>
      </div>
    </div>
  );
}
