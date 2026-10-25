"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";

/**
 * Krama's five-day chapter loop as a rising stair: learn, practise, apply,
 * fix, master. A gold light climbs it step by step and starts over.
 * Original artwork in Krama's own palette; pure CSS + one animated light.
 */
const STEPS = [
  { day: "Day 1", word: "Learn", h: 24 },
  { day: "Day 2", word: "Practise", h: 42 },
  { day: "Day 3", word: "Apply", h: 60 },
  { day: "Day 4", word: "Fix", h: 78 },
  { day: "Day 5", word: "Master", h: 96 },
];

export default function KramaStair({ compact = false }: { compact?: boolean }) {
  const reduce = useSafeReducedMotion();
  const n = STEPS.length;
  const lefts = STEPS.map((_, i) => `${((i + 0.5) / n) * 100}%`);
  const bottoms = STEPS.map((s) => `${s.h}%`);
  // Climb the steps, hold at the top, then fall back to the start.
  const keyLefts = [...lefts, lefts[n - 1], lefts[0]];
  const keyBottoms = [...bottoms, bottoms[n - 1], bottoms[0]];

  return (
    <div className={`relative w-full ${compact ? "h-48" : "h-72 sm:h-96"}`} role="img" aria-label="The five-day chapter loop: learn, practise, apply, fix, master">
      <div className="absolute inset-x-0 bottom-0 flex h-full items-end gap-[3%]">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.word}
            className="relative flex-1"
            style={{ height: `${s.h}%` }}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* gold lid */}
            <div
              className="absolute -top-[7px] left-0 right-0 h-[9px]"
              style={{
                background: "linear-gradient(90deg, #fff1c6, #f9ab2b 55%, #d06b06)",
                clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)",
                boxShadow: "0 0 22px rgba(249,171,43,0.55)",
              }}
            />
            {/* body */}
            <div
              className="absolute inset-0 overflow-hidden rounded-b-md border border-t-0"
              style={{
                borderColor: "rgba(255,255,255,0.14)",
                background: "linear-gradient(180deg, rgba(125,106,235,0.34), rgba(40,33,110,0.55) 55%, rgba(18,14,46,0.7))",
                backdropFilter: "blur(6px)",
              }}
            >
              <span
                className="font-serif-display absolute -bottom-3 right-1 select-none leading-none"
                style={{ fontSize: compact ? "3.4rem" : "clamp(3.6rem, 8vw, 6.2rem)", color: "rgba(255,255,255,0.07)", fontWeight: 700 }}
              >
                {i + 1}
              </span>
              <div className={`relative ${compact ? "p-2" : "p-2 sm:p-4"}`}>
                <p className="text-[0.55rem] font-bold uppercase tracking-[0.16em] sm:text-[0.62rem]" style={{ color: "var(--accent)" }}>
                  {s.day}
                </p>
                <p className="font-serif-display mt-0.5 font-bold leading-tight tracking-tight" style={{ color: "var(--text-primary)", fontSize: compact ? "0.8rem" : "clamp(0.66rem, 1.55vw, 1.3rem)" }}>
                  {s.word}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* the climbing light */}
      <motion.span
        className="pointer-events-none absolute z-10 block h-3.5 w-3.5 -translate-x-1/2 translate-y-[3px] rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 30%, #fff, #ffd37a 45%, #f9ab2b)",
          boxShadow: "0 0 0 5px rgba(249,171,43,0.18), 0 0 26px 6px rgba(249,171,43,0.6)",
        }}
        initial={{ left: lefts[0], bottom: bottoms[0] }}
        animate={reduce ? { left: lefts[n - 1], bottom: bottoms[n - 1] } : { left: keyLefts, bottom: keyBottoms }}
        transition={reduce ? { duration: 0 } : { duration: 11, ease: "easeInOut", repeat: Infinity, times: [0, 0.14, 0.28, 0.42, 0.56, 0.86, 1] }}
      />
    </div>
  );
}
