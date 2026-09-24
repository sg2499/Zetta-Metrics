import { productFacts } from "@/lib/content";
import Reveal from "@/components/motion/Reveal";
import AnimatedStat from "@/components/motion/AnimatedStat";

/** Product-specific fact cards — shown only on that product's own page. */
export default function ProductFacts({ slug }: { slug: string }) {
  const facts = productFacts[slug] ?? [];
  return (
    <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-3">
      {facts.map((f, i) => (
        <Reveal key={f.label} delay={i * 0.07} className="h-full">
          <div className="surface-card hover-card flex h-full flex-col p-7">
            <p className="font-display text-5xl font-extrabold tracking-[-0.045em]" style={{ color: "var(--text-primary)" }}>
              <AnimatedStat value={f.value} />
            </p>
            <p className="mt-3 text-sm font-medium leading-6" style={{ color: "var(--text-secondary)" }}>
              {f.label}
            </p>
            <div className="mt-auto pt-6">
              <div className="h-px w-full" style={{ background: "linear-gradient(90deg, var(--accent), transparent)" }} />
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
