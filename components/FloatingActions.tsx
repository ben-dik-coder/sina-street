"use client";

import { Phone, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { useMenuBook } from "@/components/MenuBookOpener";

export function FloatingActions() {
  const { openMenuBook } = useMenuBook();

  return (
    <div
      className="pointer-events-none fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] left-0 right-0 z-50 flex justify-center px-3 sm:px-4"
      aria-hidden={false}
    >
      <div className="pointer-events-auto flex w-full max-w-lg gap-2 rounded-[1.25rem] border border-white/10 bg-black/60 p-2 shadow-lift backdrop-blur-2xl md:max-w-2xl">
        <motion.a
          whileTap={{ scale: 0.98 }}
          href={SITE.phoneHref}
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent to-orange-600 px-3 text-xs font-bold uppercase tracking-wide text-black md:text-sm"
        >
          <Phone className="h-4 w-4" strokeWidth={2.5} />
          Ring oss
        </motion.a>
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => openMenuBook()}
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-3 text-xs font-bold uppercase tracking-wide text-white md:text-sm"
        >
          <BookOpen className="h-4 w-4" strokeWidth={2.25} />
          Se meny
        </motion.button>
      </div>
    </div>
  );
}
