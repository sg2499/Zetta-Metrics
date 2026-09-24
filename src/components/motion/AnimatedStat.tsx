"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";

/**
 * Counts a numeric stat value up from 0 when it scrolls into view (e.g.
 * "2026", "100%"). Non-numeric values ("SaaS", "AI-native") render as
 * plain static text — there's nothing to count. Respects reduced motion
 * by jumping straight to the final value.
 */
export default function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useSafeReducedMotion();
  const match = value.match(/^(\d{1,4})(%?)$/);
  const [display, setDisplay] = useState(match ? `0${match[2]}` : value);

  useEffect(() => {
    if (!match || !isInView) return;
    if (shouldReduceMotion) {
      setDisplay(value);
      return;
    }
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 1200;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, shouldReduceMotion, value]);

  return <span ref={ref}>{display}</span>;
}
