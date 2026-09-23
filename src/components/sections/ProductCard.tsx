import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { products } from "@/lib/content";

export default function ProductCard({ product }: { product: (typeof products)[number] }) {
  const isLive = product.status === "live";
  return (
    <Link href={product.href} className="group surface-card flex flex-col p-7 transition-colors hover:border-[var(--accent)]">
      <div className="flex items-center justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ backgroundColor: "var(--accent-soft)" }}
        >
          <product.icon size={20} style={{ color: "var(--accent)" }} />
        </div>
        <span
          className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold"
          style={{
            borderColor: "var(--border-subtle)",
            color: isLive ? "var(--status-live)" : "var(--status-dev)",
          }}
        >
          <span className="status-dot" style={{ backgroundColor: isLive ? "var(--status-live)" : "var(--status-dev)" }} />
          {product.statusLabel}
        </span>
      </div>

      <p className="eyebrow mt-6 mb-1">{product.eyebrow}</p>
      <h3 className="font-display text-xl font-bold" style={{ color: "var(--text-primary)" }}>
        {product.name}
      </h3>
      <p className="mt-1 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
        {product.tagline}
      </p>
      <p className="mt-4 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
        {product.summary}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {product.stack.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-md border px-2 py-1 text-[0.7rem] font-medium"
            style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}
          >
            {t}
          </span>
        ))}
      </div>

      <span
        className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold"
        style={{ color: "var(--accent)" }}
      >
        View product <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
