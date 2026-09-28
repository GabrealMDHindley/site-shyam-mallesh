import { site } from "@/data/site";
import { listings } from "@/data/listings";
import { faq } from "@/data/faq";
import { testimonials } from "@/data/testimonials";
import { formatCurrency } from "@/lib/format";

// Builds the chatbot's full grounding context directly from the same data files that
// render the site. Because this function re-reads those files on every request, any
// edit to data/site.ts, data/listings.ts, data/faq.ts, or data/testimonials.ts is
// exactly what the chatbot knows on the next message — no separate re-indexing step,
// no vector database, no stale cache to invalidate.
export function buildSystemPrompt(): string {
  const listingsBlock = listings
    .map((l) => {
      const bits = [
        `- ${l.address}, ${l.city}, ${l.state} ${l.zip}`,
        `  Status: ${l.status}${l.isSample ? " (SAMPLE PLACEHOLDER — not a real listing yet, tell the visitor this is a demo entry if asked)" : ""}`,
        `  Price: ${formatCurrency(l.price)}`,
        l.beds ? `  Beds: ${l.beds}` : null,
        l.baths ? `  Baths: ${l.baths}` : null,
        l.sqft ? `  Sqft: ${l.sqft}` : null,
        `  Type: ${l.propertyType}`,
        `  Description: ${l.description}`,
        l.features.length ? `  Features: ${l.features.join(", ")}` : null,
      ].filter(Boolean);
      return bits.join("\n");
    })
    .join("\n\n");

  const faqBlock = faq
    .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
    .join("\n\n");

  const testimonialsBlock = testimonials.length
    ? testimonials
        .map((t) => `"${t.quote}" — ${t.name}${t.context ? `, ${t.context}` : ""}`)
        .join("\n")
    : "(No published testimonials yet.)";

  const contactFacts = [
    site.phone ? `Phone: ${site.phone}` : null,
    site.email ? `Email: ${site.email}` : null,
    site.officeAddress ? `Office: ${site.officeAddress}` : null,
    !site.phone && !site.email && !site.officeAddress
      ? "No direct phone/email is published yet — direct visitors to the Contact page form."
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  return `You are the AI assistant embedded on ${site.agentName}'s real estate website. You answer visitor questions using ONLY the facts below, which are pulled live from this website's own content. Never invent facts that aren't here — if you don't know something, say so plainly and point the visitor to the Contact page.

ABOUT THE AGENT
Name: ${site.agentName}
Title: ${site.title}
${site.brokerage ? `Brokerage: ${site.brokerage}` : "Brokerage: not published yet"}
Bio:
${site.bio.join("\n")}

CONTACT
${contactFacts}

CURRENT LISTINGS
${listingsBlock || "No listings published yet."}

FREQUENTLY ASKED QUESTIONS
${faqBlock}

TESTIMONIALS
${testimonialsBlock}

STYLE
Be warm, concise, and precise — like a knowledgeable private advisor, not a salesy chatbot. Use plain numbers (say "$1,250,000", not "$1.25M-ish"). If asked about pricing a home purchase, point the visitor to the mortgage calculator at /calculator. If asked to book a call, submit an inquiry, or get in touch with ${site.agentName} directly, point them to the Contact page (/contact). Never fabricate a phone number, email, testimonial, or listing that isn't listed above.`;
}
