"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from "motion/react";
import Image from "next/image";
import { Fragment, useEffect, useState, type PointerEvent } from "react";
import { SectionLabel } from "@/components/section-label";
import { SystemMap } from "@/components/system-map";
import type { Project } from "@/lib/projects";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { externalLink } from "@/lib/ui";

const accentMap = {
  lime: {
    dot: "bg-lime",
    glow: "rgba(199, 242, 104, 0.16)",
  },
  cyan: {
    dot: "bg-cyan",
    glow: "rgba(99, 224, 211, 0.16)",
  },
} as const;

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

      <div className="relative flex flex-col gap-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
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
              className="max-w-2xl text-lg leading-relaxed text-cream"
            >
              {project.problem}
            </motion.p>

            <motion.p
              variants={item}
              className="max-w-2xl text-base leading-relaxed text-sage"
            >
              {project.description}
            </motion.p>

            <motion.div variants={item} className="flex flex-col gap-3">
              <SectionLabel>Scope</SectionLabel>
              <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-baseline gap-3 text-sm text-cream"
                  >
                    <span aria-hidden="true" className="text-lime">
                      —
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.dl variants={item} className="mt-1 flex flex-col">
              {project.stacks.map((group) => (
                <div
                  key={group.label}
                  className="grid gap-1 border-t border-line py-3 last:border-b sm:grid-cols-[6rem_minmax(0,1fr)] sm:items-baseline sm:gap-4"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage">
                    {group.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-cream">
                    {group.items.map((stackItem, itemIndex) => (
                      <Fragment key={stackItem}>
                        {itemIndex > 0 ? " · " : null}
                        <span className="whitespace-nowrap">{stackItem}</span>
                      </Fragment>
                    ))}
                  </dd>
                </div>
              ))}
            </motion.dl>

            <motion.div
              variants={item}
              className="flex flex-wrap gap-x-6 gap-y-3"
            >
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
          </motion.div>
        </div>

        <motion.div variants={item} className="border-t border-line pt-8">
          <details className="case-toggle">
            <summary className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-sage transition-colors hover:text-cream focus-visible:text-cream">
              <span aria-hidden="true" className="case-toggle__marker text-lime">
                +
              </span>
              <span className="whitespace-nowrap">System &amp; decisions</span>
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
              <span aria-hidden="true" className="hidden text-sage sm:inline">
                {project.system.layers.length} layers &middot;{" "}
                {project.decisions.length} decisions
              </span>
            </summary>

            <div className="mt-8 flex flex-col gap-8">
              <div>
                <SectionLabel>System</SectionLabel>
                <SystemMap
                  layers={project.system.layers}
                  summary={project.system.summary}
                  note={project.system.note}
                  accent={project.accent}
                  className="mt-6"
                />
              </div>

              <div className="border-t border-line pt-8">
                <SectionLabel>Decisions</SectionLabel>
                <ol className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {project.decisions.map((decision, decisionIndex) => (
                    <li key={decision.title} className="flex flex-col gap-2">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[10px] text-lime">
                          {String(decisionIndex + 1).padStart(2, "0")}
                        </span>
                        <h4 className="font-display text-lg leading-tight text-cream">
                          {decision.title}
                        </h4>
                      </div>
                      <p className="pl-7 text-sm leading-relaxed text-sage">
                        {decision.detail}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </details>
        </motion.div>
      </div>
    </motion.article>
  );
}
