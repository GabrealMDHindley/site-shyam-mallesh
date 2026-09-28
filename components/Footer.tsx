import Link from "next/link";
import { site } from "@/data/site";

const socialEntries = Object.entries(site.socials).filter(([, url]) => url);

export default function Footer() {
  return (
    <footer className="hairline bg-ink px-6 py-14 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="font-display text-xl text-bone">{site.agentName}</div>
          <p className="mt-2 text-sm text-bone/60">{site.tagline}</p>
          {site.licenseLine && (
            <p className="mt-4 text-xs text-bone/40">{site.licenseLine}</p>
          )}
          {site.brokerage && (
            <p className="mt-1 text-xs text-bone/40">{site.brokerage}</p>
          )}
        </div>

        <div className="flex gap-12">
          <div>
            <div className="section-label mb-4">Explore</div>
            <ul className="space-y-2 text-sm text-bone/70">
              <li>
                <Link href="/listings" className="hover:text-brass">
                  Listings
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-brass">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brass">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brass">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {socialEntries.length > 0 && (
            <div>
              <div className="section-label mb-4">Follow</div>
              <ul className="space-y-2 text-sm text-bone/70">
                {socialEntries.map(([key, url]) => (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="capitalize hover:text-brass"
                    >
                      {key}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl text-xs text-bone/30">
        © {new Date().getFullYear()} {site.agentName}. All rights reserved.
      </div>
    </footer>
  );
}
