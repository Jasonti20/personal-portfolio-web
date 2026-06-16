import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jason Ti — GenAI Engineer & Storyteller",
  description:
    "Portfolio of Chang (Jason) Ti — Software Engineer specializing in GenAI/LLM systems. Building RAG pipelines, AI safety middleware, and things that ship.",
  keywords: ["Jason Ti", "GenAI", "LLM", "Software Engineer", "React", "Python", "FastAPI"],
  openGraph: {
    title: "Jason Ti — GenAI Engineer & Storyteller",
    description: "Software Engineer building AI systems that actually ship.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
