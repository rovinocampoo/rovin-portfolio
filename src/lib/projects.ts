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
 * a mockup or stock image. When absent, the showcase renders without one.
 * `width`/`height` are the intrinsic pixel dimensions so the image can render
 * at its true aspect ratio (no cropping) without layout shift.
 */
export type ProjectScreenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** One layer of a project's runtime architecture, in request order. */
export type SystemLayer = {
  /** Short architectural role, e.g. "Client", "API", "Data". */
  role: string;
  /** The concrete technology at this layer. */
  title: string;
  /** Supporting detail: libraries, transport, or responsibilities. */
  detail: string;
};

/** A meaningful implementation choice and why it was made. */
export type EngineeringDecision = {
  title: string;
  detail: string;
};

export type Project = {
  slug: string;
  name: string;
  /** Short technical descriptor shown as a monospace tag. */
  tag: string;
  /** The need the product addresses. */
  problem: string;
  /** What the product does. */
  description: string;
  /** Feature areas, from the supplied descriptions and verified repo facts. */
  highlights: string[];
  /** How the frontend, API, and data layer fit together. */
  system: {
    summary: string;
    layers: SystemLayer[];
    note?: string;
  };
  /** Implementation choices that carry real engineering rationale. */
  decisions: EngineeringDecision[];
  stacks: StackGroup[];
  links: ProjectLink[];
  accent: Accent;
  screenshot?: ProjectScreenshot;
};

/*
  Content here is grounded in the supplied facts and in the public repositories
  (rallyledger-web, mmsu-tennis-club) as inspected. Do not add metrics, user
  counts, revenue, performance figures, endorsements, or integrations that are
  not present in code. URLs are used exactly as provided by the author.
*/
export const projects: Project[] = [
  {
    slug: "rallyledger",
    name: "RallyLedger",
    tag: "Club management platform",
    problem:
      "Tennis clubs often run on spreadsheets, with participants, sessions, charges, and payments tracked in separate places.",
    description:
      "A tennis club management platform for club operations and finances, with participant and session management, match records, product sales, payment allocation, financial reporting, and player self-service.",
    highlights: [
      "Participants, memberships & group packages",
      "Courts, sessions, attendance & match records",
      "Fee rules, charges & product sales",
      "Payments, balances & financial histories",
      "Date-filtered reports & ledger exports",
      "Player portal, invitations & profile photos",
      "Payment receipts with allocation details",
      "Organization roles, branding & audit history",
    ],
    system: {
      summary:
        "Sessions, matches, and charge writes travel from the React SPA through the Go API into PostgreSQL; every authenticated request carries an HttpOnly session cookie.",
      layers: [
        {
          role: "Client",
          title: "React + TypeScript SPA",
          detail: "Vite · React Router · Tailwind CSS v4",
        },
        {
          role: "Session",
          title: "HttpOnly cookie auth",
          detail:
            "Email/password and Google sign-in · expired sessions force re-authentication",
        },
        {
          role: "API",
          title: "Go REST API",
          detail: "chi · pgx · deployed on Render",
        },
        {
          role: "Data",
          title: "PostgreSQL",
          detail: "Neon · schema applied through versioned migrations",
        },
      ],
      note: "Vercel serves the SPA and rewrites /api/* requests to the Render API.",
    },
    decisions: [
      {
        title: "Sessions live in cookies, not storage",
        detail:
          "Admin tokens are never placed in localStorage. Every authenticated request is sent with credentials: \"include\", and a 401 response triggers a global sign-out and re-login.",
      },
      {
        title: "Charges are reviewed before they are ledgered",
        detail:
          "Fees are generated and verified before financial records are written, and changing attendance recalculates charges while leaving manually adjusted amounts untouched.",
      },
      {
        title: "Player access follows an invitation",
        detail:
          "Administrators create invitation links for participants. After signing in or creating an account, players can claim an invitation and access their profile, sessions, match records, doubles pairs, and ledger.",
      },
      {
        title: "Receipts preserve payment context",
        detail:
          "Administrators can generate shareable or downloadable PNG receipts from a participant ledger, including payment allocations and correction details.",
      },
      {
        title: "Schema changes ship as migrations",
        detail:
          "Database changes are applied through ordered migrations rather than ad-hoc edits, keeping the schema history reviewable next to the application code.",
      },
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
    tag: "Club website & booking platform",
    problem:
      "The club needed to publish training sessions and collect booking requests online, while keeping coach availability and admin scheduling under control.",
    description:
      "A public club website and booking system with session discovery, private request tracking, program selection, admin scheduling and review, and a separate coach portal.",
    highlights: [
      "Public club pages, FAQ & responsive navigation",
      "Upcoming sessions & active training programs",
      "Multi-slot booking requests with participant details",
      "Private status links for pending, approved & rejected requests",
      "Admin review, player matching & request decisions",
      "Training program and session management",
      "Coach directory, availability & assigned schedules",
      "Feedback review and updates",
    ],
    system: {
      summary:
        "The browser talks only to the Next.js app; booking requests are proxied server-side to the Go API, which reads and writes Supabase Postgres under restricted database roles.",
      layers: [
        {
          role: "Client",
          title: "Next.js App Router",
          detail: "React 19 · TypeScript · public pages, /coach, and /admin",
        },
        {
          role: "Proxy",
          title: "Next.js server route",
          detail:
            "/api/backend/* forwards to the Go API with a shared secret and client IP",
        },
        {
          role: "API",
          title: "Go API",
          detail:
            "net/http · pgx · schedules, booking requests, staff workflows, feedback",
        },
        {
          role: "Data",
          title: "Supabase Postgres",
          detail: "Supabase Auth + RLS roles · versioned SQL migrations",
        },
      ],
      note: "Approval email notifications and Google Calendar sync depend on server-side provider configuration; bookings can still be approved without them.",
    },
    decisions: [
      {
        title: "Status tokens are hashed at rest",
        detail:
          "A booking request returns a one-time status token; the database stores only its SHA-256 hash, it expires after 30 days, and the browser keeps it in the URL fragment rather than the query string.",
      },
      {
        title: "Approval is one transaction",
        detail:
          "Approving a request locks and rechecks the session, counts confirmed bookings, inserts the booking, and records the admin and timestamp atomically — email and calendar sync happen afterward.",
      },
      {
        title: "The browser never holds database credentials",
        detail:
          "The Next.js server proxies allowed API paths to the Go API with a shared secret and the client IP; the Go API verifies Supabase sessions and matches them against server-side allowlists.",
      },
      {
        title: "Scheduled and selected programs stay distinct",
        detail:
          "A session's scheduled program and a participant's optional program choice are stored and presented separately, preserving both the session context and the participant's request.",
      },
      {
        title: "Public endpoints are rate limited",
        detail:
          "Booking requests are limited to 5 per client IP per hour and status lookups to 30 per minute. The limits are held in memory per API instance — a deliberately simple guard, not a shared service.",
      },
    ],
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
    screenshot: {
      src: "/images/projects/mtc.png",
      alt: "MMSU Tennis Club landing page with an overhead view of the tennis courts behind the headline \u201cYour game. Your community.\u201d and a Training schedule link in the header.",
      width: 2511,
      height: 1222,
    },
  },
];
