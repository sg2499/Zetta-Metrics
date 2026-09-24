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
  Layers,
  Lock,
  MapPin,
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
    "We're an AI-native SaaS company specialising in Ed-Tech platforms and workflow automation: role-based workflows, backend-authoritative logic, and AI built into the product from day one, not bolted on after. The MathPath Platform, built for our client MathPath's abacus program, and School Enrichment are how we bring that to education, and the same approach extends to any institution or business whose manual process is ready to become software.",
  shortPositioning:
    "AI-native Ed-Tech platforms and workflow automation, built for the institutions and businesses that run on them.",
  location: "Kolkata, India — building for clients worldwide",
};

export const founders = [
  {
    name: "Shailesh Gupta",
    role: "Founder & Director",
    bio: "Started out as a Data Scientist at Teleperformance, building attrition and credit-risk models, then spent two years on applied AI and LLM systems during a Master's in Data Science and AI at IIT Roorkee. Leads product and engineering at Zetta Metrics — the one writing the code everything runs on.",
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
    name: "MathPath Platform",
    tagline: "The platform that runs our client MathPath's abacus program.",
    status: "live" as const,
    statusLabel: "Live",
    eyebrow: "Built for MathPath",
    summary:
      "MathPath runs an abacus learning program. Zetta Metrics designed and built the MathPath Platform to automate that program, then took it well beyond what was run by hand: admin, teacher, and student workspaces, structured practice across the program's lessons and levels, server-scored timed assessments, readiness tracking, and progress reports a parent can read at a glance.",
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
          "Structured daily-practice-set delivery across the abacus program's lessons and levels, with randomized options and no answer leakage before submission.",
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
          "FastAPI + Next.js + SQL, deployed and running for real students — not a prototype sitting on a laptop.",
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
    tagline: "CBSE/ICSE academic delivery for Classes 5⁠–⁠10, built the same way we build everything.",
    status: "development" as const,
    statusLabel: "In Development",
    eyebrow: "Academic delivery platform",
    summary:
      "School Enrichment is being built the same way as the MathPath Platform, pointed at full academic delivery — a School → Student/Teacher/Admin identity model, a curriculum studio for mapping and approving content, and a five-day guided learning loop with automated marking.",
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

// The three role-based workspaces inside the MathPath Platform — drives the
// home page product showcase and the "three workspaces" section on its page.
export const mathpathWorkspaces = [
  {
    id: "student",
    label: "Student",
    icon: GraduationCap,
    path: "student",
    title: "A daily workspace students actually open",
    summary:
      "Practice, assessments, mock exams, progress, and achievements in one place — with ranks, XP, and a trophy room that turn daily practice into a habit.",
    points: ["Daily practice sets and timed assessments", "Ranks, XP, and achievements", "Progress a student can see for themselves"],
    screenshot: { src: "/screenshots/mathpath/student-dashboard.png", caption: "Student — Learning Workspace", width: 1920, height: 946 },
  },
  {
    id: "teacher",
    label: "Teacher",
    icon: Users,
    path: "teacher",
    title: "Guidance for every assigned learner",
    summary:
      "Teachers assign practice and assessments, track readiness, and review practice before anything counts — all scoped to their own students.",
    points: ["Assign practice and assessments", "Practice and assessment trackers", "Readiness checks before assessment"],
    screenshot: { src: "/screenshots/mathpath/teacher-dashboard.png", caption: "Teacher — Teaching Workspace", width: 1920, height: 869 },
  },
  {
    id: "admin",
    label: "Admin",
    icon: LayoutDashboard,
    path: "admin",
    title: "One control centre for everything",
    summary:
      "Admins govern the learning path, users, assessment readiness, and performance reporting — with a live view of who's active right now.",
    points: ["Learning path and user management", "Assessment studio and control", "Performance reports and live activity"],
    screenshot: { src: "/screenshots/mathpath/admin-dashboard.png", caption: "Admin — Control Centre", width: 1920, height: 869 },
  },
];

// Home page stat cards — facts about Zetta Metrics as a company, never
// about one product (product facts live on each product's own page).
export const companyStats = [
  { icon: MapPin, value: "2026", label: "Founded in Kolkata, India", animate: false },
  { icon: Layers, value: "2", label: "Platforms built on one foundation", animate: true },
  { icon: GraduationCap, value: "Ed-Tech", label: "Our core specialisation, with AI in every product", animate: false },
  { icon: ShieldCheck, value: "100%", label: "Backend-authoritative, auditable logic", animate: true },
];

// Product-specific facts, shown only on that product's page.
export const productFacts: Record<string, { value: string; label: string }[]> = {
  mathpath: [
    { value: "3", label: "Role-based workspaces: Admin, Teacher, and Student" },
    { value: "100%", label: "Scoring and timing enforced server-side" },
    { value: "0", label: "Answer keys ever sent to the browser" },
  ],
  "school-enrichment": [
    { value: "5-day", label: "Guided learning loop with auto-marking" },
    { value: "4", label: "Role levels, from Super Admin to Student" },
    { value: "2", label: "Automated content checks before anything is published" },
  ],
};

// Capability strip on the home page — real features across both products.
export const capabilities = [
  { icon: Users, label: "Role-based access" },
  { icon: Timer, label: "Server-timed assessments" },
  { icon: ClipboardCheck, label: "Auto-marking" },
  { icon: Boxes, label: "Curriculum Studio" },
  { icon: FileSpreadsheet, label: "Excel content import" },
  { icon: GaugeCircle, label: "Readiness governance" },
  { icon: Sparkles, label: "Foundation Repair path" },
  { icon: Database, label: "Auditable decisions" },
  { icon: Lock, label: "Session hygiene" },
  { icon: Building2, label: "Multi-school identity" },
  { icon: LayoutDashboard, label: "Parent-ready reports" },
  { icon: ShieldCheck, label: "Data-export & privacy controls" },
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

// "What we automate" on the home page — the kinds of manual work Zetta turns
// into software, each shown as a plain before/after. Framed as capabilities
// (all proven inside our own platforms), not as claimed clients.
export const automationAreas = [
  {
    icon: ClipboardCheck,
    title: "Assessments & scoring",
    before: "Paper tests, hand marking, and marks typed into spreadsheets.",
    after: "Timed online assessments, auto-marked and scored on the server.",
  },
  {
    icon: Workflow,
    title: "Approvals & sign-offs",
    before: "Email threads and the constant question of who approved what.",
    after: "Role-based approval steps with every decision on record.",
  },
  {
    icon: FileSpreadsheet,
    title: "Content pipelines",
    before: "Copy-pasting between files and checking everything by eye.",
    after: "Excel import with automated structural and quality checks.",
  },
  {
    icon: Users,
    title: "Assignments & follow-ups",
    before: "Chasing people on chat for status updates and submissions.",
    after: "Assignments with tracked attempts and automatic status.",
  },
  {
    icon: GaugeCircle,
    title: "Reporting & readiness",
    before: "Someone compiles the same report by hand every week.",
    after: "Live reports anyone authorized can read at a glance.",
  },
  {
    icon: Lock,
    title: "Access & data control",
    before: "Shared logins and spreadsheets anyone can open or forward.",
    after: "Role-scoped access, session hygiene, and export controls.",
  },
];
