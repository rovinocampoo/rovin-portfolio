"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/container";
import { SignalTrace } from "@/components/signal-trace";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { site } from "@/lib/site";
import { buttonPrimary, buttonSecondary } from "@/lib/ui";

const readout = [
  { label: "Role", value: "Full-stack Developer" },
  { label: "Frontend", value: "React · Next.js" },
  { label: "Backend", value: "Go" },
  { label: "Data", value: "PostgreSQL · Supabase" },
  { label: "Deploy", value: "Vercel · Render" },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
};

const line: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 1, ease: EASE_OUT_EXPO } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-line"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full"
        style={{
          y: reduce ? undefined : glowY,
          background:
            "radial-gradient(circle, rgba(99,224,211,0.12), transparent 62%)",
        }}
        animate={reduce ? undefined : { opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative grid min-h-[calc(100svh_-_4rem)] items-center gap-14 py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <motion.div
          className="flex flex-col gap-7"
          variants={reduce ? undefined : container}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "visible"}
        >
          <motion.p
            data-reveal
            variants={reduce ? undefined : item}
            className="flex flex-wrap items-center gap-x-2 font-mono text-[11px] uppercase tracking-[0.24em] text-sage"
          >
            <span className="text-cream">{site.name}</span>
            <span aria-hidden className="text-line-strong">
              /
            </span>
            <span>{site.role}</span>
          </motion.p>

          <h1
            id="hero-title"
            className="font-display text-[clamp(2.75rem,7.2vw,5.5rem)] leading-[1.04] text-cream"
          >
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span
                data-reveal
                variants={reduce ? undefined : line}
                className="block"
              >
                Useful software<span className="text-lime">,</span>
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span
                data-reveal
                variants={reduce ? undefined : line}
                className="block"
              >
                built <em className="italic">end to end</em>
                <span className="text-lime">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            data-reveal
            variants={reduce ? undefined : item}
            className="max-w-xl text-base leading-relaxed text-sage sm:text-lg"
          >
            I build full-stack applications that connect thoughtful
            interfaces, reliable APIs, and practical data systems.
          </motion.p>

          <motion.div
            data-reveal
            variants={reduce ? undefined : item}
            className="flex flex-wrap items-center gap-3"
          >
            <a href="#work" className={buttonPrimary}>
              View selected work
            </a>
            <a href="#contact" className={buttonSecondary}>
              Get in touch
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          data-reveal
          style={{ y: reduce ? undefined : panelY }}
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.4 }}
        >
          <div className="grid-fade absolute inset-0" aria-hidden="true" />

          <SignalTrace mode="mount" className="relative" />

          <aside
            data-reveal
            aria-label="Stack readout"
            className="relative mt-8 border border-line bg-forest/50 p-6 backdrop-blur-sm"
          >
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-sage">
              Readout
            </p>
            <dl className="flex flex-col gap-3 font-mono text-[11px]">
              {readout.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0"
                >
                  <dt className="uppercase tracking-[0.18em] text-sage">
                    {row.label}
                  </dt>
                  <dd className="text-cream">{row.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </motion.div>
      </Container>
    </section>
  );
}
