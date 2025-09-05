
import SkillsSection from "@/components/SkillsSection";
import EarthOverlay from "@/components/EarthOverlay";
import ProjectsFolderReveal from "@/components/ProjectsFolderReveal";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <EarthOverlay />

      <Navbar />
      <section id="hero" className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">Hi, I&apos;m Darian.</h1>
          <p className="mt-4 text-lg text-white/70">I&apos;m a Software Developer from Simon Fraser University.</p>
          <div className="mt-8 flex gap-4">
            <a href="#work" className="rounded-xl bg-white px-5 py-3 text-black">View Work</a>
            <a href="#contact" className="rounded-xl border border-white/20 px-5 py-3">Contact</a>
          </div>
        </div>
      </section>

      <section id="skills" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-semibold">Skills</h2>
        <SkillsSection />
        
      </section>
      
      <section id="projects" className="relative z-10 mx-auto max-w-6xl px-6 py-24 mb-10">
        <h2 className="text-3xl font-semibold">Projects</h2>
        <ProjectsFolderReveal />
      </section>

      <section id="contact" className="relative z-10 mx-auto max-w-6xl px-6 py-24 mb-10">
        <h2 className="text-3xl font-semibold">Contact</h2>
        <ContactSection />
      </section>

      <Footer />
    </>
  );
}
