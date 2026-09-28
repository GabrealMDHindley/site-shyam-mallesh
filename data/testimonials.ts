// Real client testimonials only — no placeholder or invented quotes. The testimonials
// section on the home page renders nothing at all while this array is empty; add real,
// permissioned quotes here and the section appears automatically.

export type Testimonial = {
  quote: string;
  name: string;
  context?: string; // e.g. "Buyer, Downtown Condo"
};

export const testimonials: Testimonial[] = [];
