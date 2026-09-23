import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Lock } from "lucide-react";
import { products } from "@/lib/content";
import ProductScreens from "@/components/sections/ProductScreens";
import { GithubIcon } from "@/components/BrandIcons";

const product = products.find((p) => p.slug === "mathpath")!;

export const metadata: Metadata = {
  title: product.name,
  description: product.summary,
};

export default function MathPathPage() {
  return (
    <div className="pt-40 pb-24">
      <div className="container-custom">
        <div className="max-w-3xl">
          <span
            className="mb-5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold"
            style={{ borderColor: "var(--border-subtle)", color: "var(--status-live)" }}
          >
            <span className="status-dot" style={{ backgroundColor: "var(--status-live)" }} />
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

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary px-5 py-3 text-sm">
              Request a demo <ArrowRight size={15} />
            </Link>
            <a href={product.repo!} target="_blank" rel="noopener noreferrer" className="btn-secondary px-5 py-3 text-sm">
              <GithubIcon size={15} /> Source
            </a>
          </div>
          <p className="mt-4 flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
            <Lock size={12} /> MathPath is a private platform for enrolled schools, teachers, and students — access isn&apos;t public.
          </p>
        </div>

        <div className="mt-14">
          <ProductScreens
            screenshots={product.screenshots}
            productName={product.name}
            placeholderNote="Product screenshots are being finalized and will be published here shortly."
          />
        </div>

        <div className="mt-16">
          <h2 className="text-balance font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            What&apos;s in the platform
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.highlights.map((h) => (
              <div key={h.title} className="surface-card p-6">
                <h.icon size={20} style={{ color: "var(--accent)" }} />
                <h3 className="mt-3 font-display text-base font-bold" style={{ color: "var(--text-primary)" }}>
                  {h.title}
                </h3>
                <p className="text-pretty mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                  {h.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card mt-16 flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-balance font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              See School Enrichment, our second product
            </h2>
            <p className="text-pretty mt-3 max-w-xl text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
              Built on the same platform engine, now in active development.
            </p>
          </div>
          <Link href="/products/school-enrichment" className="btn-primary shrink-0 whitespace-nowrap px-6 py-3.5 text-sm">
            View School Enrichment <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
