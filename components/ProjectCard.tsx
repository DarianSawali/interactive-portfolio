// components/ProjectCard.tsx
"use client";

export type Project = {
  title: string;
  img?: string;
  href?: string;
  tags?: string[];
  // add any props you want (description, year, etc.)
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md">
      <div className="aspect-[16/10] bg-white/5">
        {project.img ? (
          // You can swap to next/image if you want optimization
          <img
            src={project.img}
            alt={project.title}
            className="h-full w-full object-cover"
            onLoad={() => window.dispatchEvent(new Event("resize"))}
          />
        ) : null}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-medium">{project.title}</h3>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/70 hover:text-white/90 underline-offset-4 hover:underline"
            >
              View
            </a>
          ) : null}
        </div>

        {project.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/70 ring-1 ring-white/10 "
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
