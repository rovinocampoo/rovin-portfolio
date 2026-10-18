"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE_OUT_EXPO, delay },
    },
  };

  return (
    <motion.div
      data-reveal
      className={className}
      variants={variants}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}
