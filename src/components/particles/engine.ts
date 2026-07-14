// Global particle engine — one canvas, ~3500 particles, retargeted per stage.

export type Hue = "snow" | "data" | "pulse" | "warn";

export type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  tsize: number;
  alpha: number;
  talpha: number;
  hue: Hue;
  vx: number;
  vy: number;
  phase: number;
};

export type LayoutFn = (particles: Particle[], w: number, h: number, t: number) => void;

const HUE_COLOR: Record<Hue, string> = {
  snow: "255,255,255",
  data: "61,169,252",
  pulse: "126,231,135",
  warn: "240,136,62",
};

function particleCount(w: number): number {
  if (w >= 1280) return 3500;
  if (w >= 768) return 2200;
  return 1400;
}

export class ParticleEngine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  particles: Particle[] = [];
  stages = new Map<string, LayoutFn>();
  activeStage: string | null = null;
  running = false;
  rafId = 0;
  time = 0;
  opacity = 1;
  targetOpacity = 1;
  w = 0;
  h = 0;
  dpr = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) throw new Error("2d context unavailable");
    this.ctx = ctx;
  }

  resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.dpr = dpr;
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = Math.floor(this.w * dpr);
    this.canvas.height = Math.floor(this.h * dpr);
    this.canvas.style.width = `${this.w}px`;
    this.canvas.style.height = `${this.h}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.ensurePool();
  };

  ensurePool() {
    const target = particleCount(this.w);
    if (this.particles.length === target) return;
    if (this.particles.length < target) {
      for (let i = this.particles.length; i < target; i++) {
        this.particles.push(this.newParticle());
      }
    } else {
      this.particles.length = target;
    }
  }

  newParticle(): Particle {
    const x = Math.random() * (this.w || 1);
    const y = Math.random() * (this.h || 1);
    return {
      x,
      y,
      tx: x,
      ty: y,
      size: 0.8,
      tsize: 0.8,
      alpha: 0.2,
      talpha: 0.6,
      hue: "snow",
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      phase: Math.random() * Math.PI * 2,
    };
  }

  registerStage(id: string, fn: LayoutFn) {
    this.stages.set(id, fn);
    if (this.activeStage === id) this.applyActive();
  }

  activate(id: string) {
    if (this.activeStage === id) return;
    this.activeStage = id;
    this.applyActive();
  }

  applyActive() {
    if (!this.activeStage) return;
    const fn = this.stages.get(this.activeStage);
    if (!fn) return;
    fn(this.particles, this.w, this.h, this.time);
  }

  setOpacity(v: number) {
    this.targetOpacity = Math.max(0, Math.min(1, v));
  }

  start() {
    if (this.running) return;
    this.running = true;
    const tick = () => {
      if (!this.running) return;
      this.time += 1 / 60;
      // Re-apply active layout for stages that want per-frame updates (charts, DAG flow)
      if (this.activeStage) {
        const fn = this.stages.get(this.activeStage);
        if (fn) fn(this.particles, this.w, this.h, this.time);
      }
      this.draw();
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  stop() {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  draw() {
    const { ctx, w, h, particles, time } = this;
    this.opacity += (this.targetOpacity - this.opacity) * 0.06;
    ctx.clearRect(0, 0, w, h);
    if (this.opacity < 0.01) return;
    ctx.globalAlpha = 1;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      // ambient drift
      p.x += p.vx + Math.sin(time + p.phase) * 0.08;
      p.y += p.vy + Math.cos(time + p.phase) * 0.08;
      // ease toward target
      p.x += (p.tx - p.x) * 0.08;
      p.y += (p.ty - p.y) * 0.08;
      p.size += (p.tsize - p.size) * 0.1;
      p.alpha += (p.talpha - p.alpha) * 0.06;

      const rgb = HUE_COLOR[p.hue];
      ctx.fillStyle = `rgba(${rgb},${(p.alpha * this.opacity).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
