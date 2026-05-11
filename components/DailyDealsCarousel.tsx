"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IMG, SITE } from "@/lib/constants";

const deals = [
  {
    id: "family",
    title: "Family Combo",
    desc: "2 burgere, 1 pizza, 2 fries og 1,5 L drikke",
    price: "499,-",
    img: IMG.familyCombo,
  },
  {
    id: "lunch",
    title: "Lunsjpakke",
    desc: "Valgfri wrap + fries + drikke",
    price: "159,-",
    img: IMG.dishBurger,
  },
  {
    id: "sushi",
    title: "Sushi for to",
    desc: "16 biter + miso + drikke",
    price: "349,-",
    img: IMG.dishSushi,
  },
] as const;

export function DailyDealsCarousel() {
  const [idx, setIdx] = useState(0);
  const deal = deals[idx];

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
        Dagens deals
      </h2>
      <div className="relative mt-6 overflow-hidden rounded-[1.75rem] bg-surface-solid shadow-lift ring-1 ring-white/[0.06]">
        <div className="relative aspect-[4/3] w-full md:aspect-[21/9]">
          <AnimatePresence mode="wait">
            <motion.div
              key={deal.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <Image
                src={deal.img}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20 md:bg-gradient-to-r md:from-black md:via-black/50 md:to-transparent" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-6 md:left-0 md:top-0 md:max-w-lg md:justify-center md:p-10">
            <p className="text-xl font-bold text-white md:text-2xl">
              {deal.title}
            </p>
            <p className="text-sm text-white/75 md:text-base">{deal.desc}</p>
            <p className="text-3xl font-black tabular-nums text-accent md:text-4xl">
              {deal.price}
            </p>
            <motion.a
              href={SITE.phoneHref}
              whileTap={{ scale: 0.98 }}
              className="mt-2 inline-flex min-h-[42px] w-fit items-center justify-center rounded-full bg-white px-7 text-sm font-bold text-black shadow-card"
            >
              Bestill nå
            </motion.a>
          </div>
        </div>
        <div className="flex justify-center gap-2 pb-5 pt-1">
          {deals.map((deal, i) => (
            <button
              key={deal.id}
              type="button"
              onClick={() => setIdx(i)}
              className={`h-2 w-2 rounded-full transition ${
                i === idx ? "bg-accent" : "bg-white/25"
              }`}
              aria-label={`Deal ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
