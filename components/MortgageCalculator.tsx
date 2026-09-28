"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calculateMortgage } from "@/lib/mortgage";
import { formatCurrency } from "@/lib/format";
import { listings } from "@/data/listings";

const TERMS = [15, 30];

export default function MortgageCalculator({
  initialPrice,
  initialSlug,
  compact = false,
}: {
  initialPrice?: number;
  initialSlug?: string;
  compact?: boolean;
}) {
  const [selectedSlug, setSelectedSlug] = useState(initialSlug ?? "");
  const [price, setPrice] = useState(initialPrice ?? listings[0]?.price ?? 500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [term, setTerm] = useState(30);
  const [taxPercent, setTaxPercent] = useState(1.1);
  const [insurance, setInsurance] = useState(1800);
  const [hoa, setHoa] = useState(0);

  const result = useMemo(
    () =>
      calculateMortgage({
        price,
        downPaymentPercent,
        interestRatePercent: interestRate,
        termYears: term,
        annualPropertyTaxPercent: taxPercent,
        annualInsurance: insurance,
        monthlyHOA: hoa,
      }),
    [price, downPaymentPercent, interestRate, term, taxPercent, insurance, hoa]
  );

  const breakdown = [
    { label: "Principal & Interest", value: result.monthlyPrincipalAndInterest, color: "bg-brass" },
    { label: "Property Tax", value: result.monthlyTax, color: "bg-brass-dim" },
    { label: "Insurance", value: result.monthlyInsurance, color: "bg-bone/40" },
    { label: "HOA", value: result.monthlyHOA, color: "bg-bone/20" },
  ].filter((b) => b.value > 0);

  return (
    <div className={`grid gap-10 ${compact ? "" : "md:grid-cols-[1.1fr,0.9fr]"}`}>
      <div className="space-y-6">
        {!initialSlug && listings.length > 0 && (
          <Field label="Listing (optional)">
            <select
              className="field"
              value={selectedSlug}
              onChange={(e) => {
                const slug = e.target.value;
                setSelectedSlug(slug);
                const listing = listings.find((l) => l.slug === slug);
                if (listing) setPrice(listing.price);
              }}
            >
              <option value="">Custom price</option>
              {listings.map((l) => (
                <option key={l.slug} value={l.slug}>
                  {l.address} — {formatCurrency(l.price)}
                </option>
              ))}
            </select>
          </Field>
        )}

        <Field label="Home Price">
          <NumberInput value={price} onChange={setPrice} prefix="$" step={5000} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label={`Down Payment (${downPaymentPercent}%)`}>
            <input
              type="range"
              min={0}
              max={90}
              step={1}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-brass"
            />
            <div className="mt-1 text-sm text-bone/60">
              {formatCurrency(result.downPaymentAmount)}
            </div>
          </Field>

          <Field label="Interest Rate (%)">
            <NumberInput
              value={interestRate}
              onChange={setInterestRate}
              step={0.125}
              suffix="%"
            />
          </Field>
        </div>

        <Field label="Loan Term">
          <div className="flex gap-2">
            {TERMS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTerm(t)}
                className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                  term === t
                    ? "border-brass bg-brass/10 text-brass"
                    : "border-white/15 text-bone/70 hover:border-white/30"
                }`}
              >
                {t} years
              </button>
            ))}
          </div>
        </Field>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Property Tax (%/yr)">
            <NumberInput value={taxPercent} onChange={setTaxPercent} step={0.05} suffix="%" />
          </Field>
          <Field label="Insurance ($/yr)">
            <NumberInput value={insurance} onChange={setInsurance} step={100} prefix="$" />
          </Field>
          <Field label="HOA ($/mo)">
            <NumberInput value={hoa} onChange={setHoa} step={25} prefix="$" />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-brass/20 bg-gradient-to-br from-surface to-card p-8">
        <p className="section-label mb-2">Estimated Monthly Payment</p>
        <div className="font-display text-4xl text-bone md:text-5xl">
          {formatCurrency(result.totalMonthlyPayment)}
          <span className="text-lg text-bone/40">/mo</span>
        </div>

        <div className="mt-6 flex h-3 w-full overflow-hidden rounded-full bg-ink/50">
          {breakdown.map((b) => (
            <div
              key={b.label}
              className={b.color}
              style={{
                width: `${(b.value / result.totalMonthlyPayment) * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="mt-6 space-y-2 text-sm">
          {breakdown.map((b) => (
            <div key={b.label} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-bone/60">
                <span className={`h-2 w-2 rounded-full ${b.color}`} />
                {b.label}
              </span>
              <span className="text-bone/80">{formatCurrency(b.value)}</span>
            </div>
          ))}
        </div>

        <div className="hairline mt-6 pt-6 text-sm text-bone/60">
          <div className="flex items-center justify-between">
            <span>Loan Amount</span>
            <span className="text-bone/80">{formatCurrency(result.loanAmount)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span>Total Interest ({term} yr)</span>
            <span className="text-bone/80">{formatCurrency(result.totalInterestPaid)}</span>
          </div>
        </div>

        <p className="mt-6 text-xs text-bone/35">
          Estimate for planning purposes only — not a loan offer. Actual rate, taxes,
          and insurance will vary; a lender will confirm your exact payment.
        </p>

        <Link
          href={`/contact${selectedSlug ? `?interest=${selectedSlug}` : ""}`}
          className="btn-primary mt-6 w-full"
        >
          Discuss This Number
        </Link>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-widest2 text-bone/50">
        {label}
      </span>
      {children}
    </label>
  );
}

function NumberInput({
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
}: {
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
}) {
  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-bone/40">
          {prefix}
        </span>
      )}
      <input
        type="number"
        className={`field ${prefix ? "pl-8" : ""} ${suffix ? "pr-8" : ""}`}
        value={value}
        step={step}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
      {suffix && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-bone/40">
          {suffix}
        </span>
      )}
    </div>
  );
}
