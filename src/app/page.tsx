import Link from "next/link";
import { FAMILY_META, SeasonFamily } from "@/data/seasons";

const FAMILIES: SeasonFamily[] = ["Spring", "Summer", "Autumn", "Winter"];

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium text-neutral-400 mb-2">
        Skeleton build — step 1 of the product
      </p>
      <h1 className="text-4xl font-semibold tracking-tight mb-4">
        Find your color season
      </h1>
      <p className="text-lg text-neutral-600 max-w-xl mb-8">
        A 16-season, PCCS-mapped color analysis — more precise than the usual
        4-season quiz. Upload a photo to see your season, your palette, and
        personalized styling notes.
      </p>
      <Link
        href="/upload"
        className="inline-flex items-center justify-center rounded-full bg-neutral-900 text-white px-6 py-3 text-sm font-medium hover:bg-neutral-700 transition-colors"
      >
        Try it now
      </Link>

      <div className="mt-16 grid grid-cols-2 gap-4">
        {FAMILIES.map((family) => (
          <div
            key={family}
            className="rounded-xl border border-neutral-200 bg-white p-5"
          >
            <div className="text-2xl mb-1">{FAMILY_META[family].emoji}</div>
            <div className="font-semibold">{family}</div>
            <div className="text-sm text-neutral-500">
              {FAMILY_META[family].tagline}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
