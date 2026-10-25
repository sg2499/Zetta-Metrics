import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { products } from "@/lib/content";
import IconBadge from "@/components/sections/IconBadge";
import KramaStair from "@/components/sections/KramaStair";

/** Krama's own cover: its stair on its indigo-and-gold ground. */
function KramaCover() {
  return (
    <div className="krama-zone relative flex h-full items-end overflow-hidden px-6 pt-8" style={{ background: "var(--krama-cover-bg)" }}>
      <div className="krama-stars pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
      <div className="relative w-full">
        <KramaStair compact />
      </div>
    </div>
  );
}

export default function ProductCard({ product }: { product: (typeof products)[number] }) {
  const isLive = product.status === "live";
  const cover = product.screenshots[0];
  return (
    <Link href={product.href} className="group surface-card hover-card flex h-full flex-col">
      {/* Visual header */}
      <div className="relative overflow-hidden border-b" style={{ aspectRatio: "1920 / 967", borderColor: "var(--border-subtle)", background: cover ? "#f4f6fb" : "var(--bg-base)" }}>
        {cover ? (
          <>
            <Image
              src={product.screenshots.find((s) => s.src.includes("student"))?.src ?? cover.src}
              alt={`${product.name} product screenshot`}
              fill
              quality={90}
              sizes="(min-width: 768px) 600px, 100vw"
              className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </>
        ) : (
          <KramaCover />
        )}
      </div>

      <div className="flex flex-1 flex-col p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <IconBadge icon={product.icon} />
            <div>
              <p className="eyebrow text-[0.68rem]">{product.eyebrow}</p>
              <h3 className="font-display text-2xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
                {product.name}
              </h3>
            </div>
          </div>
          <span
            className="mt-1 flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold"
            style={{ borderColor: "var(--border-subtle)", color: isLive ? "var(--status-live)" : "var(--status-dev)" }}
          >
            <span className={`status-dot shrink-0 ${isLive ? "pulse-dot" : ""}`} style={{ backgroundColor: isLive ? "var(--status-live)" : "var(--status-dev)" }} />
            {product.statusLabel}
          </span>
        </div>
        <p className="mt-4 text-base font-medium" style={{ color: "var(--text-primary)" }}>
          {product.tagline}
        </p>
        <p className="mt-3 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
          {product.summary}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-semibold" style={{ color: "var(--accent)" }}>
          Explore {product.name} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
