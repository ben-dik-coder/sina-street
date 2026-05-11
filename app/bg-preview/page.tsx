import Image from "next/image";
import type { Metadata } from "next";
import { IMG } from "@/lib/constants";
import { HERO_BG_PRESETS } from "@/lib/hero-background-presets";

export const metadata: Metadata = {
  title: "Bakgrunn — forhåndsvisning",
  description: "Sammenlign 5 hero-overlegg for forsiden.",
  robots: "noindex, nofollow",
};

export default function BgPreviewPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/92 px-4 py-3 backdrop-blur-md md:px-8">
        <p className="text-sm font-semibold text-white">
          Forhåndsvisning · 5 bakgrunner med samme bilde
        </p>
        <p className="mt-1 text-xs text-white/60">
          Scroll ned. Si fra hvilket nummer (1–5) du vil ha, så kan vi legge det
          inn i hero.
        </p>
      </header>

      {HERO_BG_PRESETS.map((preset) => (
        <section
          key={preset.id}
          className="relative h-[72vh] min-h-[420px] w-full overflow-hidden border-b border-white/15"
          aria-label={preset.name}
        >
          <Image
            src={IMG.hero}
            alt=""
            fill
            unoptimized
            className="object-cover"
            sizes="100vw"
            priority={preset.id === "v1-neutral"}
          />
          {preset.layers.map((layer, i) => (
            <div
              key={i}
              className={`absolute inset-0 ${layer.className}`}
              style={layer.style}
              aria-hidden
            />
          ))}

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 pt-24 md:p-8 md:pt-32">
            <div className="mx-auto max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {preset.tag}
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
                {preset.name}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-white/80 md:text-base">
                {preset.description}
              </p>
              <p className="mt-3 font-mono text-[11px] text-white/45">
                id: {preset.id}
              </p>
            </div>
          </div>
        </section>
      ))}

      <footer className="border-t border-white/10 px-4 py-10 text-center text-xs text-white/45 md:px-8">
        Kun for valg av hero-look — ikke en offentlig side.
      </footer>
    </div>
  );
}
