"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { SITE } from "@/lib/constants";

export function AboutSection() {
  return (
    <section id="om" className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="overflow-hidden rounded-3xl bg-surface-solid/95 p-4 shadow-card ring-1 ring-white/[0.06] backdrop-blur-md md:flex md:gap-8 md:p-6 lg:p-8"
      >
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl bg-black md:aspect-auto md:w-[44%] md:min-h-[280px]">
          <Image
            src="/images/vogn.png"
            alt="Sina Street Food"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 40vw"
            unoptimized
          />
        </div>
        <div className="mt-5 flex flex-1 flex-col justify-center md:mt-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent/90">
            {SITE.category}
          </p>
          <h2 className="mt-2 text-2xl font-bold leading-tight text-white md:text-3xl">
            Lokal street food{" "}
            <span className="text-accent italic">med lidenskap</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/75">
            {SITE.tagline}
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-white/70">
            {SITE.signature}
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-white/65">
            {SITE.aboutExtra}
          </p>
          <p className="mt-6 flex items-center gap-2 text-sm font-medium text-accent">
            <Heart className="h-4 w-4 fill-accent text-accent" />
            Laget med kjærlighet i Narvik
          </p>
        </div>
      </motion.div>
    </section>
  );
}
