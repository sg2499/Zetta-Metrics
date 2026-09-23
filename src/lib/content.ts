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
    "We build one platform engine — role-based workflows, backend-authoritative scoring, and AI woven into the product logic — and apply it to real institutions, one product at a time.",
  shortPositioning:
    "One platform engine. Every product we ship extends it.",
  location: "Kolkata, India — building for clients worldwide",
};

export const founders = [
  {
    name: "Shailesh Gupta",
    role: "Founder & Director",
    bio: "Started out building attrition and credit-risk models at Teleperformance, then spent two years on applied AI and LLM systems during an MDSAI at IIT Roorkee. Leads product and engineering at Zetta Metrics — the one writing the code the platform runs on.",
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
  { value: "1", label: "Shared platform engine, every product" },
  { value: "AI-native", label: "Every product, from day one" },
  { value: "100%", label: "Backend-authoritative, auditable scoring" },
];

// Used on the Home page ("The platform" section) — framed around what the
// platform engine technically does.
export const platformPillars = [
  {
    icon: BrainCircuit,
    title: "AI inside the product, not bolted on",
    summary:
      "Scoring, grading, and content checks run through the same AI layer as the rest of the product — not a chat widget dropped in afterward.",
  },
  {
    icon: Workflow,
    title: "One engine, reused on purpose",
    summary:
      "Roles, assignments, approvals, and status transitions are built once on the platform engine, then configured for the next product instead of rebuilt from scratch.",
  },
  {
    icon: Database,
    title: "Scoring you can audit",
    summary:
      "Every score and status change traces back to a server-side decision, not a client guess — so whoever's reviewing it can always see why a result is what it is.",
  },
  {
    icon: ShieldCheck,
    title: "Built for institutions, not demos",
    summary:
      "Role separation, session handling, and data-export controls are part of the first build, because the people using it are real, not a pitch audience.",
  },
];

// Used on the Company page (mission recap) — same underlying principles as
// platformPillars, framed around how we operate as a company rather than
// what the engine does technically. Keep this distinct in wording.
export const companyPillars = [
  {
    icon: BrainCircuit,
    title: "AI is the default, not an add-on",
    summary:
      "We don't design a product and then look for a place to fit AI in — the intelligent layer is part of the first draft of every system we build.",
  },
  {
    icon: Workflow,
    title: "We build platforms, not projects",
    summary:
      "Every engagement adds to the same underlying engine instead of starting a fresh codebase, so the second product ships faster than the first.",
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
    tagline: "CBSE/ICSE academic delivery for Classes 5–10, built on the same engine.",
    status: "development" as const,
    statusLabel: "In active development",
    eyebrow: "Second product",
    summary:
      "School Enrichment takes the platform MathPath runs on and points it at full academic delivery — a School → Student/Teacher/Admin identity model, a curriculum studio for mapping and approving content, and a five-day guided learning loop with automated marking.",
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
    title: "Build on the shared engine",
    detail:
      "Scoring, roles, and workflow logic are built once on Zetta's platform engine, then configured for the specific process instead of rebuilt from scratch.",
  },
  {
    icon: CheckCircle2,
    title: "Ship it, then extend it",
    detail:
      "The product goes into real use with real users. What we learn feeds back into the engine, so the next product starts further ahead than the last one did.",
  },
];
