"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Maximize2 } from "lucide-react";
import { mathpathScreens, mathpathWorkspaces } from "@/lib/content";
import ScreenshotLightbox from "@/components/sections/ScreenshotLightbox";
import Reveal from "@/components/motion/Reveal";

const OFFSETS = mathpathWorkspaces.map((_, i) => mathpathWorkspaces.slice(0, i).reduce((n, w) => n + w.screens.length, 0));

function Row({ index, onOpen }: { index: number; onOpen: (i: number) => void }) {
  const w = mathpathWorkspaces[index];
  const [pick, setPick] = useState(0);
  const current = w.screens[pick];
  const Icon = w.icon;
  const flip = index % 2 === 1;

  return (
    <div className={`grid items-center gap-10 lg:gap-14 ${flip ? "lg:grid-cols-[0.72fr_1.28fr]" : "lg:grid-cols-[1.28fr_0.72fr]"}`}>
      <Reveal className={`min-w-0 ${flip ? "lg:order-2" : ""}`} y={30}>
        <button
          type="button"
          onClick={() => onOpen(OFFSETS[index] + pick)}
          className="group product-frame block w-full cursor-zoom-in text-left"
          aria-label={`Expand screenshot: ${w.label} ${current.caption}`}
        >
          <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-elevated)" }}>
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            <span className="ml-3 flex items-center gap-1 truncate text-[0.68rem] font-medium" style={{ color: "var(--text-muted)" }}>
              {w.label} <ChevronRight size={10} /> {current.route}
            </span>
          </div>
          <div className="relative overflow-hidden" style={{ background: "#f3f4fb", aspectRatio: "16 / 10" }}>
            <AnimatePresence initial={false}>
              <motion.div key={current.src} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
                <Image
                  src={current.src}
                  alt={`MathPath Platform, ${w.label} workspace: ${current.caption}`}
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 760px, 100vw"
                  className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                />
              </motion.div>
            </AnimatePresence>
            <span
              className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ background: "rgba(4,10,18,0.82)", color: "#fff" }}
            >
              <Maximize2 size={12} /> View full size
            </span>
          </div>
        </button>

        {/* Thumbnails: every screen captured for this workspace */}
        <div className="mt-4 grid gap-2.5" style={{ gridTemplateColumns: `repeat(${w.screens.length}, minmax(0, 1fr))` }}>
          {w.screens.map((s, i) => {
            const on = i === pick;
            return (
              <button
                key={s.src}
                type="button"
                onClick={() => setPick(i)}
                aria-pressed={on}
                className="group/thumb min-w-0 text-left"
              >
                <span
                  className="relative block overflow-hidden rounded-lg border transition-all"
                  style={{
                    aspectRatio: "16 / 10",
                    borderColor: on ? "var(--accent)" : "var(--border-subtle)",
                    boxShadow: on ? "0 0 0 3px var(--accent-soft)" : "none",
                    opacity: on ? 1 : 0.72,
                  }}
                >
                  <Image src={s.src} alt="" fill sizes="180px" className="object-cover object-left-top" />
                </span>
                <span className="mt-1.5 block truncate text-[0.68rem] font-semibold" style={{ color: on ? "var(--text-primary)" : "var(--text-muted)" }}>
                  {s.caption}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal className={`min-w-0 ${flip ? "lg:order-1" : ""}`} delay={0.08}>
        <div>
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]"
            style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
          >
            <Icon size={14} /> {w.label} workspace
          </span>
          <h3 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-[-0.03em] sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            {w.title}
          </h3>
          <p className="mt-4 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
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
}

/**
 * One row per MathPath workspace (Student, Teacher, Admin): the chosen screen
 * large, every other captured screen as a thumbnail beneath it, and what the
 * role does beside it. Rows alternate sides; any screen opens full size.
 */
export default function WorkspaceRows() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  return (
    <div className="space-y-24 lg:space-y-32">
      {mathpathWorkspaces.map((w, i) => (
        <Row key={w.id} index={i} onOpen={setLightbox} />
      ))}
      <ScreenshotLightbox shots={mathpathScreens} index={lightbox} onChange={setLightbox} productName="MathPath Platform" />
    </div>
  );
}
