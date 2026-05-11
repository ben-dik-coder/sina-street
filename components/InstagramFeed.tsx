"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMG, SITE } from "@/lib/constants";

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const shots = [IMG.ig1, IMG.ig2, IMG.ig3, IMG.ig4] as const;

export function InstagramFeed() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
        Finn oss på Instagram
      </h2>
      <div className="no-scrollbar -mx-4 mt-6 flex gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0">
        {shots.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="relative aspect-square w-[26vw] shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10 md:w-auto"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 26vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
          </motion.div>
        ))}
      </div>
      <motion.a
        href={SITE.instagram}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.99 }}
        className="mt-6 flex w-full min-h-[52px] items-center justify-center gap-2 rounded-3xl border border-accent/60 bg-black/40 py-3 text-sm font-bold uppercase tracking-wide text-accent backdrop-blur-md transition hover:bg-accent/10"
      >
        <InstagramGlyph className="h-4 w-4" />
        {SITE.instagramHandle}
      </motion.a>
    </section>
  );
}
