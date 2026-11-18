"use client";
import { useRef, useEffect, useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";
import { useCountUp } from "@/lib/hooks";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const yearsCount = useCountUp(8, 1200, mounted);
  const productsCount = useCountUp(5, 1200, mounted);
  const stackCount = useCountUp(10, 1200, mounted);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "grid",
        gridTemplateColumns: "1.05fr 0.95fr",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--paper)",
        paddingTop: "80px",
      }}
    >
      {/* Ambient background glow spotlight */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -20%)",
          width: "min(850px, 90vw)",
          height: "500px",
          background: "radial-gradient(ellipse, rgba(14, 165, 233, 0.14) 0%, rgba(59, 130, 246, 0.06) 50%, transparent 75%)",
          filter: "blur(65px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Ghost background watermark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontSize: "clamp(6rem, 20vw, 20rem)",
            fontWeight: 800,
            letterSpacing: "-0.06em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(125, 211, 252, 0.05)",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {PROFILE.name.split(" ")[0].toUpperCase()}
        </span>
      </div>

      {/* Left Column — Text & CTAs */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "clamp(2rem, 5vw, 4.5rem) var(--gutter)",
          display: "flex",
          flexDirection: "column",
          gap: "2.2rem",
        }}
      >
        <div>
          {/* Status badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "rgba(14, 165, 233, 0.1)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              padding: "0.35rem 0.9rem",
              borderRadius: "999px",
              marginBottom: "1.4rem",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#38bdf8",
                boxShadow: "0 0 10px #38bdf8",
                animation: "pulseGlow 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.68rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ink-2)",
                fontWeight: 600,
              }}
            >
              Available for new projects
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.4rem, 5vw, 5.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.045em",
              lineHeight: 1.04,
              marginBottom: "1.5rem",
              color: "var(--ink)",
            }}
          >
            Full Stack
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #bae6fd 0%, #38bdf8 50%, #60a5fa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Engineer.
            </span>
          </h1>

          <p
            style={{
              color: "var(--mute)",
              fontSize: "clamp(0.92rem, 1.25vw, 1.05rem)",
              lineHeight: 1.7,
              maxWidth: "460px",
              fontWeight: 400,
            }}
          >
            {PROFILE.name} — 8+ years crafting high-performance web applications,
            AI-driven platforms, and robust distributed systems.
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", alignItems: "center" }}>
          <button className="btn-primary" onClick={() => scrollToTarget("#work")}>
            <span>Explore work</span>
            <span aria-hidden="true" style={{ fontSize: "1.1rem", lineHeight: 1 }}>→</span>
          </button>
          <button className="btn-outline" onClick={() => scrollToTarget("#contact")}>
            Let&apos;s talk
          </button>
          <a
            className="btn-outline"
            href={PROFILE.resumePath}
            download
            aria-label="Download résumé PDF"
            style={{ display: "inline-flex", gap: "0.45rem" }}
          >
            <span>Resume</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        {/* Live Animated Stats Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, auto)",
            gap: "clamp(1.5rem, 3.5vw, 3rem)",
            justifyContent: "start",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(125, 211, 252, 0.12)",
          }}
        >
          {[
            { num: `${yearsCount}+`, label: "Years Exp." },
            { num: `${productsCount}+`, label: "Products Built" },
            { num: `${stackCount}+`, label: "Core Technologies" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div
                style={{
                  fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  background: "linear-gradient(135deg, #f0f6ff 30%, #7dd3fc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.68rem",
                  color: "var(--mute)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginTop: "0.4rem",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column — Interactive Laptop Illustration with Floating Badges */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          minHeight: "58svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem var(--gutter)",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: 540,
          }}
        >
          {/* Laptop SVG with Glow Reflection */}
          <div
            style={{
              position: "relative",
              filter: "drop-shadow(0 24px 48px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 40px rgba(14, 165, 233, 0.18))",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <svg
              viewBox="0 0 520 360"
              style={{ width: "clamp(290px, 42vw, 510px)", height: "auto" }}
              aria-label="Interactive Laptop code editor preview"
            >
              {/* Outer screen lid */}
              <rect x="58" y="18" width="404" height="254" rx="16" fill="#0f1a30" stroke="rgba(125, 211, 252, 0.22)" strokeWidth="1.5" />
              {/* Screen bezel inner */}
              <rect x="70" y="28" width="380" height="234" rx="10" fill="#060c18" />
              {/* Screen editor surface */}
              <rect x="78" y="36" width="364" height="218" rx="7" fill="#091324" />

              {/* Editor tab bar */}
              <rect x="78" y="36" width="364" height="28" rx="5" fill="#0d182e" />
              {/* Window traffic lights */}
              <circle cx="98" cy="50" r="5" fill="#ef4444" opacity="0.9" />
              <circle cx="114" cy="50" r="5" fill="#eab308" opacity="0.9" />
              <circle cx="130" cy="50" r="5" fill="#22c55e" opacity="0.9" />

              {/* Active Tab */}
              <rect x="150" y="40" width="100" height="24" rx="5" fill="#091324" />
              <circle cx="162" cy="52" r="3" fill="#38bdf8" />
              <text x="172" y="55" fontSize="8.5" fill="#7dd3fc" fontFamily="monospace" fontWeight="600">
                portfolio.tsx
              </text>

              {/* Line numbers column */}
              <rect x="78" y="64" width="28" height="174" fill="#060c18" />
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n, i) => (
                <text key={n} x="85" y={80 + i * 15} fontSize="7.5" fill="#334a6e" fontFamily="monospace">
                  {n}
                </text>
              ))}

              {/* Syntax highlighted code */}
              <text x="114" y="80" fontSize="8" fontFamily="monospace">
                <tspan fill="#38bdf8">const</tspan>
                <tspan fill="#f0f6ff"> engineer </tspan>
                <tspan fill="#38bdf8">=</tspan>
                <tspan fill="#f0f6ff"> {"{"}</tspan>
              </text>

              <text x="114" y="95" fontSize="8" fontFamily="monospace">
                <tspan fill="#7dd3fc">  name</tspan>
                <tspan fill="#f0f6ff">: </tspan>
                <tspan fill="#34d399">{`"${PROFILE.name}"`}</tspan>
                <tspan fill="#f0f6ff">,</tspan>
              </text>

              <text x="114" y="110" fontSize="8" fontFamily="monospace">
                <tspan fill="#7dd3fc">  role</tspan>
                <tspan fill="#f0f6ff">: </tspan>
                <tspan fill="#34d399">"Full Stack Developer"</tspan>
                <tspan fill="#f0f6ff">,</tspan>
              </text>

              <text x="114" y="125" fontSize="8" fontFamily="monospace">
                <tspan fill="#7dd3fc">  experience</tspan>
                <tspan fill="#f0f6ff">: </tspan>
                <tspan fill="#fbbf24">"8+ Years"</tspan>
                <tspan fill="#f0f6ff">,</tspan>
              </text>

              <text x="114" y="140" fontSize="8" fontFamily="monospace">
                <tspan fill="#7dd3fc">  stack</tspan>
                <tspan fill="#f0f6ff">: [</tspan>
                <tspan fill="#38bdf8">"React"</tspan>
                <tspan fill="#f0f6ff">, </tspan>
                <tspan fill="#38bdf8">"Angular"</tspan>
                <tspan fill="#f0f6ff">, </tspan>
                <tspan fill="#60a5fa">".NET"</tspan>
                <tspan fill="#f0f6ff">],</tspan>
              </text>

              <text x="114" y="155" fontSize="8" fontFamily="monospace">
                <tspan fill="#7dd3fc">  status</tspan>
                <tspan fill="#f0f6ff">: </tspan>
                <tspan fill="#34d399">"Building extraordinary apps"</tspan>
              </text>

              <text x="114" y="170" fontSize="8" fontFamily="monospace">
                <tspan fill="#f0f6ff">{"}"}</tspan>
              </text>

              <text x="114" y="190" fontSize="8" fontFamily="monospace">
                <tspan fill="#38bdf8">export default</tspan>
                <tspan fill="#60a5fa"> function</tspan>
                <tspan fill="#fbbf24"> deploySuccess</tspan>
                <tspan fill="#f0f6ff">() {"{"}</tspan>
              </text>

              <text x="114" y="205" fontSize="8" fontFamily="monospace">
                <tspan fill="#38bdf8">  return </tspan>
                <tspan fill="#34d399">"Ready for production 🚀"</tspan>
              </text>

              <text x="114" y="220" fontSize="8" fontFamily="monospace">
                <tspan fill="#f0f6ff">{"}"}</tspan>
              </text>

              {/* Status bar */}
              <rect x="78" y="238" width="364" height="16" fill="#0d182e" />
              <circle cx="90" cy="246" r="3" fill="#38bdf8" />
              <text x="98" y="249" fontSize="6.5" fill="#728aa8" fontFamily="monospace">
                TypeScript · UTF-8 · Midnight Cyan verified
              </text>
              <text x="390" y="249" fontSize="6.5" fill="#7dd3fc" fontFamily="monospace">
                Ln 11, Col 2
              </text>

              {/* Laptop Keyboard & Trackpad Base */}
              <rect x="36" y="270" width="448" height="74" rx="9" fill="#14213d" stroke="rgba(125, 211, 252, 0.18)" strokeWidth="1" />
              {/* Keyboard recess */}
              <rect x="52" y="276" width="416" height="34" rx="4" fill="#0b1324" />
              {/* Trackpad */}
              <rect x="198" y="316" width="124" height="24" rx="5" fill="#0b1324" stroke="rgba(125, 211, 252, 0.14)" strokeWidth="1" />

              {/* Keyboard keys */}
              {Array.from({ length: 13 }, (_, i) => (
                <rect key={i} x={58 + i * 31} y={280} width={25} height={11} rx={2} fill="#1a2d52" />
              ))}
              {Array.from({ length: 12 }, (_, i) => (
                <rect key={i} x={66 + i * 31} y={294} width={25} height={11} rx={2} fill="#1a2d52" />
              ))}
            </svg>
          </div>

          {/* Floating Badge 1 — Top Right */}
          <div
            className="hero-badge-1"
            style={{
              position: "absolute",
              top: "6%",
              right: "-1rem",
              background: "linear-gradient(135deg, rgba(14, 25, 50, 0.9), rgba(8, 14, 28, 0.96))",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color: "var(--ink)",
              border: "1px solid rgba(125, 211, 252, 0.32)",
              borderRadius: "14px",
              padding: "0.6rem 1.1rem",
              fontSize: "0.75rem",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.04em",
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.5), 0 0 16px rgba(56, 189, 248, 0.22)",
              whiteSpace: "nowrap",
              animation: "floatSoft 4s ease-in-out infinite",
            }}
          >
            <span style={{ color: "#7dd3fc", marginRight: "0.4rem" }}>✦</span>
            8+ yrs experience
          </div>

          {/* Floating Badge 2 — Bottom Left */}
          <div
            className="hero-badge-2"
            style={{
              position: "absolute",
              bottom: "10%",
              left: "-1.5rem",
              background: "linear-gradient(135deg, rgba(14, 25, 50, 0.9), rgba(8, 14, 28, 0.96))",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color: "var(--ink)",
              border: "1px solid rgba(125, 211, 252, 0.28)",
              borderRadius: "14px",
              padding: "0.6rem 1.1rem",
              fontSize: "0.75rem",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.04em",
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.5), 0 0 16px rgba(14, 165, 233, 0.18)",
              whiteSpace: "nowrap",
              animation: "floatSoft 4.5s ease-in-out infinite 0.8s",
            }}
          >
            <span style={{ color: "#38bdf8", marginRight: "0.4rem" }}>⚡</span>
            Full Stack · AI · Cloud
          </div>
        </div>
      </div>

      {/* Subtle Scroll Hint */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "1.8rem",
          left: "var(--gutter)",
          display: "flex",
          alignItems: "center",
          gap: "0.55rem",
          color: "var(--mute)",
          fontSize: "0.68rem",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          zIndex: 2,
        }}
      >
        <span style={{ animation: "scrollBounce 2s ease-in-out infinite", display: "inline-block", color: "var(--ink-2)" }}>↓</span>
        <span>Scroll to discover</span>
      </div>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(5px); }
        }
        @media (max-width: 900px) {
          #hero {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto;
            padding-top: 90px !important;
          }
          #hero > div:last-of-type {
            min-height: 48svh !important;
          }
          #hero .hero-badge-1 { right: 0.5rem !important; top: 0 !important; }
          #hero .hero-badge-2 { left: 0.5rem !important; bottom: 2% !important; }
        }
      `}</style>
    </section>
  );
}
