import {
  Activity,
  Award,
  Banknote,
  Boxes,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileSpreadsheet,
  GaugeCircle,
  GraduationCap,
  LayoutDashboard,
  Layers,
  ListChecks,
  Lock,
  MapPin,
  Medal,
  Network,
  Receipt,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  Trophy,
  Gift,
  PenLine,
  Users,
  Workflow,
} from "lucide-react";

export const brand = {
  name: "Zetta Metrics",
  legalName: "Zetta Metrics Technologies Private Limited",
  email: "shaileshgupta@zetta-metrics.com",
  phones: ["7980919518", "9831684229"],
  github: "https://github.com/sg2499",
  linkedin: "https://www.linkedin.com/company/zetta-metrics/",
  positioning:
    "We're an AI-native SaaS company specialising in Ed-Tech platforms and workflow automation: role-based workflows, backend-authoritative logic, and AI built into the product from day one, not bolted on after. The MathPath Platform, built for our client MathPath's abacus program, and Krama, our CBSE and ICSE learning platform for Classes 5–10, are how we bring that to education, and the same approach extends to any institution or business whose manual process is ready to become software.",
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
    tagline: "The platform that runs our client MathPath's abacus program, from daily practice to its Annual Competition and the fees behind it.",
    status: "live" as const,
    statusLabel: "Live",
    eyebrow: "Built for MathPath",
    summary:
      "MathPath runs an abacus and mental-math program whose high point is its Annual Competition, a premier once-a-year event where hundreds of students compete. Zetta Metrics built the MathPath Platform to run the whole journey: daily practice generated from MathPath's own curriculum, readiness-checked assessments and level promotions, competition-format mock exams, the Annual Competition itself, and the business side too, from fee collection to parent reports, with a rank-and-rewards system that keeps students practising every day.",
    icon: LayoutDashboard,
    // The road to MathPath's Annual Competition: practice, then the event itself.
    competitionPath: [
      {
        icon: Target,
        title: "Competition mock exams",
        detail:
          "Unlimited mock exams in the exact format of the real event: the same sections, per-section timers, and instructions, with a fresh randomised paper on every attempt, so students keep beating their own best score.",
      },
      {
        icon: ClipboardCheck,
        title: "Annual Competition practice papers",
        detail:
          "Level-wise practice papers for the event, assigned in bulk by admins and teachers, with a practice leaderboard and reports that show each student's toughest section.",
      },
      {
        icon: Trophy,
        title: "The Annual Competition",
        detail:
          "MathPath's premier event runs on the platform: every student is placed at the right competition level automatically, sits the same paper as everyone at that level, and is ranked fairly once results are released.",
      },
    ],
    highlights: [
      {
        icon: Layers,
        title: "Curriculum-faithful practice engine",
        detail:
          "Daily practice sets generated from MathPath's own curriculum workbooks across five modules, from Young Learners to the Master Module, with abacus and visual methods kept exactly as they are taught.",
      },
      {
        icon: Target,
        title: "Competition-format mock exams",
        detail:
          "Mocks that mirror the real event section by section, with independent section timers, a fresh randomised paper on every attempt, and marks that always add up to 100.",
      },
      {
        icon: Trophy,
        title: "Annual Competition, end to end",
        detail:
          "Automatic level placement, one identical paper per level, section timers that pause on a genuine disconnect and resume to the second, and one attempt per student.",
      },
      {
        icon: Medal,
        title: "Fair ranking, sealed results, certificates",
        detail:
          "Ranked by accuracy, then completion time, with ties going to whoever made their first mistake later. Results stay sealed until the announcement, then certificates download from each student's portal.",
      },
      {
        icon: GaugeCircle,
        title: "Assessments, readiness, and promotions",
        detail:
          "Teachers check readiness before a level assessment; timed, server-scored assessments then drive level promotions, with a full history and an approval queue for re-attempts.",
      },
      {
        icon: Sparkles,
        title: "A rank ladder students want to climb",
        detail:
          "Ranks from Copper to Champion across a 34-division roadmap, with forged 3D medallions, a cut scene with its own soundtrack on every rank-up, XP, badges, practice heatmaps, and podium leaderboards.",
      },
      {
        icon: Gift,
        title: "Rewards worth practising for",
        detail:
          "A reward store where students spend the MathCoins they earn on real rewards, priced to climb gradually so there is always the next one to work toward.",
      },
      {
        icon: Banknote,
        title: "Fees and payments, handled",
        detail:
          "Fee setup, invoices, receipts and monthly billing, counter and online payments, parent pay links, follow-ups and promises to pay, and a cash count to close each day.",
      },
      {
        icon: FileSpreadsheet,
        title: "Performance and parent reports",
        detail:
          "One set of numbers across an overview, a drill-down, and a student summary for admins and teachers, plus progress reports teachers deliver to parents.",
      },
      {
        icon: ListChecks,
        title: "A teacher's day, made lighter",
        detail:
          "Assign Practice shows each student's status for every lesson and says plainly why one can't be taken yet. Review opens the exact sheet, and birthdays surface so no student is missed.",
      },
      {
        icon: Lock,
        title: "Server-authoritative by design",
        detail:
          "Answer keys and timers never leave the server and every score is calculated there. Admins sign in with two-factor verification, and idle sessions end on their own.",
      },
      {
        icon: Activity,
        title: "Live competition monitoring",
        detail:
          "Admins watch the Annual Competition unfold in real time — per-student progress, section completion, and timer status across every level, as it happens.",
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
    slug: "krama",
    name: "Krama",
    tagline: "CBSE and ICSE learning for Classes 5–10, practised until it sticks.",
    status: "development" as const,
    statusLabel: "In Development",
    eyebrow: "School learning platform",
    summary:
      "Krama is the school learning platform Zetta Metrics is building for CBSE and ICSE, Classes 5–10. Every chapter runs on a five-day loop of learn, practise, apply, fix and master, with practice set by the teacher and marked the moment it is submitted. The foundations are already built and working end to end: school-by-school accounts, a Curriculum Studio holding all 15 Class 5 CBSE Maths chapters, marking that understands units, and the school's own assessment scheme and report cards.",
    icon: GraduationCap,
    highlights: [
      {
        icon: Building2,
        title: "School-first from the ground up",
        detail:
          "Every school gets its own structure of Admin, Teacher and Student, with a Super Admin above them. Each role has its own sign-in and its own workspace.",
      },
      {
        icon: Boxes,
        title: "A Curriculum Studio, already stocked",
        detail:
          "Board, class, subject, chapter and concept lessons move through draft, review and publish. All 15 Class 5 CBSE Maths chapters are in and live, behind automated quality checks.",
      },
      {
        icon: Sparkles,
        title: "The five-day chapter loop",
        detail:
          "Teachers assign practice to chosen students of a section; students work through Today's Practice; results arrive the moment they submit, with per-question review for the teacher.",
      },
      {
        icon: ClipboardCheck,
        title: "Marking that understands answers",
        detail:
          "Numbers, words and ordering are all marked automatically. Units, currency and signs are understood, tolerance and rounding are respected, and multi-part answers get a box for each part.",
      },
      {
        icon: PenLine,
        title: "Part and method marks",
        detail:
          "On questions worth two marks or more, students show their working. Teachers review the automatic marks and award part marks with a reason the student can read.",
      },
      {
        icon: Award,
        title: "Each school's own assessment scheme",
        detail:
          "School years and a versioned scheme per class, subject and year, built from weighted components, either marks entered by the teacher or the platform's own practice, with grades and a worked example.",
      },
      {
        icon: ScrollText,
        title: "Report cards the school issues",
        detail:
          "Co-scholastic areas, attendance, grades and remarks per student per term, rolled into Term 1 and Year-End cards from the school's published scheme.",
      },
      {
        icon: Lock,
        title: "Secure from the first sign-in",
        detail:
          "Administrators sign in with two-factor verification, every first password must be replaced, and each sign-in tab accepts only its own role's accounts.",
      },
    ],
    screenshots: [],
    href: "/products/krama",
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
      "Daily practice, assessments, competition mock exams and practice papers, progress, and achievements in one place, with ranks, XP, and a trophy room that turn daily practice into a habit.",
    points: ["Daily practice sets and timed assessments", "Competition mocks and practice papers", "Ranks, XP, and achievements"],
    screenshot: { src: "/screenshots/mathpath/student-dashboard.png", caption: "Student — Learning Workspace", width: 1920, height: 946 },
  },
  {
    id: "teacher",
    label: "Teacher",
    icon: Users,
    path: "teacher",
    title: "Guidance for every assigned learner",
    summary:
      "Teachers assign practice, assessments, and competition practice papers, check readiness, and follow every assigned student's progress, all scoped to their own students.",
    points: ["Assign practice, assessments, and competition papers", "Readiness checks before assessment", "Competition progress and parent reports"],
    screenshot: { src: "/screenshots/mathpath/teacher-dashboard.png", caption: "Teacher — Teaching Workspace", width: 1920, height: 869 },
  },
  {
    id: "admin",
    label: "Admin",
    icon: LayoutDashboard,
    path: "admin",
    title: "One control centre for everything",
    summary:
      "Admins govern the learning path, users, assessments, and the Annual Competition, from the mock and event studios to live monitoring and performance reports.",
    points: ["Learning path and user management", "Mock Studio and Annual Competition Studio", "Live monitoring and performance reports"],
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
    { value: "5", label: "Abacus curriculum modules, from Young Learners to the Master Module" },
    { value: "34", label: "Rank divisions, from Copper to Champion, each with its own rank-up scene" },
    { value: "3", label: "Role-based workspaces: Admin, Teacher, and Student" },
  ],
  krama: [
    { value: "15", label: "Class 5 CBSE Maths chapters, live in the Curriculum Studio" },
    { value: "5-day", label: "Chapter loop: learn, practise, apply, fix and master" },
    { value: "4", label: "Role levels, from Super Admin to Student" },
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
  { icon: PenLine, label: "Part & method marks" },
  { icon: Banknote, label: "Fees & payments" },
  { icon: Receipt, label: "Invoices & receipts" },
  { icon: Gift, label: "Rewards & ranks" },
  { icon: ScrollText, label: "Report cards" },
  { icon: Database, label: "Auditable decisions" },
  { icon: Lock, label: "Two-factor sign-in" },
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
    icon: Banknote,
    title: "Fees & payments",
    before: "Cash in a drawer, paper receipts, and a notebook of who still owes.",
    after: "Invoices, receipts, online payments and automatic follow-ups, closed out daily.",
  },
  {
    icon: Lock,
    title: "Access & data control",
    before: "Shared logins and spreadsheets anyone can open or forward.",
    after: "Role-scoped access, session hygiene, and export controls.",
  },
];
