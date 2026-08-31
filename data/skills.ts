export interface SkillNode {
  id: string;
  name: string;
  category: "PROGRAMMING" | "DATABASES" | "FRAMEWORKS" | "TOOLS" | "AI" | "DOMAINS";
  level: string;
  color: string;
  connections: string[];
}

export const skillCategories = [
  "ALL",
  "PROGRAMMING",
  "DATABASES",
  "FRAMEWORKS",
  "TOOLS",
  "AI",
  "DOMAINS",
] as const;

export const skillsGraph: SkillNode[] = [
  // Programming
  { id: "html", name: "HTML", category: "PROGRAMMING", level: "Core", color: "#E34F26", connections: ["css", "javascript"] },
  { id: "css", name: "CSS", category: "PROGRAMMING", level: "Core", color: "#1572B6", connections: ["tailwind", "html"] },
  { id: "javascript", name: "JavaScript", category: "PROGRAMMING", level: "Advanced", color: "#F7DF1E", connections: ["react", "webdev", "html"] },
  { id: "python", name: "Python", category: "PROGRAMMING", level: "Proficient", color: "#3776AB", connections: ["ai_ml", "genai", "cybersec"] },
  { id: "sql", name: "SQL", category: "PROGRAMMING", level: "Advanced", color: "#00758F", connections: ["postgres", "dbms", "schema"] },

  // Databases & Concepts
  { id: "postgres", name: "PostgreSQL", category: "DATABASES", level: "Production", color: "#336791", connections: ["sql", "dbms", "schema"] },
  { id: "dbms", name: "DBMS", category: "DATABASES", level: "Theoretical & Applied", color: "#00E5FF", connections: ["postgres", "schema", "apis"] },
  { id: "schema", name: "Schema Design", category: "DATABASES", level: "Architecture", color: "#FF4D00", connections: ["dbms", "sql", "postgres"] },
  { id: "apis", name: "REST APIs", category: "DATABASES", level: "Integration", color: "#22C55E", connections: ["postman", "react", "dbms"] },
  { id: "datavis", name: "Data Visualization", category: "DATABASES", level: "Visual", color: "#FF007F", connections: ["javascript", "apis"] },

  // Frameworks
  { id: "react", name: "React.js", category: "FRAMEWORKS", level: "Primary", color: "#61DAFB", connections: ["javascript", "webdev", "tailwind"] },
  { id: "tailwind", name: "Tailwind CSS", category: "FRAMEWORKS", level: "Primary", color: "#06B6D4", connections: ["css", "react"] },

  // Tools
  { id: "git", name: "Git", category: "TOOLS", level: "Workflow", color: "#F05032", connections: ["github", "opensource"] },
  { id: "github", name: "GitHub", category: "TOOLS", level: "Collab", color: "#EDEDE8", connections: ["git", "opensource"] },
  { id: "linux", name: "Linux", category: "TOOLS", level: "Environment", color: "#FCC624", connections: ["shell", "cybersec", "virtualbox"] },
  { id: "vscode", name: "VS Code", category: "TOOLS", level: "Editor", color: "#007ACC", connections: ["javascript", "python"] },
  { id: "postman", name: "Postman", category: "TOOLS", level: "Testing", color: "#FF6C37", connections: ["apis"] },
  { id: "virtualbox", name: "VirtualBox", category: "TOOLS", level: "Virtualization", color: "#183A61", connections: ["linux", "cybersec"] },
  { id: "shell", name: "Shell Scripting", category: "TOOLS", level: "Automation", color: "#4EAA25", connections: ["linux", "cybersec"] },
  { id: "codex", name: "Codex", category: "TOOLS", level: "Applied", color: "#A855F7", connections: ["genai", "claude"] },
  { id: "claude", name: "Claude", category: "TOOLS", level: "Applied", color: "#D97706", connections: ["genai", "prompt_eng"] },

  // AI
  { id: "genai", name: "Generative AI", category: "AI", level: "Core Focus", color: "#FF4D00", connections: ["prompt_eng", "agentic", "ai_fluency"] },
  { id: "ai_fluency", name: "AI Fluency", category: "AI", level: "Conceptual", color: "#00E5FF", connections: ["genai", "prompt_eng"] },
  { id: "prompt_eng", name: "Prompt Engineering", category: "AI", level: "Specialist", color: "#EC4899", connections: ["genai", "agentic", "claude"] },
  { id: "agentic", name: "Agentic Coding", category: "AI", level: "Specialist", color: "#8B5CF6", connections: ["genai", "prompt_eng", "startups"] },

  // Domains
  { id: "cybersec", name: "Cybersecurity", category: "DOMAINS", level: "Security", color: "#EF4444", connections: ["linux", "shell"] },
  { id: "webdev", name: "Web Development", category: "DOMAINS", level: "Full Stack", color: "#3B82F6", connections: ["react", "javascript", "html"] },
  { id: "opensource", name: "Open Source", category: "DOMAINS", level: "Contribution", color: "#10B981", connections: ["git", "github"] },
  { id: "ai_ml", name: "AI / ML", category: "DOMAINS", level: "Academic & Applied", color: "#F59E0B", connections: ["python", "genai"] },
  { id: "devops", name: "DevOps", category: "DOMAINS", level: "Fundamentals", color: "#6366F1", connections: ["linux", "git"] },
  { id: "startups", name: "Startups", category: "DOMAINS", level: "Entrepreneurship", color: "#FF4D00", connections: ["agentic", "webdev"] },
];
