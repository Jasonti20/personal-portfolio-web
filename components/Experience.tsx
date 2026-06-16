"use client";
import { useRef, useEffect, useState } from "react";
import { experience } from "@/lib/data";

export default function Experience() {
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
      id="experience"
      ref={ref}
      style={{ padding: "8rem 2rem", maxWidth: "1200px", margin: "0 auto" }}
    >
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease",
          marginBottom: "4rem",
        }}
      >
        <p className="section-label" style={{ marginBottom: "1rem" }}>
          // work history
        </p>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 300,
            color: "#E8E3DC",
          }}
        >
          Where I&apos;ve{" "}
          <span style={{ fontStyle: "italic", color: "#C9A84C" }}>shipped</span>
        </h2>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative", paddingLeft: "2rem" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: "7px",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)",
          }}
        />

        {experience.map((job, idx) => (
          <div
            key={job.company}
            style={{
              position: "relative",
              marginBottom: idx < experience.length - 1 ? "4rem" : 0,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transition: `all 0.7s ease ${idx * 0.2}s`,
            }}
          >
            {/* Timeline dot */}
            <div
              className="pulse-ring"
              style={{
                position: "absolute",
                left: "-2rem",
                top: "6px",
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: "#C9A84C",
                border: "2px solid #07090E",
                boxShadow: "0 0 10px rgba(201,168,76,0.4)",
              }}
            />

            {/* Card */}
            <div className="ink-card" style={{ padding: "2rem" }}>
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  marginBottom: "0.5rem",
                }}
              >
                <div>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 500,
                      color: "#E8E3DC",
                    }}
                  >
                    {job.role}
                  </h3>
                  <p
                    className="font-mono"
                    style={{
                      fontSize: "0.8rem",
                      color: "#C9A84C",
                      letterSpacing: "0.08em",
                      marginTop: "0.25rem",
                    }}
                  >
                    {job.company}
                  </p>
                </div>
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.7rem",
                    color: "#4A4640",
                    letterSpacing: "0.08em",
                    padding: "0.3rem 0.75rem",
                    border: "1px solid rgba(201,168,76,0.1)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {job.period}
                </span>
              </div>

              {/* Bullets */}
              <ul style={{ paddingLeft: 0, listStyle: "none", marginTop: "1.25rem" }}>
                {job.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="font-body"
                    style={{
                      fontSize: "0.92rem",
                      lineHeight: 1.75,
                      color: "#8B8377",
                      marginBottom: "0.75rem",
                      paddingLeft: "1.25rem",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        color: "#00CFAA",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.75rem",
                        top: "0.2rem",
                      }}
                    >
                      ›
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
