import { useEffect, useRef } from "react";
import { ParticleEngine } from "./engine";
import {
  ingestLayout,
  loadPortraitSamples,
  makeHeroLayout,
  orchestrateLayout,
  qualityLayout,
  serveLayout,
  transformLayout,
  validateLayout,
} from "./stages";
import { useActiveStage } from "@/hooks/useActiveStage";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ParticleEngine | null>(null);
  const activeStage = useActiveStage();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = new ParticleEngine(canvas);
    engineRef.current = engine;
    engine.resize();

    // Register non-hero stages immediately
    engine.registerStage("ingest", ingestLayout);
    engine.registerStage("validate", validateLayout);
    engine.registerStage("quality", qualityLayout);
    engine.registerStage("transform", transformLayout);
    engine.registerStage("orchestrate", orchestrateLayout);
    engine.registerStage("serve", serveLayout);

    // Initial scatter for smooth chaos -> portrait
    for (const p of engine.particles) {
      p.tx = Math.random() * engine.w;
      p.ty = Math.random() * engine.h;
      p.tsize = 0.6;
      p.talpha = 0.15;
    }
    engine.activate("hero");
    engine.start();

    // Load portrait then register hero layout
    loadPortraitSamples()
      .then((samples) => {
        engine.registerStage("hero", makeHeroLayout(samples));
        if (engine.activeStage === "hero") engine.applyActive();
      })
      .catch(() => {
        // fall back: hero = scattered particles on the right side
        engine.registerStage("hero", (particles, w, h) => {
          const isMobile = w < 768;
          const cx = isMobile ? w / 2 : w * 0.65;
          const cy = h / 2;
          const r = Math.min(w, h) * 0.28;
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const a = (i / particles.length) * Math.PI * 2;
            const rr = r * (0.3 + Math.random() * 0.7);
            p.tx = cx + Math.cos(a) * rr + (Math.random() - 0.5) * r * 0.4;
            p.ty = cy + Math.sin(a) * rr + (Math.random() - 0.5) * r * 0.4;
            p.tsize = 0.5 + Math.random() * 0.8; p.talpha = 0.3 + Math.random() * 0.3; p.hue = "snow";
          }
        });
        if (engine.activeStage === "hero") engine.applyActive();
      });

    const onResize = () => engine.resize();
    window.addEventListener("resize", onResize);
    const onVis = () => {
      if (document.hidden) engine.stop();
      else engine.start();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      engine.stop();
    };
  }, [reduced]);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.activate(activeStage);
    // Fade out canvas over projects/principles/footer
    engine.setOpacity(1);
  }, [activeStage]);

  // Also fade out when scrolled past serve
  useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      const engine = engineRef.current;
      if (!engine) return;
      const projects = document.getElementById("projects");
      if (!projects) return;
      const rect = projects.getBoundingClientRect();
      const vh = window.innerHeight;
      // Start fading when projects top enters bottom third
      if (rect.top < vh * 0.6) {
        const t = Math.max(0, Math.min(1, 1 - (rect.top / (vh * 0.6))));
        engine.setOpacity(1 - t);
      } else {
        engine.setOpacity(1);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  if (reduced) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1]"
    />
  );
}
