import { Check, MessageSquareQuote, Scale } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

/**
 * Two small illustrations of how Krama turns an answer into a mark and a mark
 * into a report: how an answer is marked, and how a school's scheme weighs
 * its components. Both are labelled as illustrations, not live data.
 */

const outcomes = [
  { typed: "8", result: "2 / 2", note: "Marked the moment it is submitted.", tone: "ok" as const },
  { typed: "8 pieces", result: "2 / 2", note: "The unit is understood, so the answer still counts.", tone: "ok" as const },
  { typed: "7", work: "240 ÷ 30", result: "1 / 2", note: "Method mark given. Teacher's note: right method, slipped on the division.", tone: "part" as const },
];

const scheme = [
  { name: "Unit tests", pct: 20, shade: "#ffe3a6" },
  { name: "Platform practice", pct: 10, shade: "#f9ab2b" },
  { name: "Half-yearly", pct: 30, shade: "#a99fe8" },
  { name: "Annual", pct: 40, shade: "#6d5fd0" },
];

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.14em]" style={{ borderColor: "var(--border-strong)", color: "var(--text-muted)" }}>
      {children}
    </span>
  );
}

export default function KramaMarking() {
  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <Reveal className="h-full">
        <div className="surface-card flex h-full flex-col p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-[0.68rem]">How an answer becomes a mark</p>
            <Tag>Illustration</Tag>
          </div>
          <div className="mt-5 rounded-xl border p-5" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-base)" }}>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>Question · 2 marks</p>
            <p className="font-serif-display mt-2 text-xl font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
              A ribbon is 2.4 m long. How many 30 cm pieces can be cut from it?
            </p>
          </div>
          <ul className="mt-5 space-y-3">
            {outcomes.map((o) => (
              <li key={o.typed} className="grid grid-cols-[1fr_auto] items-start gap-x-4 gap-y-2 rounded-xl border p-4 sm:grid-cols-[5.5rem_1fr_auto]" style={{ borderColor: "var(--border-subtle)", background: "color-mix(in srgb, var(--bg-elevated) 70%, transparent)" }}>
                <div>
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>Student wrote</p>
                  <p className="mt-1 font-mono text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{o.typed}</p>
                  {o.work && <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>{o.work}</p>}
                </div>
                <p className="order-3 col-span-2 text-sm leading-6 sm:order-2 sm:col-span-1 sm:pt-1" style={{ color: "var(--text-secondary)" }}>
                  {o.tone === "part" && <MessageSquareQuote size={14} className="mr-1.5 inline -translate-y-px" style={{ color: "var(--accent)" }} />}
                  {o.note}
                </p>
                <span
                  className="order-2 flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1.5 font-mono text-sm font-bold sm:order-3"
                  style={{ background: o.tone === "ok" ? "rgba(52,211,153,0.14)" : "var(--accent-soft)", color: o.tone === "ok" ? "var(--status-live)" : "var(--accent)" }}
                >
                  {o.tone === "ok" && <Check size={13} strokeWidth={3} />}
                  {o.result}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="h-full">
        <div className="surface-card flex h-full flex-col p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-[0.68rem]">The school&apos;s own scheme</p>
            <Tag>Sample</Tag>
          </div>
          <p className="mt-4 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
            Each school weighs its own components for every class, subject and year. The weights have to add up to 100, and the scheme is versioned so a report card can always be traced.
          </p>
          <div className="mt-6 flex h-3 overflow-hidden rounded-full" role="img" aria-label="A sample scheme: unit tests 20, practice 10, half-yearly 30, annual 40">
            {scheme.map((s) => (
              <span key={s.name} style={{ width: `${s.pct}%`, background: s.shade }} />
            ))}
          </div>
          <ul className="mt-5 space-y-2.5">
            {scheme.map((s) => (
              <li key={s.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2.5" style={{ color: "var(--text-secondary)" }}>
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.shade }} />
                  {s.name}
                </span>
                <span className="font-mono font-semibold" style={{ color: "var(--text-primary)" }}>{s.pct}%</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-center gap-3 rounded-xl border p-4 pt-4" style={{ borderColor: "var(--glow-primary)", background: "var(--accent-soft)", marginTop: "1.75rem" }}>
            <Scale size={18} style={{ color: "var(--accent)" }} />
            <p className="text-sm leading-6" style={{ color: "var(--text-primary)" }}>
              Into Term 1 and Year-End report cards, with attendance, grades and remarks.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
