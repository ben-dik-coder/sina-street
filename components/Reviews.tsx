"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/constants";

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-label="Google">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function ReviewCardContent({
  name,
  when,
  text,
  avatar,
}: (typeof REVIEWS)[number]) {
  return (
    <>
      <div className="mb-4 flex items-start gap-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/40">
          <Image
            src={avatar}
            alt=""
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-white">{name}</p>
              <p className="text-xs text-white/45">{when}</p>
            </div>
            <GoogleMark />
          </div>
          <div className="mt-2 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-accent text-accent"
                aria-hidden
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-[15px] leading-relaxed text-white/85">{text}</p>
    </>
  );
}

export function Reviews() {
  const [active, setActive] = useState(0);
  const r = REVIEWS[active];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
        Hva folk sier
      </h2>

      {/* Mobil: ett kort med prikker */}
      <div className="mt-6 md:hidden">
        <motion.div
          key={r.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden rounded-3xl bg-surface-solid/90 p-5 shadow-card ring-1 ring-white/[0.06] backdrop-blur-md"
        >
          <ReviewCardContent {...r} />
          <div className="mt-5 flex justify-center gap-2">
            {REVIEWS.map((review, i) => (
              <button
                key={review.id}
                type="button"
                onClick={() => setActive(i)}
                className={`h-2 w-2 rounded-full transition ${
                  i === active ? "bg-accent" : "bg-white/25"
                }`}
                aria-label={`Vis anmeldelse ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* PC / tablet: tre kolonner */}
      <div className="mt-6 hidden gap-5 md:grid md:grid-cols-3">
        {REVIEWS.map((review) => (
          <motion.article
            key={review.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-surface-solid/90 p-6 shadow-card ring-1 ring-white/[0.06] backdrop-blur-md"
          >
            <ReviewCardContent {...review} />
          </motion.article>
        ))}
      </div>

      <motion.a
        href="https://www.google.com/maps/search/?api=1&query=Sina+Street+Food+Narvik"
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.99 }}
        className="mt-6 flex w-full min-h-[52px] items-center justify-center gap-2 rounded-3xl border border-accent/60 bg-black/40 py-3 text-sm font-bold uppercase tracking-wide text-accent backdrop-blur-md transition hover:bg-accent/10"
      >
        <Star className="h-4 w-4 fill-accent text-accent" />
        Se flere anmeldelser
      </motion.a>
    </section>
  );
}
