"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Inbox, LineChart, Pause, Play, RotateCcw, ServerCog, UserCheck } from "lucide-react";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";

/**
 * Home page, "The shift": a three-chapter film in one panel sized to the
 * screen, so it is always seen whole.
 *   Before    - a week of manual work drifts on the stage as real objects.
 *   The shift - each object glides into the Zetta mark.
 *   After     - one workflow lights up step by step.
 * It plays once the panel is fully in view, pauses when it leaves, and the
 * chapter bar lets the visitor jump, pause or replay.
 */

const CHAPTERS = [
  { label: "Before", caption: "Spreadsheets, email threads, chat follow-ups and paper. Every single week.", ms: 5200 },
  { label: "The shift", caption: "One system takes all of it in.", ms: 3400 },
  { label: "After", caption: "And runs it the same way, every day. Every step on record.", ms: 6400 },
];
const TICK = 50;

/* ---------- Chapter 1: the objects ---------- */

function Spreadsheet() {
  const rows = [
    ["Name", "Q1", "Q2", "Total"],
    ["A. Sen", "18", "16", "34"],
    ["R. Das", "15", "#REF!", "—"],
    ["P. Roy", "17", "19", "36"],
  ];
  return (
    <div className="w-[250px] overflow-hidden rounded-xl border shadow-2xl" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-raised)" }}>
      <div className="flex items-center gap-2 border-b px-3 py-2" style={{ borderColor: "var(--border-subtle)" }}>
        <span className="flex h-5 w-5 items-center justify-center rounded bg-[#1f7a46] text-[0.55rem] font-bold text-white">X</span>
        <span className="truncate text-[0.72rem] font-semibold" style={{ color: "var(--text-primary)" }}>marks_final_v3 (2).xlsx</span>
      </div>
      <div className="grid grid-cols-4 text-[0.66rem]">
        {rows.flat().map((c, i) => (
          <span
            key={i}
            className="border-b border-r px-2 py-1.5"
            style={{
              borderColor: "var(--border-subtle)",
              color: c === "#REF!" ? "#e5484d" : i < 4 ? "var(--text-muted)" : "var(--text-secondary)",
              background: c === "#REF!" ? "rgba(229,72,77,0.12)" : undefined,
              fontWeight: i < 4 || c === "#REF!" ? 700 : 500,
            }}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function Email() {
  return (
    <div className="w-[270px] rounded-xl border p-3.5 shadow-2xl" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-raised)" }}>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5b5bd6] text-[0.6rem] font-bold text-white">AC</span>
          <span className="text-[0.72rem] font-semibold" style={{ color: "var(--text-primary)" }}>Accounts</span>
        </span>
        <span className="rounded-full px-2 py-0.5 text-[0.58rem] font-bold" style={{ background: "rgba(245,158,11,0.15)", color: "#d97706" }}>
          No reply · 3 days
        </span>
      </div>
      <p className="mt-2 text-[0.74rem] font-bold" style={{ color: "var(--text-primary)" }}>Re: Fwd: Approval needed?</p>
      <p className="mt-0.5 text-[0.68rem]" style={{ color: "var(--text-muted)" }}>Has anyone signed this off yet? Need it today…</p>
    </div>
  );
}

function Chat() {
  return (
    <div className="w-[230px] space-y-1.5">
      <div className="ml-auto w-fit max-w-[210px] rounded-2xl rounded-br-md bg-[#d9fdd3] px-3 py-2 text-[0.74rem] text-[#111b21] shadow-xl">
        Can you send today&apos;s scores?
        <span className="ml-2 align-bottom text-[0.55rem] text-[#667781]">4:12 pm ✓✓</span>
      </div>
      <div className="ml-auto w-fit rounded-2xl rounded-br-md bg-[#d9fdd3] px-3 py-1.5 text-[0.74rem] text-[#111b21] shadow-xl">
        ??
        <span className="ml-2 align-bottom text-[0.55rem] text-[#667781]">6:40 pm ✓✓</span>
      </div>
    </div>
  );
}

function Worksheet() {
  return (
    <div className="relative w-[190px]">
      <div className="absolute inset-0 translate-x-2 translate-y-2 rotate-2 rounded-sm bg-[#e9e6dd] shadow-lg" />
      <div className="relative rounded-sm bg-[#fbfaf6] p-3.5 shadow-2xl">
        <p className="text-[0.66rem] font-bold uppercase tracking-wider text-[#5b5546]">Worksheet 14</p>
        <div className="mt-2 space-y-2">
          {[80, 92, 70, 86, 60].map((w, i) => (
            <div key={i} className="h-[3px] rounded bg-[#d8d3c4]" style={{ width: `${w}%` }} />
          ))}
        </div>
        <p className="mt-3 text-[0.64rem] font-semibold text-[#b4472d]">Still to mark: 32 copies</p>
      </div>
    </div>
  );
}

function Sticky() {
  return (
    <div className="w-[160px] bg-[#ffe680] p-3.5 shadow-2xl" style={{ boxShadow: "0 18px 30px -12px rgba(0,0,0,0.45)" }}>
      <p className="text-[0.78rem] font-semibold leading-snug text-[#4a3d00]">Who has the latest version??</p>
      <p className="mt-2 text-[0.6rem] font-bold text-[#7a6500]">— Mon</p>
    </div>
  );
}

function Notebook() {
  return (
    <div
      className="w-[230px] rounded-md border border-[#d9d2bf] bg-[#fffdf5] p-3 shadow-2xl"
      style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 21px, #e3ddca 21px 22px)" }}
    >
      <p className="text-[0.66rem] font-bold uppercase tracking-wider text-[#8a5a12]">Fees, pending</p>
      {["Paid?  ✗", "Promised Friday", "Cash, no receipt"].map((l) => (
        <p key={l} className="flex items-center justify-between text-[0.68rem] leading-[22px] text-[#4a4232]">
          <span className="inline-block h-2 w-16 rounded bg-[#d6cdb3]" />
          <span>{l}</span>
        </p>
      ))}
    </div>
  );
}

const OBJECTS = [
  { el: <Spreadsheet />, left: 3, top: 4, rot: -4, depth: 1, narrow: { left: 0, top: 0, rot: -3 } },
  { el: <Email />, left: 58, top: 0, rot: 3, depth: 0.9, narrow: { left: 6, top: 70, rot: 2 } },
  { el: <Chat />, left: 31, top: 34, rot: -2, depth: 1, narrow: { left: 26, top: 30, rot: -2 } },
  { el: <Worksheet />, left: 77, top: 40, rot: 6, depth: 0.85, narrow: null },
  { el: <Sticky />, left: 8, top: 58, rot: -6, depth: 0.95, narrow: { left: 2, top: 44, rot: -5 } },
  { el: <Notebook />, left: 47, top: 66, rot: 2, depth: 0.9, narrow: null },
];

/* ---------- Chapter 3: the workflow ---------- */

const FLOW = [
  { icon: Inbox, label: "Work comes in", note: "Received in one place" },
  { icon: ServerCog, label: "Rules applied", note: "Scored and timed on the server" },
  { icon: UserCheck, label: "Approved by role", note: "Decision recorded" },
  { icon: LineChart, label: "Reported live", note: "Report updated" },
];

export default function ShiftFilm() {
  const reduce = useSafeReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.75 });
  const [chapter, setChapter] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [done, setDone] = useState(false);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const active = !reduce && playing && inView && !done;
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setElapsed((e) => e + TICK), TICK);
    return () => clearInterval(t);
  }, [active]);

  // Move to the next chapter (or finish) once this one has run its course.
  useEffect(() => {
    if (elapsed < CHAPTERS[chapter].ms) return;
    const t = setTimeout(() => {
      if (chapter < CHAPTERS.length - 1) {
        setChapter(chapter + 1);
        setElapsed(0);
      } else {
        setDone(true);
      }
    }, 0);
    return () => clearTimeout(t);
  }, [elapsed, chapter]);

  const shownChapter = reduce ? 2 : chapter;
  const p = reduce ? 1 : Math.min(1, elapsed / CHAPTERS[chapter].ms); // progress through the chapter
  const gathered = shownChapter >= 1;
  const lit = shownChapter < 2 ? 0 : Math.min(FLOW.length, Math.floor(p / 0.15));
  const pulse = shownChapter < 2 ? 0 : Math.min(1, p / 0.6);
  const summary = shownChapter === 2 && p > 0.7;

  const jump = (i: number) => {
    setChapter(i);
    setElapsed(0);
    setDone(false);
    setPlaying(true);
  };
  const replay = () => jump(0);

  return (
    <div
      ref={ref}
      className="glass-panel relative flex flex-col overflow-hidden"
      style={{ height: narrow ? "clamp(600px, calc(100svh - 104px), 720px)" : "clamp(560px, calc(100svh - 128px), 720px)" }}
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" style={{ maskImage: "radial-gradient(ellipse at center, black 30%, transparent 78%)" }} aria-hidden="true" />

      {/* Title and caption */}
      <div className="relative z-10 px-5 pt-6 sm:px-9 sm:pt-8">
        <p className="eyebrow">The shift</p>
        <h2 className="mt-2 font-display text-[1.7rem] font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-4xl" style={{ color: "var(--text-primary)" }}>
          From scattered manual work <span className="gradient-text">to one system.</span>
        </h2>
        <motion.p
          key={shownChapter}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-3 max-w-xl text-sm leading-6 sm:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          {CHAPTERS[shownChapter].caption}
        </motion.p>
      </div>

      {/* Stage */}
      <div className="relative z-0 min-h-0 flex-1">
        <div className="absolute inset-x-5 inset-y-3 sm:inset-x-9 sm:inset-y-4">
          {/* Chapter 1 objects, gathered in chapter 2 */}
          {OBJECTS.map((o, i) => {
            const pos = narrow ? o.narrow : o;
            if (!pos) return null;
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{ transformOrigin: "center", zIndex: Math.round(o.depth * 10) }}
                initial={false}
                animate={
                  gathered
                    ? { left: ["" + pos.left + "%", `${(pos.left + 50) / 2}%`, "50%"], top: [`${pos.top}%`, `${Math.max(0, pos.top - 14)}%`, "50%"], x: "-50%", y: "-50%", rotate: 0, scale: 0.06, opacity: 0 }
                    : { left: `${pos.left}%`, top: `${pos.top}%`, x: "0%", y: "0%", rotate: pos.rot, scale: (narrow ? 0.74 : 1) * o.depth, opacity: 1 }
                }
                transition={
                  reduce
                    ? { duration: 0 }
                    : gathered
                      ? { duration: 1.5, delay: 0.15 + i * 0.14, ease: [0.7, 0, 0.25, 1], opacity: { duration: 0.4, delay: 1.25 + i * 0.14 } }
                      : { duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }
                }
              >
                <motion.div
                  animate={reduce || gathered ? { y: 0 } : { y: [0, -7, 0, 5, 0] }}
                  transition={{ duration: 6 + i * 0.8, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "top left" }}
                >
                  {o.el}
                </motion.div>
              </motion.div>
            );
          })}

          {/* Chapter 2: the Zetta mark */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 z-20"
            initial={false}
            animate={{ x: "-50%", y: "-50%", opacity: shownChapter === 1 ? 1 : 0, scale: shownChapter === 1 ? 1 : shownChapter === 0 ? 0.6 : 0.8 }}
            transition={{ duration: reduce ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <div className="absolute -inset-28 rounded-full" style={{ background: "radial-gradient(closest-side, var(--glow-primary), transparent)" }} />
            {!reduce &&
              [0, 1, 2].map((r) => (
                <motion.span
                  key={r}
                  className="absolute inset-0 rounded-[2rem] border"
                  style={{ borderColor: "var(--accent)" }}
                  animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
                  transition={{ duration: 2.4, delay: r * 0.8, repeat: Infinity, ease: "easeOut" }}
                />
              ))}
            <div className="relative h-28 w-28 overflow-hidden rounded-[2rem] border sm:h-32 sm:w-32" style={{ borderColor: "var(--glass-border)", background: "#060a0b", boxShadow: "0 30px 80px -20px var(--accent-glow)" }}>
              <Image src="/logo-mark.png" alt="" fill sizes="128px" className="object-cover" />
              {!reduce && (
                <motion.span
                  className="absolute -inset-1/2"
                  style={{ background: "conic-gradient(from 0deg, transparent 0 70%, rgba(255,255,255,0.35) 80%, transparent 90%)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
                />
              )}
            </div>
          </motion.div>

          {/* Chapter 3: one workflow */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{ opacity: shownChapter === 2 ? 1 : 0, scale: shownChapter === 2 ? 1 : 0.96 }}
            transition={{ duration: reduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ pointerEvents: shownChapter === 2 ? "auto" : "none" }}
            aria-hidden={shownChapter !== 2}
          >
            <div className="w-full max-w-4xl rounded-2xl border p-5 shadow-2xl sm:p-7" style={{ borderColor: "var(--glass-border)", background: "var(--bg-raised)" }}>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5">
                  <span className="relative h-7 w-7 overflow-hidden rounded-lg" style={{ background: "#060a0b" }}>
                    <Image src="/logo-mark.png" alt="" fill sizes="28px" className="object-cover" />
                  </span>
                  <span className="font-display text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                    One workflow
                  </span>
                </span>
                <span className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.68rem] font-bold" style={{ background: "color-mix(in srgb, var(--status-live) 14%, transparent)", color: "var(--status-live)" }}>
                  <span className="status-dot pulse-dot" style={{ background: "var(--status-live)" }} /> Running
                </span>
              </div>

              <div className="relative mt-7">
                {/* line and travelling light (wide screens) */}
                <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-[2px] rounded md:block" style={{ background: "var(--border-subtle)" }} aria-hidden="true" />
                <div className="absolute left-[12.5%] top-7 hidden h-[2px] rounded md:block" style={{ width: `${pulse * 75}%`, background: "linear-gradient(90deg, var(--accent-strong), var(--accent))", transition: "width 120ms linear" }} aria-hidden="true" />
                <div
                  className="absolute top-7 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
                  style={{ left: `${12.5 + pulse * 75}%`, marginTop: 1, opacity: pulse > 0 && pulse < 1 ? 1 : 0, background: "var(--accent)", boxShadow: "0 0 0 6px var(--accent-soft), 0 0 24px 6px var(--accent-glow)", transition: "left 120ms linear, opacity 300ms" }}
                  aria-hidden="true"
                />
                <div className="relative grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-4 md:gap-4">
                  {FLOW.map((f, i) => {
                    const Icon = f.icon;
                    const on = i < lit;
                    return (
                      <div key={f.label} className="flex flex-col items-center text-center">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-500"
                          style={{
                            borderColor: on ? "transparent" : "var(--border-strong)",
                            background: on ? "linear-gradient(150deg, var(--accent-strong), var(--accent))" : "var(--bg-base)",
                            boxShadow: on ? "0 16px 36px -14px var(--accent-glow)" : "none",
                          }}
                        >
                          <Icon size={21} style={{ color: on ? "var(--text-on-accent)" : "var(--text-muted)" }} />
                        </div>
                        <p className="mt-3 font-display text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                          {f.label}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-[0.7rem] font-medium transition-colors duration-500" style={{ color: on ? "var(--status-live)" : "var(--text-muted)" }}>
                          <CheckCircle2 size={12} style={{ opacity: on ? 1 : 0.3 }} /> {f.note}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <motion.div
                className="mt-7 grid grid-cols-3 gap-2 border-t pt-5 sm:gap-4"
                style={{ borderColor: "var(--border-subtle)" }}
                initial={false}
                animate={{ opacity: summary ? 1 : 0, y: summary ? 0 : 8 }}
                transition={{ duration: reduce ? 0 : 0.5 }}
              >
                {[
                  { v: "0", l: "spreadsheets to chase" },
                  { v: "1", l: "system for everyone" },
                  { v: "100%", l: "of steps on record" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <p className="font-display text-xl font-extrabold tracking-tight sm:text-2xl" style={{ color: "var(--text-primary)" }}>
                      {s.v}
                    </p>
                    <p className="text-[0.66rem] font-medium sm:text-xs" style={{ color: "var(--text-muted)" }}>
                      {s.l}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Chapter bar */}
      <div className="relative z-10 flex items-center gap-3 border-t px-5 py-4 sm:gap-5 sm:px-9" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="grid flex-1 grid-cols-3 gap-2 sm:gap-4">
          {CHAPTERS.map((c, i) => {
            const fill = reduce || i < shownChapter || (i === shownChapter && done) ? 1 : i === shownChapter ? p : 0;
            const on = i === shownChapter;
            return (
              <button key={c.label} type="button" onClick={() => jump(i)} className="group text-left" aria-label={`Play from: ${c.label}`}>
                <span className="block h-[3px] overflow-hidden rounded-full" style={{ background: "var(--border-subtle)" }}>
                  <span className="block h-full rounded-full" style={{ width: `${fill * 100}%`, background: "linear-gradient(90deg, var(--accent-strong), var(--accent))", transition: "width 100ms linear" }} />
                </span>
                <span className="mt-2 block text-[0.68rem] font-bold uppercase tracking-[0.14em] transition-colors group-hover:text-[var(--text-primary)]" style={{ color: on ? "var(--text-primary)" : "var(--text-muted)" }}>
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>
        {!reduce && (
          <button
            type="button"
            onClick={done ? replay : () => setPlaying(!playing)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors hover:border-[var(--accent)]"
            style={{ borderColor: "var(--glass-border)", background: "var(--glass-bg)", color: "var(--text-primary)" }}
            aria-label={done ? "Replay" : playing ? "Pause" : "Play"}
          >
            {done ? <RotateCcw size={15} /> : playing ? <Pause size={15} /> : <Play size={15} />}
          </button>
        )}
      </div>
    </div>
  );
}
