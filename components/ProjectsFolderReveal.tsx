"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Project = { title: string; img?: string };

const PROJECTS: Project[] = [
  { title: "Nebula Finance", img: "/projects/nebula.png" },
  { title: "Aurora Shop",   img: "/projects/aurora.png" },
  { title: "Comet CMS",     img: "/projects/comet.png" },
  { title: "Orbit UI",      img: "/projects/orbit.png" },
  { title: "Pulse Docs",    img: "/projects/pulse.png" },
  { title: "Atlas Maps",    img: "/projects/atlas.png" },
];

export default function ProjectsFolderRevealStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [offsets, setOffsets] = useState<{ x: number; y: number }[] | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "end 50%"],
  });

  const pileJitter = useMemo(
    () =>
      PROJECTS.map(() => ({
        rot: (Math.random() - 0.5) * 18, 
        jx: (Math.random() - 0.5) * 12, 
        jy: (Math.random() - 0.5) * 10, 
        delay: Math.random() * 0.08,
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

    const ro = new ResizeObserver(() => measure());
    if (gridRef.current) ro.observe(gridRef.current);

    const onLoad = () => measure();
    window.addEventListener("resize", measure);
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(raf);
      try {
        if (gridRef.current) ro.unobserve(gridRef.current);
      } catch {}
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <section ref={sectionRef} className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="mb-10 text-3xl font-semibold">Projects</h2>

      <FolderLid progress={scrollYProgress} />

      <div ref={gridRef} className="relative grid gap-5 md:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <CardFromPile
            key={p.title}
            project={p}
            i={i}
            offsets={offsets}
            progress={scrollYProgress}
            jitter={pileJitter[i]}
          />
        ))}
      </div>
    </section>
  );
}

function FolderLid({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0.0, 0.25], [-30, 0]);
  const y = useTransform(progress, [0.0, 0.25], ["-8px", "0px"]);
  const opacity = useTransform(progress, [0.0, 0.12], [0, 1]);

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
  project: { title: string; img?: string };
  i: number;
  offsets: { x: number; y: number }[] | null;
  progress: any;
  jitter: { rot: number; jx: number; jy: number; delay: number };
}) {
  if (!offsets) {
    return (
      <article
        data-card
        className="opacity-0 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md"
      >
        <div className="aspect-[16/10] bg-white/5" />
        <div className="p-4">
          <h3 className="font-medium">{project.title}</h3>
        </div>
      </article>
    );
  }

  const start = 0.12 + jitter.delay;
  const end = start + 0.48;

  const x = useTransform(progress, [start, end], [offsets[i].x + jitter.jx, 0]);
  const y = useTransform(progress, [start, end], [offsets[i].y + jitter.jy, 0]);
  const rotate = useTransform(progress, [start, end], [jitter.rot, 0]);
  const scale = useTransform(progress, [start, end], [0.92, 1]);
  const opacity = useTransform(progress, [start - 0.05, start + 0.1], [0, 1]);

  return (
    <motion.article
      data-card
      style={{ x, y, rotate, scale, opacity }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md"
    >
      <div className="aspect-[16/10] bg-white/5">
        {project.img ? (
          <img
            src={project.img}
            alt=""
            className="h-full w-full object-cover"
            onLoad={() => {
              window.dispatchEvent(new Event("resize"));
            }}
          />
        ) : null}
      </div>
      <div className="p-4">
        <h3 className="font-medium">{project.title}</h3>
      </div>
    </motion.article>
  );
}
