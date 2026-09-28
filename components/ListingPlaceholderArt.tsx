// Real listing photography does not exist yet for any listing on this site (see
// status.md). Rather than substitute a stock photo — which the studio's rules forbid —
// every listing without real photos gets this designed abstract placeholder: a subtle
// brass-on-ink gradient field with a fine architectural grid line, seeded per-listing so
// a grid of cards doesn't look identical. Swap in real <Image> galleries once photos are
// supplied (see public/listings/<slug>/ + data/listings.ts).
const GRADIENTS = [
  "radial-gradient(120% 100% at 10% 0%, rgba(201,162,75,0.22), transparent 60%)",
  "radial-gradient(120% 100% at 90% 100%, rgba(201,162,75,0.22), transparent 60%)",
  "radial-gradient(120% 100% at 50% 0%, rgba(201,162,75,0.18), transparent 65%)",
  "radial-gradient(120% 100% at 0% 100%, rgba(201,162,75,0.2), transparent 60%)",
];

export default function ListingPlaceholderArt({ seed = 0 }: { seed?: number }) {
  const gradient = GRADIENTS[Math.abs(seed) % GRADIENTS.length];
  return (
    <div
      className="absolute inset-0"
      style={{ background: `${gradient}, #12141A` }}
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.08]"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id={`grid-${seed}`}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9A24B" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${seed})`} />
      </svg>
    </div>
  );
}
