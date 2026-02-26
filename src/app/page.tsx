import { Hero } from "@/components/sections/Hero";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Hero />
      <Hero />
      <About />
      <Skills />
      <Contact />
    </main>
  );
}
