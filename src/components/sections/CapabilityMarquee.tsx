import { capabilities } from "@/lib/content";

/**
 * An endlessly scrolling strip of real product capabilities — the honest
 * alternative to a wall of client logos. Pure CSS (pauses on hover; under
 * reduced motion it becomes a static, wrapped set of chips). The list is
 * rendered twice so the -50% translate loops seamlessly; the copy is
 * hidden from assistive tech.
 */
export default function CapabilityMarquee() {
  const chip = (c: (typeof capabilities)[number], key: string, hidden = false) => {
    const Icon = c.icon;
    return (
      <li
        key={key}
        aria-hidden={hidden || undefined}
        className={`${hidden ? "marquee-dup " : ""}mx-2 flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium`}
        style={{ borderColor: "var(--border-subtle)", background: "var(--bg-raised)", color: "var(--text-secondary)" }}
      >
        <Icon size={15} style={{ color: "var(--accent)" }} />
        {c.label}
      </li>
    );
  };

  return (
    <div className="marquee overflow-hidden py-2">
      <ul className="marquee-track" aria-label="Platform capabilities">
        {capabilities.map((c) => chip(c, c.label))}
        {capabilities.map((c) => chip(c, `${c.label}-dup`, true))}
      </ul>
    </div>
  );
}
