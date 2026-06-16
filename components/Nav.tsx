"use client";
import { useState, useEffect } from "react";
import { personal } from "@/lib/data";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#writing" },
  { label: "Ask Jason", href: "#agent" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.4s ease",
        background: scrolled
          ? "rgba(7, 9, 14, 0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(201, 168, 76, 0.1)"
          : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          className="font-mono"
          style={{
            color: "#C9A84C",
            fontSize: "0.85rem",
            letterSpacing: "0.1em",
            textDecoration: "none",
          }}
        >
          {personal.shortName.toLowerCase()}.ti
        </a>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
          className="hidden md:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono"
              style={{
                color: "#8B8377",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#C9A84C")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#8B8377")
              }
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${personal.email}`}
            style={{
              padding: "0.4rem 1rem",
              border: "1px solid rgba(201, 168, 76, 0.4)",
              color: "#C9A84C",
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily: "'JetBrains Mono', monospace",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background =
                "rgba(201, 168, 76, 0.08)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = "transparent";
            }}
          >
            Contact
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="flex md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#C9A84C",
            padding: "0.5rem",
          }}
          aria-label="Toggle menu"
        >
          <div style={{ width: "22px", display: "flex", flexDirection: "column", gap: "5px" }}>
            <span
              style={{
                display: "block",
                height: "1px",
                background: "#C9A84C",
                transition: "all 0.3s",
                transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                height: "1px",
                background: "#C9A84C",
                transition: "all 0.3s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                height: "1px",
                background: "#C9A84C",
                transition: "all 0.3s",
                transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(7, 9, 14, 0.97)",
            borderTop: "1px solid rgba(201, 168, 76, 0.1)",
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
          className="md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono"
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#8B8377",
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
