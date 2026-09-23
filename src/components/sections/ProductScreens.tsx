import Image from "next/image";
import { ImageOff, LayoutDashboard } from "lucide-react";

export interface ProductScreenshot {
  src: string;
  caption: string;
}

interface Props {
  screenshots: ProductScreenshot[];
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
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {screenshots.map((shot) => (
          <figure
            key={shot.src}
            className="overflow-hidden rounded-xl border"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div
              className="flex items-center gap-1.5 border-b px-3.5 py-2.5"
              style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-raised)" }}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--border-strong)" }} />
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--border-strong)" }} />
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--border-strong)" }} />
            </div>
            <div
              className="relative aspect-[2/1] w-full overflow-hidden"
              style={{ backgroundColor: "var(--bg-raised)" }}
            >
              <Image
                src={shot.src}
                alt={`${productName} — ${shot.caption}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
            <figcaption
              className="border-t px-4 py-2.5 text-xs font-medium"
              style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
            >
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl border"
      style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-raised)" }}
    >
      <div className="flex items-center gap-1.5 border-b px-4 py-3" style={{ borderColor: "var(--border-subtle)" }}>
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--border-strong)" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--border-strong)" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--border-strong)" }} />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 px-8 py-24 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: "var(--accent-soft)" }}>
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
