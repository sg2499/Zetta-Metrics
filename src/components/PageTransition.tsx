"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * A subtle fade/rise on every route change instead of the hard instant
 * swap a static-generated app gives by default — keyed on the pathname so
 * it replays on each navigation.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useSafeReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
