"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";
import { ChevronRight, Maximize2 } from "lucide-react";
import { mathpathScreens, mathpathWorkspaces } from "@/lib/content";
import ScreenshotLightbox from "@/components/sections/ScreenshotLightbox";

const AUTO_ADVANCE_MS = 4800;

// Index of a workspace's first screen in the flat mathpathScreens list.
const OFFSETS = mathpathWorkspaces.map((_, i) => mathpathWorkspaces.slice(0, i).reduce((n, w) => n + w.screens.length, 0));

/**
 * The real MathPath Platform, front and centre: a browser-framed tour of every
 * captured screen. Role tabs pick the workspace, screen pills pick the page.
 * It plays itself (screen by screen, then on to the next role) until the
 * visitor takes over, pauses on hover, and tilts flat as it scrolls in.
 */
export default function ProductShowcase({ tilt = true }: { tilt?: boolean }) {
  const reduce = useSafeReducedMotion();
  const [role, setRole] = useState(0);
  const [screen, setScreen] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  const workspace = mathpathWorkspaces[role];
  const current = workspace.screens[screen];
  const isAuto = autoplay && !reduce;

  const advance = () => {
    if (screen + 1 < workspace.screens.length) setScreen(screen + 1);
    else {
      setRole((role + 1) % mathpathWorkspaces.length);
      setScreen(0);
    }
  };
  const pickRole = (i: number) => {
    setAutoplay(false);
    setRole(i);
    setScreen(0);
  };
  const pickScreen = (i: number) => {
    setAutoplay(false);
    setScreen(i);
  };

  return (
    <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Role tabs */}
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label="MathPath Platform workspaces"
          className="inline-flex items-center gap-1 rounded-full border p-1"
          style={{ borderColor: "var(--glass-border)", background: "var(--glass-bg)", backdropFilter: "blur(12px)" }}
        >
          {mathpathWorkspaces.map((w, i) => {
            const isActive = i === role;
            const Icon = w.icon;
            return (
              <button
                key={w.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => pickRole(i)}
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
          className="mx-auto mt-5 max-w-2xl text-center text-sm leading-6"
          style={{ color: "var(--text-secondary)" }}
        >
          <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
            {workspace.title}.
          </span>{" "}
          {workspace.summary}
        </motion.p>
      </AnimatePresence>

      {/* Screen pills for the chosen workspace */}
      <div className="mt-6 flex flex-wrap justify-center gap-2" role="tablist" aria-label={`${workspace.label} screens`}>
        {workspace.screens.map((s, i) => {
          const on = i === screen;
          return (
            <button
              key={s.src}
              role="tab"
              aria-selected={on}
              onClick={() => pickScreen(i)}
              className="relative overflow-hidden rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors"
              style={{
                borderColor: on ? "var(--accent)" : "var(--border-subtle)",
                background: on ? "var(--accent-soft)" : "transparent",
                color: on ? "var(--text-primary)" : "var(--text-muted)",
              }}
            >
              {s.caption}
              {on && isAuto && (
                <span
                  key={`${role}-${screen}-progress`}
                  className="absolute inset-x-3 bottom-0 h-[2px] origin-left rounded-full"
                  style={{
                    background: "var(--accent)",
                    animation: `tab-progress ${AUTO_ADVANCE_MS}ms linear forwards`,
                    animationPlayState: paused || lightbox !== null ? "paused" : "running",
                  }}
                  onAnimationEnd={advance}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Framed screenshot */}
      <div className="relative mt-8" style={{ perspective: "1800px" }}>
        <div
          className="pointer-events-none absolute -inset-x-10 -bottom-10 top-16 rounded-[3rem] opacity-70"
          style={{ background: "radial-gradient(60% 55% at 50% 55%, var(--glow-primary), transparent 72%)" }}
          aria-hidden="true"
        />
        <motion.div
          style={tilt && !reduce ? { rotateX, scale, transformOrigin: "50% 0%", transformStyle: "preserve-3d" } : undefined}
          className="product-frame"
        >
          <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-elevated)" }}>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span
              className="mx-auto hidden max-w-sm items-center gap-1.5 truncate rounded-md px-3 py-1 text-[0.7rem] font-medium sm:flex"
              style={{ background: "var(--bg-base)", color: "var(--text-muted)" }}
            >
              MathPath <ChevronRight size={11} /> {workspace.label} <ChevronRight size={11} />
              <span style={{ color: "var(--text-secondary)" }}>{current.route}</span>
            </span>
            <span className="hidden w-[42px] sm:block" />
          </div>
          <motion.button
            type="button"
            onClick={() => setLightbox(OFFSETS[role] + screen)}
            className="group relative block w-full cursor-zoom-in overflow-hidden"
            style={{ background: "#f3f4fb" }}
            // Height follows each screen's real proportions, so nothing is cropped.
            initial={false}
            animate={{ paddingBottom: `${(current.height / current.width) * 100}%` }}
            transition={{ duration: reduce ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
            aria-label={`Expand screenshot: ${workspace.label} ${current.caption}`}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={current.src}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.012 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={current.src}
                  alt={`MathPath Platform, ${workspace.label} workspace: ${current.caption}`}
                  fill
                  quality={90}
                  sizes="(min-width: 1280px) 1180px, 100vw"
                  loading={role === 0 && screen === 0 ? "eager" : "lazy"}
                  className="object-contain object-top"
                />
              </motion.div>
            </AnimatePresence>
            <span
              className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ background: "rgba(4,10,18,0.82)", color: "#fff" }}
            >
              <Maximize2 size={12} /> View full size
            </span>
          </motion.button>
        </motion.div>
      </div>
      <p className="mt-4 text-center text-[0.7rem]" style={{ color: "var(--text-muted)" }}>
        Real screens from the live platform. Fee amounts are masked.
      </p>

      <ScreenshotLightbox shots={mathpathScreens} index={lightbox} onChange={setLightbox} productName="MathPath Platform" />
    </div>
  );
}
