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
        Math.max(0, (-top + window.innerHeight * 0.2) / height)
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
        <span className="section-tag rv">05 — Experience</span>
        <h2
          className="heading-lg rv"
          style={{ "--i": 1, marginBottom: "4rem" } as React.CSSProperties}
        >
          The path{" "}
          <span className="serif-accent">so far.</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "0 2rem" }}>
          {/* Spine */}
          <div style={{ position: "relative", gridRow: `1 / ${TIMELINE.length + 2}` }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "50%",
                width: 2,
                background: "var(--soft)",
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
                width: 2,
                background: "var(--ink)",
                transform: "translateX(-50%) scaleY(0)",
                transformOrigin: "top",
                transition: "transform 0.1s linear",
              }}
            />
          </div>

          {/* Timeline stops */}
          {TIMELINE.map((item, i) => (
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
                  gap: "0 2rem",
                  alignItems: "start",
                  opacity: i <= activeIdx ? 1 : undefined,
                } as React.CSSProperties
              }
            >
              {/* Dot on spine */}
              <div
                style={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  marginBottom: "0.5rem",
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
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: i <= activeIdx ? "var(--ink)" : "var(--soft)",
                      border: "2px solid var(--paper)",
                      boxShadow: `0 0 0 2px ${i <= activeIdx ? "var(--ink)" : "var(--soft)"}`,
                      transition: "all 0.3s var(--ease)",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    color: "var(--mute)",
                  }}
                >
                  {item.year}
                </div>
              </div>

              {/* Content */}
              <div style={{ gridColumn: 2, paddingLeft: "calc(80px + 2rem - 80px)" }}>
                <div
                  style={{
                    display: "inline-block",
                    fontSize: "0.65rem",
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "var(--paper)",
                    background:
                      item.type === "experience" ? "var(--ink)" : "var(--mute)",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    marginBottom: "0.5rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.type}
                </div>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    letterSpacing: "-0.02em",
                    marginBottom: "0.2rem",
                  }}
                >
                  {item.title}
                </h3>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--mute)",
                    marginBottom: "0.6rem",
                  }}
                >
                  {item.place}
                </div>
                {item.detail && (
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--ink-2)",
                      lineHeight: 1.6,
                      maxWidth: 560,
                    }}
                  >
                    {item.detail}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Dashed "Next" card */}
          <div
            className="rv"
            style={
              {
                "--i": TIMELINE.length,
                gridColumn: 2,
                border: "2px dashed var(--soft)",
                borderRadius: 20,
                padding: "1.5rem 2rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              } as React.CSSProperties
            }
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                color: "var(--mute)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              What's next
            </span>
            <div style={{ fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.02em" }}>
              Next — Your team?
            </div>
            <a
              href={`mailto:kiran.nxt19@gmail.com`}
              className="btn-primary"
              style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}
            >
              Let's talk →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
