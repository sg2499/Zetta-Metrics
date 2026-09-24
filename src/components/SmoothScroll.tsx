"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Smooth, weighted wheel scrolling (Lenis) for mouse/trackpad users on
 * desktop. Skipped entirely for reduced-motion visitors and touch devices,
 * which keep native scrolling. The instance is exposed on window so modals
 * (the screenshot viewer) can pause it while open.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;

    document.documentElement.style.scrollBehavior = "auto";
    const lenis = new Lenis({ autoRaf: true, lerp: 0.11, anchors: { offset: -96 }, stopInertiaOnNavigate: true });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      window.__lenis = undefined;
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  // New page: start at the top instantly (no smooth glide from the old position).
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
