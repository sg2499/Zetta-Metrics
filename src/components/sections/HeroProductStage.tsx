"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ChevronRight, Coins, Medal, Receipt, UserCheck } from "lucide-react";
import { mathpathWorkspaces } from "@/lib/content";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";

const TURN_MS = 4200;

// Where each card sits: 0 = front, 1 = back left, 2 = back right.
const SLOTS = [
  { x: "0%", y: 34, scale: 1, rotateY: 0, rotateZ: 0, opacity: 1, zIndex: 3, filter: "saturate(1) brightness(1)" },
  { x: "-21%", y: -18, scale: 0.8, rotateY: 16, rotateZ: -2, opacity: 0.9, zIndex: 1, filter: "saturate(0.85) brightness(0.92)" },
  { x: "21%", y: -36, scale: 0.76, rotateY: -16, rotateZ: 2, opacity: 0.9, zIndex: 2, filter: "saturate(0.85) brightness(0.92)" },
];

// A moment from each workspace, floated beside the front card.
const MOMENTS: Record<string, { icon: typeof Medal; title: string; detail: string }[]> = {
  student: [
    { icon: Medal, title: "Rank up", detail: "Bronze II to Bronze III" },
    { icon: Coins, title: "MathCoins earned", detail: "Sheet cleared on the first try" },
  ],
  teacher: [
    { icon: UserCheck, title: "Next lesson assigned", detail: "Five sheets, ready for today" },
    { icon: CheckCircle2, title: "Re-attempt approved", detail: "Back in the student's queue" },
  ],
  admin: [
    { icon: Receipt, title: "Day closed", detail: "Cash counted, receipts matched" },
    { icon: CheckCircle2, title: "Results released", detail: "Certificates ready to download" },
  ],
};

/**
 * The home hero's centrepiece: the live MathPath Platform itself. Three real
 * workspace screens (Student, Teacher, Admin) stand in a fan; every few
 * seconds the next one steps forward, with a moment from that workspace
 * floating beside it. The whole stage leans toward the pointer.
 */
export default function HeroProductStage() {
  const reduce = useSafeReducedMotion();
  const [turn, setTurn] = useState(0);
  const [hover, setHover] = useState(false);
  const stage = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (reduce || hover) return;
    const t = setInterval(() => setTurn((n) => n + 1), TURN_MS);
    return () => clearInterval(t);
  }, [reduce, hover]);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !stage.current) return;
    const r = stage.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
    setHover(false);
  };

  const count = mathpathWorkspaces.length;
  const frontIndex = ((turn % count) + count) % count;
  const front = mathpathWorkspaces[frontIndex];
  const moments = MOMENTS[front.id] ?? [];

  return (
    <div
      ref={stage}
      onPointerMove={onMove}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={onLeave}
      className="relative h-full w-full select-none"
    >
      <div className="pointer-events-none absolute inset-[6%] rounded-full opacity-80 blur-3xl" style={{ background: "radial-gradient(closest-side, var(--glow-primary), transparent)" }} aria-hidden="true" />

      <motion.div className="absolute inset-0" style={{ rotateX: rx, rotateY: ry, transformPerspective: 1600 }}>
        {mathpathWorkspaces.map((w, i) => {
          const slot = SLOTS[(((i - turn) % count) + count) % count];
          const isFront = slot === SLOTS[0];
          const screen = w.screens[0];
          return (
            <motion.button
              key={w.id}
              type="button"
              onClick={() => setTurn(turn + ((((i - turn) % count) + count) % count))}
              aria-label={`Bring the ${w.label} workspace forward`}
              className="absolute left-[6%] top-[13%] w-[88%] cursor-pointer text-left"
              initial={false}
              animate={slot}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 70, damping: 17, mass: 0.9 }}
              style={{ transformPerspective: 1400 }}
            >
              <div
                className="overflow-hidden rounded-2xl border"
                style={{
                  borderColor: "var(--glass-border)",
                  background: "var(--bg-elevated)",
                  boxShadow: isFront ? "0 40px 90px -30px rgba(2,8,23,0.55), 0 0 0 1px var(--glass-border)" : "0 24px 60px -30px rgba(2,8,23,0.45)",
                }}
              >
                <div className="flex items-center gap-1.5 border-b px-3 py-2" style={{ borderColor: "var(--border-subtle)" }}>
                  <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                  <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                  <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                  <span className="ml-2 flex items-center gap-1 text-[0.62rem] font-semibold" style={{ color: "var(--text-muted)" }}>
                    MathPath <ChevronRight size={9} /> {w.label}
                  </span>
                </div>
                <div className="relative" style={{ aspectRatio: "16 / 9.5", background: "#f3f4fb" }}>
                  <Image src={screen.src} alt={`MathPath Platform, ${w.label} workspace`} fill priority={i === 0} sizes="(min-width: 1024px) 620px, 90vw" className="object-cover object-left-top" />
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Moments from the workspace in front */}
      <div className="pointer-events-none absolute inset-0" aria-live="polite">
        {moments.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={`${front.id}-${m.title}`}
              initial={reduce ? false : { opacity: 0, y: 14, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: reduce ? 0 : 0.35 + i * 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute flex items-center gap-3 rounded-2xl border px-3.5 py-2.5 shadow-xl ${i === 0 ? "-left-1 bottom-[14%] sm:left-0" : "right-0 top-[8%] sm:-right-2"}`}
              style={{ borderColor: "var(--glass-border)", background: "var(--glass-bg-strong, var(--bg-raised))", backdropFilter: "blur(14px)" }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ background: "linear-gradient(150deg, var(--accent-strong), var(--accent))", color: "var(--text-on-accent)" }}>
                <Icon size={15} />
              </span>
              <span>
                <span className="block text-[0.78rem] font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
                  {m.title}
                </span>
                <span className="block text-[0.66rem] font-medium" style={{ color: "var(--text-muted)" }}>
                  {m.detail}
                </span>
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Caption and workspace switcher */}
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-1 rounded-full border p-1" style={{ borderColor: "var(--glass-border)", background: "var(--glass-bg)", backdropFilter: "blur(12px)" }}>
          {mathpathWorkspaces.map((w, i) => {
            const on = i === frontIndex;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => setTurn(turn + ((((i - turn) % count) + count) % count))}
                className="rounded-full px-3 py-1 text-[0.7rem] font-bold transition-colors"
                style={{ background: on ? "var(--accent-soft)" : "transparent", color: on ? "var(--text-primary)" : "var(--text-muted)" }}
              >
                {w.label}
              </button>
            );
          })}
        </div>
        <Link href="/products/mathpath" className="group inline-flex items-center gap-1 text-[0.72rem] font-semibold" style={{ color: "var(--text-secondary)" }}>
          <span className="status-dot pulse-dot mr-1" style={{ backgroundColor: "var(--status-live)" }} />
          Live: the MathPath Platform
          <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
