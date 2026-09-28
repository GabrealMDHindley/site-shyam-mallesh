// Styled static fallback — rendered while the 3D scene lazy-loads, when WebGL is
// unavailable, or when the visitor has prefers-reduced-motion set. Never a blank hero.
export default function HeroFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(60% 50% at 50% 40%, rgba(201,162,75,0.16), transparent 70%), radial-gradient(80% 60% at 80% 90%, rgba(201,162,75,0.08), transparent 70%)",
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "rgba(201,162,75,0.10)" }}
      />
    </div>
  );
}
