"use client";

import { useState, useEffect, useRef } from "react";
import { PROFILE } from "@/lib/data";
import { SITE_CONFIG } from "@/lib/config";

export default function MigrationPage() {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [progress, setProgress] = useState(SITE_CONFIG.defaultProgress || 88);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [logs, setLogs] = useState<Array<{ time: string; text: string; status: string }>>([
    { time: "[14:50:12]", text: "Spawning high-throughput migration workers...", status: "[OK]" },
    { time: "[14:51:04]", text: "Compiling Next.js 16 optimized runtime artifacts...", status: "[OK]" },
    { time: "[14:52:45]", text: "Re-indexing SQL Server & MongoDB schemas...", status: "[OK]" },
    { time: "[14:53:18]", text: "Broadcasting TLS / Anycast CDN routing rules...", status: "[SYNCING 88%]" },
    { time: "[14:54:02]", text: "Health checks: zero-packet loss across 18 global edge locations", status: "[200 OK]" },
  ]);

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((current) => (current === msg ? null : current));
    }, 2800);
  };

  // 1. Particle Matrix Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const count = Math.min(45, Math.floor(window.innerWidth / 30));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.8,
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56, 189, 248, 0.45)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 2. Local Storage Notification Check & Dynamic Progress Ticker
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("kk_migration_notify");
      if (savedEmail) {
        setSubscribed(true);
        setEmailInput(savedEmail);
      }
    }

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 94) {
          const delta = Math.random() > 0.6 ? 1 : 0;
          return Math.min(94, prev + delta);
        }
        return prev;
      });
    }, 4500);

    const extraLogs = [
      { text: "Optimizing CSS modules & critical render path...", status: "[200 OK]" },
      { text: "Verifying edge DNS propagation in Frankfurt (fra-1)...", status: "[VERIFIED]" },
      { text: "Warming up distributed Redis caches for instantaneous page loads...", status: "[OK]" },
      { text: "Validating SSL/TLS certificates for https://kiran-kumar.in...", status: "[VALID]" },
      { text: "Performing automated Lighthouse audit: Score 99+ expected...", status: "[READY]" },
      { text: "Synchronizing cross-region redundancy cluster...", status: "[SYNCED]" },
    ];
    let logIdx = 0;

    const logTimer = setInterval(() => {
      const now = new Date();
      const timeStr = "[" + now.toTimeString().split(" ")[0] + "]";
      const item = extraLogs[logIdx];
      setLogs((prev) => [
        ...prev.slice(-6),
        { time: timeStr, text: item.text, status: item.status },
      ]);
      logIdx = (logIdx + 1) % extraLogs.length;
    }, 7000);

    return () => {
      clearInterval(progressTimer);
      clearInterval(logTimer);
    };
  }, []);

  // 3. Email Copy Action
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      showToast(`Copied ${PROFILE.email} to clipboard!`);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  // 4. Form Submit Action
  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailInput.trim();
    if (!email) return;

    if (typeof window !== "undefined") {
      localStorage.setItem("kk_migration_notify", email);
    }
    setSubscribed(true);
    showToast(`Launch alert registered for ${email}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--paper, #060b14)",
        color: "var(--ink, #f0f6ff)",
        fontFamily: "'Inter Tight', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        position: "relative",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "clamp(1.5rem, 4vw, 3.5rem) 1.25rem 2rem",
      }}
    >
      {/* Ambient Lighting Spheres */}
      <div
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "760px",
            height: "760px",
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
            width: "580px",
            height: "580px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(14, 165, 233, 0.04) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "-10%",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.09) 0%, transparent 65%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Interactive Particle Matrix Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.6,
        }}
      />

      {/* Header Bar */}
      <header
        style={{
          width: "100%",
          maxWidth: 960,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2.5rem",
          position: "relative",
          zIndex: 1,
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
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
            <span style={{ color: "var(--mute, #7c90aa)", fontWeight: 400, fontSize: "0.82rem", marginLeft: "0.35rem" }}>
              / System Status
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", flexWrap: "wrap" }}>
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
              color: "var(--ink-2, #7dd3fc)",
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
                animation: "pulse 1.8s ease-in-out infinite",
              }}
            />
            <span>INFRASTRUCTURE MIGRATION ACTIVE</span>
          </div>
        </div>
      </header>

      {/* Main Hero & Telemetry */}
      <main
        style={{
          width: "100%",
          maxWidth: 900,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          margin: "auto 0",
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
            color: "var(--ink-2, #7dd3fc)",
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

        {/* The user's exact phrase given prominence & high-end typography */}
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
            color: "var(--mute, #7c90aa)",
            maxWidth: 620,
            lineHeight: 1.65,
            marginBottom: "2.8rem",
          }}
        >
          We are transitioning our core architecture to high-performance distributed cloud clusters, syncing production assets, and optimizing responsiveness. All services will be restored shortly.
        </p>

        {/* Telemetry & Live Progress HUD */}
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
                color: "var(--ink-2, #7dd3fc)",
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
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
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

          {/* 4 Step Pipeline Nodes */}
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
                        : "var(--faint, #3e536e)",
                  }}
                >
                  {node.status === "done" ? "✓" : node.status === "active" ? "●" : "⏳"} {node.label}
                </div>
                <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--ink, #f0f6ff)" }}>
                  {node.title}
                </div>
              </div>
            ))}
          </div>

          {/* Live Terminal Stream Console */}
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
              <div style={{ color: "var(--mute, #7c90aa)", fontSize: "0.65rem" }}>
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
                  <span style={{ color: "var(--faint, #3e536e)" }}>{log.time}</span>
                  <span style={{ flex: 1 }}>{log.text}</span>
                  <span
                    style={{
                      color: log.status.includes("OK") || log.status.includes("VERIFIED") ? "#34d399" : "#38bdf8",
                      fontWeight: 600,
                    }}
                  >
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Panel: Launch Notification + Direct Inquiries */}
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
          {/* Notification Card */}
          <div className="glass-card" style={{ padding: "1.6rem 1.8rem", borderRadius: 18 }}>
            <div
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--ink, #f0f6ff)",
                marginBottom: "0.4rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>🔔</span>
              <span>Launch Notification</span>
            </div>
            <p
              style={{
                fontSize: "0.84rem",
                color: "var(--mute, #7c90aa)",
                lineHeight: 1.5,
                marginBottom: "1.2rem",
              }}
            >
              Be the first to explore the new platform. Drop your email and our deployment bot will notify you the exact moment the platform goes live.
            </p>

            <form onSubmit={handleNotifySubmit} style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
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
                  color: "var(--ink, #f0f6ff)",
                  outline: "none",
                  fontSize: "0.86rem",
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

          {/* Urgent Direct Inquiries */}
          <div className="glass-card" style={{ padding: "1.6rem 1.8rem", borderRadius: 18 }}>
            <div
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--ink, #f0f6ff)",
                marginBottom: "0.4rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>⚡</span>
              <span>Urgent Inquiries?</span>
            </div>
            <p
              style={{
                fontSize: "0.84rem",
                color: "var(--mute, #7c90aa)",
                lineHeight: 1.5,
                marginBottom: "1.2rem",
              }}
            >
              Need immediate project collaboration or have an urgent query during this migration window? Connect directly:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              <button
                type="button"
                onClick={handleCopyEmail}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.7rem 1.1rem",
                  borderRadius: 12,
                  background: "rgba(10, 19, 36, 0.75)",
                  border: "1px solid rgba(125, 211, 252, 0.15)",
                  color: "var(--ink, #f0f6ff)",
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
                    color: "var(--ink-2, #7dd3fc)",
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
                  color: "var(--ink, #f0f6ff)",
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
                <span style={{ fontSize: "0.75rem", color: "var(--mute, #7c90aa)" }}>PDF ↓</span>
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(125, 211, 252, 0.1)",
          fontSize: "0.78rem",
          color: "var(--mute, #7c90aa)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <strong style={{ color: "var(--ink, #f0f6ff)" }}>{PROFILE.name}</strong> · {PROFILE.role} & {PROFILE.roleAlt} (8+ Yrs)
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem" }}>
          <span>ESTIMATED CUTOVER: {SITE_CONFIG.estimatedCutoverTime}</span> ·{" "}
          <span style={{ color: "#38bdf8" }}>NODE: PROD-MIGRATE-01</span>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMsg && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            zIndex: 999999,
            background: "rgba(8, 16, 32, 0.96)",
            border: "1px solid rgba(56, 189, 248, 0.45)",
            borderRadius: 16,
            padding: "0.9rem 1.3rem",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.75), 0 0 24px rgba(14, 165, 233, 0.3)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontSize: "0.85rem",
            color: "#f0f6ff",
            animation: "slideInToast 0.3s var(--ease)",
          }}
        >
          <span style={{ color: "#38bdf8", fontSize: "1.2rem" }}>✓</span>
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
