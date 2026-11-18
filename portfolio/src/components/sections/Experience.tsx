"use client";
import { useRef, useEffect, useState } from "react";
import { TIMELINE } from "@/lib/data";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      const spine = spineRef.current;
      if (!section || !spine) return;

      const { top, height } = section.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, (-top + window.innerHeight * 0.25) / height)
      );

      // Animate spine
      spine.style.transform = `scaleY(${progress})`;

      // Activate stops
      const numStops = TIMELINE.length;
      const newActive = Math.floor(progress * numStops) - 1;
      setActiveIdx(newActive);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="experience" className="section-pad" ref={sectionRef}>
      <div className="container">
        <span className="section-tag rv">
          <span>04</span>
          <span>—</span>
          <span>Trajectory</span>
        </span>
        <h2
          className="heading-lg rv"
          style={{ "--i": 1, marginBottom: "3.5rem" } as React.CSSProperties}
        >
          The path{" "}
          <span className="serif-accent">so far.</span>
        </h2>

        <div className="timeline-grid" style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "0 2rem" }}>
          {/* Timeline Vertical Spine */}
          <div style={{ position: "relative", gridRow: `1 / ${TIMELINE.length + 2}` }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "50%",
                width: 2,
                background: "rgba(125, 211, 252, 0.12)",
                transform: "translateX(-50%)",
              }}
            />
            <div
              ref={spineRef}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "50%",
                width: 2.5,
                background: "linear-gradient(180deg, #38bdf8 0%, #06b6d4 50%, #3b82f6 100%)",
                boxShadow: "0 0 12px rgba(56, 189, 248, 0.75)",
                transform: "translateX(-50%) scaleY(0)",
                transformOrigin: "top",
                transition: "transform 0.12s linear",
              }}
            />
          </div>

          {/* Timeline stops */}
          {TIMELINE.map((item, i) => {
            const isStopActive = i <= activeIdx;

            return (
              <div
                key={i}
                className="rv"
                style={
                  {
                    "--i": i,
                    gridColumn: 2,
                    paddingBottom: "3rem",
                    display: "grid",
                    gridTemplateColumns: "80px 1fr",
                    gap: "0 1.5rem",
                    alignItems: "start",
                    opacity: isStopActive ? 1 : undefined,
                  } as React.CSSProperties
                }
              >
                {/* Node marker on spine */}
                <div
                  style={{
                    gridColumn: "1 / -1",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    marginBottom: "0.8rem",
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      display: "flex",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        background: isStopActive ? "#38bdf8" : "#0f1a30",
                        border: "2px solid #060b14",
                        boxShadow: isStopActive
                          ? "0 0 0 3px #0284c7, 0 0 16px rgba(56, 189, 248, 0.9)"
                          : "0 0 0 2px rgba(125, 211, 252, 0.2)",
                        transition: "all 0.35s var(--ease)",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.74rem",
                      color: isStopActive ? "var(--ink-2)" : "var(--mute)",
                      fontWeight: 600,
                    }}
                  >
                    {item.year}
                  </div>
                </div>

                {/* Content card */}
                <div
                  className="glass-card"
                  style={{
                    gridColumn: 2,
                    padding: "1.6rem 2rem",
                    borderRadius: 20,
                    border: isStopActive ? "1px solid rgba(125, 211, 252, 0.3)" : "1px solid rgba(125, 211, 252, 0.12)",
                    boxShadow: isStopActive
                      ? "0 12px 36px rgba(0,0,0,0.45), 0 0 20px rgba(14, 165, 233, 0.14)"
                      : "0 4px 16px rgba(0,0,0,0.2)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "0.64rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        color: "#040914",
                        background:
                          item.type === "experience"
                            ? "linear-gradient(135deg, #7dd3fc, #38bdf8)"
                            : "linear-gradient(135deg, #86efac, #34d399)",
                        fontWeight: 700,
                        padding: "0.22rem 0.65rem",
                        borderRadius: "999px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.type}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontWeight: 800,
                      fontSize: "1.25rem",
                      letterSpacing: "-0.02em",
                      color: "var(--ink)",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {item.title}
                  </h3>

                  <div
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--ink-2)",
                      fontWeight: 500,
                      marginBottom: "0.8rem",
                    }}
                  >
                    {item.place}
                  </div>

                  {item.detail && (
                    <p
                      style={{
                        fontSize: "0.88rem",
                        color: "var(--ink)",
                        lineHeight: 1.65,
                        maxWidth: 620,
                        opacity: 0.9,
                        margin: 0,
                      }}
                    >
                      {item.detail}
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          {/* Interactive "Next: Your Team?" Call-to-action Card */}
          <div
            className="rv glass-card"
            style={
              {
                "--i": TIMELINE.length,
                gridColumn: 2,
                border: "1.5px dashed rgba(125, 211, 252, 0.35)",
                borderRadius: 22,
                padding: "2rem 2.2rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
                background: "linear-gradient(135deg, rgba(14, 25, 50, 0.5), rgba(7, 13, 26, 0.7))",
              } as React.CSSProperties
            }
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 10px #38bdf8" }} />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.68rem",
                  color: "#7dd3fc",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                What&apos;s Next · Opportunities
              </span>
            </div>

            <div style={{ fontWeight: 800, fontSize: "1.45rem", letterSpacing: "-0.03em", color: "var(--ink)" }}>
              Next Chapter — Your Engineering Team?
            </div>

            <p style={{ fontSize: "0.92rem", color: "var(--mute)", maxWidth: 580, lineHeight: 1.6, margin: 0 }}>
              Looking for a seasoned Full Stack Engineer with 8+ years of production expertise to build scalable web applications, lead architectures, or solve tough product problems?
            </p>

            <div style={{ marginTop: "0.6rem" }}>
              <a
                href="#contact"
                className="btn-primary"
                style={{ alignSelf: "flex-start" }}
              >
                <span>Let&apos;s build together</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #experience .timeline-grid {
            grid-template-columns: 32px 1fr !important;
            gap: 0 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
