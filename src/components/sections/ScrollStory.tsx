"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { AlertTriangle, ArrowRight, BarChart3, BrainCircuit, CheckCircle2, KeyRound, Plus, Users, Workflow, Layers } from "lucide-react";
import { processSteps } from "@/lib/content";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";

const chipBase = "rounded-xl border px-3.5 py-3 text-sm font-semibold";

/** Stage 1 — map the process as it really runs, manual steps flagged. */
function MapVisual() {
  const nodes = ["Request", "Spreadsheet", "Review", "Report"];
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {nodes.map((n, i) => (
          <div key={n} className="flex items-center gap-2">
            <span className={chipBase} style={{ borderColor: "var(--border-strong)", background: "var(--bg-raised)", color: "var(--text-primary)" }}>
              {n}
            </span>
            {i < nodes.length - 1 && <ArrowRight size={14} style={{ color: "var(--text-muted)" }} />}
          </div>
        ))}
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {["Re-typed by hand", "Emailed for sign-off", "Checked by eye", "Compiled weekly"].map((t) => (
          <div key={t} className="flex items-center gap-2.5 rounded-xl border border-dashed px-3.5 py-3 text-sm" style={{ borderColor: "var(--status-dev)", color: "var(--status-dev)" }}>
            <AlertTriangle size={15} className="shrink-0" /> {t}
          </div>
        ))}
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
        Every manual step, found before any code is written
      </p>
    </div>
  );
}

/** Stage 2 — reusable modules assembling into the system. */
function BuildVisual({ reduce }: { reduce: boolean }) {
  const blocks = [
    { icon: Users, label: "Roles" },
    { icon: Workflow, label: "Workflow" },
    { icon: BrainCircuit, label: "AI scoring" },
    { icon: KeyRound, label: "Access" },
    { icon: BarChart3, label: "Reports" },
    { icon: Layers, label: "Audit trail" },
  ];
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {blocks.map((b, i) => {
          const Icon = b.icon;
          return (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: reduce ? 0 : 18, scale: reduce ? 1 : 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3 rounded-xl border p-4"
              style={{ borderColor: "var(--glow-primary)", background: "var(--accent-soft)" }}
            >
              <Icon size={18} style={{ color: "var(--accent)" }} />
              <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                {b.label}
              </span>
            </motion.div>
          );
        })}
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
        Reusable building blocks, engineered once
      </p>
    </div>
  );
}

/** Stage 3 — shipped and live, with room to extend. */
function ShipVisual() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border p-5" style={{ borderColor: "var(--border-strong)", background: "var(--bg-raised)" }}>
        <div className="mb-4 flex items-center justify-between">
          <span className="font-display text-base font-bold" style={{ color: "var(--text-primary)" }}>
            Your system
          </span>
          <span className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: "color-mix(in srgb, var(--status-live) 14%, transparent)", color: "var(--status-live)" }}>
            <span className="status-dot pulse-dot" style={{ background: "var(--status-live)" }} /> Live
          </span>
        </div>
        <div className="space-y-2">
          {["Admin workspace", "Team workspace", "User workspace"].map((w) => (
            <div key={w} className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm" style={{ background: "var(--bg-base)", color: "var(--text-secondary)" }}>
              {w}
              <CheckCircle2 size={15} style={{ color: "var(--status-live)" }} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-dashed px-4 py-4 text-sm font-semibold" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
        <Plus size={16} /> Next module starts ahead, not from zero
      </div>
    </div>
  );
}

const VISUAL_TITLES = ["Map", "Build", "Ship"];

export default function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useSafeReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rail = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(processSteps.length - 1, Math.floor(p * processSteps.length));
    if (next !== active) setActive(next);
  });

  const visual = (i: number) => (i === 0 ? <MapVisual /> : i === 1 ? <BuildVisual reduce={reduce} /> : <ShipVisual />);

  return (
    <>
      {/* Desktop: pinned, scroll-driven */}
      <div ref={ref} className="relative hidden pin:block" style={{ height: `${processSteps.length * 70 + 40}vh` }}>
        {/* Pinned just below the floating navbar (88px), sized to what's left of the screen. */}
        <div className="sticky top-[88px] flex h-[calc(100vh-88px)] items-center">
          <div className="container-custom grid w-full grid-cols-[0.95fr_1.05fr] items-center gap-16">
            <div>
              <p className="eyebrow mb-4">How we build</p>
              <h2 className="font-display text-[clamp(2rem,5.2vh,3rem)] font-extrabold leading-[1.05] tracking-[-0.035em]" style={{ color: "var(--text-primary)" }}>
                From manual process to shipped product.
              </h2>
              <div className="relative mt-[4vh] pl-8">
                <div className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full" style={{ background: "var(--border-subtle)" }} />
                <motion.div
                  className="absolute left-0 top-1 bottom-1 w-[2px] origin-top rounded-full"
                  style={{ scaleY: rail, background: "linear-gradient(180deg, var(--accent-strong), var(--accent))" }}
                />
                <ol className="space-y-[2.6vh]">
                  {processSteps.map((step, i) => {
                    const on = i === active;
                    return (
                      <li key={step.title} className="transition-opacity duration-500" style={{ opacity: on ? 1 : 0.38 }}>
                        <p className="font-mono text-xs font-bold" style={{ color: "var(--accent)" }}>
                          0{i + 1} · {VISUAL_TITLES[i]}
                        </p>
                        <h3 className="mt-1.5 font-display text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                          {step.title}
                        </h3>
                        {/* Only the active step shows its description, so the pinned view always fits. */}
                        <div className="grid transition-[grid-template-rows] duration-500" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
                          <p className="overflow-hidden text-base leading-7" style={{ color: "var(--text-secondary)" }}>
                            <span className="block pt-2">{step.detail}</span>
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            <div className="glass-panel relative overflow-hidden p-8 xl:p-10">
              <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
              <p className="relative mb-5 font-display text-5xl font-extrabold tracking-[-0.05em]" style={{ color: "var(--border-strong)" }}>
                0{active + 1}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -16 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  {visual(active)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: stacked */}
      <div className="container-custom pin:hidden">
        <p className="eyebrow mb-4">How we build</p>
        <h2 className="section-title">From manual process to shipped product.</h2>
        <div className="mt-12 space-y-12">
          {processSteps.map((step, i) => (
            <div key={step.title}>
              <p className="font-mono text-xs font-bold" style={{ color: "var(--accent)" }}>
                0{i + 1} · {VISUAL_TITLES[i]}
              </p>
              <h3 className="mt-1.5 font-display text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                {step.title}
              </h3>
              <p className="mt-2 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
                {step.detail}
              </p>
              <div className="glass-panel mt-6 p-6">{visual(i)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
