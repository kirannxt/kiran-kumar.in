"use client";
import { useState, useEffect, useRef } from "react";
import { PROFILE } from "@/lib/data";

function HopText({ text }: { text: string }) {
  return (
    <span aria-label={text} style={{ display: "inline-flex", flexWrap: "wrap" }}>
      {text.split("").map((ch, i) =>
        ch === " " ? (
          <span key={i} style={{ width: "0.3em" }} />
        ) : (
          <span
            key={i}
            style={{ display: "inline-block", transition: "transform 0.2s var(--ease)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLSpanElement).style.transform =
                "translateY(-8px)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLSpanElement).style.transform = "none")
            }
          >
            {ch}
          </span>
        )
      )}
    </span>
  );
}

function SpinBadge() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let angle = 0;
    const raf = setInterval(() => {
      angle += 0.4;
      if (ref.current) ref.current.style.transform = `rotate(${angle}deg)`;
    }, 16);
    return () => clearInterval(raf);
  }, []);

  const text = "say hello · kiran kumar · get in touch · ";
  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        width: 120,
        height: 120,
        position: "relative",
      }}
    >
      <svg viewBox="0 0 120 120" width="120" height="120">
        <path
          id="circle-path"
          d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
          fill="none"
        />
        <text
          fontSize="9"
          fontFamily="'JetBrains Mono', monospace"
          fill="var(--mute)"
          letterSpacing="2"
        >
          <textPath href="#circle-path">{text}</textPath>
        </text>
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
        }}
      >
        👋
      </div>
    </div>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback
    }
  };

  return (
    <section
      id="contact"
      className="section-pad"
      style={{ borderTop: "1px solid var(--line)" }}
    >
      <div className="container">
        <span className="section-tag rv">06 — Contact</span>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "3rem",
          }}
        >
          <h2
            className="heading-xl rv"
            style={
              {
                "--i": 1,
                lineHeight: 1.05,
                maxWidth: "800px",
              } as React.CSSProperties
            }
          >
            <HopText text="Let's build" />
            <br />
            <HopText text="something together." />
          </h2>

          <SpinBadge />

          {/* Email */}
          <div
            className="rv"
            style={{ "--i": 2, display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", justifyContent: "center" } as React.CSSProperties}
          >
            <a
              href={`mailto:${PROFILE.email}`}
              style={{
                fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
                fontWeight: 700,
                textDecoration: "underline",
                textUnderlineOffset: "6px",
                letterSpacing: "-0.02em",
              }}
            >
              {PROFILE.email}
            </a>
            <button
              onClick={copy}
              aria-live="polite"
              aria-label={copied ? "Email copied" : "Copy email"}
              className="btn-outline"
              style={{ fontSize: "0.8rem", padding: "0.4rem 0.9rem" }}
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>

          {/* Phone */}
          <div className="rv" style={{ "--i": 3 } as React.CSSProperties}>
            <a
              href={PROFILE.phoneHref}
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--mute)",
              }}
            >
              {PROFILE.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--line)",
          marginTop: "6rem",
          paddingTop: "2rem",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.8rem",
            color: "var(--mute)",
          }}
        >
          <span>
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
          {/* <span>Built with Next.js</span> */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              fontSize: "0.8rem",
              color: "var(--mute)",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            Back to top ↑
          </button>
        </div>
      </footer>
    </section>
  );
}
