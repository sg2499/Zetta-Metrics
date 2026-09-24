"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";
import { Maximize2 } from "lucide-react";
import { mathpathWorkspaces } from "@/lib/content";
import ScreenshotLightbox from "@/components/sections/ScreenshotLightbox";

const AUTO_ADVANCE_MS = 5500;

/**
 * The real MathPath product, front and center: a browser-framed screenshot
 * with Student / Teacher / Admin tabs. Tabs auto-advance (driven by the
 * progress bar's own CSS animation, which pauses on hover) until the
 * visitor picks one themselves. The frame tilts back in 3D and flattens as
 * it scrolls into view. Click the screenshot for the full-size viewer.
 */
export default function ProductShowcase({ tilt = true }: { tilt?: boolean }) {
  const shouldReduceMotion = useSafeReducedMotion();
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  const workspace = mathpathWorkspaces[active];
  const shots = mathpathWorkspaces.map((w) => w.screenshot);
  const isAuto = autoplay && !shouldReduceMotion;

  const select = (i: number) => {
    setAutoplay(false);
    setActive(i);
  };

  return (
    <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Role tabs */}
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label="MathPath workspaces"
          className="inline-flex items-center gap-1 rounded-full border p-1"
          style={{ borderColor: "var(--glass-border)", background: "var(--glass-bg)", backdropFilter: "blur(12px)" }}
        >
          {mathpathWorkspaces.map((w, i) => {
            const isActive = i === active;
            const Icon = w.icon;
            return (
              <button
                key={w.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => select(i)}
                className="relative flex items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5"
                style={{ color: isActive ? "var(--text-primary)" : "var(--text-muted)" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="showcase-tab"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--bg-elevated)", boxShadow: "inset 0 0 0 1px var(--border-strong)" }}
                    transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
                  />
                )}
                <Icon size={15} className="relative" style={{ color: isActive ? "var(--accent)" : undefined }} />
                <span className="relative">{w.label}</span>
                {isActive && isAuto && (
                  <span
                    key={`${active}-progress`}
                    className="absolute bottom-0 left-3 right-3 h-[2px] origin-left rounded-full"
                    style={{
                      background: "var(--accent)",
                      animation: `tab-progress ${AUTO_ADVANCE_MS}ms linear forwards`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                    onAnimationEnd={() => setActive((a) => (a + 1) % mathpathWorkspaces.length)}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={workspace.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="mt-5 text-center text-sm leading-6"
          style={{ color: "var(--text-secondary)" }}
        >
          <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
            {workspace.title}.
          </span>{" "}
          {workspace.summary}
        </motion.p>
      </AnimatePresence>

      {/* Framed screenshot */}
      <div className="relative mt-10" style={{ perspective: "1800px" }}>
        <div
          className="pointer-events-none absolute -inset-x-10 -bottom-10 top-16 rounded-[3rem] opacity-70 blur-3xl"
          style={{ background: "radial-gradient(60% 60% at 50% 60%, var(--glow-primary), transparent 70%)" }}
          aria-hidden="true"
        />
        <motion.div
          style={
            tilt && !shouldReduceMotion
              ? { rotateX, scale, transformOrigin: "50% 0%", transformStyle: "preserve-3d" }
              : undefined
          }
          className="product-frame"
        >
          <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-elevated)" }}>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span
              className="mx-auto hidden w-full max-w-xs truncate rounded-md px-3 py-1 text-center font-mono text-[0.7rem] sm:block"
              style={{ background: "var(--bg-base)", color: "var(--text-muted)" }}
            >
              mathpath.app/{workspace.path}
            </span>
            <span className="hidden w-[42px] sm:block" />
          </div>
          <button
            type="button"
            onClick={() => setLightbox(active)}
            className="group relative block aspect-[1920/869] w-full cursor-zoom-in overflow-hidden"
            style={{ background: "#f4f6fb" }}
            aria-label={`Expand screenshot: ${workspace.screenshot.caption}`}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={workspace.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.015 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={workspace.screenshot.src}
                  alt={`MathPath — ${workspace.screenshot.caption}`}
                  fill
                  quality={90}
                  sizes="(min-width: 1280px) 1180px, 100vw"
                  loading={active === 0 ? "eager" : "lazy"}
                  className="object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>
            <span
              className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ background: "rgba(4,10,18,0.82)", color: "#fff" }}
            >
              <Maximize2 size={12} /> View full size
            </span>
          </button>
        </motion.div>
      </div>

      <ScreenshotLightbox shots={shots} index={lightbox} onChange={setLightbox} productName="MathPath" />
    </div>
  );
}
