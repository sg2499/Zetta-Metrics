"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  Layers3,
  LineChart,
  ShieldCheck,
} from "lucide-react";
import { flagshipWork, proofPoints } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, delay: i * 0.08, ease },
  }),
};

const services = [
  {
    icon: Bot,
    title: "AI Assistants",
    copy: "RAG chatbots, internal knowledge tools, and lead-capture assistants built around real workflows.",
  },
  {
    icon: Layers3,
    title: "AI MVPs",
    copy: "Focused product builds for founders who need a working v1, not a pile of AI experiments.",
  },
  {
    icon: LineChart,
    title: "Data Products",
    copy: "ML models, dashboards, pipelines, and decision systems that make data useful to operators.",
  },
];

const process = [
  "Clarify the business problem",
  "Design the smallest useful product",
  "Build, deploy, and document v1",
];

export default function HomePage() {
  return (
    <div className="px-6 pb-20 pt-28">
      <section className="container-custom grid min-h-[78vh] items-center gap-12 lg:grid-cols-[1fr_420px]">
        <motion.div initial="hidden" animate="visible" className="max-w-4xl">
          <motion.p variants={fadeUp} className="eyebrow">
            AI product studio
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="font-display max-w-4xl text-balance text-5xl font-bold leading-[1.02] tracking-tight text-white md:text-7xl"
          >
            Clean AI products for businesses that need useful software.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-7 max-w-2xl text-lg leading-8 text-slate-300"
          >
            ZettaMetrics is Shailesh Gupta&apos;s founder-led studio for building
            LLM applications, EdTech platforms, and data products with a practical
            path from idea to shipped v1.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Start a project <ArrowRight size={16} />
            </Link>
            <Link href="/projects" className="btn-secondary">
              See the work
            </Link>
          </motion.div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="premium-card"
        >
          <div className="flex items-center gap-3 border-b border-white/8 pb-5">
            <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/8 p-3 text-cyan-200">
              <BriefcaseBusiness size={21} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Best fit</p>
              <h2 className="font-display text-xl font-semibold text-white">Client-ready AI builds</h2>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            {[
              "You have an AI/product idea but need a working MVP.",
              "You need a business chatbot grounded in your own knowledge.",
              "You want an EdTech or data platform built with product discipline.",
            ].map((item) => (
              <div key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-cyan-300" />
                {item}
              </div>
            ))}
          </div>
        </motion.aside>
      </section>

      <section className="container-custom section">
        <div className="section-heading">
          <p className="eyebrow">What we build</p>
          <h2>Three clear ways to work with ZettaMetrics.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service, index) => {
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
                <div className="mb-5 inline-flex rounded-2xl border border-cyan-400/15 bg-cyan-400/8 p-3 text-cyan-200">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{service.copy}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="container-custom section">
        <div className="grid gap-8 lg:grid-cols-[360px_1fr] lg:items-start">
          <div>
            <p className="eyebrow">Proof</p>
            <h2 className="section-title">Real systems behind the brand.</h2>
            <p className="section-copy">
              The site should feel premium because the work is inspectable:
              repos, product flows, architecture, and technical writing.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {proofPoints.map((point) => (
                <div key={point.label} className="metric-tile">
                  <div className="font-display text-xl font-bold text-white">{point.value}</div>
                  <div className="mt-1 text-xs leading-5 text-slate-500">{point.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {flagshipWork.slice(0, 2).map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.article
                  key={project.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  custom={index}
                  className="premium-card"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/8 p-3 text-cyan-200">
                      <Icon size={20} />
                    </div>
                    <span className="text-xs text-slate-500">{project.eyebrow}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{project.summary}</p>
                  <Link href={project.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white">
                    View details <ArrowRight size={14} />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-custom section">
        <div className="rounded-3xl border border-white/8 bg-white/[0.025] p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-3">
            {process.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-2xl bg-black/10 p-4">
                <div className="font-mono text-xs text-cyan-300">0{index + 1}</div>
                <div className="text-sm font-semibold text-slate-200">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-custom section pb-0">
        <div className="cta-band text-center">
          <ShieldCheck size={22} className="mx-auto text-cyan-300" />
          <h2 className="font-display mx-auto mt-5 max-w-3xl text-3xl font-semibold text-white md:text-5xl">
            Start with one useful product, then scale from proof.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400">
            Share the problem, the user, and the business outcome. The first
            conversation should produce a clear build path.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/contact" className="btn-primary">
              Discuss the build <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
