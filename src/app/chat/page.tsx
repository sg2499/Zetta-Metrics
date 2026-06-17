"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, User, Bot, RefreshCw } from "lucide-react";

const SUGGESTED = [
  "What projects has Shailesh built?",
  "What is his tech stack?",
  "Is he available for freelance work?",
  "Tell me about MathPath",
  "What is his educational background?",
  "What kind of clients does he work with?",
];

const GREETING = {
  role: "assistant" as const,
  content: "Hi! I'm ShaileshGPT — an AI assistant that knows everything about Shailesh Gupta. You can ask me about his projects, skills, experience, availability for freelance work, or anything else. What would you like to know? 🚀",
};

type Message = { role: "user" | "assistant"; content: string };

// Static responses for demo (replace with real API call)
const getResponse = async (message: string): Promise<string> => {
  await new Promise((r) => setTimeout(r, 1000 + Math.random() * 500));

  const lower = message.toLowerCase();
  if (lower.includes("project") || lower.includes("built") || lower.includes("work")) {
    return "Shailesh has built some impressive projects! His key ones include:\n\n🤖 **ShaileshGPT** — This very assistant you're talking to! An AI-powered portfolio representative.\n\n🔎 **Deep Research Agent** — A multi-agent system that researches topics and generates long-form reports using the OpenAI Agents SDK.\n\n📐 **MathPath** — An adaptive EdTech platform for mathematics (currently in active development).\n\n📈 **Stock Price Predictor** — LSTM-based deep learning model for time-series forecasting.\n\nYou can see all his projects at /projects. Want to know more about any specific one?";
  }
  if (lower.includes("tech") || lower.includes("stack") || lower.includes("skill") || lower.includes("language")) {
    return "Shailesh's tech stack spans the full AI/ML pipeline:\n\n**Core:** Python, TypeScript, SQL\n\n**ML/DL:** TensorFlow, Keras, PyTorch, Scikit-Learn, LSTM, NLP\n\n**Big Data & Cloud:** PySpark, Azure, ETL pipelines\n\n**Generative AI:** OpenAI API, LangChain, HuggingFace, RAG, Multi-Agent Systems\n\n**Web & Deployment:** Next.js, FastAPI, Streamlit, Gradio, Vercel\n\nHe's comfortable working across the entire stack — from data pipelines to production deployment.";
  }
  if (lower.includes("freelance") || lower.includes("hire") || lower.includes("available") || lower.includes("client")) {
    return "Yes! Shailesh is open to freelance projects through ZettaMetrics. He works on:\n\n• AI & LLM integration projects\n• Full-stack AI web applications\n• EdTech product development\n• Data science consulting\n\nHis typical response time is within 24 hours. Head to the /contact page to start a conversation, or visit /studio to learn more about his services.";
  }
  if (lower.includes("mathpath") || lower.includes("edtech") || lower.includes("education")) {
    return "MathPath is Shailesh's flagship EdTech product currently in active development. 📐\n\nIt's an AI-powered platform that reimagines how students learn mathematics through:\n\n✅ Adaptive difficulty engine\n✅ AI-powered tutoring\n✅ Interactive problem sets\n✅ Progress analytics dashboard\n✅ Gamified learning paths\n\nThe tech stack includes Next.js, TypeScript, and custom AI tutoring APIs. It's coming soon — follow along at /studio!";
  }
  if (lower.includes("education") || lower.includes("iit") || lower.includes("degree") || lower.includes("study")) {
    return "Shailesh is currently pursuing his **Master's in Data Science & AI (MDSAI) from IIT Roorkee** — one of India's most prestigious technical institutions.\n\nBefore that, he worked as a Data Scientist at **Teleperformance**, where he built ML models for attrition prediction and credit risk, and engineered PySpark data pipelines on Azure.";
  }
  return "That's a great question! Shailesh is a Data Scientist and AI Engineer with 2+ years of experience, currently pursuing MDSAI at IIT Roorkee. He builds AI products, consults for clients through ZettaMetrics, and is passionate about EdTech.\n\nFeel free to ask me anything specific — about his projects, skills, availability, or any particular area of his work!";
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);
    try {
      const reply = await getResponse(text);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => setMessages([GREETING]);

  return (
    <div className="pt-24 pb-10 h-screen flex flex-col">
      <div className="container-custom flex flex-col flex-1 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={16} className="text-blue-400" />
              <h1 className="font-display font-bold text-2xl">ShaileshGPT</h1>
            </div>
            <p className="text-slate-400 text-sm">Ask me anything about Shailesh Gupta</p>
          </div>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-2 glass rounded-xl text-xs text-slate-400 hover:text-white transition-colors border border-white/5"
          >
            <RefreshCw size={12} />
            Reset
          </button>
        </div>

        {/* Chat window */}
        <div className="flex-1 glass rounded-2xl border border-white/5 p-6 overflow-y-auto mb-4 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.role === "assistant" ? "bg-blue-600/20 border border-blue-500/30" : "bg-slate-700/50 border border-white/10"
                }`}>
                  {msg.role === "assistant" ? <Bot size={14} className="text-blue-400" /> : <User size={14} className="text-slate-300" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === "assistant"
                    ? "glass border border-white/5 text-slate-200"
                    : "bg-blue-600 text-white"
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <Bot size={14} className="text-blue-400" />
              </div>
              <div className="glass border border-white/5 rounded-2xl px-5 py-4 flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 rounded-full bg-blue-400"
                  />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 mb-4 shrink-0">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="px-3 py-2 glass rounded-xl text-xs text-slate-400 hover:text-white border border-white/5 hover:border-blue-500/25 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="shrink-0 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Ask me anything about Shailesh..."
            className="flex-1 glass rounded-xl px-5 py-3.5 text-sm text-white placeholder-slate-500 border border-white/5 focus:border-blue-500/30 focus:outline-none transition-colors bg-transparent"
          />
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
