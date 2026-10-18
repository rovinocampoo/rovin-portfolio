"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from "motion/react";
import Image from "next/image";
import { useEffect, useState, type PointerEvent } from "react";
import type { Project } from "@/lib/projects";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { externalLink } from "@/lib/ui";

const accentMap = {
  lime: {
    text: "text-lime",
    dot: "bg-lime",
    glow: "rgba(199, 242, 104, 0.16)",
  },
  cyan: {
    text: "text-cyan",
    dot: "bg-cyan",
    glow: "rgba(99, 224, 211, 0.16)",
  },
} as const;

function Motif({ project }: { project: Project }) {
  const accent = accentMap[project.accent];

  if (project.motif === "court") {
    return (
      <div className="border border-line bg-ink/40 p-5">
        <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-sage">
          <span>Court</span>
          <span className={accent.text}>{project.highlights.length} modules</span>
        </div>
        <svg viewBox="0 0 320 190" className="w-full" aria-hidden="true">
          <rect
            x="22"
            y="20"
            width="276"
            height="150"
            fill="none"
            stroke="var(--color-line-strong)"
          />
          <line
            x1="160"
            y1="20"
            x2="160"
            y2="170"
            stroke="var(--color-cyan)"
            strokeOpacity="0.55"
          />
          <rect
            x="22"
            y="55"
            width="138"
            height="80"
            fill="none"
            stroke="var(--color-line)"
          />
          <rect
            x="160"
            y="55"
            width="138"
            height="80"
            fill="none"
            stroke="var(--color-line)"
          />
          <line
            x1="22"
            y1="95"
            x2="298"
            y2="95"
            stroke="var(--color-line)"
          />
        </svg>
        <ul className="mt-5 flex flex-col gap-2">
          {project.highlights.map((highlight, index) => (
            <li
              key={highlight}
              className="flex items-baseline gap-3 text-sm text-cream"
            >
              <span className="font-mono text-[10px] text-sage">
                {String(index + 1).padStart(2, "0")}
              </span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="border border-line bg-ink/40 p-5">
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-sage">
        <span>Modules</span>
        <span className={accent.text}>
          {String(project.highlights.length).padStart(2, "0")}
        </span>
      </div>
      <ol className="relative flex flex-col">
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[3px] top-2 w-px bg-line"
        />
        {project.highlights.map((highlight, index) => (
          <li
            key={highlight}
            className="relative flex items-center gap-4 py-2.5"
          >
            <span className="relative z-10 h-[7px] w-[7px] shrink-0 rounded-full border border-lime/60 bg-ink" />
            <span className="font-mono text-[10px] text-sage">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm text-cream">{highlight}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ProjectShowcase({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");
  const accent = accentMap[project.accent];
  const reduce = useReducedMotion();
  const flip = project.accent === "cyan";

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, ${accent.glow}, transparent 65%)`;

  const [finePointer, setFinePointer] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const handlePointerMove = finePointer
    ? (event: PointerEvent<HTMLElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mx.set(((event.clientX - rect.left) / rect.width) * 100);
        my.set(((event.clientY - rect.top) / rect.height) * 100);
      }
    : undefined;

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.09 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.7, ease: EASE_OUT_EXPO },
    },
  };
  const reveal: Variants = {
    hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    visible: {
      opacity: 1,
      clipPath: "inset(0 0 0% 0)",
      transition: {
        duration: reduce ? 0 : 1.1,
        ease: EASE_OUT_EXPO,
        delay: reduce ? 0 : 0.1,
      },
    },
  };

  return (
    <motion.article
      id={project.slug}
      data-reveal
      onPointerMove={handlePointerMove}
      variants={container}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={{ once: true, amount: 0.15 }}
      className="group relative scroll-mt-24 overflow-hidden border border-line bg-forest/30 p-6 sm:p-9"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-10 font-display text-[8rem] leading-none text-cream/[0.04] sm:text-[11rem]"
      >
        {number}
      </span>

      <div
        className="relative grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12"
      >
        <div className={`flex flex-col gap-6 ${flip ? "lg:order-2" : ""}`}>
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${accent.dot}`}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sage">
              {number} / {project.tag}
            </span>
          </motion.div>

          <motion.h3
            variants={item}
            className="max-w-[18ch] font-display text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.04] text-cream"
          >
            {project.name}
          </motion.h3>

          <motion.p
            variants={item}
            className="max-w-2xl text-base leading-relaxed text-sage"
          >
            {project.description}
          </motion.p>

          <motion.dl variants={item} className="mt-1 flex flex-col">
            {project.stacks.map((group) => (
              <div
                key={group.label}
                className="grid gap-1 border-t border-line py-3 last:border-b sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-baseline sm:gap-4"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage">
                  {group.label}
                </dt>
                <dd className="text-sm leading-relaxed text-cream">
                  {group.items.join(" · ")}
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={item} className="flex flex-wrap gap-x-6 gap-y-3">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className={externalLink}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                >
                  ↗
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={reveal}
          className={`${flip ? "lg:order-1" : ""} flex flex-col gap-5 self-start`}
        >
          {project.screenshot ? (
            <div className="overflow-hidden border border-line bg-ink/40">
              <Image
                src={project.screenshot.src}
                alt={project.screenshot.alt}
                width={project.screenshot.width}
                height={project.screenshot.height}
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="h-auto w-full"
              />
            </div>
          ) : null}
          <Motif project={project} />
        </motion.div>
      </div>
    </motion.article>
  );
}
