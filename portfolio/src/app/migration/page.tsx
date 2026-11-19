"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PROFILE } from "@/lib/data";

export default function MigrationPage() {
  const [copied, setCopied] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [progress, setProgress] = useState(88);
  const [logs, setLogs] = useState<string[]>([
    "[14:50:12] Spawning high-throughput migration workers... [OK]",
    "[14:51:04] Compiling Next.js 16 optimized runtime artifacts... [OK]",
    "[14:52:45] Re-indexing SQL Server & MongoDB schemas... [OK]",
    "[14:53:18] Broadcasting TLS / Anycast CDN routing rules... [SYNCING 88%]",
    "[14:54:02] Health checks: zero-packet loss across 18 global edge locations [200 OK]",
  ]);

  useEffect(() => {
    // Check if previously subscribed
    const saved = localStorage.getItem("kk_migration_notify");
    if (saved) {
      setSubscribed(true);
      setEmailInput(saved);
    }

    // Dynamic progress jitter
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 94) {
          const delta = Math.floor(Math.random() * 2);
          return Math.min(94, prev + delta);
        }
        return prev;
      });
    }, 5000);

    // Live terminal log ticker
    const extraLogs = [
      "Optimizing CSS modules & critical render path... [200 OK]",
      "Verifying edge DNS propagation in Frankfurt (fra-1)... [VERIFIED]",
      "Warming up distributed Redis caches for instantaneous page loads... [OK]",
      "Validating SSL/TLS certificates for https://kiran-kumar.in... [VALID]",
      "Performing automated Lighthouse audit: Score 99+ expected... [READY]",
      "Synchronizing cross-region redundancy cluster... [SYNCED]",
    ];
    let idx = 0;
    const logTimer = setInterval(() => {
      const now = new Date();
      const timeStr = "[" + now.toTimeString().split(" ")[0] + "]";
      setLogs((prev) => [...prev.slice(-6), `${timeStr} ${extraLogs[idx]}`]);
      idx = (idx + 1) % extraLogs.length;
    }, 7000);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {}
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    localStorage.setItem("kk_migration_notify", emailInput.trim());
    setSubscribed(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--paper)",
        color: "var(--ink)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(1.5rem, 4vw, 3.5rem) 1.25rem 2rem",
        overflowX: "hidden",
      }}
    >
      {/* Ambient Lighting */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 760,
            height: 760,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(14, 165, 233, 0.16) 0%, rgba(37, 99, 235, 0.08) 45%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            right: "5%",
            width: 580,
            height: 580,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 65%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Header */}
      <header
        style={{
          width: "100%",
          maxWidth: 960,
          margin: "0 auto 2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(6, 182, 212, 0.1))",
              border: "1px solid rgba(56, 189, 248, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "#38bdf8",
              boxShadow: "0 0 16px rgba(14, 165, 233, 0.2)",
            }}
          >
            {PROFILE.initials}
          </div>
          <div style={{ fontWeight: 700, fontSize: "0.95rem", letterSpacing: "-0.02em" }}>
            {PROFILE.name}{" "}
            <span style={{ color: "var(--mute)", fontWeight: 400, fontSize: "0.82rem", marginLeft: "0.35rem" }}>
              / System Status
            </span>
          </div>
        </Link>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 0.9rem",
            borderRadius: 999,
            background: "rgba(14, 165, 233, 0.08)",
            border: "1px solid rgba(56, 189, 248, 0.25)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.72rem",
            fontWeight: 600,
            color: "var(--ink-2)",
            letterSpacing: "0.05em",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#38bdf8",
              boxShadow: "0 0 10px #38bdf8",
            }}
          />
          <span>INFRASTRUCTURE MIGRATION ACTIVE</span>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          width: "100%",
          maxWidth: 900,
          margin: "auto auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.45rem 1.25rem",
            borderRadius: 999,
            background: "rgba(56, 189, 248, 0.1)",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.74rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--ink-2)",
            marginBottom: "1.8rem",
            boxShadow: "0 0 24px rgba(14, 165, 233, 0.2)",
          }}
        >
          <span>⚡</span>
          <span>Scheduled Cloud & Platform Upgrade</span>
        </div>

        <h1
          style={{
            fontSize: "clamp(2.4rem, 6.2vw, 4.6rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.035em",
            marginBottom: "1.2rem",
            maxWidth: 820,
          }}
        >
          <span style={{ color: "#ffffff", display: "block" }}>The website is</span>{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #bae6fd 0%, #38bdf8 50%, #60a5fa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            under migration.
          </span>
        </h1>

        {/* User's Exact Phrase elevated with Instrument Serif */}
        <p
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "clamp(1.4rem, 3.2vw, 2.1rem)",
            fontStyle: "italic",
            color: "#7dd3fc",
            marginBottom: "1.2rem",
            letterSpacing: "0.01em",
            lineHeight: 1.35,
            maxWidth: 680,
            textShadow: "0 0 20px rgba(56, 189, 248, 0.25)",
          }}
        >
          “Inconvenience is deeply regretted.”
        </p>

        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            color: "var(--mute)",
            maxWidth: 620,
            lineHeight: 1.65,
            marginBottom: "2.8rem",
          }}
        >
          We are transitioning our core architecture to high-performance distributed cloud clusters, syncing production assets, and optimizing responsiveness. All services will be restored shortly.
        </p>

        {/* Telemetry Card */}
        <div
          className="glass-card"
          style={{
            width: "100%",
            borderRadius: 20,
            padding: "clamp(1.5rem, 3.5vw, 2.2rem)",
            marginBottom: "2.5rem",
            textAlign: "left",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.8rem",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.78rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--ink-2)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>●</span> Migration Progress Status
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#38bdf8",
                textShadow: "0 0 12px rgba(56, 189, 248, 0.5)",
              }}
            >
              {progress}%
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: 8,
              background: "rgba(14, 165, 233, 0.1)",
              borderRadius: 999,
              overflow: "hidden",
              marginBottom: "1.8rem",
              border: "1px solid rgba(125, 211, 252, 0.15)",
              position: "relative",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #0284c7 0%, #38bdf8 50%, #7dd3fc 100%)",
                borderRadius: 999,
                transition: "width 0.4s var(--ease)",
              }}
            />
          </div>

          {/* 4 Pipeline Milestones */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
              marginBottom: "1.8rem",
            }}
          >
            {[
              { status: "done", label: "Completed", title: "01. Cluster Provisioning" },
              { status: "done", label: "Completed", title: "02. Data & Asset Sync" },
              { status: "active", label: `In Progress (${progress}%)`, title: "03. Edge CDN & DNS" },
              { status: "pending", label: "Standby", title: "04. Final Cutover" },
            ].map((node, i) => (
              <div
                key={i}
                style={{
                  background: node.status === "active" ? "rgba(14, 165, 233, 0.08)" : "rgba(10, 19, 36, 0.65)",
                  border: `1px solid ${
                    node.status === "active"
                      ? "rgba(56, 189, 248, 0.5)"
                      : node.status === "done"
                      ? "rgba(52, 211, 153, 0.25)"
                      : "rgba(125, 211, 252, 0.12)"
                  }`,
                  borderRadius: 12,
                  padding: "0.9rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.35rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color:
                      node.status === "done"
                        ? "#34d399"
                        : node.status === "active"
                        ? "#38bdf8"
                        : "var(--faint)",
                  }}
                >
                  {node.status === "done" ? "✓" : node.status === "active" ? "●" : "⏳"} {node.label}
                </div>
                <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--ink)" }}>{node.title}</div>
              </div>
            ))}
          </div>

          {/* Terminal Console */}
          <div
            style={{
              background: "#040810",
              border: "1px solid rgba(125, 211, 252, 0.12)",
              borderRadius: 12,
              overflow: "hidden",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
            }}
          >
            <div
              style={{
                background: "rgba(13, 22, 42, 0.95)",
                padding: "0.5rem 0.85rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(125, 211, 252, 0.08)",
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ef4444" }} />
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#f59e0b" }} />
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#10b981" }} />
              </div>
              <div style={{ color: "var(--mute)", fontSize: "0.65rem" }}>
                live-stream://kiran-kumar.in/migration-daemon
              </div>
              <div style={{ color: "#38bdf8", fontSize: "0.65rem" }}>LIVE FEED</div>
            </div>

            <div
              style={{
                padding: "0.9rem 1.1rem",
                maxHeight: 140,
                overflowY: "auto",
                color: "#94a3b8",
                lineHeight: 1.7,
              }}
            >
              {logs.map((log, i) => (
                <div key={i} style={{ display: "flex", gap: "0.6rem" }}>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interaction Panel */}
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.2rem",
            marginBottom: "2.5rem",
            textAlign: "left",
          }}
        >
          {/* Notify form */}
          <div className="glass-card" style={{ padding: "1.6rem 1.8rem", borderRadius: 18 }}>
            <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.4rem" }}>
              🔔 Launch Notification
            </div>
            <p style={{ fontSize: "0.84rem", color: "var(--mute)", lineHeight: 1.5, marginBottom: "1.2rem" }}>
              Be the first to explore the new experience. Drop your email and our deployment bot will notify you the exact moment the platform goes live.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              <input
                type="email"
                required
                value={emailInput}
                disabled={subscribed}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="developer@example.com"
                style={{
                  flex: 1,
                  minWidth: 160,
                  background: "rgba(6, 11, 20, 0.8)",
                  border: "1px solid rgba(125, 211, 252, 0.2)",
                  borderRadius: 999,
                  padding: "0.75rem 1.2rem",
                  color: "var(--ink)",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={subscribed}
                className="btn-primary"
                style={{
                  fontSize: "0.85rem",
                  padding: "0.75rem 1.4rem",
                  borderRadius: 999,
                  whiteSpace: "nowrap",
                  opacity: subscribed ? 0.6 : 1,
                  cursor: subscribed ? "not-allowed" : "pointer",
                }}
              >
                {subscribed ? "✓ Subscribed" : "Notify Me →"}
              </button>
            </form>
            {subscribed && (
              <p
                style={{
                  marginTop: "0.6rem",
                  fontSize: "0.78rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#34d399",
                }}
              >
                ✓ Registered! We will notify you upon live cutover.
              </p>
            )}
          </div>

          {/* Urgent Inquiries Direct Contact */}
          <div className="glass-card" style={{ padding: "1.6rem 1.8rem", borderRadius: 18 }}>
            <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.4rem" }}>
              ⚡ Urgent Inquiries?
            </div>
            <p style={{ fontSize: "0.84rem", color: "var(--mute)", lineHeight: 1.5, marginBottom: "1.2rem" }}>
              Need immediate project collaboration or have an urgent query during this migration window? Connect directly:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.7rem 1.1rem",
                  borderRadius: 12,
                  background: "rgba(10, 19, 36, 0.75)",
                  border: "1px solid rgba(125, 211, 252, 0.15)",
                  color: "var(--ink)",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s var(--ease)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ color: "#38bdf8" }}>✉</span>
                  <span>{PROFILE.email}</span>
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--ink-2)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {copied ? "Copied! ✓" : "Copy 📋"}
                </span>
              </button>

              <a
                href={PROFILE.resumePath}
                download
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.7rem 1.1rem",
                  borderRadius: 12,
                  background: "rgba(10, 19, 36, 0.75)",
                  border: "1px solid rgba(125, 211, 252, 0.15)",
                  color: "var(--ink)",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s var(--ease)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ color: "#38bdf8" }}>📄</span>
                  <span>Download Résumé</span>
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--mute)" }}>PDF ↓</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          width: "100%",
          maxWidth: 960,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(125, 211, 252, 0.1)",
          fontSize: "0.78rem",
          color: "var(--mute)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <strong style={{ color: "var(--ink)" }}>{PROFILE.name}</strong> · {PROFILE.role} & {PROFILE.roleAlt} (8+ Yrs)
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem" }}>
          <span>ESTIMATED CUTOVER: ~35 MINS</span> · <span style={{ color: "#38bdf8" }}>NODE: PROD-MIGRATE-01</span>
        </div>
      </footer>
    </div>
  );
}