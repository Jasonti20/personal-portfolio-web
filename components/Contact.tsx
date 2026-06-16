"use client";
import { useRef, useEffect, useState } from "react";
import { personal } from "@/lib/data";

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState<FormState>("idle");

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setState("loading");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

    try {
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setState("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setState("error");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: "8rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "500px",
          background: "radial-gradient(ellipse at bottom, rgba(201,168,76,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
            marginBottom: "4rem",
          }}
        >
          <p className="section-label" style={{ marginBottom: "1rem" }}>
            // let&apos;s connect
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "#E8E3DC",
            }}
          >
            Got an{" "}
            <span style={{ fontStyle: "italic", color: "#C9A84C" }}>idea</span>?
            Let&apos;s talk.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16"
        >
          {/* Left: info */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(25px)",
              transition: "all 0.8s ease 0.1s",
            }}
          >
            <p
              className="font-body"
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "#8B8377",
                marginBottom: "2.5rem",
              }}
            >
              Whether you&apos;re building something with AI, need a GenAI engineer,
              or just want to talk shop — my inbox is open. I&apos;m also open to
              relocating for the right opportunity.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <ContactInfo icon="@" label="Email" value={personal.email} href={`mailto:${personal.email}`} />
              <ContactInfo icon="◎" label="Location" value="St. Louis, MO · Open to relocation" />
              <ContactInfo icon="↗" label="LinkedIn" value="linkedin.com/in/Jasoncti" href={personal.linkedin} />
              <ContactInfo icon="◈" label="GitHub" value="github.com/Jasonti20" href={personal.github} />
            </div>
          </div>

          {/* Right: contact form */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(25px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            {state === "success" ? (
              <div
                className="ink-card"
                style={{
                  padding: "3rem",
                  textAlign: "center",
                  borderColor: "rgba(0,207,170,0.3)",
                  background: "rgba(0,207,170,0.03)",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✓</div>
                <h3
                  className="font-display"
                  style={{ fontSize: "1.5rem", color: "#00CFAA", marginBottom: "0.75rem" }}
                >
                  Message received.
                </h3>
                <p className="font-body" style={{ color: "#8B8377", fontSize: "0.95rem" }}>
                  I&apos;ll get back to you as soon as I can — usually within a day or two.
                </p>
                <button
                  onClick={() => setState("idle")}
                  className="font-mono"
                  style={{
                    marginTop: "1.5rem",
                    background: "none",
                    border: "1px solid rgba(0,207,170,0.3)",
                    color: "#00CFAA",
                    padding: "0.5rem 1rem",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                  }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <FormField
                    label="Name *"
                    type="text"
                    value={form.name}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    placeholder="Your name"
                    required
                  />
                  <FormField
                    label="Email *"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <FormField
                  label="Subject"
                  type="text"
                  value={form.subject}
                  onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
                  placeholder="What's this about?"
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label
                    className="font-mono"
                    style={{ fontSize: "0.7rem", color: "#8B8377", letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Tell me about your project or idea..."
                    required
                    rows={5}
                    className="font-body"
                    style={{
                      background: "#0D1019",
                      border: "1px solid rgba(201,168,76,0.15)",
                      padding: "0.75rem 1rem",
                      color: "#E8E3DC",
                      fontSize: "0.9rem",
                      fontFamily: "'Lora', Georgia, serif",
                      outline: "none",
                      resize: "vertical",
                      lineHeight: 1.6,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.15)")}
                  />
                </div>

                {state === "error" && (
                  <p
                    className="font-mono"
                    style={{ fontSize: "0.75rem", color: "#FF4B6E", letterSpacing: "0.06em" }}
                  >
                    Something went wrong. Try emailing me directly at jasoncti20@gmail.com
                  </p>
                )}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="font-mono"
                  style={{
                    padding: "0.85rem 2rem",
                    background: state === "loading" ? "rgba(201,168,76,0.3)" : "#C9A84C",
                    border: "none",
                    color: "#07090E",
                    fontSize: "0.8rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    cursor: state === "loading" ? "not-allowed" : "pointer",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                    transition: "background 0.2s",
                    alignSelf: "flex-start",
                  }}
                  onMouseEnter={(e) => {
                    if (state !== "loading")
                      (e.target as HTMLElement).style.background = "#E8C97A";
                  }}
                  onMouseLeave={(e) => {
                    if (state !== "loading")
                      (e.target as HTMLElement).style.background = "#C9A84C";
                  }}
                >
                  {state === "loading" ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "6rem",
            borderTop: "1px solid rgba(201,168,76,0.08)",
            paddingTop: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 0.5s",
          }}
        >
          <p className="font-mono" style={{ fontSize: "0.7rem", color: "#4A4640", letterSpacing: "0.1em" }}>
            © 2025 Chang Jason Ti
          </p>
          <p className="font-mono" style={{ fontSize: "0.7rem", color: "#4A4640", letterSpacing: "0.08em" }}>
            Next.js · FastAPI · Claude AI
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactInfo({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
      <span style={{ color: "#C9A84C", fontSize: "0.9rem", flexShrink: 0, marginTop: "0.1rem" }}>
        {icon}
      </span>
      <div>
        <p className="font-mono" style={{ fontSize: "0.65rem", color: "#4A4640", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.1rem" }}>
          {label}
        </p>
        {href ? (
          <a
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="font-body"
            style={{ fontSize: "0.9rem", color: "#8B8377", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#C9A84C")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#8B8377")}
          >
            {value}
          </a>
        ) : (
          <p className="font-body" style={{ fontSize: "0.9rem", color: "#8B8377" }}>{value}</p>
        )}
      </div>
    </div>
  );
}

function FormField({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label
        className="font-mono"
        style={{ fontSize: "0.7rem", color: "#8B8377", letterSpacing: "0.1em", textTransform: "uppercase" }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="font-body"
        style={{
          background: "#0D1019",
          border: "1px solid rgba(201,168,76,0.15)",
          padding: "0.6rem 0.9rem",
          color: "#E8E3DC",
          fontSize: "0.9rem",
          fontFamily: "'Lora', Georgia, serif",
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.5)")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.15)")}
      />
    </div>
  );
}
