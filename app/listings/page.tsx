import type { Metadata } from "next";
import ScrollReveal, { ScrollRevealGroup, ScrollRevealItem } from "@/components/ScrollReveal";
import ListingCard from "@/components/ListingCard";
import { listings } from "@/data/listings";

export const metadata: Metadata = {
  title: "Listings",
  description: "Current real estate listings.",
};

export default function ListingsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-36 md:px-10 md:pt-44">
      <ScrollReveal>
        <p className="section-label mb-4">Inventory</p>
        <h1 className="font-display text-4xl text-bone md:text-6xl">Listings</h1>
      </ScrollReveal>

      {listings.length === 0 ? (
        <ScrollReveal delay={0.1}>
          <p className="mt-14 text-bone/60">No active listings published yet.</p>
        </ScrollReveal>
      ) : (
        <ScrollRevealGroup className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing, i) => (
            <ScrollRevealItem key={listing.slug}>
              <ListingCard listing={listing} index={i} />
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      )}
    </div>
  );
}
