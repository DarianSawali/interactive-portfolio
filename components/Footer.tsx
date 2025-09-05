"use client";

export default function Footer() {
  return (
    <footer className="mt-16 mb-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-white/10" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="text-white/80">
          <div className="text-sm">© {new Date().getFullYear()} Darian Sawali</div>
          <div className="text-xs text-white/50">Built with Next.js</div>
        </div>

        <div className="w-full md:w-auto">
          <div className="h-px bg-white/10 mb-4 md:hidden" /> 
          <ul className="flex flex-wrap gap-4 md:gap-6 text-sm">
            <li>
              <a
                href="https://github.com/DarianSawali"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-block px-2 py-1 text-white/80 hover:text-white"
              >
                GitHub
                <span className="absolute inset-x-2 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-fuchsia-400 to-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/DarianSawali"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-block px-2 py-1 text-white/80 hover:text-white"
              >
                LinkedIn
                <span className="absolute inset-x-2 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-fuchsia-400 to-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
            {/* <li>
              <a
                href="https://x.com/your-handle"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-block px-2 py-1 text-white/80 hover:text-white"
              >
                X (Twitter)
                <span className="absolute inset-x-2 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-fuchsia-400 to-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </footer>
  );
}
