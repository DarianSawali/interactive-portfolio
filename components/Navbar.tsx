"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("#hero");
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.replace("#", ""));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActiveId("#" + e.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.6, 1] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max <= 0 ? 0 : (h.scrollTop || document.body.scrollTop) / max;
      el.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative h-0.5 overflow-hidden">
        <div ref={barRef} className="origin-left bg-gradient-to-r from-fuchsia-400 to-cyan-300 h-full w-full" />
      </div>

      <nav className="mx-auto mt-2 flex max-w-6xl items-center justify-between rounded-3xl border border-white/10 bg-black/20 px-4 py-2 backdrop-blur-xl">
        <a href="#hero" className="font-semibold tracking-tight ">DS</a>

        <ul className="hidden gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative rounded-lg px-3 py-2 text-sm text-white/80 hover:text-white"
              >
                {l.label}
                {activeId === l.href && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 -z-10 rounded-lg
                       bg-gradient-to-r from-fuchsia-400 to-cyan-300
                        blur-sm "
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="md:hidden rounded-lg border border-white/10 px-3 py-2 text-sm"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          Menu
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 420, damping: 36 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl md:hidden"
          >
            <ul className="divide-y divide-white/10">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="block px-4 py-3 text-white/90"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
