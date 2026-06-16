import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Writing from "@/components/Writing";
import AiAgent from "@/components/AiAgent";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <Nav />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Writing />
        <AiAgent />
        <Contact />
      </main>
    </>
  );
}
