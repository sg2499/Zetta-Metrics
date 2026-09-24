"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";

// three.js ships in its own chunk, fetched only in the browser.
const SolidZ = dynamic(() => import("@/components/three/SolidZ"), { ssr: false });

/**
 * Hosts the 3D "Z" (see SolidZ). The 3D code is requested once the page is idle (so it
 * never competes with the headline for first paint). A soft glow sits behind
 * and a contact shadow beneath, so the object feels grounded in both themes.
 */
export default function HeroScene() {
  const reduce = useSafeReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const go = () => setReady(true);
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(go, { timeout: 1200 });
      return () => (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
    }
    const t = setTimeout(go, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative h-full w-full">
      <div className="hero-glow pointer-events-none absolute inset-[2%] rounded-full" aria-hidden="true" />
      <div className="hero-shadow pointer-events-none absolute bottom-[7%] left-1/2 h-[11%] w-[52%] -translate-x-1/2 rounded-full" aria-hidden="true" />
      {ready && <SolidZ reduceMotion={reduce} />}
    </div>
  );
}
