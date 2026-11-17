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
              ((e.currentTarget as HTMLSpanElement).style.transform = "translateY(-8px)")
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
    <div ref={ref} aria-hidden style={{ width: 120, height: 120, position: "relative" }}>
      <svg viewBox="0 0 120 120" width="120" height="120">
        <path
          id="circle-path"
          d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
          fill="none"
        />
        <text fontSize="9" fontFamily="'JetBrains Mono', monospace" fill="var(--mute)" letterSpacing="2">
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

// ─── Contact form ─────────────────────────────────────────────────────────────
// This portfolio is deployed as a static export, so contact delivery
// uses FormSubmit's hosted endpoint instead of a server-side mail API.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${PROFILE.email}`;

type FormState = "idle" | "sending" | "success" | "error";

function ContactForm() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus]   = useState<FormState>("idle");

  useEffect(() => {
    if (status !== "success") return;
    const timeout = window.setTimeout(() => setStatus("idle"), 30_000);
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
    background: "var(--soft)",
    border: "1px solid var(--line)",
    borderRadius: 12,
    padding: "0.85rem 1rem",
    fontSize: "16px",
    color: "var(--ink)",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s var(--ease)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.65rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--mute)",
    marginBottom: "0.4rem",
  };

  return (
    <>
      {status === "success" && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            top: 24,
            right: 24,
            zIndex: 1000,
            width: "min(360px, calc(100vw - 32px))",
            padding: "1rem 1.25rem",
            border: "1px solid var(--line)",
            borderRadius: 16,
            background: "var(--card)",
            boxShadow: "0 16px 48px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
            <span aria-hidden="true" style={{ color: "#86efac", fontSize: "1.2rem", lineHeight: 1 }}>✓</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>Message sent!</div>
              <div style={{ color: "var(--mute)", fontSize: "0.85rem" }}>
                I&apos;ll get back to you at <strong style={{ color: "var(--ink)" }}>{PROFILE.email}</strong> shortly.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              aria-label="Dismiss notification"
              style={{ color: "var(--mute)", fontSize: "1.1rem", lineHeight: 1 }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <form
      className="contact-form"
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        maxWidth: 560,
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
      }}
    >
      {/* Row: name + email */}
      <div className="contact-form-row">
        <div className="contact-form-field">
          <label htmlFor="contact-name" style={labelStyle}>Name</label>
          <input
            className="contact-form-control"
            id="contact-name"
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--ink-2)")}
            onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--line)")}
          />
        </div>
        <div className="contact-form-field">
          <label htmlFor="contact-email" style={labelStyle}>Email</label>
          <input
            className="contact-form-control"
            id="contact-email"
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--ink-2)")}
            onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--line)")}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" style={labelStyle}>Message</label>
        <textarea
          className="contact-form-control"
          id="contact-message"
          required
          rows={5}
          placeholder="Tell me about your project..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--ink-2)")}
          onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--line)")}
        />
      </div>

      {/* Error */}
      {status === "error" && (
        <p role="alert" style={{ fontSize: "0.85rem", color: "#f87171", marginTop: "-0.5rem" }}>
          Something went wrong. Try emailing me directly at{" "}
          <a href={`mailto:${PROFILE.email}`} style={{ textDecoration: "underline" }}>
            {PROFILE.email}
          </a>
        </p>
      )}

      <button
        type="submit"
        className="btn-primary"
        disabled={status === "sending"}
        style={{ opacity: status === "sending" ? 0.6 : 1 }}
      >
        {status === "sending" ? "Sending…" : "Send message →"}
      </button>
      </form>
    </>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
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
            gap: "2.5rem",
          }}
        >
          <h2
            className="heading-xl rv"
            style={{ "--i": 1, lineHeight: 1.05, maxWidth: "800px" } as React.CSSProperties}
          >
            <HopText text="Let's build" />
            <br />
            <HopText text="something together." />
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
              gap: "1rem",
              width: "100%",
              maxWidth: 560,
              color: "var(--faint)",
              fontSize: "0.75rem",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
            or reach out directly
            <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
          </div>

          {/* Email + copy */}
          <div
            className="rv"
            style={{
              "--i": 3,
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
            } as React.CSSProperties}
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

        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--line)", marginTop: "6rem", paddingTop: "2rem" }}>
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
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
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

      <style>{`
        input::placeholder, textarea::placeholder { color: var(--faint); }
        input:focus, textarea:focus { outline: none; }
        .contact-form { width: min(100%, 560px); margin-inline: auto; }
        .contact-form-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }
        .contact-form-field { min-width: 0; }
        .contact-form-control { width: 100%; min-width: 0; max-width: 100%; }
        .contact-form > .btn-primary { align-self: flex-start; }
        @media (max-width: 640px) {
          .contact-form-row { grid-template-columns: minmax(0, 1fr); }
          .contact-form { gap: 1rem !important; }
        }
        @media (max-width: 480px) {
          .contact-form > .btn-primary { align-self: stretch; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
