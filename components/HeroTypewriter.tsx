"use client";

import Typewriter from "typewriter-effect";
import { useEffect, useState } from "react";

export default function HeroTypewriter() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (reduceMotion) return <>Hi, I&apos;m Darian</>;

  return (
    <Typewriter
      options={{
        cursor: "_",
        delay: 70,
      }}
      onInit={(typewriter) => {
        typewriter.typeString("Hi, I'm Darian").start();
      }}
    />
  );
}
