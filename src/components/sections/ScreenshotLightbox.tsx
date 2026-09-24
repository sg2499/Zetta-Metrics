"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface Shot {
  src: string;
  caption: string;
}

interface Props {
  shots: Shot[];
  index: number | null;
  onChange: (index: number | null) => void;
  productName: string;
}

/**
 * Full-screen viewer for product screenshots: Escape closes, arrow keys
 * move between shots, clicking the backdrop closes. Rendered into a portal
 * so it sits above the fixed navbar regardless of where it's used.
 */
export default function ScreenshotLightbox({ shots, index, onChange, productName }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const close = useCallback(() => onChange(null), [onChange]);
  const prev = useCallback(() => {
    if (index === null) return;
    onChange((index - 1 + shots.length) % shots.length);
  }, [index, onChange, shots.length]);
  const next = useCallback(() => {
    if (index === null) return;
    onChange((index + 1) % shots.length);
  }, [index, onChange, shots.length]);

  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, prev, next]);

  if (!mounted || index === null) return null;
  const shot = shots[index];

  const navBtn =
    "absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-white/15";

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-4 py-8 sm:px-10"
      style={{ backgroundColor: "rgba(2,6,12,0.94)", backdropFilter: "blur(6px)" }}
      role="dialog"
      aria-modal="true"
      aria-label={`${productName} screenshot viewer`}
      onClick={close}
    >
      <button
        type="button"
        onClick={close}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/15 sm:right-6 sm:top-6"
        style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#fff" }}
        aria-label="Close"
      >
        <X size={20} />
      </button>

      {shots.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className={`${navBtn} left-2 sm:left-6`}
            style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#fff" }}
            aria-label="Previous screenshot"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className={`${navBtn} right-2 sm:right-6`}
            style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#fff" }}
            aria-label="Next screenshot"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      <div className="relative flex max-h-[82vh] w-full max-w-6xl items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element -- natural-size rendering; aspect ratio varies per screenshot */}
        <img src={shot.src} alt={`${productName} — ${shot.caption}`} className="max-h-[82vh] w-auto max-w-full rounded-lg object-contain" />
      </div>
      <p className="mt-5 text-center text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
        {shot.caption}
        {shots.length > 1 && (
          <span style={{ color: "rgba(255,255,255,0.5)" }}>
            {" "}
            — {index + 1} / {shots.length}
          </span>
        )}
      </p>
    </div>,
    document.body
  );
}
