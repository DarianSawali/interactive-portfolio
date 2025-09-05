"use client";

import { useEffect, useRef, useState } from "react";
import EarthScene from "./EarthScene";

export default function EarthHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!heroRef.current || !skillsRef.current) return;
      const heroTop = heroRef.current.offsetTop;
      const skillsTop = skillsRef.current.offsetTop;
      const y = window.scrollY;

      const raw = (y - heroTop) / Math.max(1, skillsTop - heroTop);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const pinMode = progress >= 1; 

  return (
    <>
      <section ref={heroRef} className="relative min-h-screen">
        <div className="mx-auto flex max-w-6xl flex-col items-stretch gap-8 px-6 py-10 md:min-h-screen md:flex-row md:items-center">

          <div className="flex-1">
            <h1 className="text-5xl font-bold tracking-tight md:text-6xl">Hi, I’m Darian.</h1>
            <p className="mt-4 text-lg text-white/70">
              I&apos;m a Software Developer from Simon Fraser University.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="#work" className="rounded-xl bg-white px-5 py-3 text-black">View Work</a>
              <a href="#contact" className="rounded-xl border border-white/20 px-5 py-3">Contact</a>
            </div>
          </div>

          <div className="relative flex-1">
            <div className="sticky top-0 h-[48vh] md:h-[70vh]">
              <div
                className={
                  pinMode
                    ? "fixed left-4 top-4 z-40 h-20 w-20 md:h-28 md:w-28 lg:h-32 lg:w-32" 
                    : "relative h-full w-full"
                }
              >
                <EarthScene progress={progress} pinMode={pinMode} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={skillsRef} id="skills" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-3xl font-semibold">Skills</h2>
        <p className="mt-3 text-white/70">
          Placeholder content (you&apos;ll redesign this later).
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Three.js", "Node.js", "Figma"].map((s) => (
            <div key={s} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              {s}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
