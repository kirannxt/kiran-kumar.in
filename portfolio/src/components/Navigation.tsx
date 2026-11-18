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
      {/* Radiant Electric Cyan Progress Bar */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "3px",
          width: `${progress * 100}%`,
          background: "linear-gradient(90deg, #38bdf8 0%, #06b6d4 50%, #60a5fa 100%)",
          boxShadow: "0 0 14px rgba(56, 189, 248, 0.8)",
          zIndex: 100,
          transition: "width 0.12s linear",
        }}
      />

      <nav
        style={{
          position: "fixed",
          top: "14px",
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
          style={{ display: "flex", alignItems: "center", gap: "0.75rem", pointerEvents: "auto" }}
        >
          <button
            onClick={() => scrollToTarget("#hero")}
            aria-label="Back to top"
            style={{
              position: "relative",
              width: 42,
              height: 42,
              borderRadius: "50%",
              border: scrolled ? "1px solid rgba(125, 211, 252, 0.4)" : "1.5px solid rgba(125, 211, 252, 0.3)",
              background: scrolled
                ? "linear-gradient(135deg, rgba(14, 24, 48, 0.92), rgba(6, 11, 22, 0.96))"
                : "rgba(8, 15, 30, 0.6)",
              backdropFilter: "blur(12px)",
              color: "var(--ink)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              fontWeight: 700,
              boxShadow: scrolled
                ? "0 4px 16px rgba(0, 0, 0, 0.5), 0 0 14px rgba(56, 189, 248, 0.2)"
                : "0 2px 10px rgba(0, 0, 0, 0.3)",
              transition: "all 0.35s var(--ease)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = "rotate(360deg) scale(1.08)";
              el.style.borderColor = "#7dd3fc";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = "none";
              el.style.borderColor = scrolled ? "rgba(125, 211, 252, 0.4)" : "rgba(125, 211, 252, 0.3)";
            }}
          >
            KK
          </button>
          <span
            className="nav-name"
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
              opacity: scrolled ? 0.45 : 1,
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
            gap: "0.25rem",
            background: scrolled
              ? "rgba(10, 17, 34, 0.88)"
              : "rgba(10, 17, 34, 0.55)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: "999px",
            padding: "5px 7px",
            border: "1px solid rgba(125, 211, 252, 0.16)",
            boxShadow: scrolled
              ? "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(14, 165, 233, 0.14)"
              : "0 4px 20px rgba(0, 0, 0, 0.25)",
            transition: "all 0.35s var(--ease)",
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
                  padding: "0.45rem 1.05rem",
                  borderRadius: "999px",
                  fontSize: "0.84rem",
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: "-0.01em",
                  background: isActive
                    ? "linear-gradient(135deg, #7dd3fc 0%, #38bdf8 100%)"
                    : "transparent",
                  color: isActive ? "#040914" : "var(--ink)",
                  boxShadow: isActive ? "0 2px 14px rgba(56, 189, 248, 0.4)" : "none",
                  transition: "all 0.25s var(--ease)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.background = "rgba(125, 211, 252, 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--ink)";
                    e.currentTarget.style.background = "transparent";
                  }
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
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.55rem 1.15rem",
            borderRadius: "999px",
            border: "1px solid rgba(125, 211, 252, 0.25)",
            background: "rgba(10, 17, 34, 0.88)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "var(--ink)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#38bdf8" }} />
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
          background: "linear-gradient(180deg, #060b14 0%, #0b1426 100%)",
          zIndex: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(1.5rem, 5vw, 3rem) var(--gutter)",
          clipPath: menuOpen
            ? "circle(150% at 95% 5%)"
            : "circle(0% at 95% 5%)",
          transition: "clip-path 0.5s var(--ease)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <div>
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "3rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "1px solid rgba(125, 211, 252, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  color: "var(--ink-2)",
                }}
              >
                KK
              </div>
              <span style={{ fontSize: "0.85rem", color: "var(--mute)" }}>
                {PROFILE.name}
              </span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "999px",
                border: "1px solid rgba(125, 211, 252, 0.25)",
                background: "rgba(17, 29, 56, 0.6)",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--ink)",
              }}
            >
              Close ×
            </button>
          </div>

          {/* Navigation Links */}
          <nav>
            {NAV.map((item, i) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  textAlign: "left",
                  padding: "1.1rem 0",
                  borderBottom: "1px solid rgba(125, 211, 252, 0.1)",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "none" : "translateY(20px)",
                  transition: `opacity 0.4s var(--ease) ${i * 60}ms, transform 0.4s var(--ease) ${i * 60}ms`,
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(1.6rem, 7vw, 3rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    color: "var(--ink)",
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    color: "var(--mute)",
                  }}
                >
                  0{i + 1} →
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile footer bar */}
        <div
          style={{
            paddingTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            opacity: menuOpen ? 1 : 0,
            transition: "opacity 0.4s var(--ease) 300ms",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "#38bdf8" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 8px #38bdf8" }} />
            <span>Open for new opportunities</span>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a
              href={`mailto:${PROFILE.email}`}
              className="btn-primary"
              style={{ fontSize: "0.8rem", padding: "0.6rem 1.2rem" }}
            >
              Email me
            </a>
            <a
              href={PROFILE.resumePath}
              download
              className="btn-outline"
              style={{ fontSize: "0.8rem", padding: "0.6rem 1.2rem" }}
            >
              Resume ↓
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .nav-name { display: none !important; }
        }
      `}</style>
    </>
  );
}
