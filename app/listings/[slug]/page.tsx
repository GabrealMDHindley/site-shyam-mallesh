import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import ListingPlaceholderArt from "@/components/ListingPlaceholderArt";
import MortgageCalculator from "@/components/MortgageCalculator";
import { getListingBySlug, listings } from "@/data/listings";
import { formatCurrency } from "@/lib/format";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) return {};
  return {
    title: listing.address,
    description: listing.description.slice(0, 155),
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) notFound();

  return (
    <div className="pb-24 pt-28 md:pt-32">
      <div className="relative h-[55vh] w-full overflow-hidden md:h-[70vh]">
        <ListingPlaceholderArt seed={0} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <div className="absolute bottom-8 left-0 w-full px-6 md:px-10">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-brass px-3 py-1 text-xs font-medium uppercase tracking-widest2 text-ink">
                  {listing.status}
                </span>
                {listing.isSample && (
                  <span className="rounded-full border border-white/30 px-3 py-1 text-xs text-bone/70">
                    Sample Listing
                  </span>
                )}
              </div>
              <h1 className="mt-4 font-display text-3xl text-bone md:text-6xl">
                {listing.address}
              </h1>
              <p className="mt-2 text-bone/60">
                {listing.city}, {listing.state} {listing.zip}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <ScrollReveal>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/10 bg-surface p-8">
            <div className="font-display text-3xl text-brass md:text-4xl">
              {formatCurrency(listing.price)}
            </div>
            <div className="flex flex-wrap gap-8 text-sm">
              {listing.beds !== undefined && <Stat label="Beds" value={listing.beds} />}
              {listing.baths !== undefined && <Stat label="Baths" value={listing.baths} />}
              {listing.sqft !== undefined && (
                <Stat label="Sqft" value={listing.sqft.toLocaleString()} />
              )}
              {listing.lotSize && <Stat label="Lot" value={listing.lotSize} />}
              <Stat label="Type" value={listing.propertyType} />
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-14 md:grid-cols-[1.3fr,0.7fr]">
          <div>
            <ScrollReveal>
              <p className="section-label mb-4">Description</p>
              <p className="whitespace-pre-line text-lg leading-relaxed text-bone/80">
                {listing.description}
              </p>
            </ScrollReveal>

            {listing.features.length > 0 && (
              <ScrollReveal delay={0.1}>
                <div className="mt-10">
                  <p className="section-label mb-4">Features</p>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {listing.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-bone/70"
                      >
                        <span className="h-1 w-1 rounded-full bg-brass" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            )}
          </div>

          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-surface p-8">
              <p className="section-label mb-2">Interested?</p>
              <p className="mt-2 text-sm text-bone/60">
                Send an inquiry directly about this property.
              </p>
              <Link
                href={`/contact?interest=${listing.slug}`}
                className="btn-primary mt-6 w-full"
              >
                Inquire About This Listing
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.15}>
          <div className="mt-20 rounded-3xl border border-brass/20 bg-gradient-to-br from-surface to-card p-8 md:p-12">
            <p className="section-label mb-4">Estimate Your Payment</p>
            <h2 className="mb-8 font-display text-2xl text-bone md:text-3xl">
              What would this home cost, monthly?
            </h2>
            <MortgageCalculator
              initialPrice={listing.price}
              initialSlug={listing.slug}
              compact
            />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest2 text-bone/40">{label}</div>
      <div className="mt-1 text-bone/90">{value}</div>
    </div>
  );
}
