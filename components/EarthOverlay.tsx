"use client";

import { useEffect, useState } from "react";
import EarthScene from "./EarthScene";

const FINISH_EARLY = 1.5; 
const EASE_EXP     = 0.9; 

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export default function EarthOverlay() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("hero");
      const skills = document.getElementById("skills");
      if (!hero || !skills) return;

      const heroTop   = hero.getBoundingClientRect().top + window.scrollY;
      const skillsTop = skills.getBoundingClientRect().top + window.scrollY;
      const y         = window.scrollY;

      const base = (y - heroTop) / Math.max(1, skillsTop - heroTop);

      const scaled = base * FINISH_EARLY;

      const eased = Math.pow(clamp01(scaled), EASE_EXP);

      setProgress(clamp01(eased));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 select-none">
      <EarthScene progress={progress} pinMode={progress >= 1} />
    </div>
  );
}
