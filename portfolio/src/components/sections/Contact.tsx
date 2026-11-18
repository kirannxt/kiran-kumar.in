"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { PROFILE } from "@/lib/data";

function SpinBadge() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let angle = 0;
    const raf = setInterval(() => {
      angle += 0.35;
      if (ref.current) ref.current.style.transform = `rotate(${angle}deg)`;
    }, 16);
    return () => clearInterval(raf);
  }, []);

  const text = "say hello · get in touch · kiran · ";
  const chars = text.split("");
  const total = chars.length;

  return (
    <div style={{ width: 120, height: 120, position: "relative" }} aria-hidden>
      {/* Spinning Ring */}
      <div ref={ref} style={{ position: "absolute", inset: 0 }}>
        {chars.map((ch, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "8px",
              fontWeight: 600,
              color: "var(--ink-2)",
              transform: `rotate(${(i / total) * 360}deg) translateY(-46px)`,
              transformOrigin: "0 0",
              lineHeight: 1,
              whiteSpace: "pre",
            }}
          >
            {ch}
          </span>
        ))}
      </div>
      {/* Centre Emoji with Ambient Halo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.6rem",
          filter: "drop-shadow(0 0 12px rgba(14, 165, 233, 0.45))",
        }}
      >
        👋
      </div>
    </div>
  );
}

// ─── Contact form ─────────────────────────────────────────────────────────────
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${PROFILE.email}`;

type FormState = "idle" | "sending" | "success" | "error";

function ContactForm() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus]   = useState<FormState>("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status !== "success") return;
    const timeout = window.setTimeout(() => setStatus("idle"), 15_000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          _replyto: email.trim(),
          message: message.trim(),
          _subject: `Portfolio message from ${name.trim()}`,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setName(""); setEmail(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    background: "rgba(13, 22, 42, 0.85)",
    border: "1px solid rgba(125, 211, 252, 0.16)",
    borderRadius: 14,
    padding: "0.9rem 1.15rem",
    fontSize: "15px",
    color: "var(--ink)",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.25s var(--ease), box-shadow 0.25s var(--ease), background 0.25s var(--ease)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.72rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--ink-2)",
    marginBottom: "0.45rem",
    fontWeight: 600,
  };

  // Toast rendered directly into document.body to avoid navbar overlap and CSS stacking context issues
  const toastElement = mounted && status === "success"
    ? createPortal(
        <div
          role="status"
          aria-live="polite"
          className="contact-toast"
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            zIndex: 999999,
            width: "min(390px, calc(100vw - 32px))",
            padding: "1.1rem 1.35rem",
            border: "1px solid rgba(56, 189, 248, 0.5)",
            borderRadius: 18,
            background: "rgba(8, 16, 32, 0.96)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.75), 0 0 24px rgba(14, 165, 233, 0.3)",
            animation: "slideInToast 0.35s var(--ease)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
            <span aria-hidden="true" style={{ color: "#38bdf8", fontSize: "1.3rem", lineHeight: 1 }}>✓</span>
            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#f0f6ff", marginBottom: "0.2rem" }}>
                Message transmitted successfully!
              </div>
              <div style={{ color: "var(--mute)", fontSize: "0.84rem", lineHeight: 1.45 }}>
                Thank you! I will reply directly to your email shortly.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              aria-label="Dismiss notification"
              style={{ color: "var(--mute)", fontSize: "1.2rem", lineHeight: 1, padding: "0 4px", cursor: "pointer" }}
            >
              ×
            </button>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {toastElement}

      <form
        className="contact-form glass-card"
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 600,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1.3rem",
          padding: "clamp(1.5rem, 4vw, 2.5rem)",
          textAlign: "left",
        }}
      >
        {/* Row: name + email */}
        <div className="contact-form-row">
          <div className="contact-form-field">
            <label htmlFor="contact-name" style={labelStyle}>Your Name</label>
            <input
              className="contact-form-control"
              id="contact-name"
              type="text"
              required
              placeholder="e.g. Sarah Connor"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#38bdf8";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(56, 189, 248, 0.25)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(125, 211, 252, 0.16)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
          <div className="contact-form-field">
            <label htmlFor="contact-email" style={labelStyle}>Your Email Address</label>
            <input
              className="contact-form-control"
              id="contact-email"
              type="email"
              required
              placeholder="sarah@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#38bdf8";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(56, 189, 248, 0.25)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(125, 211, 252, 0.16)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
        </div>

        {/* Message area */}
        <div>
          <label htmlFor="contact-message" style={labelStyle}>Your Message or Project Details</label>
          <textarea
            className="contact-form-control"
            id="contact-message"
            required
            rows={5}
            placeholder="Tell me about your application, architecture requirements, or project vision..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ ...inputStyle, resize: "vertical", minHeight: 130 }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#38bdf8";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(56, 189, 248, 0.25)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(125, 211, 252, 0.16)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Error Notification */}
        {status === "error" && (
          <p role="alert" style={{ fontSize: "0.85rem", color: "#f87171", margin: 0 }}>
            Unable to send message via form endpoint. Please send directly to{" "}
            <a href={`mailto:${PROFILE.email}`} style={{ textDecoration: "underline", color: "#fca5a5" }}>
              {PROFILE.email}
            </a>
          </p>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={status === "sending"}
          style={{
            alignSelf: "flex-start",
            opacity: status === "sending" ? 0.7 : 1,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          {status === "sending" ? (
            <>
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: "2px solid #040914",
                  borderTopColor: "transparent",
                  animation: "spin 0.8s linear infinite",
                  display: "inline-block",
                }}
              />
              <span>Transmitting message...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <span aria-hidden="true" style={{ fontSize: "1.1rem" }}>→</span>
            </>
          )}
        </button>
      </form>
    </>
  );
}

// ─── Main Contact Section ─────────────────────────────────────────────────────
export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {}
  };

  return (
    <section
      id="contact"
      className="section-pad"
      style={{ borderTop: "1px solid rgba(125, 211, 252, 0.12)", position: "relative" }}
    >
      <div className="container">
        <span className="section-tag rv">
          <span>05</span>
          <span>—</span>
          <span>Connect</span>
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "2.5rem",
          }}
        >
          <h2
            className="rv"
            style={{
              "--i": 1,
              lineHeight: 1.08,
              maxWidth: "780px",
              fontSize: "clamp(2.2rem, 5vw, 4.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
            } as React.CSSProperties}
          >
            Let&apos;s build{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #bae6fd 0%, #38bdf8 50%, #60a5fa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              something extraordinary
            </span>{" "}
            together.
          </h2>

          <SpinBadge />

          {/* Form */}
          <div className="rv" style={{ "--i": 2, width: "100%" } as React.CSSProperties}>
            <ContactForm />
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.2rem",
              width: "100%",
              maxWidth: 580,
              color: "var(--mute)",
              fontSize: "0.74rem",
              fontFamily: "'JetBrains Mono', monospace",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            <div style={{ flex: 1, height: 1, background: "rgba(125, 211, 252, 0.12)" }} />
            or reach out directly
            <div style={{ flex: 1, height: 1, background: "rgba(125, 211, 252, 0.12)" }} />
          </div>

          {/* Email + Quick Copy Button */}
          <div
            className="rv"
            style={{
              "--i": 3,
              display: "flex",
              alignItems: "center",
              gap: "1.2rem",
              flexWrap: "wrap",
              justifyContent: "center",
            } as React.CSSProperties}
          >
            <a
              href={`mailto:${PROFILE.email}`}
              style={{
                fontSize: "clamp(1rem, 2.2vw, 1.4rem)",
                fontWeight: 700,
                color: "#f0f6ff",
                textDecoration: "underline",
                textUnderlineOffset: "6px",
                letterSpacing: "-0.02em",
                transition: "color 0.2s var(--ease)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#7dd3fc")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#f0f6ff")}
            >
              {PROFILE.email}
            </a>
            <button
              onClick={copy}
              aria-live="polite"
              aria-label={copied ? "Email copied" : "Copy email address"}
              className="btn-outline"
              style={{
                fontSize: "0.82rem",
                padding: "0.5rem 1.1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <span>{copied ? "✓" : "📋"}</span>
              <span>{copied ? "Copied to clipboard!" : "Copy Email"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(125, 211, 252, 0.12)", marginTop: "6rem", paddingTop: "2.5rem" }}>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.2rem",
            fontSize: "0.82rem",
            color: "var(--mute)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontWeight: 600, color: "var(--ink)" }}>{PROFILE.name}</span>
            <span>·</span>
            <span>Software Engineer & Full Stack Developer</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <a
              href={PROFILE.resumePath}
              download
              style={{ color: "var(--ink-2)", textDecoration: "underline" }}
            >
              Download Résumé
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "var(--ink)",
                fontWeight: 600,
                transition: "color 0.2s var(--ease)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#7dd3fc")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink)")}
            >
              <span>Back to top</span>
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes slideInToast {
          from { transform: translateY(16px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        input::placeholder, textarea::placeholder { color: var(--faint); opacity: 0.8; }
        input:focus, textarea:focus { outline: none; }
        .contact-form-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.2rem;
        }
        .contact-form-field { min-width: 0; }
        .contact-form-control { width: 100%; min-width: 0; max-width: 100%; }
        @media (max-width: 640px) {
          .contact-toast {
            bottom: 20px !important;
            right: 16px !important;
            left: 16px !important;
            width: auto !important;
          }
          .contact-form-row { grid-template-columns: minmax(0, 1fr); gap: 1rem; }
        }
      `}</style>
    </section>
  );
}
