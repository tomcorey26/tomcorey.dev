import "../styles/tech-cell.css";

interface Props {
  tech: TechSkill;
}

const colorMap: Record<TechSkill, string> = {
  React: "#61dafb",
  Vue: "#42b883",
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  "Node.js": "#5fa04e",
  MongoDB: "#47a248",
  Sass: "#cc6699",
  "C#": "#9b4f96",
  ".NET": "#512bd4",
  Azure: "#0078d4",
  Elasticsearch: "#fed10a",
  RabbitMQ: "#ff6600",
  PHP: "#777bb4",
  PostgreSQL: "#4169e1",
};

export const TechCell = ({ tech }: Props) => {
  const color = colorMap[tech] ?? "var(--accent)";
  return (
    <div
      className="chip"
      style={{ "--chip-color": color } as React.CSSProperties}
    >
      <span className="chip__dot" />
      <span className="chip__label">{tech}</span>
    </div>
  );
};
