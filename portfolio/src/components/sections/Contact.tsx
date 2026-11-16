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
// Replace FORMSPREE_ID with your form ID from https://formspree.io
// e.g. if your endpoint is https://formspree.io/f/abcdefgh  →  "abcdefgh"
const FORMSPREE_ID = "YOUR_FORM_ID";

type FormState = "idle" | "sending" | "success" | "error";

function ContactForm() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus]   = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
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
    background: "var(--soft)",
    border: "1px solid var(--line)",
    borderRadius: 12,
    padding: "0.85rem 1rem",
    fontSize: "0.95rem",
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

  if (status === "success") {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem 2rem",
          border: "1px solid var(--line)",
          borderRadius: 20,
          background: "var(--card)",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✓</div>
        <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
          Message sent!
        </div>
        <p style={{ color: "var(--mute)", fontSize: "0.9rem" }}>
          I'll get back to you at <strong style={{ color: "var(--ink)" }}>{PROFILE.email}</strong> shortly.
        </p>
        <button
          className="btn-outline"
          style={{ marginTop: "1.5rem", fontSize: "0.85rem" }}
          onClick={() => setStatus("idle")}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        maxWidth: 560,
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
      }}
      noValidate
    >
      {/* Row: name + email */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
        <div>
          <label htmlFor="contact-name" style={labelStyle}>Name</label>
          <input
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
        <div>
          <label htmlFor="contact-email" style={labelStyle}>Email</label>
          <input
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
        <p style={{ fontSize: "0.85rem", color: "#f87171", marginTop: "-0.5rem" }}>
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
        style={{ alignSelf: "flex-start", opacity: status === "sending" ? 0.6 : 1 }}
      >
        {status === "sending" ? "Sending…" : "Send message →"}
      </button>
    </form>
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

          {/* Phone */}
          <div className="rv" style={{ "--i": 4 } as React.CSSProperties}>
            <a href={PROFILE.phoneHref} style={{ fontSize: "1rem", fontWeight: 600, color: "var(--mute)" }}>
              {PROFILE.phone}
            </a>
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
        @media (max-width: 480px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
