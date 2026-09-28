// Single source of truth for agent/brand facts.
// The chatbot's system prompt (lib/systemPrompt.ts) reads this file directly, so any
// edit here is what visitors get from the AI agent on the very next chat message.
//
// IMPORTANT: keep every field either real or explicitly empty. Never fill a blank with
// an invented fact (years of experience, deal count, phone number, etc.) — an empty
// field simply hides that UI element until real data is added.

export const site = {
  agentName: "Shyam Mallesh",
  title: "Real Estate Advisor",
  brokerage: "", // fill in once confirmed
  licenseLine: "", // e.g. "DRE #01234567" — fill in once confirmed
  phone: "", // leave blank until confirmed real
  email: "", // leave blank until confirmed real
  officeAddress: "",
  serviceAreas: [] as string[],

  tagline: "Private guidance for the decisions that matter most.",

  bio: [
    "Shyam Mallesh advises clients through one of the largest financial decisions they will make, bringing a private-advisory approach to buying, selling, and investing in real estate.",
    "The focus is straightforward: understand what a client actually needs, do the work quietly and precisely, and let the results speak. Every conversation starts with listening — every recommendation is grounded in the specifics of the client's situation, not a script.",
    "Whether the goal is a primary residence, an investment property, or a commercial move, the same standard applies — clear numbers, honest timelines, and no pressure.",
  ],

  socials: {
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    tiktok: "",
  },

  crmWebhookConfigured: false, // flips true once CRM_WEBHOOK_URL is set in Vercel env
} as const;

export type Site = typeof site;
