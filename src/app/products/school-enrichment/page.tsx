import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/content";
import ProductScreens from "@/components/sections/ProductScreens";
import SectionGlow from "@/components/sections/SectionGlow";
import Reveal from "@/components/motion/Reveal";
import MagneticLink from "@/components/motion/MagneticLink";

const product = products.find((p) => p.slug === "school-enrichment")!;

export const metadata: Metadata = {
  title: product.name,
  description: product.summary,
};

const roadmap = [
  { phase: "Phase 0", label: "Product separation & bootstrap", status: "done" as const },
  { phase: "Phase 1", label: "Auth, roles, and three-role dashboard shell", status: "done" as const },
  { phase: "Phase 2", label: "Curriculum Studio — content pipeline & quality checks", status: "done" as const },
  { phase: "Phase 3", label: "Five-day learning loop, assignments & auto-marking", status: "active" as const },
  { phase: "Phase 4", label: "Public launch readiness", status: "upcoming" as const },
];

const statusStyles = {
  done: { color: "var(--status-live)", label: "Done" },
  active: { color: "var(--status-dev)", label: "In progress" },
  upcoming: { color: "var(--text-muted)", label: "Upcoming" },
};

export default function SchoolEnrichmentPage() {
  return (
    <div className="pt-40 pb-24">
      <section className="relative overflow-hidden">
        <SectionGlow
          blobs={[
            { size: 480, top: "-24%", right: "-8%", color: "secondary" },
            { size: 300, top: "20%", left: "-10%", color: "tertiary", delay: 6 },
          ]}
        />
        <div className="container-custom">
          <Reveal>
            <div>
              <span
                className="mb-5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold"
                style={{ borderColor: "var(--border-subtle)", color: "var(--status-dev)" }}
              >
                <span className="status-dot" style={{ backgroundColor: "var(--status-dev)" }} />
                {product.statusLabel}
              </span>
              <h1 className="text-balance font-display text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                {product.name}
              </h1>
              <p className="mt-3 text-lg font-medium" style={{ color: "var(--text-secondary)" }}>
                {product.tagline}
              </p>
              <p className="text-pretty mt-5 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
                {product.summary}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14">
              <ProductScreens
                screenshots={product.screenshots}
                productName={product.name}
                placeholderNote="School Enrichment is still under active development — the curriculum engine, role-based dashboards, and learning loop are live in the backend, but the product isn't ready to show publicly yet. Screenshots will be added here as it nears release."
              />
            </div>
          </Reveal>

          {/* Roadmap */}
          <div className="mt-16">
            <Reveal>
              <h2 className="text-balance font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                Build roadmap
              </h2>
              <p className="text-pretty mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                Built the same way we build everything — here&apos;s exactly
                where it stands today.
              </p>
            </Reveal>
            <div className="mt-8 space-y-3">
              {roadmap.map((step, i) => {
                const style = statusStyles[step.status];
                return (
                  <Reveal key={step.phase} delay={i * 0.04}>
                    <div className="hover-card surface-card flex items-center justify-between gap-4 px-6 py-4">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                          {step.phase}
                        </span>
                        <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                          {step.label}
                        </span>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: style.color }}>
                        <span className="status-dot" style={{ backgroundColor: style.color }} />
                        {style.label}
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="mt-16">
            <Reveal>
              <h2 className="text-balance font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                What&apos;s already built
              </h2>
            </Reveal>
            <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2">
              {product.highlights.map((h, i) => (
                <Reveal key={h.title} delay={i * 0.06} className="h-full">
                  <div className="hover-card surface-card flex h-full flex-col p-6">
                    <h.icon size={20} style={{ color: "var(--accent)" }} />
                    <h3 className="mt-3 font-display text-base font-bold" style={{ color: "var(--text-primary)" }}>
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

          <Reveal>
            <div className="cta-panel hover-card mt-16 flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-balance font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                  MathPath is live today
                </h2>
                <p className="text-pretty mt-3 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                  See how the same approach runs in production today.
                </p>
              </div>
              <MagneticLink href="/products/mathpath" className="btn-primary shrink-0 whitespace-nowrap px-6 py-3.5 text-sm">
                View MathPath <ArrowRight size={16} />
              </MagneticLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
