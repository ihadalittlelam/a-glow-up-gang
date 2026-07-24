"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SEASONS, getSeasonBySlug } from "@/data/seasons";

type Status =
  | { phase: "idle" }
  | { phase: "analyzing" }
  | { phase: "detected"; confidence: number; alternates: { slug: string; name: string; confidence: number }[] }
  | { phase: "no-face" }
  | { phase: "error" };

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export default function UploadPage() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [slug, setSlug] = useState(SEASONS[0].slug);
  const [status, setStatus] = useState<Status>({ phase: "idle" });

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setStatus({ phase: "analyzing" });

    try {
      // Loaded dynamically so the (fairly large) detection model only ever
      // downloads when someone actually uploads a photo, not on every page
      // load, and never during the server-side build.
      const [{ sampleFaceColors }, { classifySeason }] = await Promise.all([
        import("@/lib/faceSample"),
        import("@/lib/classifySeason"),
      ]);

      const image = await loadImage(file);
      const { faceFound, skin, hair, eye } = await sampleFaceColors(image);

      if (!faceFound) {
        setStatus({ phase: "no-face" });
        return;
      }

      const result = classifySeason(skin, hair, eye);
      setSlug(result.best.season.slug);
      setStatus({
        phase: "detected",
        confidence: result.best.confidence,
        alternates: result.alternates.map((a) => ({
          slug: a.season.slug,
          name: a.season.name,
          confidence: a.confidence,
        })),
      });
    } catch (err) {
      console.error("Photo analysis failed:", err);
      setStatus({ phase: "error" });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/results/${slug}`);
  }

  const detectedSeason = getSeasonBySlug(slug);

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight mb-2">
        Upload a photo
      </h1>
      <p className="text-neutral-600 mb-2">
        Your photo is analyzed right in your browser — it&apos;s never uploaded
        or stored anywhere. For the most accurate read: face the camera
        straight on, use natural daylight (no filters or warm/cool lighting
        presets), and pull hair away from your forehead and cheeks.
      </p>
      <p className="text-xs text-neutral-400 mb-8">
        This is an automated estimate, not a professional colorist&apos;s
        judgment — lighting and camera color can shift the result, so treat
        it as a strong starting guess and adjust below if it doesn&apos;t feel
        right.
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

        {status.phase === "analyzing" && (
          <p className="text-sm text-neutral-500 animate-pulse">
            Analyzing your photo — the first photo on a visit takes a little
            longer while the analysis model loads...
          </p>
        )}

        {status.phase === "no-face" && (
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            We couldn&apos;t clearly find a face in that photo, so we can&apos;t
            auto-detect your season from it. Try a clearer, front-facing
            photo, or just pick your season manually below.
          </p>
        )}

        {status.phase === "error" && (
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            Something went wrong running the analysis in your browser (this
            can happen on an unsupported browser or a very slow connection
            loading the model). Pick your season manually below instead.
          </p>
        )}

        {status.phase === "detected" && detectedSeason && (
          <div className="text-sm bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-3">
            <p className="text-emerald-800">
              Our best guess:{" "}
              <span className="font-semibold">{detectedSeason.name}</span>{" "}
              <span className="text-emerald-600">
                ({status.confidence}% confidence)
              </span>
            </p>
            {status.alternates.length > 0 && (
              <p className="text-emerald-700 text-xs mt-1">
                Close alternates: {status.alternates.map((a) => `${a.name} (${a.confidence}%)`).join(", ")}
              </p>
            )}
          </div>
        )}

        <div>
          <label
            htmlFor="season"
            className="block text-sm font-medium mb-2"
          >
            {status.phase === "detected" ? "Confirm or change your season" : "Or pick your season manually"}
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
