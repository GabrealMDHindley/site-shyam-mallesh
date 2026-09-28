"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const links = [
  { href: "/listings", label: "Listings" },
  { href: "/calculator", label: "Calculator" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-expo ${
        scrolled
          ? "bg-ink/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="font-display text-lg tracking-wide text-bone hover:text-brass transition-colors duration-300"
        >
          {site.agentName}
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm font-medium text-bone/80 transition-colors duration-300 hover:text-brass"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/contact" className="btn-primary hidden md:inline-flex">
          Start a Conversation
        </Link>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-bone transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-bone transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-ink px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-5">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-bone/90"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 w-full"
              >
                Start a Conversation
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
