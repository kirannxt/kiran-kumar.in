"use client";
import { useRef } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--paper)",
        paddingTop: "80px", // nav height
      }}
    >
      {/* Ghost name */}
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
            fontSize: "clamp(5rem, 18vw, 18rem)",
            fontWeight: 800,
            letterSpacing: "-0.06em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(13,13,13,0.06)",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {PROFILE.name.split(" ")[0].toUpperCase()}
        </span>
      </div>

      {/* Left — text */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "clamp(2rem, 6vw, 5rem) var(--gutter) clamp(2rem, 6vw, 5rem) var(--gutter)",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--mute)",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            {PROFILE.name} · Software Engineer
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 4.5vw, 5rem)",
              fontWeight: 800,
              letterSpacing: "-0.045em",
              lineHeight: 1,
              marginBottom: "1.5rem",
            }}
          >
            Full Stack
            <br />
            <span style={{ color: "var(--ink-2)" }}>Developer.</span>
          </h1>
          <p
            style={{
              color: "var(--mute)",
              fontSize: "clamp(0.82rem, 1.2vw, 0.95rem)",
              lineHeight: 1.7,
              maxWidth: "420px",
            }}
          >
            8+ years building responsive web applications, AI-powered platforms
            and full-stack solutions.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => scrollToTarget("#work")}>
            Explore work
          </button>
          <button className="btn-outline" onClick={() => scrollToTarget("#contact")}>
            Let's talk
          </button>
          <a
            className="btn-outline"
            href={PROFILE.resumePath}
            download
            aria-label="Download résumé PDF"
          >
            Résumé ↓
          </a>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "2.5rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--line)",
          }}
        >
          {[
            ["8+", "Years exp."],
            ["5+", "Products built"],
            ["10+", "Tech stack"],
          ].map(([num, label]) => (
            <div key={label}>
              <div
                style={{
                  fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: "var(--mute)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginTop: "0.3rem",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — laptop illustration */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          minHeight: "60svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          {/* Laptop SVG */}
          <svg
            viewBox="0 0 520 360"
            style={{ width: "clamp(280px, 38vw, 500px)", height: "auto", filter: "drop-shadow(0 32px 64px rgba(13,13,13,0.18))" }}
            aria-label="Laptop with code editor"
          >
            {/* Screen lid */}
            <rect x="60" y="20" width="400" height="250" rx="14" fill="#1a1a2e" />
            {/* Screen bezel inner */}
            <rect x="72" y="30" width="376" height="232" rx="8" fill="#0d0d1a" />
            {/* Screen glow */}
            <rect x="80" y="38" width="360" height="216" rx="6" fill="#0f1117" />

            {/* — Code editor UI — */}
            {/* Traffic lights */}
            <circle cx="102" cy="55" r="6" fill="#ff5f56" />
            <circle cx="120" cy="55" r="6" fill="#ffbd2e" />
            <circle cx="138" cy="55" r="6" fill="#27c93f" />
            {/* Tab bar */}
            <rect x="80" y="44" width="360" height="22" rx="4" fill="#161b22" />
            <rect x="156" y="46" width="72" height="18" rx="3" fill="#0f1117" />
            <text x="170" y="59" fontSize="8" fill="#8b949e" fontFamily="monospace">index.tsx</text>
            {/* Line numbers gutter */}
            <rect x="80" y="66" width="28" height="188" fill="#0d1117" />
            {/* Line number text */}
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((n, i) => (
              <text key={n} x="85" y={80 + i * 15} fontSize="7.5" fill="#3d444d" fontFamily="monospace">{n}</text>
            ))}
            {/* Code lines */}
            {/* Line 1 — import */}
            <text x="116" y="80" fontSize="8" fontFamily="monospace">
              <tspan fill="#ff7b72">import</tspan>
              <tspan fill="#c9d1d9"> {"{ "}</tspan>
              <tspan fill="#79c0ff">useState</tspan>
              <tspan fill="#c9d1d9"> {"} "}</tspan>
              <tspan fill="#ff7b72">from</tspan>
              <tspan fill="#a5d6ff"> {`"react"`}</tspan>
            </text>
            {/* Line 2 — blank */}
            {/* Line 3 — function */}
            <text x="116" y="110" fontSize="8" fontFamily="monospace">
              <tspan fill="#ff7b72">export default function</tspan>
              <tspan fill="#d2a8ff"> Hero</tspan>
              <tspan fill="#c9d1d9">{"() {"}</tspan>
            </text>
            {/* Line 4 */}
            <text x="116" y="125" fontSize="8" fontFamily="monospace">
              <tspan fill="#c9d1d9">{"  "}</tspan>
              <tspan fill="#ff7b72">const </tspan>
              <tspan fill="#79c0ff">[count, setCount]</tspan>
              <tspan fill="#c9d1d9"> = </tspan>
              <tspan fill="#d2a8ff">useState</tspan>
              <tspan fill="#c9d1d9">{"(0)"}</tspan>
            </text>
            {/* Line 5 */}
            <text x="116" y="140" fontSize="8" fontFamily="monospace">
              <tspan fill="#c9d1d9">{"  "}</tspan>
              <tspan fill="#ff7b72">return </tspan>
              <tspan fill="#c9d1d9">{"("}</tspan>
            </text>
            {/* Line 6 */}
            <text x="116" y="155" fontSize="8" fontFamily="monospace">
              <tspan fill="#c9d1d9">{"    <"}</tspan>
              <tspan fill="#7ee787">section</tspan>
              <tspan fill="#79c0ff"> className</tspan>
              <tspan fill="#c9d1d9">{"="}</tspan>
              <tspan fill="#a5d6ff">{`"hero"`}</tspan>
              <tspan fill="#c9d1d9">{">"}</tspan>
            </text>
            {/* Line 7 */}
            <text x="116" y="170" fontSize="8" fontFamily="monospace">
              <tspan fill="#c9d1d9">{"      <"}</tspan>
              <tspan fill="#7ee787">h1</tspan>
              <tspan fill="#c9d1d9">{">"}</tspan>
              <tspan fill="#c9d1d9">Full Stack Dev</tspan>
              <tspan fill="#c9d1d9">{"</"}</tspan>
              <tspan fill="#7ee787">h1</tspan>
              <tspan fill="#c9d1d9">{">"}</tspan>
            </text>
            {/* Line 8 */}
            <text x="116" y="185" fontSize="8" fontFamily="monospace">
              <tspan fill="#c9d1d9">{"      <"}</tspan>
              <tspan fill="#7ee787">button</tspan>
              <tspan fill="#79c0ff"> onClick</tspan>
              <tspan fill="#c9d1d9">{"={"}</tspan>
              <tspan fill="#d2a8ff">{"() => "}</tspan>
              <tspan fill="#d2a8ff">setCount</tspan>
              <tspan fill="#c9d1d9">{"(c+1)}>"}</tspan>
            </text>
            {/* Line 9 */}
            <text x="116" y="200" fontSize="8" fontFamily="monospace">
              <tspan fill="#c9d1d9">{"        "}</tspan>
              <tspan fill="#c9d1d9">{"Clicked "}</tspan>
              <tspan fill="#c9d1d9">{"{"}</tspan>
              <tspan fill="#79c0ff">count</tspan>
              <tspan fill="#c9d1d9">{"} times"}</tspan>
            </text>
            {/* Line 10 */}
            <text x="116" y="215" fontSize="8" fontFamily="monospace">
              <tspan fill="#c9d1d9">{"      </"}</tspan>
              <tspan fill="#7ee787">button</tspan>
              <tspan fill="#c9d1d9">{">"}</tspan>
            </text>
            {/* Line 11 */}
            <text x="116" y="230" fontSize="8" fontFamily="monospace">
              <tspan fill="#c9d1d9">{"    </"}</tspan>
              <tspan fill="#7ee787">section</tspan>
              <tspan fill="#c9d1d9">{">"}</tspan>
            </text>
            {/* Line 12 */}
            <text x="116" y="245" fontSize="8" fontFamily="monospace">
              <tspan fill="#c9d1d9">{"  )"}</tspan>
            </text>

            {/* Cursor blink bar */}
            <rect x="116" y="249" width="2" height="9" rx="1" fill="#58a6ff" opacity="0.9">
              <animate attributeName="opacity" values="0.9;0;0.9" dur="1.1s" repeatCount="indefinite" />
            </rect>

            {/* Keyboard base */}
            <rect x="40" y="270" width="440" height="72" rx="8" fill="#2d2d3e" />
            {/* Trackpad */}
            <rect x="200" y="296" width="120" height="36" rx="6" fill="#252534" />
            {/* Keyboard keys — top row */}
            {Array.from({ length: 13 }, (_, i) => (
              <rect key={i} x={52 + i * 32} y={278} width={26} height={12} rx={3} fill="#3a3a4e" />
            ))}
            {/* Middle row */}
            {Array.from({ length: 12 }, (_, i) => (
              <rect key={i} x={60 + i * 32} y={294} width={26} height={12} rx={3} fill="#3a3a4e" />
            ))}
            {/* Bottom row hinge shadow */}
            <rect x="40" y="268" width="440" height="5" rx="2" fill="#1a1a28" />
          </svg>

          {/* Floating badge */}
          <div
            style={{
              position: "absolute",
              top: "12%",
              right: "-2rem",
              background: "var(--ink)",
              color: "var(--paper)",
              borderRadius: "14px",
              padding: "0.55rem 1rem",
              fontSize: "0.72rem",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.05em",
              boxShadow: "0 8px 24px rgba(13,13,13,0.22)",
              whiteSpace: "nowrap",
            }}
          >
            &lt;/&gt; 8+ yrs experience
          </div>

          {/* Floating badge 2 */}
          <div
            style={{
              position: "absolute",
              bottom: "18%",
              left: "-1.5rem",
              background: "var(--card)",
              borderRadius: "14px",
              padding: "0.55rem 1rem",
              fontSize: "0.72rem",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.05em",
              boxShadow: "0 8px 24px rgba(13,13,13,0.12)",
              border: "1px solid var(--line)",
              whiteSpace: "nowrap",
            }}
          >
            ✦ Full Stack · AI · Cloud
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "var(--gutter)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--faint)",
          fontSize: "0.65rem",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          zIndex: 2,
        }}
      >
        <span style={{ animation: "scrollBounce 2s ease-in-out infinite", display: "inline-block" }}>↓</span>
        <span>Scroll</span>
      </div>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(5px); }
        }
        @media (max-width: 768px) {
          #hero {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto;
            padding-top: 80px !important;
          }
          #hero > div:last-of-type {
            min-height: 50svh !important;
          }
        }
      `}</style>
    </section>
  );
}
