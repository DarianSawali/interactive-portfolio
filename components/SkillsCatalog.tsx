"use client";

import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, FaJava, TbBrandCSharp, SiPhp, SiKotlin,
  SiReact, SiNodedotjs, SiNextdotjs, SiExpress, SiTailwindcss, SiJest,
  SiMongodb, SiMysql, SiSqlite, SiSocketdotio, SiMui, SiFigma, SiFramer,
  SiThreedotjs, BiLogoVisualStudio, SiGit, SiUnity, SiAndroid, SiEclipseide,
} from "@/components/skill-icons";

type IconType = React.ComponentType<{ className?: string }>;
type Item = { name: string; Icon: IconType };

const Languages: Item[] = [
  { name: "HTML5",      Icon: SiHtml5 },
  { name: "CSS3",       Icon: SiCss3 },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Java",       Icon: FaJava },
  { name: "C#",         Icon: TbBrandCSharp },
  { name: "PHP",        Icon: SiPhp },
  { name: "Kotlin",     Icon: SiKotlin },
];

const Frameworks: Item[] = [
  { name: "React",      Icon: SiReact },
  { name: "Node.js",    Icon: SiNodedotjs },
  { name: "Next.js",    Icon: SiNextdotjs },
  { name: "Express.js", Icon: SiExpress },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Jest",       Icon: SiJest },
];

const Technologies: Item[] = [
  { name: "MongoDB",    Icon: SiMongodb },
  { name: "MySQL",      Icon: SiMysql },
  { name: "SQLite",     Icon: SiSqlite },
  { name: "Socket.IO",  Icon: SiSocketdotio },
  { name: "Material UI", Icon: SiMui },
  { name: "Figma",      Icon: SiFigma },
  { name: "Framer Motion", Icon: SiFramer },
  { name: "Three.js",   Icon: SiThreedotjs },
];

const Tools: Item[] = [
  { name: "VS Code",    Icon: BiLogoVisualStudio },
  { name: "Git",        Icon: SiGit },
  { name: "GitHub",     Icon: SiGit },  
  { name: "Unity",      Icon: SiUnity },
  { name: "Android Studio", Icon: SiAndroid },
  { name: "Eclipse",    Icon: SiEclipseide },
];

export default function SkillsCatalog() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="mb-10 text-center text-3xl font-semibold">Technologies and Frameworks</h2>
      <Category title="Languages"   items={Languages} />
      <Category title="Frameworks"  items={Frameworks} />
      <Category title="Technologies" items={Technologies} />
      <Category title="Tools"       items={Tools} />
    </section>
  );
}

function Category({ title, items }: { title: string; items: Item[] }) {
  return (
    <div className="mb-12">
      <h3 className="mb-6 text-center text-lg font-semibold text-white/90">
        {title}
      </h3>
      <ul
        className="
          mx-auto flex max-w-5xl flex-wrap justify-center
          gap-4 sm:gap-5
        "
      >
        {items.map(({ name, Icon }) => (
          <li
            key={name}
            className="flex justify-center min-w-[40%] sm:min-w-[120px]"
          >
            <Tile Icon={Icon} label={name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tile({ Icon, label }: { Icon: IconType; label: string }) {
  return (
    <div
      className="
        group flex flex-col items-center justify-center
        gap-1 rounded-xl px-3 py-3
        text-center backdrop-blur-md transition
        hover:scale-[1.05] hover:shadow-[0_12px_40px_-16px_rgba(168,85,247,0.25)]
      "
    >
      <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white/90 transition-transform group-hover:scale-110" />
      <span className="text-xs text-white/80">{label}</span>
    </div>
  );
}
