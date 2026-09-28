"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// A GSAP ScrollTrigger–driven parallax band: the statement text drifts and scales
// against the scrub of the scroll, and a thin brass rule draws itself in as you pass
// through the section. Purely ambient/typographic — no property imagery to parallax
// since none exists yet.
export default function ParallaxBand({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { xPercent: 6, opacity: 0.35 },
          {
            xPercent: -6,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      }
      if (ruleRef.current) {
        gsap.fromTo(
          ruleRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: 0.4,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={containerRef} className="relative overflow-hidden py-28 md:py-40">
      <div
        ref={ruleRef}
        className="mx-auto mb-10 h-px w-full max-w-4xl origin-left bg-brass/50"
      />
      <p
        ref={textRef}
        className="mx-auto max-w-4xl px-6 text-center font-display text-[clamp(1.6rem,4.2vw,3.25rem)] leading-tight text-bone/90"
      >
        {text}
      </p>
    </div>
  );
}
