import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/content";
import EnrichmentDiagram from "@/components/sections/EnrichmentDiagram";
import ProductFacts from "@/components/sections/ProductFacts";
import SectionHeader from "@/components/sections/SectionHeader";
import SectionGlow from "@/components/sections/SectionGlow";
import HeroBackground from "@/components/sections/HeroBackground";
import IconBadge from "@/components/sections/IconBadge";
import Reveal from "@/components/motion/Reveal";
import MagneticLink from "@/components/motion/MagneticLink";

const product = products.find((p) => p.slug === "school-enrichment")!;

export const metadata: Metadata = {
  title: product.name,
  description: product.summary,
};

const howItWorks = [
  {
    step: "01",
    title: "Every school gets its own structure",
    detail:
      "A School → Student/Teacher/Admin identity model from the ground up, with Super Admin controls to publish and map curriculum across schools — so access and content stay scoped correctly from day one.",
  },
  {
    step: "02",
    title: "Curriculum goes through the Studio",
    detail:
      "Chapters, lessons, and questions move through a status workflow with an Excel-based import pipeline, and automated structural and math-pattern quality checks catch problems before a student ever sees the content.",
  },
  {
    step: "03",
    title: "Students move through a five-day learning loop",
    detail:
      "A structured assignment-and-attempt lifecycle with auto-marking, plus a built-in 'Foundation Repair' path for students who need to close gaps before moving forward.",
  },
  {
    step: "04",
    title: "Access and data are locked down throughout",
    detail:
      "Session hygiene, role-scoped access control, and data-export/privacy handling apply to every step of the loop above — not layered on at the end.",
  },
];

export default function SchoolEnrichmentPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24">
        <HeroBackground />
        <div className="container-custom relative z-10">
          <div className="text-center">
            <Reveal>
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold"
                style={{ borderColor: "var(--glass-border)", background: "var(--glass-bg)", color: "var(--status-dev)" }}
              >
                <span className="status-dot" style={{ backgroundColor: "var(--status-dev)" }} />
                {product.statusLabel} · {product.eyebrow}
              </span>
              <h1 className="mt-7 font-display text-[3rem] font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-7xl" style={{ color: "var(--text-primary)" }}>
                School <span className="gradient-text">Enrichment</span>
              </h1>
              <p className="mt-6 font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl" style={{ color: "var(--text-primary)" }}>
                {product.tagline}
              </p>
              <p className="mt-5 text-base leading-7 sm:text-lg sm:leading-8" style={{ color: "var(--text-secondary)" }}>
                {product.summary}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <MagneticLink href="/contact" className="btn-primary px-7 py-4 text-sm">
                  Talk to us <ArrowRight size={16} />
                </MagneticLink>
                <MagneticLink href="#how-it-works" className="btn-secondary px-7 py-4 text-sm">
                  How it works
                </MagneticLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={40}>
            <div className="mt-16">
              <EnrichmentDiagram />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Product facts */}
      <section className="relative pb-8">
        <div className="container-custom">
          <ProductFacts slug="school-enrichment" />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative scroll-mt-24 overflow-hidden py-24">
        <SectionGlow
          blobs={[
            { size: 460, top: "0%", left: "-10%", color: "secondary" },
            { size: 380, bottom: "0%", right: "-8%", color: "primary", delay: 5 },
          ]}
        />
        <div className="container-custom">
          <SectionHeader
            eyebrow="How it works"
            title={
              <>
                Four parts. <span className="gradient-text">One system.</span>
              </>
            }
            description="From school setup to curriculum to the classroom — each part is built to hand off cleanly to the next."
          />
          <div className="mt-14 grid items-stretch gap-5 md:grid-cols-2">
            {howItWorks.map((item, i) => (
              <Reveal key={item.step} delay={i * 0.06} className="h-full">
                <div className="surface-card hover-card flex h-full flex-col p-8">
                  <div className="flex items-center justify-between">
                    <IconBadge icon={product.highlights[i].icon} />
                    <span className="font-display text-5xl font-extrabold tracking-[-0.05em]" style={{ color: "var(--border-strong)" }}>
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
                    {item.detail}
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
              <SectionGlow blobs={[{ size: 420, top: "-40%", right: "-5%", color: "secondary" }]} />
              <div className="min-w-0 flex-1">
                <h2 className="section-title">Built on the same core as MathPath.</h2>
                <p className="mt-4 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
                  The same role model, server-side logic, and security posture that already run MathPath for its students today.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <MagneticLink href="/contact" className="btn-primary whitespace-nowrap px-7 py-4 text-sm">
                  Talk to us <ArrowRight size={16} />
                </MagneticLink>
                <MagneticLink href="/products/mathpath" className="btn-secondary whitespace-nowrap px-7 py-4 text-sm">
                  See MathPath
                </MagneticLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
