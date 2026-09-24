"use client";

import { motion, useReducedMotion } from "framer-motion";
import ProjectCard, { type Project } from "./ProjectCard";

const PROJECTS: Project[] = [
  { title: "Movie Directory App", img: "/projects/cinescope.png", href: "https://github.com/DarianSawali/CineScope" },
  { title: "YouTube Clone", img: "/projects/yt-clone.png", href: "https://github.com/DarianSawali/Youtube_Clone" },
  { title: "Chat App", img: "/projects/chat-app.png", href: "https://github.com/DarianSawali/Chat-App" },
  { title: "2.5D Puzzle Game", img: "/projects/spirit-maes.png", href: "https://github.com/DarianSawali/Spirit-Maes-Game" },
  { title: "Geolocating App", img: "/projects/travelogger.png", href: "https://github.com/MichaelTj02/TraveLogger" },
  { title: "2D Survival Game", img: "/projects/mystic-woods.png", href: "https://github.com/DarianSawali/Unity-Survival-Game" },
  
];

export default function ProjectsFolderRevealStack() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="relative grid gap-5 md:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: reduceMotion ? 0 : i * 0.06 }}
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
