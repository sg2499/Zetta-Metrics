"use client";

import Link from "next/link";
import { ArrowRight, Bot, BriefcaseBusiness, CheckCircle2, Layers3, LineChart, ShieldCheck } from "lucide-react";
import { flagshipWork, proofPoints } from "@/lib/content";

const services = [
  {
    icon: Bot,
    title: "AI assistants",
    copy: "Grounded chat, RAG knowledge bases, lead capture, analytics, and internal workflow copilots.",
  },
  {
    icon: Layers3,
    title: "AI MVPs",
    copy: "A scoped product v1 with frontend, backend, AI logic, deployment, and handoff notes.",
  },
  {
    icon: LineChart,
    title: "Data products",
    copy: "ML models, dashboards, pipelines, and decision systems built for operators, not demos.",
  },
];

const process = [
  ["01", "Define the business problem"],
  ["02", "Design the smallest useful product"],
  ["03", "Build, deploy, and document v1"],
];

export default function HomePage() {
  return (
    <div className="site-page">
      <section className="container-custom grid min-h-[calc(100vh-8rem)] items-center gap-12 lg:grid-cols-[1fr_380px]">
        <div>
          <p className="eyebrow">AI product studio</p>
          <h1 className="page-title">
            AI systems that are useful, usable, and ready to ship.
          </h1>
          <p className="page-copy">
            ZettaMetrics is Shailesh Gupta&apos;s founder-led studio for building
            LLM applications, EdTech platforms, and data products with a clear
            path from problem to production-ready v1.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Start a project <ArrowRight size={16} />
            </Link>
            <Link href="/projects" className="btn-secondary">
              View proof
            </Link>
          </div>
        </div>

        <aside className="premium-card">
          <div className="flex items-center gap-3 border-b border-white/8 pb-5">
            <div className="rounded-lg border border-cyan-400/15 bg-cyan-400/8 p-3 text-cyan-200">
              <BriefcaseBusiness size={21} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Best fit</p>
              <h2 className="font-display text-xl font-semibold text-white">Client-ready builds</h2>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            {[
              "You have an AI or product idea and need a working MVP.",
              "You need a business assistant grounded in your own knowledge.",
              "You want an EdTech or data platform built with product discipline.",
            ].map((item) => (
              <div key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-cyan-300" />
                {item}
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="container-custom section">
        <div className="section-heading">
          <p className="eyebrow">What we build</p>
          <h2>Three offers, one clean product path.</h2>
          <p>
            The site should make the work obvious in seconds: what ZettaMetrics
            builds, why it is credible, and how a client starts.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="premium-card">
                <div className="mb-5 inline-flex rounded-lg border border-cyan-400/15 bg-cyan-400/8 p-3 text-cyan-200">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{service.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container-custom section">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div>
            <p className="eyebrow">Proof</p>
            <h2 className="section-title">Real systems behind the brand.</h2>
            <p className="section-copy">
              ZettaMetrics is positioned around inspectable work: repositories,
              product flows, architecture, writing, and deployed systems.
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
            {flagshipWork.slice(0, 2).map((project) => {
              const Icon = project.icon;
              return (
                <article key={project.title} className="premium-card">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="rounded-lg border border-cyan-400/15 bg-cyan-400/8 p-3 text-cyan-200">
                      <Icon size={20} />
                    </div>
                    <span className="text-xs text-slate-500">{project.eyebrow}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{project.summary}</p>
                  <Link href={project.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white">
                    View details <ArrowRight size={14} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-custom section">
        <div className="grid gap-3 rounded-lg border border-white/8 bg-white/[0.025] p-4 md:grid-cols-3">
          {process.map(([step, label]) => (
            <div key={step} className="flex items-center gap-4 rounded-lg border border-white/8 bg-black/10 p-4">
              <div className="font-mono text-xs text-cyan-300">{step}</div>
              <div className="text-sm font-semibold text-slate-200">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-custom section pb-0">
        <div className="cta-band text-center">
          <ShieldCheck size={22} className="mx-auto text-cyan-300" />
          <h2 className="font-display mx-auto mt-5 max-w-3xl text-3xl font-semibold leading-tight text-white md:text-5xl">
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
