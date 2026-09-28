"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

const easeExpo = [0.16, 1, 0.3, 1] as const;

export default function ScrollReveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.95, ease: easeExpo, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduced ? 0 : stagger },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({
  children,
  className,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: reduced ? {} : { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easeExpo } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
