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
    "We build one platform engine — role-based workflows, backend-authoritative scoring, and AI woven into the product logic — and apply it to real institutions, one product at a time.",
  shortPositioning:
    "One platform engine. Every product we ship extends it.",
  location: "Kolkata & Pune, India — building for clients worldwide",
};

export const founders = [
  {
    name: "Shailesh Gupta",
    role: "Founder & Director",
    bio: "Started out building attrition and credit-risk models at Teleperformance, then spent two years on applied AI and LLM systems during an MDSAI at IIT Roorkee. Leads product and engineering at Zetta Metrics — the one writing the code the platform runs on.",
    linkedin: "https://www.linkedin.com/in/shailesh-gupta-7b7278188",
    github: "https://github.com/sg2499",
  },
  {
    name: "Ashalatha Gupta",
    role: "Founder & Director",
    bio: "Co-founder and Director, running the operating and business side of Zetta Metrics so product and engineering can stay focused on what ships.",
  },
];

export const proofPoints = [
  { value: "2", label: "Products, one shared engine" },
  { value: "3", label: "Roles orchestrated per product — admin, teacher, student" },
  { value: "2026", label: "Incorporated in Kolkata, India" },
  { value: "5–10", label: "Classes served by School Enrichment" },
];

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
      "Roles, assignments, approvals, and status transitions were built once for MathPath. School Enrichment runs on the same engine instead of a second one.",
  },
  {
    icon: Database,
    title: "Scoring you can audit",
    summary:
      "Every score and status change traces back to a server-side decision, not a client guess — so a teacher or admin can always see why a result is what it is.",
  },
  {
    icon: ShieldCheck,
    title: "Built for schools, not demos",
    summary:
      "Role separation, session handling, and data-export controls were part of the first build, because the users are real students and teachers, not a pitch audience.",
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
    repo: null,
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
