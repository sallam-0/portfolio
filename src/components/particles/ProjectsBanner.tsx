import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type BannerParticle = {
  x: number; y: number; vx: number; size: number; alpha: number; hue: string;
};

const HUES = [
  "rgba(255,255,255,",
  "rgba(255,255,255,",
  "rgba(255,255,255,",
  "rgba(61,169,252,",
  "rgba(126,231,135,",
];

export function ProjectsBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let particles: BannerParticle[] = [];
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w >= 1280 ? 600 : w >= 768 ? 450 : 320;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0.4 + Math.random() * 1.2,
        size: 0.4 + Math.random() * 0.8,
        alpha: 0.15 + Math.random() * 0.4,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
      }));
    };

    const tick = () => {
      if (!running) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        if (p.x > w + 4) p.x = -4;
        ctx.fillStyle = `${p.hue}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !running) {
            running = true; tick();
          } else if (!e.isIntersecting && running) {
            running = false; cancelAnimationFrame(raf);
          }
        }
      },
      { rootMargin: "50px" },
    );
    io.observe(canvas);
    window.addEventListener("resize", resize);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) {
    return <div className="h-16 w-full border-y border-ash bg-ink/50" aria-hidden="true" />;
  }
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="block h-16 w-full md:h-20"
    />
  );
}
