import { Card } from "./Card";
import { TechCell } from "./TechCell";

import "../styles/job-experience.css";

type Props = JobExperience;

const getMonthName = (month: number) => {
  const monthNames = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
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
        <span className="job__date">
          [{formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : "PRESENT"}]
        </span>
        <ul className="job__points">
          {job.points.map((point) => (
            <li key={point}>
              <p>{point}</p>
            </li>
          ))}
        </ul>
        <ul className="job__skills">
          {job.skills.map((skill) => (
            <li key={skill + job.company}>
              <TechCell tech={skill} />
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
