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
    "My day-to-day spans back-end Java logic, Angular front-end components within the Sterling BUC framework, XSLT transformations, and integrations across Flipkart marketplace orders, SAP, and payment gateways.",
    "I hold a B.Tech in Information Technology from PSNA College of Engineering and Technology, and I'm building toward a long-term career in enterprise software — including freelance consulting and content creation on the side.",
  ],
  education: {
    degree: "B.Tech in Information Technology",
    school: "PSNA College of Engineering and Technology",
    period: "2020 – 2024",
    detail: "81%, Dindigul, India",
  },
  experience: [
    {
      role: "Associate Consultant",
      company: "Acuver Consulting — Titan Company Limited",
      period: "Jun 2025 – Present",
      points: [
        "Delivered Sterling OMS customizations spanning back-end Java logic and Angular UI, aligned to retail business requirements.",
        "Built a Refund Status API giving real-time visibility into customer refund progress.",
        "Extended the Sterling Next Generation Call Center UI with post-order operation capabilities.",
      ],
    }
    // ,
    // {
    //   role: "Intern — Sterling OMS",
    //   company: "Acuver Consulting — Titan Company Limited",
    //   period: "Oct 2024 – Jun 2025",
    //   points: [
    //     "Onboarded onto IBM Sterling OMS and gained hands-on experience in customization, service definitions, and order lifecycle management.",
    //     "Built foundational proficiency in Java OMS back-end logic, XML/XSLT transformations, and Angular BUC UI components.",
    //   ],
    // },
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
      "OMS 9.5 (OnPrem & OMoC)",
      "NextGenCC UI",
      "Sterling Store",
      "IBM SST",
      "DB Query Client",
    ],
  },
  {
    category: "Languages",
    items: [
      "Core Java (JSE)",
      "Advanced Java (JEE)",
      "JDBC",
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
    items: ["Spring Framework", "Angular", "Hibernate"],
  },
  {
    category: "Databases",
    items: ["Oracle", "MySQL", "DB2"],
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
      "Tomcat",
    ],
  },
  {
    category: "Version Control",
    items: ["Git", "GitHub", "GitLab"],
  },
];
