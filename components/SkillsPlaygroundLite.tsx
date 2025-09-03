// components/SkillsPlaygroundLite.tsx
"use client";
import { useRef } from "react";
import DraggableChip from "./DraggableChip";

// Put your items + positions here (percentages so it scales)
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
        relative w-full overflow-hidden
        before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/12
        after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/12
      "
      style={{ height: "clamp(260px, 44vh, 520px)" }}
    >
      {/* Soft purple↔cyan glow underlay (cheap) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 blur-2xl"
        style={{
          background:
            "radial-gradient(40% 60% at 15% 0%, rgba(168,85,247,.22), transparent 60%), radial-gradient(40% 60% at 85% 100%, rgba(34,211,238,.22), transparent 60%)",
        }}
      />

      {/* Drag bounds */}
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
