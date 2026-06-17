"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight, Star, Code2, Brain, BookOpen,
  Rocket, Sparkles, ChevronRight, ExternalLink
} from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";

// ─── Data ──────────────────────────────────────────────────────────────────

const STATS = [
  { value: "2+", label: "Years Experience" },
  { value: "22+", label: "GitHub Repos" },
  { value: "10+", label: "Projects Deployed" },
  { value: "IIT Roorkee", label: "MDSAI Program" },
];

const FEATURED_PROJECTS = [
  {
    title: "ShaileshGPT",
    description: "An AI-powered personal portfolio assistant that answers recruiter and client questions, performs JD-fit analysis, and speaks on my behalf 24/7.",
    tags: ["OpenAI", "LangChain", "React", "FastAPI"],
    href: "/chat",
    icon: "🤖",
    gradient: "from-blue-600/20 to-cyan-500/10",
    border: "border-blue-500/20",
    glow: "rgba(59,130,246,0.1)",
  },
  {
    title: "Deep Research Agent",
    description: "A multi-agent research system that clarifies, plans, searches, synthesizes, and delivers professional long-form reports with email delivery.",
    tags: ["OpenAI Agents SDK", "Gradio", "Pydantic", "SendGrid"],
    href: "/projects",
    icon: "🔎",
    gradient: "from-violet-600/20 to-indigo-500/10",
    border: "border-violet-500/20",
    glow: "rgba(139,92,246,0.1)",
  },
  {
    title: "MathPath",
    description: "A full-stack EdTech platform designed to make mathematics intuitive, adaptive, and deeply engaging for students of all levels.",
    tags: ["Next.js", "AI", "EdTech", "TypeScript"],
    href: "/studio",
    icon: "📐",
    gradient: "from-cyan-600/20 to-teal-500/10",
    border: "border-cyan-500/20",
    glow: "rgba(6,182,212,0.1)",
  },
];

const TECH_STACK = [
  "Python", "PyTorch", "TensorFlow", "Scikit-Learn", "PySpark",
  "Azure", "LangChain", "OpenAI", "HuggingFace", "Next.js",
  "FastAPI", "Streamlit", "Gradio", "PostgreSQL", "Docker",
  "Python", "PyTorch", "TensorFlow", "Scikit-Learn", "PySpark",
  "Azure", "LangChain", "OpenAI", "HuggingFace", "Next.js",
  "FastAPI", "Streamlit", "Gradio", "PostgreSQL", "Docker",
];

const SERVICES = [
  {
    icon: Brain,
    title: "AI & LLM Integration",
    description: "Custom AI assistants, RAG pipelines, and LLM-powered products built on OpenAI, LangChain, and HuggingFace.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Code2,
    title: "Full-Stack AI Apps",
    description: "End-to-end deployment of AI-powered web applications using Next.js, FastAPI, and Streamlit.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: BookOpen,
    title: "EdTech Products",
    description: "Intelligent, adaptive learning platforms that make education deeply engaging and effective.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Star,
    title: "Data Science Consulting",
    description: "End-to-end ML model development, predictive analytics, and PySpark data pipelines on Azure.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

// ─── Animation Variants ────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: i * 0.1 },
  }),
};

// ─── Subcomponents ─────────────────────────────────────────────────────────

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="relative">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/20 text-xs font-medium text-blue-300 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          MDSAI @ IIT Roorkee · Open to Freelance Projects
          <ChevronRight size={12} className="text-blue-400" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold leading-[1.05] tracking-tight max-w-5xl"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
        >
          Turning Data Into{" "}
          <span className="gradient-text">Intelligence.</span>
          <br />
          Intelligence Into{" "}
          <span className="gradient-text-violet">Products.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 text-slate-400 text-lg max-w-2xl leading-relaxed"
        >
          I&apos;m <span className="text-white font-medium">Shailesh Gupta</span> — a Data Scientist and AI Engineer building
          world-class machine learning systems, intelligent applications, and EdTech
          platforms that solve real problems at scale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/projects">
            <button className="group relative px-7 py-3.5 rounded-xl overflow-hidden font-semibold text-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2 text-white">
                Explore My Work
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </Link>
          <Link href="/chat">
            <button className="group px-7 py-3.5 rounded-xl glass border border-white/10 hover:border-blue-500/30 font-semibold text-sm text-slate-300 hover:text-white transition-all duration-200 flex items-center gap-2">
              <Sparkles size={15} className="text-blue-400" />
              Talk to ShaileshGPT
            </button>
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 flex items-center gap-6 text-xs text-slate-500"
        >
          <a href="https://github.com/sg2499" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
            <GithubIcon size={13} /> sg2499
          </a>
          <span>·</span>
          <a href="https://prismatic-metrics.blogspot.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
            <BookOpen size={13} /> Prismatic Metrics
          </a>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Rocket size={13} className="text-blue-400" /> IIT Roorkee
          </span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-blue-500/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="section">
        <div className="container-custom">
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={fadeUp}
                  className="glass rounded-2xl p-6 text-center hover:border-blue-500/20 transition-all duration-300 group"
                >
                  <div className="font-display font-bold text-3xl gradient-text group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="section">
        <div className="container-custom">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Featured Work</p>
                <h2 className="font-display font-bold text-4xl md:text-5xl">
                  Built to <span className="gradient-text">Impress.</span>
                </h2>
              </div>
              <Link href="/projects" className="hidden md:flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors group">
                All Projects
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED_PROJECTS.map((project, i) => (
              <AnimatedSection key={project.title}>
                <motion.div
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className={`glass rounded-2xl p-6 border ${project.border} bg-gradient-to-br ${project.gradient} group cursor-pointer h-full flex flex-col`}
                  style={{
                    boxShadow: `0 0 0 0 ${project.glow}`,
                    transition: "box-shadow 0.3s ease",
                  }}
                  onHoverStart={(e) => {
                    (e.target as HTMLElement).style.boxShadow = `0 20px 60px ${project.glow}`;
                  }}
                  onHoverEnd={(e) => {
                    (e.target as HTMLElement).style.boxShadow = `0 0 0 0 ${project.glow}`;
                  }}
                >
                  <div className="text-4xl mb-4">{project.icon}</div>
                  <h3 className="font-display font-bold text-xl mb-2 text-white">{project.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium glass text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={project.href}>
                    <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:gap-2.5 transition-all duration-200">
                      View Project <ArrowRight size={13} />
                    </div>
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK MARQUEE ── */}
      <section className="section overflow-hidden">
        <div className="container-custom mb-8">
          <AnimatedSection>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
              Tech Stack
            </p>
          </AnimatedSection>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />
          <div className="animate-marquee">
            {TECH_STACK.map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="mx-6 px-5 py-2.5 glass rounded-full text-sm font-medium text-slate-400 whitespace-nowrap border border-white/5 hover:text-white hover:border-blue-500/20 transition-colors duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">What I Do</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl">
                Full-Spectrum <span className="gradient-text">Intelligence.</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <AnimatedSection key={service.title}>
                  <motion.div
                    custom={i}
                    variants={fadeUp}
                    whileHover={{ y: -4, transition: { duration: 0.25 } }}
                    className="glass rounded-2xl p-6 group hover:border-white/10 transition-all duration-300 h-full"
                  >
                    <div className={`w-10 h-10 rounded-xl ${service.bg} flex items-center justify-center mb-4`}>
                      <Icon size={18} className={service.color} />
                    </div>
                    <h3 className="font-display font-semibold text-base mb-2 text-white">{service.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="section">
        <div className="container-custom">
          <AnimatedSection>
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-violet-600/10 to-cyan-600/20" />
              <div className="absolute inset-0 glass" />
              <div className="absolute inset-px rounded-3xl border border-white/10" />
              <div className="relative px-8 md:px-16 py-14 text-center">
                <Sparkles size={24} className="text-blue-400 mx-auto mb-4" />
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
                  Building something great?
                </h2>
                <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                  Whether it is an AI product, an EdTech platform, or a data science pipeline — let&apos;s build it together.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contact">
                    <button className="group relative px-8 py-3.5 rounded-xl overflow-hidden font-semibold text-sm">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 blur-xl opacity-0 group-hover:opacity-60 transition-opacity" />
                      <span className="relative flex items-center gap-2 text-white">
                        Let&apos;s Talk
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </Link>
                  <Link href="/studio">
                    <button className="px-8 py-3.5 rounded-xl glass border border-white/10 hover:border-white/20 font-semibold text-sm text-slate-300 hover:text-white transition-all flex items-center gap-2">
                      View Studio <ExternalLink size={13} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
