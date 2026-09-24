import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { products } from "@/lib/content";
import IconBadge from "@/components/sections/IconBadge";

/** Five-day loop schematic, used where a product has no public screens. */
function LoopPreview() {
  const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];
  return (
    <div className="dot-grid flex h-full flex-col justify-center gap-4 p-6">
      <div className="flex items-center justify-between gap-1.5">
        {days.map((d, i) => (
          <div key={d} className="flex flex-1 items-center gap-1.5">
            <span
              className="flex h-9 flex-1 items-center justify-center rounded-lg border text-[0.68rem] font-semibold"
              style={{
                borderColor: i === 4 ? "var(--accent)" : "var(--border-subtle)",
                background: i === 4 ? "var(--accent-soft)" : "var(--bg-base)",
                color: i === 4 ? "var(--accent)" : "var(--text-secondary)",
              }}
            >
              {d}
            </span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 text-[0.68rem] font-medium">
        {["Assign", "Attempt", "Auto-mark"].map((s) => (
          <span key={s} className="rounded-md border px-2 py-1.5 text-center" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-base)", color: "var(--text-muted)" }}>
            {s}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 text-[0.68rem] font-medium" style={{ color: "var(--status-dev)" }}>
        <span className="status-dot" style={{ background: "var(--status-dev)" }} />
        Foundation Repair path for students who need it
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
      <div className="relative h-56 overflow-hidden border-b sm:h-64" style={{ borderColor: "var(--border-subtle)", background: cover ? "#f4f6fb" : "var(--bg-base)" }}>
        {cover ? (
          <>
            <Image
              src={product.screenshots.find((s) => s.src.includes("student"))?.src ?? cover.src}
              alt={`${product.name} product screenshot`}
              fill
              quality={90}
              sizes="(min-width: 768px) 600px, 100vw"
              className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 h-16" style={{ background: "linear-gradient(to top, var(--bg-raised), transparent)" }} />
          </>
        ) : (
          <LoopPreview />
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
