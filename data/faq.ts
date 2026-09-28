// General FAQ content the chatbot can draw on. Generic, factual, non-agent-specific
// guidance — safe to publish without any confirmed facts about this specific agent.

export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: "What does a real estate advisor do that an app or listing site can't?",
    answer:
      "Pricing strategy, negotiation, contract and contingency management, coordinating inspections and financing timelines, and representing your interests directly — not just surfacing listings.",
  },
  {
    question: "How does the mortgage calculator on this site work?",
    answer:
      "It estimates a monthly principal-and-interest payment from the home price, your down payment, interest rate, and loan term, and can add estimated property taxes, homeowner's insurance, and HOA dues. It's an estimate for planning purposes, not a loan offer — a lender will confirm your actual rate and payment.",
  },
  {
    question: "Do I need to be pre-approved before touring homes?",
    answer:
      "It's strongly recommended. A pre-approval letter clarifies your real budget and makes any offer you submit far more competitive in a fast-moving market.",
  },
  {
    question: "What's the difference between a listing price and what I'll actually pay monthly?",
    answer:
      "The listing price is the purchase price. Your monthly payment depends on your down payment, loan rate and term, plus property taxes, homeowner's insurance, and any HOA dues — use the calculator on this site to model your specific numbers.",
  },
  {
    question: "How do I get in touch?",
    answer:
      "Use the contact form on the Contact page with what you're looking for (buying, selling, or investing) and, if relevant, which listing caught your eye — that goes straight through to Shyam.",
  },
];
