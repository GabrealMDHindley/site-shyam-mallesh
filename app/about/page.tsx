import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.agentName}, ${site.title}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-36 md:px-10 md:pt-44">
      <ScrollReveal>
        <p className="section-label mb-4">About</p>
        <h1 className="font-display text-4xl text-bone md:text-6xl">
          {site.agentName}
        </h1>
        <p className="mt-2 text-bone/60">{site.title}</p>
      </ScrollReveal>

      <div className="mt-14 space-y-6">
        {site.bio.map((paragraph, i) => (
          <ScrollReveal key={i} delay={i * 0.06}>
            <p className="text-lg leading-relaxed text-bone/80">{paragraph}</p>
          </ScrollReveal>
        ))}
      </div>

      {site.serviceAreas.length > 0 && (
        <ScrollReveal delay={0.2}>
          <div className="mt-14">
            <p className="section-label mb-3">Service Areas</p>
            <p className="text-bone/70">{site.serviceAreas.join(" · ")}</p>
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal delay={0.24}>
        <div className="mt-16 rounded-2xl border border-white/10 bg-surface p-10">
          <h2 className="font-display text-2xl text-bone">
            Buying, selling, or just exploring your options?
          </h2>
          <p className="mt-3 text-bone/70">
            Start with a conversation — no pressure, just clarity on what's realistic.
          </p>
          <Link href="/contact" className="btn-primary mt-6 inline-flex">
            Get in Touch
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
