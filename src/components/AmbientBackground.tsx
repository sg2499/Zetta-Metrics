"use client";

export default function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--bg-base) 0%, var(--bg-raised) 46%, var(--bg-base) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          opacity: "var(--grid-opacity, 0.06)",
          backgroundImage:
            "linear-gradient(var(--border-strong) 1px, transparent 1px), linear-gradient(90deg, var(--border-strong) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(to bottom, transparent, black 12%, black 82%, transparent)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 22% 8%, var(--accent-glow), transparent 30%), radial-gradient(circle at 78% 24%, var(--accent-soft), transparent 34%)",
          opacity: 0.9,
        }}
      />
    </div>
  );
}
