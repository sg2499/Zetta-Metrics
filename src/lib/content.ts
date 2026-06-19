import {
  BarChart3,
  BookOpen,
  Bot,
  Brain,
  BriefcaseBusiness,
  Code2,
  Database,
  FileSearch,
  GraduationCap,
  Layers3,
  LineChart,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

export const brand = {
  name: "ZettaMetrics",
  founder: "Shailesh Gupta",
  email: "contact@zetta-metrics.com",
  github: "https://github.com/sg2499",
  linkedin: "https://linkedin.com/in/shailesh-gupta-7b7278188",
  blog: "https://prismatic-metrics.blogspot.com",
  positioning:
    "Founder-led AI product studio building LLM applications, intelligent data systems, and EdTech platforms for businesses.",
  shortPositioning:
    "AI product studio for LLM apps, data systems, and EdTech platforms.",
};

export const proofPoints = [
  { value: "2+", label: "Years in applied data science" },
  { value: "19+", label: "Public GitHub repositories" },
  { value: "3", label: "Flagship product systems" },
  { value: "IIT Roorkee", label: "MDSAI academic anchor" },
];

export const serviceLines = [
  {
    icon: Bot,
    title: "AI Assistants and RAG Systems",
    summary:
      "Grounded assistants, portfolio copilots, internal knowledge bots, and lead-capture AI workflows.",
    deliverables: [
      "Custom chatbot UX",
      "RAG knowledge base",
      "Streaming responses",
      "Lead capture and analytics",
    ],
  },
  {
    icon: Rocket,
    title: "AI MVP Development",
    summary:
      "Fast, polished product builds for founders who need a usable AI prototype or launch-ready v1.",
    deliverables: [
      "Product scoping",
      "Next.js frontend",
      "FastAPI backend",
      "Cloud deployment",
    ],
  },
  {
    icon: BookOpen,
    title: "EdTech Product Platforms",
    summary:
      "Learning systems with roles, assignments, scoring, dashboards, and adaptive product logic.",
    deliverables: [
      "Student and admin flows",
      "Curriculum tooling",
      "Assessment engines",
      "Progress analytics",
    ],
  },
  {
    icon: BarChart3,
    title: "Data Science and ML Consulting",
    summary:
      "Predictive models, analytics systems, PySpark pipelines, and dashboards that turn data into decisions.",
    deliverables: [
      "ML model development",
      "PySpark and Azure pipelines",
      "Predictive analytics",
      "Executive dashboards",
    ],
  },
];

export const flagshipWork = [
  {
    icon: Bot,
    title: "ShaileshGPT",
    eyebrow: "Agentic RAG product",
    summary:
      "A full-stack AI portfolio system with grounded chat, recruiter JD-fit analysis, lead capture, analytics, notifications, and PDF reports.",
    stack: ["React", "FastAPI", "OpenAI", "RAG", "Supabase", "SendGrid"],
    href: "/chat",
    repo: "https://github.com/sg2499/ShaileshGPT",
    proof:
      "Shows the ability to turn a static profile into an interactive AI product with real backend workflows.",
  },
  {
    icon: Layers3,
    title: "MathPath Platform",
    eyebrow: "Client EdTech platform",
    summary:
      "A full-stack math learning platform with admin, teacher, and student flows, DPS assignments, server-side scoring, timers, and result review.",
    stack: ["Next.js", "FastAPI", "SQL", "TanStack Query", "Role-based UX"],
    href: "/studio#mathpath",
    repo: "https://github.com/sg2499/MathPath-Platform",
    proof:
      "Demonstrates product engineering across curriculum tooling, protected assessment flow, and operational dashboards.",
  },
  {
    icon: FileSearch,
    title: "Deep Research Agent",
    eyebrow: "Multi-agent research system",
    summary:
      "An orchestrated research assistant that clarifies queries, plans evidence gathering, searches, synthesizes, and can deliver reports by email.",
    stack: ["OpenAI Agents SDK", "Gradio", "Pydantic", "Web Search", "SendGrid"],
    href: "/projects",
    repo: "https://github.com/sg2499/Deep-Research-Agent",
    proof:
      "Proves practical agent design beyond a simple prompt wrapper.",
  },
];

export const projects = [
  ...flagshipWork,
  {
    icon: Brain,
    title: "OpenAI QA ChatBot",
    eyebrow: "Applied GenAI",
    summary:
      "A LangChain and OpenAI-powered question-answering project focused on practical LLM integration patterns.",
    stack: ["OpenAI", "LangChain", "Streamlit", "Python"],
    href: "/projects",
    repo: "https://github.com/sg2499/OpenAI-Enhanced-QA-ChatBot",
    proof: "Demonstrates applied LLM integration and UX packaging.",
  },
  {
    icon: LineChart,
    title: "Stock Price Predictor",
    eyebrow: "Time-series forecasting",
    summary:
      "LSTM-based forecasting project using historical stock data, trend visualization, and predicted-versus-actual comparison.",
    stack: ["TensorFlow", "Keras", "LSTM", "Streamlit"],
    href: "/projects",
    repo: "https://github.com/sg2499/Stock-Price-Predictor",
    proof: "Shows deep learning fundamentals applied to time-series workflows.",
  },
  {
    icon: Network,
    title: "Movie Recommender System",
    eyebrow: "Recommendation system",
    summary:
      "Content-based recommender using metadata, vectorization, and similarity scoring to surface relevant movie suggestions.",
    stack: ["Python", "TF-IDF", "Cosine Similarity", "Streamlit"],
    href: "/projects",
    repo: "https://github.com/sg2499/Movie-Recommender-System",
    proof: "Shows classic recommender-system thinking packaged into a usable app.",
  },
  {
    icon: Workflow,
    title: "Udemy Course Recommender",
    eyebrow: "NLP recommendation",
    summary:
      "Course recommendation project using TF-IDF and cosine similarity over course descriptions and metadata.",
    stack: ["Python", "NLP", "Pandas", "Streamlit"],
    href: "/projects",
    repo: "https://github.com/sg2499/Udemy-Course-Recommendation-System",
    proof: "Applies language features to discovery and matching.",
  },
  {
    icon: ShieldCheck,
    title: "Campus Placement Predictor",
    eyebrow: "Applied classification",
    summary:
      "Binary classification project predicting placement likelihood from academic and profile signals.",
    stack: ["Python", "Classification", "EDA", "Streamlit"],
    href: "/projects",
    repo: "https://github.com/sg2499/Campus-Placement-Predictor",
    proof: "Packages applied ML into a decision-support workflow.",
  },
];

export const timeline = [
  {
    icon: GraduationCap,
    period: "2024 - 2025",
    role: "MDSAI, Data Science and AI",
    org: "IIT Roorkee",
    detail:
      "Advanced postgraduate training across machine learning, artificial intelligence, modern AI workflows, and applied systems.",
  },
  {
    icon: GraduationCap,
    period: "2021 - 2022",
    role: "Executive Program in Data Science",
    org: "IIIT Bangalore",
    detail:
      "Structured data science program strengthening machine learning, analytics, and practical problem-solving foundations.",
  },
  {
    icon: BriefcaseBusiness,
    period: "2023 - 2024",
    role: "Data Scientist",
    org: "Teleperformance",
    detail:
      "Built ML models for attrition prediction and credit risk, with PySpark and Azure data pipeline work for business decision systems.",
  },
  {
    icon: Sparkles,
    period: "2024 - Present",
    role: "Founder and AI Product Builder",
    org: "ZettaMetrics",
    detail:
      "Building client-facing AI products, EdTech platforms, RAG systems, and productized data applications.",
  },
];

export const skillGroups = [
  {
    icon: Code2,
    title: "Core Engineering",
    items: ["Python", "TypeScript", "SQL", "React", "Next.js", "FastAPI"],
  },
  {
    icon: Brain,
    title: "AI and ML",
    items: ["OpenAI", "LangChain", "RAG", "Agents", "TensorFlow", "PyTorch"],
  },
  {
    icon: Database,
    title: "Data and Cloud",
    items: ["PySpark", "Azure", "PostgreSQL", "ETL", "Pandas", "Dashboards"],
  },
];

export const insights = [
  {
    title: "ShaileshGPT - Building an AI-Powered Personal Portfolio Assistant",
    date: "April 24, 2026",
    summary:
      "How a static portfolio became an interactive AI product with grounded answers, recruiter flows, and lead capture.",
    tags: ["AI Portfolio", "RAG", "Product UX"],
    href: "https://prismatic-metrics.blogspot.com/2026/04/shaileshgpt-building-ai-powered.html",
  },
  {
    title: "Deep Research Agent - Agentic AI That Actually Thinks",
    date: "April 23, 2026",
    summary:
      "A look at clarification-first research workflows, specialist agents, and long-form report generation.",
    tags: ["Agents", "Research", "OpenAI SDK"],
    href: "https://prismatic-metrics.blogspot.com/2026/04/deep-research-agent-author-shailesh.html",
  },
  {
    title: "Movie Recommender System - Content-Based Filtering",
    date: "July 27, 2025",
    summary:
      "Building a recommender from movie metadata using TF-IDF and cosine similarity.",
    tags: ["Recommendation", "NLP", "Streamlit"],
    href: "https://prismatic-metrics.blogspot.com",
  },
  {
    title: "Stock Price Predictor - LSTM for Time Series",
    date: "July 27, 2025",
    summary:
      "A time-series forecasting project using LSTM networks, historical data, and trend visualization.",
    tags: ["LSTM", "Forecasting", "TensorFlow"],
    href: "https://prismatic-metrics.blogspot.com",
  },
];

export const clientFitQuestions = [
  "I need an AI chatbot for my business",
  "Can you build an EdTech MVP?",
  "Show me the MathPath proof",
  "How strong is the ShaileshGPT backend?",
  "What can you build in 4 weeks?",
];
