"use client";

import { useEffect, useState } from "react";
import { Home, BookOpen, Users, Phone } from "lucide-react";
import { motion } from "framer-motion";

const nav = [
  { id: "hjem", label: "Hjem", Icon: Home },
  { id: "meny", label: "Meny", Icon: BookOpen },
  { id: "om", label: "Om oss", Icon: Users },
  { id: "kontakt", label: "Kontakt", Icon: Phone },
] as const;

export function BottomNav() {
  const [active, setActive] = useState("hjem");

  useEffect(() => {
    const nodes = nav
      .map((n) => document.getElementById(n.id))
      .filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    nodes.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-black/55 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_32px_rgba(0,0,0,0.65)] backdrop-blur-xl"
      aria-label="Hovednavigasjon"
    >
      <ul className="mx-auto flex max-w-lg justify-between px-6 md:px-8">
        {nav.map(({ id, label, Icon }) => {
          const isOn = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setActive(id)}
                className="flex flex-col items-center gap-1 py-1 text-[10px] font-semibold uppercase tracking-wide"
              >
                <motion.span
                  animate={{
                    color: isOn ? "#ff8a00" : "rgba(255,255,255,0.55)",
                  }}
                  className="flex flex-col items-center gap-1"
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl transition ${
                      isOn ? "bg-accent/15 ring-1 ring-accent/35" : ""
                    }`}
                  >
                    <Icon
                      className="h-5 w-5"
                      strokeWidth={isOn ? 2.5 : 2}
                      aria-hidden
                    />
                  </span>
                  {label}
                </motion.span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
