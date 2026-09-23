"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

// Deterministic node layout (percent coordinates) — same on server and
// client so there's no hydration mismatch. Connections are drawn between
// any two nodes within a distance threshold.
const NODES = [
  { x: 8, y: 18 }, { x: 22, y: 9 }, { x: 38, y: 22 }, { x: 16, y: 40 },
  { x: 34, y: 46 }, { x: 52, y: 14 }, { x: 63, y: 30 }, { x: 48, y: 58 },
  { x: 28, y: 68 }, { x: 68, y: 55 }, { x: 82, y: 22 }, { x: 90, y: 44 },
  { x: 78, y: 68 }, { x: 12, y: 82 }, { x: 44, y: 84 }, { x: 92, y: 78 },
];

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

const EDGES: [number, number][] = [];
for (let i = 0; i < NODES.length; i++) {
  for (let j = i + 1; j < NODES.length; j++) {
    if (distance(NODES[i], NODES[j]) < 26) EDGES.push([i, j]);
  }
}

export default function HeroBackground() {
  const shouldReduceMotion = useReducedMotion();

  const blobs = useMemo(
    () => [
      { size: 480, top: "-10%", left: "0%", color: "var(--glow-primary)", duration: 22 },
      { size: 420, top: "20%", left: "62%", color: "var(--glow-secondary)", duration: 26 },
      { size: 360, top: "58%", left: "20%", color: "var(--glow-tertiary)", duration: 30 },
    ],
    []
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ opacity: "var(--mesh-opacity)" }}
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            background: blob.color,
            filter: "blur(90px)",
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 30, -20, 0],
                  y: [0, -24, 18, 0],
                }
          }
          transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {EDGES.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={`${NODES[a].x}%`}
            y1={`${NODES[a].y}%`}
            x2={`${NODES[b].x}%`}
            y2={`${NODES[b].y}%`}
            stroke="var(--mesh-line)"
            strokeWidth={1}
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldReduceMotion ? 0.5 : [0.15, 0.5, 0.15] }}
            transition={{ duration: 6 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: (i % 7) * 0.4 }}
          />
        ))}
        {NODES.map((node, i) => (
          <motion.circle
            key={i}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={2.5}
            fill="var(--mesh-dot)"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: shouldReduceMotion ? 0.6 : [0.3, 0.9, 0.3] }}
            transition={{ duration: 4 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: (i % 6) * 0.3 }}
          />
        ))}
      </svg>
    </div>
  );
}
