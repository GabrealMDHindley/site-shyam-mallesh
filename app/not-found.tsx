import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="section-label mb-4">404</p>
      <h1 className="font-display text-4xl text-bone md:text-5xl">
        This page doesn't exist.
      </h1>
      <Link href="/" className="btn-primary mt-8">
        Back Home
      </Link>
    </div>
  );
}
