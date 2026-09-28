import Link from "next/link";
import { Listing } from "@/data/listings";
import { formatCurrency } from "@/lib/format";
import ListingPlaceholderArt from "@/components/ListingPlaceholderArt";

export default function ListingCard({ listing, index = 0 }: { listing: Listing; index?: number }) {
  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-surface transition-all duration-500 ease-expo hover:-translate-y-1 hover:border-brass/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ListingPlaceholderArt seed={index} />
        <div className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs uppercase tracking-widest2 text-brass backdrop-blur">
          {listing.status}
        </div>
        {listing.isSample && (
          <div className="absolute right-4 top-4 rounded-full bg-brass/90 px-3 py-1 text-xs font-medium text-ink">
            Sample
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="font-display text-xl text-bone transition-colors duration-300 group-hover:text-brass">
          {formatCurrency(listing.price)}
        </div>
        <div className="mt-1 text-sm text-bone/70">{listing.address}</div>
        <div className="text-sm text-bone/50">
          {listing.city}, {listing.state} {listing.zip}
        </div>
        <div className="mt-4 flex gap-4 text-xs uppercase tracking-widest2 text-bone/40">
          {listing.beds !== undefined && <span>{listing.beds} Bed</span>}
          {listing.baths !== undefined && <span>{listing.baths} Bath</span>}
          {listing.sqft !== undefined && <span>{listing.sqft.toLocaleString()} Sqft</span>}
        </div>
      </div>
    </Link>
  );
}
