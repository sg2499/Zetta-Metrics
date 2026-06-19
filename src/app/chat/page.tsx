"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Info, RefreshCw, Send, User } from "lucide-react";
import { clientFitQuestions } from "@/lib/content";
import { GithubIcon } from "@/components/BrandIcons";

type Message = { role: "user" | "assistant"; content: string };

const greeting: Message = {
  role: "assistant",
  content:
    "I am the ZettaMetrics concierge preview. I can route common questions about services, MathPath, ShaileshGPT, and fit. The production version should connect to the real ShaileshGPT RAG backend.",
};

function replyTo(input: string) {
  const text = input.toLowerCase();
  if (text.includes("mathpath") || text.includes("edtech")) {
    return "MathPath is the clearest client/product proof: a full-stack EdTech platform with admin, teacher, and student flows, DPS assignments, server-side answer validation, timed attempts, and result review. It should become a full case study on ZettaMetrics.";
  }
  if (text.includes("shaileshgpt") || text.includes("backend") || text.includes("rag")) {
    return "ShaileshGPT is the strongest AI product proof. The repo documents a full-stack RAG assistant with JD-fit analysis, lead capture, Supabase analytics, SendGrid/Pushover notifications, admin dashboard, and PDF reports. ZettaMetrics should reuse that architecture for a business-facing concierge.";
  }
  if (text.includes("4 week") || text.includes("mvp") || text.includes("build")) {
    return "A realistic 4-week engagement should focus on one narrow product path: discovery, clickable UX, core backend workflow, one AI/data feature, deployment, analytics, and a short handoff document. Scope discipline is what makes the build credible.";
  }
  if (text.includes("chatbot") || text.includes("assistant") || text.includes("business")) {
    return "For a business chatbot, ZettaMetrics should build grounded retrieval, source-aware answers, lead capture, analytics, rate limiting, and a clean admin view. A chatbot is valuable only when it plugs into a business workflow.";
  }
  return "ZettaMetrics is best positioned as a founder-led AI product studio. The strongest offers are AI assistants/RAG systems, AI MVP builds, EdTech platforms, and data science/ML consulting. For a serious inquiry, the contact page is the next step.";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setInput("");
    setMessages((current) => [...current, { role: "user", content: text }]);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    setMessages((current) => [...current, { role: "assistant", content: replyTo(text) }]);
    setLoading(false);
  };

  return (
    <div className="px-6 pb-10 pt-28">
      <div className="container-custom max-w-5xl">
        <section className="mb-6 grid gap-5 lg:grid-cols-[1fr_0.72fr]">
          <div>
            <p className="eyebrow">AI concierge</p>
            <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
              Preview the assistant layer ZettaMetrics should ship.
            </h1>
          </div>
          <div className="premium-card p-5">
            <div className="flex gap-3">
              <Info size={18} className="mt-0.5 shrink-0 text-cyan-300" />
              <p className="text-sm leading-6 text-slate-400">
                This page is intentionally marked as a preview. The production
                version should connect to the real ShaileshGPT backend instead
                of relying on canned routing.
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="premium-card flex h-[620px] flex-col p-0">
            <div className="flex items-center justify-between border-b border-white/8 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/8 p-3 text-cyan-200">
                  <Bot size={19} />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold text-white">ZettaMetrics Concierge</h2>
                  <p className="text-xs text-slate-500">Preview mode</p>
                </div>
              </div>
              <button
                onClick={() => setMessages([greeting])}
                className="inline-flex items-center gap-2 rounded-xl border border-white/8 px-3 py-2 text-xs text-slate-400 hover:text-white"
              >
                <RefreshCw size={12} /> Reset
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.role}-${index}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300">
                    {message.role === "assistant" ? <Bot size={15} /> : <User size={15} />}
                  </div>
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                      message.role === "assistant"
                        ? "border border-white/8 bg-white/[0.035] text-slate-300"
                        : "bg-cyan-400 text-slate-950"
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <div className="h-9 w-9 rounded-2xl border border-white/10 bg-white/[0.04]" />
                  <div className="rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-3 text-sm text-slate-400">
                    Thinking through the route...
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-white/8 p-4">
              {messages.length === 1 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {clientFitQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => send(question)}
                      className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex gap-3">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && send(input)}
                  placeholder="Ask about services, MathPath, ShaileshGPT, or fit..."
                  className="form-field"
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || loading}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400 text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="premium-card">
              <p className="eyebrow">Production target</p>
              <h2 className="font-display text-2xl font-semibold text-white">
                Replace this with the real RAG product.
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                ShaileshGPT already documents the backend patterns needed for
                grounded answers, visitor analytics, leads, and JD-style fit reports.
              </p>
              <a
                href="https://github.com/sg2499/ShaileshGPT"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white"
              >
                <GithubIcon size={15} /> View ShaileshGPT repo
              </a>
            </div>

            <div className="premium-card">
              <p className="eyebrow">Business CTA</p>
              <p className="text-sm leading-7 text-slate-400">
                For now, serious project conversations should route through the
                contact page so no lead is lost.
              </p>
              <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white">
                Start a project inquiry <ArrowRight size={15} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
