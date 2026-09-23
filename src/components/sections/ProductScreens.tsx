"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ImageOff, LayoutDashboard, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

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
 *
 * Screenshots are clickable and open a full-size lightbox so the user can
 * see the entire image cleanly, with keyboard/arrow navigation between
 * the other screenshots of the same product.
 */
export default function ProductScreens({ screenshots, productName, placeholderNote }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i - 1 + screenshots.length) % screenshots.length));
  }, [screenshots.length]);
  const showNext = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % screenshots.length));
  }, [screenshots.length]);

  useEffect(() => {
    if (openIndex === null) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, close, showPrev, showNext]);

  if (screenshots.length > 0) {
    return (
      <>
        <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {screenshots.map((shot, i) => (
            <figure
              key={shot.src}
              className="hover-card flex h-full flex-col overflow-hidden rounded-xl border"
              style={{ borderColor: "var(--border-subtle)", boxShadow: "var(--shadow-soft)" }}
            >
              <div
                className="flex items-center gap-2 border-b px-3.5 py-2.5"
                style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-raised)" }}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--border-strong)" }} />
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--border-strong)" }} />
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--border-strong)" }} />
                <span
                  className="ml-2 flex-1 truncate rounded-full px-2.5 py-0.5 text-center font-mono text-[0.65rem]"
                  style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-muted)" }}
                >
                  {productName.toLowerCase().replace(/\s+/g, "")}.app
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative aspect-[2/1] w-full cursor-zoom-in overflow-hidden"
                style={{ backgroundColor: "var(--bg-raised)" }}
                aria-label={`Expand screenshot: ${shot.caption}`}
              >
                <Image
                  src={shot.src}
                  alt={`${productName} — ${shot.caption}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain"
                />
                <span
                  className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                  style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
                  >
                    <ZoomIn size={18} style={{ color: "#111" }} />
                  </span>
                </span>
              </button>
              <figcaption
                className="border-t px-4 py-2.5 text-xs font-medium"
                style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
              >
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {mounted && openIndex !== null && createPortal(
          <div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-4 py-8 sm:px-10"
            style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
            role="dialog"
            aria-modal="true"
            aria-label={`${productName} screenshot viewer`}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full transition-colors sm:right-6 sm:top-6"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#fff" }}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {screenshots.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full transition-colors sm:left-6"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#fff" }}
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full transition-colors sm:right-6"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#fff" }}
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <div
              className="relative flex max-h-[82vh] w-full max-w-6xl items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- natural-size lightbox rendering, intrinsic aspect ratio varies per screenshot */}
              <img
                src={screenshots[openIndex].src}
                alt={`${productName} — ${screenshots[openIndex].caption}`}
                className="max-h-[82vh] w-auto max-w-full rounded-lg object-contain"
              />
            </div>
            <p className="mt-5 text-center text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
              {screenshots[openIndex].caption}
              {screenshots.length > 1 && (
                <span style={{ color: "rgba(255,255,255,0.5)" }}>
                  {" "}
                  — {openIndex + 1} / {screenshots.length}
                </span>
              )}
            </p>
          </div>,
          document.body
        )}
      </>
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
