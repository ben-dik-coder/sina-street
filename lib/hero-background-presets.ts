/**
 * Forside (hero) — overlegg over bakgrunnsbildet.
 * Brukes i `/bg-preview` til å sammenligne; én variant kan flyttes inn i `Hero.tsx`.
 */

import type { CSSProperties } from "react";

/** Svak papir-/film-grain (samme idé som permen) — kun til rustiske varianter */
export const HERO_GRAIN_STYLE = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
} as const;

export type HeroOverlayLayer = {
  className: string;
  style?: CSSProperties;
};

export type HeroBgPreset = {
  id: string;
  name: string;
  tag: string;
  description: string;
  layers: HeroOverlayLayer[];
};

export const HERO_BG_PRESETS: HeroBgPreset[] = [
  {
    id: "v1-neutral",
    name: "1 · Klassisk film (som nå)",
    tag: "Nøytral mørk",
    description:
      "Svart gradient — samme type som i dag. Trygg, mye kontrast mot oransje knapper.",
    layers: [
      {
        className:
          "bg-gradient-to-b from-black/70 via-black/45 to-black",
      },
    ],
  },
  {
    id: "v2-crimson",
    name: "2 · Dyp rød skjær",
    tag: "Rød tone",
    description:
      "Helhetsfilter med burgunder/rød — som om lyset i lokalet har rød tone.",
    layers: [
      {
        className:
          "bg-gradient-to-b from-black/72 via-red-950/40 to-[#1a0707]",
      },
      {
        className:
          "bg-[radial-gradient(ellipse_90%_55%_at_30%_20%,rgba(220,38,38,0.12),transparent_50%)]",
      },
    ],
  },
  {
    id: "v3-ember",
    name: "3 · Glød fra under",
    tag: "Rød glød nede",
    description:
      "Mørk øverst, varm rød som stiger fra under — «steke/glød»-følelse.",
    layers: [
      {
        className: "bg-gradient-to-b from-black/78 via-black/55 to-black",
      },
      {
        className:
          "bg-[radial-gradient(ellipse_130%_60%_at_50%_115%,rgba(220,38,38,0.5),transparent_55%)]",
      },
      {
        className:
          "bg-[radial-gradient(ellipse_80%_45%_at_50%_0%,rgba(0,0,0,0.35),transparent_45%)]",
      },
    ],
  },
  {
    id: "v4-timber",
    name: "4 · Rustikk varmbrun",
    tag: "Tre / kafe",
    description:
      "Varm brun stein- og tretoner — rolig, «håndlaget», ikke rød.",
    layers: [
      {
        className:
          "bg-gradient-to-b from-stone-900/76 via-amber-950/38 to-[#0d0a07]",
      },
      {
        className:
          "bg-[radial-gradient(ellipse_at_center,rgba(120,53,15,0.18),transparent_62%)]",
      },
      {
        className: "opacity-[0.07] mix-blend-overlay pointer-events-none",
        style: HERO_GRAIN_STYLE,
      },
    ],
  },
  {
    id: "v5-sepia",
    name: "5 · Rustikk sepia + tekstur",
    tag: "Gammelt kjøkken",
    description:
      "Sepia/brun med lett papirgrain — myk, retro gatekjøkken-stemning.",
    layers: [
      {
        className:
          "bg-gradient-to-br from-[#2e2118]/82 via-[#16100c]/88 to-[#050403]",
      },
      {
        className:
          "bg-[radial-gradient(ellipse_85%_50%_at_50%_-5%,rgba(251,191,36,0.08),transparent_52%)]",
      },
      {
        className:
          "bg-gradient-to-t from-black/55 via-transparent to-amber-950/15",
      },
      {
        className: "opacity-[0.11] mix-blend-overlay pointer-events-none",
        style: HERO_GRAIN_STYLE,
      },
    ],
  },
];
