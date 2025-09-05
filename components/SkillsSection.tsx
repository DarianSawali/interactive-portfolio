"use client";
import SkillsPlaygroundIcons from "./SkillsPlaygroundIcons";
import SkillsCatalog from "./SkillsCatalog";
import SkillsMeter from "./SkillsMeter";

export default function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <SkillsPlaygroundIcons />

      <SkillsCatalog />

      <SkillsMeter />
    </section>
  );
}
