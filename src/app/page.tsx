import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { brand, platformPillars, proofPoints, products, processSteps } from "@/lib/content";
import ProductCard from "@/components/sections/ProductCard";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-28">
        <div className="container-custom">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="eyebrow mb-5">AI-native automation platform</p>
              <h1
                className="text-balance font-display text-[2.6rem] font-extrabold leading-[1.08] tracking-tight sm:text-6xl"
                style={{ color: "var(--text-primary)" }}
              >
                Turn manual work into
                <span className="gradient-text"> intelligent workflows.</span>
              </h1>
              <p className="text-pretty mt-6 text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                {brand.positioning} Education is where we proved it first — MathPath
                is live in schools today, and School Enrichment is the same engine
                built out for full academic delivery.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/products" className="btn-primary px-6 py-3.5 text-sm">
                  Explore our products <ArrowRight size={16} />
                </Link>
                <Link href="/company" className="btn-secondary px-6 py-3.5 text-sm">
                  About Zetta Metrics
                </Link>
              </div>

              <dl className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {proofPoints.map((p) => (
                  <div
                    key={p.label}
                    className="rounded-xl border p-4"
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
            </div>

            <div className="surface-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
                What Zetta actually builds
              </p>
              <ul className="mt-5 space-y-4">
                {[
                  "AI/ML embedded in the core product logic, not a bolt-on chat widget.",
                  "One shared workflow engine — roles, assignments, approvals, scoring.",
                  "Institution-grade security and data handling from day one.",
                  "A platform designed to add the next product without rebuilding the last one.",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Platform pillars */}
      <section className="py-20">
        <div className="container-custom">
          <p className="eyebrow mb-4">The platform</p>
          <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            One engine. Built once, applied everywhere.
          </h2>
          <p className="text-pretty mt-4 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
            Every Zetta product runs on the same underlying platform — not
            separate one-off builds. That's what lets us move from one
            customer to the next without starting over.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {platformPillars.map((pillar) => (
              <div key={pillar.title} className="surface-card p-6">
                <pillar.icon size={22} style={{ color: "var(--accent)" }} />
                <h3 className="mt-4 font-display text-base font-bold" style={{ color: "var(--text-primary)" }}>
                  {pillar.title}
                </h3>
                <p className="text-pretty mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                  {pillar.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="container-custom">
          <p className="eyebrow mb-4">Products</p>
          <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            Two products. One platform.
          </h2>
          <p className="text-pretty mt-4 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
            Both are real, working systems — not concept decks.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container-custom">
          <p className="eyebrow mb-4">How we build</p>
          <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            From manual process to shipped product.
          </h2>
          <p className="text-pretty mt-4 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
            The same three-stage approach, every time — it's what lets a second
            product start ahead of where the first one finished.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {processSteps.map((step, i) => (
              <div key={step.title} className="surface-card p-6">
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom">
          <div className="surface-card flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-balance font-display text-2xl font-bold sm:text-3xl" style={{ color: "var(--text-primary)" }}>
                Have a workflow like this?
              </h2>
              <p className="text-pretty mt-3 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                Tell us about the process you&apos;re trying to fix — we&apos;ll show
                you how the platform applies to it.
              </p>
            </div>
            <Link href="/contact" className="btn-primary shrink-0 whitespace-nowrap px-6 py-3.5 text-sm">
              Talk to us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
