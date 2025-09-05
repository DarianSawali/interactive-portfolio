"use client";
import { useRef } from "react";
import DraggableChip from "./DraggableChip";
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, FaJava, TbBrandCSharp,
  SiPhp, SiKotlin, SiPython, SiReact, SiNextdotjs, SiNodedotjs, SiTailwindcss, SiFigma
} from "@/components/skill-icons";

const ITEMS = [
  { text: "HTML5",     Icon: SiHtml5,     style: { top: "14%", left: "8%",  rotate: "-6deg" } },
  { text: "CSS3",      Icon: SiCss3,      style: { top: "10%", left: "34%", rotate: "8deg" } },
  { text: "JavaScript",Icon: SiJavascript,style: { top: "28%", left: "22%", rotate: "2deg" } },
  { text: "TypeScript",Icon: SiTypescript,style: { top: "40%", left: "70%", rotate: "-10deg" } },
  { text: "Java",      Icon: FaJava,      style: { top: "8%",  left: "60%", rotate: "-4deg" } },
  { text: "C#",        Icon: TbBrandCSharp,style:{ top: "78%", left: "12%", rotate: "8deg" } },
  { text: "PHP",       Icon: SiPhp,       style: { top: "74%", left: "32%", rotate: "-8deg" } },
  { text: "Kotlin",    Icon: SiKotlin,    style: { top: "68%", left: "58%", rotate: "4deg" } },
  { text: "Python",    Icon: SiPython,    style: { top: "36%", left: "8%",  rotate: "3deg" } },
  { text: "React",     Icon: SiReact,     style: { top: "56%", left: "16%", rotate: "14deg" } },
  { text: "Next.js",   Icon: SiNextdotjs, style: { top: "62%", left: "52%", rotate: "-12deg" } },
  { text: "Node.js",   Icon: SiNodedotjs, style: { top: "50%", left: "34%", rotate: "6deg" } },
  { text: "Tailwind",  Icon: SiTailwindcss,style:{ top: "70%", left: "74%", rotate: "8deg" } },
  { text: "Figma",     Icon: SiFigma,     style: { top: "20%", left: "78%", rotate: "-6deg" } },
];

export default function SkillsPlaygroundIcons() {
  const boxRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-b from-white/2 via-white/[0.02] to-white/2"
      style={{ height: "clamp(280px, 48vh, 520px)" }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/12" />

      <div className="absolute inset-0 -z-10 opacity-60 blur-2xl"
           style={{ background: "radial-gradient(1200px 300px at 50% 110%, rgba(168,85,247,0.20), transparent 60%), radial-gradient(1200px 300px at 50% -10%, rgba(34,211,238,0.20), transparent 60%)" }}
      />

      <div ref={boxRef} className="relative h-full w-full">
        {ITEMS.map((it, i) => (
          <DraggableChip
            key={i}
            style={it.style}
            text={it.text}
            Icon={it.Icon}
            containerRef={boxRef}
          />
        ))}
      </div>
    </section>
  );
}