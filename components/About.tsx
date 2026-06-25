"use client";
import { useRef, useEffect, useState } from "react";
import { personal, education } from "@/lib/data";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="px-6 py-16 md:px-8 md:py-24 lg:py-32"
      style={{ maxWidth: "1200px", margin: "0 auto" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start">
        {/* Left: bio */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          <p className="section-label" style={{ marginBottom: "1rem" }}>
            // who I am
          </p>
          <span className="gold-rule" />

          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 300,
              lineHeight: 1.15,
              marginBottom: "2rem",
              color: "#E8E3DC",
            }}
          >
            Engineer by trade,{" "}
            <span style={{ fontStyle: "italic", color: "#C9A84C" }}>
              storyteller
            </span>{" "}
            by nature.
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
            {personal.bio}
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <StatPill label="Users Served" value="7,000+" />
            <StatPill label="Uptime" value="99.5%" />
            <StatPill label="GPA" value="3.96" />
          </div>
        </div>

        {/* Right: education + terminal card */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.2s",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <p className="section-label" style={{ marginBottom: "0.5rem" }}>
            // education
          </p>

          {education.map((edu) => (
            <div key={edu.school} className="ink-card" style={{ padding: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "0.5rem",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <h3
                  className="font-display"
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    color: "#E8E3DC",
                  }}
                >
                  {edu.school}
                </h3>
                <span
                  className="font-mono"
                  style={{ fontSize: "0.7rem", color: "#C9A84C" }}
                >
                  {edu.gpa}
                </span>
              </div>
              <p
                className="font-body"
                style={{ color: "#8B8377", fontSize: "0.9rem", marginBottom: "0.25rem" }}
              >
                {edu.degree}
              </p>
              <p
                className="font-mono"
                style={{ color: "#4A4640", fontSize: "0.72rem", letterSpacing: "0.08em" }}
              >
                {edu.period} · {edu.location}
              </p>
            </div>
          ))}

          {/* Terminal easter egg */}
          <div
            className="ink-card font-mono"
            style={{
              padding: "1.25rem",
              background: "rgba(0, 207, 170, 0.04)",
              borderColor: "rgba(0, 207, 170, 0.2)",
            }}
          >
            <p style={{ color: "#4A4640", fontSize: "0.72rem", marginBottom: "0.5rem" }}>
              $ jason --describe
            </p>
            <p style={{ color: "#00CFAA", fontSize: "0.8rem", lineHeight: 1.6 }}>
              <span style={{ color: "#C9A84C" }}>type:</span> "human"
              <br />
              <span style={{ color: "#C9A84C" }}>skills:</span> ["code", "story", "ship"]
              <br />
              <span style={{ color: "#C9A84C" }}>status:</span> "open to relocation"
              <br />
              <span style={{ color: "#C9A84C" }}>coffee:</span> required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        padding: "0.75rem 1.25rem",
        border: "1px solid rgba(201,168,76,0.2)",
        background: "rgba(201,168,76,0.04)",
      }}
    >
      <div
        className="font-display"
        style={{ fontSize: "1.6rem", fontWeight: 600, color: "#C9A84C" }}
      >
        {value}
      </div>
      <div
        className="font-mono"
        style={{ fontSize: "0.65rem", color: "#8B8377", letterSpacing: "0.1em", textTransform: "uppercase" }}
      >
        {label}
      </div>
    </div>
  );
}
