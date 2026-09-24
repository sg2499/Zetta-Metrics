import type { Metadata } from "next";
import { ArrowRight, Lock } from "lucide-react";
import { products } from "@/lib/content";
import ProductShowcase from "@/components/sections/ProductShowcase";
import WorkspaceRows from "@/components/sections/WorkspaceRows";
import SectionHeader from "@/components/sections/SectionHeader";
import SectionGlow from "@/components/sections/SectionGlow";
import HeroBackground from "@/components/sections/HeroBackground";
import IconBadge from "@/components/sections/IconBadge";
import Reveal from "@/components/motion/Reveal";
import MagneticLink from "@/components/motion/MagneticLink";

const product = products.find((p) => p.slug === "mathpath")!;

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
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold"
                style={{ borderColor: "var(--glass-border)", background: "var(--glass-bg)", color: "var(--status-live)" }}
              >
                <span className="status-dot pulse-dot" style={{ backgroundColor: "var(--status-live)" }} />
                {product.statusLabel} · {product.eyebrow}
              </span>
              <h1 className="mt-7 font-display text-[3.4rem] font-extrabold leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-8xl" style={{ color: "var(--text-primary)" }}>
                Math<span className="gradient-text">Path</span>
              </h1>
              <p className="text-balance mt-6 font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl" style={{ color: "var(--text-primary)" }}>
                {product.tagline}
              </p>
              <p className="text-pretty mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8" style={{ color: "var(--text-secondary)" }}>
                {product.summary}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <MagneticLink href="/contact" className="btn-primary px-7 py-4 text-sm">
                  Request a demo <ArrowRight size={16} />
                </MagneticLink>
                <MagneticLink href="#workspaces" className="btn-secondary px-7 py-4 text-sm">
                  See the workspaces
                </MagneticLink>
              </div>
              <p className="mt-5 flex items-center justify-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                <Lock size={12} /> A private platform for enrolled schools, teachers, and students.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={40}>
            <div className="mx-auto mt-16 max-w-6xl">
              <ProductShowcase />
            </div>
          </Reveal>
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
            description="The mechanics that make MathPath trustworthy enough to run a school's daily math practice."
          />
          <div className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.05} className="h-full">
                <div className="surface-card hover-card flex h-full flex-col p-7">
                  <IconBadge icon={h.icon} />
                  <h3 className="mt-5 font-display text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                    {h.title}
                  </h3>
                  <p className="text-pretty mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
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
                <h2 className="section-title text-balance">Bring MathPath to your school.</h2>
                <p className="text-pretty mt-4 max-w-xl text-base leading-7" style={{ color: "var(--text-secondary)" }}>
                  We&apos;ll walk you through every workspace and how it would fit your school&apos;s curriculum and classes.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <MagneticLink href="/contact" className="btn-primary whitespace-nowrap px-7 py-4 text-sm">
                  Request a demo <ArrowRight size={16} />
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
