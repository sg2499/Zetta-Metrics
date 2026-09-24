"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";

export interface HeadlineSegment {
  text: string;
  gradient?: boolean;
}

/**
 * Headline that rises into view word by word from behind a mask. Words stay
 * ordinary inline text with real spaces between them, so line wrapping is
 * exactly what the browser would do for plain text — no forced breaks.
 */
export default function HeadlineReveal({ segments, delay = 0 }: { segments: HeadlineSegment[]; delay?: number }) {
  const reduce = useSafeReducedMotion();
  let index = 0;
  return (
    <>
      {segments.map((seg, s) =>
        seg.text.split(" ").map((word, w, arr) => {
          const i = index++;
          const isLast = w === arr.length - 1 && s === segments.length - 1;
          return (
            <span key={`${s}-${w}`}>
              <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                <motion.span
                  className={`inline-block ${seg.gradient ? "gradient-text" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : delay + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              </span>
              {!isLast && " "}
            </span>
          );
        })
      )}
    </>
  );
}
