"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

const PATH =
  "M8 132 H48 L66 84 H96 L116 148 H156 L176 56 H206 L226 124 H266 L286 36 H326 L346 108 H392";

const NODES: readonly [number, number][] = [
  [48, 132],
  [96, 84],
  [156, 148],
  [206, 56],
  [266, 124],
  [326, 36],
  [392, 108],
];

const GRID_Y = [36, 68, 100, 132, 164];

/**
 * The site's signature "signal trace".
 * - `mount` draws once on load (hero).
 * - `scroll` ties the path length to scroll progress (approach section).
 */
export function SignalTrace({
  mode = "mount",
  accent = "lime",
  className,
}: {
  mode?: "mount" | "scroll";
  accent?: "lime" | "cyan";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.45"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.5,
  });
  const drawn = useTransform(smooth, [0, 1], [0, 1]);

  const stroke = accent === "lime" ? "var(--color-lime)" : "var(--color-cyan)";

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <svg viewBox="0 0 400 200" fill="none" className="h-auto w-full">
        {GRID_Y.map((y) => (
          <line
            key={y}
            x1="0"
            x2="400"
            y1={y}
            y2={y}
            stroke="var(--color-line)"
            strokeWidth="1"
          />
        ))}
        <line
          x1="0"
          x2="0"
          y1="0"
          y2="200"
          stroke="var(--color-line)"
          strokeWidth="1"
        />

        {mode === "scroll" ? (
          <motion.path
            d={PATH}
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ pathLength: reduce ? 1 : drawn }}
          />
        ) : (
          <motion.path
            d={PATH}
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={reduce ? undefined : { pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.2, ease: EASE_OUT_EXPO, delay: 0.5 }}
          />
        )}

        {NODES.map(([x, y]) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="2.5"
            fill={stroke}
            opacity="0.85"
          />
        ))}
      </svg>
    </div>
  );
}
