import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

/**
 * Homepage — one scrolling narrative:
 *
 *   Who am I? → What can I do? → Where have I worked? → What have I built?
 *   → What have I studied? → How do you reach me?
 *
 * Each section reads its own slice of `src/data` and hides itself when that
 * slice is empty, so the page never renders an empty heading.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Certifications />
      <Achievements />
      <Contact />
    </>
  );
}
