"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, ClipboardCheck, LockKeyhole, Timer, UsersRound } from "lucide-react";
import { serviceLines } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease },
  }),
};

const mathPath = [
  [UsersRound, "Admin, teacher, and student roles"],
  [ClipboardCheck, "Assignments, MCQs, and attempt review"],
  [LockKeyhole, "Server-side answer validation"],
  [Timer, "Timed attempts and auto-submit flow"],
];

export default function StudioPage() {
  return (
    <div className="px-6 pb-20 pt-32">
      <div className="container-custom">
        <section className="mx-auto mb-16 max-w-3xl text-center">
          <p className="eyebrow">Services</p>
          <h1 className="font-display text-5xl font-bold leading-tight text-white md:text-6xl">
            Practical AI product development for business use cases.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            ZettaMetrics works best when the goal is clear: build a useful AI,
            EdTech, or data product that can be tested by real users.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {serviceLines.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={index}
                className="premium-card"
              >
                <div className="mb-5 flex items-start gap-4">
                  <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/8 p-3 text-cyan-200">
                    <Icon size={21} />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-white">{service.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{service.summary}</p>
                  </div>
                </div>
                <div className="grid gap-2 border-t border-white/8 pt-5 sm:grid-cols-2">
                  {service.deliverables.map((item) => (
                    <div key={item} className="flex gap-2 text-sm text-slate-300">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-cyan-300" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </section>

        <section id="mathpath" className="section">
          <div className="grid gap-8 rounded-3xl border border-white/8 bg-white/[0.025] p-6 md:p-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow">Product proof</p>
              <h2 className="font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
                MathPath shows the kind of operational product ZettaMetrics can build.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-400">
                It is a full-stack EdTech platform with protected assessment flows,
                role-based UX, backend validation, and product documentation.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://github.com/sg2499/MathPath-Platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  View repository
                </a>
                <Link href="/contact" className="btn-primary">
                  Build something similar <ArrowRight size={15} />
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {mathPath.map(([Icon, label]) => {
                const Component = Icon as typeof UsersRound;
                return (
                  <div key={label as string} className="rounded-2xl border border-white/8 bg-black/10 p-4">
                    <Component size={18} className="text-cyan-300" />
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-200">{label as string}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section pb-0">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["01", "Scope the build", "Define the user, workflow, constraints, and first useful release."],
              ["02", "Ship the core", "Build the interface, backend, AI/data feature, and deployment path."],
              ["03", "Make it usable", "Add documentation, analytics, handoff notes, and next-step roadmap."],
            ].map(([step, title, copy]) => (
              <div key={step} className="premium-card">
                <p className="font-mono text-xs text-cyan-300">{step}</p>
                <h3 className="font-display mt-4 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{copy}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
