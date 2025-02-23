export const SKILL_CATEGORIES = {
  BACKEND: {
    name: "Backend",
    skills: [
      "Node.js",
      "Express",
      "NestJS",
      "Django",
      "FastAPI",
      "Spring Boot",
      "PHP",
      "Laravel",
      "GraphQL",
      "REST API",
      "Microservicios",
      "WebSockets",
    ],
  },
  FRONTEND: {
    name: "Frontend",
    skills: [
      "React",
      "Next.js",
      "Vue",
      "Angular",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind",
      "Material UI",
      "Redux",
      "Zustand",
      "React Query",
    ],
  },
  DATABASE: {
    name: "Base de Datos",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Prisma",
      "TypeORM",
      "Mongoose",
      "SQL",
      "NoSQL",
      "Data Modeling",
    ],
  },
  CLOUD: {
    name: "Cloud & DevOps",
    skills: [
      "AWS",
      "Azure",
      "GCP",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Jenkins",
      "GitHub Actions",
      "Terraform",
      "Serverless",
      "Linux",
    ],
  },
  TESTING: {
    name: "Testing & QA",
    skills: [
      "Jest",
      "React Testing Library",
      "Cypress",
      "Selenium",
      "Unit Testing",
      "Integration Testing",
      "E2E Testing",
      "TDD",
    ],
  },
  ARCHITECTURE: {
    name: "Arquitectura & Diseño",
    skills: [
      "Clean Architecture",
      "DDD",
      "SOLID",
      "Design Patterns",
      "System Design",
      "Microservices",
      "Event-Driven",
      "API Design",
    ],
  },
  SOFT_SKILLS: {
    name: "Soft Skills",
    skills: [
      "Liderazgo",
      "Trabajo en Equipo",
      "Comunicación",
      "Resolución de Problemas",
      "Gestión del Tiempo",
      "Adaptabilidad",
      "Mentoría",
    ],
  },
  PROJECT_MANAGEMENT: {
    name: "Gestión de Proyectos",
    skills: [
      "Scrum",
      "Kanban",
      "Agile",
      "Jira",
      "Confluence",
      "Project Planning",
      "Risk Management",
    ],
  },
  SECURITY: {
    name: "Seguridad",
    skills: [
      "OAuth",
      "JWT",
      "HTTPS",
      "Encryption",
      "Authentication",
      "Authorization",
      "Security Best Practices",
      "Penetration Testing",
    ],
  },
  AI_ML: {
    name: "IA & Machine Learning",
    skills: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Natural Language Processing",
      "Computer Vision",
      "Data Science",
      "Machine Learning",
    ],
  },
  VERSION_CONTROL: {
    name: "Control de Versiones",
    skills: [
      "Git",
      "GitHub",
      "GitLab",
      "Bitbucket",
      "Branch Management",
      "Code Review",
      "Version Control",
    ],
  },
} as const;

export type SkillCategory = keyof typeof SKILL_CATEGORIES;
