"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Check, X } from "lucide-react";
import { automationAreas } from "@/lib/content";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";

function BeforeAfter({ area }: { area: (typeof automationAreas)[number] }) {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border p-5" style={{ borderColor: "color-mix(in srgb, var(--status-dev) 35%, transparent)", background: "color-mix(in srgb, var(--status-dev) 7%, transparent)" }}>
        <p className="mb-2 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--status-dev)" }}>
          <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: "color-mix(in srgb, var(--status-dev) 18%, transparent)" }}>
            <X size={11} />
          </span>
          Before
        </p>
        <p className="text-base leading-7" style={{ color: "var(--text-secondary)" }}>
          {area.before}
        </p>
      </div>
      <div className="flex justify-center" aria-hidden="true">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ borderColor: "var(--glass-border)", background: "var(--bg-raised)", color: "var(--accent)" }}>
          <ArrowDown size={16} />
        </span>
      </div>
      <div className="rounded-2xl border p-5" style={{ borderColor: "var(--glow-primary)", background: "var(--accent-soft)", boxShadow: "0 16px 40px -20px var(--accent-glow)" }}>
        <p className="mb-2 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
          <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: "linear-gradient(150deg, var(--accent-strong), var(--accent))", color: "var(--text-on-accent)" }}>
            <Check size={11} />
          </span>
          With Zetta
        </p>
        <p className="text-base font-semibold leading-7" style={{ color: "var(--text-primary)" }}>
          {area.after}
        </p>
      </div>
    </div>
  );
}

/**
 * "What we automate": pick a kind of manual work on the left, see its
 * before → after on the right. On small screens every area is shown as its
 * own stacked card instead.
 */
export default function AutomationExplorer() {
  const [active, setActive] = useState(0);
  const reduce = useSafeReducedMotion();
  const area = automationAreas[active];
  const ActiveIcon = area.icon;

  return (
    <>
      {/* Desktop */}
      <div className="hidden gap-8 lg:grid lg:grid-cols-[0.9fr_1.1fr]">
        <div role="tablist" aria-label="Kinds of work we automate" className="flex flex-col gap-2">
          {automationAreas.map((a, i) => {
            const Icon = a.icon;
            const on = i === active;
            return (
              <button
                key={a.title}
                role="tab"
                aria-selected={on}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group relative flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-300"
                style={{ borderColor: on ? "var(--glow-primary)" : "transparent", background: on ? "var(--bg-raised)" : "transparent" }}
              >
                {on && (
                  <motion.span
                    layoutId="automation-bar"
                    className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                    style={{ background: "linear-gradient(180deg, var(--accent-strong), var(--accent))" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                  />
                )}
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300"
                  style={{
                    background: on ? "linear-gradient(150deg, var(--accent-strong), var(--accent))" : "var(--bg-raised)",
                    color: on ? "var(--text-on-accent)" : "var(--accent)",
                    border: on ? "none" : "1px solid var(--border-subtle)",
                  }}
                >
                  <Icon size={19} />
                </span>
                <span className="font-display text-lg font-bold tracking-tight transition-colors" style={{ color: on ? "var(--text-primary)" : "var(--text-secondary)" }}>
                  {a.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="glass-panel relative flex min-h-[460px] flex-col justify-center overflow-hidden p-10">
          <ActiveIcon
            size={260}
            className="pointer-events-none absolute -right-12 -top-10 opacity-[0.05]"
            style={{ color: "var(--accent)" }}
            aria-hidden="true"
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -10 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <h3 className="mb-6 font-display text-3xl font-extrabold tracking-[-0.03em]" style={{ color: "var(--text-primary)" }}>
                {area.title}
              </h3>
              <BeforeAfter area={area} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile / tablet */}
      <div className="grid gap-5 md:grid-cols-2 lg:hidden">
        {automationAreas.map((a) => {
          const Icon = a.icon;
          return (
            <div key={a.title} className="surface-card p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "linear-gradient(150deg, var(--accent-strong), var(--accent))", color: "var(--text-on-accent)" }}>
                  <Icon size={18} />
                </span>
                <h3 className="font-display text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  {a.title}
                </h3>
              </div>
              <BeforeAfter area={a} />
            </div>
          );
        })}
      </div>
    </>
  );
}
