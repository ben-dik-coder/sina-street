"use client";

import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Beef,
  Fish,
  Pizza,
  Sparkles,
  Phone,
  X,
} from "lucide-react";
import { SITE } from "@/lib/constants";

type MenuBookContextValue = {
  openMenuBook: () => void;
};

const MenuBookContext = createContext<MenuBookContextValue | null>(null);

const MENY_KATEGORIER = [
  { label: "Burgere", Icon: Beef },
  { label: "Sushi", Icon: Fish },
  { label: "Pizza", Icon: Pizza },
  { label: "Combo", Icon: Sparkles },
] as const;

/** Perm som «blar» — litt raskere så den matcher meny-timing */
const COVER_SPRING = {
  type: "spring" as const,
  stiffness: 58,
  damping: 24,
  mass: 0.65,
};

const MENU_STAGGER_SPRING = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
};

/** Når meny-listen vises — ekstra lang pause så permen får scenen */
const MENU_REVEAL_DELAY_MS = 1000;

function scrollToMeny() {
  requestAnimationFrame(() => {
    document.getElementById("meny")?.scrollIntoView({ behavior: "smooth" });
  });
}

export function useMenuBook() {
  const ctx = useContext(MenuBookContext);
  if (!ctx) {
    throw new Error("useMenuBook må brukes innenfor MenuBookProvider");
  }
  return ctx;
}

export function useMenuBookOptional() {
  return useContext(MenuBookContext);
}

export function MenuBookProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  /** Om permen er animert opp */
  const [coverOpen, setCoverOpen] = useState(false);
  /** Menytekst / kort vises kort tid etter at perm begynner å åpne */
  const [showMenu, setShowMenu] = useState(false);
  const hasRevealed = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeAll = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setShowMenu(false);
    setCoverOpen(false);
    hasRevealed.current = false;
    /** La permen animere tilbake før overlay fjernes */
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      closeTimer.current = null;
    }, 780);
  }, []);

  const openMenuBook = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    /** Allerede åpen og ferdig animert — ikke start på nytt */
    if (open && coverOpen && showMenu) return;

    hasRevealed.current = false;
    setShowMenu(false);
    setCoverOpen(false);
    setOpen(true);
    requestAnimationFrame(() => setCoverOpen(true));
  }, [open, coverOpen, showMenu]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeAll]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!coverOpen) return;
    const t = window.setTimeout(() => {
      if (hasRevealed.current) return;
      hasRevealed.current = true;
      setShowMenu(true);
    }, MENU_REVEAL_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [coverOpen]);

  const goToPageMeny = () => {
    closeAll();
    scrollToMeny();
  };

  return (
    <MenuBookContext.Provider value={{ openMenuBook }}>
      {children}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu-overlay"
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            aria-modal
            role="dialog"
            aria-label="Meny"
          >
            {/* 3D-scene: perm + innhold bak (lukker horisontalt så 3D ikke skyver utenfor) */}
            <div
              className="relative h-full w-full min-h-0 overflow-x-hidden"
              style={{ perspective: "1600px" }}
            >
              <div
                className="relative h-full w-full min-h-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* ——— Meny som avdekkes når siden åpner ——— */}
                <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,138,0,0.1),transparent_55%)]" />

                <div className="absolute inset-0 z-[5] box-border w-full overflow-y-auto overscroll-contain bg-gradient-to-b from-zinc-950 via-black to-black pb-[max(7rem,calc(1.5rem+env(safe-area-inset-bottom)))] pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] pt-[max(1.25rem,env(safe-area-inset-top))] md:pl-[max(2.5rem,env(safe-area-inset-left))] md:pr-[max(2.5rem,env(safe-area-inset-right))]">
                  <div className="mx-auto flex w-full min-w-0 max-h-full min-h-0 max-w-lg flex-col">
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: showMenu ? 1 : 0,
                        y: showMenu ? 0 : 18,
                        scale: showMenu ? 1 : 0.96,
                      }}
                      transition={{
                        opacity: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
                        y: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
                        scale: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
                      }}
                      className="flex flex-col gap-6 will-change-[transform,opacity]"
                    >
                      <div className="text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                          {SITE.name}
                        </p>
                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
                          Meny
                        </h2>
                        <p className="mt-1 text-sm text-white/55">
                          Burgere, sushi, pizza og mer
                        </p>
                      </div>

                      <ul className="flex flex-col gap-2">
                        {MENY_KATEGORIER.map(({ label, Icon }, i) => (
                          <motion.li
                            key={label}
                            initial={{ opacity: 0, y: 22 }}
                            animate={
                              showMenu
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 22 }
                            }
                            transition={{
                              delay: showMenu ? 0.04 + i * 0.058 : 0,
                              ...MENU_STAGGER_SPRING,
                            }}
                          >
                            <button
                              type="button"
                              onClick={goToPageMeny}
                              className="flex w-full min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-4 text-left transition hover:border-accent/40 hover:bg-accent/10 active:scale-[0.98] sm:gap-4 sm:px-4"
                            >
                              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/30">
                                <Icon className="h-5 w-5" strokeWidth={2} />
                              </span>
                              <span className="min-w-0 break-words text-base font-semibold text-white">
                                {label}
                              </span>
                            </button>
                          </motion.li>
                        ))}
                      </ul>

                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={
                          showMenu ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                        }
                        transition={{
                          delay: showMenu ? 0.28 : 0,
                          type: "spring",
                          stiffness: 320,
                          damping: 28,
                        }}
                        className="flex flex-col gap-3 border-t border-white/10 pt-6"
                      >
                        <a
                          href={SITE.phoneHref}
                          className="flex items-center justify-center gap-2 rounded-2xl bg-accent py-3.5 text-sm font-bold text-black"
                        >
                          <Phone className="h-4 w-4" strokeWidth={2.5} />
                          Ring {SITE.phoneDisplay}
                        </a>
                        <button
                          type="button"
                          onClick={goToPageMeny}
                          className="rounded-2xl border border-white/20 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                        >
                          Vis full meny på siden
                        </button>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>

                {/* ——— Perm: premium deksel (lær/varm metall) ——— */}
                <motion.div
                  className="absolute inset-0 z-20 origin-left cursor-default will-change-transform"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                  initial={{ rotateY: 0, rotateZ: 0 }}
                  animate={{
                    rotateY: coverOpen ? -100 : 0,
                    rotateZ: coverOpen ? -1.2 : 0,
                  }}
                  transition={COVER_SPRING}
                >
                  <div className="relative flex h-full w-full flex-col overflow-hidden border-r border-amber-950/60 shadow-[28px_0_100px_rgba(0,0,0,0.94),0_0_60px_rgba(255,120,40,0.06)]">
                    {/* Bunn */}
                    <div className="absolute inset-0 bg-[#0e0c0a]" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#524a46]/98 via-[#221f1c] to-[#030201]" />
                    {/* Varm topplys + vignett */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_65%_at_50%_-20%,rgba(255,175,95,0.18),transparent_54%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_22%,rgba(0,0,0,0.62)_100%)]" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-amber-100/[0.04] to-transparent" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgba(0,0,0,0.55)_0%,transparent_42%,rgba(255,138,0,0.07)_92%)]" />
                    <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
                    {/* Rygg / hengsel-side */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-[10px] bg-gradient-to-r from-black via-amber-950/25 to-transparent" />
                    <div className="pointer-events-none absolute inset-y-10 left-0 w-px bg-gradient-to-b from-amber-400/15 via-amber-200/30 to-amber-600/10" />
                    {/* Hjørne-beslag (mørke toner — uten lys kontur) */}
                    <div className="pointer-events-none absolute left-5 top-5 h-9 w-9 border-l border-t border-amber-950/55 sm:left-7 sm:top-7" />
                    <div className="pointer-events-none absolute right-7 top-5 h-9 w-9 border-r border-t border-amber-950/55 sm:right-10 sm:top-7" />
                    <div className="pointer-events-none absolute bottom-6 left-5 h-9 w-9 border-b border-l border-amber-950/50 sm:bottom-8 sm:left-7" />
                    <div className="pointer-events-none absolute bottom-6 right-7 h-9 w-9 border-b border-r border-amber-950/50 sm:bottom-8 sm:right-10" />
                    {/* Innramming */}
                    <div className="pointer-events-none absolute inset-4 rounded-[3px] border border-black/50 shadow-[inset_0_-1px_0_rgba(0,0,0,0.45)] sm:inset-6 md:inset-8" />
                    <div className="pointer-events-none absolute inset-[1.125rem] rounded-[2px] border border-black/55 sm:inset-[1.625rem] md:inset-[2.125rem]" />
                    {/* Ekstra «papir»-lag mot høyre */}
                    <div className="pointer-events-none absolute inset-y-12 right-1.5 w-1 rounded-l-[1px] bg-gradient-to-b from-zinc-500/35 via-zinc-700/30 to-zinc-900/45 opacity-90 shadow-[-3px_0_8px_rgba(0,0,0,0.35)] sm:inset-y-16 sm:right-2" />
                    {/* Side-snitt (falske sider) */}
                    <div className="pointer-events-none absolute inset-y-10 right-0 w-2.5 sm:inset-y-14">
                      <div className="h-full w-full rounded-l-[2px] bg-gradient-to-b from-zinc-500/50 via-zinc-800/55 to-black/70 shadow-[-8px_0_20px_rgba(0,0,0,0.5)]" />
                      <div className="absolute inset-y-2 -right-px w-px bg-gradient-to-b from-amber-800/50 via-accent/40 to-amber-950/50" />
                    </div>
                    {/* Fin tekstur (svak) */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.095] mix-blend-overlay"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      }}
                    />

                    <div className="relative flex flex-1 flex-col items-center justify-center px-6 sm:px-10">
                      <motion.div
                        animate={{
                          scale: coverOpen ? 0.9 : 1,
                          opacity: coverOpen ? 0.5 : 1,
                          y: coverOpen ? -8 : 0,
                        }}
                        transition={COVER_SPRING}
                        className="relative"
                      >
                        <div className="rounded-full bg-gradient-to-b from-white/[0.08] to-black/40 p-[1.35rem] shadow-[0_16px_48px_rgba(0,0,0,0.65),inset_0_-3px_10px_rgba(0,0,0,0.5)] ring-1 ring-black/40">
                          <BookOpen
                            className="h-12 w-12 text-[#ffc266] drop-shadow-[0_0_36px_rgba(255,138,0,0.65)] sm:h-14 sm:w-14"
                            strokeWidth={1.1}
                          />
                        </div>
                      </motion.div>
                      <motion.div
                        className="flex flex-col items-center"
                        animate={{
                          opacity: coverOpen ? 0.22 : 1,
                          y: coverOpen ? -10 : 0,
                        }}
                        transition={COVER_SPRING}
                      >
                        <p className="mt-8 text-center text-[10px] font-semibold uppercase tracking-[0.55em] text-amber-50/50 sm:text-xs sm:tracking-[0.48em]">
                          Sina Street Food
                        </p>
                        <span className="mt-4 inline-block drop-shadow-[0_6px_36px_rgba(255,130,60,0.45)]">
                          <span className="block bg-gradient-to-b from-white via-amber-50 to-amber-200/95 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
                            Meny
                          </span>
                        </span>
                        <div className="mt-10 flex items-center gap-2">
                          <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-200/35" />
                          <span className="text-[9px] uppercase tracking-[0.35em] text-amber-100/35">
                            Narvik
                          </span>
                          <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-200/35" />
                        </div>
                        <p className="mt-8 text-center text-xs text-amber-100/40 sm:text-sm">
                          Åpner …
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Lukk (over perm når meny synlig, alltid tilgjengelig) */}
            <button
              type="button"
              onClick={closeAll}
              className="absolute right-[max(1rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] z-[60] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition hover:bg-white/15"
              aria-label="Lukk meny"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </MenuBookContext.Provider>
  );
}
