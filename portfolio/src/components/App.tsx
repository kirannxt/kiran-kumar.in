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

interface AppProps {
  onToggleMigration?: () => void;
  isMigration?: boolean;
}

export default function App({ onToggleMigration }: AppProps) {
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

      {/* Floating Mode Switcher Button (Bottom Left) */}
      {onToggleMigration && (
        <aside
          aria-label="Site view toggle"
          style={{
            position: "fixed",
            bottom: 20,
            left: 20,
            zIndex: 900,
          }}
        >
          <button
            type="button"
            onClick={onToggleMigration}
            title="Toggle between Full Portfolio and Migration Page"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.45rem 0.9rem",
              borderRadius: 999,
              background: "rgba(6, 11, 20, 0.88)",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              color: "var(--ink-2, #7dd3fc)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
              fontWeight: 600,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5), 0 0 16px rgba(14, 165, 233, 0.2)",
              backdropFilter: "blur(12px)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#38bdf8";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.35)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#34d399",
              }}
            />
            <span>Mode: Live Site (Click to Switch)</span>
          </button>
        </aside>
      )}
    </>
  );
}
