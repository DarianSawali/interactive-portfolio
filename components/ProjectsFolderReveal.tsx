"use client";
import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PROJECTS = Array.from({ length: 6 }).map((_, i) => ({
  title: `Project ${i + 1}`,
  img: `/projects/p${i + 1}.png`,
}));

export default function ProjectsFolderReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-3xl font-semibold mb-10">Projects</h2>

      <div className="relative">
 
        <FolderLid progress={scrollYProgress} />

        <PileToGrid progress={scrollYProgress} />
      </div>
    </section>
  );
}

function FolderLid({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0.05, 0.25], [-35, 0]);
  const y = useTransform(progress, [0.05, 0.25], ["-8px", "0px"]);
  const opacity = useTransform(progress, [0, 0.1], [0, 1]);

  return (
    <motion.div
      style={{ rotate, y, opacity }}
      className="mx-auto mb-10 h-16 w-28 origin-bottom rounded-t-xl bg-white/10"
    />
  );
}

function PileToGrid({ progress }: { progress: any }) {
  const pile = useMemo(
    () =>
      PROJECTS.map(() => ({
        x: (Math.random() - 0.5) * 160, 
        y: (Math.random() - 0.5) * 120,
        r: (Math.random() - 0.5) * 24,  
      })),
    []
  );

  return (
    <div className="relative grid gap-4 md:grid-cols-3">
      {PROJECTS.map((p, i) => {

        const x = useTransform(progress, [0.2, 0.6], [pile[i].x, 0]);
        const y = useTransform(progress, [0.2, 0.6], [pile[i].y, 0]);
        const rotate = useTransform(progress, [0.2, 0.6], [pile[i].r, 0]);
        const scale = useTransform(progress, [0.2, 0.6], [0.9, 1]);
        const opacity = useTransform(progress, [0.15, 0.35], [0, 1]);

        return (
          <motion.article
            key={p.title}
            style={{ x, y, rotate, scale, opacity }}
            className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-md"
          >
            <div className="aspect-[16/10] bg-white/5">
              {p.img ? <img src={p.img} alt="" className="h-full w-full object-cover" /> : null}
            </div>
            <div className="p-4">
              <h3 className="font-medium">{p.title}</h3>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
