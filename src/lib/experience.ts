export type Experience = {
  role: string;
  org: string;
  period: string;
  current?: boolean;
  summary: string;
  points: string[];
};

/*
  Roles and dates supplied by the author. Summaries restate the stated
  responsibilities only — no metrics, outcomes, or achievements are invented.
  Ordered as supplied: software/developer roles first, business operations last.
*/
export const experience: Experience[] = [
  {
    role: "Junior Software Developer",
    org: "STH IT Solutions",
    period: "Nov 2017 – Nov 2018",
    summary: "Software and database development within an IT solutions team.",
    points: [
      "Developed and maintained application features",
      "Worked on database development and data handling",
    ],
  },
  {
    role: "Software Engineer – Developer Support",
    org: "Accenture",
    period: "Mar 2019 – Nov 2022",
    summary:
      "Developer support for integrations across mobile and IoT platforms, focused on troubleshooting and reliability.",
    points: [
      "Supported mobile and IoT developer integrations",
      "Troubleshot APIs and diagnosed integration issues",
      "Handled technical escalations",
      "Built workflow automation for routine processes",
      "Delivered training and performed quality analysis",
    ],
  },
  {
    role: "API Support L3",
    org: "SupportNinja",
    period: "Aug – Oct 2023",
    summary: "Advanced API support, resolving escalated technical issues.",
    points: [
      "Advanced API troubleshooting",
      "Owning technical escalations through to resolution",
    ],
  },
  {
    role: "Owner / Operations & Administrative Manager",
    org: "Nomad Coffee Ilocos",
    period: "2020 – Present",
    current: true,
    summary:
      "Owner-operator of a coffee business, running operations and administration.",
    points: [
      "Business operations and administration",
      "Workflow automation for day-to-day processes",
      "Staff training and coordination",
    ],
  },
];

export type CredentialKind = "education" | "certification" | "bootcamp";

export type Credential = {
  title: string;
  issuer: string;
  period?: string;
  kind: CredentialKind;
};

export const credentialKindLabel: Record<CredentialKind, string> = {
  education: "Degree",
  certification: "Certification",
  bootcamp: "Bootcamp",
};

export const credentials: Credential[] = [
  {
    kind: "education",
    title: "B.S. Computer Science",
    issuer: "Mariano Marcos State University",
    period: "2013 – 2017",
  },
  {
    kind: "certification",
    title: "Associate Cloud Engineer",
    issuer: "Google Cloud",
    period: "Issued Oct 2022",
  },
  {
    kind: "certification",
    title: "Cyberthreat Intelligence Analyst Level III",
    issuer: "AMA Education System",
    period: "Issued Jul 2026",
  },
  {
    kind: "bootcamp",
    title: "Java / Spring Boot Development",
    issuer: "Development bootcamp",
  },
];

export type ToolkitGroup = {
  group: string;
  items: string[];
};

/* Grouped by purpose. Only technologies supported by the projects or résumé. */
export const toolkit: ToolkitGroup[] = [
  {
    group: "Backend",
    items: ["Go", "REST APIs", "Java", "SQL"],
  },
  {
    group: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Vite", "Tailwind CSS"],
  },
  {
    group: "Data & deployment",
    items: [
      "PostgreSQL",
      "Neon",
      "Supabase",
      "Render",
      "Vercel",
      "Google Cloud",
    ],
  },
  {
    group: "Tools",
    items: ["Git / GitHub", "Postman"],
  },
];
