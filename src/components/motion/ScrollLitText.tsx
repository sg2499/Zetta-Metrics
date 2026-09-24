"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";

export interface LitSegment {
  text: string;
  accent?: boolean;
}

function Word({ word, progress, range, accent, reduce }: { word: string; progress: MotionValue<number>; range: [number, number]; accent?: boolean; reduce: boolean }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span
      className={accent ? "gradient-text" : undefined}
      style={{ opacity: reduce ? 1 : opacity }}
    >
      {word}
    </motion.span>
  );
}

/**
 * A statement whose words light up one after another as the reader scrolls
 * through it — a scroll-linked reading effect. Plain inline words with real
 * spaces, so wrapping is natural. Fully lit for reduced-motion visitors.
 */
export default function ScrollLitText({ segments, className, style }: { segments: LitSegment[]; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  const words = segments.flatMap((seg) => seg.text.split(" ").map((w) => ({ w, accent: seg.accent })));
  const n = words.length;

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((item, i) => (
        <span key={i}>
          <Word word={item.w} progress={scrollYProgress} range={[i / n, (i + 1) / n]} accent={item.accent} reduce={reduce} />
          {i < n - 1 && " "}
        </span>
      ))}
    </p>
  );
}
