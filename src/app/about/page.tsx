"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { GraduationCap, Briefcase, Code2, Brain, Database, Globe, Cpu, BookOpen } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: i * 0.1 },
  }),
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

const SKILLS = [
  {
    category: "Languages & Tools",
    icon: Code2,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    items: ["Python", "SQL", "TypeScript", "JavaScript", "Bash"],
  },
  {
    category: "ML & Deep Learning",
    icon: Brain,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    items: ["TensorFlow", "Keras", "PyTorch", "Scikit-Learn", "LSTM", "NLP", "Computer Vision"],
  },
  {
    category: "Data & Cloud",
    icon: Database,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    items: ["PySpark", "Azure", "Pandas", "NumPy", "PostgreSQL", "ETL Pipelines"],
  },
  {
    category: "Generative AI",
    icon: Cpu,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    items: ["OpenAI API", "LangChain", "HuggingFace", "RAG", "Multi-Agent Systems", "Prompt Engineering"],
  },
  {
    category: "Web & Deployment",
    icon: Globe,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    items: ["Next.js", "React", "FastAPI", "Streamlit", "Gradio", "Vercel", "Docker"],
  },
];

const TIMELINE = [
  {
    period: "2024 – Present",
    role: "Master's in Data Science & AI",
    org: "IIT Roorkee",
    description: "Pursuing MDSAI — one of India's most prestigious data science programs. Specializing in LLMs, deep learning architecture, and applied AI systems.",
    icon: GraduationCap,
    color: "text-blue-400",
    dot: "bg-blue-400",
  },
  {
    period: "2023 – 2024",
    role: "Data Scientist",
    org: "Teleperformance",
    description: "Built ML models for attrition prediction and credit risk assessment. Engineered PySpark pipelines on Azure for large-scale data processing. Delivered measurable business impact through predictive analytics.",
    icon: Briefcase,
    color: "text-cyan-400",
    dot: "bg-cyan-400",
  },
  {
    period: "2023 – Present",
    role: "Freelance AI Engineer & Studio Founder",
    org: "ZettaMetrics",
    description: "Building end-to-end AI products and EdTech platforms for clients. Products include MathPath and ShaileshGPT. Consulting on LLM integration, full-stack AI apps, and data science pipelines.",
    icon: Code2,
    color: "text-violet-400",
    dot: "bg-violet-400",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-custom">

        {/* Hero */}
        <Section className="text-center mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">About Me</p>
          <h1 className="font-display font-bold leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            The Mind Behind{" "}
            <span className="gradient-text">ZettaMetrics.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            I am Shailesh Gupta — a Data Scientist, AI/LLM Engineer, and product builder
            with 2+ years of industry experience and a Master&apos;s degree from IIT Roorkee.
            I don&apos;t just build models. I build products that change how people learn, work, and decide.
          </p>
        </Section>

        {/* Story */}
        <Section className="mb-24">
          <div className="glass rounded-3xl p-8 md:p-12 border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen size={18} className="text-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">My Story</span>
            </div>
            <div className="space-y-4 text-slate-300 leading-relaxed text-base max-w-3xl">
              <p>
                I started my journey as a Data Scientist at <strong className="text-white">Teleperformance</strong>, where I built
                machine learning models that directly influenced multi-million dollar business decisions — from predicting
                employee attrition to modeling credit risk. Working with PySpark on Azure at scale taught me that
                <span className="text-blue-300"> real-world data is messy, and real-world impact requires rigorous engineering</span>.
              </p>
              <p>
                That experience pushed me to go deeper. I enrolled in the <strong className="text-white">Master&apos;s in Data Science & AI program at IIT Roorkee</strong> —
                one of India&apos;s most selective technical programs — to master the mathematical and architectural foundations
                of modern intelligence systems.
              </p>
              <p>
                Simultaneously, I founded <strong className="text-white">ZettaMetrics</strong> — my studio for building AI-powered products and
                consulting for clients who want to leverage the latest in LLMs, deep learning, and intelligent software.
                My current flagship product is <span className="text-cyan-300">MathPath</span>, an adaptive EdTech platform that
                reimagines how students engage with mathematics.
              </p>
              <p className="text-blue-300 font-medium italic">
                &ldquo;I believe the best AI products are invisible — they feel like intelligence, not software.&rdquo;
              </p>
            </div>
          </div>
        </Section>

        {/* Timeline */}
        <Section className="mb-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Experience</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-12">
            The <span className="gradient-text">Journey.</span>
          </h2>
          <div className="relative">
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-cyan-500/30 to-transparent" />
            <div className="space-y-8">
              {TIMELINE.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.role}
                    custom={i}
                    variants={fadeUp}
                    className="relative pl-14 md:pl-20"
                  >
                    <div className={`absolute left-0 top-0 w-8 md:w-12 h-8 md:h-12 rounded-xl md:rounded-2xl glass flex items-center justify-center border border-white/10`}>
                      <Icon size={16} className={item.color} />
                    </div>
                    <div className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="font-mono text-xs text-slate-500">{item.period}</span>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                        <span className="text-xs text-slate-400">{item.org}</span>
                      </div>
                      <h3 className="font-display font-bold text-lg text-white mb-2">{item.role}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Section>

        {/* Skills */}
        <Section>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Skills</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-12">
            Full-Spectrum <span className="gradient-text">Expertise.</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILLS.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.category}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-xl ${skill.bg} flex items-center justify-center mb-4`}>
                    <Icon size={18} className={skill.color} />
                  </div>
                  <h3 className="font-display font-semibold text-sm text-white mb-3">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span key={item} className="px-3 py-1 rounded-full text-xs font-medium glass text-slate-300 border border-white/5">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Section>
      </div>
    </div>
  );
}
