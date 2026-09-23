import {
  Boxes,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  Database,
  FileSpreadsheet,
  GaugeCircle,
  GraduationCap,
  LayoutDashboard,
  Lock,
  Network,
  ShieldCheck,
  Sparkles,
  Timer,
  Users,
  Workflow,
} from "lucide-react";

export const brand = {
  name: "Zetta Metrics",
  legalName: "Zetta Metrics Technologies Private Limited",
  email: "contact@zetta-metrics.com",
  github: "https://github.com/sg2499",
  linkedin: "https://www.linkedin.com/in/shailesh-gupta-7b7278188",
  positioning:
    "Zetta Metrics builds AI-driven automation platforms that turn manual, fragmented business processes into intelligent digital workflows.",
  shortPositioning:
    "AI-native software for teams who are done doing things by hand.",
  location: "Kolkata & Pune, India — building for clients worldwide",
};

export const founders = [
  {
    name: "Shailesh Gupta",
    role: "Founder & Director",
    bio: "Data scientist turned AI product builder. Formerly built ML models for attrition and credit-risk at Teleperformance; now leads product and engineering at Zetta Metrics after an MDSAI at IIT Roorkee focused on applied AI and LLM systems.",
    linkedin: "https://www.linkedin.com/in/shailesh-gupta-7b7278188",
    github: "https://github.com/sg2499",
  },
  {
    name: "Ashalatha Gupta",
    role: "Founder & Director",
    bio: "Co-founder and Director of Zetta Metrics, driving the company's operating foundation alongside its product direction.",
  },
];

export const proofPoints = [
  { value: "2", label: "Products in active development" },
  { value: "1", label: "Platform, built to be reused" },
  { value: "2026", label: "Founded in Kolkata, India" },
  { value: "AI-native", label: "Every product, from day one" },
];

export const platformPillars = [
  {
    icon: BrainCircuit,
    title: "AI & ML at the core",
    summary:
      "Every product is built around models and automated reasoning, not bolted-on chat widgets — extraction, scoring, grading, and decisioning all run through the same AI layer.",
  },
  {
    icon: Workflow,
    title: "Workflow orchestration",
    summary:
      "A shared engine for role-based access, assignment/attempt lifecycles, approvals, and status transitions — built once at MathPath, reused and extended at School Enrichment.",
  },
  {
    icon: Database,
    title: "Data & analytics native",
    summary:
      "Structured data models, auditable scoring, and dashboards are first-class in every product — not an afterthought bolted on for a demo.",
  },
  {
    icon: ShieldCheck,
    title: "Built for institutions",
    summary:
      "Session hygiene, role separation, backend-authoritative scoring, and data-export/privacy handling are standard, not optional extras added later.",
  },
];

export const products = [
  {
    slug: "mathpath",
    name: "MathPath",
    tagline: "A role-based math learning operations platform.",
    status: "live" as const,
    statusLabel: "Live product",
    eyebrow: "Flagship product",
    summary:
      "MathPath gives schools and learning programs a full operating layer for math practice — admin, teacher, and student dashboards; structured curriculum delivery; server-authoritative assessment; and progress reporting parents can actually read.",
    icon: LayoutDashboard,
    highlights: [
      {
        icon: Users,
        title: "Role-based dashboards",
        detail:
          "Dedicated Admin, Teacher, and Student experiences, each scoped to what that role actually needs to do.",
      },
      {
        icon: ClipboardCheck,
        title: "DPS practice workflows",
        detail:
          "Structured daily-practice-set delivery across lessons and levels, with randomized options and no answer leakage before submission.",
      },
      {
        icon: Timer,
        title: "Timed, backend-scored assessments",
        detail:
          "Timer authority and scoring both live server-side — the client never holds the answer key or the clock.",
      },
      {
        icon: GaugeCircle,
        title: "Readiness governance & progress tracking",
        detail:
          "Attempt status, results history, and readiness signals give teachers and admins a real read on where each student stands.",
      },
      {
        icon: FileSpreadsheet,
        title: "Parent-ready reporting",
        detail:
          "Progress rolls up into reports built for a parent to understand at a glance, not just an internal ops view.",
      },
      {
        icon: Cpu,
        title: "Production deployment architecture",
        detail:
          "FastAPI + Next.js + SQL, deployed and demo-ready — not a prototype sitting on a laptop.",
      },
    ],
    stack: ["Next.js", "FastAPI", "PostgreSQL", "TanStack Query", "Role-based auth"],
    screenshots: [
      { src: "/screenshots/mathpath/admin-dashboard.jpg", caption: "Admin — Control Centre" },
      { src: "/screenshots/mathpath/admin-students.jpg", caption: "Admin — Student Management" },
      { src: "/screenshots/mathpath/teacher-dashboard.jpg", caption: "Teacher — Teaching Workspace" },
      { src: "/screenshots/mathpath/student-dashboard.jpg", caption: "Student — Learning Workspace" },
    ],
    href: "/products/mathpath",
    repo: "https://github.com/sg2499/MathPath-Platform",
  },
  {
    slug: "school-enrichment",
    name: "School Enrichment",
    tagline: "A CBSE/ICSE academic learning platform for Classes 5–10.",
    status: "development" as const,
    statusLabel: "In active development",
    eyebrow: "Second product",
    summary:
      "School Enrichment applies the same platform engine to full CBSE/ICSE academic delivery — a School → Student/Teacher/Admin identity model, a curriculum studio for mapping and approving content, and a five-day guided learning loop with automated marking.",
    icon: GraduationCap,
    highlights: [
      {
        icon: Building2,
        title: "School-first identity model",
        detail:
          "Built around a School → Student/Teacher/Admin structure from the ground up, with Super Admin controls to publish and map curriculum across schools.",
      },
      {
        icon: Boxes,
        title: "Curriculum Studio",
        detail:
          "Chapter/lesson/question status workflows, an Excel-based content import pipeline, and automated structural and math-pattern quality checks before anything reaches a student.",
      },
      {
        icon: Sparkles,
        title: "Five-day guided learning loop",
        detail:
          "A structured assignment-and-attempt lifecycle with auto-marking and a built-in 'Foundation Repair' path for students who need it.",
      },
      {
        icon: Lock,
        title: "Security hardened from the start",
        detail:
          "Session hygiene, role-scoped access control, and data-export/privacy handling are already in place at this stage — not deferred to a later phase.",
      },
    ],
    stack: ["Next.js 15", "FastAPI", "SQLAlchemy", "Alembic", "PostgreSQL"],
    screenshots: [],
    href: "/products/school-enrichment",
    repo: null,
  },
];

export const processSteps = [
  {
    icon: Network,
    title: "Map the workflow",
    detail:
      "We start with the manual, repetitive process as it actually runs today — not an idealized version of it.",
  },
  {
    icon: BrainCircuit,
    title: "Design the AI layer",
    detail:
      "Extraction, scoring, decisioning, or orchestration logic is designed around that real workflow, on Zetta's shared platform engine.",
  },
  {
    icon: CheckCircle2,
    title: "Ship, measure, scale",
    detail:
      "A working product ships, gets used, and gets measured — then the same underlying engine extends to the next workflow or the next customer.",
  },
];
