import { notFound } from "next/navigation";
import Link from "next/link";
import { getSeasonBySlug, FAMILY_META, SEASONS } from "@/data/seasons";

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
          Your palette (placeholder — not your final recommended colors yet)
        </h2>
        <div className="flex gap-3">
          {season.placeholderPalette.map((hex) => (
            <div key={hex} className="flex flex-col items-center gap-1">
              <div
                className="h-14 w-14 rounded-full border border-black/5 shadow-sm"
                style={{ backgroundColor: hex }}
              />
              <span className="text-xs text-neutral-400">{hex}</span>
            </div>
          ))}
        </div>
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

      <section className="mb-10 rounded-xl border border-dashed border-neutral-300 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400 mb-2">
          Personalized notes — placeholder
        </h2>
        <p className="text-neutral-600 text-sm leading-relaxed">
          This is where the LLM-written narrative will go once wired up: a
          few warm sentences explaining why {season.name.toLowerCase()} colors
          work for this profile, plus 2–3 styling tips. Not generated yet —
          this text is a stand-in so the layout is complete.
        </p>
      </section>

      <Link href="/upload" className="text-sm font-medium text-neutral-500 hover:text-neutral-900">
        ← Try another photo
      </Link>
    </div>
  );
}
