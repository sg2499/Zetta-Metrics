"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The hero's visual centerpiece — a large rotating gradient ring with a
 * pulsing glowing core, positioned to bleed off the edge of the hero so
 * it reads as a deliberate design object, not ambient texture. Purely
 * decorative (aria-hidden); scales and repositions per breakpoint via
 * Tailwind classes on the wrapper.
 */
export default function HeroOrb() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute -right-24 -top-16 h-[560px] w-[560px] sm:h-[680px] sm:w-[680px] lg:-right-32 lg:-top-24"
      aria-hidden="true"
    >
      {/* Rotating conic ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "var(--orb-ring)",
          WebkitMask: "radial-gradient(closest-side, transparent 78%, black 79%, black 82%, transparent 83%)",
          mask: "radial-gradient(closest-side, transparent 78%, black 79%, black 82%, transparent 83%)",
        }}
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      {/* Second, slower counter-rotating ring for depth */}
      <motion.div
        className="absolute inset-[8%] rounded-full"
        style={{
          background: "var(--orb-ring)",
          opacity: 0.5,
          WebkitMask: "radial-gradient(closest-side, transparent 82%, black 83%, black 85%, transparent 86%)",
          mask: "radial-gradient(closest-side, transparent 82%, black 83%, black 85%, transparent 86%)",
        }}
        animate={shouldReduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />
      {/* Pulsing glow core */}
      <motion.div
        className="absolute inset-[22%] rounded-full"
        style={{ background: "var(--orb-core)", filter: "blur(20px)" }}
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
