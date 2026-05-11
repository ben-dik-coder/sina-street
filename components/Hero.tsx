"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Phone,
  MapPin,
  Star,
  X,
  Home,
  BookOpen,
  Users,
  PhoneCall,
} from "lucide-react";
import { Logo } from "./Logo";
import { IMG, SITE } from "@/lib/constants";
import { getLiveOpeningBadge } from "@/lib/opening-hours";

const NAV_LINKS = [
  { href: "#hjem", label: "Hjem", Icon: Home },
  { href: "#meny", label: "Meny", Icon: BookOpen },
  { href: "#om", label: "Om oss", Icon: Users },
  { href: "#kontakt", label: "Kontakt", Icon: PhoneCall },
] as const;

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoursBadge, setHoursBadge] = useState<ReturnType<
    typeof getLiveOpeningBadge
  > | null>(null);

  useEffect(() => {
    setHoursBadge(getLiveOpeningBadge());
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <header id="hjem" className="relative min-h-[100svh] overflow-hidden md:min-h-[min(100svh,900px)]">
      <div className="absolute inset-0">
        <Image
          src={IMG.hero}
          alt=""
          fill
          priority
          unoptimized
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col px-2 pb-28 pt-[env(safe-area-inset-top)] md:min-h-[min(100svh,900px)] md:px-6 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative z-[102] flex w-full items-center justify-between gap-3 px-0 py-1"
        >
          <Logo />
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobil-meny"
            aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-black/45 text-white shadow-card backdrop-blur-md transition hover:bg-white/15 active:scale-95 sm:h-10 sm:w-10"
          >
            {menuOpen ? (
              <X className="h-4 w-4" strokeWidth={2.25} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={2} />
            )}
          </button>
        </motion.div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              key="mobil-meny-root"
              className="fixed inset-0 z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                type="button"
                className="absolute inset-0 bg-black/75 backdrop-blur-sm"
                aria-label="Lukk meny"
                onClick={() => setMenuOpen(false)}
              />
              <motion.nav
                id="mobil-meny"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 34 }}
                className="absolute right-0 top-0 flex h-[100dvh] w-[min(100vw,18rem)] flex-col border-l border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="border-b border-white/10 px-4 py-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                    Meny
                  </p>
                </div>
                <ul className="flex flex-col gap-1 p-3">
                  {NAV_LINKS.map(({ href, label, Icon }) => (
                    <li key={href}>
                      <a
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 rounded-2xl px-3 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        <Icon className="h-5 w-5 text-accent" strokeWidth={2} />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto border-t border-white/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                  <a
                    href={SITE.phoneHref}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-accent py-3 text-sm font-bold text-black"
                  >
                    <Phone className="h-4 w-4" strokeWidth={2.5} />
                    Ring oss
                  </a>
                </div>
              </motion.nav>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-10 flex flex-1 flex-col justify-end md:mt-0 md:justify-center md:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="max-w-xl"
          >
            <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              Street food{" "}
              <span className="text-accent italic">i Narvik</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">
              Burgere, sushi, pizza og mer laget ferskt med gode råvarer, hver
              dag.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-white/90">
              <Star
                className="h-4 w-4 fill-accent text-accent"
                aria-hidden
              />
              <span>
                <span className="font-semibold text-white">{SITE.rating}</span>
                <span className="text-white/70">
                  {" "}
                  ({SITE.reviewCount} anmeldelser på Google)
                </span>
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <motion.a
                whileTap={{ scale: 0.97 }}
                href={SITE.phoneHref}
                className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-orange-600 px-6 text-sm font-bold uppercase tracking-wide text-black shadow-lift md:flex-none"
              >
                <Phone className="h-4 w-4" strokeWidth={2.25} />
                Ring oss
              </motion.a>
              <motion.a
                whileTap={{ scale: 0.97 }}
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full border border-white/35 bg-black/35 px-6 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-md md:flex-none"
              >
                <MapPin className="h-4 w-4" strokeWidth={2.25} />
                Veibeskrivelse
              </motion.a>
            </div>

            <div className="mt-8 flex items-center justify-between gap-3 rounded-3xl glass-strong px-4 py-3 shadow-card md:max-w-md">
              <div className="flex min-w-0 items-center gap-2">
                {hoursBadge?.status === "open" ? (
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                ) : hoursBadge ? (
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/30" />
                ) : null}
                <div className="min-w-0">
                  <span
                    className={`block text-xs font-bold uppercase tracking-wide ${
                      hoursBadge?.status === "open"
                        ? "text-emerald-400"
                        : hoursBadge
                          ? "text-amber-400/95"
                          : "text-white/50"
                    }`}
                  >
                    {hoursBadge?.line1 ?? "Åpningstider"}
                  </span>
                  <span className="block truncate text-sm font-semibold text-white">
                    {hoursBadge?.line2 ?? "Se detaljer"}
                  </span>
                </div>
              </div>
              <a
                href="#kontakt"
                className="shrink-0 text-xs font-semibold text-white/90 transition hover:text-white"
              >
                Se åpningstider ›
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
