"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Beef, Fish, Pizza, Sparkles } from "lucide-react";
import { IMG } from "@/lib/constants";

const cats = [
  { key: "burger", label: "Burgere", img: IMG.burgerCat, Icon: Beef },
  { key: "sushi", label: "Sushi", img: IMG.sushiCat, Icon: Fish },
  { key: "pizza", label: "Pizza", img: IMG.pizzaCat, Icon: Pizza },
  { key: "combo", label: "Combo", img: IMG.comboCat, Icon: Sparkles },
] as const;

export function MenuCategories() {
  return (
    <section id="meny" className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
        Utforsk menyen
      </h2>
      <div className="no-scrollbar -mx-4 mt-6 flex gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0">
        {cats.map((c, i) => (
          <motion.button
            key={c.key}
            type="button"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="group relative h-40 w-[42vw] shrink-0 overflow-hidden rounded-3xl shadow-card md:h-48 md:w-auto"
          >
            <Image
              src={c.img}
              alt=""
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 42vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 pb-4 pt-8">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-accent ring-1 ring-accent/40 backdrop-blur-sm">
                <c.Icon className="h-4 w-4" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                {c.label}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
