import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { platformPillars, platformFacts, products, processSteps } from "@/lib/content";
import ProductCard from "@/components/sections/ProductCard";
import HeroBackground from "@/components/sections/HeroBackground";
import ProductShowcase from "@/components/sections/ProductShowcase";
import CapabilityMarquee from "@/components/sections/CapabilityMarquee";
import PillarVisual from "@/components/sections/PillarVisual";
import SectionHeader from "@/components/sections/SectionHeader";
import SectionGlow from "@/components/sections/SectionGlow";
import IconBadge from "@/components/sections/IconBadge";
import Reveal from "@/components/motion/Reveal";
import MagneticLink from "@/components/motion/MagneticLink";
import AnimatedStat from "@/components/motion/AnimatedStat";

// Bento placement: [wide][narrow] / [narrow][wide] — a checkerboard rhythm.
const bentoSpan = ["lg:col-span-2", "lg:col-span-1", "lg:col-span-1", "lg:col-span-2"];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24">
        <HeroBackground />
        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <Link href="/products/mathpath" className="announce-pill">
                <span
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider"
                  style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
                >
                  <span className="status-dot pulse-dot" style={{ background: "var(--accent)" }} />
                  Live
                </span>
                MathPath is running in schools today
                <ArrowRight size={14} className="mr-1.5" />
              </Link>
            </Reveal>
            <Reveal delay={0.06}>
              <h1
                className="text-balance mt-8 font-display text-[3.1rem] font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-[4.8rem] lg:text-[5.8rem]"
                style={{ color: "var(--text-primary)" }}
              >
                Turn manual work into <span className="gradient-text">intelligent workflows.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-pretty mx-auto mt-7 max-w-2xl text-lg leading-8 sm:text-xl sm:leading-9" style={{ color: "var(--text-secondary)" }}>
                Zetta Metrics builds AI-native platforms that replace spreadsheets,
                paperwork, and manual hand-offs with software your people
                actually run on.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <MagneticLink href="/products" className="btn-primary px-7 py-4 text-sm">
                  Explore the platform <ArrowRight size={16} />
                </MagneticLink>
                <MagneticLink href="/contact" className="btn-secondary px-7 py-4 text-sm">
                  Talk to us
                </MagneticLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.26} y={40}>
            <div className="mx-auto mt-20 max-w-6xl">
              <ProductShowcase />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Capabilities + facts */}
      <section className="relative pb-24">
        <Reveal>
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
            Running inside the platform today
          </p>
          <CapabilityMarquee />
        </Reveal>
        <div className="container-custom">
          <Reveal delay={0.1}>
            <dl className="mt-16 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
              {platformFacts.map((f, i) => (
                <div
                  key={f.label}
                  className={`px-4 text-center sm:px-6 ${i % 2 === 1 ? "border-l" : ""} ${i === 2 ? "lg:border-l" : ""}`}
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  <dt className="font-display text-5xl font-extrabold tracking-[-0.04em] sm:text-6xl" style={{ color: "var(--text-primary)" }}>
                    <AnimatedStat value={f.value} />
                  </dt>
                  <dd className="text-pretty mx-auto mt-3 max-w-[14rem] text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                    {f.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Platform bento */}
      <section className="relative overflow-hidden py-24">
        <SectionGlow
          blobs={[
            { size: 460, top: "-10%", left: "-10%", color: "primary" },
            { size: 380, bottom: "-14%", right: "-8%", color: "secondary", delay: 4 },
          ]}
        />
        <div className="container-custom">
          <SectionHeader
            eyebrow="The platform"
            title={
              <>
                Built once. <span className="gradient-text">Reused on purpose.</span>
              </>
            }
            description="Every product we ship stands on the same engineered foundation — so each new build starts ahead of where the last one finished."
          />
          <div className="mt-14 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
            {platformPillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.06} className={`h-full ${bentoSpan[i]}`}>
                <div className="surface-card hover-card flex h-full flex-col p-6 sm:p-7">
                  <PillarVisual index={i} />
                  <div className="mt-6 flex items-start gap-4">
                    <IconBadge icon={pillar.icon} />
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                        {pillar.title}
                      </h3>
                      <p className="text-pretty mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                        {pillar.summary}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="relative overflow-hidden py-24">
        <SectionGlow
          blobs={[
            { size: 480, top: "-16%", right: "-10%", color: "tertiary" },
            { size: 340, bottom: "-10%", left: "-6%", color: "primary", delay: 6 },
          ]}
        />
        <div className="container-custom">
          <SectionHeader
            eyebrow="Products"
            title="What we've built."
            description="Two platforms on one foundation — role-based workflows, backend-authoritative logic, and AI woven into the product itself."
          />
          <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2">
            {products.map((product, i) => (
              <Reveal key={product.slug} delay={i * 0.08} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="relative overflow-hidden py-32">
        <SectionGlow blobs={[{ size: 620, top: "-24%", left: "30%", color: "secondary" }]} />
        <div className="container-custom relative z-10">
          <Reveal>
            <p className="eyebrow mb-8 text-center">Our position</p>
            <p
              className="text-balance mx-auto max-w-4xl text-center font-display text-[2.1rem] font-extrabold leading-[1.1] tracking-[-0.035em] sm:text-5xl lg:text-6xl"
              style={{ color: "var(--text-primary)" }}
            >
              We don&apos;t build dashboards that sit on top of how you work.{" "}
              <span style={{ color: "var(--text-muted)" }}>We build the system you</span>{" "}
              <span className="gradient-text">actually run on.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden py-24">
        <SectionGlow blobs={[{ size: 420, top: "-12%", left: "30%", color: "primary" }]} />
        <div className="container-custom">
          <SectionHeader
            eyebrow="How we build"
            title="From manual process to shipped product."
            description="The same three stages, every time — it's what lets every new build start ahead of where the last one left off."
          />
          <div className="relative mt-16">
            {/* Connector line behind the step numbers (desktop) */}
            <div
              className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px md:block"
              style={{ background: "linear-gradient(90deg, transparent, var(--accent), var(--accent-silver), var(--accent), transparent)", opacity: 0.5 }}
              aria-hidden="true"
            />
            <div className="grid items-stretch gap-6 md:grid-cols-3">
              {processSteps.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.1} className="h-full">
                  <div className="flex h-full flex-col items-center text-center">
                    <div
                      className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl font-display text-lg font-extrabold"
                      style={{
                        background: "linear-gradient(150deg, var(--accent-strong), var(--accent))",
                        color: "var(--text-on-accent)",
                        boxShadow: "0 0 0 6px var(--bg-base), 0 12px 32px -8px var(--accent-glow)",
                      }}
                    >
                      0{i + 1}
                    </div>
                    <div className="surface-card hover-card mt-6 flex w-full flex-1 flex-col items-center p-7">
                      <IconBadge icon={step.icon} />
                      <h3 className="mt-5 font-display text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                        {step.title}
                      </h3>
                      <p className="text-pretty mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="container-custom">
          <Reveal>
            <div className="cta-panel relative overflow-hidden px-6 py-16 text-center sm:px-12 sm:py-20">
              <SectionGlow
                blobs={[
                  { size: 460, top: "-40%", left: "-10%", color: "primary" },
                  { size: 400, bottom: "-50%", right: "-8%", color: "secondary", delay: 3 },
                ]}
              />
              <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" style={{ maskImage: "radial-gradient(ellipse at center, black, transparent 70%)" }} aria-hidden="true" />
              <div className="relative">
                <h2 className="section-title text-balance mx-auto max-w-3xl">
                  Still running a core process on spreadsheets and follow-ups?
                </h2>
                <p className="text-pretty mx-auto mt-5 max-w-xl text-base leading-7 sm:text-lg" style={{ color: "var(--text-secondary)" }}>
                  Tell us how it works today. We&apos;ll tell you plainly whether
                  it&apos;s a fit for what we build — and what it would take.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  <MagneticLink href="/contact" className="btn-primary px-7 py-4 text-sm">
                    Talk to us <ArrowRight size={16} />
                  </MagneticLink>
                  <MagneticLink href="/products" className="btn-secondary px-7 py-4 text-sm">
                    Explore products
                  </MagneticLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
