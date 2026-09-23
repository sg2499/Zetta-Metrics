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
                placeholderNote="Screens for School Enrichment aren't public yet. Here's how the platform works — screenshots will follow as schools come on board."
              />
            </div>
          </Reveal>

          {/* How it works */}
          <div className="mt-16">
            <Reveal>
              <h2 className="text-balance font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                How School Enrichment works
              </h2>
              <p className="text-pretty mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                Four parts, working together as one system — from curriculum
                to classroom to reporting.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {howItWorks.map((item, i) => (
                <Reveal key={item.step} delay={i * 0.06} className="h-full">
                  <div className="hover-card surface-card flex h-full flex-col p-6">
                    <span
                      className="font-display text-sm font-bold"
                      style={{ color: "var(--accent)" }}
                    >
                      {item.step}
                    </span>
                    <h3 className="mt-3 font-display text-base font-bold" style={{ color: "var(--text-primary)" }}>
                      {item.title}
                    </h3>
                    <p className="text-pretty mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                      {item.detail}
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
