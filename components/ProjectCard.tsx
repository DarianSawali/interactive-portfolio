"use client";
import Image from "next/image";
import TiltLink from "./TiltLink"; 
export type Project = { title: string; img?: string; href?: string; tags?: string[] };

export default function ProjectCard({ project }: { project: Project }) {
  const card = (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]">
      <div className="relative aspect-[16/10] bg-white/5">
        {project.img && (
          <Image
            src={project.img}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
            className="object-cover"
            priority={false}
            onLoad={() => window.dispatchEvent(new Event("resize"))}
          />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-medium">{project.title}</h3>
          {project.href ? (
            <span className="text-sm text-white/70 underline underline-offset-4 group-hover:text-white"></span>
          ) : null}
        </div>
      </div>
    </div>
  );

  return project.href ? <TiltLink href={project.href}>{card}</TiltLink> : card;
}