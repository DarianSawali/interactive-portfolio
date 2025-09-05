"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

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
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActiveId("#" + e.target.id));
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative h-0.5 overflow-hidden">
        <div
          ref={barRef}
          className="origin-left bg-gradient-to-r from-fuchsia-400 to-cyan-300 h-full w-full"
        />
      </div>

      <nav className="mx-auto mt-2 flex max-w-6xl items-center justify-between rounded-3xl border border-white/10 bg-black/20 px-4 py-2 backdrop-blur-xl">
        <a href="#hero" className="font-semibold tracking-tight">DS</a>

        <ul className="hidden gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded-lg px-3 py-2 text-sm text-white/80 hover:text-white"
              >
                {l.label}
                {activeId === l.href && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-fuchsia-400 to-cyan-300 blur-sm"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <span className="pointer-events-none absolute inset-x-2 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-fuchsia-400 to-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden rounded-lg p-2 ring-1 ring-white/10 bg-white/5 text-white"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.nav
              id="mobile-menu"
              className="md:hidden fixed right-0 top-0 z-50 h-full w-72 max-w-[85%] transform-gpu bg-neutral-900/90 backdrop-blur-xl ring-1 ring-white/10"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 420, damping: 36 }}
            >
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-white/90 font-medium">Menu</span>
                <button
                  className="rounded-lg p-2 ring-1 ring-white/10 bg-white/5 text-white"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <FiX size={18} />
                </button>
              </div>

              <ul className="px-2 py-2">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group relative block rounded-xl px-4 py-3 text-white/90 hover:text-white"
                    >
                      {l.label}
                      <span className="pointer-events-none absolute left-4 right-4 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-fuchsia-400 to-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
