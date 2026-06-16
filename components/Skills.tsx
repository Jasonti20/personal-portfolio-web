"use client";
import { useRef, useEffect, useState } from "react";
import { skills } from "@/lib/data";

const categoryColors: Record<string, string> = {
  "AI / LLM": "#C9A84C",
  Languages: "#00CFAA",
  Frameworks: "#9B6FFF",
  "Cloud / Data": "#FF4B6E",
};

export default function Skills() {
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

  const allSkills = Object.entries(skills).flatMap(([cat, items]) =>
    items.map((item) => ({ item, cat }))
  );

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding: "6rem 2rem",
        background: "rgba(13, 16, 25, 0.5)",
        borderTop: "1px solid rgba(201,168,76,0.08)",
        borderBottom: "1px solid rgba(201,168,76,0.08)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
          }}
        >
          <p className="section-label" style={{ marginBottom: "1rem" }}>
            // tech stack
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 300,
              color: "#E8E3DC",
            }}
          >
            What I build{" "}
            <span style={{ fontStyle: "italic", color: "#C9A84C" }}>with</span>
          </h2>
        </div>

        {/* Category grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {Object.entries(skills).map(([category, items], catIdx) => {
            const color = categoryColors[category] ?? "#C9A84C";
            return (
              <div
                key={category}
                className="ink-card"
                style={{
                  padding: "1.75rem",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.7s ease ${catIdx * 0.1}s`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: color,
                      boxShadow: `0 0 8px ${color}`,
                    }}
                  />
                  <h3
                    className="font-mono"
                    style={{
                      fontSize: "0.72rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color,
                    }}
                  >
                    {category}
                  </h3>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {items.map((skill) => (
                    <SkillTag key={skill} label={skill} color={color} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Marquee strip */}
        <div
          style={{
            marginTop: "3rem",
            overflow: "hidden",
            opacity: 0.35,
            borderTop: "1px solid rgba(201,168,76,0.08)",
            paddingTop: "2rem",
          }}
        >
          <div className="marquee-track">
            {[...allSkills, ...allSkills].map(({ item, cat }, i) => (
              <span
                key={i}
                className="font-mono"
                style={{
                  padding: "0 2rem",
                  fontSize: "0.75rem",
                  color: categoryColors[cat] ?? "#C9A84C",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.1em",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillTag({ label, color }: { label: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className="font-mono"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: "0.72rem",
        padding: "0.3rem 0.65rem",
        border: `1px solid ${hovered ? color : "rgba(201,168,76,0.15)"}`,
        color: hovered ? color : "#8B8377",
        background: hovered ? `${color}10` : "transparent",
        cursor: "default",
        transition: "all 0.2s ease",
        letterSpacing: "0.04em",
      }}
    >
      {label}
    </span>
  );
}
