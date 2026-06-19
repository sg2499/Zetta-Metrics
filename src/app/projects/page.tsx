"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, ExternalLink, Search } from "lucide-react";
import { projects } from "@/lib/content";
import { GithubIcon } from "@/components/BrandIcons";

const filters = ["All", "AI product", "EdTech", "Data science", "Recommendation"];

const categoryMap: Record<string, string[]> = {
  "AI product": ["ShaileshGPT", "Deep Research Agent", "OpenAI QA ChatBot"],
  EdTech: ["MathPath Platform", "Campus Placement Predictor"],
  "Data science": ["Stock Price Predictor", "Campus Placement Predictor"],
  Recommendation: ["Movie Recommender System", "Udemy Course Recommender"],
};

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.05, ease },
  }),
};

export default function ProjectsPage() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All"
      ? projects
      : projects.filter((project) => categoryMap[active]?.includes(project.title));

  return (
    <div className="px-6 pb-20 pt-32">
      <div className="container-custom">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="eyebrow">Proof of work</p>
          <h1 className="font-display text-5xl font-bold leading-tight text-white md:text-6xl">
            A public trail of systems built, tested, and explained.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            This page turns repositories into business proof. Each card connects
            a problem area, a stack, and a reason it matters for client work.
          </p>
        </div>

        <div className="mb-10 flex flex-col gap-4 rounded-3xl border border-white/8 bg-white/[0.025] p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <Search size={16} className="text-cyan-300" />
            Filter by the type of proof a client would care about.
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActive(filter)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active === filter
                    ? "bg-cyan-400 text-slate-950"
                    : "border border-white/8 bg-white/[0.03] text-slate-400 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {filtered.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.article
                  key={project.title}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  variants={fadeUp}
                  className="premium-card flex min-h-[390px] flex-col"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/8 p-3 text-cyan-200">
                      <Icon size={22} />
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                      {project.eyebrow}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-white">{project.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{project.summary}</p>
                  <div className="mt-5 rounded-2xl border border-white/8 bg-black/10 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Why it matters
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{project.proof}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tag) => (
                      <span key={tag} className="tech-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    {project.href.startsWith("/") ? (
                      <Link href={project.href} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white">
                        Details <ArrowRight size={14} />
                      </Link>
                    ) : (
                      <a href={project.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white">
                        Details <ExternalLink size={14} />
                      </a>
                    )}
                    <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-200">
                      <GithubIcon size={14} /> Repo
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
