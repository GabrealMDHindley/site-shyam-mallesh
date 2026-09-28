import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import MortgageCalculator from "@/components/MortgageCalculator";

export const metadata: Metadata = {
  title: "Mortgage Calculator",
  description: "Estimate your monthly payment on any listing.",
};

export default function CalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-36 md:px-10 md:pt-44">
      <ScrollReveal>
        <p className="section-label mb-4">Plan Your Purchase</p>
        <h1 className="font-display text-4xl text-bone md:text-6xl">
          Mortgage Calculator
        </h1>
        <p className="mt-4 max-w-xl text-bone/70">
          Model a real monthly payment — pick a listing or enter your own numbers.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.12}>
        <div className="mt-14">
          <MortgageCalculator />
        </div>
      </ScrollReveal>
    </div>
  );
}
