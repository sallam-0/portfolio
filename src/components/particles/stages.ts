import portraitAsset from "@/assets/portrait.png.asset.json";
import type { LayoutFn, Particle } from "./engine";

// ---------- PORTRAIT SAMPLER ----------

type PortraitSample = {
  x: number; // normalized 0..1
  y: number;
  size: number;
  alpha: number;
};

let portraitCache: PortraitSample[] | null = null;
let portraitPromise: Promise<PortraitSample[]> | null = null;

function sampleImage(img: HTMLImageElement): PortraitSample[] {
  // Crop to the face region: top 60% of image (skip dark blazer/body below)
  const cropTop = 0.02; // shave off top empty space
  const cropBottom = 0.62; // stop at neck/chin
  const srcX = 0;
  const srcY = Math.floor(img.height * cropTop);
  const srcW = img.width;
  const srcH = Math.floor(img.height * cropBottom) - srcY;

  // High resolution to generate a dense candidate grid
  const maxSide = 400; 
  const scale = Math.min(1, maxSide / Math.max(srcW, srcH));
  const w = Math.floor(srcW * scale);
  const h = Math.floor(srcH * scale);
  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const octx = off.getContext("2d", { willReadFrequently: true });
  if (!octx) throw new Error("no ctx");
  // Draw only the cropped face region
  octx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, w, h);
  const data = octx.getImageData(0, 0, w, h).data;
  
  const N = 2; // tighter sampling step
  
  // 8x8 Bayer matrix for ordered dithering (spatial uniformity)
  const bayer = [
     0, 32,  8, 40,  2, 34, 10, 42,
    48, 16, 56, 24, 50, 18, 58, 26,
    12, 44,  4, 36, 14, 46,  6, 38,
    60, 28, 52, 20, 62, 30, 54, 22,
     3, 35, 11, 43,  1, 33,  9, 41,
    51, 19, 59, 27, 49, 17, 57, 25,
    15, 47,  7, 39, 13, 45,  5, 37,
    63, 31, 55, 23, 61, 29, 53, 21
  ];

  const samples: (PortraitSample & { score: number })[] = [];
  for (let y = 0; y < h; y += N) {
    for (let x = 0; x < w; x += N) {
      const i = (y * w + x) * 4;
      const a = data[i + 3];
      if (a < 60) continue; // skip transparent pixels
      
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      
      // Skip near-white background pixels for cleaner silhouette
      if (lum > 0.92 && a < 255) continue;
      
      const bx = (x / N) % 8;
      const by = (y / N) % 8;
      const bayerVal = bayer[by * 8 + bx] / 64;
      
      // Score: pure ordered dithering (halftone). 
      // We no longer heavily penalize bright pixels, ensuring the fully lit 
      // side of the face still gets particles. We add a tiny random jitter 
      // to break ties evenly across the image.
      const score = bayerVal + (Math.random() * 0.015);

      // Darker pixels = larger, more opaque particles
      // Brighter pixels = smaller, fainter particles (so the lit side is visible but subtle)
      const size = 0.8 + (1 - lum) * 1.4;
      const alpha = 0.3 + (1 - lum) * 0.7;
      samples.push({ x: x / w, y: y / h, size, alpha, score });
    }
  }
  
  if (samples.length === 0) throw new Error("No opaque pixels found in image.");
  
  // Sorting by Bayer score guarantees a perfectly distributed halftone grid
  // across the ENTIRE face, so no parts are missing.
  samples.sort((a, b) => a.score - b.score);
  
  return samples;
}

function tryLoadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load: ${src}`));
    img.src = src;
  });
}

export function loadPortraitSamples(): Promise<PortraitSample[]> {
  if (portraitCache) return Promise.resolve(portraitCache);
  if (portraitPromise) return portraitPromise;
  // Try CDN asset URL first, then fall back to local public/portrait.png
  portraitPromise = tryLoadImage(portraitAsset.url)
    .catch(() => tryLoadImage("/portrait.png"))
    .then((img) => {
      const samples = sampleImage(img);
      portraitCache = samples;
      return samples;
    });
  return portraitPromise;
}

// ---------- LAYOUT FACTORIES ----------

function assignHueDrift(p: Particle, hue: Particle["hue"], vx = 0, vy = 0) {
  p.hue = hue;
  p.vx = vx + (Math.random() - 0.5) * 0.08;
  p.vy = vy + (Math.random() - 0.5) * 0.08;
}

/** HERO: sample portrait into right side of viewport (or centered on mobile). */
export function makeHeroLayout(samples: PortraitSample[]): LayoutFn {
  return (particles, w, h) => {
    const isMobile = w < 768;
    // portrait height — fit comfortably within the viewport
    const boxH = Math.min(h * 0.70, 650);
    // samples aspect ratio
    const first = samples[0];
    if (!first) return;
    // recover aspect from bounds
    let minX = 1, maxX = 0, minY = 1, maxY = 0;
    for (const s of samples) {
      if (s.x < minX) minX = s.x; if (s.x > maxX) maxX = s.x;
      if (s.y < minY) minY = s.y; if (s.y > maxY) maxY = s.y;
    }
    const spanX = maxX - minX || 1;
    const spanY = maxY - minY || 1;
    const boxW = (boxH * spanX) / spanY;
    // On desktop: position portrait in the right half; on mobile: center
    const cx = isMobile ? w / 2 : w * 0.65;
    const cy = h / 2 + h * 0.02;
    const originX = cx - boxW / 2;
    const originY = cy - boxH / 2;

    // Since samples are pre-shuffled, we just take the first N samples.
    // This gives a uniform random distribution without wavy aliasing patterns.
    const count = Math.min(particles.length, samples.length);

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const s = samples[i];
      const nx = (s.x - minX) / spanX;
      const ny = (s.y - minY) / spanY;
      p.tx = originX + nx * boxW + (Math.random() - 0.5) * 1.2;
      p.ty = originY + ny * boxH + (Math.random() - 0.5) * 1.2;
      p.tsize = s.size;
      p.talpha = s.alpha;
      assignHueDrift(p, "snow", 0, 0);
      p.vx *= 0.2;
      p.vy *= 0.2;
    }
    // any leftover particles (more particles than samples): scatter dim
    for (let i = count; i < particles.length; i++) {
      const p = particles[i];
      p.tx = Math.random() * w;
      p.ty = Math.random() * h;
      p.tsize = 0.4;
      p.talpha = 0.05;
    }
  };
}

/** INGEST: 5 edge source nodes emit rightward-drifting particles. */
export const ingestLayout: LayoutFn = (particles, w, h) => {
  const sources = [
    { x: 0, y: h * 0.18, hue: "data" as const },
    { x: 0, y: h * 0.62, hue: "pulse" as const },
    { x: w, y: h * 0.3, hue: "snow" as const },
    { x: w, y: h * 0.8, hue: "data" as const },
    { x: w * 0.5, y: 0, hue: "snow" as const },
  ];
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const src = sources[i % sources.length];
    // spread across full viewport with a bias toward source's row
    p.tx = Math.random() * w;
    p.ty = src.y + (Math.random() - 0.5) * h * 0.35;
    p.ty = Math.max(0, Math.min(h, p.ty));
    p.tsize = 0.5 + Math.random() * 1.5;
    p.talpha = 0.25 + Math.random() * 0.55;
    const towardCenterX = src.x < w / 2 ? 0.4 : -0.4;
    assignHueDrift(p, src.hue, towardCenterX, 0);
  }
};

/** VALIDATE: cluster into groups of 3–8, ~15% turn warn and fade. */
export const validateLayout: LayoutFn = (particles, w, h) => {
  const clusterCount = 60;
  const clusters: { x: number; y: number }[] = [];
  for (let i = 0; i < clusterCount; i++) {
    clusters.push({
      x: w * 0.1 + Math.random() * w * 0.8,
      y: h * 0.15 + Math.random() * h * 0.7,
    });
  }
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const c = clusters[i % clusterCount];
    const isReject = Math.random() < 0.12;
    p.tx = c.x + (Math.random() - 0.5) * 30;
    p.ty = c.y + (Math.random() - 0.5) * 30;
    if (isReject) {
      p.tx += (Math.random() - 0.5) * 200;
      p.ty += (Math.random() - 0.5) * 200;
      p.tsize = 0.6;
      p.talpha = 0.08;
      assignHueDrift(p, "warn", 0.3, 0);
    } else {
      p.tsize = 0.7 + Math.random() * 0.6;
      p.talpha = 0.5 + Math.random() * 0.3;
      assignHueDrift(p, i % 7 === 0 ? "data" : "snow", 0.15, 0);
    }
  }
};

/** QUALITY: tight clusters, sweep line moves across, cleans pulse green. */
export const qualityLayout: LayoutFn = (particles, w, h, t) => {
  const clusterCount = 45;
  const sweepX = ((t * 0.15) % 1.4 - 0.2) * w; // sweep 0..w with margin
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    // deterministic per-particle cluster position based on index
    const ci = i % clusterCount;
    const cx = w * 0.08 + ((ci * 137.5) % (w * 0.84));
    const cy = h * 0.15 + ((ci * 89.3) % (h * 0.7));
    p.tx = cx + Math.sin(i * 12.9898) * 14;
    p.ty = cy + Math.cos(i * 78.233) * 14;
    p.tsize = 0.7 + ((i * 13) % 6) * 0.1;
    p.talpha = 0.55;
    const isNearSweep = Math.abs(p.tx - sweepX) < 60;
    if (isNearSweep) {
      p.talpha = 0.9;
      p.hue = "pulse";
    } else {
      p.hue = "snow";
    }
    p.vx = 0.02;
    p.vy = 0;
  }
};

/** TRANSFORM: snap into grid; a wave reshuffles columns. */
export const transformLayout: LayoutFn = (particles, w, h, t) => {
  const cols = w >= 1024 ? 20 : 14;
  const rows = 12;
  const gridW = Math.min(w * 0.86, 1100);
  const gridH = Math.min(h * 0.7, 620);
  const originX = (w - gridW) / 2;
  const originY = (h - gridH) / 2;
  const cellW = gridW / cols;
  const cellH = gridH / rows;
  const per = Math.max(1, Math.floor(particles.length / (cols * rows)));
  const waveCol = Math.floor(((t * 0.9) % (cols + 2)));
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const cell = Math.floor(i / per);
    const cx = cell % cols;
    const cy = Math.floor(cell / cols) % rows;
    let ox = originX + cx * cellW + cellW / 2;
    let oy = originY + cy * cellH + cellH / 2;
    if (cx === waveCol) {
      ox += Math.sin(t * 4 + cy) * 20;
      oy += Math.cos(t * 4 + cy) * 8;
    }
    p.tx = ox + (Math.sin(i * 3.1) * cellW * 0.35);
    p.ty = oy + (Math.cos(i * 5.7) * cellH * 0.35);
    p.tsize = 0.7;
    p.talpha = 0.55;
    p.hue = cx === waveCol ? "data" : "snow";
    p.vx = 0;
    p.vy = 0;
  }
};

/** ORCHESTRATE: Left-to-right acyclic DAG; particles flow along directed edges. */
export const orchestrateLayout: LayoutFn = (particles, w, h, t) => {
  // 5-layer left-to-right DAG layout
  const dagW = Math.min(w * 0.76, 900);
  const dagH = Math.min(h * 0.52, 380);
  const originX = (w - dagW) / 2;
  const cy = h / 2;

  // Nodes arranged in layers (left → right)
  // Layer 0: Source (A)
  // Layer 1: Fork (B, C)
  // Layer 2: Merge (D)
  // Layer 3: Branch (E, F)
  // Layer 4: Sink (G)
  const layerX = (layer: number) => originX + (layer / 4) * dagW;
  const nodes = [
    { x: layerX(0), y: cy },                        // 0: A — Source
    { x: layerX(1), y: cy - dagH * 0.35 },          // 1: B — top fork
    { x: layerX(1), y: cy + dagH * 0.35 },          // 2: C — bottom fork
    { x: layerX(2), y: cy },                        // 3: D — merge
    { x: layerX(3), y: cy - dagH * 0.3 },           // 4: E — top branch
    { x: layerX(3), y: cy + dagH * 0.3 },           // 5: F — bottom branch
    { x: layerX(4), y: cy },                        // 6: G — sink
  ];

  // All edges flow strictly left → right (acyclic)
  const edges: [number, number][] = [
    [0, 1], [0, 2],   // Source fans out
    [1, 3], [2, 3],   // Both merge into D
    [3, 4], [3, 5],   // D fans out to E, F
    [4, 6], [5, 6],   // E, F converge to sink
  ];

  const perNode = 35;
  const totalNodeParticles = nodes.length * perNode;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    if (i < totalNodeParticles) {
      // Particles forming node clusters
      const nodeIdx = Math.floor(i / perNode);
      const n = nodes[nodeIdx];
      const angle = ((i % perNode) / perNode) * Math.PI * 2;
      const r = 12 + (i % 4) * 3.5;
      p.tx = n.x + Math.cos(angle) * r;
      p.ty = n.y + Math.sin(angle) * r;
      p.tsize = 0.95;
      p.talpha = 0.8;
      // Color coding: source=data, sink=pulse, middle=snow
      if (nodeIdx === 0) p.hue = "data";
      else if (nodeIdx === 6) p.hue = "pulse";
      else p.hue = "snow";
    } else {
      // Particles flowing along edges (left → right)
      const ei = (i - totalNodeParticles) % edges.length;
      const [a, b] = edges[ei];
      const na = nodes[a], nb = nodes[b];
      const speed = 0.3;
      const phase = ((i * 0.013) + t * speed) % 1;
      p.tx = na.x + (nb.x - na.x) * phase;
      p.ty = na.y + (nb.y - na.y) * phase;
      p.tsize = 0.65;
      p.talpha = 0.45;
      p.hue = "data";
    }
    p.vx = 0;
    p.vy = 0;
  }
};

/** SERVE: pie chart (left) + line chart (right). */
export const serveLayout: LayoutFn = (particles, w, h, t) => {
  const isMobile = w < 768;
  const leftCx = isMobile ? w / 2 : w * 0.28;
  const leftCy = isMobile ? h * 0.3 : h / 2;
  const rightCx = isMobile ? w / 2 : w * 0.72;
  const rightCy = isMobile ? h * 0.75 : h / 2;
  const pieR = Math.min(isMobile ? w * 0.32 : w * 0.16, 210);
  const chartW = Math.min(isMobile ? w * 0.7 : w * 0.32, 460);
  const chartH = Math.min(isMobile ? h * 0.22 : h * 0.4, 260);

  const sectors = [0.25, 0.2, 0.18, 0.15, 0.12, 0.1];
  const sectorHues: Particle["hue"][] = ["data", "snow", "pulse", "data", "snow", "warn"];
  const rot = t * 0.1;
  const half = Math.floor(particles.length / 2);

  // Pie
  const totalPieCount = half;
  let cursor = 0;
  for (let s = 0; s < sectors.length; s++) {
    const count = Math.floor(totalPieCount * sectors[s]);
    const a0 = sectors.slice(0, s).reduce((sum, v) => sum + v, 0) * Math.PI * 2 + rot;
    const a1 = a0 + sectors[s] * Math.PI * 2;
    for (let k = 0; k < count && cursor < half; k++, cursor++) {
      const p = particles[cursor];
      const frac = k / count;
      const angle = a0 + (a1 - a0) * ((k * 7 % count) / count);
      // radial density: outer denser (frac based on k index)
      const r = pieR * (0.15 + Math.pow(frac, 0.5) * 0.85);
      p.tx = leftCx + Math.cos(angle) * r;
      p.ty = leftCy + Math.sin(angle) * r;
      p.tsize = 0.7;
      p.talpha = 0.6;
      p.hue = sectorHues[s];
      p.vx = 0; p.vy = 0;
    }
  }
  while (cursor < half) {
    const p = particles[cursor++];
    p.tx = leftCx; p.ty = leftCy;
    p.tsize = 0.4; p.talpha = 0.1; p.hue = "snow"; p.vx = 0; p.vy = 0;
  }

  // Line: 10 points, sinusoidal-ish
  const pts = 10;
  const values = [0.35, 0.55, 0.4, 0.7, 0.55, 0.85, 0.6, 0.9, 0.75, 0.95];
  const bob = Math.sin(t * 3) * 0.02;
  const originX = rightCx - chartW / 2;
  const originY = rightCy + chartH / 2;
  const rem = particles.length - half;
  const lineCount = Math.floor(rem * 0.6);
  const areaCount = rem - lineCount;

  // Line points
  for (let i = 0; i < lineCount; i++) {
    const p = particles[half + i];
    const t01 = i / (lineCount - 1);
    const idx = t01 * (pts - 1);
    const i0 = Math.floor(idx);
    const i1 = Math.min(pts - 1, i0 + 1);
    const frac = idx - i0;
    const v = values[i0] * (1 - frac) + values[i1] * frac + bob;
    const px = originX + t01 * chartW;
    const py = originY - v * chartH;
    p.tx = px + (Math.sin(i * 12.3) * 1.5);
    p.ty = py + (Math.cos(i * 4.1) * 1.5);
    p.tsize = 0.85;
    p.talpha = 0.85;
    p.hue = "data";
    p.vx = 0; p.vy = 0;
  }
  // Area fill (sparse below line)
  for (let i = 0; i < areaCount; i++) {
    const p = particles[half + lineCount + i];
    const t01 = Math.random();
    const idx = t01 * (pts - 1);
    const i0 = Math.floor(idx);
    const i1 = Math.min(pts - 1, i0 + 1);
    const frac = idx - i0;
    const v = values[i0] * (1 - frac) + values[i1] * frac + bob;
    const px = originX + t01 * chartW;
    const yFloor = originY;
    const yTop = originY - v * chartH;
    const py = yTop + Math.random() * (yFloor - yTop);
    p.tx = px;
    p.ty = py;
    p.tsize = 0.5;
    p.talpha = 0.15 + Math.random() * 0.2;
    p.hue = "data";
    p.vx = 0; p.vy = 0;
  }
};
