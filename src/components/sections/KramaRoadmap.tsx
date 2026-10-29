"use client";

import { Check } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

type Status = "done" | "underway" | "next";

const stages: { title: string; status: Status; points: string[] }[] = [
  {
    title: "Schools and roles",
    status: "done",
    points: ["Schools added with their first admin", "Setup from one workbook, with sign-in slips", "Two-factor for admins; issued passwords replaced"],
  },
  {
    title: "Curriculum Studio",
    status: "done",
    points: ["Draft, review and publish", "All 15 Class 5 CBSE Maths chapters", "A calendar for every school"],
  },
  {
    title: "The practice loop",
    status: "done",
    points: ["Practice set for chosen students", "Marked the moment it is submitted", "Foundation Repair on the topic beneath"],
  },
  {
    title: "Marking and report cards",
    status: "done",
    points: ["Units, tolerance and rounding", "Part and method marks, with a reason", "School schemes and report cards"],
  },
  {
    title: "Mock papers",
    status: "done",
    points: ["1,006 question patterns, all 15 chapters", "Every student sits their own version", "Long answers marked step by step"],
  },
  {
    title: "Progress and analytics",
    status: "done",
    points: ["My Progress and Practise Next", "Class Analytics and misconceptions", "A weekly report home for parents"],
  },
  {
    title: "Lessons and the daily rhythm",
    status: "underway",
    points: ["Chapter lessons for students", "The five-day loop, released day by day", "A class page for every teacher"],
  },
  {
    title: "More classes, more schools",
    status: "next",
    points: ["Classes 6–10 and more subjects", "ICSE alongside CBSE", "School-by-school rollout"],
  },
];

const label: Record<Status, string> = { done: "Built", underway: "Underway", next: "Up next" };

export default function KramaRoadmap() {
  const built = stages.filter((s) => s.status === "done").length;
  const underway = stages.filter((s) => s.status === "underway").length;
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
        <span><strong style={{ color: "var(--text-primary)" }}>{built}</strong> stages built</span>
        <span><strong style={{ color: "var(--text-primary)" }}>{underway}</strong> underway</span>
        <span><strong style={{ color: "var(--text-primary)" }}>{stages.length - built - underway}</strong> up next</span>
        <div className="ml-auto hidden h-1.5 w-56 overflow-hidden rounded-full sm:block" style={{ background: "var(--border-subtle)" }} aria-hidden="true">
          <div className="flex h-full">
            <div style={{ width: `${(built / stages.length) * 100}%`, background: "linear-gradient(90deg, #fff1c6, #f9ab2b)" }} />
            <div style={{ width: `${(underway / stages.length) * 100}%`, background: "rgba(249,171,43,0.45)" }} />
          </div>
        </div>
      </div>
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((s, i) => {
          const done = s.status === "done";
          const underwayNow = s.status === "underway";
          return (
            <Reveal key={s.title} delay={i * 0.06} className="h-full">
              <li
                className="surface-card hover-card flex h-full flex-col p-6"
                style={done ? { borderColor: "rgba(249,171,43,0.4)" } : s.status === "next" ? { opacity: 0.86 } : undefined}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif-display text-4xl font-bold leading-none" style={{ color: done ? "var(--accent)" : "var(--border-strong)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.1em]"
                    style={{
                      borderColor: done || underwayNow ? "var(--accent)" : "var(--border-strong)",
                      color: done || underwayNow ? "var(--accent)" : "var(--text-muted)",
                      background: done ? "var(--accent-soft)" : "transparent",
                    }}
                  >
                    {done ? <Check size={12} strokeWidth={3} /> : <span className={`status-dot ${underwayNow ? "pulse-dot" : ""}`} style={{ background: underwayNow ? "var(--accent)" : "var(--text-muted)" }} />}
                    {label[s.status]}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                  {s.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                      <span className="mt-[0.7rem] h-1 w-1 shrink-0 rounded-full" style={{ background: done ? "var(--accent)" : "var(--text-muted)" }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}
