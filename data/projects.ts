export interface ProjectItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: string;
  year: string;
  status: string;
  tech: string[];
  github?: string;
  liveUrl?: string;
  metrics?: { label: string; value: string }[];
  problem: string;
  approach: string;
  features: string[];
  architecture: string[];
  learnings: string[];
  visualSceneType: "documents" | "globe" | "security" | "agent" | "library" | "database";
}

export const projectsData: ProjectItem[] = [
  {
    id: "01",
    slug: "kyntra",
    number: "01",
    title: "KYNTRA",
    subtitle: "Auditable F1 Energy & Overtake Intelligence",
    description: "Auditable Formula 1 decision-support prototype analyzing high-frequency telemetry, circuit geometry, powertrain energy dynamics, opponent behaviors, and regulatory compliance to evaluate overtake opportunities.",
    longDescription: "KYNTRA is an advisory decision-support research prototype engineered for Formula 1 race strategy. It processes multi-channel telemetry, runs kinematic powertrain energy simulations, models opponent defense profiles, and validates tactical decisions against strict FIA safety and freshness verification gates.",
    category: "Telemetry / F1 AI Simulation",
    year: "2026",
    status: "RESEARCH PROTOTYPE",
    tech: ["Python 3.11+", "FastAPI", "TypeScript", "Simulation Models", "Telemetry Analytics", "Decision Pipelines"],
    github: "https://github.com/Hyder-Shareef/Kyntra_f1-",
    problem: "Formula 1 race engineers and strategists must evaluate high-velocity overtake decisions under strict battery energy limits, opponent defense profiles, and complex FIA regulatory boundaries in split seconds.",
    approach: "Engineered an auditable multi-stage decision pipeline combining circuit geometry modeling, powertrain state-of-charge simulation, opponent counterfactual trajectories, and deterministic safety/compliance verification gates.",
    features: [
      "High-Frequency Telemetry Ingestion & Real-Time Race State Synchronization",
      "Kinematic Circuit Geometry & Powertrain Energy/ERS State-of-Charge Simulation",
      "Opponent Behavior Evidence Modeling & Counterfactual Trajectory Comparison",
      "Lexicographic Strategic Ranking evaluating overtake feasibility score",
      "Fail-Safe Regulation & Freshness Gates (defaults to ABSTAIN on ambiguous or stale inputs)",
    ],
    architecture: [
      "Telemetry Ingestion: Real-time telemetry parser with time-series normalization and data validation",
      "Simulation Core: Kinematic energy dynamics and circuit coordinate raycaster in Python 3.11",
      "Decision Engine: Lexicographic multi-objective ranking and FIA regulatory compliance verification gate",
      "Advisory Interface: Interactive telemetry dashboard with auditable recommendation traces",
    ],
    learnings: [
      "Designing conservative fail-safe heuristics where ambiguous or stale telemetry always resolves to ABSTAIN",
      "Modeling non-linear battery degradation and energy recovery under dynamic track surface friction",
      "Building auditable decision trails so race strategists understand the exact mathematical rationale behind every passing recommendation",
    ],
    visualSceneType: "agent",
  },
  {
    id: "02",
    slug: "heault",
    number: "02",
    title: "HEAULT",
    subtitle: "Personal Health Records Platform",
    description: "A health-tech platform for securely storing, organizing and retrieving medical records, with OCR document processing, AI-generated summaries, medication reminders and emergency QR access.",
    longDescription: "HEAULT revolutionizes personal medical archiving by transforming paper prescriptions, lab reports, and imaging scans into structured, searchable digital health timelines. Integrated with automated OCR ingestion and privacy-first AI summarization.",
    category: "HealthTech / Applied AI",
    year: "2026",
    status: "07/2026 — PRESENT",
    tech: ["React Native", "Expo", "Node.js", "MongoDB", "Azure Document Intelligence", "AI / LLMs"],
    github: "https://github.com/Abuubaida-Assad/Archon",
    problem: "Patients and caregivers struggle with fragmented physical paper prescriptions, lost test records, and medical jargon during emergency room visits.",
    approach: "Built a zero-friction mobile and web architecture utilizing cloud OCR pipelines to extract clinical parameters, medication dosages, and vital diagnoses into categorized chronological health timelines.",
    features: [
      "OCR Document Ingestion for prescriptions, discharge summaries, and lab panels",
      "AI Clinical Synthesizer generating concise patient-friendly summaries and warnings",
      "Emergency QR Access protocol with rapid cryptographic access for first responders",
      "Automated Medication Schedule & Dosage reminders",
      "Encrypted Vault with granular role-based family sharing",
    ],
    architecture: [
      "Client: React Native with Expo SDK 51 & offline-first SQLite cache",
      "API Layer: Node.js Express microservices with JWT & biometric authentication",
      "Intelligence Pipeline: Azure Document Intelligence + LLM semantic entity parser",
      "Database: MongoDB Atlas with client-side field-level encryption",
    ],
    learnings: [
      "Handling noisy OCR extractions from handwritten clinical scripts",
      "Balancing rapid emergency data accessibility with strict HIPAA-aligned data privacy",
      "Optimizing mobile document scanning performance under low-light conditions",
    ],
    visualSceneType: "documents",
  },
  {
    id: "03",
    slug: "omnis",
    number: "03",
    title: "OMNIS",
    subtitle: "Global Telemetry & Atmosphere Monitor",
    description: "Interactive globe-based monitor for AQI, live news and air traffic visualization.",
    longDescription: "OMNIS aggregates streaming geospatial data onto an interactive 3D planetary canvas, enabling real-time spatial correlation between air quality indices (AQI), global flight trajectories, and breaking geographic news alerts.",
    category: "Data Visualization / Geospatial",
    year: "2026",
    status: "COMPLETED",
    tech: ["JavaScript", "Three.js", "Web APIs", "GeoJSON", "Data Visualization", "Node.js"],
    github: "https://github.com/Abuubaida-Assad/Archon",
    problem: "Monitoring disjointed planetary sensors, global atmospheric quality, and air traffic requires switching between numerous disparate dashboards.",
    approach: "Designed a single-canvas WebGL orbital sphere mapping multi-layered spatial data: atmospheric particulate heatmaps, flight vector Bezier arcs, and geo-tagged event pulses.",
    features: [
      "3D Interactive Earth Sphere with smooth mouse raycasting and orbital zoom",
      "Live Flight Paths visualized as dynamic 3D altitude arcs with speed indicators",
      "Air Quality Index (AQI) particle heatmaps from worldwide sensor networks",
      "Geolocated Breaking News feeds mapped directly to regional coordinates",
      "Time-scrubbing telemetry playback for atmospheric dispersion analysis",
    ],
    architecture: [
      "Rendering Engine: Three.js with custom GLSL atmosphere and glow shaders",
      "Data Ingestion: Streaming WebSockets aggregating flight vectors & OpenAQ APIs",
      "Client State: Web Workers processing and normalizing spatial coordinates off main thread",
    ],
    learnings: [
      "Optimizing thousands of simultaneous particle vertices and Bezier splines at 60 FPS",
      "Managing WebSocket backpressure during peak sensor update bursts",
    ],
    visualSceneType: "globe",
  },
  {
    id: "04",
    slug: "projectiris",
    number: "04",
    title: "PROJECTIRIS",
    subtitle: "AI-Based Threat Detection & Security Topology",
    description: "AI-based threat detection system with real-time monitoring and dashboard workflows.",
    longDescription: "PROJECTIRIS provides automated network telemetry inspection, utilizing machine learning classification models to isolate anomalous packet flows, DDoS signatures, and privilege escalation attempts before intrusion vectors propagate.",
    category: "Cybersecurity / AI Systems",
    year: "2026",
    status: "ACTIVE",
    tech: ["React", "Node.js", "MongoDB", "Python", "Socket.io", "Threat Intelligence"],
    github: "https://github.com/Abuubaida-Assad/Archon",
    problem: "Modern enterprise perimeter attacks execute faster than manual SOC operator triage times, overwhelming analysts with false-positive alerts.",
    approach: "Engineered an intelligent threat scoring engine paired with an interactive network node topology map that visually highlights compromised subnets and isolates infected hosts.",
    features: [
      "Real-time Network Topology visualizer with animated packet pulse flows",
      "AI Anomaly Classifier ranking threat severity with confidence score rationale",
      "Automated Incident Quarantine triggers for rapid firewall rule deployment",
      "Live SOC Dashboard with packet inspection metrics and alert queues",
      "Forensic Timeline Generator for post-incident root cause analysis",
    ],
    architecture: [
      "Frontend: React 18 with SVG/Canvas interactive network topology graphs",
      "Backend: Node.js event bus with Python ML inference pipeline (Isolation Forests / XGBoost)",
      "Database: MongoDB timeseries collections for raw PCAP metadata storage",
    ],
    learnings: [
      "Designing low-latency event visualizers without UI stutter under high packet rates",
      "Minimizing false positives through contextual baseline training on normal traffic",
    ],
    visualSceneType: "security",
  },
  {
    id: "05",
    slug: "archon",
    number: "05",
    title: "ARCHON",
    subtitle: "Autonomous Multi-Agent AI Framework",
    description: "Multi-agent coordination architecture designed for autonomous task decomposition, tool synthesis, and resilient consensus execution across distributed LLM nodes.",
    longDescription: "ARCHON orchestrates collaborative multi-agent swarms. Each agent node possesses dedicated domain competencies (reasoning, code synthesis, verification, search) that negotiate, delegate sub-tasks, and execute complex workflows with continuous feedback verification.",
    category: "Autonomous AI / Distributed Systems",
    year: "2026",
    status: "OPEN SOURCE",
    tech: ["TypeScript", "Python", "LangChain / LangGraph", "Node.js", "Vector DB", "OpenAI / Claude API"],
    github: "https://github.com/Abuubaida-Assad/Archon",
    problem: "Single-prompt LLM execution fails on complex multi-step technical challenges due to hallucination loops, lack of isolated validation, and context window saturation.",
    approach: "Constructed an event-driven agent consensus topology where specialized agents validate intermediate steps through sandbox execution before committing final state changes.",
    features: [
      "Hierarchical Swarm Architecture with Planner, Executor, and Critic agent roles",
      "Dynamic Tool Provisioning enabling agents to compile and invoke runtime sandboxed tools",
      "Memory Consensus Graph with semantic vector retrieval across agent sessions",
      "Automated Self-Correction loops that re-evaluate failed executions autonomously",
      "Interactive Multi-Agent Visualizer displaying real-time agent message passing",
    ],
    architecture: [
      "Core Orchestrator: Node.js & TypeScript state machine with async message queues",
      "Agent Runtime: Python sandboxed workers with vector memory indexing",
      "Interface: High-contrast telemetry dashboard tracking tokens, steps, and decisions",
    ],
    learnings: [
      "Mitigating infinite delegation loops between autonomous agent personas",
      "Designing structured JSON-schema communication protocols across heterogenous LLMs",
    ],
    visualSceneType: "agent",
  },
  {
    id: "06",
    slug: "library",
    number: "06",
    title: "LIBRARY SYSTEM",
    subtitle: "Full-Stack Resource Catalog & Circulations",
    description: "Full-stack platform for cataloging books, managing users and tracking issue-return workflows.",
    longDescription: "A robust resource circulation management platform built with strict ACID compliance, dynamic inventory queries, fine computation routines, and student borrowing lifecycle tracking.",
    category: "Full Stack / Enterprise Systems",
    year: "2025",
    status: "COMPLETED",
    tech: ["React", "PostgreSQL", "Node.js", "Express", "REST APIs", "Tailwind CSS"],
    github: "https://github.com/Abuubaida-Assad/Archon",
    problem: "Manual and legacy library systems suffer from data inconsistencies, uncollected overdue penalties, and sluggish multi-criteria book search capabilities.",
    approach: "Designed a normalized PostgreSQL relational database backend with trigger-based penalty computation and an intuitive React search & reservation interface.",
    features: [
      "Multi-Parameter ISBN & Title Cataloging with instant full-text filtering",
      "Automated Circulations Desk: Instant checkouts, reservations, and renewals",
      "Penalty & Overdue Calculation engine with automated notification dispatch",
      "Role-Based Access Control (RBAC) separating Librarian and Member permissions",
      "Inventory Analytics: Most borrowed titles, shelf capacity, and return turnaround times",
    ],
    architecture: [
      "Frontend: React with responsive data grids and optimistic UI updates",
      "Backend: Node.js REST API with connection pooling",
      "Database: PostgreSQL with composite indexing and transaction isolation",
    ],
    learnings: [
      "Handling concurrent reservation race conditions with PostgreSQL row-level locks",
      "Implementing performant pagination over dense catalog inventories",
    ],
    visualSceneType: "library",
  },
  {
    id: "07",
    slug: "database-systems",
    number: "07",
    title: "DATABASE SYSTEMS",
    subtitle: "Relational Schemas & Financial Engines",
    description: "Banking, employee management and admission systems built using relational schema design and backend calculations.",
    longDescription: "A suite of relational database architectures engineered for mission-critical operations: double-entry ledger banking engines, hierarchical employee org charts, and university admission workflows.",
    category: "DBMS / Relational Architecture",
    year: "2025",
    status: "COMPLETED",
    tech: ["PostgreSQL", "SQL", "DBMS", "Schema Design", "Transactions", "Stored Procedures"],
    github: "https://github.com/Abuubaida-Assad/Archon",
    problem: "Poor relational architecture leads to data anomalies, orphaned records, calculation errors in financial ledgers, and slow analytical reporting.",
    approach: "Engineered 3NF/BCNF normalized schemas, database triggers, foreign-key constraint enforcement, and ACID transaction boundaries ensuring 100% data integrity.",
    features: [
      "Double-Entry Banking Ledger with balance integrity constraints and atomic transfers",
      "Hierarchical Employee & Payroll Engine calculating tax, deductions, and reporting tiers",
      "University Admissions Pipeline with criteria verification and merit rank allocation",
      "Complex SQL Analytical Queries using Window functions, CTEs, and Index tuning",
      "Automated Audit Logging storing immutable operational history tables",
    ],
    architecture: [
      "Database: PostgreSQL 16 with custom PL/pgSQL stored functions and procedures",
      "Design Tooling: Entity Relationship Diagrams (ERDs) and normalization matrices",
      "Verification: Automated SQL test suites validating edge-case transaction rollbacks",
    ],
    learnings: [
      "Designing zero-deadlock transaction sequences in concurrent banking simulations",
      "Balancing normalization for write integrity against denormalization for query velocity",
    ],
    visualSceneType: "database",
  },
];
