import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { products } from "@/lib/content";
import IconBadge from "@/components/sections/IconBadge";

export default function ProductCard({ product }: { product: (typeof products)[number] }) {
  const isLive = product.status === "live";
  return (
    <Link href={product.href} className="group surface-card flex h-full flex-col p-7 transition-colors hover:border-[var(--accent)]">
      <div className="flex items-center justify-between">
        <IconBadge icon={product.icon} />
        <span
          className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold"
          style={{
            borderColor: "var(--border-subtle)",
            color: isLive ? "var(--status-live)" : "var(--status-dev)",
          }}
        >
          <span className="status-dot shrink-0" style={{ backgroundColor: isLive ? "var(--status-live)" : "var(--status-dev)" }} />
          {product.statusLabel}
        </span>
      </div>

      <p className="eyebrow mt-6 mb-1">{product.eyebrow}</p>
      <h3 className="text-balance font-display text-xl font-bold" style={{ color: "var(--text-primary)" }}>
        {product.name}
      </h3>
      <p className="text-pretty mt-1 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
        {product.tagline}
      </p>
      <p className="text-pretty mt-4 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
        {product.summary}
      </p>

      <span
        className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-semibold"
        style={{ color: "var(--accent)" }}
      >
        View product <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
