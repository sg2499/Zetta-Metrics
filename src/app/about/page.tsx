"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { brand, skillGroups, timeline } from "@/lib/content";

export default function AboutPage() {
  return (
    <div className="site-page">
      <div className="container-custom">
        <section className="page-hero grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">Founder</p>
            <h1 className="page-title">Shailesh Gupta builds the proof behind ZettaMetrics.</h1>
          </div>
          <div className="premium-card">
            <p className="text-base leading-8 text-slate-300">
              I am a Data Scientist and AI product builder with experience across
              ML models, PySpark and Azure pipelines, LLM systems, and full-stack
              product development. {brand.name} is the business wrapper around
              that work: a studio for building useful AI and data products for clients.
            </p>
          </div>
        </section>

        <section className="section pt-0">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="premium-card">
              <p className="eyebrow">Operating belief</p>
              <h2 className="font-display text-3xl font-semibold leading-tight text-white">
                Good AI products are engineered workflows.
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-400">
                <p>
                  The work starts with a business problem, then moves through data,
                  user flows, constraints, backend logic, interface design, and deployment.
                </p>
                <p>
                  That is the promise of ZettaMetrics: a practical path from idea
                  to working product.
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
          <div className="grid gap-4">
            {timeline.map((item) => {
              const Icon = item.icon;
              return (
                <article key={`${item.period}-${item.role}`} className="premium-card grid gap-5 md:grid-cols-[150px_1fr]">
                  <div>
                    <div className="inline-flex rounded-lg border border-cyan-400/15 bg-cyan-400/8 p-3 text-cyan-200">
                      <Icon size={20} />
                    </div>
                    <p className="mt-4 font-mono text-xs text-slate-500">{item.period}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-cyan-200">{item.org}</p>
                    <h3 className="font-display mt-1 text-2xl font-semibold text-white">{item.role}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{item.detail}</p>
                  </div>
                </article>
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
            {skillGroups.map((group) => {
              const Icon = group.icon;
              return (
                <article key={group.title} className="premium-card">
                  <div className="mb-5 inline-flex rounded-lg border border-cyan-400/15 bg-cyan-400/8 p-3 text-cyan-200">
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
                </article>
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
              <h2 className="font-display text-3xl font-semibold text-white">Verify the professional trail.</h2>
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
