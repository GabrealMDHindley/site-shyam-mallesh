"use client";

import { useState } from "react";
import { listings } from "@/data/listings";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ initialInterest = "" }: { initialInterest?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      interest: (form.elements.namedItem("interest") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-brass/30 bg-surface p-10 text-center">
        <p className="font-display text-2xl text-brass">Message sent.</p>
        <p className="mt-3 text-bone/70">
          Thank you — you'll hear back shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest2 text-bone/50">
            Name
          </label>
          <input name="name" required className="field" placeholder="Jane Doe" />
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest2 text-bone/50">
            Phone
          </label>
          <input name="phone" className="field" placeholder="(555) 555-5555" />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-widest2 text-bone/50">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          className="field"
          placeholder="jane@email.com"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-widest2 text-bone/50">
          I'm interested in
        </label>
        <select name="interest" defaultValue={initialInterest} className="field">
          <option value="">General inquiry</option>
          <option value="buying">Buying a home</option>
          <option value="selling">Selling a home</option>
          <option value="investing">Investing</option>
          {listings.map((l) => (
            <option key={l.slug} value={l.slug}>
              Listing — {l.address}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-widest2 text-bone/50">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="field resize-none"
          placeholder="Tell me a bit about what you're looking for..."
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
