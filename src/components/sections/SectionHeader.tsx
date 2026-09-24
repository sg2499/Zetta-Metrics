import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";

interface Props {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

/**
 * The one heading pattern every section uses — eyebrow, large display
 * title, optional lead paragraph — so type scale and spacing stay
 * identical across the whole site.
 *
 * Deliberately NO max-width caps and no balanced/pretty wrapping: text
 * must only wrap at the real container edge (an explicit, repeated
 * requirement for this site).
 */
export default function SectionHeader({ eyebrow, title, description, align = "left", as = "h2" }: Props) {
  const Heading = as;
  const centered = align === "center";
  return (
    <Reveal>
      <div className={centered ? "text-center" : undefined}>
        <p className="eyebrow mb-4">{eyebrow}</p>
        <Heading className="section-title">{title}</Heading>
        {description && (
          <p className="mt-5 text-base leading-7 sm:text-lg sm:leading-8" style={{ color: "var(--text-secondary)" }}>
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
