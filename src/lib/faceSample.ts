// Client-side face detection + pixel sampling. Runs entirely in the user's
// browser — the photo is never uploaded anywhere. Uses Google's MediaPipe
// Face Landmarker (@mediapipe/tasks-vision), loaded from Google's public
// model CDN the first time it's needed (not bundled into the app, so it
// never touches GitHub file-size limits).
//
// This file only answers one question: "given this photo, what color is
// the skin, the hair, and the eyes?" It knows nothing about seasons —
// that's classifySeason.ts's job. Keeping these separate mirrors the same
// measurement/writing split the rest of this app already uses.

import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";
import type { RGB } from "./colorScience";

// Pinned to the exact version installed in package.json (see
// node_modules/@mediapipe/tasks-vision/package.json) — the WASM runtime and
// the JS wrapper need to match, so this must be bumped any time that
// package is upgraded.
const WASM_BASE = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task";

// Well-documented indices into MediaPipe's 478-point face mesh (the extra
// 10 points beyond the base 468 are the iris points added when iris
// refinement is on, which Face Landmarker enables by default).
const LANDMARK = {
  leftCheek: 50,
  rightCheek: 280,
  leftIrisCenter: 468,
  rightIrisCenter: 473,
  foreheadTop: 10, // topmost point the mesh itself reaches
  chin: 152,
};

let landmarkerPromise: Promise<FaceLandmarker> | null = null;

function getLandmarker(): Promise<FaceLandmarker> {
  if (!landmarkerPromise) {
    landmarkerPromise = (async () => {
      const vision = await FilesetResolver.forVisionTasks(WASM_BASE);
      return FaceLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: MODEL_URL },
        runningMode: "IMAGE",
        numFaces: 1,
      });
    })();
  }
  return landmarkerPromise;
}

export interface FaceSampleResult {
  faceFound: boolean;
  skin: RGB;
  hair: RGB;
  eye: RGB;
}

const NEUTRAL_GREY: RGB = { r: 150, g: 150, b: 150 };

// Average the pixels in a small square around (x, y), in normalized [0,1]
// image coordinates as MediaPipe returns them.
function samplePatch(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  nx: number,
  ny: number,
  radius = 6
): RGB {
  const cx = Math.round(nx * width);
  const cy = Math.round(ny * height);
  const x0 = Math.max(0, cx - radius);
  const y0 = Math.max(0, cy - radius);
  const w = Math.min(width - x0, radius * 2);
  const h = Math.min(height - y0, radius * 2);
  if (w <= 0 || h <= 0) return NEUTRAL_GREY;

  const { data } = ctx.getImageData(x0, y0, w, h);
  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }
  if (count === 0) return NEUTRAL_GREY;
  return { r: r / count, g: g / count, b: b / count };
}

export async function sampleFaceColors(
  image: HTMLImageElement
): Promise<FaceSampleResult> {
  const landmarker = await getLandmarker();
  const result = landmarker.detect(image);

  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    return { faceFound: false, skin: NEUTRAL_GREY, hair: NEUTRAL_GREY, eye: NEUTRAL_GREY };
  }
  ctx.drawImage(image, 0, 0);

  const landmarks = result.faceLandmarks?.[0];
  if (!landmarks || landmarks.length < 478) {
    return { faceFound: false, skin: NEUTRAL_GREY, hair: NEUTRAL_GREY, eye: NEUTRAL_GREY };
  }

  const width = canvas.width;
  const height = canvas.height;

  const leftCheek = landmarks[LANDMARK.leftCheek];
  const rightCheek = landmarks[LANDMARK.rightCheek];
  const leftIris = landmarks[LANDMARK.leftIrisCenter];
  const rightIris = landmarks[LANDMARK.rightIrisCenter];
  const forehead = landmarks[LANDMARK.foreheadTop];
  const chin = landmarks[LANDMARK.chin];

  const skinPatchRadius = Math.max(4, Math.round(width * 0.015));
  const skinA = samplePatch(ctx, width, height, leftCheek.x, leftCheek.y, skinPatchRadius);
  const skinB = samplePatch(ctx, width, height, rightCheek.x, rightCheek.y, skinPatchRadius);
  const skin: RGB = {
    r: (skinA.r + skinB.r) / 2,
    g: (skinA.g + skinB.g) / 2,
    b: (skinA.b + skinB.b) / 2,
  };

  const irisPatchRadius = Math.max(2, Math.round(width * 0.006));
  const eyeA = samplePatch(ctx, width, height, leftIris.x, leftIris.y, irisPatchRadius);
  const eyeB = samplePatch(ctx, width, height, rightIris.x, rightIris.y, irisPatchRadius);
  const eye: RGB = {
    r: (eyeA.r + eyeB.r) / 2,
    g: (eyeA.g + eyeB.g) / 2,
    b: (eyeA.b + eyeB.b) / 2,
  };

  // No landmark sits inside the hair itself — the mesh stops at the
  // forehead/hairline transition. Estimate a hair-sampling point by going
  // further up by a fraction of the face's own height (forehead-to-chin),
  // which lands inside the hair/hairline area for most head-on, shoulders-up
  // photos. This is a heuristic, not a measurement — it's the single
  // biggest source of error in this whole feature (see the README caveat),
  // most likely to misfire on very short hair, hats, or headwear pulled low.
  const faceHeight = Math.max(0.05, chin.y - forehead.y);
  const hairY = Math.max(0, forehead.y - faceHeight * 0.45);
  const hairPatchRadius = Math.max(6, Math.round(width * 0.02));
  const hair = samplePatch(ctx, width, height, forehead.x, hairY, hairPatchRadius);

  return { faceFound: true, skin, hair, eye };
}
