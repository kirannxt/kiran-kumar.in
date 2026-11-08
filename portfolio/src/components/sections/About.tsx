"use client";
import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";

function IDCard() {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const velRef = useRef(0);
  const rafRef = useRef(0);

  // Pendulum physics
  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      velRef.current += (clientX - cx) * 0.003;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);

    const loop = () => {
      angleRef.current += velRef.current;
      velRef.current *= 0.88; // damping
      // idle sway
      angleRef.current += Math.sin(Date.now() / 2200) * 0.015;
      angleRef.current = Math.max(-18, Math.min(18, angleRef.current));
      if (cardRef.current) {
        cardRef.current.style.transform = `rotate(${angleRef.current}deg)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const toggle = () => setFlipped((f) => !f);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "2rem",
      }}
    >
      {/* Lanyard strap */}
      <div
        style={{
          width: 30,
          height: 56,
          background: "linear-gradient(180deg, #1a1a1a 0%, #3a3a3a 100%)",
          borderRadius: "4px 4px 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <span
          style={{
            writingMode: "vertical-lr",
            fontSize: "0.5rem",
            color: "var(--soft)",
            letterSpacing: "0.15em",
            fontFamily: "'JetBrains Mono', monospace",
            animation: "strapScroll 6s linear infinite",
            whiteSpace: "nowrap",
          }}
        >
          {PROFILE.name} · {PROFILE.role} ·
        </span>
      </div>

      {/* Metal clip */}
      <div
        style={{
          width: 22,
          height: 12,
          background: "#9a9a9a",
          borderRadius: "2px",
          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4)",
        }}
      />

      {/* The card */}
      <div
        ref={cardRef}
        style={{ transformOrigin: "50% 0%", cursor: "pointer" }}
      >
        <div
          onClick={toggle}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle()}
          tabIndex={0}
          role="button"
          aria-label="Flip ID card"
          style={{
            position: "relative",
            width: 280,
            height: 378,
            perspective: "1000px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* FRONT */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 12px 48px rgba(13,13,13,0.15)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Top band */}
              <div
                style={{
                  background: "var(--ink)",
                  color: "var(--paper)",
                  padding: "0.6rem 1rem",
                  fontSize: "0.65rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "0.15em",
                  textAlign: "center",
                }}
              >
                DEVELOPER ID
              </div>

              {/* Portrait area */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "1.2rem 1rem 0.8rem",
                  gap: "0.6rem",
                }}
              >
                <div
                  style={{
                    width: 100,
                    height: 122,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #e9e6e0, #d0cdc8)",
                    border: "3px solid var(--soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.8rem",
                    boxShadow: "0 4px 16px rgba(13,13,13,0.1)",
                  }}
                  aria-label="Portrait placeholder"
                >
                  👨‍💻
                </div>

                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: "1rem",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {PROFILE.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--mute)",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {PROFILE.role}
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.3rem",
                    fontSize: "0.7rem",
                    color: "var(--ink-2)",
                    borderTop: "1px solid var(--line)",
                    paddingTop: "0.6rem",
                  }}
                >
                  {[
                    ["ID No.", "KK-2018-001"],
                    ["Dept.", "Engineering"],
                    ["Valid till", "2018"],
                    ["Exp.", "8+ Years"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          color: "var(--mute)",
                        }}
                      >
                        {k}
                      </span>
                      <span style={{ fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Barcode */}
                <div style={{ marginTop: "auto", textAlign: "center" }}>
                  <div
                    aria-hidden
                    style={{
                      display: "flex",
                      gap: 2,
                      justifyContent: "center",
                      marginBottom: 4,
                    }}
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <div
                        key={i}
                        style={{
                          width: i % 3 === 0 ? 3 : 1.5,
                          height: 28,
                          background: "var(--ink)",
                          borderRadius: 1,
                        }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      fontSize: "0.55rem",
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "var(--mute)",
                    }}
                  >
                    KK-SW-2018-FULL
                  </div>
                </div>
              </div>
            </div>

            {/* BACK */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 12px 48px rgba(13,13,13,0.15)",
                padding: "1.5rem 1.2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "var(--mute)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                What I am
              </div>
              {[
                `Full Stack Developer & Software Engineer`,
                `MCA, Computer Science — Gulbarga University (2018)`,
                `Angular, React, .NET, Node.js & Django specialist`,
                `GeneSilico · POD Health · LMS · QBSCare · Mavvrik`,
                `Cloud-deployed on Firebase, AWS & Heroku`,
              ].map((line, i) => (
                <p key={i} style={{ fontSize: "0.82rem", lineHeight: 1.5, color: "var(--ink-2)" }}>
                  {line}
                </p>
              ))}
              <div
                style={{
                  marginTop: "auto",
                  borderTop: "1px solid var(--line)",
                  paddingTop: "0.8rem",
                  fontSize: "0.72rem",
                  color: "var(--mute)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                If found, say hello · {PROFILE.email}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes strapScroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container">
        <span className="section-tag rv" style={{ "--i": 0 } as React.CSSProperties}>
          01 — About
        </span>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "clamp(2rem, 6vw, 5rem)",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div className="rv" style={{ "--i": 1 } as React.CSSProperties}>
            <h2 className="heading-lg" style={{ marginBottom: "1.5rem" }}>
              Hi, I'm{" "}
              <span className="serif-accent">{PROFILE.name.split(" ")[0]}.</span>
            </h2>
            <p
              style={{
                color: "var(--ink-2)",
                lineHeight: 1.7,
                marginBottom: "2rem",
                fontSize: "0.95rem",
              }}
            >
              {PROFILE.resumeSummary}
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a className="btn-primary" href={PROFILE.resumePath} download>
                Resume ↓
              </a>
              <a
                className="btn-outline"
                href={`mailto:${PROFILE.email}`}
              >
                Email me
              </a>
            </div>
          </div>

          {/* Centre — ID card */}
          <div
            className="rv"
            style={
              {
                "--i": 2,
                display: "flex",
                justifyContent: "center",
              } as React.CSSProperties
            }
          >
            <IDCard />
          </div>

          {/* Right — quick facts */}
          <div className="rv" style={{ "--i": 3 } as React.CSSProperties}>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                marginBottom: "1.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              Quick facts
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              {[
                ["Location", PROFILE.location],
                ["Education", "MCA · Gulbarga University, 2018"],
                ["Current role", `${PROFILE.role} · MindsNXT TechnoVision`],
                ["Email", PROFILE.email],
                ["Phone", PROFILE.phone],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.2rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      color: "var(--mute)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {k}
                  </span>
                  <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                    {k === "Email" ? (
                      <a href={`mailto:${v}`} style={{ textDecoration: "underline" }}>
                        {v}
                      </a>
                    ) : k === "Phone" ? (
                      <a href={PROFILE.phoneHref}>{v}</a>
                    ) : (
                      v
                    )}
                  </span>
                </div>
              ))}
            </div>
            <blockquote
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "0.9rem",
                color: "var(--mute)",
                borderLeft: "2px solid var(--soft)",
                paddingLeft: "1rem",
                margin: 0,
              }}
            >
              "Comfortable collaborating with product teams, analysing
              requirements and delivering maintainable web solutions."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
