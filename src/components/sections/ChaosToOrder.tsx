"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
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
  RotateCcw,
  ServerCog,
  StickyNote,
  UserCheck,
} from "lucide-react";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";

/**
 * Home page, "The shift": a short film that plays by itself once it is on
 * screen. A week of manual work is scattered across the stage; it is pulled
 * into one system; one workflow comes out and lights up step by step. Each
 * stage holds long enough to read, it pauses while off screen, it ends on the
 * finished workflow, and Replay runs it again. No scroll coupling.
 */

const MESS = [
  { icon: FileSpreadsheet, label: "marks_final_v3 (2).xlsx", left: 4, top: 8, rot: -6, wide: false },
  { icon: Mail, label: "Re: Fwd: approval needed?", left: 56, top: 4, rot: 5, wide: false },
  { icon: MessageCircle, label: "Can you send today's scores?", left: 26, top: 26, rot: -3, wide: false },
  { icon: Printer, label: "Worksheets, still to mark", left: 64, top: 32, rot: 7, wide: false },
  { icon: StickyNote, label: "Who has the latest version?", left: 2, top: 50, rot: 4, wide: false },
  { icon: NotebookPen, label: "Fees notebook, page 14", left: 40, top: 58, rot: -5, wide: false },
  { icon: CalendarDays, label: "Assessment dates (draft)", left: 64, top: 72, rot: -4, wide: true },
  { icon: PhoneMissed, label: "Missed call: a parent", left: 10, top: 80, rot: 6, wide: true },
  { icon: FileText, label: "Report_FINAL_final.docx", left: 38, top: 88, rot: 3, wide: true },
];

const FLOW = [
  { icon: Inbox, label: "Work comes in", note: "One place, every time" },
  { icon: ServerCog, label: "Rules applied", note: "Scored and timed on the server" },
  { icon: UserCheck, label: "Approved by role", note: "Every decision on record" },
  { icon: LineChart, label: "Reported live", note: "Compared period on period" },
];

const STAGES = [
  { eyebrow: "Before", title: "Spreadsheets, threads, paper. Every single week." },
  { eyebrow: "The shift", title: "One system takes all of it in." },
  { eyebrow: "After", title: "And runs it the same way, every day." },
];

// Phone layout: the six cards shown there, staggered so none runs off screen.
const NARROW = [
  { left: 0, top: 3, rot: -4 },
  { left: 14, top: 18, rot: 3 },
  { left: 2, top: 34, rot: -2 },
  { left: 16, top: 50, rot: 4 },
  { left: 0, top: 66, rot: -3 },
  { left: 12, top: 82, rot: 2 },
];

// Milliseconds each step is held: before, shift, then the four workflow steps.
const HOLD = [3600, 3000, 1300, 1300, 1300, 1300];
const LAST = HOLD.length; // the step once everything has played

export default function ChaosToOrder() {
  const reduce = useSafeReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [step, setStep] = useState(0);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => setNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const current = reduce ? LAST : step;

  useEffect(() => {
    if (reduce || !inView || step >= LAST) return;
    const t = setTimeout(() => setStep((s) => s + 1), HOLD[step]);
    return () => clearTimeout(t);
  }, [step, inView, reduce]);

  const stage = current === 0 ? 0 : current === 1 ? 1 : 2;
  const lit = Math.max(0, current - 2); // workflow steps lit so far
  const collapsed = current >= 1;
  const showFlow = current >= 2;
  const progress = Math.min(1, current / LAST);

  return (
    <div ref={ref} className="glass-panel relative overflow-hidden px-4 pb-6 pt-8 sm:px-8 sm:pt-10">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" style={{ maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)" }} aria-hidden="true" />

      {/* Caption */}
      <div className="relative text-center">
        <AnimatePresence mode="wait">
          <motion.div key={stage} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
            <p className="eyebrow mb-2">{STAGES[stage].eyebrow}</p>
            <p className="mx-auto max-w-2xl text-balance font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] sm:text-3xl" style={{ color: "var(--text-primary)" }}>
              {STAGES[stage].title}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="mx-auto mt-4 h-[3px] w-32 overflow-hidden rounded-full" style={{ background: "var(--border-subtle)" }}>
          <motion.div
            className="h-full rounded-full"
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.6 }}
            style={{ background: "linear-gradient(90deg, var(--accent-strong), var(--accent))" }}
          />
        </div>
      </div>

      {/* Stage */}
      <div className="relative mx-auto mt-6 h-[420px] max-w-5xl sm:h-[440px]">
        {MESS.map((m, i) => {
          const Icon = m.icon;
          const pos = narrow ? (NARROW[i] ?? { left: 0, top: 0, rot: 0 }) : m;
          return (
            <motion.div
              key={m.label}
              className={`absolute items-center gap-2 whitespace-nowrap rounded-xl border px-3 py-2 shadow-lg sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3 ${m.wide ? "hidden sm:flex" : "flex"}`}
              style={{ borderColor: "var(--border-subtle)", background: "var(--bg-raised)" }}
              initial={false}
              animate={
                collapsed
                  ? { left: "50%", top: "50%", x: "-50%", y: "-50%", rotate: 0, scale: 0.2, opacity: 0 }
                  : { left: `${pos.left}%`, top: `${pos.top}%`, x: "0%", y: "0%", rotate: pos.rot, scale: 1, opacity: 1 }
              }
              transition={reduce ? { duration: 0 } : { duration: collapsed ? 1.1 : 0.6, delay: collapsed ? i * 0.07 : i * 0.04, ease: [0.65, 0, 0.35, 1] }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-lg sm:h-7 sm:w-7" style={{ background: "var(--bg-base)", color: "var(--status-dev)" }}>
                <Icon size={13} />
              </span>
              <span className="text-xs font-medium sm:text-sm" style={{ color: "var(--text-secondary)" }}>
                {m.label}
              </span>
            </motion.div>
          );
        })}

        {/* The system in the middle */}
        <motion.div
          className="absolute left-1/2 top-1/2"
          initial={false}
          animate={{ x: "-50%", y: "-50%", scale: current === 1 ? 1.1 : 0.6, opacity: current === 1 ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="core-ring absolute -inset-8 rounded-full" aria-hidden="true" />
          <div className="absolute -inset-24 rounded-full" style={{ background: "radial-gradient(closest-side, var(--glow-primary), transparent)" }} aria-hidden="true" />
          <div className="relative h-28 w-28 overflow-hidden rounded-[1.8rem] border sm:h-32 sm:w-32" style={{ borderColor: "var(--glass-border)", background: "#060a0b", boxShadow: "0 30px 70px -20px var(--accent-glow)" }}>
            <Image src="/logo-mark.png" alt="" fill sizes="128px" className="object-cover" />
          </div>
        </motion.div>

        {/* The workflow that comes out */}
        <motion.div
          className="absolute inset-x-0 top-1/2"
          initial={false}
          animate={{ opacity: showFlow ? 1 : 0, y: showFlow ? "-50%" : "-40%" }}
          transition={{ duration: reduce ? 0 : 0.6 }}
          aria-hidden={!showFlow}
        >
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px sm:block" style={{ background: "var(--border-strong)" }} aria-hidden="true" />
            <motion.div
              className="absolute left-[12.5%] top-8 hidden h-[2px] sm:block"
              initial={false}
              animate={{ width: `${(Math.max(0, lit - 1) / (FLOW.length - 1)) * 75}%` }}
              transition={{ duration: reduce ? 0 : 0.9, ease: "easeInOut" }}
              style={{ background: "linear-gradient(90deg, var(--accent-strong), var(--accent))" }}
              aria-hidden="true"
            />
            <div className="relative grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-6">
              {FLOW.map((s, i) => {
                const Icon = s.icon;
                const on = i < lit;
                return (
                  <div key={s.label} className="flex flex-col items-center text-center">
                    <div
                      className="relative flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-500"
                      style={{
                        borderColor: on ? "transparent" : "var(--glass-border)",
                        background: on ? "linear-gradient(150deg, var(--accent-strong), var(--accent))" : "var(--bg-raised)",
                        boxShadow: on ? "0 18px 40px -14px var(--accent-glow)" : "none",
                      }}
                    >
                      <Icon size={22} style={{ color: on ? "var(--text-on-accent)" : "var(--text-muted)" }} />
                    </div>
                    <p className="mt-4 font-display text-sm font-bold sm:text-base" style={{ color: "var(--text-primary)" }}>
                      {s.label}
                    </p>
                    <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                      {s.note}
                    </p>
                    <CheckCircle2 size={16} className="mt-2 transition-opacity duration-500" style={{ color: "var(--status-live)", opacity: on ? 1 : 0.15 }} />
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Replay */}
      <div className="relative flex h-10 justify-center">
        <AnimatePresence>
          {!reduce && current >= LAST && (
            <motion.button
              type="button"
              onClick={() => setStep(0)}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors hover:border-[var(--accent)]"
              style={{ borderColor: "var(--glass-border)", background: "var(--glass-bg)", color: "var(--text-primary)" }}
            >
              <RotateCcw size={14} style={{ color: "var(--accent)" }} /> Replay
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
