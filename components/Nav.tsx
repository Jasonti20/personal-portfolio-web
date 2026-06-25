"use client";
import { useState, useEffect } from "react";
import { personal } from "@/lib/data";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#writing" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
        background: scrolled || menuOpen ? "rgba(7, 9, 14, 0.97)" : "transparent",
        backdropFilter: scrolled && !menuOpen ? "blur(12px)" : "none",
        borderBottom: scrolled && !menuOpen ? "1px solid rgba(201, 168, 76, 0.1)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
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
          onClick={() => setMenuOpen(false)}
          style={{
            color: "#C9A84C",
            fontSize: "0.85rem",
            letterSpacing: "0.1em",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          {personal.shortName.toLowerCase()}.ti
        </a>

        {/* Desktop links — no inline display, relies solely on Tailwind hidden/flex */}
        <div
          className="hidden md:flex items-center"
          style={{ gap: "2rem" }}
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
              (e.target as HTMLElement).style.background = "rgba(201, 168, 76, 0.08)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = "transparent";
            }}
          >
            Contact
          </a>
        </div>

        {/* Hamburger — no inline display, relies solely on Tailwind flex/md:hidden */}
        <button
          className="flex flex-col md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            gap: "5px",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
          }}
        >
          <span
            style={{
              display: "block",
              width: "22px",
              height: "1.5px",
              background: "#C9A84C",
              transition: "transform 0.3s ease",
              transform: menuOpen ? "rotate(45deg) translate(0px, 6.5px)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "1.5px",
              background: "#C9A84C",
              transition: "opacity 0.3s ease",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "1.5px",
              background: "#C9A84C",
              transition: "transform 0.3s ease",
              transform: menuOpen ? "rotate(-45deg) translate(0px, -6.5px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu — max-height + opacity animation, no conditional render */}
      <div
        className="md:hidden"
        style={{
          overflow: "hidden",
          maxHeight: menuOpen ? "480px" : "0",
          opacity: menuOpen ? 1 : 0,
          transition: "max-height 0.4s ease, opacity 0.3s ease",
          background: "rgba(7, 9, 14, 0.98)",
          borderTop: "1px solid rgba(201, 168, 76, 0.1)",
        }}
      >
        <div style={{ padding: "1.25rem 1.5rem 2rem" }}>
          {links.map((link, idx) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                color: "#8B8377",
                fontSize: "0.82rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "0.9rem 0",
                borderBottom: "1px solid rgba(201,168,76,0.07)",
                transition: `color 0.2s, opacity 0.3s ease ${idx * 0.05}s, transform 0.3s ease ${idx * 0.05}s`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(-6px)",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#C9A84C")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#8B8377")}
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${personal.email}`}
            onClick={() => setMenuOpen(false)}
            className="font-mono"
            style={{
              display: "block",
              marginTop: "1.25rem",
              padding: "0.85rem",
              border: "1px solid rgba(201, 168, 76, 0.35)",
              color: "#C9A84C",
              fontSize: "0.72rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              textAlign: "center",
              transition: `background 0.2s, opacity 0.3s ease ${links.length * 0.05}s`,
              opacity: menuOpen ? 1 : 0,
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.background = "rgba(201,168,76,0.06)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.background = "transparent")
            }
          >
            Get in Touch →
          </a>
        </div>
      </div>
    </nav>
  );
}
