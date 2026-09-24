"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowDown,
  BrainCircuit,
  CheckCircle2,
  FileSpreadsheet,
  Inbox,
  LineChart,
  Mail,
  MessageCircle,
  Printer,
  StickyNote,
  UserCheck,
} from "lucide-react";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";

/**
 * The home hero's centerpiece: Zetta Metrics' whole proposition in one
 * picture. Scattered manual work (spreadsheets, email chains, chat
 * follow-ups, paper) drifts on the left, flows into the platform in the
 * middle, and comes out the right as a clean pipeline where work visibly
 * moves step by step. Purely illustrative — generic, no data claims.
 */

const MESS = [
  { icon: FileSpreadsheet, label: "marks_final_v3 (2).xlsx", tag: "Outdated", rot: -3, dx: 0 },
  { icon: Mail, label: "Re: Fwd: approval needed?", tag: "No reply", rot: 2, dx: 22 },
  { icon: MessageCircle, label: "Please send today's scores", tag: "Chasing", rot: -1.5, dx: 6 },
  { icon: Printer, label: "Printed worksheets — to mark", tag: "Pending", rot: 2.5, dx: 26 },
  { icon: StickyNote, label: "Who has the latest version?", tag: "Unclear", rot: -2, dx: 2 },
];

const PIPELINE = [
  { icon: Inbox, label: "Intake", status: "Automated" },
  { icon: BrainCircuit, label: "AI scoring", status: "Server-side" },
  { icon: UserCheck, label: "Approval", status: "Role-based" },
  { icon: LineChart, label: "Live report", status: "Real-time" },
];

// Vertical centers (in %) of the evenly spaced items on each side, used to
// aim the connector curves in the SVG gutters.
const MESS_Y = [10, 30, 50, 70, 90];
const PIPE_Y = [12.5, 37.5, 62.5, 87.5];

function Gutter({ ys, direction }: { ys: number[]; direction: "in" | "out" }) {
  return (
    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {ys.map((y) => {
        const d = direction === "in" ? `M0 ${y} C 55 ${y}, 45 50, 100 50` : `M0 50 C 55 50, 45 ${y}, 100 ${y}`;
        return (
          <g key={y}>
            <path d={d} fill="none" stroke="var(--border-strong)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <path
              d={d}
              fill="none"
              stroke={direction === "in" ? "var(--status-dev)" : "var(--accent)"}
              strokeWidth="1.5"
              strokeDasharray="3 9"
              vectorEffect="non-scaling-stroke"
              className="flow-dash"
              opacity={0.9}
            />
          </g>
        );
      })}
    </svg>
  );
}

function MessCard({ item, i, reduce }: { item: (typeof MESS)[number]; i: number; reduce: boolean }) {
  const Icon = item.icon;
  return (
    <motion.div
      className="flex items-center gap-2.5 rounded-xl border px-3 py-2.5 shadow-sm"
      style={{
        borderColor: "var(--border-subtle)",
        background: "var(--bg-raised)",
        rotate: item.rot,
        marginLeft: item.dx,
      }}
      animate={reduce ? undefined : { y: [0, -4, 0, 3, 0] }}
      transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: "var(--bg-base)", color: "var(--text-muted)" }}>
        <Icon size={14} />
      </span>
      <span className="min-w-0 flex-1 truncate text-[0.72rem] font-medium" style={{ color: "var(--text-secondary)" }}>
        {item.label}
      </span>
      <span
        className="hidden shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider sm:flex"
        style={{ background: "color-mix(in srgb, var(--status-dev) 14%, transparent)", color: "var(--status-dev)" }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--status-dev)" }} />
        {item.tag}
      </span>
    </motion.div>
  );
}

function PipeNode({ step, active, done }: { step: (typeof PIPELINE)[number]; active: boolean; done: boolean }) {
  const Icon = step.icon;
  return (
    <div
      className="flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all duration-500"
      style={{
        borderColor: active ? "var(--accent)" : "var(--border-subtle)",
        background: active ? "var(--accent-soft)" : "var(--bg-raised)",
        boxShadow: active ? "0 0 0 4px var(--accent-soft), 0 10px 30px -12px var(--accent-glow)" : "none",
        transform: active ? "translateX(-4px)" : "none",
      }}
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-500"
        style={{
          background: active ? "linear-gradient(150deg, var(--accent-strong), var(--accent))" : "var(--bg-base)",
          color: active ? "var(--text-on-accent)" : "var(--accent)",
        }}
      >
        <Icon size={15} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.8rem] font-bold" style={{ color: "var(--text-primary)" }}>
          {step.label}
        </span>
        <span className="block text-[0.66rem] font-medium" style={{ color: "var(--text-muted)" }}>
          {step.status}
        </span>
      </span>
      <CheckCircle2 size={16} className="shrink-0 transition-opacity duration-500" style={{ color: "var(--status-live)", opacity: done || active ? 1 : 0.2 }} />
    </div>
  );
}

function Core({ small = false }: { small?: boolean }) {
  const size = small ? "h-20 w-20" : "h-28 w-28";
  return (
    <div className="relative flex flex-col items-center">
      <div className={`relative ${size}`}>
        <div className="core-ring absolute -inset-4 rounded-full" aria-hidden="true" />
        <div className="absolute -inset-10 rounded-full blur-2xl" style={{ background: "radial-gradient(circle, var(--glow-primary), transparent 70%)" }} aria-hidden="true" />
        <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] border" style={{ borderColor: "var(--glass-border)", background: "#060a0b", boxShadow: "0 20px 50px -12px var(--accent-glow)" }}>
          <Image src="/logo-mark.png" alt="" fill sizes="112px" className="object-cover" />
        </div>
      </div>
      <span className="mt-5 whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>
        Zetta platform
      </span>
    </div>
  );
}

export default function ManualToSystem() {
  const reduce = useSafeReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % PIPELINE.length), 1400);
    return () => clearInterval(t);
  }, [reduce]);

  const colLabel = (text: string, tone: string) => (
    <p className="mb-4 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.18em]" style={{ color: tone }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone }} />
      {text}
    </p>
  );

  return (
    <div className="glass-panel relative overflow-hidden p-5 sm:p-8 lg:p-10">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" style={{ maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)" }} aria-hidden="true" />

      {/* Desktop: side-by-side flow */}
      <div className="relative hidden lg:grid lg:grid-cols-[1fr_90px_auto_90px_1fr] lg:items-stretch">
        <div>
          {colLabel("Today: by hand", "var(--status-dev)")}
          <div className="flex h-[340px] flex-col justify-around">
            {MESS.map((m, i) => (
              <MessCard key={m.label} item={m} i={i} reduce={reduce} />
            ))}
          </div>
        </div>
        <div className="pt-8">
          <div className="h-[340px]">
            <Gutter ys={MESS_Y} direction="in" />
          </div>
        </div>
        <div className="flex items-center justify-center px-2 pt-8">
          <Core />
        </div>
        <div className="pt-8">
          <div className="h-[340px]">
            <Gutter ys={PIPE_Y} direction="out" />
          </div>
        </div>
        <div>
          {colLabel("With Zetta: an intelligent workflow", "var(--accent)")}
          <div className="flex h-[340px] flex-col justify-around">
            {PIPELINE.map((p, i) => (
              <PipeNode key={p.label} step={p} active={!reduce && i === active} done={reduce || i < active} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / tablet: stacked flow */}
      <div className="relative lg:hidden">
        {colLabel("Today: by hand", "var(--status-dev)")}
        <div className="space-y-2.5">
          {MESS.slice(0, 4).map((m, i) => (
            <MessCard key={m.label} item={{ ...m, dx: 0, rot: m.rot / 2 }} i={i} reduce={reduce} />
          ))}
        </div>
        <div className="my-7 flex flex-col items-center gap-5">
          <ArrowDown size={18} style={{ color: "var(--text-muted)" }} />
          <Core small />
          <ArrowDown size={18} style={{ color: "var(--accent)" }} />
        </div>
        {colLabel("With Zetta: an intelligent workflow", "var(--accent)")}
        <div className="grid gap-2.5 sm:grid-cols-2">
          {PIPELINE.map((p, i) => (
            <PipeNode key={p.label} step={p} active={!reduce && i === active} done={reduce || i < active} />
          ))}
        </div>
      </div>
    </div>
  );
}
