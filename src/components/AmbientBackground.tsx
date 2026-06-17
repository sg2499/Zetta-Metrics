"use client";

import { useEffect, useRef } from "react";

export default function AmbientBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div ref={ref} className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Deep void base */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* Static ambient orbs */}
      <div
        className="absolute rounded-full opacity-20"
        style={{
          width: "600px",
          height: "600px",
          top: "-100px",
          left: "-100px",
          background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute rounded-full opacity-15"
        style={{
          width: "500px",
          height: "500px",
          bottom: "100px",
          right: "-50px",
          background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute rounded-full opacity-10"
        style={{
          width: "400px",
          height: "400px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Mouse-reactive glow */}
      <div
        className="absolute rounded-full opacity-10 transition-all duration-700 ease-out"
        style={{
          width: "300px",
          height: "300px",
          left: "var(--mx, 50%)",
          top: "var(--my, 50%)",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Noise texture */}
      <div className="noise-overlay" />
    </div>
  );
}
