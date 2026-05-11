"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Flame, Utensils } from "lucide-react";
import { IMG, SITE } from "@/lib/constants";
import { useMenuBook } from "@/components/MenuBookOpener";

const dishes = [
  {
    name: "GO2 Signature Burger",
    badge: "bestseller" as const,
    desc: "Saftig storfe, cheddar, bacon, salat, løk, hjemmelaget dressing.",
    price: "189,-",
    img: IMG.dishBurger,
  },
  {
    name: "Crispy Salmon Roll",
    badge: "spicy" as const,
    desc: "Laks, agurk, avokado, crunchy topping, spicy mayo, teriyakisaus.",
    price: "189,-",
    img: "/images/roll.png",
  },
  {
    name: "Pepperoni Pizza",
    desc: "Tomatsaus, mozzarella, pepperoni, paprika, løk.",
    price: "179,-",
    img: IMG.dishPizza,
  },
  {
    name: "Loaded Fries",
    desc: "Sprøstekte fries med cheddar, bacon, jalapeños og aioli.",
    price: "89,-",
    img: IMG.dishFries,
  },
] as const;

export function PopularDishes() {
  const { openMenuBook } = useMenuBook();

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
        Populære retter
      </h2>
      <div className="mt-6 flex flex-col gap-4">
        {dishes.map((d, i) => (
          <motion.article
            key={d.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex gap-4 rounded-3xl bg-surface-solid/90 p-3 pr-4 shadow-card ring-1 ring-white/[0.06] backdrop-blur-md md:gap-5"
          >
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl md:h-32 md:w-32">
              <Image
                src={d.img}
                alt={d.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 112px, 128px"
                unoptimized={d.img.startsWith("/")}
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-base font-bold text-white md:text-lg">
                  {d.name}
                </h3>
                {"badge" in d && d.badge === "bestseller" ? (
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent ring-1 ring-accent/30">
                    Bestselger
                  </span>
                ) : null}
                {"badge" in d && d.badge === "spicy" ? (
                  <Flame
                    className="h-4 w-4 shrink-0 text-red-500"
                    aria-label="Sterk"
                  />
                ) : null}
              </div>
              <p className="line-clamp-2 text-sm leading-relaxed text-white/65">
                {d.desc}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end justify-between py-1">
              <span className="text-base font-bold tabular-nums text-accent">
                {d.price}
              </span>
              <motion.a
                href={SITE.phoneHref}
                whileTap={{ scale: 0.92 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-black shadow-lift"
                aria-label={`Bestill ${d.name} — ring ${SITE.phoneDisplay}`}
              >
                <Plus className="h-5 w-5" strokeWidth={2.5} />
              </motion.a>
            </div>
          </motion.article>
        ))}
      </div>
      <motion.button
        type="button"
        whileTap={{ scale: 0.99 }}
        onClick={() => openMenuBook()}
        className="mt-8 flex w-full min-h-[52px] items-center justify-center gap-2 rounded-3xl border border-accent/60 bg-black/40 py-3 text-sm font-bold uppercase tracking-wide text-accent shadow-card backdrop-blur-md transition hover:bg-accent/10"
      >
        <Utensils className="h-4 w-4" />
        Se hele menyen
      </motion.button>
    </section>
  );
}
