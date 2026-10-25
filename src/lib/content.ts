import {
  Activity,
  Award,
  Banknote,
  Boxes,
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
    "Zetta Metrics builds Ed-Tech platforms and workflow software for institutions that still run on spreadsheets, paper and follow-ups. Every system we ship gives each role its own workspace, decides its rules on the server, and keeps a record of every decision. The MathPath Platform runs a live abacus program end to end. Krama, our platform for CBSE and ICSE schools, is next.",
  shortPositioning:
    "Ed-Tech platforms and workflow software for institutions ready to stop running on spreadsheets.",
  location: "Kolkata, India. Building for clients anywhere.",
  // As registered with the Ministry of Corporate Affairs (ROC Kolkata II).
  cin: "U62011WR2026PTC295956",
  incorporated: "10 August 2026",
  registeredOffice: [
    "Laxmi Apartment, Flat No. A, 1st Floor",
    "Atghara Chekpost, Rajarhat Gopalpur",
    "North 24 Parganas, Rajarhat",
    "West Bengal 700136, India",
  ],
};

export const founders = [
  {
    name: "Shailesh Gupta",
    role: "Founder & Director",
    bio: "Began as a Data Scientist at Teleperformance, building attrition and credit-risk models, then spent two years on applied AI and LLM systems during a Master's in Data Science and AI at IIT Roorkee. Leads product and engineering, and writes the code the platforms run on.",
    image: "/founder-shailesh.jpg",
    linkedin: "https://www.linkedin.com/in/shailesh-gupta-7b7278188",
    github: "https://github.com/sg2499",
  },
  {
    name: "Ashalatha Gupta",
    role: "Founder & Director",
    bio: "Runs operations and the business side of Zetta Metrics, so product and engineering stay focused on what ships next.",
    image: null,
  },
];

// Home page, "The platform". Order matches PillarVisual:
// 0 server rules, 1 shared blocks, 2 audit trail, 3 role matrix.
export const platformPillars = [
  {
    icon: Database,
    title: "The rules live on the server",
    summary:
      "Scores, timers, approvals and promotions are decided on the server and nowhere else. People see the outcome. Nobody can edit the rule.",
  },
  {
    icon: Workflow,
    title: "Built once, reused on purpose",
    summary:
      "Roles, assignments, approvals, scoring and reports are engineered as building blocks, so each new product starts where the last one finished.",
  },
  {
    icon: ScrollText,
    title: "Every decision on record",
    summary:
      "Who changed what, when and why is logged the moment it happens. Nothing depends on someone remembering.",
  },
  {
    icon: ShieldCheck,
    title: "Every role, its own workspace",
    summary:
      "Admins, teachers and students each work in a space built for their job, and see exactly what that job needs. Nothing more.",
  },
];

// Company page, "How we operate". How we work as a company, worded
// differently from platformPillars on purpose.
export const companyPillars = [
  {
    icon: Network,
    title: "Start from the process, not the software",
    summary:
      "We map how the work runs today, every role and every hand-off, before we design a single screen.",
  },
  {
    icon: Workflow,
    title: "Build once, reuse on purpose",
    summary:
      "What we engineer for one client becomes a building block for the next, so every product starts further ahead.",
  },
  {
    icon: Database,
    title: "If it decides, it explains",
    summary:
      "Anything that scores, grades or approves leaves a trail a person can follow. We don't ship logic nobody can account for.",
  },
  {
    icon: ShieldCheck,
    title: "Built for daily use, not a demo",
    summary:
      "A teacher between classes, a student on a phone, an admin closing the day. We design for them, and security ships in version one.",
  },
];

export const products = [
  {
    slug: "mathpath",
    name: "MathPath Platform",
    tagline: "One platform for MathPath's entire abacus program: practice, assessments, competitions and fees.",
    status: "live" as const,
    statusLabel: "Live",
    eyebrow: "Built for MathPath",
    summary:
      "MathPath teaches abacus and mental maths across five modules, from Young Learners to the Master Module. The MathPath Platform runs all of it: daily practice sheets from MathPath's own curriculum, readiness checks and level assessments, competition mock exams, the Annual Competition itself, and the fee desk behind the centres. Ranks, MathCoins and a reward store keep students practising every day.",
    icon: LayoutDashboard,
    // The road to MathPath's Annual Competition: practice, then the event itself.
    competitionPath: [
      {
        icon: Target,
        title: "Competition mock exams",
        detail:
          "The real event's format, section for section: the same timers and the same instructions. Every attempt draws a fresh paper, and no sum repeats within a mock.",
      },
      {
        icon: ClipboardCheck,
        title: "Annual Competition practice papers",
        detail:
          "Level-wise papers assigned in bulk, a practice leaderboard, and reports that show each student exactly which section to work on.",
      },
      {
        icon: Trophy,
        title: "The Annual Competition",
        detail:
          "Every student is placed at the right level automatically, sits the same paper as everyone at that level, and is ranked fairly when results are released.",
      },
    ],
    highlights: [
      {
        icon: Layers,
        title: "Learning Path Studio",
        detail:
          "All five modules, from Young Learners to Master, with their levels, lessons and daily practice sheets. Every sheet is reviewed and published before a teacher can assign it.",
      },
      {
        icon: Target,
        title: "Competition-format mock exams",
        detail:
          "Section by section, timer by timer, the real event. A fresh paper on every attempt, and marks that always total 100.",
      },
      {
        icon: Trophy,
        title: "The Annual Competition, end to end",
        detail:
          "Automatic level placement, one paper per level, one attempt per student. Section timers pause on a genuine disconnect and resume to the second.",
      },
      {
        icon: Medal,
        title: "Fair ranking, sealed results",
        detail:
          "Ranked by accuracy, then time. Ties go to whoever made their first mistake later. Results stay sealed until the announcement, then certificates download from each student's portal.",
      },
      {
        icon: GaugeCircle,
        title: "Readiness before every level",
        detail:
          "Teachers see how much of a level's practice each student has cleared before assigning its assessment. Server-scored results drive promotions, and re-attempts go through an approval queue.",
      },
      {
        icon: Sparkles,
        title: "A rank ladder worth climbing",
        detail:
          "Thirty-four divisions from Copper to Champion, each with a forged 3D medallion and a cinematic rank-up. Add XP, badges, podium leaderboards and a trophy room.",
      },
      {
        icon: Gift,
        title: "A reward store for MathCoins",
        detail:
          "Every sheet, mock and assessment earns MathCoins. Students set a reward as their goal, unlock it, and collect it at their centre.",
      },
      {
        icon: Banknote,
        title: "The fee desk, built in",
        detail:
          "Fee setup, monthly billing, invoices and receipts, counter and online payments, advances, follow-ups, expenses, and a cash count to close each day.",
      },
      {
        icon: FileSpreadsheet,
        title: "Performance Reports",
        detail:
          "Any 7, 30 or 90 days against the period before: active students, sheets cleared, first-try clear rate, accuracy, practice time and promotions, week by week.",
      },
      {
        icon: ListChecks,
        title: "A teacher's day, already sorted",
        detail:
          "The dashboard opens on what needs doing: who needs their next lesson, whose sheets are waiting, which re-attempts are due, whose birthday is this week.",
      },
      {
        icon: Lock,
        title: "Nothing to tamper with",
        detail:
          "Answer keys and timers never leave the server, and every score is calculated there. Admins sign in with two-factor verification, and idle sessions end on their own.",
      },
      {
        icon: Activity,
        title: "Live competition monitoring",
        detail:
          "During the Annual Competition, admins watch every level in real time: each student's progress, finished sections and timer status, as it happens.",
      },
    ],
    screenshots: [
      { src: "/screenshots/mathpath/student-dashboard.webp", caption: "Student · Learning Workspace" },
      { src: "/screenshots/mathpath/teacher-dashboard.webp", caption: "Teacher · Teaching Workspace" },
      { src: "/screenshots/mathpath/admin-dashboard.webp", caption: "Admin · Control Centre" },
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
      "Krama is the learning platform we are building for CBSE and ICSE schools, Classes 5–10. Every chapter runs on a five-day loop of learn, practise, apply, fix and master, with practice set by the teacher and marked the moment it is submitted. The foundation already works end to end: school-by-school accounts, a Curriculum Studio holding all 15 Class 5 CBSE Maths chapters, marking that understands units, and each school's own assessment scheme and report cards.",
    icon: GraduationCap,
    highlights: [
      {
        icon: Building2,
        title: "School-first from the ground up",
        detail:
          "Each school gets its own Admin, Teacher and Student roles, with a Super Admin above them. Every role has its own sign-in and its own workspace.",
      },
      {
        icon: Boxes,
        title: "A Curriculum Studio, already stocked",
        detail:
          "Board, class, subject, chapter and concept lessons move through draft, review and publish. All 15 Class 5 CBSE Maths chapters are live, behind automated quality checks.",
      },
      {
        icon: Sparkles,
        title: "The five-day chapter loop",
        detail:
          "Teachers assign practice to chosen students in a section. Students work through Today's Practice. Results land the moment they submit, with per-question review for the teacher.",
      },
      {
        icon: ClipboardCheck,
        title: "Marking that understands answers",
        detail:
          "Numbers, words and ordering are marked automatically. Units, currency and signs are understood, tolerance and rounding respected, and multi-part answers get a box for each part.",
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
          "A versioned scheme per class, subject and year, built from weighted components: marks the teacher enters, or the platform's own practice. Grades included, with a worked example.",
      },
      {
        icon: ScrollText,
        title: "Report cards the school issues",
        detail:
          "Co-scholastic areas, attendance, grades and remarks for every student, rolled into Term 1 and Year-End cards from the school's published scheme.",
      },
      {
        icon: Lock,
        title: "Secure from the first sign-in",
        detail:
          "Administrators use two-factor verification, every first password must be replaced, and each sign-in page accepts only its own role's accounts.",
      },
    ],
    screenshots: [],
    href: "/products/krama",
  },
];

export interface WorkspaceScreen {
  src: string;
  caption: string;
  route: string;
  width: number;
  height: number;
}

const shot = (file: string, caption: string, route: string, width: number, height: number): WorkspaceScreen => ({
  src: `/screenshots/mathpath/${file}.webp`,
  caption,
  route,
  width,
  height,
});

// The three role-based workspaces inside the MathPath Platform, each with the
// real screens captured from the platform (fee figures masked).
export const mathpathWorkspaces = [
  {
    id: "student",
    label: "Student",
    icon: GraduationCap,
    title: "A workspace students open every day",
    summary:
      "Assigned sheets, assessments, mock exams and progress in one place, wrapped in ranks, XP and MathCoins that turn daily practice into a habit.",
    points: ["Assigned practice with timers and instant results", "Mock exams, podium leaderboards and a trophy room", "A reward store for the MathCoins they earn"],
    screens: [
      shot("student-dashboard", "Learning Workspace", "Dashboard", 1920, 967),
      shot("student-practice", "Assigned Practice", "Practice", 1920, 1200),
      shot("student-rewards", "Reward Store", "Rewards", 1920, 1200),
      shot("student-leaderboard", "Mock Exam Leaderboard", "Leaderboard", 1892, 1150),
    ],
  },
  {
    id: "teacher",
    label: "Teacher",
    icon: Users,
    title: "Every student's next step, at a glance",
    summary:
      "Teachers see who needs their next lesson, whose sheets are waiting and which re-attempts are due, then assign, review and follow up from the same workspace.",
    points: ["Assign practice and assessments lesson by lesson", "A Practice Tracker with accuracy zones and a priority queue", "Readiness checks before every level assessment"],
    screens: [
      shot("teacher-dashboard", "Teaching Workspace", "Dashboard", 1920, 1180),
      shot("teacher-practice", "Practice Tracker", "Practice", 1920, 1200),
      shot("teacher-students", "My Students", "Students", 1920, 1120),
    ],
  },
  {
    id: "admin",
    label: "Admin",
    icon: LayoutDashboard,
    title: "The whole program, from one control centre",
    summary:
      "Curriculum, people, assessments, competitions, fees and reports. Today's approvals and dues sit on the first screen, beside a live view of who is online.",
    points: ["Learning Path Studio across all five modules", "Payments: billing, collections and day close", "Performance Reports over any 7, 30 or 90 days"],
    screens: [
      shot("admin-dashboard", "Control Centre", "Dashboard", 1920, 1090),
      shot("admin-payments", "Payments", "Payments", 1920, 1165),
      shot("admin-reports", "Performance Reports", "Reports", 1920, 1000),
      shot("admin-curriculum", "Learning Path Studio", "Learning Path", 1920, 1120),
    ],
  },
];

// Every MathPath screen in one ordered list, for full-size viewing.
export const mathpathScreens = mathpathWorkspaces.flatMap((w) =>
  w.screens.map((s) => ({ ...s, caption: `${w.label} · ${s.caption}` })),
);

// Home page stat cards: concrete facts, each one checkable.
export const companyStats = [
  { icon: MapPin, value: "2026", label: "Incorporated in Kolkata, India", animate: false },
  { icon: Layers, value: "2", label: "Platforms on one shared foundation", animate: true },
  { icon: GraduationCap, value: "5", label: "Abacus modules running live on MathPath", animate: true },
  { icon: Boxes, value: "15", label: "Class 5 CBSE Maths chapters live in Krama", animate: true },
];

// Product-specific facts, shown only on that product's page.
export const productFacts: Record<string, { value: string; label: string }[]> = {
  mathpath: [
    { value: "5", label: "Curriculum modules, from Young Learners to Master" },
    { value: "34", label: "Rank divisions, from Copper to Champion" },
    { value: "3", label: "Role workspaces: Admin, Teacher and Student" },
  ],
  krama: [
    { value: "15", label: "Class 5 CBSE Maths chapters, live in the Curriculum Studio" },
    { value: "5-day", label: "Chapter loop: learn, practise, apply, fix, master" },
    { value: "4", label: "Role levels, from Super Admin to Student" },
  ],
};

// Capability strip: real features across both products.
export const capabilities = [
  { icon: Users, label: "Role-based workspaces" },
  { icon: Timer, label: "Server-timed assessments" },
  { icon: ClipboardCheck, label: "Automatic marking" },
  { icon: Boxes, label: "Curriculum studios" },
  { icon: FileSpreadsheet, label: "Spreadsheet content import" },
  { icon: GaugeCircle, label: "Readiness checks" },
  { icon: PenLine, label: "Part and method marks" },
  { icon: Banknote, label: "Fees and payments" },
  { icon: Receipt, label: "Invoices and receipts" },
  { icon: Gift, label: "Ranks and rewards" },
  { icon: ScrollText, label: "Report cards" },
  { icon: Database, label: "Audit trails" },
  { icon: Lock, label: "Two-factor sign-in" },
  { icon: Building2, label: "Multi-school accounts" },
  { icon: LayoutDashboard, label: "Performance reports" },
  { icon: ShieldCheck, label: "Privacy and export controls" },
];

export const processSteps = [
  {
    icon: Network,
    title: "Map the real process",
    detail:
      "We sit with the people doing the work and map it as it actually runs: every role, every hand-off, every spreadsheet. Then we design.",
  },
  {
    icon: Workflow,
    title: "Engineer it to last",
    detail:
      "Roles, rules and records are built as reusable pieces from day one, with security in the first release, not a later one.",
  },
  {
    icon: CheckCircle2,
    title: "Ship it, then keep extending",
    detail:
      "The product goes live with real users. What we learn shapes the next release, and every new build starts further ahead.",
  },
];

// "What we automate" on the home page: manual work we turn into software,
// shown as a plain before and after. Each one is proven in our own platforms.
export const automationAreas = [
  {
    icon: ClipboardCheck,
    title: "Assessments and scoring",
    before: "Paper tests, marking by hand, and marks typed into a spreadsheet.",
    after: "Timed online assessments, marked automatically and scored on the server.",
  },
  {
    icon: Workflow,
    title: "Approvals and sign-offs",
    before: "Email threads, and no clear answer to who approved what.",
    after: "Approval steps by role, with every decision on record.",
  },
  {
    icon: FileSpreadsheet,
    title: "Content pipelines",
    before: "Copying between files and checking everything by eye.",
    after: "Bulk import with automatic structure and quality checks before anything goes live.",
  },
  {
    icon: Users,
    title: "Assignments and follow-ups",
    before: "Chasing people on chat for status and submissions.",
    after: "Assignments that track every attempt and surface who needs a nudge.",
  },
  {
    icon: GaugeCircle,
    title: "Reporting",
    before: "Someone rebuilds the same report by hand every week.",
    after: "Live reports, compared period on period, for anyone allowed to see them.",
  },
  {
    icon: Banknote,
    title: "Fees and payments",
    before: "Cash in a drawer, paper receipts, and a notebook of who still owes.",
    after: "Invoices, receipts, online payments and follow-ups, with the day closed out properly.",
  },
  {
    icon: Lock,
    title: "Access and data",
    before: "Shared logins and spreadsheets anyone can open or forward.",
    after: "Access by role, sessions that expire, and controlled exports.",
  },
];
