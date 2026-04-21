import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 text-center md:px-8 md:py-16">
      <h1 className="text-3xl font-semibold leading-tight md:text-6xl">Product not found</h1>
      <Link
        href="/"
        className="mt-6 inline-flex h-11 items-center rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-900"
      >
        Back to Shop
      </Link>
    </div>
  );
}
