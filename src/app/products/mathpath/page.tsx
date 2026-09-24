import type { Metadata } from "next";
import { ArrowRight, Lock } from "lucide-react";
import { products } from "@/lib/content";
import ProductShowcase from "@/components/sections/ProductShowcase";
import WorkspaceRows from "@/components/sections/WorkspaceRows";
import ProductFacts from "@/components/sections/ProductFacts";
import SectionHeader from "@/components/sections/SectionHeader";
import SectionGlow from "@/components/sections/SectionGlow";
import HeroBackground from "@/components/sections/HeroBackground";
import IconBadge from "@/components/sections/IconBadge";
import Reveal from "@/components/motion/Reveal";
import MagneticLink from "@/components/motion/MagneticLink";

const product = products.find((p) => p.slug === "mathpath")!;
const competitionPath = ("competitionPath" in product && product.competitionPath) || [];

export const metadata: Metadata = {
  title: product.name,
  description: product.summary,
};

export default function MathPathPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24">
        <HeroBackground />
        <div className="container-custom relative z-10">
          <div className="text-center">
            <Reveal immediate>
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold"
                style={{ borderColor: "var(--glass-border)", background: "var(--glass-bg)", color: "var(--status-live)" }}
              >
                <span className="status-dot pulse-dot" style={{ backgroundColor: "var(--status-live)" }} />
                {product.statusLabel} · {product.eyebrow}
              </span>
              <h1 className="mt-7 font-display text-[3.4rem] font-extrabold leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-8xl" style={{ color: "var(--text-primary)" }}>
                MathPath <span className="gradient-text">Platform</span>
              </h1>
              <p className="mt-6 text-balance font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl" style={{ color: "var(--text-primary)" }}>
                {product.tagline}
              </p>
              <p className="mt-5 text-base leading-7 sm:text-lg sm:leading-8" style={{ color: "var(--text-secondary)" }}>
                {product.summary}
              </p>
            </Reveal>
            <Reveal immediate delay={0.1}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <MagneticLink href="#workspaces" className="btn-primary px-7 py-4 text-sm">
                  See the workspaces <ArrowRight size={16} />
                </MagneticLink>
                <MagneticLink href="/contact" className="btn-secondary px-7 py-4 text-sm">
                  Want a platform like this?
                </MagneticLink>
              </div>
              <p className="mt-5 text-xs leading-5" style={{ color: "var(--text-muted)" }}>
                <Lock size={12} className="mr-1.5 inline-block -translate-y-px" /> A private platform, live exclusively for MathPath&apos;s own students and teachers.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={40}>
            <div className="mt-16">
              <ProductShowcase />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Product facts */}
      <section className="relative pb-8">
        <div className="container-custom">
          <ProductFacts slug="mathpath" />
        </div>
      </section>

      {/* The competition path: mock exams → practice papers → the Annual Competition */}
      <section className="band relative overflow-hidden py-24">
        <SectionGlow
          blobs={[
            { size: 460, top: "0%", left: "-8%", color: "primary" },
            { size: 400, bottom: "0%", right: "-8%", color: "secondary", delay: 4 },
          ]}
        />
        <div className="container-custom">
          <SectionHeader
            eyebrow="The competition path"
            title={
              <>
                From the first mock <span className="gradient-text">to the main event.</span>
              </>
            }
            description="MathPath's Annual Competition is the highlight of every student's year. The platform prepares each student for it step by step, then runs the event itself."
          />
          <ol className="relative mt-14 grid items-stretch gap-5 md:grid-cols-3">
            {/* connecting rule behind the step markers (desktop) */}
            <div
              className="pointer-events-none absolute left-[16%] right-[16%] top-[2.1rem] hidden h-px md:block"
              style={{ background: "linear-gradient(90deg, transparent, var(--accent), var(--glow-secondary), var(--accent), transparent)" }}
              aria-hidden="true"
            />
            {competitionPath.map((step, i) => {
              const finale = i === competitionPath.length - 1;
              return (
                <Reveal key={step.title} delay={i * 0.08} className="h-full">
                  <li
                    className="surface-card hover-card relative flex h-full flex-col p-7"
                    style={finale ? { borderColor: "var(--accent)", boxShadow: "var(--shadow-glow)" } : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <IconBadge icon={step.icon} />
                      <span className="font-display text-xs font-extrabold uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>
                        {finale ? "The main event" : `Step ${String(i + 1).padStart(2, "0")}`}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                      {step.detail}
                    </p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Workspaces */}
      <section id="workspaces" className="relative scroll-mt-24 overflow-hidden py-24">
        <SectionGlow
          blobs={[
            { size: 480, top: "10%", right: "-12%", color: "primary" },
            { size: 400, bottom: "10%", left: "-12%", color: "secondary", delay: 5 },
          ]}
        />
        <div className="container-custom">
          <SectionHeader
            eyebrow="Three workspaces"
            title={
              <>
                One platform. <span className="gradient-text">Built for every role.</span>
              </>
            }
            description="Admins, teachers, and students each get a workspace scoped to exactly what they need to do — all running on the same server-authoritative core."
          />
          <div className="mt-20">
            <WorkspaceRows />
          </div>
        </div>
      </section>

      {/* Platform highlights */}
      <section className="relative overflow-hidden py-24">
        <SectionGlow blobs={[{ size: 460, top: "0%", left: "30%", color: "tertiary" }]} />
        <div className="container-custom">
          <SectionHeader
            eyebrow="Under the hood"
            title="What's in the platform."
            description="The mechanics that make the platform trustworthy enough to run MathPath's abacus program every day, and its Annual Competition once a year."
          />
          <div className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.05} className="h-full">
                <div className="surface-card hover-card flex h-full flex-col p-7">
                  <IconBadge icon={h.icon} />
                  <h3 className="mt-5 font-display text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                    {h.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                    {h.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="container-custom">
          <Reveal>
            <div className="cta-panel relative flex flex-col items-start gap-8 overflow-hidden p-10 sm:p-14 md:flex-row md:items-center md:justify-between">
              <SectionGlow blobs={[{ size: 420, top: "-40%", right: "-5%", color: "primary" }]} />
              <div className="min-w-0 flex-1">
                <h2 className="section-title">Want a platform like this built for you?</h2>
                <p className="mt-4 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
                  The MathPath Platform is private to MathPath&apos;s students, but the approach behind it isn&apos;t. Tell us about the process you want to turn into software.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <MagneticLink href="/contact" className="btn-primary whitespace-nowrap px-7 py-4 text-sm">
                  Talk to us <ArrowRight size={16} />
                </MagneticLink>
                <MagneticLink href="/products/school-enrichment" className="btn-secondary whitespace-nowrap px-7 py-4 text-sm">
                  See School Enrichment
                </MagneticLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
