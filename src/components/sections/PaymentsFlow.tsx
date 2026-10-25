"use client";

import { motion } from "framer-motion";
import { BellRing, CalendarCheck2, CreditCard, FileText, SlidersHorizontal } from "lucide-react";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";

/**
 * How fees move through the MathPath Platform, from setup to the day's close.
 * A five-step flow; each step lists what the product actually does there.
 */
const steps = [
  { icon: SlidersHorizontal, title: "Set up fees", points: ["Fee structures per centre", "Business details and numbering", "Every change on record"] },
  { icon: FileText, title: "Bill monthly", points: ["Drafts ready on the 1st", "Review, then release", "Advances and no-fee students handled"] },
  { icon: CreditCard, title: "Collect", points: ["At the counter with a receipt", "Online, from the student's Fees tab", "Pay links parents can open"] },
  { icon: BellRing, title: "Follow up", points: ["In-app reminders", "Promises to pay tracked", "Unusual activity flagged"] },
  { icon: CalendarCheck2, title: "Close the day", points: ["Quick Pay at the desk", "A cash count to close", "Reports and expenses roll up"] },
];

export default function PaymentsFlow() {
  const reduce = useSafeReducedMotion();
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute left-[10%] right-[10%] top-[1.75rem] hidden h-px lg:block"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), var(--glow-secondary), var(--accent), transparent)" }}
        aria-hidden="true"
      />
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.li
              key={s.title}
              className="surface-card hover-card relative flex flex-col p-6"
              initial={reduce ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "linear-gradient(150deg, var(--accent-strong), var(--accent))", color: "var(--text-on-accent)", boxShadow: "0 8px 22px -8px var(--accent-glow)" }}
                >
                  <Icon size={20} />
                </span>
                <span className="font-display text-3xl font-extrabold tracking-[-0.05em]" style={{ color: "var(--border-strong)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                {s.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                    <span className="mt-[0.72rem] h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
