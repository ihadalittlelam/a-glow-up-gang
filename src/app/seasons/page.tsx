import Link from "next/link";
import { SEASONS, FAMILY_META } from "@/data/seasons";

export default function SeasonsGalleryPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight mb-2">
        All 16 seasons
      </h1>
      <p className="text-neutral-600 mb-10">
        QA view — every season profile at a glance, so it&apos;s easy to spot
        a typo or a missing field.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SEASONS.map((s) => (
          <Link
            key={s.slug}
            href={`/results/${s.slug}`}
            className="rounded-xl border border-neutral-200 bg-white p-4 hover:border-neutral-400 transition-colors"
          >
            <div className="text-xs font-medium text-neutral-400 mb-1">
              {FAMILY_META[s.family].emoji} {s.family}
            </div>
            <div className="font-semibold mb-2 flex items-center gap-2">
              {s.name}
              {s.needsReview && (
                <span className="text-[10px] font-medium text-amber-600 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
                  needs review
                </span>
              )}
            </div>
            <div className="flex gap-1">
              {s.recommendedPalette.map((color) => (
                <span
                  key={color.hex}
                  className="h-5 w-5 rounded-full border border-black/5"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
