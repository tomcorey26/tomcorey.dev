interface JobExperience {
  title: string;
  company: string;
  companyUrl: string;
  emoji: string;
  logo?: string;
  startDate: Date;
  endDate?: Date;
  points: string[];
  skills: TechSkill[];
}

type TechSkill =
  | "React"
  | "Vue"
  | "JavaScript"
  | "TypeScript"
  | "Node.js"
  | "MongoDB"
  | "Sass"
  | "C#"
  | ".NET"
  | "Azure"
  | "Elasticsearch"
  | "RabbitMQ"
  | "PHP"
  | "PostgreSQL";
