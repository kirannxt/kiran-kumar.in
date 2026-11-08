"use client";
import { useEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll progress bar + scrolled state
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setScrolled(scrollTop > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const sections = NAV.map((n) =>
      document.getElementById(n.href.replace("#", ""))
    ).filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Lock scroll + Esc close
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", handler);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handler);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    scrollToTarget(href);
  };

  return (
    <>
      {/* Progress bar */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "2px",
          width: `${progress * 100}%`,
          background: "var(--ink)",
          zIndex: 100,
          transition: "width 0.1s linear",
        }}
      />

      <nav
        style={{
          position: "fixed",
          top: "12px",
          left: 0,
          right: 0,
          zIndex: 90,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 var(--gutter)",
          pointerEvents: "none",
        }}
      >
        {/* Logo mark + name */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "0.6rem", pointerEvents: "auto" }}
        >
          <button
            onClick={() => scrollToTarget("#hero")}
            aria-label="Back to top"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1.5px solid var(--ink)",
              background: scrolled ? "var(--ink)" : "transparent",
              color: scrolled ? "var(--paper)" : "var(--ink)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
              fontWeight: 600,
              transition: "all 0.3s var(--ease)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.transform =
                "rotate(360deg)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.transform = "none")
            }
          >
            KK
          </button>
          <span
            style={{
              fontSize: "0.88rem",
              fontWeight: 600,
              opacity: scrolled ? 0 : 1,
              transition: "opacity 0.3s var(--ease)",
              whiteSpace: "nowrap",
            }}
          >
            {PROFILE.name}
          </span>
        </div>

        {/* Desktop pill */}
        <div
          className="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.2rem",
            background: scrolled
              ? "rgba(244,242,238,0.85)"
              : "transparent",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            borderRadius: "999px",
            padding: scrolled ? "6px" : "0",
            border: scrolled ? "1px solid var(--line)" : "none",
            transition: "all 0.4s var(--ease)",
            pointerEvents: "auto",
          }}
        >
          {NAV.map((item) => {
            const isActive = activeId === item.href.replace("#", "");
            return (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                style={{
                  position: "relative",
                  padding: "0.45rem 1rem",
                  borderRadius: "999px",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  background: isActive ? "var(--ink)" : "transparent",
                  color: isActive ? "var(--paper)" : "var(--ink)",
                  transition: "all 0.25s var(--ease)",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          style={{
            pointerEvents: "auto",
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            border: "1px solid var(--line)",
            background: "rgba(244,242,238,0.85)",
            backdropFilter: "blur(12px)",
            fontSize: "0.85rem",
            fontWeight: 600,
          }}
        >
          Menu
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        ref={menuRef}
        aria-modal
        role="dialog"
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--paper)",
          zIndex: 200,
          display: "flex",
          flexDirection: "column",
          padding: "var(--gutter)",
          clipPath: menuOpen
            ? "circle(150% at 95% 5%)"
            : "circle(0% at 95% 5%)",
          transition: "clip-path 0.5s var(--ease)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "3rem",
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              padding: "0.5rem 1.2rem",
              borderRadius: "999px",
              border: "1px solid var(--line)",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            Close
          </button>
        </div>
        <nav>
          {NAV.map((item, i) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "1rem",
                width: "100%",
                textAlign: "left",
                padding: "1rem 0",
                borderBottom: "1px solid var(--line)",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "none" : "translateY(20px)",
                transition: `opacity 0.4s var(--ease) ${i * 60}ms, transform 0.4s var(--ease) ${i * 60}ms`,
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.72rem",
                  color: "var(--mute)",
                  minWidth: "2rem",
                }}
              >
                0{i + 1}
              </span>
              <span
                style={{
                  fontSize: "clamp(1.8rem, 8vw, 3.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                }}
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}
