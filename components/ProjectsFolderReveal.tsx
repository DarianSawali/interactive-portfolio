"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import ProjectCard, { type Project } from "./ProjectCard";

const PROJECTS: Project[] = [
  { title: "Nebula Finance", img: "/projects/nebula.png" },
  { title: "Aurora Shop",   img: "/projects/aurora.png" },
  { title: "Comet CMS",     img: "/projects/comet.png" },
  { title: "Orbit UI",      img: "/projects/orbit.png" },
  { title: "Pulse Docs",    img: "/projects/pulse.png" },
  { title: "Atlas Maps",    img: "/projects/atlas.png" },
];

const FINISH_EARLY = 0.7;  
const EASE_EXP     = 0.9; 

export default function ProjectsFolderRevealStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [offsets, setOffsets] = useState<{ x: number; y: number }[] | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 60%", "start 0%"],
  });

  const prog = useTransform(scrollYProgress, (v) => {
    const scaled = v * FINISH_EARLY;
    const clamped = Math.min(1, Math.max(0, scaled));
    return Math.pow(clamped, EASE_EXP);
  });

  const pileJitter = useMemo(
    () =>
      PROJECTS.map(() => ({
        rot: (Math.random() - 0.5) * 18,
        jx: (Math.random() - 0.5) * 12,
        jy: (Math.random() - 0.5) * 10,
        delay: Math.random() * 0.06,
      })),
    []
  );

  useEffect(() => {
    const measure = () => {
      const grid = gridRef.current;
      if (!grid) return;

      const gridRect = grid.getBoundingClientRect();
      const cx = gridRect.width / 2;
      const cy = gridRect.height / 2;

      const nodes = Array.from(
        grid.querySelectorAll<HTMLDivElement>("[data-card]")
      );
      if (!nodes.length) return;

      const next = nodes.map((node) => {
        const r = node.getBoundingClientRect();
        const nx = r.left - gridRect.left + r.width / 2;
        const ny = r.top - gridRect.top + r.height / 2;
        return { x: cx - nx, y: cy - ny };
      });

      setOffsets(next);
    };

    const raf = requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    if (gridRef.current) ro.observe(gridRef.current);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);

    return () => {
      cancelAnimationFrame(raf);
      try { if (gridRef.current) ro.unobserve(gridRef.current); } catch {}
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  return (
    <div ref={sectionRef} className="mx-auto max-w-6xl px-6 py-24">

      <FolderLid progress={prog} />

      <div ref={gridRef} className="relative grid gap-5 md:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <CardFromPile
            key={p.title}
            i={i}
            project={p}
            offsets={offsets}
            progress={prog}
            jitter={pileJitter[i]}
          />
        ))}
      </div>
    </div>
  );
}

function FolderLid({ progress }: { progress: MotionValue<number> }) {
  const rotate  = useTransform(progress, [0.0, 0.4], [-30, 0]);
  const y       = useTransform(progress, [0.0, 0.4], ["-8px", "0px"]);
  const opacity = useTransform(progress, [0.0, 0.2], [0, 1]);

  return (
    <motion.div
      style={{ rotate, y, opacity }}
      className="mx-auto mb-8 h-14 w-28 origin-bottom rounded-t-xl bg-white/10"
    />
  );
}

function CardFromPile({
  project,
  i,
  offsets,
  progress,
  jitter,
}: {
  project: Project;
  i: number;
  offsets: { x: number; y: number }[] | null;
  progress: MotionValue<number>;
  jitter: { rot: number; jx: number; jy: number; delay: number };
}) {

  const start = 0.02 + jitter.delay;
  const end   = start + 0.34;

  const baseX = offsets?.[i]?.x ?? 0;
  const baseY = offsets?.[i]?.y ?? 0;

  const x       = useTransform(progress, [start, end], [baseX + jitter.jx, 0]);
  const y       = useTransform(progress, [start, end], [baseY + jitter.jy, 0]);
  const rotate  = useTransform(progress, [start, end], [jitter.rot, 0]);
  const scale   = useTransform(progress, [start, end], [0.92, 1]);
  const opacity = useTransform(progress, [start - 0.06, start + 0.1], [0, 1]);

  const hidden = offsets == null;

  return (
    <motion.div
      data-card
      style={{ x, y, rotate, scale, opacity: hidden ? 0 : opacity }}
      className="relative"
    >
      <ProjectCard project={project} />
    </motion.div>
  );
}
