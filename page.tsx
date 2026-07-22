import { notFound } from "next/navigation";
import Link from "next/link";
import { getSeasonBySlug, FAMILY_META, SEASONS } from "@/data/seasons";
import { generateNarrative } from "@/lib/narrative";

export function generateStaticParams() {
  return SEASONS.map((s) => ({ slug: s.slug }));
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const season = getSeasonBySlug(slug);
  if (!season) notFound();

  const family = FAMILY_META[season.family];
  const narrative = await generateNarrative(season);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-sm font-medium text-neutral-400 mb-2">
        {family.emoji} {season.family} family — {family.tagline}
      </p>
      <h1 className="text-4xl font-semibold tracking-tight mb-4">
        {season.name}
      </h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {season.keywords.map((k) => (
          <span
            key={k}
            className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
          >
            {k}
          </span>
        ))}
      </div>

      <section className="mb-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400 mb-3">
          Your recommended palette
        </h2>
        {season.needsReview && (
          <p className="mb-3 text-xs font-medium text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 inline-block">
            Still being refined — this palette has weaker source grounding than the others and hasn&apos;t had a colorist review pass yet.
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          {season.recommendedPalette.map((color) => (
            <div key={color.hex} className="flex flex-col items-center gap-1 w-16">
              <div
                className="h-14 w-14 rounded-full border border-black/5 shadow-sm"
                style={{ backgroundColor: color.hex }}
                title={color.estimated ? `${color.name} (estimated hex)` : color.name}
              />
              <span className="text-[11px] text-neutral-500 text-center leading-tight">
                {color.name}
                {color.estimated && <span className="text-neutral-300">*</span>}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-neutral-600">{season.styleNote}</p>
      </section>

      <section className="mb-10 rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400 mb-4">
          What we measured (diagnostic profile)
        </h2>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="font-medium text-neutral-500">PCCS tone-ring location</dt>
            <dd className="text-neutral-800">{season.pccsLocation}</dd>
          </div>
          <div>
            <dt className="font-medium text-neutral-500">Typical skin</dt>
            <dd className="text-neutral-800">{season.blueprint.skin}</dd>
          </div>
          <div>
            <dt className="font-medium text-neutral-500">Typical hair</dt>
            <dd className="text-neutral-800">{season.blueprint.hair}</dd>
          </div>
          <div>
            <dt className="font-medium text-neutral-500">Raw eye color</dt>
            <dd className="text-neutral-800">{season.blueprint.eyeColor}</dd>
          </div>
          <div>
            <dt className="font-medium text-neutral-500">Eye expression</dt>
            <dd className="text-neutral-800">{season.blueprint.eyeExpression}</dd>
          </div>
        </dl>
      </section>

      <section className="mb-10 rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400 mb-2">
          Personalized notes
        </h2>
        <p className="text-neutral-700 text-sm leading-relaxed whitespace-pre-line">
          {narrative}
        </p>
      </section>

      <Link href="/upload" className="text-sm font-medium text-neutral-500 hover:text-neutral-900">
        ← Try another photo
      </Link>
    </div>
  );
}
