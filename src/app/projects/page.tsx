"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { flagshipWork, projects } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, delay: i * 0.06, ease },
  }),
};

export default function ProjectsPage() {
  const secondary = projects.filter(
    (project) => !["ShaileshGPT", "MathPath Platform"].includes(project.title)
  );

  return (
    <div className="px-6 pb-20 pt-32">
      <div className="container-custom">
        <section className="mx-auto mb-14 max-w-3xl text-center">
          <p className="eyebrow">Work</p>
          <h1 className="font-display text-5xl font-bold leading-tight text-white md:text-6xl">
            Proof that the studio can build real systems.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Start with the flagship products, then inspect the broader project
            archive for AI, ML, recommender, and data science work.
          </p>
        </section>

        <section className="mb-16 grid gap-5 lg:grid-cols-2">
          {flagshipWork.slice(0, 2).map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.article
                key={project.title}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={index}
                className="premium-card"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/8 p-3 text-cyan-200">
                    <Icon size={22} />
                  </div>
                  <span className="rounded-full border border-white/8 px-3 py-1 text-xs text-slate-500">
                    {project.eyebrow}
                  </span>
                </div>
                <h2 className="font-display text-3xl font-semibold text-white">{project.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-400">{project.summary}</p>
                <div className="mt-5 rounded-2xl border border-white/8 bg-black/10 p-4 text-sm leading-7 text-slate-300">
                  {project.proof}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <span key={tag} className="tech-pill">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex items-center gap-5">
                  <Link href={project.href} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white">
                    View details <ArrowRight size={14} />
                  </Link>
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-200">
                    <GithubIcon size={14} /> Repository
                  </a>
                </div>
              </motion.article>
            );
          })}
        </section>

        <section>
          <div className="mb-7 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Archive</p>
              <h2 className="font-display text-3xl font-semibold text-white">Selected supporting projects</h2>
            </div>
            <a href="https://github.com/sg2499" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white">
              Full GitHub <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {secondary.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.article
                  key={project.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  custom={index}
                  className="rounded-2xl border border-white/8 bg-white/[0.025] p-5"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-xl border border-white/8 bg-white/[0.035] p-2 text-cyan-200">
                      <Icon size={18} />
                    </div>
                    <span className="text-xs text-slate-500">{project.eyebrow}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{project.summary}</p>
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-200 hover:text-white">
                    <GithubIcon size={14} /> Repository
                  </a>
                </motion.article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
