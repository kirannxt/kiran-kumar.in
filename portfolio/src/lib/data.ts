// ─── SOURCE OF TRUTH ─────────────────────────────────────────────────────────
// All content is drawn verbatim from the uploaded résumé.
// Nothing is invented. Sections with no résumé data are omitted.

export const PROFILE = {
  name: "Kiran Kumar",
  initials: "KK",
  role: "Software Engineer",
  roleAlt: "Full Stack Developer",
  email: "kiran.nxt19@gmail.com",
  phone: "9738370501",
  phoneHref: "tel:+919738370501",
  location: "India",
  github: "",          // not present in résumé
  linkedin: "",        // not present in résumé
  resumePath: "/resume.pdf",
  resumeSummary:
    "Software Engineer and Full Stack Developer with 8+ years of experience in web application development, with strong hands-on experience across Angular, React, .NET, Node.js, Express.js, Django, REST APIs, GraphQL, SQL Server, MySQL, MongoDB and Firebase. Experienced in UI development, middleware, API integration, authentication and authorization, cloud deployment, debugging, testing and Git-based development. Comfortable collaborating with product teams, analyzing requirements and delivering maintainable web solutions.",
};

export const NAV = [
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Work",         href: "#work" },
  { label: "Experience",   href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact",      href: "#contact" },
];

// ─── SKILLS ──────────────────────────────────────────────────────────────────
export type SkillFamily =
  | "Frontend"
  | "Backend"
  | "Databases"
  | "Cloud"
  | "Tools"
  | "Languages";

export interface Skill {
  symbol: string;   // 2-letter periodic-table symbol
  name: string;
  family: SkillFamily;
  atomicNo: number;
}

export const SKILL_GROUPS: Skill[] = [
  // Frontend
  { symbol: "Ng", name: "Angular",      family: "Frontend",   atomicNo: 1  },
  { symbol: "Re", name: "React",        family: "Frontend",   atomicNo: 2  },
  { symbol: "H5", name: "HTML5",        family: "Frontend",   atomicNo: 3  },
  { symbol: "C3", name: "CSS3",         family: "Frontend",   atomicNo: 4  },
  { symbol: "Sa", name: "SASS",         family: "Frontend",   atomicNo: 5  },
  { symbol: "Bs", name: "Bootstrap",    family: "Frontend",   atomicNo: 6  },
  { symbol: "Mu", name: "Material UI",  family: "Frontend",   atomicNo: 7  },
  { symbol: "Js", name: "JavaScript",   family: "Frontend",   atomicNo: 8  },
  { symbol: "Ts", name: "TypeScript",   family: "Frontend",   atomicNo: 9  },
  { symbol: "Rx", name: "RxJS",         family: "Frontend",   atomicNo: 10 },
  // Backend
  { symbol: "Cs", name: "C# / .NET",   family: "Backend",    atomicNo: 11 },
  { symbol: "Nd", name: "Node.js",      family: "Backend",    atomicNo: 12 },
  { symbol: "Ex", name: "Express.js",   family: "Backend",    atomicNo: 13 },
  { symbol: "Dj", name: "Django",       family: "Backend",    atomicNo: 14 },
  { symbol: "Gq", name: "GraphQL",      family: "Backend",    atomicNo: 15 },
  { symbol: "Ra", name: "REST APIs",    family: "Backend",    atomicNo: 16 },
  // Databases
  { symbol: "Sq", name: "SQL Server",   family: "Databases",  atomicNo: 17 },
  { symbol: "My", name: "MySQL",        family: "Databases",  atomicNo: 18 },
  { symbol: "Mo", name: "MongoDB",      family: "Databases",  atomicNo: 19 },
  { symbol: "Fb", name: "Firebase",     family: "Databases",  atomicNo: 20 },
  // Cloud
  { symbol: "Fw", name: "Firebase Host",family: "Cloud",      atomicNo: 21 },
  { symbol: "Aw", name: "AWS",          family: "Cloud",      atomicNo: 22 },
  { symbol: "Hk", name: "Heroku",       family: "Cloud",      atomicNo: 23 },
  { symbol: "Gd", name: "GoDaddy",      family: "Cloud",      atomicNo: 24 },
  { symbol: "Sm", name: "Somee",        family: "Cloud",      atomicNo: 25 },
  // Tools
  { symbol: "Pm", name: "Postman",      family: "Tools",      atomicNo: 26 },
  { symbol: "Js", name: "JSON Server",  family: "Tools",      atomicNo: 27 },
  { symbol: "Mk", name: "Mock Server",  family: "Tools",      atomicNo: 28 },
  { symbol: "Gt", name: "Git",          family: "Tools",      atomicNo: 29 },
  { symbol: "Vs", name: "VS Code",      family: "Tools",      atomicNo: 30 },
  { symbol: "Pc", name: "PyCharm",      family: "Tools",      atomicNo: 31 },
  // Languages
  { symbol: "Py", name: "Python",       family: "Languages",  atomicNo: 32 },
  { symbol: "Jv", name: "Java",         family: "Languages",  atomicNo: 33 },
  { symbol: "Vb", name: "VB.NET",       family: "Languages",  atomicNo: 34 },
];

export const SKILL_FAMILIES: SkillFamily[] = [
  "Frontend", "Backend", "Databases", "Cloud", "Tools", "Languages",
];

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────
export interface ExperienceItem {
  type: "experience" | "education";
  year: string;
  title: string;
  place: string;
  detail: string;
}

export const TIMELINE: ExperienceItem[] = [
  {
    type: "education",
    year: "College",
    title: "BCA",
    place: "VHE College, Gulbarga",
    detail: "",
  },
  {
    type: "education",
    year: "2018",
    title: "MCA, Computer Science",
    place: "Gulbarga University, Kalaburagi",
    detail: "Graduated 2018",
  },
  {
    type: "experience",
    year: "Jul 2018 – Present",
    title: "Software Engineer",
    place: "MindsNXT TechnoVision Pvt. Ltd.",
    detail:
      "Designed and developed responsive web UIs using Angular and React. Developed middleware and backend services using Node.js and Express.js. Implemented REST API integrations. Worked with GraphQL, Firebase Firestore, SQL Server, MySQL and MongoDB. Deployed across Firebase, AWS, Heroku, GoDaddy and Somee.",
  },
];

// ─── PROJECTS ────────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "lms",
    index: "01",
    title: "Learning Management System",
    kicker: "Education Platform",
    description:
      "A learning management solution for tracking studies and interactions between students and staff within an organisation.",
    features: [
      "Student–staff interaction tracking",
      "UI design and development",
      "Requirement analysis and bug fixing",
      "Product management collaboration",
    ],
    tech: ["Angular", "Mock Server", "JSON Server"],
  },
  {
    id: "qbscare",
    index: "02",
    title: "QBSCare",
    kicker: "Service Tracking Application",
    description:
      "A service-tracking application designed to record customer service usage, staff activity, and service dates and times.",
    features: [
      "Customer service usage recording",
      "Staff activity monitoring",
      "Defect analysis and bug fixing",
      "Feasibility assessment",
    ],
    tech: ["C# / .NET", "Microsoft SQL Server"],
  },
  {
    id: "genesilico",
    index: "03",
    title: "GeneSilico",
    kicker: "AI-First Oncology Platform",
    description:
      "Designed and refined user interfaces for AI-driven oncology workflows, focusing on clarity, usability and information hierarchy across complex clinical data.",
    features: [
      "Casebook, MyCasebook, Digital Twin UIs",
      "Oncology Clinical Control Plane",
      "Responsive UI patterns for patients, clinicians and admins",
      "Reusable UI components and visual consistency",
    ],
    tech: ["Angular", "React", "TypeScript", "REST APIs"],
  },
  {
    id: "podhealth",
    index: "04",
    title: "POD Health",
    kicker: "Healthcare AI Platform",
    description:
      "Development support for a healthcare AI platform connecting clinician, patient/family and precision-prescribing workflows across OpenMind, Piper and NeuroPrecision Dx.",
    features: [
      "Patient records and clinical notes",
      "AI-assisted recommendations",
      "Treatment planning and billing",
      "EHR, laboratory and genomics integrations",
    ],
    tech: ["React", "Node.js", "REST APIs", "Firebase"],
  },
  {
    id: "mavvrik",
    index: "05",
    title: "Mavvrik",
    kicker: "AI & Hybrid Cloud Cost Management",
    description:
      "Software quality validation for a FinOps platform covering cloud, AI/GenAI, SaaS and hybrid infrastructure cost management workflows.",
    features: [
      "Functional, regression and integration testing",
      "Cost visibility, allocation and forecasting dashboards",
      "AI/GenAI cost telemetry validation",
      "API-driven workflow and onboarding testing",
    ],
    tech: ["Postman", "REST APIs", "TypeScript"],
  },
];

// ─── CERTIFICATIONS ───────────────────────────────────────────────────────────
// No certifications are listed in the résumé — section omitted per Rule 1.
export const CERTIFICATIONS: { title: string; issuer: string; url?: string }[] = [];

// ─── ACHIEVEMENTS ─────────────────────────────────────────────────────────────
// No numeric achievements / platform rankings are listed in the résumé.
// Section omitted per Rule 1.
export const ACHIEVEMENTS: {
  platform: string;
  label: string;
  caption: string;
  value: string;
  url?: string;
}[] = [];
