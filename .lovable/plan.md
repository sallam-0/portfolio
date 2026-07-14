# Ahmed Sallam — Data Engineer Portfolio

A single-page, dark, particle-driven scroll narrative built on this project's TanStack Start + React 19 + Tailwind v4 stack (spec adapted from Next.js). Portrait photo received — will be used for the hero particle mosaic.

## Sections (one route: `/`, top → bottom)

1. **Hero** — particle mosaic of Ahmed's portrait crystallizes from chaos. Name, role, tagline ("I turn scattered signals into trustworthy systems."), View Work + Get in Touch CTAs, top-right nav, scroll hint.
2. **Ingest** — particles pulse in from 4–6 edge "source nodes."
3. **Validate** — loose clusters form; failed particles fade orange (`warn`).
4. **Quality** — left→right sweep tightens clusters, clean clusters pulse green.
5. **Transform** — particles snap into a grid; column-reshuffle wave.
6. **Orchestrate** — DAG of 5–7 nodes with particles flowing along edges.
7. **Serve** — particle pie chart (left) + particle line chart (right), slow rotation, live-data ripple.
8. **Projects** — separate banner canvas + horizontal tool-logo marquee + DE/DA project cards (spec placeholder data).
9. **Principles** — 6 cards (ACID, CAP, Idempotency, Schema Evolution, Lineage, Observability) with CSS-orbiting tech icons.
10. **Footer** — GitHub / LinkedIn / Email, back-to-top, credit line.

Sticky right-edge **stage indicator** (01–06) tracks scroll through stages 1–6.

## Design system

- Palette added as CSS variables in `src/styles.css`, exposed as Tailwind tokens: `void #000`, `ink #0a0a0a`, `ash #141414`, `fog #8a8a8a`, `mist #c9c9c9`, `snow #fff`, `data #3da9fc`, `pulse #7ee787`, `warn #f0883e`.
- Fonts Inter + JetBrains Mono via `<link>` in `__root.tsx` head (Tailwind v4 requires `<link>`, not `@import` for remote URLs).
- Dark-only.

## Particle engine

- One fixed global `<canvas>` (`position: fixed; inset: 0; z-index: 1; pointer-events: none`).
- Object-pooled particles: 3,500 desktop / 2,200 tablet / 1,400 mobile.
- Per-frame: ambient drift + sinusoidal wobble + lerp toward the active stage's target layout (factor 0.08).
- Each stage registers a `(w, h) => targets[]` function; an IntersectionObserver picks the active stage and swaps targets, so particles physically flow between formations.
- Portrait sampling: draw uploaded portrait to an offscreen canvas, sample every Nth pixel (N=4/5/6) with alpha ≥ 50, map luminance→size and alpha→alpha, cache as `portraitTargets`.
- Canvas fades out at end of Serve; a smaller separate banner canvas drives Projects.
- `prefers-reduced-motion`: skip canvas, render static fallback (photo hero, 6 static stage cards, inline-SVG pie + line, then projects/principles/footer).

## Motion / scroll

- Motion (Framer Motion successor) for DOM reveals — hero text fade, card stagger, stage-panel entrances. No GSAP needed; the engine's own IntersectionObserver handles ScrollTrigger's role.
- No pinning; sections are normal scroll content, canvas is fixed.

## Routing / SEO

- Single route `/` (`src/routes/index.tsx`) — the long-scrolling-page exception per route-architecture rules; hash anchors OK for in-page nav.
- Update `__root.tsx` head: title "Ahmed Sallam — Data Engineer", matching description, og:*, twitter:card. Set og:image on `index.tsx` head (not root) using a generated cover.
- Semantic HTML: single `<h1>` in hero, each stage in `<section>` with `<h2>`, `aria-live="polite"` for active-stage announcement, `aria-hidden` canvases, sr-only `<dl>` fallback for Serve charts.

## Portrait asset

The uploaded PNG (Black_White.png) will be registered via `lovable-assets` from `/mnt/user-uploads/`, imported as an asset pointer, and used both by the particle sampler and the reduced-motion static fallback.

## Files to add

```
src/routes/index.tsx                          (rewrite: composes all sections)
src/routes/__root.tsx                         (edit: head + fonts <link>)
src/styles.css                                (edit: palette tokens)
src/components/particles/engine.ts            (pool, tick loop, stage registry)
src/components/particles/ParticleCanvas.tsx
src/components/particles/stages.ts            (6 layout fns + portrait sampler)
src/components/particles/ProjectsBanner.tsx   (separate banner canvas)
src/components/hero/Hero.tsx
src/components/stages/StageSection.tsx        (shared layout for DOM overlays)
src/components/stages/StageIndicator.tsx     (sticky right rail)
src/components/stages/{Ingest,Validate,Quality,Transform,Orchestrate,Serve}.tsx
src/components/projects/Projects.tsx
src/components/projects/ProjectCard.tsx
src/components/principles/Principles.tsx
src/components/principles/PrincipleCard.tsx  (CSS orbit)
src/components/Nav.tsx
src/components/Footer.tsx
src/components/icons/tech/*.tsx              (~20 inline SVG tech logos)
src/data/projects.ts                          (spec placeholder DE + DA lists)
src/data/tech.ts                              (tool metadata)
src/data/principles.ts
src/hooks/useReducedMotion.ts
src/hooks/useActiveStage.ts
src/assets/portrait.png.asset.json           (CDN pointer to uploaded photo)
src/assets/og-cover.jpg                       (generated social card)
```

## Content

- Copy per spec §7 (stages) and §11 (principles) verbatim.
- Projects: 4 spec-placeholder cards (2 DE / 2 DA) — real content to be filled in later. Placeholder thumbnails generated as simple architecture-diagram style images.
- Links: GitHub `sallam-0`, LinkedIn `ahmedsallam109`, `ahmed@yourdomain.com` (placeholder), resume `/resume.pdf` (placeholder).

## Performance

- Dynamic import of engine module so first paint doesn't wait on it.
- Canvas paused on `visibilitychange` and when Projects fully in view.
- Two canvases max active; banner pauses off-screen.
- Reduced-motion static fallback.

## Out of scope (per spec §17)

Blog, light-mode toggle, i18n, contact form, analytics.
