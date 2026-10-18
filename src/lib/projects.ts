export type Accent = "lime" | "cyan";

export type ProjectLink = {
  label: string;
  href: string;
};

export type StackGroup = {
  label: string;
  items: string[];
};

/**
 * An authentic application screenshot. Supplied by the author only — never
 * a mockup or stock image. When absent, the showcase renders the motif alone.
 * `width`/`height` are the intrinsic pixel dimensions so the image can render
 * at its true aspect ratio (no cropping) without layout shift.
 */
export type ProjectScreenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  /** Short technical descriptor shown as a monospace tag. */
  tag: string;
  description: string;
  /** Feature areas, taken only from the supplied descriptions. */
  highlights: string[];
  stacks: StackGroup[];
  links: ProjectLink[];
  accent: Accent;
  /** Decorative motif used by the project visual. */
  motif: "ledger" | "court";
  /** Optional authentic screenshot, rendered above the motif when present. */
  screenshot?: ProjectScreenshot;
};

/*
  All content here is supplied and verified. Do not add metrics, user counts,
  awards, employment history, or deployment health. URLs are used exactly as
  provided by the author.
*/
export const projects: Project[] = [
  {
    slug: "rallyledger",
    name: "RallyLedger",
    tag: "Club management platform",
    description:
      "A tennis club management platform covering participant and session management, product sales, payment allocation, financial reporting, and audited payment corrections.",
    highlights: [
      "Participant management",
      "Session management",
      "Product sales",
      "Payment allocation",
      "Financial reporting",
      "Audited payment corrections",
    ],
    stacks: [
      {
        label: "Frontend",
        items: ["React", "TypeScript", "Vite", "Tailwind CSS"],
      },
      {
        label: "Backend",
        items: ["Go", "PostgreSQL", "Neon", "Goose migrations"],
      },
      { label: "Deployment", items: ["Vercel", "Render"] },
    ],
    links: [
      { label: "Live site", href: "https://rallyledger.vercel.app/" },
      {
        label: "Frontend repo",
        href: "https://github.com/rovinocampoo/rallyledger-web",
      },
    ],
    accent: "lime",
    motif: "ledger",
    screenshot: {
      src: "/images/projects/rally.png",
      alt: "RallyLedger landing page with the headline \u201cRun your club without the spreadsheet chaos.\u201d, an illustrated tennis court graphic, and Player Portal and Admin Login links in the header.",
      width: 2439,
      height: 1288,
    },
  },
  {
    slug: "mmsu-tennis-club",
    name: "MMSU Tennis Club Platform",
    tag: "Club website & platform",
    description:
      "A website and software platform for the MMSU Tennis Club, including club information and training-related workflows.",
    highlights: ["Club information", "Training-related workflows"],
    stacks: [
      {
        label: "Stack",
        items: ["Next.js", "React", "TypeScript", "Go API", "Supabase"],
      },
    ],
    links: [
      { label: "Live site", href: "https://mmsu-tennis-club.vercel.app/" },
      {
        label: "Repository",
        href: "https://github.com/rovinocampoo/mmsu-tennis-club",
      },
    ],
    accent: "cyan",
    motif: "court",
    screenshot: {
      src: "/images/projects/mtc.png",
      alt: "MMSU Tennis Club landing page with an overhead view of the tennis courts behind the headline \u201cYour game. Your community.\u201d and a Training schedule link in the header.",
      width: 2511,
      height: 1222,
    },
  },
];
