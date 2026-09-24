"use client";

import { useEffect, useRef, useState } from "react";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";

/**
 * Counts a numeric stat value up from 0 the first time it reaches the
 * screen (e.g. "2", "100%"). Non-numeric values ("AI-native") render as
 * plain text. Reduced motion jumps straight to the final value.
 *
 * The trigger is "has the element's top reached 90% of the viewport height
 * — or gone past it", checked on scroll/resize. Unlike an intersection
 * observer, a fast scroll or jump can't skip over it and leave the number
 * stuck at 0.
 */
export default function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useSafeReducedMotion();
  const match = value.match(/^(\d{1,4})(%?)$/);
  const [display, setDisplay] = useState(match ? `0${match[2]}` : value);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!match || triggered) return;
    const check = () => {
      const el = ref.current;
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.9) setTriggered(true);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggered, value]);

  useEffect(() => {
    if (!match || !triggered) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 1200;
    let start = 0;
    let frame = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${Math.round(target * eased)}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    // Safety net: if animation frames are throttled (background tab), still
    // land on the real value.
    const done = setTimeout(() => setDisplay(value), duration + 400);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggered, reduce, value]);

  return <span ref={ref}>{display}</span>;
}
