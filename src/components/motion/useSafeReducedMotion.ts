"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Like framer-motion's useReducedMotion, but hydration-safe: the server
 * and the hydrating client render both see `false`, then React re-renders
 * with the real preference. framer's own hook reads the media query during
 * the very first client render, which made server and client markup
 * disagree (a hydration mismatch) for visitors with reduced motion on.
 */
export function useSafeReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
}
