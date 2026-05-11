"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Coins, type LucideIcon } from "lucide-react";
import { OPENING_WEEK, SITE } from "@/lib/constants";

const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
  SITE.address
)}&output=embed`;

function OpeningHoursBlock() {
  return (
    <div className="space-y-1.5">
      <p className="font-medium text-white/95">Åpningstider</p>
      <ul className="space-y-1 text-[13px] leading-snug text-white/75">
        {OPENING_WEEK.map((row) => (
          <li key={row.day} className="flex justify-between gap-6">
            <span className="text-white/55">{row.day}</span>
            <span className="text-right font-medium tabular-nums text-white/90">
              {row.hours}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-[11px] text-white/45">
        Tider kan avvike på helligdager (f.eks. Kristi himmelfartsdag og
        grunnlovsdag).
      </p>
    </div>
  );
}

export function LocationSection() {
  const rows: {
    id: string;
    Icon: LucideIcon;
    node: ReactNode;
  }[] = [
    {
      id: "address",
      Icon: MapPin,
      node: <span className="font-medium">{SITE.address}</span>,
    },
    {
      id: "phone",
      Icon: Phone,
      node: (
        <a href={SITE.phoneHref} className="font-medium hover:text-accent">
          {SITE.phoneDisplay}
        </a>
      ),
    },
    {
      id: "hours",
      Icon: Clock,
      node: <OpeningHoursBlock />,
    },
    {
      id: "price",
      Icon: Coins,
      node: (
        <span className="font-medium">
          Prisnivå ca. {SITE.priceRangeKr} kr
        </span>
      ),
    },
  ];

  return (
    <section id="kontakt" className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
        Finn oss
      </h2>
      <p className="mt-2 text-sm text-white/55">
        I bakgården på Kongensgate — samme hus som go2grill-skiltet du ser på
        bildene våre.
      </p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-6 overflow-hidden rounded-3xl ring-1 ring-white/[0.08] shadow-lift"
      >
        <div className="relative aspect-[16/11] w-full bg-zinc-900 md:aspect-[21/9]">
          <iframe
            title="Kart"
            src={mapEmbed}
            className="absolute inset-0 h-full w-full brightness-[0.55] contrast-[1.05] saturate-[0.85]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/35" />
          <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-black shadow-lift">
            <MapPin className="h-3.5 w-3.5" />
            Kongensgate 57
          </div>
        </div>
      </motion.div>

      <ul className="mt-6 flex flex-col gap-5">
        {rows.map((row) => (
          <li key={row.id} className="flex gap-3 text-sm text-white/90">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center self-start rounded-2xl bg-accent/12 text-accent ring-1 ring-accent/25">
              <row.Icon className="h-4 w-4" strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1 pt-1.5">{row.node}</div>
          </li>
        ))}
      </ul>

      <motion.a
        href={SITE.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.99 }}
        className="mt-8 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-3xl border border-accent/60 bg-black/40 py-3 text-sm font-bold uppercase tracking-wide text-accent backdrop-blur-md transition hover:bg-accent/10"
      >
        <MapPin className="h-4 w-4" />
        Veibeskrivelse
      </motion.a>
    </section>
  );
}
