
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PROJECTS = [
  { title: "Nebula Finance", img: "/projects/nebula.png" },
  { title: "Aurora Shop", img: "/projects/aurora.png" },
  { title: "Comet CMS", img: "/projects/comet.png" },
];

export default function ProjectsReveal() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-3xl font-semibold mb-10">Projects</h2>

      <div className="relative grid gap-6 md:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <CardDiagonal key={p.title} p={p} i={i} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

function CardDiagonal({
  p,
  i,
  progress,
}: {
  p: { title: string; img: string };
  i: number;
  progress: any;
}) {

  const start = i * 0.08;
  const end = start + 0.6;

  const x = useTransform(progress, [start, end], ["10vw", "0vw"]);
  const y = useTransform(progress, [start, end], ["-10vh", "0vh"]);
  const scale = useTransform(progress, [start, end], [0.85, 1]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const shadow = useTransform(
    progress,
    [start, end],
    [
      "0 30px 80px -30px rgba(0,0,0,0.0)",
      "0 30px 80px -30px rgba(0,0,0,0.45)",
    ]
  );

  return (
    <motion.article
      style={{ x, y, scale, opacity, boxShadow: shadow }}
      className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-md"
    >
      <div className="aspect-[16/10] bg-white/5">
        {p.img ? <img src={p.img} alt="" className="h-full w-full object-cover" /> : null}
      </div>
      <div className="p-4">
        <h3 className="font-medium">{p.title}</h3>
      </div>
    </motion.article>
  );
}
