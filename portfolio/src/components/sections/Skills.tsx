"use client";
import { useState } from "react";
import { SKILL_GROUPS, SKILL_FAMILIES, type Skill, type SkillFamily } from "@/lib/data";

const FAMILY_COLORS: Record<SkillFamily, string> = {
  Frontend:  "rgba(14, 165, 233, 0.16)",
  Backend:   "rgba(99, 102, 241, 0.16)",
  Databases: "rgba(16, 185, 129, 0.16)",
  Cloud:     "rgba(168, 85, 247, 0.16)",
  Tools:     "rgba(245, 158, 11, 0.16)",
  Languages: "rgba(244, 63, 94, 0.16)",
};

const FAMILY_BORDER_COLORS: Record<SkillFamily, string> = {
  Frontend:  "#38bdf8",
  Backend:   "#818cf8",
  Databases: "#34d399",
  Cloud:     "#c084fc",
  Tools:     "#fbbf24",
  Languages: "#fb7185",
};

const SKILL_PROJECT_MAP: Record<string, string[]> = {
  Angular: ["Learning Management System", "GeneSilico"],
  React: ["GeneSilico", "POD Health", "Portfolio"],
  "C# / .NET": ["QBSCare"],
  "Node.js": ["POD Health", "MindsNXT Services"],
  "Express.js": ["MindsNXT APIs"],
  "SQL Server": ["QBSCare", "Enterprise DB"],
  MySQL: ["MindsNXT Data Layer"],
  MongoDB: ["MindsNXT Services"],
  Firebase: ["POD Health", "Cloud Hosting"],
  "REST APIs": ["GeneSilico", "POD Health", "Mavvrik"],
  TypeScript: ["GeneSilico", "Mavvrik", "Portfolio"],
  JavaScript: ["Web Applications", "LMS"],
  Postman: ["Mavvrik", "API Testing"],
};

function SkillTile({
  skill,
  active,
  dimmed,
  onSelect,
}: {
  skill: Skill;
  active: boolean;
  dimmed: boolean;
  onSelect: (s: Skill) => void;
}) {
  const accent = FAMILY_BORDER_COLORS[skill.family];

  return (
    <button
      onClick={() => onSelect(skill)}
      style={{
        position: "relative",
        background: active
          ? FAMILY_COLORS[skill.family]
          : "rgba(19, 13, 41, 0.7)",
        border: active
          ? `1.5px solid ${accent}`
          : "1px solid rgba(196, 181, 253, 0.12)",
        borderRadius: 14,
        padding: "0.75rem 0.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.2rem",
        textAlign: "center",
        opacity: dimmed ? 0.28 : 1,
        transform: active ? "translateY(-3px) scale(1.04)" : "none",
        boxShadow: active
          ? `0 8px 24px rgba(0, 0, 0, 0.5), 0 0 16px ${accent}40`
          : "0 2px 8px rgba(0,0,0,0.2)",
        transition: "all 0.25s var(--ease)",
        cursor: "pointer",
        minWidth: 0,
      }}
      onMouseEnter={(e) => {
        if (!active && !dimmed) {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.borderColor = accent;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.borderColor = "rgba(196, 181, 253, 0.12)";
        }
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 2px",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.58rem",
            color: active ? accent : "var(--mute)",
            fontWeight: 600,
          }}
        >
          {skill.atomicNo.toString().padStart(2, "0")}
        </span>
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: accent,
            opacity: active ? 1 : 0.4,
          }}
        />
      </div>

      <span
        style={{
          fontWeight: 800,
          fontSize: "clamp(1.1rem, 2.4vw, 1.45rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color: active ? "#ffffff" : "var(--ink)",
          margin: "0.2rem 0",
        }}
      >
        {skill.symbol}
      </span>

      <span
        style={{
          fontSize: "0.62rem",
          fontWeight: 500,
          color: active ? "var(--ink)" : "var(--ink-2)",
          lineHeight: 1.2,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          width: "100%",
        }}
      >
        {skill.name}
      </span>
    </button>
  );
}

export default function Skills() {
  const [activeFamily, setActiveFamily] = useState<SkillFamily | null>(null);
  const [selected, setSelected] = useState<Skill | null>(SKILL_GROUPS[0]); // default to first skill (Angular)

  return (
    <section id="skills" className="section-pad" style={{ background: "linear-gradient(180deg, #060b14 0%, #0a1120 50%, #060b14 100%)" }}>
      <div className="container">
        <span className="section-tag rv">
          <span>02</span>
          <span>—</span>
          <span>Skills</span>
        </span>
        <h2 className="heading-lg rv" style={{ "--i": 1, marginBottom: "0.6rem" } as React.CSSProperties}>
          The periodic table{" "}
          <span className="serif-accent">of my stack.</span>
        </h2>
        <p className="rv" style={{ "--i": 2, color: "var(--mute)", maxWidth: "560px", marginBottom: "2rem", fontSize: "0.95rem" } as React.CSSProperties}>
          An elemental taxonomy of languages, frameworks, databases, and infrastructure mastered over 8+ years of engineering.
        </p>

        {/* Family filter chips */}
        <div
          className="rv"
          style={{
            "--i": 3,
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
            marginBottom: "2.5rem",
          } as React.CSSProperties}
        >
          <button
            className={activeFamily === null ? "btn-primary" : "btn-outline"}
            style={{ padding: "0.45rem 1.1rem", fontSize: "0.82rem" }}
            onClick={() => setActiveFamily(null)}
          >
            All Elements ({SKILL_GROUPS.length})
          </button>
          {SKILL_FAMILIES.map((f) => {
            const count = SKILL_GROUPS.filter((s) => s.family === f).length;
            const accent = FAMILY_BORDER_COLORS[f];
            const isFilterActive = activeFamily === f;

            return (
              <button
                key={f}
                onClick={() => setActiveFamily(isFilterActive ? null : f)}
                style={{
                  padding: "0.45rem 1.1rem",
                  borderRadius: "999px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  border: isFilterActive ? `1px solid ${accent}` : "1px solid rgba(125, 211, 252, 0.15)",
                  background: isFilterActive
                    ? FAMILY_COLORS[f]
                    : "rgba(13, 22, 42, 0.6)",
                  color: isFilterActive ? "#ffffff" : "var(--ink)",
                  boxShadow: isFilterActive ? `0 0 16px ${accent}40` : "none",
                  transition: "all 0.25s var(--ease)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent }} />
                <span>{f}</span>
                <span style={{ opacity: 0.65, fontSize: "0.74rem" }}>({count})</span>
              </button>
            );
          })}
        </div>

        {/* Layout: Periodic Grid + Inspector Card */}
        <div
          className="skills-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr clamp(260px, 24vw, 320px)",
            gap: "2.2rem",
            alignItems: "start",
          }}
        >
          {/* Elements Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(82px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {SKILL_GROUPS.map((skill) => (
              <SkillTile
                key={skill.atomicNo}
                skill={skill}
                active={selected?.atomicNo === skill.atomicNo}
                dimmed={
                  activeFamily !== null && skill.family !== activeFamily
                }
                onSelect={setSelected}
              />
            ))}
          </div>

          {/* Interactive Inspector Panel */}
          <div
            className="skills-inspector glass-card"
            style={{
              position: "sticky",
              top: "90px",
              padding: "1.8rem",
              borderRadius: "24px",
              border: `1.5px solid ${selected ? FAMILY_BORDER_COLORS[selected.family] + "60" : "var(--line)"}`,
              boxShadow: "0 16px 48px rgba(0, 0, 0, 0.5), 0 0 24px rgba(139, 92, 246, 0.12)",
              transition: "all 0.35s var(--ease)",
            }}
          >
            {selected ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem" }}>
                  <div
                    style={{
                      width: 84,
                      height: 84,
                      borderRadius: 18,
                      background: FAMILY_COLORS[selected.family],
                      border: `2px solid ${FAMILY_BORDER_COLORS[selected.family]}`,
                      boxShadow: `0 8px 24px ${FAMILY_BORDER_COLORS[selected.family]}35`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.3s var(--ease)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.62rem",
                        color: FAMILY_BORDER_COLORS[selected.family],
                        fontWeight: 700,
                      }}
                    >
                      #{selected.atomicNo.toString().padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontSize: "2.2rem",
                        fontWeight: 800,
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                        color: "#ffffff",
                      }}
                    >
                      {selected.symbol}
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      padding: "0.25rem 0.65rem",
                      borderRadius: 999,
                      background: FAMILY_COLORS[selected.family],
                      color: FAMILY_BORDER_COLORS[selected.family],
                      fontWeight: 600,
                      border: `1px solid ${FAMILY_BORDER_COLORS[selected.family]}40`,
                    }}
                  >
                    {selected.family}
                  </span>
                </div>

                <div style={{ fontWeight: 800, fontSize: "1.35rem", letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "0.3rem" }}>
                  {selected.name}
                </div>

                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    color: "var(--mute)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Element #{selected.atomicNo} · {selected.family} Tier
                </div>

                {/* Contextual Projects */}
                <div style={{ borderTop: "1px solid rgba(196, 181, 253, 0.12)", paddingTop: "1rem" }}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      color: "var(--mute)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: "0.6rem",
                    }}
                  >
                    Production Implementations
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                    {(SKILL_PROJECT_MAP[selected.name] ?? ["Core Platform Stack", "Enterprise Workflows"]).map((proj) => (
                      <div
                        key={proj}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontSize: "0.78rem",
                          color: "var(--ink-2)",
                          background: "rgba(255, 255, 255, 0.04)",
                          padding: "0.4rem 0.7rem",
                          borderRadius: 8,
                          border: "1px solid rgba(196, 181, 253, 0.08)",
                        }}
                      >
                        <span style={{ color: FAMILY_BORDER_COLORS[selected.family] }}>✓</span>
                        <span>{proj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p style={{ fontSize: "0.85rem", color: "var(--mute)", lineHeight: 1.6 }}>
                Click or hover over any elemental skill to inspect detailed properties and project applications.
              </p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .skills-layout {
            grid-template-columns: 1fr !important;
          }
          .skills-inspector {
            position: static !important;
            margin-top: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
