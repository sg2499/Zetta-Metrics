"use client";

import { useEffect } from "react";

/**
 * One document-level pointer listener that feeds the cursor position into
 * whichever `.surface-card` is under the pointer (as --spot-x / --spot-y),
 * powering the radial spotlight defined in globals.css. A single listener
 * keeps this cheap no matter how many cards a page has. Skipped entirely
 * for touch-only devices, where there's no hover to follow.
 */
export default function SpotlightTracker() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const card = (e.target as Element | null)?.closest?.(".surface-card") as HTMLElement | null;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
      });
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
