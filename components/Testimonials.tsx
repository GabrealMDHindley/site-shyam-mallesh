import { testimonials } from "@/data/testimonials";
import ScrollReveal, { ScrollRevealGroup, ScrollRevealItem } from "@/components/ScrollReveal";

// Renders nothing when there are no real, permissioned testimonials — see
// data/testimonials.ts. No placeholder quotes are ever shown here.
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="section-label mb-10 text-center">Client Stories</p>
        </ScrollReveal>
        <ScrollRevealGroup className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollRevealItem
              key={i}
              className="rounded-2xl border border-white/10 bg-surface p-8"
            >
              <p className="font-display text-lg leading-relaxed text-bone/90">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 text-sm text-brass">{t.name}</div>
              {t.context && (
                <div className="text-xs text-bone/40">{t.context}</div>
              )}
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </div>
    </section>
  );
}
