import React from "react";
import { Link } from "react-router-dom";
import {
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiCalendar,
  FiArrowUpRight,
  FiBookmark,
} from "react-icons/fi";

const Card = ({ data }) => {
  const {
    id,
    companyName,
    jobTitle,
    companyLogo,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    employmentType,
    postingDate,
    experienceLevel,
    description,
  } = data;

  const isInternship =
    experienceLevel?.toLowerCase().includes("intern");

  return (
    <article className="job-card">
      <div className="job-card-top">
        <div className="company-logo">
          <img src={companyLogo} alt={companyName} />
        </div>

        <div className="job-main-info">
          <div className="company-name">{companyName}</div>

          <Link to={`/job/${id}`} className="job-title">
            {jobTitle}
          </Link>

          <div className="job-meta">
            <span>
              <FiMapPin />
              {jobLocation}
            </span>

            <span>
              <FiClock />
              {employmentType}
            </span>
          </div>
        </div>

        <button className="save-job" title="Save job">
          <FiBookmark />
        </button>
      </div>

      <div className="job-tags">
        {isInternship && (
          <span className="job-tag internship-tag">
            Internship
          </span>
        )}

        {!isInternship && (
          <span className="job-tag">
            {employmentType}
          </span>
        )}

        <span className="job-tag remote-tag">
          {experienceLevel}
        </span>

        <span className="job-tag">
          {salaryType}
        </span>
      </div>

      <p className="job-description">
        {description}
      </p>

      <div className="job-card-bottom">
        <div className="salary">
          <FiDollarSign />
          <strong>
            {minPrice}k - {maxPrice}k
          </strong>
          <span>/ {salaryType}</span>
        </div>

        <div className="posted-date">
          <FiCalendar />
          {postingDate}
        </div>

        <Link to={`/job/${id}`} className="apply-btn">
          Apply Now
          <FiArrowUpRight />
        </Link>
      </div>
    </article>
  );
};

export default Card;