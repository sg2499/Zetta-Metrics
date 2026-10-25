"use client";

import { motion } from "framer-motion";
import { Crown, Film, Sparkles, Music2 } from "lucide-react";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";

/**
 * The MathPath rank ladder: 34 divisions from Copper to Champion, drawn as a
 * climbing run of medallions that light up in turn. Illustrative artwork of
 * the real structure (34 divisions); the colours move from copper to gold to
 * the platform teal.
 */
const DIVISIONS = 34;
const W = 1000;
const H = 340;

function colourAt(t: number) {
  // copper → gold → teal
  const stops = [
    [184, 105, 58],
    [245, 196, 81],
    [47, 225, 214],
  ];
  const seg = t < 0.55 ? 0 : 1;
  const local = seg === 0 ? t / 0.55 : (t - 0.55) / 0.45;
  const a = stops[seg];
  const b = stops[seg + 1];
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * local));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

const nodes = Array.from({ length: DIVISIONS }, (_, i) => {
  const t = i / (DIVISIONS - 1);
  return { i, t, x: 36 + t * (W - 72), y: H - 44 - Math.pow(t, 1.7) * (H - 112), r: 5 + t * 5, c: colourAt(t) };
});

export default function RankLadder() {
  const reduce = useSafeReducedMotion();
  const path = nodes.map((n, i) => `${i === 0 ? "M" : "L"}${n.x.toFixed(1)} ${n.y.toFixed(1)}`).join(" ");
  const last = nodes[nodes.length - 1];

  return (
    <div className="product-frame">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b px-5 py-3" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-elevated)" }}>
        <span className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
          The road from Copper to Champion
        </span>
        <span className="font-mono text-xs font-semibold" style={{ color: "var(--accent)" }}>34 divisions</span>
      </div>
      <div className="dot-grid px-3 pb-4 pt-6 sm:px-8 sm:pb-6">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="A climbing run of 34 rank medallions from Copper to Champion">
          <defs>
            <linearGradient id="rank-line" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="rgb(184,105,58)" />
              <stop offset="0.55" stopColor="rgb(245,196,81)" />
              <stop offset="1" stopColor="rgb(47,225,214)" />
            </linearGradient>
            <radialGradient id="rank-halo">
              <stop offset="0" stopColor="rgb(47,225,214)" stopOpacity="0.55" />
              <stop offset="1" stopColor="rgb(47,225,214)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <motion.path
            d={path}
            fill="none"
            stroke="url(#rank-line)"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeOpacity={0.5}
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
          />
          <circle cx={last.x} cy={last.y} r={46} fill="url(#rank-halo)" className="rank-glow" style={{ animation: "rank-glow 3.4s ease-in-out infinite" }} />
          {nodes.map((n) => (
            <motion.g
              key={n.i}
              initial={reduce ? false : { opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.15 + n.i * 0.055, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${n.x}px ${n.y}px`, transformBox: "fill-box" }}
            >
              <circle cx={n.x} cy={n.y} r={n.r + 3} fill={n.c} opacity={0.16} />
              <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} />
              <circle cx={n.x - n.r * 0.3} cy={n.y - n.r * 0.3} r={n.r * 0.32} fill="#fff" opacity={0.55} />
            </motion.g>
          ))}
          <text x={nodes[0].x} y={H - 10} textAnchor="start" fontSize="15" fontWeight="700" fill="rgb(184,105,58)" letterSpacing="2">COPPER</text>
          <text x={last.x} y={last.y - 28} textAnchor="end" fontSize="15" fontWeight="700" fill="rgb(47,225,214)" letterSpacing="2">CHAMPION</text>
        </svg>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {[
            { icon: Sparkles, t: "Forged 3D medallions" },
            { icon: Film, t: "A cut scene on every rank-up" },
            { icon: Music2, t: "Its own soundtrack" },
            { icon: Crown, t: "XP, badges and podium leaderboards" },
          ].map(({ icon: Icon, t }) => (
            <span key={t} className="focus-chip">
              <Icon size={13} strokeWidth={2.2} style={{ color: "var(--accent)" }} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
