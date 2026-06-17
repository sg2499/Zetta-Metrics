"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { ExternalLink, Calendar, Tag } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: i * 0.08 },
  }),
};

const POSTS = [
  {
    title: "ShaileshGPT — Building an AI-Powered Personal Portfolio Assistant",
    date: "April 24, 2026",
    excerpt: "In today's world, a resume is no longer enough. I built ShaileshGPT to let my portfolio speak for itself — an interactive AI assistant that represents me 24/7 to recruiters and clients.",
    tags: ["AI Portfolio", "LLM Engineering", "OpenAI"],
    href: "https://prismatic-metrics.blogspot.com/2026/04/shaileshgpt-building-ai-powered.html",
    gradient: "from-blue-600/10 to-cyan-500/5",
    border: "border-blue-500/15",
    icon: "🤖",
  },
  {
    title: "Deep Research Agent — Agentic AI That Actually Thinks",
    date: "April 23, 2026",
    excerpt: "This is an agentic deep research assistant built using Gradio, OpenAI Agents SDK, and SendGrid. Unlike simple chatbots, it clarifies, plans, searches, and synthesizes before delivering a report.",
    tags: ["Agentic AI", "OpenAI Agents SDK", "Multi-Agent Systems"],
    href: "https://prismatic-metrics.blogspot.com",
    gradient: "from-violet-600/10 to-indigo-500/5",
    border: "border-violet-500/15",
    icon: "🔎",
  },
  {
    title: "Movie Recommender System — Content-Based Filtering with Streamlit",
    date: "July 27, 2025",
    excerpt: "A content-based recommendation engine using TF-IDF vectorization and cosine similarity on movie metadata — genres, cast, and keywords — to suggest the top 5 similar movies.",
    tags: ["Recommendation System", "NLP", "TF-IDF", "Streamlit"],
    href: "https://prismatic-metrics.blogspot.com",
    gradient: "from-cyan-600/10 to-teal-500/5",
    border: "border-cyan-500/15",
    icon: "🎬",
  },
  {
    title: "Stock Price Predictor — LSTM Deep Learning for Time Series",
    date: "July 27, 2025",
    excerpt: "Developing a predictive model that forecasts future stock prices using historical data, combining time series insights with LSTM deep learning techniques on Yahoo Finance data.",
    tags: ["LSTM", "Deep Learning", "Time Series", "TensorFlow"],
    href: "https://prismatic-metrics.blogspot.com",
    gradient: "from-orange-600/10 to-yellow-500/5",
    border: "border-orange-500/15",
    icon: "📈",
  },
  {
    title: "Campus Placement Predictor — Will You Get Placed?",
    date: "July 25, 2025",
    excerpt: "A binary classification model that predicts student placement likelihood based on academic profile, work experience, and specialization. Real-world ML for a real student problem.",
    tags: ["Classification", "Logistic Regression", "Campus Placement"],
    href: "https://prismatic-metrics.blogspot.com",
    gradient: "from-emerald-600/10 to-teal-500/5",
    border: "border-emerald-500/15",
    icon: "🏛️",
  },
  {
    title: "Next Word Prediction Using LSTM on Shakespeare's Hamlet",
    date: "July 24, 2025",
    excerpt: "Can a neural network trained on classical literature predict the next word contextually? This LSTM language model trained on 12,000+ words from Hamlet explores that question.",
    tags: ["LSTM", "NLP", "Language Modeling", "Shakespeare"],
    href: "https://prismatic-metrics.blogspot.com",
    gradient: "from-rose-600/10 to-pink-500/5",
    border: "border-rose-500/15",
    icon: "📜",
  },
];

export default function BlogPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="pt-28 pb-20">
      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Prismatic Metrics</p>
          <h1 className="font-display font-bold leading-tight mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Thoughts in <span className="gradient-text">Data.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Deep-dives into AI projects, machine learning systems, and the craft behind building intelligent products.
          </p>
          <a
            href="https://prismatic-metrics.blogspot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Visit Prismatic Metrics <ExternalLink size={12} />
          </a>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <motion.a
              key={post.title}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`glass rounded-2xl p-6 border ${post.border} bg-gradient-to-br ${post.gradient} group flex flex-col h-full cursor-pointer`}
            >
              <div className="text-3xl mb-4">{post.icon}</div>

              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar size={10} />
                  {post.date}
                </div>
              </div>

              <h3 className="font-display font-bold text-base text-white mb-3 leading-snug group-hover:text-blue-300 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs glass text-slate-400">
                    <Tag size={9} /> {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-blue-400 group-hover:gap-2.5 transition-all duration-200">
                Read Full Post <ExternalLink size={11} />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          custom={8}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mt-12"
        >
          <a
            href="https://prismatic-metrics.blogspot.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-7 py-3 glass rounded-xl border border-white/8 text-sm text-slate-300 hover:text-white hover:border-blue-500/20 transition-all duration-200 flex items-center gap-2 mx-auto">
              See All Posts on Prismatic Metrics <ExternalLink size={13} />
            </button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
