"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SEASONS } from "@/data/seasons";

export default function UploadPage() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [slug, setSlug] = useState(SEASONS[0].slug);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/results/${slug}`);
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight mb-2">
        Upload a photo
      </h1>
      <p className="text-neutral-600 mb-8">
        This step doesn&apos;t run real color analysis yet — the photo is just
        stored for later. For now, pick a season below to preview what a
        result page looks like.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Your photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="block w-full text-sm text-neutral-600 file:mr-4 file:rounded-full file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
          />
          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Preview"
              className="mt-4 h-40 w-40 rounded-lg object-cover border border-neutral-200"
            />
          )}
        </div>

        <div>
          <label
            htmlFor="season"
            className="block text-sm font-medium mb-2"
          >
            Placeholder result (stands in for real analysis)
          </label>
          <select
            id="season"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
          >
            {SEASONS.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.family} — {s.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-neutral-900 text-white py-3 text-sm font-medium hover:bg-neutral-700 transition-colors"
        >
          See result
        </button>
      </form>
    </div>
  );
}
