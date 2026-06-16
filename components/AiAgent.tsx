"use client";
import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starters = [
  "What's Jason's background in AI/LLM?",
  "Tell me about Block Club.",
  "Is Jason open to new roles?",
  "What projects has Jason built?",
];

export default function AiAgent() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

    try {
      const res = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: fullText };
          return next;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Hmm, something went wrong on my end. Try reaching Jason directly at jasoncti20@gmail.com!",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <section
      id="agent"
      ref={ref}
      style={{
        padding: "8rem 2rem",
        background: "rgba(0, 207, 170, 0.02)",
        borderTop: "1px solid rgba(0, 207, 170, 0.08)",
        borderBottom: "1px solid rgba(0, 207, 170, 0.08)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16"
        >
          {/* Left: intro */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(25px)",
              transition: "all 0.8s ease",
            }}
          >
            <p className="section-label" style={{ marginBottom: "1rem", color: "#00CFAA" }}>
              // ai agent
            </p>
            <span
              style={{
                display: "block",
                width: "3rem",
                height: "2px",
                background: "linear-gradient(90deg, #00CFAA, transparent)",
                marginBottom: "1.5rem",
              }}
            />
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                marginBottom: "1.5rem",
                color: "#E8E3DC",
              }}
            >
              Ask{" "}
              <span style={{ fontStyle: "italic", color: "#00CFAA" }}>Jason.AI</span>
            </h2>
            <p
              className="font-body"
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "#8B8377",
                marginBottom: "2rem",
              }}
            >
              I built an AI agent that knows everything about me — my experience,
              projects, and what I&apos;m looking for. Ask it anything you&apos;d ask me
              in an interview.
            </p>

            {/* Starter prompts */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <p
                className="font-mono"
                style={{ fontSize: "0.7rem", color: "#4A4640", letterSpacing: "0.1em", marginBottom: "0.25rem" }}
              >
                TRY ASKING:
              </p>
              {starters.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setOpen(true);
                    send(s);
                  }}
                  className="font-mono"
                  style={{
                    background: "none",
                    border: "1px solid rgba(0,207,170,0.15)",
                    padding: "0.6rem 0.75rem",
                    color: "#8B8377",
                    fontSize: "0.78rem",
                    textAlign: "left",
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,207,170,0.5)";
                    (e.currentTarget as HTMLElement).style.color = "#00CFAA";
                    (e.currentTarget as HTMLElement).style.background = "rgba(0,207,170,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,207,170,0.15)";
                    (e.currentTarget as HTMLElement).style.color = "#8B8377";
                    (e.currentTarget as HTMLElement).style.background = "none";
                  }}
                >
                  → {s}
                </button>
              ))}
            </div>
          </div>

          {/* Right: terminal chat */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(25px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            <div
              style={{
                background: "#07090E",
                border: "1px solid rgba(0,207,170,0.2)",
                borderRadius: "2px",
                overflow: "hidden",
                boxShadow: "0 4px 60px rgba(0,207,170,0.06)",
              }}
            >
              {/* Terminal title bar */}
              <div
                style={{
                  padding: "0.75rem 1rem",
                  borderBottom: "1px solid rgba(0,207,170,0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "rgba(0,207,170,0.04)",
                }}
              >
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF4B6E" }} />
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#C9A84C" }} />
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00CFAA" }} />
                <span
                  className="font-mono"
                  style={{ marginLeft: "0.5rem", fontSize: "0.7rem", color: "#00CFAA", letterSpacing: "0.1em" }}
                >
                  jason.ai — v1.0
                </span>
                <span
                  className="font-mono"
                  style={{
                    marginLeft: "auto",
                    fontSize: "0.65rem",
                    color: "#4A4640",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#00CFAA",
                      display: "inline-block",
                      boxShadow: "0 0 6px #00CFAA",
                    }}
                  />
                  LIVE
                </span>
              </div>

              {/* Messages */}
              <div
                style={{
                  height: "380px",
                  overflowY: "auto",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {messages.length === 0 && (
                  <div
                    className="font-mono"
                    style={{
                      color: "#4A4640",
                      fontSize: "0.8rem",
                      lineHeight: 1.6,
                    }}
                  >
                    <p style={{ color: "#00CFAA", marginBottom: "0.5rem" }}>
                      $ jason --interactive
                    </p>
                    <p>Welcome. I&apos;m Jason&apos;s AI agent.</p>
                    <p>Ask me anything about his background, projects, or what he&apos;s up to.</p>
                    <p style={{ marginTop: "0.5rem", color: "#C9A84C" }}>
                      Type your question below ↓
                    </p>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <ChatMessage key={i} msg={msg} />
                ))}

                {loading && <TypingIndicator />}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div
                style={{
                  borderTop: "1px solid rgba(0,207,170,0.1)",
                  padding: "0.75rem 1rem",
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                <span
                  className="font-mono"
                  style={{ color: "#00CFAA", fontSize: "0.85rem", flexShrink: 0 }}
                >
                  &gt;
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask me anything..."
                  disabled={loading}
                  className="font-mono"
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#E8E3DC",
                    fontSize: "0.85rem",
                    fontFamily: "'JetBrains Mono', monospace",
                    caretColor: "#00CFAA",
                  }}
                />
                <button
                  onClick={() => send(input)}
                  disabled={loading || !input.trim()}
                  className="font-mono"
                  style={{
                    background: loading || !input.trim() ? "rgba(0,207,170,0.1)" : "#00CFAA",
                    border: "none",
                    color: loading || !input.trim() ? "#4A4640" : "#07090E",
                    padding: "0.35rem 0.75rem",
                    fontSize: "0.7rem",
                    letterSpacing: "0.08em",
                    cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                    fontFamily: "'JetBrains Mono', monospace",
                    transition: "all 0.2s",
                    fontWeight: 600,
                  }}
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatMessage({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div
      className="msg-animate"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isUser ? "flex-end" : "flex-start",
      }}
    >
      <span
        className="font-mono"
        style={{
          fontSize: "0.6rem",
          color: "#4A4640",
          letterSpacing: "0.08em",
          marginBottom: "0.3rem",
          textTransform: "uppercase",
        }}
      >
        {isUser ? "you" : "jason.ai"}
      </span>
      <div
        className="font-body"
        style={{
          maxWidth: "85%",
          padding: "0.6rem 0.9rem",
          background: isUser ? "rgba(201,168,76,0.08)" : "rgba(0,207,170,0.06)",
          border: `1px solid ${isUser ? "rgba(201,168,76,0.2)" : "rgba(0,207,170,0.2)"}`,
          color: isUser ? "#E8C97A" : "#E8E3DC",
          fontSize: "0.88rem",
          lineHeight: 1.65,
          whiteSpace: "pre-wrap",
        }}
      >
        {msg.content || (
          <span style={{ color: "#4A4640", fontStyle: "italic", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}>
            thinking...
          </span>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column", gap: "0.3rem" }}>
      <span
        className="font-mono"
        style={{ fontSize: "0.6rem", color: "#4A4640", letterSpacing: "0.08em", textTransform: "uppercase" }}
      >
        jason.ai
      </span>
      <div
        style={{
          display: "flex",
          gap: "5px",
          padding: "0.65rem 0.9rem",
          background: "rgba(0,207,170,0.06)",
          border: "1px solid rgba(0,207,170,0.2)",
          alignItems: "center",
        }}
      >
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`dot-${i}`}
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#00CFAA",
              display: "inline-block",
            }}
          />
        ))}
      </div>
    </div>
  );
}
