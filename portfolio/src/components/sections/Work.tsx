"use client";
import { useState } from "react";
import { PROJECTS } from "@/lib/data";

const PANEL_COLORS = ["#f0ede8", "#edf0f8", "#edf8ee", "#f8edf0", "#f5edfb"];

function IllustrativeUI({ id }: { id: string }) {
  const designs: Record<string, React.ReactNode> = {
    lms: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {["Student Dashboard", "Course Progress", "Staff Activity", "Reports"].map((t) => (
          <div
            key={t}
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: "0.7rem",
              color: "var(--ink-2)",
              border: "1px solid var(--line)",
            }}
          >
            {t}
          </div>
        ))}
      </div>
    ),
    qbscare: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {["Service Log", "Staff View", "Date Filter", "Customer ID"].map((t) => (
          <div
            key={t}
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: "8px 6px",
              fontSize: "0.65rem",
              color: "var(--ink-2)",
              textAlign: "center",
              border: "1px solid var(--line)",
            }}
          >
            {t}
          </div>
        ))}
      </div>
    ),
    genesilico: (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            padding: "8px 12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.65rem",
          }}
        >
          <span>Patient Casebook</span>
          <span
            style={{
              background: "#e9e6e0",
              borderRadius: 4,
              padding: "2px 6px",
            }}
          >
            AI
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {["Therapy Rank", "Digital Twin", "Evidence", "Oncology CP"].map((t) => (
            <div
              key={t}
              style={{
                background: "#fff",
                borderRadius: 6,
                padding: "6px",
                fontSize: "0.6rem",
                color: "var(--mute)",
                textAlign: "center",
                border: "1px solid var(--line)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    podhealth: (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {["OpenMind", "Piper", "NeuroPrecision Dx"].map((t, i) => (
          <div
            key={t}
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: "0.68rem",
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid var(--line)",
            }}
          >
            <span>{t}</span>
            <span style={{ color: "var(--mute)" }}>0{i + 1}</span>
          </div>
        ))}
      </div>
    ),
    mavvrik: (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: "0.65rem",
            color: "var(--ink-2)",
            border: "1px solid var(--line)",
          }}
        >
          FinOps Dashboard
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
          {["Cloud", "AI/GenAI", "SaaS", "Cost", "Forecast", "Anomaly"].map((t) => (
            <div
              key={t}
              style={{
                background: "#fff",
                borderRadius: 6,
                padding: "6px 4px",
                fontSize: "0.55rem",
                color: "var(--mute)",
                textAlign: "center",
                border: "1px solid var(--line)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
  };
  return (
    <div
      style={{ padding: "1rem" }}
      role="img"
      aria-label="Illustrative UI — not a real screenshot"
    >
      <div
        style={{
          fontSize: "0.6rem",
          fontFamily: "'JetBrains Mono', monospace",
          color: "var(--mute)",
          marginBottom: "0.6rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Illustrative UI
      </div>
      {designs[id] ?? null}
    </div>
  );
}

export default function Work() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="work" className="section-pad">
      <div className="container">
        <span className="section-tag rv">03 — Selected work</span>
        <h2
          className="heading-lg rv"
          style={{ "--i": 1, marginBottom: "3rem" } as React.CSSProperties}
        >
          Things I've{" "}
          <span className="serif-accent">built.</span>
        </h2>

        {/* Desktop accordion */}
        <div
          className="work-panels"
          style={{
            display: "flex",
            height: "min(78svh, 600px)",
            gap: "0.5rem",
            borderRadius: 24,
            overflow: "hidden",
            border: "1px solid var(--line)",
          }}
        >
          {PROJECTS.map((project, i) => {
            const isOpen = i === openIdx;
            return (
              <div
                key={project.id}
                style={{
                  flex: isOpen ? 8 : 1,
                  transition: "flex 0.5s var(--ease)",
                  background: PANEL_COLORS[i % PANEL_COLORS.length],
                  overflow: "hidden",
                  position: "relative",
                  cursor: isOpen ? "default" : "pointer",
                  display: "flex",
                }}
                onClick={() => !isOpen && setOpenIdx(i)}
              >
                {/* Collapsed spine */}
                {!isOpen && (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "1rem 0.5rem",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.6rem",
                        color: "var(--mute)",
                      }}
                    >
                      {project.index}
                    </span>
                    <span
                      style={{
                        writingMode: "vertical-lr",
                        transform: "rotate(180deg)",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        letterSpacing: "-0.01em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {project.title}
                    </span>
                    <span
                      style={{
                        fontSize: "1rem",
                        fontWeight: 300,
                        color: "var(--mute)",
                        lineHeight: 1,
                      }}
                    >
                      +
                    </span>
                  </div>
                )}

                {/* Open panel */}
                {isOpen && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      width: "100%",
                      height: "100%",
                      animation: "panelOpen 0.4s var(--ease)",
                    }}
                  >
                    {/* Left: info */}
                    <div
                      style={{
                        padding: "clamp(1.5rem, 4vw, 2.5rem)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        overflow: "auto",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.65rem",
                            color: "var(--mute)",
                          }}
                        >
                          {project.index} — {project.kicker}
                        </span>
                        <h3
                          style={{
                            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                            fontWeight: 800,
                            letterSpacing: "-0.03em",
                            marginTop: "0.3rem",
                          }}
                        >
                          {project.title}
                        </h3>
                      </div>
                      <p
                        style={{
                          fontSize: "0.88rem",
                          color: "var(--ink-2)",
                          lineHeight: 1.6,
                        }}
                      >
                        {project.description}
                      </p>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "0.4rem",
                        }}
                      >
                        {project.features.map((f) => (
                          <div
                            key={f}
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--ink-2)",
                              display: "flex",
                              gap: "0.4rem",
                              alignItems: "flex-start",
                            }}
                          >
                            <span style={{ color: "var(--mute)", flexShrink: 0 }}>
                              →
                            </span>
                            {f}
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: "0.7rem",
                              padding: "0.25rem 0.6rem",
                              borderRadius: "999px",
                              background: "rgba(13,13,13,0.06)",
                              fontFamily: "'JetBrains Mono', monospace",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-outline"
                          style={{ alignSelf: "flex-start", fontSize: "0.8rem" }}
                        >
                          View on GitHub ↗
                        </a>
                      )}
                    </div>

                    {/* Right: illustrative UI */}
                    <div
                      style={{
                        background: "rgba(255,255,255,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "2rem",
                        clipPath: "inset(0 0 0 100%)",
                        animation: "wipeIn 0.5s 0.2s var(--ease) forwards",
                      }}
                    >
                      <IllustrativeUI id={project.id} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile vertical accordion */}
        <div className="work-mobile" style={{ display: "none" }}>
          {PROJECTS.map((project, i) => {
            const isOpen = i === openIdx;
            return (
              <div
                key={project.id}
                style={{
                  borderBottom: "1px solid var(--line)",
                  overflow: "hidden",
                }}
              >
                <button
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1.2rem 0",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    letterSpacing: "-0.02em",
                  }}
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.65rem",
                        color: "var(--mute)",
                        marginRight: "0.75rem",
                      }}
                    >
                      {project.index}
                    </span>
                    {project.title}
                  </span>
                  <span
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "none",
                      transition: "transform 0.3s var(--ease)",
                      fontSize: "1.2rem",
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div style={{ paddingBottom: "1.5rem" }}>
                    <p
                      style={{
                        fontSize: "0.88rem",
                        color: "var(--ink-2)",
                        lineHeight: 1.6,
                        marginBottom: "1rem",
                      }}
                    >
                      {project.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: "0.7rem",
                            padding: "0.25rem 0.6rem",
                            borderRadius: "999px",
                            background: "rgba(13,13,13,0.06)",
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes panelOpen {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes wipeIn {
          to { clip-path: inset(0 0 0 0); }
        }
        @media (max-width: 640px) {
          .work-panels { display: none !important; }
          .work-mobile { display: block !important; }
        }
      `}</style>
    </section>
  );
}
