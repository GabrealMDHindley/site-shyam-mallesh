import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.agentName}.`,
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  const { interest } = await searchParams;
  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-36 md:px-10 md:pt-44">
      <ScrollReveal>
        <p className="section-label mb-4">Get in Touch</p>
        <h1 className="font-display text-4xl text-bone md:text-6xl">Contact</h1>
        <p className="mt-4 max-w-xl text-bone/70">
          Buying, selling, investing, or just exploring — send a message and
          you'll hear back directly.
        </p>
      </ScrollReveal>

      {(site.phone || site.email || site.officeAddress) && (
        <ScrollReveal delay={0.08}>
          <div className="mt-10 flex flex-wrap gap-8 text-sm text-bone/70">
            {site.phone && <div>{site.phone}</div>}
            {site.email && <div>{site.email}</div>}
            {site.officeAddress && <div>{site.officeAddress}</div>}
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal delay={0.14}>
        <div className="mt-14 rounded-2xl border border-white/10 bg-surface p-8 md:p-12">
          <ContactForm initialInterest={interest ?? ""} />
        </div>
      </ScrollReveal>
    </div>
  );
}
