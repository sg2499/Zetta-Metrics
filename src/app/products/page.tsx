import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/content";
import ProductCard from "@/components/sections/ProductCard";

export default function ProductsPage() {
  return (
    <div className="pt-40 pb-24">
      <div className="container-custom">
        <p className="eyebrow mb-4">Products</p>
        <h1
          className="text-balance font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
          style={{ color: "var(--text-primary)" }}
        >
          Our first products — not the last.
        </h1>
        <p className="text-pretty mt-5 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
          MathPath and School Enrichment are where Zetta Metrics started —
          real, working products built on role-based workflows,
          backend-authoritative logic, and AI woven into the product itself.
          They&apos;re proof of how we build, not the limit of what we build —
          we&apos;re taking on whatever fits under the SaaS umbrella next.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <div className="surface-card mt-16 flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-balance font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              Have a workflow that looks like this?
            </h2>
            <p className="text-pretty mt-3 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
              If your process is manual, fragmented, and repetitive, it&apos;s
              probably a fit for what we build.
            </p>
          </div>
          <Link href="/contact" className="btn-primary shrink-0 whitespace-nowrap px-6 py-3.5 text-sm">
            Talk to us <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
