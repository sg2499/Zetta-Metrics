"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span";
}

/**
 * Fades + slides content up as it enters the viewport. Respects
 * prefers-reduced-motion (renders instantly, no transform) and only
 * animates once (won't re-trigger on scroll back up).
 */
export default function Reveal({ children, delay = 0, y = 22, className, as = "div" }: RevealProps) {
  const shouldReduceMotion = useSafeReducedMotion();
  const Component = as === "span" ? motion.span : motion.div;

  // Always pass concrete initial/whileInView values (never undefined) —
  // when reduced motion is preferred, the "hidden" and "visible" states
  // are made identical so there's nothing to animate, but the element is
  // guaranteed visible immediately rather than relying on a transition
  // that reduced-motion users' browsers may never resolve.
  return (
    <Component
      className={className}
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px 0px" }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}
