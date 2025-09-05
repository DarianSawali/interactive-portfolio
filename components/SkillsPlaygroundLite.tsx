"use client";
import { useRef } from "react";
import DraggableChip from "./DraggableChip";

const ITEMS: Array<{
  style: React.CSSProperties;
  text?: string;
  image?: string;
}> = [
  { style: { top: "26%", left: "18%", rotate: "-30deg" }, text: "React" },
  { style: { top: "55%", left: "42%", rotate: "20deg" }, text: "Next.js" },
  { style: { top: "12%", left: "60%", rotate: "6deg"  }, text: "TypeScript" },
  { style: { top: "72%", left: "12%", rotate: "-18deg" }, text: "Framer Motion" },
  { style: { top: "68%", left: "70%", rotate: "35deg" }, text: "Three.js" },
  { style: { top: "16%", left: "36%", rotate: "12deg" }, image: "/logos/tailwind.svg" },
  { style: { top: "64%", left: "54%", rotate: "-15deg" }, image: "/logos/vercel.svg" },
];

export default function SkillsPlaygroundLite() {
  const boxRef = useRef<HTMLDivElement>(null!);

  return (
    <section
      className="
        relative w-full overflow-hidden rounded-3xl z-10
        before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/12
        after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/12
      "
      style={{ height: "clamp(260px, 44vh, 520px)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            `
            radial-gradient(60% 100% at 30% 0%,
              rgba(168,85,247,0.22), rgba(168,85,247,0.00) 60%),
            radial-gradient(60% 100% at 70% 100%,
              rgba(34,211,238,0.22), rgba(34,211,238,0.00) 60%),
            linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))
            `,
          filter: "blur(8px)",
        }}
      />

      <div ref={boxRef} className="relative size-full">
        {ITEMS.map((it, i) => (
          <DraggableChip
            key={i}
            style={it.style}
            text={it.text}
            image={it.image}
            containerRef={boxRef}
          />
        ))}
      </div>
    </section>
  );
}
