"use client";

import { useEffect } from "react";

/**
 * One document-level pointer listener that powers two card effects:
 *  - spotlight + glowing edge: feeds --spot-x / --spot-y into whichever
 *    `.surface-card` is under the pointer (see globals.css);
 *  - 3D tilt: feeds --rx / --ry (a few degrees) into the `.hover-card`
 *    under the pointer, and resets the previous card when the pointer leaves.
 * A single listener keeps this cheap no matter how many cards a page has.
 * Skipped on touch-only devices; tilt is skipped for reduced motion.
 */
const MAX_TILT = 5; // degrees

export default function SpotlightTracker() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    let lastTilt: HTMLElement | null = null;
    const reset = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const target = e.target as Element | null;
        const card = target?.closest?.(".surface-card") as HTMLElement | null;
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
          card.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
        }
        if (reduce) return;
        const tilt = target?.closest?.(".hover-card") as HTMLElement | null;
        if (tilt !== lastTilt) {
          reset(lastTilt);
          lastTilt = tilt;
        }
        if (tilt) {
          const r = tilt.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          tilt.style.setProperty("--ry", `${(px * MAX_TILT * 2).toFixed(2)}deg`);
          tilt.style.setProperty("--rx", `${(-py * MAX_TILT * 2).toFixed(2)}deg`);
        }
      });
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
      reset(lastTilt);
    };
  }, []);

  return null;
}
