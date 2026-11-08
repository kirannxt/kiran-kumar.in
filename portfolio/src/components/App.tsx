"use client";
import { useEffect } from "react";
import { LenisProvider } from "@/lib/scroll";
import { useRevealObserver } from "@/lib/hooks";
import Navigation from "./Navigation";
import Hero from "./hero/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Work from "./sections/Work";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

export default function App() {
  useRevealObserver();

  return (
    <>
      <LenisProvider />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
