// Listing inventory. Ships with ONE clearly-labeled sample listing (isSample: true) so
// the listings grid, listing detail page, and mortgage calculator are demonstrably
// functional without fabricating a real property. Replace/extend this array with real
// inventory — set isSample to false (or remove it) once real listings are added.
//
// The chatbot reads this file live (lib/systemPrompt.ts), so adding a real listing here
// is immediately something visitors can ask the AI agent about.

export type Listing = {
  slug: string;
  status: "For Sale" | "For Lease" | "Sold" | "Under Contract";
  isSample?: boolean;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds?: number;
  baths?: number;
  sqft?: number;
  lotSize?: string;
  propertyType: string;
  description: string;
  features: string[];
  // No real photography exists yet — the UI renders a designed gradient placeholder
  // instead of a stock photo. Add real photo paths under /public/listings/<slug>/ and
  // list them here once available.
  photos: string[];
};

export const listings: Listing[] = [
  {
    slug: "sample-listing",
    status: "For Sale",
    isSample: true,
    address: "Sample Listing — Add Your Inventory",
    city: "Your City",
    state: "ST",
    zip: "00000",
    price: 1250000,
    beds: 4,
    baths: 3,
    sqft: 3200,
    lotSize: "0.4 acres",
    propertyType: "Single Family",
    description:
      "This is a placeholder listing shipped with the site so the listings grid, detail page, and mortgage calculator all have something real to render against. Replace this entry in data/listings.ts with your actual current inventory — address, price, specs, description, and real photography — and this card disappears automatically.",
    features: [
      "Placeholder — replace with real features",
      "Placeholder — replace with real features",
      "Placeholder — replace with real features",
    ],
    photos: [],
  },
];

export const getListingBySlug = (slug: string) =>
  listings.find((l) => l.slug === slug);
