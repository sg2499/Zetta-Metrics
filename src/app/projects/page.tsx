"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: i * 0.07 },
  }),
};

const FILTERS = ["All", "AI/LLM", "Deep Learning", "NLP", "Recommendation", "Analytics", "Classification"];

const PROJECTS = [
  {
    title: "ShaileshGPT",
    description: "AI-powered personal portfolio assistant. Answers recruiter and client questions, performs JD-fit analysis, and acts as my 24/7 representative.",
    tags: ["OpenAI", "LangChain", "React", "FastAPI"],
    category: "AI/LLM",
    icon: "🤖",
    github: "https://github.com/sg2499",
    demo: "/chat",
    gradient: "from-blue-600/15 to-cyan-500/5",
    border: "border-blue-500/15",
    featured: true,
  },
  {
    title: "Deep Research Agent",
    description: "Multi-agent research system with orchestrator architecture. Clarifies queries, plans research, searches the web, synthesizes evidence, and delivers professional long-form reports.",
    tags: ["OpenAI Agents SDK", "Gradio", "Pydantic", "SendGrid"],
    category: "AI/LLM",
    icon: "🔎",
    github: "https://github.com/sg2499/Deep-Research-Agent",
    demo: null,
    gradient: "from-violet-600/15 to-indigo-500/5",
    border: "border-violet-500/15",
    featured: true,
  },
  {
    title: "OpenAI QA ChatBot",
    description: "Streamlit chatbot powered by OpenAI and LangChain with streaming responses, chat history, and customizable system prompts.",
    tags: ["OpenAI", "LangChain", "Streamlit", "Python"],
    category: "AI/LLM",
    icon: "💬",
    github: "https://github.com/sg2499/OpenAI-Enhanced-QA-ChatBot",
    demo: null,
    gradient: "from-emerald-600/15 to-teal-500/5",
    border: "border-emerald-500/15",
    featured: false,
  },
  {
    title: "Stock Price Predictor",
    description: "LSTM-based deep learning model that forecasts stock prices from Yahoo Finance data. Features historical trend visualization, moving averages, and next-value estimation.",
    tags: ["LSTM", "TensorFlow", "Keras", "Streamlit"],
    category: "Deep Learning",
    icon: "📈",
    github: "https://github.com/sg2499/Stock-Price-Predictor",
    demo: null,
    gradient: "from-orange-600/15 to-yellow-500/5",
    border: "border-orange-500/15",
    featured: false,
  },
  {
    title: "Next Word Prediction (Hamlet)",
    description: "LSTM language model trained on 12,000+ words from Shakespeare's Hamlet. Predicts next word in a sequence with contextual accuracy through an interactive Streamlit interface.",
    tags: ["LSTM", "NLP", "Keras", "Streamlit"],
    category: "NLP",
    icon: "📜",
    github: "https://github.com/sg2499",
    demo: null,
    gradient: "from-rose-600/15 to-pink-500/5",
    border: "border-rose-500/15",
    featured: false,
  },
  {
    title: "Movie Recommender System",
    description: "Content-based recommendation engine using TF-IDF vectorization and cosine similarity on movie metadata (genres, cast, keywords). Suggests top 5 similar movies with posters.",
    tags: ["TF-IDF", "Cosine Similarity", "Streamlit", "Python"],
    category: "Recommendation",
    icon: "🎬",
    github: "https://github.com/sg2499/Movie-Recommender-System",
    demo: null,
    gradient: "from-cyan-600/15 to-blue-500/5",
    border: "border-cyan-500/15",
    featured: false,
  },
  {
    title: "Udemy Course Recommender",
    description: "NLP-powered course recommendation system that matches user queries to Udemy course descriptions using TF-IDF and cosine similarity. Includes an EDA dashboard.",
    tags: ["TF-IDF", "NLP", "Streamlit", "Pandas"],
    category: "Recommendation",
    icon: "🎓",
    github: "https://github.com/sg2499/Udemy-Course-Recommendation-System",
    demo: null,
    gradient: "from-indigo-600/15 to-violet-500/5",
    border: "border-indigo-500/15",
    featured: false,
  },
  {
    title: "IPL Win Probability Predictor",
    description: "Ball-by-ball IPL data powers a logistic regression model that predicts real-time win probability for the chasing team in a T20 match.",
    tags: ["Logistic Regression", "Sports Analytics", "Streamlit"],
    category: "Analytics",
    icon: "🏏",
    github: "https://github.com/sg2499/IPL-Win-Probability-Predictor",
    demo: null,
    gradient: "from-yellow-600/15 to-orange-500/5",
    border: "border-yellow-500/15",
    featured: false,
  },
  {
    title: "Campus Placement Predictor",
    description: "Binary classification model predicting student placement probability from academic scores, work experience, specialization, and gender.",
    tags: ["Logistic Regression", "Decision Trees", "Classification"],
    category: "Classification",
    icon: "🏛️",
    github: "https://github.com/sg2499",
    demo: null,
    gradient: "from-teal-600/15 to-emerald-500/5",
    border: "border-teal-500/15",
    featured: false,
  },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const filtered = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="pt-28 pb-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Portfolio</p>
          <h1 className="font-display font-bold leading-tight mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Work That <span className="gradient-text">Speaks.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Every project is a problem solved, a system engineered, and a product shipped.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === f
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "glass text-slate-400 hover:text-white border border-white/5 hover:border-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`glass rounded-2xl p-6 border ${project.border} bg-gradient-to-br ${project.gradient} group flex flex-col h-full`}
              >
                {project.featured && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-300 text-xs font-medium mb-3 self-start">
                    ⭐ Featured
                  </div>
                )}
                <div className="text-3xl mb-3">{project.icon}</div>
                <h3 className="font-display font-bold text-lg text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full text-xs glass text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-5">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
                      <GithubIcon size={13} /> Code
                    </a>
                  )}
                  {project.demo && (
                    <Link href={project.demo}
                      className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                      <ExternalLink size={13} /> Live Demo
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
