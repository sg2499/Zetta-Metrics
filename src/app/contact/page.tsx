"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { Mail, BookOpen, Send, CheckCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: i * 0.1 },
  }),
};

const SUBJECTS = [
  "Freelance / Client Project",
  "AI & LLM Integration",
  "EdTech Product Development",
  "Data Science Consulting",
  "Collaboration",
  "General Inquiry",
];

const SOCIALS = [
  { icon: GithubIcon, label: "GitHub", value: "github.com/sg2499", href: "https://github.com/sg2499", color: "hover:border-slate-400/30" },
  { icon: LinkedinIcon, label: "LinkedIn", value: "Shailesh Gupta", href: "https://linkedin.com/in/shailesh-gupta-7b7278188", color: "hover:border-blue-400/30" },
  { icon: BookOpen, label: "Blog", value: "Prismatic Metrics", href: "https://prismatic-metrics.blogspot.com", color: "hover:border-orange-400/30" },
  { icon: Mail, label: "Email", value: "Open to contact", href: "mailto:contact@zetta-metrics.com", color: "hover:border-cyan-400/30" },
];

export default function ContactPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: SUBJECTS[0], message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: integrate with EmailJS / Resend
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20">
      <div className="container-custom max-w-5xl" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Get In Touch</p>
          <h1 className="font-display font-bold leading-tight mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Let&apos;s Build Something <span className="gradient-text">Great.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Have a project in mind? Want to collaborate? Or just want to say hello?
            I respond to every message within 24 hours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left: Info */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="md:col-span-2 space-y-5"
          >
            {SOCIALS.map(({ icon: Icon, label, value, href, color }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`flex items-center gap-4 glass rounded-2xl p-5 border border-white/5 ${color} transition-all duration-200 group`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-slate-300 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">{label}</div>
                  <div className="text-sm text-slate-200 font-medium">{value}</div>
                </div>
              </a>
            ))}

            <div className="glass rounded-2xl p-5 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-slate-400">Currently available for new projects</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Based in India (IST, UTC+5:30). Typical response time: within 24 hours.
                Happy to work with clients worldwide.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="md:col-span-3"
          >
            {submitted ? (
              <div className="glass rounded-2xl border border-green-500/20 bg-green-500/5 p-12 text-center h-full flex flex-col items-center justify-center">
                <CheckCircle size={40} className="text-green-400 mb-4" />
                <h3 className="font-display font-bold text-2xl text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400 text-sm">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl border border-white/5 p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">Your Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">Email Address</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/40 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-[#060f23] border border-white/8 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/40 transition-colors"
                  >
                    {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project, idea, or question..."
                    className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/40 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full py-3.5 rounded-xl overflow-hidden font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                  <span className="relative text-white flex items-center gap-2">
                    Send Message
                    <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
