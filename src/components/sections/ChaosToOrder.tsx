"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  Inbox,
  LineChart,
  Mail,
  MessageCircle,
  NotebookPen,
  PhoneMissed,
  Printer,
  ServerCog,
  StickyNote,
  UserCheck,
} from "lucide-react";

/**
 * Home page, "The shift": a pinned, scroll-driven sequence. The visitor
 * scrolls through a week of manual work (files, threads, paper, notebooks)
 * scattered across the stage; it is pulled into one system; and out comes a
 * single workflow that lights up step by step. Desktop only (see `pin`);
 * smaller screens get ManualToSystem instead.
 */

const MESS = [
  { icon: FileSpreadsheet, label: "marks_final_v3 (2).xlsx", left: 6, top: 11, rot: -7 },
  { icon: Mail, label: "Re: Fwd: approval needed?", left: 62, top: 5, rot: 5 },
  { icon: MessageCircle, label: "Can you send today's scores?", left: 30, top: 25, rot: -3 },
  { icon: Printer, label: "Worksheets, still to mark", left: 74, top: 32, rot: 8 },
  { icon: StickyNote, label: "Who has the latest version?", left: 2, top: 46, rot: 4 },
  { icon: NotebookPen, label: "Fees notebook, page 14", left: 44, top: 53, rot: -6 },
  { icon: CalendarDays, label: "Assessment dates (draft)", left: 70, top: 63, rot: -4 },
  { icon: PhoneMissed, label: "Missed call: a parent", left: 16, top: 70, rot: 6 },
  { icon: FileText, label: "Report_FINAL_final.docx", left: 50, top: 77, rot: 3 },
];

const FLOW = [
  { icon: Inbox, label: "Work comes in", note: "One place, every time" },
  { icon: ServerCog, label: "Rules applied", note: "Scored and timed on the server" },
  { icon: UserCheck, label: "Approved by role", note: "Every decision on record" },
  { icon: LineChart, label: "Reported live", note: "Compared period on period" },
];

const PHASES = [
  { eyebrow: "Before", title: "Spreadsheets, threads, paper. Every single week." },
  { eyebrow: "The shift", title: "One system takes all of it in." },
  { eyebrow: "After", title: "And runs it the same way, every day." },
];

function MessCard({ item, i, p }: { item: (typeof MESS)[number]; i: number; p: MotionValue<number> }) {
  const Icon = item.icon;
  const start = 0.26 + i * 0.018;
  const end = start + 0.2;
  const left = useTransform(p, [start, end], [`${item.left}%`, "50%"]);
  const top = useTransform(p, [start, end], [`${item.top}%`, "50%"]);
  const x = useTransform(p, [start, end], ["0%", "-50%"]);
  const y = useTransform(p, [0, 0.25, start, end], [18 * ((i % 3) - 1), 0, 0, -20]);
  const rotate = useTransform(p, [0, start, end], [item.rot * 1.4, item.rot, 0]);
  const scale = useTransform(p, [start, end], [1, 0.25]);
  const opacity = useTransform(p, [end - 0.05, end], [1, 0]);
  return (
    <motion.div
      className="absolute flex items-center gap-3 whitespace-nowrap rounded-2xl border px-4 py-3 shadow-xl"
      style={{ left, top, x, y, rotate, scale, opacity, borderColor: "var(--border-subtle)", background: "var(--bg-raised)" }}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "var(--bg-base)", color: "var(--status-dev)" }}>
        <Icon size={14} />
      </span>
      <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
        {item.label}
      </span>
    </motion.div>
  );
}

function FlowNode({ step, i, p }: { step: (typeof FLOW)[number]; i: number; p: MotionValue<number> }) {
  const Icon = step.icon;
  const at = 0.6 + i * 0.07;
  const opacity = useTransform(p, [at, at + 0.06], [0, 1]);
  const y = useTransform(p, [at, at + 0.06], [24, 0]);
  const lit = useTransform(p, [at + 0.04, at + 0.08], [0, 1]);
  return (
    <motion.div className="relative flex flex-col items-center text-center" style={{ opacity, y }}>
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border" style={{ borderColor: "var(--glass-border)", background: "var(--bg-raised)" }}>
        <motion.span className="absolute inset-0 rounded-2xl" style={{ opacity: lit, background: "linear-gradient(150deg, var(--accent-strong), var(--accent))", boxShadow: "0 18px 40px -14px var(--accent-glow)" }} />
        <Icon size={22} className="relative" style={{ color: "var(--text-on-accent)" }} />
      </div>
      <p className="mt-4 font-display text-base font-bold" style={{ color: "var(--text-primary)" }}>
        {step.label}
      </p>
      <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
        {step.note}
      </p>
      <motion.span className="mt-2" style={{ opacity: lit }}>
        <CheckCircle2 size={16} style={{ color: "var(--status-live)" }} />
      </motion.span>
    </motion.div>
  );
}

export default function ChaosToOrder() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [phase, setPhase] = useState(0);
  useMotionValueEvent(p, "change", (v) => setPhase(v < 0.28 ? 0 : v < 0.6 ? 1 : 2));

  const coreScale = useTransform(p, [0.2, 0.36, 0.5, 0.6], [0.4, 1, 1.12, 0.9]);
  const coreOpacity = useTransform(p, [0.2, 0.32, 0.56, 0.64], [0, 1, 1, 0]);
  const ring = useTransform(p, [0.3, 0.56], [0, 1]);
  const lineScale = useTransform(p, [0.62, 0.86], [0, 1]);
  const outro = useTransform(p, [0.88, 0.95], [0, 1]);
  const progress = useTransform(p, [0, 1], ["0%", "100%"]);
  const baseLine = useTransform(p, [0.58, 0.64], [0, 1]);

  return (
    <div ref={ref} className="relative hidden pin:block" style={{ height: "300vh" }}>
      <div className="sticky top-[88px] flex h-[calc(100vh-88px)] flex-col">
        <div className="container-custom pt-[3vh] text-center">
          <motion.div key={phase} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <p className="eyebrow mb-3">{PHASES[phase].eyebrow}</p>
            <h2 className="mx-auto max-w-3xl text-balance font-display text-[clamp(2rem,5vh,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.035em]" style={{ color: "var(--text-primary)" }}>
              {PHASES[phase].title}
            </h2>
          </motion.div>
          <div className="mx-auto mt-5 h-[3px] w-40 overflow-hidden rounded-full" style={{ background: "var(--border-subtle)" }}>
            <motion.div className="h-full rounded-full" style={{ width: progress, background: "linear-gradient(90deg, var(--accent-strong), var(--accent))" }} />
          </div>
        </div>

        <div className="container-custom relative min-h-0 flex-1">
          <div className="relative h-full">
            {MESS.map((m, i) => (
              <MessCard key={m.label} item={m} i={i} p={p} />
            ))}

            {/* The system in the middle */}
            <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ scale: coreScale, opacity: coreOpacity }}>
              <motion.div className="core-ring absolute -inset-8 rounded-full" style={{ opacity: ring }} aria-hidden="true" />
              <div className="absolute -inset-24 rounded-full" style={{ background: "radial-gradient(closest-side, var(--glow-primary), transparent)" }} aria-hidden="true" />
              <div className="relative h-32 w-32 overflow-hidden rounded-[2rem] border" style={{ borderColor: "var(--glass-border)", background: "#060a0b", boxShadow: "0 30px 70px -20px var(--accent-glow)" }}>
                <Image src="/logo-mark.png" alt="" fill sizes="128px" className="object-cover" />
              </div>
            </motion.div>

            {/* The workflow that comes out */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
              <div className="relative mx-auto max-w-4xl">
                <motion.div className="absolute left-[12%] right-[12%] top-8 h-px" style={{ opacity: baseLine, background: "var(--border-strong)" }} aria-hidden="true" />
                <motion.div
                  className="absolute left-[12%] right-[12%] top-8 h-[2px] origin-left"
                  style={{ scaleX: lineScale, background: "linear-gradient(90deg, var(--accent-strong), var(--accent))" }}
                  aria-hidden="true"
                />
                <div className="relative grid grid-cols-4 gap-6">
                  {FLOW.map((s, i) => (
                    <FlowNode key={s.label} step={s} i={i} p={p} />
                  ))}
                </div>
                <motion.div className="mt-10 flex justify-center" style={{ opacity: outro }}>
                  <Link href="/products/mathpath" className="group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold" style={{ borderColor: "var(--glass-border)", background: "var(--glass-bg)", color: "var(--text-primary)" }}>
                    <span className="status-dot pulse-dot" style={{ backgroundColor: "var(--status-live)" }} />
                    This is how the MathPath Platform runs a whole abacus program
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" style={{ color: "var(--accent)" }} />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
