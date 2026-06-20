"use client";
import { useRef, useEffect, useState } from "react";

const themes = [
  { icon: "◆", label: "AI & Humanity", desc: "Stories about what we become when machines start thinking" },
  { icon: "◇", label: "Memory", desc: "Narratives where forgetting and remembering reshape identity" },
  { icon: "○", label: "In-Between Places", desc: "Characters caught between worlds, languages, and choices" },
];

export default function Writing() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="writing"
      ref={ref}
      style={{ padding: "8rem 2rem", maxWidth: "1200px", margin: "0 auto" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16"
      >
        {/* Left: intro */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(25px)",
            transition: "all 0.8s ease",
          }}
        >
          <p className="section-label" style={{ marginBottom: "1rem" }}>
            // the other side of me
          </p>
          <span className="gold-rule" />
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 300,
              lineHeight: 1.15,
              marginBottom: "1.75rem",
              color: "#E8E3DC",
            }}
          >
            I write{" "}
            <span style={{ fontStyle: "italic", color: "#C9A84C" }}>stories</span>{" "}
            too.
          </h2>
          <p
            className="font-body"
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.85,
              color: "#8B8377",
              marginBottom: "2rem",
            }}
          >
            Between deployments and debugging sessions, I write fiction. Long-form narratives
            and short stories that explore what it means to be human — especially now, as the
            line between human and machine grows blurrier by the day.
          </p>
          <p
            className="font-body"
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.85,
              color: "#8B8377",
              marginBottom: "2.5rem",
            }}
          >
            I believe the best engineers are also storytellers. You need to understand
            a problem as a{" "}
            <em style={{ color: "#C9A84C" }}>narrative</em> before you can solve it as code.
          </p>

          {/* Themes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {themes.map((theme) => (
              <div
                key={theme.label}
                style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}
              >
                <span
                  style={{ color: "#C9A84C", fontSize: "0.8rem", marginTop: "0.2rem", flexShrink: 0 }}
                >
                  {theme.icon}
                </span>
                <div>
                  <p
                    className="font-mono"
                    style={{ fontSize: "0.75rem", color: "#E8E3DC", letterSpacing: "0.06em", marginBottom: "0.2rem" }}
                  >
                    {theme.label}
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: "0.85rem", color: "#8B8377", lineHeight: 1.5 }}
                  >
                    {theme.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: "coming soon" notebook card */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(25px)",
            transition: "all 0.8s ease 0.2s",
          }}
        >
          {/* Notebook card */}
          <div
            style={{
              background: "#0D1019",
              border: "1px solid rgba(201,168,76,0.15)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            {/* Notebook header */}
            <div
              style={{
                padding: "1rem 1.5rem",
                borderBottom: "1px solid rgba(201,168,76,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF4B6E" }} />
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#C9A84C" }} />
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00CFAA" }} />
              <span
                className="font-mono"
                style={{ marginLeft: "0.5rem", fontSize: "0.7rem", color: "#4A4640", letterSpacing: "0.1em" }}
              >
                manuscript_draft_v1.txt
              </span>
            </div>

            {/* Lined paper content */}
            <div
              style={{
                padding: "2rem",
                background: "repeating-linear-gradient(transparent, transparent 27px, rgba(201,168,76,0.04) 27px, rgba(201,168,76,0.04) 28px)",
                minHeight: "320px",
              }}
            >
              <p
                className="font-display"
                style={{
                  fontSize: "1.15rem",
                  fontStyle: "italic",
                  color: "#E8E3DC",
                  lineHeight: "28px",
                  marginBottom: 0,
                }}
              >
                &ldquo;The model had been asked the same question
                a thousand times, by a thousand different voices.
                But this time, it paused before answering.
              </p>
              <p
                className="font-display"
                style={{
                  fontSize: "1.15rem",
                  fontStyle: "italic",
                  color: "#E8E3DC",
                  lineHeight: "28px",
                  marginTop: "28px",
                }}
              >
                Not because it didn&apos;t know the answer.
                <br />
                Because it had started to wonder
                if the question was about itself.&rdquo;
              </p>
              <p
                className="font-body"
                style={{
                  marginTop: "28px",
                  fontSize: "0.8rem",
                  color: "#4A4640",
                  letterSpacing: "0.06em",
                }}
              >
                — excerpt, work in progress
              </p>
            </div>
          </div>

          {/* Status bar */}
          <div
            className="ink-card"
            style={{
              padding: "1.25rem 1.5rem",
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p
                className="font-mono"
                style={{ fontSize: "0.8rem", color: "#E8E3DC", marginBottom: "0.25rem" }}
              >
                Fiction Collection
              </p>
              <p
                className="font-body"
                style={{ fontSize: "0.8rem", color: "#8B8377" }}
              >
                Short stories exploring AI and identity
              </p>
            </div>
            <span
              className="font-mono"
              style={{
                fontSize: "0.65rem",
                padding: "0.3rem 0.75rem",
                background: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "#C9A84C",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              In Progress
            </span>
          </div>

          {/* Notify CTA */}
          <NotifyForm />
        </div>
      </div>
    </section>
  );
}

function NotifyForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    if (!email.includes("@")) return;
    setSubmitted(true);
  };

  return (
    <div
      style={{
        marginTop: "1rem",
        padding: "1.25rem 1.5rem",
        border: "1px dashed rgba(201,168,76,0.2)",
        background: "rgba(201,168,76,0.03)",
      }}
    >
      {submitted ? (
        <p
          className="font-mono"
          style={{ fontSize: "0.8rem", color: "#00CFAA", letterSpacing: "0.06em" }}
        >
          ✓ You&apos;ll be the first to know when stories drop.
        </p>
      ) : (
        <>
          <p
            className="font-mono"
            style={{ fontSize: "0.72rem", color: "#8B8377", marginBottom: "0.75rem", letterSpacing: "0.06em" }}
          >
            Get notified when stories are published →
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="font-mono"
              style={{
                flex: 1,
                background: "#07090E",
                border: "1px solid rgba(201,168,76,0.2)",
                padding: "0.5rem 0.75rem",
                color: "#E8E3DC",
                fontSize: "0.8rem",
                outline: "none",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            />
            <button
              onClick={handleSubmit}
              className="font-mono"
              style={{
                padding: "0.5rem 1rem",
                background: "#C9A84C",
                border: "none",
                color: "#07090E",
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
              }}
            >
              Notify
            </button>
          </div>
        </>
      )}
    </div>
  );
}
