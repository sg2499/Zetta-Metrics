"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { useRef } from "react";

interface MagneticLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

/**
 * Wraps a Link with a subtle "magnetic" hover feel — the button nudges
 * toward the cursor and settles back with a springy release. Falls back
 * to a plain scale/press feel when reduced motion is preferred.
 */
export default function MagneticLink({ href, className, children }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.setProperty("--mx", `${x * 0.22}px`);
    ref.current.style.setProperty("--my", `${y * 0.28}px`);
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--mx", "0px");
    ref.current.style.setProperty("--my", "0px");
  };

  return (
    <motion.span
      style={{ display: "inline-block" }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
    >
      <Link
        ref={ref}
        href={href}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: "translate(var(--mx, 0px), var(--my, 0px))",
          transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {children}
      </Link>
    </motion.span>
  );
}
