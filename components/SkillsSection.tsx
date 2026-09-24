"use client";
import SkillsPlaygroundIcons from "./SkillsPlaygroundIcons";
import SkillsCatalog from "./SkillsCatalog";

export default function SkillsSection() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <SkillsPlaygroundIcons />
      <SkillsCatalog />
    </div>
  );
}
