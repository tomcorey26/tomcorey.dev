import { Card } from "./Card";
import { TechCell } from "./TechCell";

import "../styles/job-experience.css";

type Props = JobExperience;

const getMonthName = (month: number) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month];
};

const formatDate = (date: Date) =>
  `${getMonthName(date.getMonth())} ${date.getFullYear()}`;

export default function JobExperience(job: Props) {
  return (
    <Card>
      <div className="job">
        <h2 className="job__title">{job.title}</h2>
        <div className="job__company">
          <a href={job.companyUrl} target="_blank" rel="noopener noreferrer">
            <h3>{job.company}</h3>
          </a>
        </div>
        <i>
          {formatDate(job.startDate)} -{" "}
          {job.endDate ? formatDate(job.endDate) : "Present"} (
          {(() => {
            const days = Math.round(
              ((job.endDate || new Date()).getTime() -
                job.startDate.getTime()) /
                (1000 * 60 * 60 * 24)
            );
            const years = Math.floor(days / 365.25);
            const months = Math.round(days / 30.44);

            if (years >= 1) {
              return `${years} ${years === 1 ? "year" : "years"}`;
            } else {
              return `${months} ${months === 1 ? "month" : "months"}`;
            }
          })()}
          )
        </i>
        <ul className="job__points">
          {job.points.map((point, index) => (
            <li
              key={point}
              style={{ "--point-index": index } as React.CSSProperties}
            >
              <p>{point}</p>
            </li>
          ))}
        </ul>
        <ul className="job__skills">
          {job.skills.map((skill, i) => (
            <li
              key={skill + job.company}
              style={{ "--tech-index": i } as React.CSSProperties}
            >
              <TechCell tech={skill} />
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
