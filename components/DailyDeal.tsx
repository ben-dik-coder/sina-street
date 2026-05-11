"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMG, SITE } from "@/lib/constants";

export function DailyDeal() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-10 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[1.75rem] glass shadow-lift md:flex md:min-h-[220px] md:items-stretch"
      >
        <div className="relative z-10 flex flex-1 flex-col justify-center gap-3 p-6 md:max-w-[52%] md:p-8 lg:p-10">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">
            Dagens deal
          </p>
          <h3 className="text-2xl font-bold leading-tight text-white md:text-3xl">
            Burger + fries + valgfri drikke
          </h3>
          <p className="text-3xl font-black tabular-nums text-accent md:text-4xl">
            199,-
          </p>
          <div>
            <motion.a
              href={SITE.phoneHref}
              whileTap={{ scale: 0.98 }}
              className="mt-2 inline-flex min-h-[42px] items-center justify-center rounded-full bg-white px-7 text-sm font-bold text-black shadow-card"
            >
              Bestill nå
            </motion.a>
          </div>
        </div>
        <div className="relative h-52 w-full md:absolute md:right-0 md:top-0 md:h-full md:w-[48%]">
          <Image
            src={IMG.dealBurger}
            alt=""
            fill
            className="object-cover object-center md:object-right"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.88)] via-transparent to-transparent md:from-black/80" />
        </div>
      </motion.div>
    </section>
  );
}
