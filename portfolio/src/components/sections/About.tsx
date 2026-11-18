"use client";
import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";

function IDCard() {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const velRef = useRef(0);
  const rafRef = useRef(0);

  // Pendulum physics with gentle damping
  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      velRef.current += (clientX - cx) * 0.0022;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);

    const loop = () => {
      angleRef.current += velRef.current;
      velRef.current *= 0.9; // damping
      // subtle idle sway
      angleRef.current += Math.sin(Date.now() / 2400) * 0.012;
      angleRef.current = Math.max(-14, Math.min(14, angleRef.current));
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
        paddingTop: "0.5rem",
        paddingBottom: "1.5rem",
        position: "relative",
      }}
    >
      {/* Lanyard strap */}
      <div
        style={{
          width: 32,
          height: 50,
          background: "linear-gradient(180deg, #101c36 0%, #1c3260 100%)",
          border: "1px solid rgba(125, 211, 252, 0.25)",
          borderBottom: "none",
          borderRadius: "6px 6px 0 0",
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
            fontSize: "0.52rem",
            color: "var(--ink-2)",
            letterSpacing: "0.18em",
            fontFamily: "'JetBrains Mono', monospace",
            animation: "strapScroll 6s linear infinite",
            whiteSpace: "nowrap",
            opacity: 0.85,
          }}
        >
          {PROFILE.name} · {PROFILE.role} ·
        </span>
      </div>

      {/* Metal clip with chrome reflection */}
      <div
        style={{
          width: 24,
          height: 12,
          background: "linear-gradient(180deg, #9ca3af 0%, #4b5563 100%)",
          borderRadius: "3px",
          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.6), 0 2px 6px rgba(0,0,0,0.4)",
          border: "1px solid #374151",
          marginBottom: 2,
        }}
      />

      {/* Pendulum card wrapper — contains solely the card */}
      <div
        ref={cardRef}
        style={{ transformOrigin: "50% 0%", cursor: "pointer", position: "relative" }}
      >
        <div
          onClick={toggle}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle()}
          tabIndex={0}
          role="button"
          aria-label="Flip ID card"
          style={{
            position: "relative",
            width: 290,
            height: 415,
            perspective: "1000px",
          }}
          className="id-card-wrap"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* FRONT OF CARD */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                background: "linear-gradient(175deg, #0e1830 0%, #070e1c 100%)",
                borderRadius: 20,
                border: "1px solid rgba(125, 211, 252, 0.28)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.65), 0 0 24px rgba(14, 165, 233, 0.18)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header band */}
              <div
                style={{
                  background: "linear-gradient(90deg, #7dd3fc 0%, #38bdf8 100%)",
                  color: "#040914",
                  padding: "0.6rem 1rem",
                  fontSize: "0.68rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>VERIFIED ID</span>
                <span style={{ fontSize: "0.6rem", opacity: 0.85 }}>MINDSNXT</span>
              </div>

              {/* Portrait & details area */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "1rem 1.1rem 0.85rem",
                  gap: "0.65rem",
                }}
              >
                {/* Tech Portrait Avatar */}
                <div
                  style={{
                    position: "relative",
                    width: 96,
                    height: 114,
                    borderRadius: 14,
                    background: "linear-gradient(135deg, #132244 0%, #091326 100%)",
                    border: "2px solid rgba(125, 211, 252, 0.38)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "inset 0 0 20px rgba(0,0,0,0.5), 0 6px 20px rgba(0,0,0,0.3)",
                  }}
                  className="id-card-portrait"
                >
                  <span style={{ fontSize: "2.6rem" }}>👨‍💻</span>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-8px",
                      background: "rgba(9, 19, 38, 0.95)",
                      border: "1px solid rgba(56, 189, 248, 0.5)",
                      padding: "2px 8px",
                      borderRadius: 999,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: "0.58rem",
                      color: "#7dd3fc",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 6px #38bdf8" }} />
                    ACTIVE
                  </div>
                </div>

                <div style={{ textAlign: "center", marginTop: "0.2rem" }}>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: "1.08rem",
                      letterSpacing: "-0.02em",
                      color: "var(--ink)",
                    }}
                    className="id-card-name"
                  >
                    {PROFILE.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--ink-2)",
                      fontFamily: "'JetBrains Mono', monospace",
                      marginTop: "0.1rem",
                    }}
                    className="id-card-role"
                  >
                    {PROFILE.role}
                  </div>
                </div>

                {/* Key metadata fields */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.35rem",
                    fontSize: "0.7rem",
                    borderTop: "1px solid rgba(125, 211, 252, 0.12)",
                    paddingTop: "0.6rem",
                  }}
                  className="id-card-row"
                >
                  {[
                    ["Dept.", "Engineering & Architecture"],
                    ["Experience", "8+ Years (Full Stack)"],
                    ["Focus", "React · Angular · .NET · Cloud"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.62rem",
                          color: "var(--mute)",
                        }}
                      >
                        {k}
                      </span>
                      <span style={{ fontWeight: 600, color: "var(--ink)" }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Barcode representation */}
                <div style={{ marginTop: "auto", textAlign: "center", width: "100%" }}>
                  <div
                    aria-hidden
                    style={{
                      display: "flex",
                      gap: 2.5,
                      justifyContent: "center",
                      marginBottom: 4,
                      opacity: 0.85,
                    }}
                  >
                    {Array.from({ length: 28 }, (_, i) => (
                      <div
                        key={i}
                        style={{
                          width: i % 4 === 0 ? 3 : i % 2 === 0 ? 1.5 : 2,
                          height: 22,
                          background: "var(--ink-2)",
                          borderRadius: 1,
                        }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      fontSize: "0.58rem",
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "var(--mute)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    KK-SWE-2018-CYAN
                  </div>
                </div>
              </div>
            </div>

            {/* BACK OF CARD */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "linear-gradient(175deg, #0e1830 0%, #070e1c 100%)",
                borderRadius: 20,
                border: "1px solid rgba(125, 211, 252, 0.28)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.65), 0 0 24px rgba(14, 165, 233, 0.18)",
                padding: "1.4rem 1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid rgba(125, 211, 252, 0.12)",
                  paddingBottom: "0.55rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "var(--ink-2)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  Core Highlights
                </span>
                <span style={{ fontSize: "0.65rem", color: "var(--mute)", fontFamily: "'JetBrains Mono', monospace" }}>
                  CARD DETAILS
                </span>
              </div>

              {[
                "Full Stack Developer & Software Engineer (8+ yrs)",
                "MCA, Computer Science — Gulbarga University (2018)",
                "Built enterprise platforms: GeneSilico, POD Health, Mavvrik, LMS & QBSCare",
                "Frontend: React, Angular, TypeScript, Responsive UX",
                "Backend: .NET, Node.js, Express, Django, GraphQL",
                "Cloud & DevOps: Firebase, AWS, Heroku, Git CI/CD",
              ].map((line, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                    fontSize: "0.76rem",
                    lineHeight: 1.45,
                    color: "var(--ink)",
                  }}
                  className="id-card-back-line"
                >
                  <span style={{ color: "#38bdf8", flexShrink: 0 }}>✦</span>
                  <span>{line}</span>
                </div>
              ))}

              <div
                style={{
                  marginTop: "auto",
                  borderTop: "1px solid rgba(125, 211, 252, 0.12)",
                  paddingTop: "0.75rem",
                  fontSize: "0.68rem",
                  color: "var(--mute)",
                  fontFamily: "'JetBrains Mono', monospace",
                  textAlign: "center",
                }}
                className="id-card-back-footer"
              >
                Contact: <span style={{ color: "var(--ink-2)" }}>{PROFILE.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flip hint pill sits cleanly below the ID card with guaranteed margin */}
      <div
        style={{
          marginTop: "1.6rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.45rem",
          padding: "0.4rem 1rem",
          borderRadius: "999px",
          background: "rgba(14, 165, 233, 0.12)",
          border: "1px solid rgba(56, 189, 248, 0.3)",
          fontSize: "0.7rem",
          fontFamily: "'JetBrains Mono', monospace",
          color: "var(--ink-2)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
          position: "relative",
          zIndex: 5,
        }}
      >
        <span>Click card to {flipped ? "flip front" : "flip back"} ↺</span>
      </div>

      <style>{`
        @keyframes strapScroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @media (max-width: 640px) {
          #about .container > div {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .id-card-wrap {
            width: 260px !important;
            height: 385px !important;
          }
          .id-card-portrait {
            width: 86px !important;
            height: 102px !important;
          }
          .id-card-name { font-size: 0.95rem !important; }
          .id-card-role { font-size: 0.65rem !important; }
          .id-card-row  { font-size: 0.65rem !important; }
          .id-card-back-line { font-size: 0.72rem !important; }
          .id-card-back-footer { font-size: 0.62rem !important; }
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
          <span>01</span>
          <span>—</span>
          <span>About</span>
        </span>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.9fr 1.05fr",
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "start",
          }}
        >
          {/* Left Column — Bio & Philosophy */}
          <div className="rv" style={{ "--i": 1 } as React.CSSProperties}>
            <h2 className="heading-lg" style={{ marginBottom: "1.5rem" }}>
              Hi, I&apos;m{" "}
              <span className="serif-accent">{PROFILE.name.split(" ")[0]}.</span>
            </h2>
            <p
              style={{
                color: "var(--ink)",
                lineHeight: 1.75,
                marginBottom: "1.5rem",
                fontSize: "0.96rem",
                opacity: 0.9,
              }}
            >
              {PROFILE.resumeSummary}
            </p>
            <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", marginTop: "2rem" }}>
              <a className="btn-primary" href={PROFILE.resumePath} download>
                <span>Download Résumé</span>
                <span aria-hidden="true">↓</span>
              </a>
              <a className="btn-outline" href={`mailto:${PROFILE.email}`}>
                Email me
              </a>
            </div>
          </div>

          {/* Centre Column — Interactive 3D Pendulum ID card */}
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

          {/* Right Column — Quick Facts Card */}
          <div className="rv glass-card" style={{ "--i": 3, padding: "2rem" } as React.CSSProperties}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  margin: 0,
                }}
              >
                Quick Facts
              </h3>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.62rem",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "6px",
                  background: "rgba(14, 165, 233, 0.18)",
                  color: "var(--ink-2)",
                }}
              >
                SNAPSHOT
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.1rem",
                marginBottom: "2rem",
              }}
            >
              {[
                { label: "Location", val: PROFILE.location, icon: "📍" },
                { label: "Education", val: "MCA · Gulbarga University (2018)", icon: "🎓" },
                { label: "Current Role", val: `${PROFILE.role} · MindsNXT`, icon: "💼" },
                { label: "Email", val: PROFILE.email, isEmail: true, icon: "✉️" },
              ].map(({ label, val, isEmail, icon }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                    paddingBottom: "0.85rem",
                    borderBottom: "1px solid rgba(125, 211, 252, 0.1)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.66rem",
                      color: "var(--mute)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                  </span>
                  <span style={{ fontSize: "0.92rem", fontWeight: 500, color: "var(--ink)" }}>
                    {isEmail ? (
                      <a href={`mailto:${val}`} style={{ color: "var(--ink-2)", textDecoration: "underline" }}>
                        {val}
                      </a>
                    ) : (
                      val
                    )}
                  </span>
                </div>
              ))}
            </div>

            <blockquote
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontSize: "1.08rem",
                lineHeight: 1.5,
                color: "var(--ink-2)",
                borderLeft: "2px solid #38bdf8",
                paddingLeft: "1rem",
                margin: 0,
              }}
            >
              &ldquo;Comfortable collaborating with product teams, analyzing requirements, and delivering maintainable, high-impact web solutions.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #about .container > div {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
