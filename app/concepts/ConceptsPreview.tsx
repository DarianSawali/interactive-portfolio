"use client";

import { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { Suspense, useEffect, useRef } from "react";
import Image from "next/image";
import type { Group } from "three";
import EarthModel from "@/components/EarthModel";
import {
  FiArrowUpRight,
  FiChevronDown,
  FiCircle,
  FiCode,
  FiCommand,
  FiFolder,
  FiGlobe,
  FiMail,
  FiMenu,
  FiMinus,
  FiTerminal,
  FiX,
} from "react-icons/fi";
import { PiStarFourFill } from "react-icons/pi";
import styles from "./concepts.module.css";

type Concept = "observatory" | "os";

const projects = [
  { number: "01", title: "TCG Wishlist", type: "Full-stack application", note: "Japanese Pokémon TCG wishlist and collection tracker", href: "https://github.com/DarianSawali/TCG-Wishlist", image: "/projects/tcg wishlist.png", technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "TCGdex"] },
  { number: "02", title: "TCG Dynamic Storefront", type: "E-commerce platform", note: "Headless Pokémon TCG storefront with catalog pricing and Shopify checkout", href: "https://github.com/DarianSawali/TCG-Dynamic-Storefront", image: "/projects/tcg dynamic storefront.png", technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Shopify APIs"] },
  { number: "03", title: "VCB Web", type: "Organization website", note: "Responsive website with messages, giving, contact, and prayer-request flows", href: "https://github.com/DarianSawali/VCB-Web", image: "/projects/vcb web.png", technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Resend"] },
  { number: "04", title: "CineScope", type: "Full-stack application", note: "Movie discovery, ratings, recommendations, and personal watchlists", href: "https://github.com/DarianSawali/CineScope", image: "/projects/cinescope.png", technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PHP", "SQL", "jQuery"] },
  { number: "05", title: "Spirit Maes", type: "2.5D game", note: "Puzzle-platformer built around animal possession and exploration", href: "https://github.com/DarianSawali/Spirit-Maes-Game", image: "/projects/spirit-maes.png", technologies: ["Unity", "C#", "URP", "Input System", "ShaderLab", "HLSL"] },
  { number: "06", title: "TraveLogger", type: "Android application", note: "Travel and fitness tracker using location, steps, maps, and weather", href: "https://github.com/MichaelTj02/TraveLogger", image: "/projects/travelogger.png", technologies: ["Java", "Android SDK", "Google Maps", "Google Location", "Material UI"] },
  { number: "07", title: "Chat App", type: "Realtime application", note: "Full-stack messaging application with authentication and live updates", href: "https://github.com/DarianSawali/Chat-App", image: "/projects/chat-app.png", technologies: ["React", "Vite", "Express", "MongoDB", "Mongoose", "Socket.IO", "JWT", "Zustand"] },
  { number: "08", title: "YouTube Clone", type: "Frontend application", note: "Video browsing and playback interface inspired by YouTube", href: "https://github.com/DarianSawali/Youtube_Clone", image: "/projects/yt-clone.png", technologies: ["React", "Material UI", "Axios", "React Router", "React Player"] },
];

type SkillStar = { id: string; label: string; category: string; x: number; y: number; size: number; note: string; projects: string; compact?: boolean };

const skillStars: SkillStar[] = [
  { id: "react", label: "React", category: "Frontend", x: 34, y: 38, size: 12, note: "Component-driven interfaces", projects: "CineScope · Chat App" },
  { id: "next", label: "Next.js", category: "Frontend", x: 44, y: 23, size: 15, note: "Full-stack web experiences", projects: "Portfolio · CineScope" },
  { id: "typescript", label: "TypeScript", category: "Frontend", x: 51, y: 44, size: 18, note: "Reliable application architecture", projects: "Portfolio · Chat App" },
  { id: "tailwind", label: "Tailwind", category: "Frontend", x: 27, y: 55, size: 9, note: "Fast, consistent UI systems", projects: "Portfolio" },
  { id: "node", label: "Node.js", category: "Backend", x: 65, y: 31, size: 14, note: "APIs and server-side systems", projects: "Chat App · TraveLogger" },
  { id: "express", label: "Express", category: "Backend", x: 79, y: 25, size: 9, note: "Lean application services", projects: "Chat App" },
  { id: "socket", label: "Socket.IO", category: "Backend", x: 75, y: 47, size: 11, note: "Realtime communication", projects: "Chat App" },
  { id: "mongodb", label: "MongoDB", category: "Data", x: 87, y: 58, size: 13, note: "Flexible document storage", projects: "Chat App · TraveLogger" },
  { id: "mysql", label: "MySQL", category: "Data", x: 63, y: 65, size: 9, note: "Relational data modeling", projects: "Academic systems" },
  { id: "three", label: "Three.js", category: "Creative", x: 39, y: 72, size: 12, note: "Interactive 3D experiences", projects: "Portfolio" },
  { id: "figma", label: "Figma", category: "Creative", x: 20, y: 78, size: 8, note: "Interface design and prototyping", projects: "Product design" },
  { id: "javascript", label: "JavaScript", category: "Frontend", x: 18, y: 25, size: 8, note: "Interactive application development", projects: "Chat App · YouTube Clone", compact: true },
  { id: "supabase", label: "Supabase", category: "Backend", x: 55, y: 11, size: 8, note: "Authentication and cloud data services", projects: "TCG Wishlist", compact: true },
  { id: "postgresql", label: "PostgreSQL", category: "Data", x: 72, y: 12, size: 9, note: "Relational data storage", projects: "TCG Wishlist · TCG Storefront", compact: true },
  { id: "prisma", label: "Prisma", category: "Data", x: 87, y: 16, size: 8, note: "Typed database access and migrations", projects: "TCG Storefront", compact: true },
  { id: "shopify", label: "Shopify APIs", category: "Platforms", x: 92, y: 36, size: 9, note: "Catalog, cart, inventory, and checkout integration", projects: "TCG Storefront", compact: true },
  { id: "php", label: "PHP", category: "Backend", x: 79, y: 75, size: 8, note: "Server-side application endpoints", projects: "CineScope", compact: true },
  { id: "sql", label: "SQL", category: "Data", x: 91, y: 80, size: 8, note: "Relational queries and schema design", projects: "CineScope", compact: true },
  { id: "jquery", label: "jQuery", category: "Frontend", x: 8, y: 37, size: 7, note: "DOM and request utilities", projects: "CineScope", compact: true },
  { id: "unity", label: "Unity", category: "Creative", x: 43, y: 89, size: 10, note: "Interactive game development", projects: "Spirit Maes", compact: true },
  { id: "csharp", label: "C#", category: "Backend", x: 57, y: 88, size: 8, note: "Gameplay systems and application logic", projects: "Spirit Maes", compact: true },
  { id: "java", label: "Java", category: "Platforms", x: 91, y: 94, size: 9, note: "Android application development", projects: "TraveLogger", compact: true },
  { id: "android", label: "Android SDK", category: "Platforms", x: 76, y: 90, size: 9, note: "Native Android development", projects: "TraveLogger", compact: true },
  { id: "maps", label: "Google Maps", category: "Platforms", x: 67, y: 79, size: 7, note: "Maps and route visualization", projects: "TraveLogger", compact: true },
  { id: "mui", label: "Material UI", category: "Frontend", x: 10, y: 58, size: 8, note: "Component-based interface design", projects: "YouTube Clone", compact: true },
  { id: "vite", label: "Vite", category: "Frontend", x: 21, y: 42, size: 7, note: "Frontend development and bundling", projects: "Chat App", compact: true },
  { id: "mongoose", label: "Mongoose", category: "Data", x: 91, y: 67, size: 7, note: "MongoDB modeling and validation", projects: "Chat App", compact: true },
  { id: "jwt", label: "JWT", category: "Backend", x: 64, y: 48, size: 7, note: "Token-based authentication", projects: "Chat App", compact: true },
  { id: "zustand", label: "Zustand", category: "Frontend", x: 21, y: 67, size: 7, note: "Client-side state management", projects: "Chat App", compact: true },
];

const skillLinks = [
  ["react", "next"], ["react", "typescript"], ["react", "tailwind"],
  ["next", "typescript"], ["next", "node"], ["typescript", "node"],
  ["typescript", "three"], ["node", "express"], ["node", "socket"],
  ["express", "mongodb"], ["socket", "mongodb"], ["socket", "mysql"],
  ["tailwind", "three"], ["tailwind", "figma"], ["three", "figma"],
  ["javascript", "react"], ["javascript", "jquery"],
  ["supabase", "next"], ["supabase", "postgresql"], ["postgresql", "prisma"],
  ["postgresql", "sql"],
  ["shopify", "next"], ["shopify", "prisma"],
  ["php", "sql"], ["php", "jquery"], ["jquery", "javascript"],
  ["unity", "csharp"], ["java", "android"],
  ["android", "maps"], ["mui", "react"],
  ["vite", "react"], ["mongoose", "mongodb"], ["jwt", "node"],
  ["zustand", "react"],
];

export default function ConceptsPreview() {
  const [concept, setConcept] = useState<Concept>("observatory");

  return (
    <main className={styles.shell} data-concept={concept}>
      <div className={styles.switcher} aria-label="Choose a design concept">
        <span className={styles.switcherLabel}>Design study</span>
        <button
          type="button"
          className={concept === "observatory" ? styles.activeSwitch : ""}
          onClick={() => setConcept("observatory")}
        >
          02 / Observatory
        </button>
        <button
          type="button"
          className={concept === "os" ? styles.activeSwitch : ""}
          onClick={() => setConcept("os")}
        >
          03 / Developer OS
        </button>
      </div>

      {concept === "observatory" ? <Observatory /> : <DeveloperOS />}
    </main>
  );
}

export function Observatory() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPlanet, setShowPlanet] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 801px)");
    const updatePlanet = () => setShowPlanet(desktop.matches);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    updatePlanet();
    desktop.addEventListener("change", updatePlanet);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      desktop.removeEventListener("change", updatePlanet);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className={styles.observatory}>
      <SmallCometCursor />
      <div className={styles.starField} aria-hidden="true" />
      <div className={styles.orbit} aria-hidden="true">
        {showPlanet && <div className={styles.planetViewport}>
          <Canvas
            camera={{ position: [0, 0, 3.2], fov: 42 }}
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true }}
          >
            <ambientLight intensity={0.75} />
            <directionalLight position={[3, 2, 4]} intensity={1.7} />
            <directionalLight position={[-3, -1, -2]} intensity={0.45} color="#a78bfa" />
            <Suspense fallback={null}>
              <Environment preset="night" />
              <RotatingPlanet />
            </Suspense>
          </Canvas>
        </div>}
      </div>

      <nav className={styles.obNav} aria-label="Concept navigation">
        <a href="#home" className={styles.obMark}>DS<span>.</span></a>
        <div id="observatory-navigation" className={`${styles.obLinks} ${menuOpen ? styles.obLinksOpen : ""}`}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
        <span className={styles.coordinates}>49.2827° N / 123.1207° W</span>
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="observatory-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      <section className={styles.obHero} id="home">
        <p className={styles.eyebrow}><span /> Software developer · Vancouver</p>
        <h1 className={styles.codeHero}>
          <span className={styles.heroPrompt} aria-hidden="true">&gt;</span>
          <CodeHeroLine text="Design. Build. Iterate." />
        </h1>
        <div className={styles.heroFooter}>
          <p>Frontend, backend, APIs, and interactive systems.</p>
          <a href="#work">View projects <FiChevronDown /></a>
        </div>
      </section>

      <section className={styles.obWork} id="work">
        <div className={styles.sectionIntro}>
          <p>Selected projects</p>
          <span>2024—2026</span>
        </div>
        <div className={styles.obProjectGrid}>
          {projects.map((project) => <ObservationProjectCard key={project.title} project={project} />)}
        </div>
      </section>

      <section className={styles.obAbout} id="skills">
        <SkillConstellation />
      </section>

      <ObservatoryContact />

      <footer className={styles.obFooter}>
        <p>Darian Sawali</p>
        <div className={styles.footerLinks}>
          <a href="https://github.com/DarianSawali" target="_blank" rel="noreferrer">GitHub <FiArrowUpRight /></a>
          <a href="https://www.linkedin.com/in/dariansawali/" target="_blank" rel="noreferrer">LinkedIn <FiArrowUpRight /></a>
        </div>
        <span>© 2026 Darian Sawali</span>
      </footer>
    </div>
  );
}

function ObservationProjectCard({ project }: { project: (typeof projects)[number] }) {
  const surfaceRef = useRef<HTMLAnchorElement>(null);

  const updateWeight = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const surface = surfaceRef.current;
    if (!surface) return;
    const bounds = surface.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const normalizedX = x * 2 - 1;
    const normalizedY = y * 2 - 1;
    surface.style.setProperty("--card-rotate-x", `${normalizedY * -5}deg`);
    surface.style.setProperty("--card-rotate-y", `${normalizedX * 6}deg`);
    surface.style.setProperty("--card-light-x", `${x * 100}%`);
    surface.style.setProperty("--card-light-y", `${y * 100}%`);
    surface.classList.add(styles.projectTracking);
  };

  const resetWeight = () => {
    const surface = surfaceRef.current;
    if (!surface) return;
    surface.classList.remove(styles.projectTracking);
    surface.style.setProperty("--card-rotate-x", "0deg");
    surface.style.setProperty("--card-rotate-y", "0deg");
    surface.style.setProperty("--card-light-x", "50%");
    surface.style.setProperty("--card-light-y", "50%");
  };

  return (
    <article className={styles.obProject}>
      <a
        ref={surfaceRef}
        className={styles.projectSurface}
        href={project.href}
        target="_blank"
        rel="noreferrer"
        onPointerMove={updateWeight}
        onPointerLeave={resetWeight}
        aria-label={`View ${project.title} on GitHub`}
      >
        <div className={`${styles.projectVisual} ${project.image ? styles.projectVisualWithImage : ""}`}>
          <span>{project.number}</span>
          {project.image ? (
            <Image
              className={styles.projectImage}
              src={project.image}
              alt={`${project.title} project preview`}
              fill
              sizes="(max-width: 800px) calc(100vw - 40px), (max-width: 1280px) 33vw, 390px"
            />
          ) : <div className={styles.visualOrb} />}
          <FiArrowUpRight />
        </div>
        <div className={styles.projectCopy}>
          <div>
            <h2>{project.title}</h2>
            <p>{project.note}</p>
            <ul className={styles.projectTechnologies} aria-label={`${project.title} technologies`}>
              {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
          </div>
          <span>{project.type}</span>
        </div>
      </a>
    </article>
  );
}

function ObservatoryContact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submitContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error("Unable to send");
      setForm({ name: "", email: "", message: "", company: "" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.contactIntro}>
        <p className={styles.eyebrow}><span /> Contact</p>
        <h2>Send a message.</h2>
        <p>I&apos;m available for full-time roles, freelance projects, and collaborations.</p>
        <div className={styles.contactDetails}>
          <span>Email</span>
          <a href="mailto:darianaxelsawali@gmail.com">darianaxelsawali@gmail.com</a>
          <span>Location</span>
          <p>Vancouver, BC</p>
        </div>
      </div>

      <form className={styles.contactForm} onSubmit={submitContact}>
        <input
          className={styles.honeypot}
          name="company"
          value={form.company}
          onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <label>
          <span>01 / Name</span>
          <input
            name="name"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            autoComplete="name"
            maxLength={100}
            required
            placeholder="Your name"
          />
        </label>
        <label>
          <span>02 / Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            autoComplete="email"
            maxLength={254}
            required
            placeholder="you@example.com"
          />
        </label>
        <label>
          <span>03 / Message</span>
          <textarea
            name="message"
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
            maxLength={5000}
            rows={5}
            required
            placeholder="Your message"
          />
        </label>
        <div className={styles.contactSubmitRow}>
          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send message"}
            <FiArrowUpRight />
          </button>
          <p role="status" aria-live="polite">
            {status === "sent" && "Message sent."}
            {status === "error" && "Message failed. Please email me directly."}
          </p>
        </div>
      </form>
    </section>
  );
}

function CodeHeroLine({ text }: { text: string }) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleText(text);
      return;
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, 55);
    return () => window.clearInterval(timer);
  }, [text]);

  return (
    <span aria-label={text}>
      <span aria-hidden="true">{visibleText}</span>
      <span className={styles.heroCursor} aria-hidden="true">_</span>
    </span>
  );
}

function SmallCometCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursorHead = headRef.current;
    const context = canvas?.getContext("2d");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canvas || !cursorHead || !context || !finePointer || reducedMotion) return;

    type TrailPoint = { x: number; y: number; createdAt: number; speed: number };
    const trail: TrailPoint[] = [];
    const pointer = { x: -100, y: -100, visible: false };
    const lifetime = 130;
    const radius = 4;
    const maxPoints = 48;
    let frame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const colorFor = (speed: number, alpha: number) => {
      const mix = Math.min(1, speed / 22);
      const red = Math.round(139 + (196 - 139) * mix);
      const green = Math.round(92 + (181 - 92) * mix);
      const blue = Math.round(246 + (253 - 246) * mix);
      return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    };

    const paintTrail = (now: number, blurred: boolean) => {
      context.save();
      context.lineCap = "round";
      context.lineJoin = "round";
      context.filter = blurred ? "blur(2px)" : "none";
      context.globalCompositeOperation = "lighter";

      for (let index = 1; index < trail.length - 1; index += 1) {
        const previous = trail[index - 1];
        const current = trail[index];
        const next = trail[index + 1];
        const life = Math.max(0, 1 - (now - current.createdAt) / lifetime);
        if (life <= 0) continue;

        const startX = (previous.x + current.x) / 2;
        const startY = (previous.y + current.y) / 2;
        const endX = (current.x + next.x) / 2;
        const endY = (current.y + next.y) / 2;
        context.beginPath();
        context.moveTo(startX, startY);
        context.quadraticCurveTo(current.x, current.y, endX, endY);
        context.lineWidth = radius * 2 * life * (blurred ? 1.35 : 0.72);
        context.strokeStyle = colorFor(current.speed, life * (blurred ? 0.26 : 0.52));
        context.stroke();
      }
      context.restore();
    };

    const render = () => {
      const now = performance.now();
      context.clearRect(0, 0, width, height);
      while (trail.length && now - trail[0].createdAt > lifetime) trail.shift();

      if (pointer.visible) {
        paintTrail(now, true);
        paintTrail(now, false);
      }
      frame = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const targetElement = event.target as Element | null;
      if (!targetElement?.closest(`.${styles.observatory}`)) {
        pointer.visible = false;
        cursorHead.style.opacity = "0";
        return;
      }
      const previous = trail[trail.length - 1];
      const distance = previous ? Math.hypot(event.clientX - previous.x, event.clientY - previous.y) : 0;
      const speed = distance;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.visible = true;
      cursorHead.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      cursorHead.style.opacity = "1";
      const now = performance.now();
      const steps = previous ? Math.min(4, Math.max(1, Math.ceil(distance / 10))) : 1;
      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        trail.push({
          x: previous ? previous.x + (event.clientX - previous.x) * progress : event.clientX,
          y: previous ? previous.y + (event.clientY - previous.y) * progress : event.clientY,
          createdAt: now - (steps - step) * 1.5,
          speed,
        });
      }
      if (trail.length > maxPoints) trail.splice(0, trail.length - maxPoints);
    };
    const onPointerLeave = () => {
      pointer.visible = false;
      cursorHead.style.opacity = "0";
    };
    const onPointerEnter = () => { pointer.visible = true; };

    resize();
    render();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    document.documentElement.addEventListener("mouseenter", onPointerEnter);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      document.documentElement.removeEventListener("mouseenter", onPointerEnter);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className={styles.smallCometCanvas} aria-hidden="true" />
      <span ref={headRef} className={styles.smallCometHead} aria-hidden="true" />
    </>
  );
}

function SkillConstellation() {
  const categories = ["All", "Frontend", "Backend", "Data", "Platforms", "Creative"];
  const [category, setCategory] = useState("All");
  const [activeId, setActiveId] = useState("typescript");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [positions, setPositions] = useState(() => Object.fromEntries(skillStars.map((skill) => [skill.id, { x: skill.x, y: skill.y }])));
  const chartRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef(Object.fromEntries(skillStars.map((skill) => [skill.id, { x: skill.x, y: skill.y, vx: 0, vy: 0, dragging: false }])));
  const dragIdRef = useRef<string | null>(null);
  const activeSkill = skillStars.find((skill) => skill.id === activeId) ?? skillStars[2];
  const isVisible = (id: string) => {
    const skill = skillStars.find((item) => item.id === id);
    return category === "All" || skill?.category === category;
  };
  const selectCategory = (nextCategory: string) => {
    setCategory(nextCategory);
    if (nextCategory !== "All") {
      const firstMatch = skillStars.find((skill) => skill.category === nextCategory);
      if (firstMatch) setActiveId(firstMatch.id);
    }
  };

  useEffect(() => {
    let frame = 0;
    const animate = () => {
      const nodes = nodesRef.current;
      const visibleIds = skillStars.filter((skill) => category === "All" || skill.category === category).map((skill) => skill.id);

      for (let firstIndex = 0; firstIndex < visibleIds.length; firstIndex += 1) {
        for (let secondIndex = firstIndex + 1; secondIndex < visibleIds.length; secondIndex += 1) {
          const first = nodes[visibleIds[firstIndex]];
          const second = nodes[visibleIds[secondIndex]];
          const dx = second.x - first.x;
          const dy = second.y - first.y;
          const distance = Math.max(1, Math.hypot(dx, dy));
          if (distance < 17) {
            const force = (17 - distance) * 0.0022;
            if (!first.dragging) { first.vx -= (dx / distance) * force; first.vy -= (dy / distance) * force; }
            if (!second.dragging) { second.vx += (dx / distance) * force; second.vy += (dy / distance) * force; }
          }
        }
      }

      for (const [fromId, toId] of skillLinks) {
        if (!visibleIds.includes(fromId) || !visibleIds.includes(toId)) continue;
        const from = nodes[fromId];
        const to = nodes[toId];
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const distance = Math.max(1, Math.hypot(dx, dy));
        const force = (distance - 22) * 0.00075;
        if (!from.dragging) { from.vx += (dx / distance) * force; from.vy += (dy / distance) * force; }
        if (!to.dragging) { to.vx -= (dx / distance) * force; to.vy -= (dy / distance) * force; }
      }

      for (const skill of skillStars) {
        const node = nodes[skill.id];
        if (!node.dragging) {
          node.vx += (skill.x - node.x) * 0.00045;
          node.vy += (skill.y - node.y) * 0.00045;
          node.vx *= 0.91;
          node.vy *= 0.91;
          node.x = Math.min(95, Math.max(5, node.x + node.vx));
          node.y = Math.min(93, Math.max(7, node.y + node.vy));
        }
      }
      setPositions(Object.fromEntries(skillStars.map((skill) => [skill.id, { x: nodes[skill.id].x, y: nodes[skill.id].y }])));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [category]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const dragId = dragIdRef.current;
      const chart = chartRef.current;
      if (!dragId || !chart) return;
      const rect = chart.getBoundingClientRect();
      const node = nodesRef.current[dragId];
      const nextX = Math.min(95, Math.max(5, ((event.clientX - rect.left) / rect.width) * 100));
      const nextY = Math.min(93, Math.max(7, ((event.clientY - rect.top) / rect.height) * 100));
      node.vx = nextX - node.x;
      node.vy = nextY - node.y;
      node.x = nextX;
      node.y = nextY;
    };
    const onPointerUp = () => {
      const dragId = dragIdRef.current;
      if (dragId) nodesRef.current[dragId].dragging = false;
      dragIdRef.current = null;
      setDraggingId(null);
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  const beginDrag = (id: string, event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setActiveId(id);
    setDraggingId(id);
    dragIdRef.current = id;
    Object.assign(nodesRef.current[id], { dragging: true, vx: 0, vy: 0 });
  };

  const moveWithKeyboard = (id: string, event: React.KeyboardEvent<HTMLButtonElement>) => {
    const movement: Record<string, [number, number]> = { ArrowLeft: [-2, 0], ArrowRight: [2, 0], ArrowUp: [0, -2], ArrowDown: [0, 2] };
    const delta = movement[event.key];
    if (!delta) return;
    event.preventDefault();
    const node = nodesRef.current[id];
    node.x = Math.min(95, Math.max(5, node.x + delta[0]));
    node.y = Math.min(93, Math.max(7, node.y + delta[1]));
    node.vx = delta[0] * 0.18;
    node.vy = delta[1] * 0.18;
    setActiveId(id);
  };

  const resetNetwork = () => {
    dragIdRef.current = null;
    setDraggingId(null);
    setCategory("All");
    setActiveId("typescript");
    for (const skill of skillStars) nodesRef.current[skill.id] = { x: skill.x, y: skill.y, vx: 0, vy: 0, dragging: false };
    setPositions(Object.fromEntries(skillStars.map((skill) => [skill.id, { x: skill.x, y: skill.y }])));
  };

  return (
    <div className={styles.constellationSection}>
      <header className={styles.constellationHeader}>
        <div>
          <p>Skills</p>
          <h2>Technologies I work with.</h2>
        </div>
        <div className={styles.skillFilters} aria-label="Filter skills by category">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={category === item ? styles.activeFilter : ""}
              onClick={() => selectCategory(item)}
              aria-pressed={category === item}
              aria-controls="skills-constellation"
            >
              {item}
            </button>
          ))}
          <button type="button" onClick={resetNetwork} className={styles.resetNetwork} aria-controls="skills-constellation">Reset layout</button>
        </div>
      </header>

      <div className={styles.constellationFrame}>
        <div id="skills-constellation" ref={chartRef} className={styles.chart} aria-label="Draggable map of technical skills">
          <ConstellationBackground />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {skillLinks.map(([fromId, toId]) => {
              const from = skillStars.find((skill) => skill.id === fromId)!;
              const to = skillStars.find((skill) => skill.id === toId)!;
              const highlighted = activeId === fromId || activeId === toId;
              const fromPosition = positions[fromId] ?? from;
              const toPosition = positions[toId] ?? to;
              const lineStart = activeId === toId ? toPosition : fromPosition;
              const lineEnd = activeId === toId ? fromPosition : toPosition;
              const hidden = !isVisible(fromId) || !isVisible(toId);
              return (
                <g key={`${activeId}-${fromId}-${toId}`} className={hidden ? styles.hiddenLine : ""}>
                  <line
                    pathLength="1"
                    x1={lineStart.x} y1={lineStart.y} x2={lineEnd.x} y2={lineEnd.y}
                    className={highlighted ? styles.activeLine : ""}
                  />
                  {highlighted && !hidden && (
                    <line
                      pathLength="1"
                      x1={lineStart.x} y1={lineStart.y} x2={lineEnd.x} y2={lineEnd.y}
                      className={styles.branchGlow}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {skillStars.map((skill) => {
            const active = activeId === skill.id;
            return (
              <button
                type="button"
                key={skill.id}
                className={`${styles.skillStar} ${skill.compact ? styles.satelliteStar : ""} ${active ? styles.activeStar : ""} ${draggingId === skill.id ? styles.draggingStar : ""} ${isVisible(skill.id) ? "" : styles.dimmedStar}`}
                style={{ left: `${positions[skill.id]?.x ?? skill.x}%`, top: `${positions[skill.id]?.y ?? skill.y}%`, "--star-size": `${skill.size}px` } as React.CSSProperties}
                onMouseEnter={() => setActiveId(skill.id)}
                onFocus={() => setActiveId(skill.id)}
                onClick={() => setActiveId(skill.id)}
                onPointerDown={(event) => beginDrag(skill.id, event)}
                onKeyDown={(event) => moveWithKeyboard(skill.id, event)}
                aria-label={`${skill.label}: ${skill.note}`}
              >
                <PiStarFourFill aria-hidden="true" /><span>{skill.label}</span>
              </button>
            );
          })}
        </div>

        <aside className={styles.skillReadout} aria-live="polite">
          <div className={styles.readoutIndex}>SKILL / {String(skillStars.indexOf(activeSkill) + 1).padStart(2, "0")}</div>
          <div className={styles.readoutGlyph}><span /><span /><span /></div>
          <p>{activeSkill.category}</p>
          <h3>{activeSkill.label}</h3>
          <strong>{activeSkill.note}</strong>
          <div><small>Used in</small><span>{activeSkill.projects}</span></div>
        </aside>
      </div>
      <p className={styles.chartHint}>Drag a star to reshape the network. Arrow keys move a focused star.</p>
    </div>
  );
}

function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !container || !context) return;

    type BackgroundStar = { baseX: number; baseY: number; x: number; y: number; vx: number; vy: number; size: number; alpha: number };
    let stars: BackgroundStar[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    const pointer = { x: 0, y: 0, active: false };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const seeded = (index: number, offset: number) => {
      const value = Math.sin(index * 9283.31 + offset * 77.17) * 43758.5453;
      return value - Math.floor(value);
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(42, Math.round(width / 13));
      stars = Array.from({ length: count }, (_, index) => {
        const baseX = seeded(index, 1) * width;
        const baseY = seeded(index, 2) * height;
        return { baseX, baseY, x: baseX, y: baseY, vx: 0, vy: 0, size: .6 + seeded(index, 3) * 1.25, alpha: .16 + seeded(index, 4) * .38 };
      });
    };

    const render = () => {
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        if (!reduceMotion) {
          const dx = pointer.x - star.x;
          const dy = pointer.y - star.y;
          const distance = Math.max(18, Math.hypot(dx, dy));
          const influence = pointer.active ? Math.max(0, 1 - distance / 150) : 0;
          if (influence > 0) {
            const force = influence * influence * 0.19;
            star.vx += (dx / distance) * force;
            star.vy += (dy / distance) * force;
          }
          star.vx += (star.baseX - star.x) * 0.0035;
          star.vy += (star.baseY - star.y) * 0.0035;
          star.vx *= 0.94;
          star.vy *= 0.94;
          star.x += star.vx;
          star.y += star.vy;
        }

        const pointerDistance = pointer.active ? Math.hypot(pointer.x - star.x, pointer.y - star.y) : 999;
        const glow = Math.max(0, 1 - pointerDistance / 125);
        context.fillStyle = `rgba(196, 181, 253, ${star.alpha + glow * 0.42})`;
        context.beginPath();
        context.arc(star.x, star.y, star.size + glow * 1.15, 0, Math.PI * 2);
        context.fill();
      }
      frame = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => { pointer.active = false; };
    const observer = new ResizeObserver(resize);

    resize();
    render();
    observer.observe(container);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.chartStarCanvas} aria-hidden="true" />;
}

function RotatingPlanet() {
  const group = useRef<Group>(null);
  const reduceMotion = useReducedMotion();

  useFrame((_, delta) => {
    if (group.current && !reduceMotion) group.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={group} rotation={[0.12, -0.55, -0.08]}>
      <EarthModel scaleFactor={0.92} />
    </group>
  );
}

function DeveloperOS() {
  return (
    <div className={styles.desktop}>
      <div className={styles.desktopGlow} aria-hidden="true" />
      <header className={styles.osBar}>
        <div className={styles.osBrand}><FiCommand /> darianOS</div>
        <div className={styles.osStatus}><span>Vancouver</span><span>Open to work</span><i /></div>
        <time>09:41</time>
      </header>

      <div className={styles.desktopArea}>
        <aside className={styles.dock} aria-label="Applications">
          <button type="button" aria-label="About"><FiGlobe /></button>
          <button type="button" aria-label="Projects"><FiFolder /></button>
          <button type="button" aria-label="Terminal"><FiTerminal /></button>
          <button type="button" aria-label="Contact"><FiMail /></button>
        </aside>

        <section className={`${styles.window} ${styles.profileWindow}`}>
          <WindowBar title="profile.md" icon={<FiCircle />} />
          <div className={styles.profileContent}>
            <p className={styles.codeLabel}>{"// SOFTWARE DEVELOPER"}</p>
            <h1>Hi, I&apos;m<br /><span>Darian.</span></h1>
            <p>I turn complex problems into clear, human digital experiences.</p>
            <div className={styles.commandLine}><span>›</span> view selected_work <b>↵</b></div>
          </div>
        </section>

        <section className={`${styles.window} ${styles.projectsWindow}`}>
          <WindowBar title="projects.app" icon={<FiFolder />} />
          <div className={styles.windowToolbar}>
            <span>Selected work</span><small>3 items</small>
          </div>
          <div className={styles.fileList}>
            {projects.map((project, index) => (
              <article key={project.title}>
                <div className={styles.fileIcon}><FiCode /></div>
                <div><h2>{project.title}</h2><p>{project.type}</p></div>
                <span>0{index + 1}</span><FiArrowUpRight />
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.window} ${styles.terminalWindow}`}>
          <WindowBar title="terminal — zsh" icon={<FiTerminal />} dark />
          <div className={styles.terminalBody}>
            <p><span>~</span> skills --list</p>
            <p className={styles.output}>react&nbsp;&nbsp; next.js&nbsp;&nbsp; typescript<br />node&nbsp;&nbsp;&nbsp; three.js&nbsp; tailwind</p>
            <p><span>~</span> status</p>
            <p className={styles.success}>● available for opportunities</p>
            <p><span>~</span> <i className={styles.cursor} /></p>
          </div>
        </section>

        <div className={styles.desktopHint}>Drag the idea around in your head. The windows are just the beginning.</div>
      </div>

      <footer className={styles.taskbar}>
        <button type="button"><FiCommand /><span>Start</span></button>
        <div><span>profile.md</span><span>projects.app</span><span>terminal</span></div>
        <p>© Darian Sawali</p>
      </footer>
    </div>
  );
}

function WindowBar({ title, icon, dark = false }: { title: string; icon: React.ReactNode; dark?: boolean }) {
  return (
    <header className={`${styles.windowBar} ${dark ? styles.windowBarDark : ""}`}>
      <span>{icon}{title}</span>
      <div><FiMinus /><FiCircle /><FiX /></div>
    </header>
  );
}
