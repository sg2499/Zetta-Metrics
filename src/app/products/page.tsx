import { ArrowRight } from "lucide-react";
import { products } from "@/lib/content";
import ProductCard from "@/components/sections/ProductCard";
import SectionHeader from "@/components/sections/SectionHeader";
import SectionGlow from "@/components/sections/SectionGlow";
import CapabilityMarquee from "@/components/sections/CapabilityMarquee";
import Reveal from "@/components/motion/Reveal";
import MagneticLink from "@/components/motion/MagneticLink";

// Side-by-side facts — every cell restates something already described on
// the product pages; nothing here is new or aspirational.
const comparison = [
  { label: "Built for", mathpath: "Our client MathPath's daily math practice and assessment", enrichment: "Full CBSE/ICSE academic delivery, Classes 5⁠–⁠10" },
  { label: "Workspaces", mathpath: "Admin, Teacher, Student", enrichment: "Super Admin, Admin, Teacher, Student" },
  { label: "Core loop", mathpath: "Daily practice sets and timed assessments", enrichment: "Five-day guided learning loop" },
  { label: "Scoring", mathpath: "Server-side scoring and timing", enrichment: "Auto-marking, with a Foundation Repair path" },
  { label: "Content", mathpath: "Structured curriculum across lessons and levels", enrichment: "Curriculum Studio with Excel import and quality checks" },
  { label: "Tracking", mathpath: "Readiness governance and parent-ready reports", enrichment: "Assignment-and-attempt lifecycle per student" },
  { label: "Security", mathpath: "Answer keys and timers never leave the server", enrichment: "Session hygiene, role-scoped access, data-export and privacy controls" },
];

export default function ProductsPage() {
  const [mathpath, enrichment] = products;
  return (
    <div>
      <section className="relative overflow-hidden pt-40 pb-20 md:pt-48">
        <SectionGlow
          blobs={[
            { size: 520, top: "-10%", left: "-10%", color: "primary" },
            { size: 380, top: "10%", right: "-8%", color: "secondary", delay: 5 },
          ]}
        />
        <div className="container-custom">
          <SectionHeader
            as="h1"
            eyebrow="Products"
            title={
              <>
                Two platforms. <span className="gradient-text">One foundation.</span>
              </>
            }
            description="Our Ed-Tech platforms: MathPath, built for our client of the same name and live with their students, and School Enrichment. Both are real, working products. Both run on role-based workflows, backend-authoritative logic, and AI woven into the product itself: the same approach we bring to any institution or business ready to modernize."
          />
          <div className="mt-16 grid items-stretch gap-6 md:grid-cols-2">
            {products.map((product, i) => (
              <Reveal key={product.slug} delay={i * 0.08} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section className="relative overflow-hidden py-24">
        <SectionGlow blobs={[{ size: 460, top: "10%", right: "-10%", color: "tertiary" }]} />
        <div className="container-custom">
          <SectionHeader eyebrow="At a glance" title="How they compare." />
          <Reveal delay={0.08}>
            <div className="surface-card mt-12">
              <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr style={{ background: "var(--bg-elevated)" }}>
                    <th className="w-[20%] px-6 py-5" />
                    {[mathpath, enrichment].map((p) => (
                      <th key={p.slug} className="px-6 py-5 align-bottom">
                        <span className="flex items-center gap-2 font-display text-lg font-extrabold" style={{ color: "var(--text-primary)" }}>
                          {p.name}
                        </span>
                        <span className="mt-1 flex items-center gap-1.5 text-xs font-semibold" style={{ color: p.status === "live" ? "var(--status-live)" : "var(--status-dev)" }}>
                          <span className="status-dot" style={{ background: p.status === "live" ? "var(--status-live)" : "var(--status-dev)" }} />
                          {p.statusLabel}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.label} className="border-t" style={{ borderColor: "var(--border-subtle)" }}>
                      <th scope="row" className="px-6 py-4 text-xs font-bold uppercase tracking-[0.12em]" style={{ color: "var(--text-muted)" }}>
                        {row.label}
                      </th>
                      <td className="px-6 py-4 leading-6" style={{ color: "var(--text-secondary)" }}>
                        {row.mathpath}
                      </td>
                      <td className="px-6 py-4 leading-6" style={{ color: "var(--text-secondary)" }}>
                        {row.enrichment}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Shared capabilities */}
      <section className="relative py-16">
        <Reveal>
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
            Shared across both platforms
          </p>
          <CapabilityMarquee />
        </Reveal>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="container-custom">
          <Reveal>
            <div className="cta-panel relative flex flex-col items-start gap-8 overflow-hidden p-10 sm:p-14 md:flex-row md:items-center md:justify-between">
              <SectionGlow blobs={[{ size: 420, top: "-40%", right: "-5%", color: "primary" }]} />
              <div className="min-w-0 flex-1">
                <h2 className="section-title">Have a workflow that looks like this?</h2>
                <p className="mt-4 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
                  If your process is manual, fragmented, and repetitive, it&apos;s probably a fit for what we build.
                </p>
              </div>
              <MagneticLink href="/contact" className="btn-primary shrink-0 whitespace-nowrap px-7 py-4 text-sm">
                Talk to us <ArrowRight size={16} />
              </MagneticLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
