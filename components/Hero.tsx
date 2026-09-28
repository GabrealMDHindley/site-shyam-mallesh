"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import HeroFallback from "@/components/three/HeroFallback";
import { useReducedMotion, useWebGLSupported } from "@/hooks/useReducedMotion";
import { site } from "@/data/site";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });
  const [mobile, setMobile] = useState(false);
  const reducedMotion = useReducedMotion();
  const webglOk = useWebGLSupported();
  const framerReduced = useFramerReducedMotion();

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const height = el.offsetHeight || 1;
      const progress = Math.min(1, Math.max(0, -rect.top / height));
      progressRef.current.value = progress;
    };
    const loop = () => {
      onScroll();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  const show3D = webglOk && !reducedMotion;

  const easeExpo = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[145vh] w-full flex-col overflow-hidden bg-ink"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {show3D ? (
          <HeroScene progressRef={progressRef} mobile={mobile} />
        ) : (
          <HeroFallback />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/40 to-ink" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-center px-6 md:px-10">
          <motion.p
            initial={framerReduced ? undefined : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeExpo }}
            className="section-label mb-6"
          >
            {site.title}
          </motion.p>

          <motion.h1
            initial={framerReduced ? undefined : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: easeExpo, delay: 0.1 }}
            className="max-w-3xl font-display text-[clamp(2.75rem,7vw,7rem)] leading-[0.98] text-bone"
          >
            {site.agentName}
          </motion.h1>

          <motion.p
            initial={framerReduced ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeExpo, delay: 0.28 }}
            className="mt-6 max-w-xl text-lg text-bone/70"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={framerReduced ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeExpo, delay: 0.42 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/listings" className="btn-primary">
              View Listings
            </Link>
            <Link href="/calculator" className="btn-ghost">
              Estimate a Payment
            </Link>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-bone/40">
          <div className="h-10 w-px animate-pulse bg-bone/30" />
        </div>
      </div>
    </section>
  );
}
