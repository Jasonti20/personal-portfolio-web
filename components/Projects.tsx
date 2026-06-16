"use client";
import { useRef, useEffect, useState } from "react";
import { projects } from "@/lib/data";

export default function Projects() {
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
      id="projects"
      ref={ref}
      style={{
        padding: "8rem 2rem",
        background: "rgba(13, 16, 25, 0.5)",
        borderTop: "1px solid rgba(201,168,76,0.08)",
        borderBottom: "1px solid rgba(201,168,76,0.08)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            marginBottom: "4rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
          }}
        >
          <p className="section-label" style={{ marginBottom: "1rem" }}>
            // things I built
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 300,
              color: "#E8E3DC",
            }}
          >
            Selected{" "}
            <span style={{ fontStyle: "italic", color: "#C9A84C" }}>Projects</span>
          </h2>
        </div>

        {/* Project grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.name}
              project={project}
              idx={idx}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  idx,
  visible,
}: {
  project: (typeof projects)[number];
  idx: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const href = project.url ?? project.github ?? "#";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-4px)" : "translateY(0)"
          : "translateY(30px)",
        transition: `opacity 0.7s ease ${idx * 0.1}s, transform 0.3s ease, border-color 0.3s, box-shadow 0.3s`,
        background: "#0D1019",
        border: `1px solid ${hovered ? project.color + "40" : "rgba(201,168,76,0.12)"}`,
        borderRadius: "2px",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        boxShadow: hovered ? `0 8px 40px ${project.color}15` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Color accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: project.color,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: "1.75rem" }}>{project.emoji}</span>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono"
              style={{
                fontSize: "0.65rem",
                color: project.color,
                padding: "0.25rem 0.6rem",
                border: `1px solid ${project.color}40`,
                textDecoration: "none",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.background = `${project.color}15`)
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.background = "transparent")
              }
            >
              Live ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono"
              style={{
                fontSize: "0.65rem",
                color: "#8B8377",
                padding: "0.25rem 0.6rem",
                border: "1px solid rgba(201,168,76,0.15)",
                textDecoration: "none",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>

      {/* Name */}
      <h3
        className="font-display"
        style={{
          fontSize: "1.35rem",
          fontWeight: 500,
          color: "#E8E3DC",
        }}
      >
        {project.name}
      </h3>

      {/* Description */}
      <p
        className="font-body"
        style={{
          fontSize: "0.9rem",
          lineHeight: 1.7,
          color: "#8B8377",
          flex: 1,
        }}
      >
        {project.description}
      </p>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-mono"
            style={{
              fontSize: "0.65rem",
              padding: "0.2rem 0.5rem",
              background: `${project.color}10`,
              color: project.color,
              border: `1px solid ${project.color}25`,
              letterSpacing: "0.04em",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
