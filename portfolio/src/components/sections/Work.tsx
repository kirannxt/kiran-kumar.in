"use client";
import { useState } from "react";
import { PROJECTS } from "@/lib/data";

const PANEL_BACKGROUNDS = [
  "linear-gradient(135deg, #0c1830 0%, #050b16 100%)",
  "linear-gradient(135deg, #091a2e 0%, #040c17 100%)",
  "linear-gradient(135deg, #071e22 0%, #031012 100%)",
  "linear-gradient(135deg, #101934 0%, #060b18 100%)",
  "linear-gradient(135deg, #0e1e36 0%, #060d1a 100%)",
];

const ACCENT_COLORS = ["#38bdf8", "#60a5fa", "#2dd4bf", "#7dd3fc", "#fbbf24"];

function IllustrativeUI({ id }: { id: string }) {
  const designs: Record<string, React.ReactNode> = {
    lms: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 360 }}>
        {/* Mock Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 12px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 8,
            fontSize: "0.68rem",
            color: "#7dd3fc",
            border: "1px solid rgba(125, 211, 252, 0.16)",
          }}
        >
          <span>Staff Portal · Semester 2</span>
          <span style={{ color: "#4ade80", fontSize: "0.6rem" }}>● Active Session</span>
        </div>

        {/* Progress Card */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: 10,
            padding: "12px",
            border: "1px solid rgba(196, 181, 253, 0.1)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", marginBottom: 6 }}>
            <span style={{ fontWeight: 600, color: "var(--ink)" }}>Course Progress & Grading</span>
            <span style={{ color: "#c084fc", fontWeight: 700 }}>88%</span>
          </div>
          <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ width: "88%", height: "100%", background: "linear-gradient(90deg, #a855f7, #60a5fa)", borderRadius: 999 }} />
          </div>
        </div>

        {/* Interaction Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div style={{ background: "rgba(255,255,255,0.04)", padding: "10px", borderRadius: 8, border: "1px solid rgba(196, 181, 253, 0.08)" }}>
            <div style={{ fontSize: "0.6rem", color: "var(--mute)", textTransform: "uppercase" }}>Student Inquiries</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#f5f2ff", marginTop: 2 }}>142</div>
            <div style={{ fontSize: "0.58rem", color: "#4ade80" }}>↑ 12% this week</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.04)", padding: "10px", borderRadius: 8, border: "1px solid rgba(196, 181, 253, 0.08)" }}>
            <div style={{ fontSize: "0.6rem", color: "var(--mute)", textTransform: "uppercase" }}>Staff Responses</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#f5f2ff", marginTop: 2 }}>99.4%</div>
            <div style={{ fontSize: "0.58rem", color: "#c084fc" }}>Under 15m avg</div>
          </div>
        </div>
      </div>
    ),
    qbscare: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 360 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "rgba(255,255,255,0.06)", borderRadius: 8, border: "1px solid rgba(196, 181, 253, 0.15)" }}>
          <span style={{ fontSize: "0.7rem", color: "var(--ink)", fontWeight: 600 }}>Service Tracking Control Plane</span>
          <span style={{ background: "rgba(96, 165, 250, 0.15)", color: "#60a5fa", padding: "2px 6px", borderRadius: 4, fontSize: "0.6rem" }}>.NET / SQL</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { id: "SRV-4012", cust: "Enterprise Corp", staff: "Tech Lead A", status: "Completed", time: "10:30 AM" },
            { id: "SRV-4013", cust: "Apex Global", staff: "Support Eng B", status: "In Progress", time: "11:15 AM" },
            { id: "SRV-4014", cust: "Beacon Logistics", staff: "Field Lead C", status: "Scheduled", time: "02:00 PM" },
          ].map((row) => (
            <div
              key={row.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 10px",
                background: "rgba(255,255,255,0.03)",
                borderRadius: 8,
                fontSize: "0.65rem",
                border: "1px solid rgba(196, 181, 253, 0.08)",
              }}
            >
              <div>
                <span style={{ fontFamily: "monospace", color: "#93c5fd" }}>{row.id}</span>
                <span style={{ color: "var(--mute)", marginLeft: 6 }}>{row.cust}</span>
              </div>
              <span
                style={{
                  fontSize: "0.6rem",
                  padding: "2px 6px",
                  borderRadius: 4,
                  background: row.status === "Completed" ? "rgba(74, 222, 128, 0.15)" : row.status === "In Progress" ? "rgba(250, 204, 21, 0.15)" : "rgba(255,255,255,0.08)",
                  color: row.status === "Completed" ? "#86efac" : row.status === "In Progress" ? "#fde047" : "var(--mute)",
                }}
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    genesilico: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 360 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "rgba(16, 185, 129, 0.1)", borderRadius: 8, border: "1px solid rgba(52, 211, 153, 0.25)" }}>
          <span style={{ fontSize: "0.72rem", color: "#34d399", fontWeight: 700 }}>AI Oncology Control Plane</span>
          <span style={{ background: "rgba(52, 211, 153, 0.2)", color: "#a7f3d0", padding: "2px 6px", borderRadius: 4, fontSize: "0.6rem" }}>Digital Twin v2</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div style={{ background: "rgba(255,255,255,0.04)", padding: "10px", borderRadius: 8, border: "1px solid rgba(196, 181, 253, 0.08)" }}>
            <div style={{ fontSize: "0.58rem", color: "var(--mute)" }}>PATIENT MATCH SCORE</div>
            <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#34d399", marginTop: 2 }}>98.6%</div>
            <div style={{ fontSize: "0.55rem", color: "var(--ink-2)" }}>High Genomic Concordance</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.04)", padding: "10px", borderRadius: 8, border: "1px solid rgba(196, 181, 253, 0.08)" }}>
            <div style={{ fontSize: "0.58rem", color: "var(--mute)" }}>EVIDENCE RANKING</div>
            <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#60a5fa", marginTop: 2 }}>Tier 1</div>
            <div style={{ fontSize: "0.55rem", color: "var(--ink-2)" }}>FDA & Clinical Trials</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["Casebook UI", "Digital Twin Telemetry", "Oncology Clinical Control Plane", "HIPAA Validated"].map((tag) => (
            <span key={tag} style={{ fontSize: "0.58rem", padding: "3px 8px", borderRadius: 6, background: "rgba(255,255,255,0.06)", color: "var(--ink-2)" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    podhealth: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 360 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "rgba(244, 114, 182, 0.1)", borderRadius: 8, border: "1px solid rgba(244, 114, 182, 0.25)" }}>
          <span style={{ fontSize: "0.72rem", color: "#f472b6", fontWeight: 700 }}>Healthcare AI Ecosystem</span>
          <span style={{ fontSize: "0.6rem", color: "#fbcfe8" }}>Firebase · Realtime</span>
        </div>

        {["OpenMind — Clinician Hub", "Piper — Patient & Family Portal", "NeuroPrecision Dx — Prescribing"].map((m, i) => (
          <div
            key={m}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 12px",
              background: "rgba(255,255,255,0.04)",
              borderRadius: 8,
              border: "1px solid rgba(196, 181, 253, 0.08)",
            }}
          >
            <div>
              <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--ink)" }}>{m}</div>
              <div style={{ fontSize: "0.58rem", color: "var(--mute)" }}>EHR & Genomics Pipeline Synchronized</div>
            </div>
            <span style={{ color: "#f472b6", fontFamily: "monospace", fontSize: "0.65rem", fontWeight: 700 }}>
              0{i + 1}
            </span>
          </div>
        ))}
      </div>
    ),
    mavvrik: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 360 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "rgba(251, 191, 36, 0.1)", borderRadius: 8, border: "1px solid rgba(251, 191, 36, 0.25)" }}>
          <span style={{ fontSize: "0.72rem", color: "#fbbf24", fontWeight: 700 }}>FinOps Cost Intelligence</span>
          <span style={{ fontSize: "0.6rem", color: "#4ade80" }}>-18.4% Monthly Savings</span>
        </div>

        <div style={{ background: "rgba(255,255,255,0.04)", padding: "10px", borderRadius: 8, border: "1px solid rgba(196, 181, 253, 0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.62rem", color: "var(--mute)", marginBottom: 8 }}>
            <span>HYBRID CLOUD & GENAI SPEND</span>
            <span>$48.2k / $60k</span>
          </div>
          <div style={{ display: "flex", height: 16, gap: 4, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: "45%", background: "#f59e0b" }} title="AWS" />
            <div style={{ width: "30%", background: "#818cf8" }} title="AI / LLM Inferences" />
            <div style={{ width: "15%", background: "#34d399" }} title="SaaS Infrastructure" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div style={{ background: "rgba(255,255,255,0.03)", padding: "8px 10px", borderRadius: 6, fontSize: "0.6rem" }}>
            <div style={{ color: "var(--mute)" }}>AI Token Telemetry</div>
            <div style={{ color: "#f5f2ff", fontWeight: 700, fontSize: "0.85rem", marginTop: 2 }}>2.4B Tokens</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", padding: "8px 10px", borderRadius: 6, fontSize: "0.6rem" }}>
            <div style={{ color: "var(--mute)" }}>Anomaly Detection</div>
            <div style={{ color: "#4ade80", fontWeight: 700, fontSize: "0.85rem", marginTop: 2 }}>0 Flags</div>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div
      style={{
        padding: "1.5rem",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      role="img"
      aria-label="Illustrative Architecture & UI preview"
    >
      <div
        style={{
          fontSize: "0.64rem",
          fontFamily: "'JetBrains Mono', monospace",
          color: "var(--mute)",
          marginBottom: "0.8rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#38bdf8" }} />
        <span>System Architecture & Interface Preview</span>
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
        <span className="section-tag rv">
          <span>03</span>
          <span>—</span>
          <span>Selected Work</span>
        </span>
        <h2
          className="heading-lg rv"
          style={{ "--i": 1, marginBottom: "2.5rem" } as React.CSSProperties}
        >
          Things I&apos;ve{" "}
          <span className="serif-accent">engineered.</span>
        </h2>

        {/* Desktop Modern Accordion */}
        <div
          className="work-panels"
          style={{
            display: "flex",
            height: "min(76svh, 580px)",
            gap: "0.75rem",
            borderRadius: 24,
            overflow: "hidden",
            padding: "0.5rem",
            background: "rgba(10, 17, 34, 0.6)",
            border: "1px solid rgba(125, 211, 252, 0.15)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
          }}
        >
          {PROJECTS.map((project, i) => {
            const isOpen = i === openIdx;
            const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];

            return (
              <div
                key={project.id}
                style={{
                  flex: isOpen ? 7 : 1,
                  transition: "flex 0.55s var(--ease)",
                  background: PANEL_BACKGROUNDS[i % PANEL_BACKGROUNDS.length],
                  borderRadius: 18,
                  overflow: "hidden",
                  position: "relative",
                  cursor: isOpen ? "default" : "pointer",
                  display: "flex",
                  border: isOpen
                    ? `1.5px solid ${accent}60`
                    : "1px solid rgba(125, 211, 252, 0.1)",
                  boxShadow: isOpen
                    ? `0 12px 36px rgba(0,0,0,0.4), 0 0 24px ${accent}25`
                    : "none",
                }}
                onClick={() => !isOpen && setOpenIdx(i)}
              >
                {/* Collapsed Spine */}
                {!isOpen && (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1.5rem 0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.75rem",
                        color: accent,
                        fontWeight: 700,
                      }}
                    >
                      {project.index}
                    </span>
                    <span
                      style={{
                        writingMode: "vertical-lr",
                        transform: "rotate(180deg)",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        letterSpacing: "-0.01em",
                        color: "var(--ink)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {project.title}
                    </span>
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.9rem",
                        color: accent,
                        fontWeight: 600,
                      }}
                    >
                      +
                    </span>
                  </div>
                )}

                {/* Expanded Project Details */}
                {isOpen && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.1fr 1fr",
                      width: "100%",
                      height: "100%",
                      animation: "panelOpen 0.4s var(--ease)",
                    }}
                  >
                    {/* Left: Project Info */}
                    <div
                      style={{
                        padding: "clamp(1.5rem, 3.5vw, 2.5rem)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.1rem",
                        overflowY: "auto",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.7rem",
                            color: accent,
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                          }}
                        >
                          <span>{project.index}</span>
                          <span>—</span>
                          <span>{project.kicker}</span>
                        </div>
                        <h3
                          style={{
                            fontSize: "clamp(1.3rem, 2.6vw, 1.85rem)",
                            fontWeight: 800,
                            letterSpacing: "-0.03em",
                            marginTop: "0.4rem",
                            color: "var(--ink)",
                          }}
                        >
                          {project.title}
                        </h3>
                      </div>

                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: "var(--ink)",
                          lineHeight: 1.65,
                          opacity: 0.9,
                        }}
                      >
                        {project.description}
                      </p>

                      {/* Feature Bullet Points */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "0.55rem",
                          margin: "0.4rem 0",
                        }}
                      >
                        {project.features.map((f) => (
                          <div
                            key={f}
                            style={{
                              fontSize: "0.78rem",
                              color: "var(--ink-2)",
                              display: "flex",
                              gap: "0.45rem",
                              alignItems: "flex-start",
                            }}
                          >
                            <span style={{ color: accent, flexShrink: 0, fontWeight: 700 }}>→</span>
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech stack tags */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "auto" }}>
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: "0.72rem",
                              padding: "0.3rem 0.75rem",
                              borderRadius: "999px",
                              background: "rgba(255, 255, 255, 0.08)",
                              border: "1px solid rgba(125, 211, 252, 0.15)",
                              color: "var(--ink)",
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
                          style={{ alignSelf: "flex-start", fontSize: "0.8rem", padding: "0.5rem 1rem" }}
                        >
                          View Source ↗
                        </a>
                      )}
                    </div>

                    {/* Right: Rich Interface Mockup Preview */}
                    <div
                      style={{
                        background: "rgba(0, 0, 0, 0.25)",
                        borderLeft: "1px solid rgba(125, 211, 252, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1.5rem",
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

        {/* Mobile Accordion */}
        <div className="work-mobile" style={{ display: "none" }}>
          {PROJECTS.map((project, i) => {
            const isOpen = i === openIdx;
            const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];

            return (
              <div
                key={project.id}
                style={{
                  border: "1px solid rgba(125, 211, 252, 0.15)",
                  borderRadius: 16,
                  marginBottom: "1rem",
                  overflow: "hidden",
                  background: PANEL_BACKGROUNDS[i % PANEL_BACKGROUNDS.length],
                }}
              >
                <button
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1.2rem",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    letterSpacing: "-0.02em",
                    textAlign: "left",
                    color: "var(--ink)",
                  }}
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.75rem",
                        color: accent,
                        fontWeight: 700,
                      }}
                    >
                      {project.index}
                    </span>
                    <span>{project.title}</span>
                  </span>
                  <span
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "none",
                      transition: "transform 0.3s var(--ease)",
                      fontSize: "1.3rem",
                      color: accent,
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div style={{ padding: "0 1.2rem 1.4rem" }}>
                    <p
                      style={{
                        fontSize: "0.88rem",
                        color: "var(--ink)",
                        lineHeight: 1.6,
                        marginBottom: "1rem",
                        opacity: 0.9,
                      }}
                    >
                      {project.description}
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: "0.68rem",
                            padding: "0.25rem 0.6rem",
                            borderRadius: "999px",
                            background: "rgba(255, 255, 255, 0.08)",
                            border: "1px solid rgba(196, 181, 253, 0.15)",
                            fontFamily: "'JetBrains Mono', monospace",
                            color: "var(--ink)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div
                      style={{
                        background: "rgba(0, 0, 0, 0.3)",
                        borderRadius: 12,
                        padding: "1rem",
                        border: "1px solid rgba(196, 181, 253, 0.1)",
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
      </div>

      <style>{`
        @keyframes panelOpen {
          from { opacity: 0; transform: scale(0.99); }
          to   { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 820px) {
          .work-panels { display: none !important; }
          .work-mobile { display: block !important; }
        }
      `}</style>
    </section>
  );
}
