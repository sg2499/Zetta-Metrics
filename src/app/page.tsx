import { ArrowRight, CheckCircle2 } from "lucide-react";
import { brand, platformPillars, proofPoints, products, processSteps } from "@/lib/content";
import ProductCard from "@/components/sections/ProductCard";
import HeroBackground from "@/components/sections/HeroBackground";
import HeroOrb from "@/components/sections/HeroOrb";
import Reveal from "@/components/motion/Reveal";
import MagneticLink from "@/components/motion/MagneticLink";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28">
        <HeroBackground />
        <HeroOrb />
        <div className="container-custom relative z-10">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <Reveal>
                <p className="eyebrow mb-5">AI-native automation platform</p>
                <h1
                  className="text-balance font-display text-[3.4rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[5.5rem]"
                  style={{ color: "var(--text-primary)" }}
                >
                  Turn manual work into
                  <span className="gradient-text"> intelligent workflows.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-pretty mt-6 text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                  {brand.positioning}{" "}
                  Education is where we started — MathPath is live in schools
                  today, and School Enrichment is our second product built the
                  same way. Neither is the ceiling on what we&apos;re building next.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <MagneticLink href="/products" className="btn-primary px-6 py-3.5 text-sm">
                    Explore our products <ArrowRight size={16} />
                  </MagneticLink>
                  <MagneticLink href="/company" className="btn-secondary px-6 py-3.5 text-sm">
                    About Zetta Metrics
                  </MagneticLink>
                </div>
              </Reveal>

              <Reveal delay={0.24}>
                <dl className="mt-14 grid grid-cols-2 items-stretch gap-4 sm:grid-cols-4">
                  {proofPoints.map((p) => (
                    <div
                      key={p.label}
                      className="hover-card flex h-full flex-col rounded-xl border p-4"
                      style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-raised)" }}
                    >
                      <dt className="text-balance font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                        {p.value}
                      </dt>
                      <dd className="text-pretty mt-1 text-xs leading-5" style={{ color: "var(--text-muted)" }}>
                        {p.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal delay={0.2} y={16}>
              <div className="glass-panel hover-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
                  What Zetta actually builds
                </p>
                <ul className="mt-5 space-y-4">
                  {[
                    "AI/ML embedded in the core product logic, not a bolt-on chat widget.",
                    "Reusable workflow foundations — roles, assignments, approvals, scoring — built once, adapted per product.",
                    "Production-grade security and data handling from day one, for any client we build for.",
                    "A platform designed to add the next product without rebuilding the last one.",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-3 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Platform pillars */}
      <section className="py-20">
        <div className="container-custom">
          <Reveal>
            <p className="eyebrow mb-4">The platform</p>
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
              Built once, reused on purpose.
            </h2>
            <p className="text-pretty mt-4 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
              We engineer for reuse, not one-off builds — the same foundations
              carry from one product, one client, and one industry to the next.
            </p>
          </Reveal>
          <div className="mt-12 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {platformPillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.06} className="h-full">
                <div className="hover-card surface-card flex h-full flex-col p-6">
                  <pillar.icon size={22} style={{ color: "var(--accent)" }} />
                  <h3 className="mt-4 font-display text-base font-bold" style={{ color: "var(--text-primary)" }}>
                    {pillar.title}
                  </h3>
                  <p className="text-pretty mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                    {pillar.summary}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="container-custom">
          <Reveal>
            <p className="eyebrow mb-4">Products</p>
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
              Where we&apos;ve started.
            </h2>
            <p className="text-pretty mt-4 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
              Two real, working products — the first of many we plan to build
              as a SaaS company.
            </p>
          </Reveal>
          <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2">
            {products.map((product, i) => (
              <Reveal key={product.slug} delay={i * 0.08} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container-custom">
          <Reveal>
            <p className="eyebrow mb-4">How we build</p>
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
              From manual process to shipped product.
            </h2>
            <p className="text-pretty mt-4 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
              The same three-stage approach, every time — it&apos;s what lets a second
              product start ahead of where the first one finished.
            </p>
          </Reveal>
          <div className="mt-12 grid items-stretch gap-5 md:grid-cols-3">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08} className="h-full">
                <div className="hover-card surface-card flex h-full flex-col p-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold"
                      style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
                    >
                      {i + 1}
                    </div>
                    <step.icon size={20} style={{ color: "var(--accent)" }} />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold" style={{ color: "var(--text-primary)" }}>
                    {step.title}
                  </h3>
                  <p className="text-pretty mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                    {step.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom">
          <Reveal>
            <div className="surface-card flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-balance font-display text-2xl font-bold sm:text-3xl" style={{ color: "var(--text-primary)" }}>
                  Have a workflow like this?
                </h2>
                <p className="text-pretty mt-3 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                  Tell us about the process you&apos;re trying to fix — it&apos;s
                  probably a fit for what we build.
                </p>
              </div>
              <MagneticLink href="/contact" className="btn-primary shrink-0 whitespace-nowrap px-6 py-3.5 text-sm">
                Talk to us <ArrowRight size={16} />
              </MagneticLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
