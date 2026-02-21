import "../styles/tech-cell.css";

interface Props {
  tech: string;
}

export const TechCell = ({ tech }: Props) => {
  return <span className="cell">{tech}</span>;
};
