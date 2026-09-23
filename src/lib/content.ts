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
  email: "shaileshgupta@zetta-metrics.com",
  phones: ["7980919518", "9831684229"],
  github: "https://github.com/sg2499",
  linkedin: "https://www.linkedin.com/in/shailesh-gupta-7b7278188",
  positioning:
    "We're an AI-native SaaS company: role-based workflows, backend-authoritative logic, and AI built into the product from day one, not bolted on after. MathPath and School Enrichment are where we started — we build for any institution or business whose manual process is ready to become software.",
  shortPositioning:
    "An AI-native SaaS company, built to keep shipping past our first two products.",
  location: "Kolkata, India — building for clients worldwide",
};

export const founders = [
  {
    name: "Shailesh Gupta",
    role: "Founder & Director",
    bio: "Started out building attrition and credit-risk models at Teleperformance, then spent two years on applied AI and LLM systems during an MDSAI at IIT Roorkee. Leads product and engineering at Zetta Metrics — the one writing the code everything runs on.",
    image: "/founder-shailesh.jpg",
    linkedin: "https://www.linkedin.com/in/shailesh-gupta-7b7278188",
    github: "https://github.com/sg2499",
  },
  {
    name: "Ashalatha Gupta",
    role: "Founder & Director",
    bio: "Co-founder and Director, running the operating and business side of Zetta Metrics so product and engineering can stay focused on what ships.",
    image: null,
  },
];

export const proofPoints = [
  { value: "2026", label: "Founded in Kolkata, India" },
  { value: "SaaS", label: "That's the business we're in" },
  { value: "AI-native", label: "Every product, from day one" },
  { value: "100%", label: "Backend-authoritative, auditable logic" },
];

// Used on the Home page ("The platform" section) — framed around the
// engineering principles we apply to whatever we build, not around any one
// product or a single fixed "engine."
export const platformPillars = [
  {
    icon: BrainCircuit,
    title: "AI inside the product, not bolted on",
    summary:
      "Scoring, decisions, and content checks run through AI as part of the product itself — never a chat widget dropped on top afterward.",
  },
  {
    icon: Workflow,
    title: "Built to be reused, not rebuilt",
    summary:
      "Roles, approvals, and workflow logic are designed as reusable building blocks, so the next product we build starts ahead of the last one instead of from zero.",
  },
  {
    icon: Database,
    title: "Scoring you can audit",
    summary:
      "Every decision and status change traces back to a server-side rule, not a client guess — so it's always auditable.",
  },
  {
    icon: ShieldCheck,
    title: "Built for production, not demos",
    summary:
      "Role separation, session handling, and data controls are part of the first build for any client we take on — because what we ship reaches real users, not a pitch audience.",
  },
];

// Used on the Company page (mission recap) — same underlying principles as
// platformPillars, framed around how we operate as a company rather than
// what any one product does technically. Keep this distinct in wording.
export const companyPillars = [
  {
    icon: BrainCircuit,
    title: "AI is the default, not an add-on",
    summary:
      "We don't design a product and then look for a place to fit AI in — the intelligent layer is part of the first draft of every system we build.",
  },
  {
    icon: Workflow,
    title: "We build reusable systems, not one-offs",
    summary:
      "Every engagement is designed so what we learn and build carries into the next one — that's what lets us keep expanding into new products and new industries.",
  },
  {
    icon: Database,
    title: "Decisions have to be explainable",
    summary:
      "If a system scores, grades, or approves something, the reasoning has to be traceable — we don't ship logic nobody can account for.",
  },
  {
    icon: ShieldCheck,
    title: "We build for the people who'll actually use it",
    summary:
      "Access control, data handling, and session hygiene are standard from day one, because what we ship reaches real users, not a demo audience.",
  },
];

export const products = [
  {
    slug: "mathpath",
    name: "MathPath",
    tagline: "The operating layer schools use to run math practice.",
    status: "live" as const,
    statusLabel: "Live product",
    eyebrow: "Flagship product",
    summary:
      "MathPath runs the daily mechanics of math practice for a school: admin, teacher, and student dashboards, structured curriculum delivery, server-scored assessments, and progress reports a parent can actually read at a glance.",
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
    screenshots: [
      { src: "/screenshots/mathpath/admin-dashboard.png", caption: "Admin — Control Centre" },
      { src: "/screenshots/mathpath/teacher-dashboard.png", caption: "Teacher — Teaching Workspace" },
      { src: "/screenshots/mathpath/student-dashboard.png", caption: "Student — Learning Workspace" },
    ],
    href: "/products/mathpath",
  },
  {
    slug: "school-enrichment",
    name: "School Enrichment",
    tagline: "CBSE/ICSE academic delivery for Classes 5–10, built the same way we build everything.",
    status: "development" as const,
    statusLabel: "In active development",
    eyebrow: "Second product",
    summary:
      "School Enrichment is built the same way as MathPath, pointed at full academic delivery — a School → Student/Teacher/Admin identity model, a curriculum studio for mapping and approving content, and a five-day guided learning loop with automated marking.",
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
    screenshots: [],
    href: "/products/school-enrichment",
  },
];

export const processSteps = [
  {
    icon: Network,
    title: "Start with the real process",
    detail:
      "We map the workflow as it actually runs today — the roles, the handoffs, the manual steps — before writing a line of product code.",
  },
  {
    icon: BrainCircuit,
    title: "Build it right, not just fast",
    detail:
      "Roles, workflows, and logic are engineered as reusable pieces from the start, so the next thing we build doesn't start from zero.",
  },
  {
    icon: CheckCircle2,
    title: "Ship it, then extend it",
    detail:
      "The product goes into real use with real users. What we learn feeds the next build, so every product we ship starts further ahead than the last one.",
  },
];
