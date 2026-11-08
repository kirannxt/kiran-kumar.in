"use client";
import { useState } from "react";
import { SKILL_GROUPS, SKILL_FAMILIES, type Skill, type SkillFamily } from "@/lib/data";

const FAMILY_COLORS: Record<SkillFamily, string> = {
  Frontend:  "#e8f4fd",
  Backend:   "#fdf3e8",
  Databases: "#edf8ee",
  Cloud:     "#f5edfb",
  Tools:     "#fdf9e8",
  Languages: "#fde8e8",
};

function SkillTile({
  skill,
  active,
  dimmed,
  delay,
  onSelect,
}: {
  skill: Skill;
  active: boolean;
  dimmed: boolean;
  delay: number;
  onSelect: (s: Skill) => void;
}) {
  return (
    <button
      onClick={() => onSelect(skill)}
      className="rv"
      style={
        {
          "--i": 0,
          background: active
            ? FAMILY_COLORS[skill.family]
            : "var(--card)",
          border: active
            ? `1.5px solid ${FAMILY_COLORS[skill.family]}`
            : "1px solid var(--line)",
          borderRadius: 12,
          padding: "0.6rem 0.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.15rem",
          textAlign: "center",
          opacity: dimmed ? 0.3 : 1,
          transition: "all 0.25s var(--ease)",
          cursor: "pointer",
          animationDelay: `${delay}ms`,
          minWidth: 0,
        } as React.CSSProperties
      }
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.55rem",
          color: "var(--mute)",
        }}
      >
        {skill.atomicNo.toString().padStart(2, "0")}
      </span>
      <span
        style={{
          fontWeight: 800,
          fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        {skill.symbol}
      </span>
      <span
        style={{
          fontSize: "0.55rem",
          color: "var(--ink-2)",
          lineHeight: 1.2,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {skill.name}
      </span>
    </button>
  );
}

export default function Skills() {
  const [activeFamily, setActiveFamily] = useState<SkillFamily | null>(null);
  const [selected, setSelected] = useState<Skill | null>(null);

  return (
    <section id="skills" className="section-pad" style={{ background: "var(--card)" }}>
      <div className="container">
        <span className="section-tag rv">02 — Skills</span>
        <h2 className="heading-lg rv" style={{ "--i": 1, marginBottom: "0.5rem" } as React.CSSProperties}>
          The periodic table{" "}
          <span className="serif-accent">of my stack.</span>
        </h2>

        {/* Family filter chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            margin: "2rem 0",
          }}
        >
          <button
            className={activeFamily === null ? "btn-primary" : "btn-outline"}
            style={{ padding: "0.4rem 1rem", fontSize: "0.8rem" }}
            onClick={() => setActiveFamily(null)}
          >
            All
          </button>
          {SKILL_FAMILIES.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFamily(activeFamily === f ? null : f)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: "999px",
                fontSize: "0.8rem",
                fontWeight: 500,
                border: "1px solid var(--line)",
                background:
                  activeFamily === f
                    ? FAMILY_COLORS[f]
                    : "transparent",
                transition: "all 0.2s var(--ease)",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))",
              gap: "0.5rem",
            }}
          >
            {SKILL_GROUPS.map((skill, i) => {
              const row = Math.floor(i / 8);
              const col = i % 8;
              return (
                <SkillTile
                  key={skill.atomicNo}
                  skill={skill}
                  active={selected?.atomicNo === skill.atomicNo}
                  dimmed={
                    activeFamily !== null && skill.family !== activeFamily
                  }
                  delay={(row + col) * 40}
                  onSelect={setSelected}
                />
              );
            })}
          </div>

          {/* Inspector panel */}
          <div
            style={{
              width: "clamp(180px, 22vw, 280px)",
              position: "sticky",
              top: "100px",
              background: "var(--paper)",
              borderRadius: 20,
              border: "1px solid var(--line)",
              padding: "1.5rem",
              minHeight: 200,
              transition: "all 0.3s var(--ease)",
            }}
          >
            {selected ? (
              <>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 16,
                    background: FAMILY_COLORS[selected.family],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    fontWeight: 800,
                    marginBottom: "1rem",
                    transition: "transform 0.3s var(--ease)",
                    transform: "scale(1.05)",
                  }}
                >
                  {selected.symbol}
                </div>
                <div style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.3rem" }}>
                  {selected.name}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: "var(--mute)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  {selected.family}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    color: "var(--mute)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  Atomic No.
                </div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--faint)" }}>
                  {selected.atomicNo.toString().padStart(2, "0")}
                </div>
              </>
            ) : (
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--mute)",
                  lineHeight: 1.6,
                }}
              >
                Hover or tap a tile to inspect a skill.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
