import { Hero } from "@/components/sections/Hero";
import dynamic from "next/dynamic";

// Dynamically import sections below the fold
const About = dynamic(() =>
  import("@/components/sections/About").then((mod) => ({ default: mod.About })),
  {
    loading: () => <div className="h-96" />,
  }
);

const Skills = dynamic(() =>
  import("@/components/sections/Skills").then((mod) => ({ default: mod.Skills })),
  {
    loading: () => <div className="h-96" />,
  }
);

const Projects = dynamic(() =>
  import("@/components/sections/Projects").then((mod) => ({ default: mod.Projects })),
  {
    loading: () => <div className="h-96" />,
  }
);

const Contact = dynamic(() =>
  import("@/components/sections/Contact").then((mod) => ({ default: mod.Contact })),
  {
    loading: () => <div className="h-96" />,
  }
);

const Footer = dynamic(() =>
  import("@/components/sections/Footer").then((mod) => ({ default: mod.Footer })),
  {
    loading: () => <div className="h-24" />,
  }
);

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
