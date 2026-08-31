export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  year: string;
  location?: string;
  type: string;
  description: string[];
  skills: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  status: string;
  highlights: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  category: string;
  badgeCode: string;
}

export const experiencesData: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Student Trainee",
    organization: "Leapstart School of Technology",
    period: "2025 — Present",
    year: "2025",
    type: "TECHNICAL RESIDENCY",
    description: [
      "Project-based intensive experience in full-stack web development, database architecture, APIs, and algorithmic problem solving.",
      "Engineered real-world applications leveraging React, JavaScript, Node.js, PostgreSQL, and Postman.",
      "Delivered rigorous technical demos, system walkthroughs, and peer architecture reviews.",
    ],
    skills: ["React", "JavaScript", "PostgreSQL", "Postman", "API Engineering", "System Demos"],
  },
  {
    id: "exp-2",
    role: "Community Lead",
    organization: "SkillSynth",
    period: "06/2026 — 08/2026",
    year: "2026",
    location: "Hyderabad, India",
    type: "LEADERSHIP & OUTREACH",
    description: [
      "Drove technical outreach, member engagement, and peer-to-peer developer learning circles.",
      "Facilitated collaborative coding initiatives, hackathon prep groups, and interactive technical workshops.",
      "Championed active feedback loops between student engineers and ecosystem mentors.",
    ],
    skills: ["Technical Outreach", "Community Engagement", "Public Speaking", "Collaboration", "Mentorship"],
  },
  {
    id: "exp-3",
    role: "AI Intern",
    organization: "FlyRank AI",
    period: "07/2026",
    year: "2026",
    type: "AI RESEARCH & IMPLEMENTATION",
    description: [
      "Explored practical generative AI workflows, agentic prompt patterns, and model evaluation techniques.",
      "Integrated prompt-based automation pipelines to accelerate developer workflows and content structuring.",
      "Analyzed foundational LLM mechanics, embeddings, and context window optimizations.",
    ],
    skills: ["Generative AI", "Prompt Engineering", "LLM Workflows", "AI Fluency", "Applied NLP"],
  },
  {
    id: "exp-4",
    role: "Member",
    organization: "0xShunya",
    period: "02/2026 — 08/2026",
    year: "2026",
    type: "SECURITY RESEARCH",
    description: [
      "Engaged in hands-on cybersecurity research, vulnerability assessments, and collaborative technical problem-solving.",
      "Practiced threat modeling, Linux system hardening, and network packet analysis in team environments.",
      "Participated in peer learning and security capture-the-flag exercises.",
    ],
    skills: ["Cybersecurity", "Linux Hardening", "Network Security", "Threat Modeling", "Shell Scripting"],
  },
];

export const educationData: EducationItem[] = [
  {
    degree: "B.S. Applied AI and Data Science",
    institution: "Indian Institute of Technology Jodhpur",
    period: "Class of 2029",
    status: "UNDERGRADUATE",
    highlights: [
      "Rigorous foundations in Machine Learning, Mathematics, Data Engineering, and Computational Theory.",
      "Focus on scalable intelligence, relational systems, and applied AI software engineering.",
    ],
  },
  {
    degree: "Professional Technology Training Program",
    institution: "Leapstart School of Technology",
    period: "2025 — Present",
    status: "ACTIVE",
    highlights: [
      "Immersive project-driven training across full-stack systems, modern databases, and enterprise tooling.",
    ],
  },
];

export const certificationsData: CertificationItem[] = [
  {
    title: "One Million Prompters",
    issuer: "Dubai Government",
    category: "AI & Prompt Engineering",
    badgeCode: "DXB-OMP-2026",
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte Australia",
    category: "Analytics & Strategy",
    badgeCode: "DLT-AU-DATA",
  },
  {
    title: "AI Fluency: Framework and Foundations",
    issuer: "Anthropic",
    category: "LLM Systems",
    badgeCode: "ANTH-AIF-2026",
  },
  {
    title: "Student SOC Program Foundations",
    issuer: "Microsoft",
    category: "Cybersecurity / Security Operations",
    badgeCode: "MSFT-SOC-FOUND",
  },
];
