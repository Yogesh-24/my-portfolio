/**
 * Site content — kept out of components per the "no hardcoded content" rule
 * (obsidian/frontend/component-conventions.md → Data rules). Sourced from
 * the resume; edit here rather than in the view/section files.
 */

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks = {
  github: "https://github.com/Yogesh-24",
  linkedin: "https://linkedin.com/in/imyogeshn",
  email: "yogeshn2427@gmail.com",
  phone: "+916383659865",
};

export const heroContent = {
  greeting: "Hello, I'm",
  name: "Yogesh",
  roles: [
    "Sterling OMS Developer",
    "Full Stack Web Developer",
    "Java Backend Engineer",
  ],
  summary:
    "Sterling OMS Developer with hands-on experience designing, developing, and deploying customizations on IBM Sterling Order Management, delivering tailored, client-specific solutions for enterprise retail.",
};

export const aboutContent = {
  photo: "/assets/about/portrait.jpg",
  bio: [
    "I'm a Sterling OMS Developer at Acuver Consulting, working on IBM Sterling Order Management customizations for Titan Company Limited — one of India's largest retail brands.",
    "My day-to-day work involves backend development, front-end customization, data transformation, and integration workflows connecting enterprise systems, marketplaces, and payment platforms.",
    "I hold a B.Tech in Information Technology, and I'm building toward a long-term career in enterprise software — including freelance consulting and content creation on the side.",
  ],
  education: {
  degree: "B.Tech in Information Technology",
  school: "PSNA College of Engineering and Technology - India",
  detail:
    "Built a strong foundation in software engineering through programming, object-oriented design, data structures, database management, web technologies, and application development. Gained experience translating concepts into practical software solutions, working with structured data, designing application logic, and developing a systematic approach to debugging and problem-solving.",
    },
  experience: [
  {
    role: "Associate Consultant",
    company: "Acuver Consulting",
    client: "Titan Company Limited",
    period: "Jun 2025 – Present",
    points: [
      "Delivered IBM Sterling OMS customizations across back-end Java services and Angular UI components to support retail business requirements.",
      "Extended the Sterling Next Generation Call Center UI with post-order operation capabilities.",
    ],
  },
  {
    role: "Associate Trainee",
    company: "Acuver Consulting",
    period: "Oct 2024 – Jun 2025",
    points: [
      "Gained hands-on experience with IBM Sterling OMS customization, service configuration, and order lifecycle management.",
      "Developed foundational expertise in Java back-end logic, XML-based data transformation, and Angular BUC UI customization.",
    ],
  },
  ],
};

export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "IBM Sterling",
    items: [
      "OMS 9.5 and 10 (OnPrem & OMoC)",
      "IBM SST",
      "NextGenCC UI",
      "Sterling BUC",
      "Service Definition Framework",
      "DB Query Client",
    ],
  },
  {
    category: "Languages",
    items: [
      "Core Java (JSE)",
      "Advanced Java (JEE)",
      "TypeScript",
      "JavaScript",
      "XML",
      "XSLT",
      "JSON",
      "HTML/CSS",
    ],
  },
  {
    category: "Frameworks",
    items: ["Spring Framework", "Angular","Next.js", "Hibernate"],
  },
  {
  category: "Integration & APIs",
  items: [
    "REST APIs",
    "Synchronous & Asynchronous API Integration",
    "Data Transformation",
  ],
  },
  {
    category: "Tools & Technologies",
    items: [
      "Eclipse",
      "Spring Tool Suite",
      "IntelliJ IDEA",
      "VS Code",
      "Docker",
      "Maven",
      "Postman",
      "SQL Developer",
      "DBeaver",
      "DbVisualizer",
      "Tomcat",
    ],
  },
  {
    category: "Databases",
    items: ["Oracle", "MySQL", "DB2"],
  },
  {
    category: "Version Control & Collaboration",
    items: ["Git", "GitHub", "GitLab"],
  },
];
