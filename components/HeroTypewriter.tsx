"use client";

import Typewriter from "typewriter-effect";

export default function HeroTypewriter() {
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
