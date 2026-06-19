"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  Gauge,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { brand, flagshipWork, proofPoints, serviceLines } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease },
  }),
};

export default function HomePage() {
  return (
    <div className="relative">
      <section className="relative min-h-[92vh] px-6 pb-14 pt-32">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div initial="hidden" animate="visible" className="max-w-4xl">
            <motion.div
              variants={fadeUp}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              Founder-led AI product studio
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display max-w-5xl text-balance text-5xl font-bold leading-[0.98] tracking-tight text-white md:text-7xl"
            >
              Build the AI product your business actually needs.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-7 max-w-2xl text-lg leading-8 text-slate-300"
            >
              {brand.name} is {brand.founder}&apos;s AI product studio for LLM apps,
              data systems, and EdTech platforms. We turn credible technical proof
              into working software that clients can use, test, and grow.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Start a project <ArrowRight size={16} />
              </Link>
              <Link href="/projects" className="btn-secondary">
                View proof of work <ExternalLink size={15} />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-10 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4"
            >
              {proofPoints.map((point) => (
                <div key={point.label} className="metric-tile">
                  <div className="font-display text-xl font-bold text-white">{point.value}</div>
                  <div className="mt-1 text-xs leading-5 text-slate-500">{point.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="product-panel">
              <div className="mb-6 flex items-center justify-between border-b border-white/8 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Operating system</p>
                  <h2 className="font-display mt-2 text-2xl font-semibold text-white">
                    ZettaMetrics Studio
                  </h2>
                </div>
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-200">
                  <Sparkles size={20} />
                </div>
              </div>

              <div className="space-y-3">
                {[
                  ["01", "Discover", "Scope the business problem, users, risks, and success metric."],
                  ["02", "Prototype", "Ship a polished AI/data workflow quickly enough to validate."],
                  ["03", "Productize", "Add security, analytics, deployment, and operating discipline."],
                ].map(([step, title, copy]) => (
                  <div key={step} className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                    <div className="flex gap-4">
                      <div className="font-mono text-xs text-cyan-300">{step}</div>
                      <div>
                        <div className="font-display text-sm font-semibold text-white">{title}</div>
                        <p className="mt-1 text-sm leading-6 text-slate-400">{copy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  [Gauge, "Fast MVPs"],
                  [ShieldCheck, "Safe APIs"],
                  [FileText, "Clear docs"],
                ].map(([Icon, label]) => {
                  const Component = Icon as typeof Gauge;
                  return (
                    <div key={label as string} className="rounded-2xl border border-white/8 bg-white/[0.025] p-4 text-center">
                      <Component size={18} className="mx-auto text-cyan-300" />
                      <p className="mt-2 text-xs text-slate-400">{label as string}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="section-heading">
            <p className="eyebrow">Services</p>
            <h2>Productized AI engineering, without the agency fog.</h2>
            <p>
              The offer is intentionally narrow: build useful AI products,
              prove them with working software, and make them maintainable.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {serviceLines.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  custom={index}
                  variants={fadeUp}
                  className="premium-card group"
                >
                  <div className="mb-5 inline-flex rounded-2xl border border-cyan-400/15 bg-cyan-400/8 p-3 text-cyan-200">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{service.summary}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">Selected proof</p>
              <h2 className="section-title">Built systems, not just claims.</h2>
              <p className="section-copy">
                ZettaMetrics should win trust through shipped artifacts: repos,
                architecture, workflows, and product surfaces.
              </p>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white">
              Explore all work <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {flagshipWork.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.article
                  key={project.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  custom={index}
                  variants={fadeUp}
                  className="premium-card flex min-h-[360px] flex-col"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-cyan-200">
                      <Icon size={22} />
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                      {project.eyebrow}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{project.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((tag) => (
                      <span key={tag} className="tech-pill">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <Link href={project.href} className="text-sm font-semibold text-cyan-200 hover:text-white">
                      Case view
                    </Link>
                    <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-slate-200">
                      Repo
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="cta-band">
            <div>
              <p className="eyebrow">Entrepreneurship debut</p>
              <h2 className="font-display max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Make the site behave like a sales engine, not a resume.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
                The next move is to connect proof, services, and lead capture
                into one premium path for founders and business owners.
              </p>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {["Clear offers", "Real case studies", "Working lead flow"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-cyan-300" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/contact" className="btn-primary">
                Discuss a build <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
