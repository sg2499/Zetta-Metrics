"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { brand, skillGroups, timeline } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease },
  }),
};

export default function AboutPage() {
  return (
    <div className="px-6 pb-20 pt-32">
      <div className="container-custom">
        <section className="mb-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="eyebrow">
              Founder
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-display text-5xl font-bold leading-tight text-white md:text-6xl">
              Shailesh Gupta builds the proof behind ZettaMetrics.
            </motion.h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="premium-card"
          >
            <p className="text-lg leading-8 text-slate-300">
              I am a Data Scientist and AI product builder with experience across
              ML models, PySpark and Azure pipelines, LLM systems, and full-stack
              product development. {brand.name} is the business wrapper around
              that work: a studio for building useful AI and data products for clients.
            </p>
          </motion.div>
        </section>

        <section className="section pt-0">
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <div className="premium-card">
              <p className="eyebrow">Operating belief</p>
              <h2 className="font-display text-3xl font-semibold leading-tight text-white">
                Good AI products are not magic tricks. They are engineered workflows.
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-400">
                <p>
                  The work starts with a business problem, then moves through data,
                  user flows, constraints, backend logic, interface design, and deployment.
                </p>
                <p>
                  That is the promise of ZettaMetrics: not a pile of buzzwords,
                  but a practical path from idea to working product.
                </p>
              </div>
            </div>
            <div className="premium-card">
              <p className="eyebrow">Useful proof</p>
              <div className="space-y-4">
                {[
                  "Built ML workflows for attrition and credit-risk style decision problems.",
                  "Built ShaileshGPT as a full-stack RAG product with analytics and lead capture.",
                  "Built MathPath as a full-stack EdTech platform with role-based product flows.",
                  "Writes technical project breakdowns through Prismatic Metrics.",
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-cyan-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Trajectory</p>
            <h2>The path from data science to product studio.</h2>
          </div>
          <div className="relative grid gap-5">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={`${item.period}-${item.role}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  custom={index}
                  className="premium-card grid gap-5 md:grid-cols-[160px_1fr]"
                >
                  <div>
                    <div className="inline-flex rounded-2xl border border-cyan-400/15 bg-cyan-400/8 p-3 text-cyan-200">
                      <Icon size={20} />
                    </div>
                    <p className="mt-4 font-mono text-xs text-slate-500">{item.period}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-cyan-200">{item.org}</p>
                    <h3 className="font-display mt-1 text-2xl font-semibold text-white">{item.role}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{item.detail}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Stack</p>
            <h2>Enough range to build the whole product path.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {skillGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <motion.article
                  key={group.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  custom={index}
                  className="premium-card"
                >
                  <div className="mb-5 inline-flex rounded-2xl border border-cyan-400/15 bg-cyan-400/8 p-3 text-cyan-200">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">{group.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="tech-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="section pb-0">
          <a
            href={brand.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="premium-card flex flex-col justify-between gap-6 md:flex-row md:items-center"
          >
            <div>
              <p className="eyebrow">Public profile</p>
              <h2 className="font-display text-3xl font-semibold text-white">
                Verify the professional trail.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                LinkedIn, GitHub, and Prismatic Metrics remain connected as the
                public source layer behind the studio brand.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
              Open LinkedIn <ArrowUpRight size={16} />
            </div>
          </a>
        </section>
      </div>
    </div>
  );
}
