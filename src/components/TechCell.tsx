import { Card } from "./Card";
import "../styles/tech-cell.css";

interface Props {
  tech: TechSkill;
}

const urlMap: Record<TechSkill, string> = {
  React: "https://img.stackshare.io/service/1020/OYIaJ1KK.png",
  Vue: "https://img.stackshare.io/service/3837/paeckCWC.png",
  JavaScript: "https://img.stackshare.io/service/1209/javascript.jpeg",
  TypeScript: "https://img.stackshare.io/service/1612/bynNY5dJ.jpg",
  "Node.js": "https://img.stackshare.io/service/1011/n1JRsFeB_400x400.png",
  MongoDB: "https://img.stackshare.io/service/1030/leaf-360x360.png",
  Sass: "https://img.stackshare.io/service/1171/jCR2zNJV.png",
  "C#": "https://img.stackshare.io/service/1015/1200px-C_Sharp_wordmark.svg.png",
  ".NET": "https://img.stackshare.io/service/1014/IoPy1dce_400x400.png",
  Azure: "https://img.stackshare.io/service/4313/XNKktHjN_400x400.png",
  Elasticsearch:
    "https://img.stackshare.io/service/841/Image_2019-05-20_at_4.58.04_PM.png",
  RabbitMQ:
    "https://img.stackshare.io/service/1061/default_df93e9a30d27519161b39d8c1d5c223c1642d187.jpg",
  PHP: "https://img.stackshare.io/service/991/hwUcGZ41_400x400.jpg",
  PostgreSQL: "https://img.stackshare.io/service/1028/ASOhU5xJ.png",
};

export const TechCell = ({ tech }: Props) => {
  return (
    <div className="cell">
      <div className="cell__img-container">
        <img src={urlMap[tech]} alt={`${tech} icon`} />
      </div>
      <div className="cell__language">{tech}</div>
    </div>
  );
};
