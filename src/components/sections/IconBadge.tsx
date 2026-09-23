import type { LucideIcon } from "lucide-react";

/**
 * Shared icon treatment used across pillar/highlight/process cards site-wide
 * — a soft gradient-glass badge instead of a bare icon, so every card reads
 * as a deliberately designed piece rather than a generic list item.
 */
export default function IconBadge({ icon: Icon, size = "md" }: { icon: LucideIcon; size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-14 w-14" : "h-11 w-11";
  const iconSize = size === "lg" ? 26 : 20;
  return (
    <div
      className={`relative flex ${box} shrink-0 items-center justify-center rounded-xl`}
      style={{
        background: "linear-gradient(150deg, var(--accent-soft), transparent)",
        border: "1px solid var(--glass-border)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      <Icon size={iconSize} style={{ color: "var(--accent)" }} />
    </div>
  );
}
