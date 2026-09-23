"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A slim accent-colored bar pinned to the very top of the viewport that
 * fills as the person scrolls down the page — a small, standard piece of
 * polish on long-scroll marketing sites that this one was missing.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--accent-strong), var(--accent), var(--accent-silver))",
      }}
      aria-hidden="true"
    />
  );
}
