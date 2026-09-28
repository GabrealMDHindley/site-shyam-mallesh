import Hero from "@/components/Hero";
import ScrollReveal, {
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/components/ScrollReveal";
import ParallaxBand from "@/components/ParallaxBand";
import ListingCard from "@/components/ListingCard";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";
import { listings } from "@/data/listings";
import { site } from "@/data/site";

const pillars = [
  {
    title: "Buy",
    body: "A clear read on value, a disciplined offer strategy, and someone in your corner from the first showing to closing day.",
  },
  {
    title: "Sell",
    body: "Positioning, pricing, and presentation built around how today's buyers actually shop — then negotiated to the strongest outcome.",
  },
  {
    title: "Invest",
    body: "Numbers first. Cash flow, appreciation potential, and exit strategy discussed plainly, before any decision is made.",
  },
];

export default function HomePage() {
  const featured = listings[0];

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-4xl px-6 py-24 text-center md:px-10 md:py-32">
        <ScrollReveal>
          <p className="section-label mb-6">Approach</p>
          <p className="font-display text-[clamp(1.5rem,3.4vw,2.5rem)] leading-snug text-bone/90">
            {site.bio[0]}
          </p>
        </ScrollReveal>
      </section>

      {featured && (
        <section className="px-6 py-10 md:px-10">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="mb-10 flex items-end justify-between">
                <div>
                  <p className="section-label mb-3">Featured</p>
                  <h2 className="font-display text-3xl text-bone md:text-4xl">
                    Current Listing
                  </h2>
                </div>
                <Link
                  href="/listings"
                  className="hidden text-sm font-medium text-brass hover:text-bone md:inline"
                >
                  View all listings →
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="max-w-md">
                <ListingCard listing={featured} />
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      <ParallaxBand text="Real estate decisions carry weight. They deserve a quiet, disciplined process — not pressure." />

      <section className="px-6 py-10 md:px-10">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="section-label mb-3 text-center">What I Do</p>
          </ScrollReveal>
          <ScrollRevealGroup className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <ScrollRevealItem
                key={p.title}
                className="rounded-2xl border border-white/10 bg-surface p-8"
              >
                <div className="font-display text-2xl text-brass">{p.title}</div>
                <p className="mt-4 text-sm leading-relaxed text-bone/70">{p.body}</p>
              </ScrollRevealItem>
            ))}
          </ScrollRevealGroup>
        </div>
      </section>

      <section className="px-6 py-24 md:px-10 md:py-32">
        <ScrollReveal>
          <div className="mx-auto max-w-5xl rounded-3xl border border-brass/20 bg-gradient-to-br from-surface to-card p-10 text-center md:p-16">
            <p className="section-label mb-4">Mortgage Calculator</p>
            <h2 className="font-display text-3xl text-bone md:text-5xl">
              What would it cost, monthly, to buy this home?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-bone/70">
              Model a real payment in seconds — price, down payment, rate, term, taxes,
              and insurance — for any listing on this site.
            </p>
            <Link href="/calculator" className="btn-primary mt-8 inline-flex">
              Open the Calculator
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Testimonials />

      <section className="px-6 py-24 text-center md:px-10 md:py-28">
        <ScrollReveal>
          <h2 className="font-display text-3xl text-bone md:text-5xl">
            Ready to talk through your next move?
          </h2>
          <Link href="/contact" className="btn-primary mt-8 inline-flex">
            Start a Conversation
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
