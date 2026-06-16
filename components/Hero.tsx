"use client";
import { useEffect, useState } from "react";
import { personal } from "@/lib/data";

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const current = personal.taglines[taglineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 45);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), 2000);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 300);
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 20);
      } else {
        setTaglineIndex((i) => (i + 1) % personal.taglines.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, taglineIndex]);

  return (
    <section
      id="hero"
      className="grid-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "2rem",
      }}
    >
      {/* Radial gradient glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(ellipse at center, rgba(201, 168, 76, 0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Teal glow bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          right: "-100px",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, rgba(0, 207, 170, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Terminal prefix */}
        <p
          className="section-label animate-fade-up animate-delay-100"
          style={{ marginBottom: "1.5rem" }}
        >
          ∞ portfolio / jason-ti
        </p>

        {/* Name */}
        <h1
          className="font-display animate-fade-up animate-delay-200"
          style={{
            fontSize: "clamp(3rem, 10vw, 7.5rem)",
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: "0.5rem",
          }}
        >
          <span style={{ color: "#E8E3DC" }}>Chang </span>
          <span className="text-gold-gradient" style={{ fontStyle: "italic", fontWeight: 400 }}>
            Jason
          </span>
          <span style={{ color: "#E8E3DC" }}> Ti</span>
        </h1>

        {/* Role */}
        <p
          className="font-mono animate-fade-up animate-delay-300"
          style={{
            fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
            color: "#8B8377",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "2.5rem",
          }}
        >
          Software Engineer · GenAI / LLM · St. Louis, MO
        </p>

        {/* Animated tagline */}
        <div
          className="animate-fade-up animate-delay-400"
          style={{
            height: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "3rem",
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: "clamp(0.85rem, 2.5vw, 1.05rem)",
              color: "#E8E3DC",
              minHeight: "1.5em",
            }}
          >
            <span style={{ color: "#00CFAA" }}>&gt; </span>
            {displayed}
            <span
              style={{
                color: "#00CFAA",
                animation: "cursor-blink 1.1s infinite",
              }}
            >
              _
            </span>
          </span>
        </div>

        {/* Social links */}
        <div
          className="animate-fade-up animate-delay-500"
          style={{
            display: "flex",
            gap: "1.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <SocialLink href={personal.github} label="GitHub" />
          <SocialLink href={personal.linkedin} label="LinkedIn" />
          <SocialLink href={`mailto:${personal.email}`} label="Email" />
        </div>

        {/* Scroll hint */}
        <div
          className="animate-fade-up animate-delay-600"
          style={{
            marginTop: "5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            className="font-mono"
            style={{ fontSize: "0.65rem", color: "#4A4640", letterSpacing: "0.15em" }}
          >
            SCROLL
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background:
                "linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)",
              animation: "fade-up 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="font-mono"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: "0.75rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: hovered ? "#C9A84C" : "#8B8377",
        textDecoration: "none",
        padding: "0.5rem 1.25rem",
        border: `1px solid ${hovered ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.15)"}`,
        transition: "all 0.25s ease",
        background: hovered ? "rgba(201,168,76,0.06)" : "transparent",
      }}
    >
      {label}
    </a>
  );
}
