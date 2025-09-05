"use client";
import { motion } from "framer-motion";

const METERS = [
  { label: "HTML5", value: 90 },
  { label: "CSS3", value: 88 },
  { label: "JavaScript", value: 86 },
  { label: "TypeScript", value: 78 },
  { label: "Java", value: 70 },
  { label: "C#", value: 70 },
  { label: "PHP", value: 64 },
  { label: "Kotlin", value: 60 },
  { label: "React", value: 85 },
  { label: "Node.js", value: 68 },
  { label: "Next.js", value: 80 },
  { label: "Tailwind", value: 84 },
  { label: "Figma", value: 66 },
];

export default function SkillsMeters() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-4 md:grid-cols-2">
        {METERS.map((m, i) => (
          <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-white/80">{m.label}</span>
              <span className="text-white/60">{m.value}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${m.value}%` }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-300"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}