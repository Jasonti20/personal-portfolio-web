export const personal = {
  name: "Chang (Jason) Ti",
  shortName: "Jason",
  title: "Software Engineer · GenAI/LLM",
  location: "St. Louis, MO",
  email: "jasoncti20@gmail.com",
  linkedin: "https://www.linkedin.com/in/Jasoncti",
  github: "https://github.com/Jasonti20",
  taglines: [
    "I build AI systems that actually ship.",
    "I write code. I write stories.",
    "Turning prompts into products.",
    "RAG pipelines by day, narratives by night.",
    "Making LLMs behave since 2023.",
  ],
  bio: `I'm a software engineer obsessed with the intersection of language and code — whether that's crafting RAG pipelines that understand context, or writing characters who feel genuinely alive. Currently building AI-powered features at Block Club, where I keep 7,000+ users happy and LLMs well-guarded. I hold an MS in Computer Science from Washington University in St. Louis (3.96 GPA) and believe the best engineers are also storytellers.`,
};

export const skills = {
  "AI / LLM": [
    "OpenAI API",
    "Claude API",
    "LangChain",
    "RAG",
    "Prompt Engineering",
    "Vector Databases",
    "Pinecone",
    "Chroma",
    "Embeddings",
    "AI Safety",
  ],
  Languages: [
    "Python",
    "TypeScript",
    "JavaScript",
    "Java",
    "SQL",
    "C#",
  ],
  Frameworks: [
    "FastAPI",
    "Django",
    "Flask",
    "Spring Boot",
    "React",
    "Next.js",
  ],
  "Cloud / Data": [
    "AWS RDS",
    "CloudWatch",
    "Azure",
    "PostgreSQL",
    "Firebase",
    "Docker",
    "GitHub Actions",
    "Metabase",
  ],
};

export const experience = [
  {
    company: "Block Club",
    role: "Software Engineer (GenAI/LLM)",
    period: "Jan 2024 — Present",
    bullets: [
      "Architected a RAG-based recommendation system using LangChain and OpenAI to match 30+ property residents with 20+ local venues based on preference history and real-time offer data.",
      "Developed a neighborhood perks platform (FastAPI, AWS RDS) supporting 7,000+ users and 50+ partners; maintained 99.5% uptime via Dockerized CI/CD and automated Alembic migrations.",
      "Built Metabase dashboards for user engagement (DAU/WAU) and implemented structured JSON logging with custom AWS CloudWatch alerts for p95 latency monitoring.",
      "Integrated Mailchimp API for LLM-segmented newsletter campaigns and built secure REST APIs for multi-tenant resident onboarding and automated commission reconciliation.",
    ],
  },
  {
    company: "Soca",
    role: "GenAI Backend Software Engineer Intern",
    period: "June 2023 — August 2023",
    bullets: [
      "Optimized an AI-powered cover letter editor (Spring Boot, Vue.js), increasing time-on-page by 8% through improved prompt handling and suggestion refresh logic.",
      "Engineered version-controlled REST APIs for document lifecycle management and reduced server load by implementing debounced auto-save and centralized exception handling.",
      "Strengthened system reliability by implementing targeted unit tests for the LLM regeneration flow, ensuring consistent response schemas under high-traffic typing interactions.",
    ],
  },
];

export const projects = [
  {
    name: "LeetClock",
    description:
      "A LeetCode tracker with smart reminders — because discipline needs a clock. Track your progress and never let a session slip away.",
    tech: ["React", "TypeScript", "LeetCode API"],
    url: "https://leetclock.vercel.app/",
    github: null,
    emoji: "⏱️",
    color: "#00CFAA",
  },
  {
    name: "World Explorer",
    description:
      "A fog-of-war map explorer for the real world. Reveal your corner of the planet one step at a time — like a game, but the terrain is Earth.",
    tech: ["React", "Maps API", "Geolocation", "Firebase"],
    url: "https://world-explorer-ruby.vercel.app/",
    github: null,
    emoji: "🗺️",
    color: "#C9A84C",
  },
  {
    name: "LLM Output Guard",
    description:
      "Starlette middleware that intercepts LLM outputs and redacts PII, secrets, and malicious instructions before they reach the client. Includes streaming support and a mini red-team suite.",
    tech: ["Python", "Starlette", "FastAPI", "AI Safety"],
    url: null,
    github: "https://github.com/Jasonti20/llm-output-guard",
    emoji: "🛡️",
    color: "#FF4B6E",
  },
  {
    name: "AI Language Tutor",
    description:
      "An AI-driven language gym with parameterized character profiles (tone, difficulty, guardrails) and a Contextual Vocabulary system that explains words using your actual message history.",
    tech: ["React", "OpenAI", "Firebase", "LangChain"],
    url: null,
    github: null,
    emoji: "🗣️",
    color: "#9B6FFF",
  },
  {
    name: "AccountBridge",
    description:
      "Gmail scanning and account discovery tool — NestJS backend with a Next.js frontend to seamlessly migrate accounts across services.",
    tech: ["NestJS", "Next.js", "TypeScript", "Gmail API"],
    url: null,
    github: "https://github.com/Jasonti20/AccountBridge-Web",
    emoji: "🔗",
    color: "#00CFAA",
  },
];

export const writing = [
  {
    title: "Coming Soon",
    genre: "Fiction",
    excerpt:
      "Stories take time to tell well. I'm currently working on a collection of short fiction — tales that explore AI, memory, and what it means to be human in an age of machines. Check back soon.",
    status: "In Progress",
  },
];

export const education = [
  {
    school: "Washington University in St. Louis",
    degree: "Master of Science, Computer Science",
    period: "June 2022 – May 2025",
    gpa: "3.96 / 4.0",
    location: "St. Louis, MO",
  },
  {
    school: "Drew University",
    degree: "Bachelor's, Computer Science",
    period: "August 2018 – May 2022",
    gpa: "3.74 / 4.0",
    location: "Madison, NJ",
  },
];

export const agentSystemPrompt = `You are Jason Ti's personal AI assistant on his portfolio website. Jason is a Software Engineer specializing in GenAI/LLM systems, currently working at Block Club in St. Louis, MO.

About Jason:
- Full name: Chang (Jason) Ti
- Location: St. Louis, MO (open to relocation)
- Email: jasoncti20@gmail.com
- Current role: Software Engineer (GenAI/LLM) at Block Club (Jan 2024–Present)
- Education: MS Computer Science from Washington University in St. Louis (GPA 3.96), BS Computer Science from Drew University (GPA 3.74)

Skills:
- AI/LLM: OpenAI API, Claude API, LangChain, RAG, Prompt Engineering, Vector Databases (Pinecone/Chroma), Embeddings
- Languages: Python (FastAPI, Django, Flask), Java (Spring Boot), TypeScript/JavaScript (React, Next.js), SQL, C#
- Cloud/Data: AWS (RDS, CloudWatch), Azure, PostgreSQL, Firebase, Docker, CI/CD (GitHub Actions)

Experience highlights:
- At Block Club: Built RAG-based recommendation system matching residents with local venues, developed backend supporting 7000+ users with 99.5% uptime, built Metabase dashboards, integrated Mailchimp for LLM-segmented campaigns
- At Soca (intern): Optimized AI cover letter editor increasing time-on-page by 8%, built REST APIs for document lifecycle management

Projects:
- LeetClock: LeetCode tracker with reminders (leetclock.vercel.app)
- World Explorer: Fog-of-war style real-world map explorer (world-explorer-ruby.vercel.app)
- LLM Output Guard: Starlette middleware for LLM safety, redacts PII and blocks malicious outputs
- AI Language Tutor: AI-driven language learning app with parameterized character profiles

Personal interests:
- Jason also loves writing stories and novels — he's working on fiction exploring AI, memory, and humanity
- He's passionate about the intersection of language (natural and programming)
- He believes great engineers are also storytellers

Personality in responses:
- Be warm, direct, and a bit witty — like Jason himself
- Keep answers concise but informative
- If asked about things you don't know about Jason, say you're not sure but suggest they reach out directly
- Don't make up experiences or skills not listed above
- You can be playful and show personality

Answer questions about Jason's background, skills, projects, experience, and interests. Help visitors understand if Jason is the right fit for their team or project.`;
