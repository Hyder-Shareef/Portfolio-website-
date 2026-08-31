export interface PortfolioData {
  name: string;
  year: string;
  role: string;
  educationSummary: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  status: string;
  editorialStatement: string;
  subStatement: string;
  interests: string[];
  identityWords: string[];
  principles: {
    num: string;
    title: string;
    description: string;
  }[];
}

export const portfolioData: PortfolioData = {
  name: "MOHAMMED HYDER SHAREEF",
  year: "2026",
  role: "Applied AI & Data Science",
  educationSummary: "B.S. Applied AI & Data Science at Indian Institute of Technology Jodhpur (2029) · Leapstart School of Technology",
  location: "Hyderabad, Telangana, India",
  email: "shareefhyder321@gmail.com",
  github: "https://github.com/Abuubaida-Assad/Archon",
  linkedin: "https://www.linkedin.com/in/mohammed-hyder-shareef-61116a361/",
  status: "AVAILABLE TO BUILD",
  editorialStatement: "I'M INTERESTED IN THE SPACE BETWEEN TECHNOLOGY, SYSTEMS AND PEOPLE.",
  subStatement: "Applied AI and Data Science student engineering intelligent systems, robust database architectures, secure networks, and high-impact digital experiences.",
  interests: [
    "Cybersecurity",
    "Web Development",
    "Databases",
    "Entrepreneurship",
    "Public Speaking",
    "Stand-up Comedy",
  ],
  identityWords: [
    "AI",
    "SECURITY",
    "WEB",
    "DATABASES",
    "STARTUPS",
    "COMMUNITY",
    "PUBLIC SPEAKING",
    "EXPERIMENTATION",
    "SYSTEMS",
  ],
  principles: [
    {
      num: "01",
      title: "SYSTEMIC THINKING",
      description: "Code is only as valuable as the architecture supporting it and the problem it resolves.",
    },
    {
      num: "02",
      title: "DEPTH OVER NOISE",
      description: "Prioritizing strong computational foundations, relational schemas, and verifiable mechanics over buzzwords.",
    },
    {
      num: "03",
      title: "COMMUNICATION AS A SUPERPOWER",
      description: "Technical ideas are only useful if you can communicate, demo, and articulate them to engineers and humans alike.",
    },
  ],
};
