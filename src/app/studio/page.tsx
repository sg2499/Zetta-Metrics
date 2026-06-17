"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { Brain, Code2, BookOpen, BarChart3, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: i * 0.1 },
  }),
};

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div id={id} ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

const SERVICES = [
  {
    icon: Brain,
    title: "AI & LLM Integration",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    desc: "I build custom AI assistants, RAG pipelines, multi-agent systems, and LLM-powered applications that integrate seamlessly into your existing products.",
    deliverables: [
      "Custom GPT-powered chatbots",
      "RAG pipelines with vector databases",
      "Multi-agent orchestration systems",
      "OpenAI / HuggingFace integrations",
      "Prompt engineering & fine-tuning",
    ],
  },
  {
    icon: Code2,
    title: "Full-Stack AI Web Apps",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    desc: "End-to-end development of AI-powered web applications — from database architecture to beautiful frontends to cloud deployment.",
    deliverables: [
      "Next.js + FastAPI full-stack apps",
      "Streamlit & Gradio ML interfaces",
      "Cloud deployment on Vercel / Azure",
      "REST API design & development",
      "Authentication & database integration",
    ],
  },
  {
    icon: BookOpen,
    title: "EdTech Product Development",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    desc: "I design and build intelligent learning platforms that adapt to individual students. Think beyond static content — think interactive, AI-driven education.",
    deliverables: [
      "Adaptive learning algorithms",
      "Interactive math & STEM platforms",
      "AI tutoring integrations",
      "Progress tracking dashboards",
      "Gamification & engagement systems",
    ],
  },
  {
    icon: BarChart3,
    title: "Data Science Consulting",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    desc: "From raw data to board-level insights. I build ML models, predictive analytics systems, and data pipelines that drive real business decisions.",
    deliverables: [
      "ML model development & training",
      "Predictive analytics systems",
      "PySpark & Azure data pipelines",
      "Model evaluation & monitoring",
      "Data visualization dashboards",
    ],
  },
];

const PROCESS_STEPS = [
  { step: "01", title: "Discovery", desc: "Deep-dive into your problem, goals, and constraints. We define success criteria clearly before writing a single line of code." },
  { step: "02", title: "Design", desc: "Architecture planning, tech stack selection, wireframes, and system design. You see the plan before execution." },
  { step: "03", title: "Build", desc: "Rapid, iterative development with continuous updates. You get working demos at every milestone." },
  { step: "04", title: "Deploy", desc: "Production-grade deployment with monitoring, documentation, and a smooth handoff." },
  { step: "05", title: "Iterate", desc: "Post-launch support, feedback integration, and continuous improvement. We don't disappear after delivery." },
];

export default function StudioPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-custom">

        {/* Hero */}
        <Section className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-violet-500/20 text-xs font-medium text-violet-300 mb-8">
            <Sparkles size={12} className="text-violet-400" />
            Open for Projects · Response within 24h
          </div>
          <h1 className="font-display font-bold leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
            We Build{" "}
            <span className="gradient-text">Intelligent</span>{" "}
            Products.
            <br />
            <span className="text-slate-500">End to End.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            ZettaMetrics is the studio behind ShaileshGPT, MathPath, and several other AI-powered products.
            If you have a problem that data and intelligence can solve — this is where it gets built.
          </p>
        </Section>

        {/* MathPath Flagship */}
        <Section id="mathpath" className="mb-24">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-blue-600/10 to-violet-600/20" />
            <div className="absolute inset-0 glass" />
            <div className="absolute inset-px rounded-3xl border border-cyan-500/20" />
            <div className="relative px-8 md:px-14 py-12 md:py-16">
              <div className="flex flex-col md:flex-row items-start gap-10">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/25 text-cyan-300 text-xs font-medium mb-5">
                    🚀 Flagship Product · In Development
                  </div>
                  <h2 className="font-display font-bold text-4xl md:text-5xl mb-5 text-white">
                    Math<span className="text-cyan-400">Path</span>
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed mb-6 max-w-xl">
                    An AI-powered EdTech platform that reimagines how students learn mathematics.
                    Adaptive, interactive, and intelligent — MathPath meets every student where they are
                    and takes them further than they thought possible.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {[
                      "Adaptive difficulty engine",
                      "AI-powered tutoring",
                      "Interactive problem sets",
                      "Progress analytics",
                      "Gamified learning paths",
                      "Curriculum alignment",
                    ].map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle size={13} className="text-cyan-400 shrink-0" />
                        {feat}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                    Currently in active development — coming soon
                  </div>
                </div>
                <div className="md:w-64 glass rounded-2xl p-6 border border-cyan-500/15 shrink-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Tech Stack</p>
                  {["Next.js", "TypeScript", "AI Tutoring API", "PostgreSQL", "Vercel", "Tailwind CSS"].map((t) => (
                    <div key={t} className="flex items-center gap-2 py-2 border-b border-white/5 last:border-0 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Services */}
        <Section className="mb-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Services</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-12">
            What We <span className="gradient-text">Deliver.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className={`glass rounded-2xl p-8 border ${service.border} transition-all duration-300`}
                >
                  <div className={`w-11 h-11 rounded-xl ${service.bg} flex items-center justify-center mb-5`}>
                    <Icon size={20} className={service.color} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-3">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle size={13} className={service.color} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </Section>

        {/* Process */}
        <Section className="mb-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">How We Work</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-12">
            The <span className="gradient-text">Process.</span>
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                custom={i}
                variants={fadeUp}
                className="glass rounded-2xl p-5 border border-white/5 hover:border-blue-500/15 transition-all duration-300 group"
              >
                <div className="font-mono text-xs text-blue-400/60 mb-3 group-hover:text-blue-400 transition-colors">{step.step}</div>
                <h3 className="font-display font-bold text-base text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <Section>
          <div className="text-center glass rounded-3xl p-12 border border-white/5">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Ready to Build?
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
              Share your idea. I&apos;ll tell you exactly how to bring it to life — and build it with you.
            </p>
            <Link href="/contact">
              <button className="group relative px-8 py-3.5 rounded-xl overflow-hidden font-semibold text-sm inline-flex items-center gap-2">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 blur-xl opacity-0 group-hover:opacity-60 transition-opacity" />
                <span className="relative text-white flex items-center gap-2">
                  Start a Project
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
          </div>
        </Section>
      </div>
    </div>
  );
}
