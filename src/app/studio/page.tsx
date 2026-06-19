"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  DatabaseZap,
  LockKeyhole,
  PanelsTopLeft,
  Timer,
  UsersRound,
} from "lucide-react";
import { serviceLines } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease },
  }),
};

const process = [
  ["01", "Scope", "Clarify the users, business model, data, risk, and first release target."],
  ["02", "Prototype", "Create a working interface and backend path quickly enough to test."],
  ["03", "Harden", "Add validation, auth, analytics, rate limits, deployment, and docs."],
  ["04", "Ship", "Launch with a clear handoff, monitoring path, and next-iteration backlog."],
];

const mathPathFeatures = [
  [UsersRound, "Role-based flows", "Admin, teacher, and student experiences with distinct operational needs."],
  [ClipboardCheck, "DPS assignment engine", "Lessons, DPS configs, MCQs, assignment creation, and attempt review."],
  [LockKeyhole, "Server-side validation", "Correct answers stay protected and scoring remains backend-controlled."],
  [Timer, "Timed attempts", "Attempt timing and auto-submit logic are guarded by backend authority."],
  [PanelsTopLeft, "Admin preview tools", "Curriculum browsing, MCQ preview, and assignment workflow support."],
  [DatabaseZap, "Full-stack package", "FastAPI backend, Next.js frontend, schema references, and docs."],
];

export default function StudioPage() {
  return (
    <div className="px-6 pb-20 pt-32">
      <div className="container-custom">
        <section className="mb-20 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <motion.div initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="eyebrow">
              Studio
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-display text-5xl font-bold leading-tight text-white md:text-6xl">
              AI product builds for founders and operators.
            </motion.h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="max-w-2xl text-lg leading-8 text-slate-400"
          >
            ZettaMetrics is built for clients who need a serious technical partner:
            someone who can understand the problem, design the product, build the
            stack, and make it usable enough to sell, test, or operate.
          </motion.p>
        </section>

        <section className="section pt-0">
          <div className="section-heading">
            <p className="eyebrow">What we sell</p>
            <h2>Clear service lines with product outcomes.</h2>
            <p>
              These offers are intentionally practical. Each one can become a
              paid discovery, MVP, or production build.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {serviceLines.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  custom={index}
                  className="premium-card"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/8 p-3 text-cyan-200">
                      <Icon size={22} />
                    </div>
                    <span className="text-sm text-slate-500">0{index + 1}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{service.summary}</p>
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {service.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 size={15} className="text-cyan-300" />
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="mathpath" className="section">
          <div className="cta-band">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="eyebrow">Client/product proof</p>
                <h2 className="font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
                  MathPath proves the studio can build operational software.
                </h2>
                <p className="mt-5 text-base leading-7 text-slate-400">
                  MathPath is the strongest current proof asset: a full-stack
                  EdTech platform with admin workflows, learner attempts,
                  assignment logic, backend validation, and product documentation.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://github.com/sg2499/MathPath-Platform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    View repository <ArrowRight size={15} />
                  </a>
                  <Link href="/contact" className="btn-primary">
                    Build something similar <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {mathPathFeatures.map(([Icon, title, copy]) => {
                  const Component = Icon as typeof UsersRound;
                  return (
                    <div key={title as string} className="rounded-2xl border border-white/8 bg-white/[0.035] p-4">
                      <Component size={18} className="text-cyan-300" />
                      <h3 className="mt-3 font-display text-base font-semibold text-white">{title as string}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{copy as string}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Process</p>
            <h2>A calm path from idea to shipped v1.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {process.map(([step, title, copy], index) => (
              <motion.div
                key={step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                custom={index}
                className="premium-card"
              >
                <div className="font-mono text-xs text-cyan-300">{step}</div>
                <h3 className="font-display mt-4 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="section pb-0">
          <div className="rounded-3xl border border-white/8 bg-white/[0.025] p-8 text-center md:p-12">
            <p className="eyebrow">Next step</p>
            <h2 className="font-display mx-auto max-w-3xl text-3xl font-semibold text-white md:text-5xl">
              Bring a problem. Leave with a product plan.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400">
              Share what you want to build, the audience, the timeline, and the
              business reason. ZettaMetrics can shape the first useful release.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/contact" className="btn-primary">
                Start a project discussion <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
