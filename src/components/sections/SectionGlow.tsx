interface Blob {
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  color: "primary" | "secondary" | "tertiary";
  delay?: number;
}

const COLOR_VAR: Record<Blob["color"], string> = {
  primary: "var(--glow-primary)",
  secondary: "var(--glow-secondary)",
  tertiary: "var(--glow-tertiary)",
};

/**
 * Drops one or two soft, slowly-drifting glow blobs into a section so the
 * same ambient atmosphere the hero has carries through the rest of the
 * page while scrolling — not just a flat wall of surface-cards after the
 * first screen. Pure CSS animation (see .section-glow in globals.css), so
 * it's cheap to use many times per page. Positioned absolute within a
 * `relative`, `overflow-hidden` section — the section itself provides
 * that wrapper.
 */
export default function SectionGlow({ blobs }: { blobs: Blob[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="section-glow"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            bottom: blob.bottom,
            left: blob.left,
            right: blob.right,
            background: COLOR_VAR[blob.color],
            animationDelay: blob.delay ? `${blob.delay}s` : undefined,
          }}
        />
      ))}
    </div>
  );
}
