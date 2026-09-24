"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Maximize2 } from "lucide-react";
import { mathpathWorkspaces } from "@/lib/content";
import ScreenshotLightbox from "@/components/sections/ScreenshotLightbox";
import Reveal from "@/components/motion/Reveal";

/**
 * One row per MathPath workspace (Student / Teacher / Admin): a large
 * framed screenshot beside what that role actually does, alternating
 * sides down the page. Every screenshot opens the full-size viewer.
 */
export default function WorkspaceRows() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const shots = mathpathWorkspaces.map((w) => w.screenshot);

  return (
    <div className="space-y-24 lg:space-y-32">
      {mathpathWorkspaces.map((w, i) => {
        const Icon = w.icon;
        const flip = i % 2 === 1;
        return (
          <div key={w.id} className={`grid items-center gap-10 lg:gap-14 ${flip ? "lg:grid-cols-[0.75fr_1.25fr]" : "lg:grid-cols-[1.25fr_0.75fr]"}`}>
            <Reveal className={flip ? "lg:order-2" : ""} y={30}>
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group product-frame block w-full cursor-zoom-in text-left"
                aria-label={`Expand screenshot: ${w.screenshot.caption}`}
              >
                <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-elevated)" }}>
                  <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                  <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                  <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                  <span className="ml-3 truncate font-mono text-[0.68rem]" style={{ color: "var(--text-muted)" }}>
                    mathpath.app/{w.path}
                  </span>
                </div>
                <div className="relative aspect-[1920/869] overflow-hidden" style={{ background: "#f4f6fb" }}>
                  <Image
                    src={w.screenshot.src}
                    alt={`MathPath — ${w.screenshot.caption}`}
                    fill
                    quality={90}
                    sizes="(min-width: 1024px) 720px, 100vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <span
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                    style={{ background: "rgba(4,10,18,0.82)", color: "#fff" }}
                  >
                    <Maximize2 size={12} /> View full size
                  </span>
                </div>
              </button>
            </Reveal>

            <Reveal className={flip ? "lg:order-1" : ""} delay={0.08}>
              <div>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]"
                  style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
                >
                  <Icon size={14} /> {w.label} workspace
                </span>
                <h3 className="text-balance mt-5 font-display text-3xl font-extrabold leading-tight tracking-[-0.03em] sm:text-4xl" style={{ color: "var(--text-primary)" }}>
                  {w.title}
                </h3>
                <p className="text-pretty mt-4 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
                  {w.summary}
                </p>
                <ul className="mt-6 space-y-3">
                  {w.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        );
      })}

      <ScreenshotLightbox shots={shots} index={lightbox} onChange={setLightbox} productName="MathPath" />
    </div>
  );
}
