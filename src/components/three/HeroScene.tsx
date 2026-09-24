"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";

// three.js ships in its own chunk, fetched only in the browser.
const ParticleZ = dynamic(() => import("@/components/three/ParticleZ"), { ssr: false });

/**
 * Hosts the 3D particle "Z". The 3D code is only requested once the page is
 * idle (so it never competes with the headline for first paint), and a soft
 * glow sits underneath so the space never looks empty while it loads.
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
    <div className="hero-stage h-full w-full">
      {/* Nebula behind the Z: teal core with an indigo bloom, offset for depth */}
      <div
        className="pointer-events-none absolute inset-[14%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle at 45% 45%, rgba(47, 225, 214, 0.42), transparent 62%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-[8%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle at 62% 58%, rgba(111, 125, 255, 0.3), transparent 60%)" }}
        aria-hidden="true"
      />
      {ready && <ParticleZ reduceMotion={reduce} />}
    </div>
  );
}
