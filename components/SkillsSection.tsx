"use client";
import SkillsPlaygroundLite from "./SkillsPlaygroundLite";

export default function SkillsSection() {
  const skills = [
    { name: "React", level: 0.9 },
    { name: "Next.js", level: 0.85 },
    { name: "TypeScript", level: 0.8 },
    { name: "Tailwind", level: 0.85 },
    { name: "Framer Motion", level: 0.75 },
    { name: "Three.js", level: 0.65 },
  ];

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <div className="-mx-6 md:-mx-8">
        <SkillsPlaygroundLite />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {skills.map((s) => (
          <div key={s.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">{s.name}</span>
              <span className="text-sm text-white/60">{Math.round(s.level * 100)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${s.level * 100}%`,
                  background:
                    "linear-gradient(90deg, rgba(147,51,234,.9), rgba(34,211,238,.9))",
                  boxShadow: "0 0 16px rgba(147,51,234,.35)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
