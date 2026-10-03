import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  const loadApplications = () => {
    setApplications(JSON.parse(localStorage.getItem("internhubApplications") || "[]"));
  };

  useEffect(() => {
    loadApplications();
    window.addEventListener("storage", loadApplications);
    return () => window.removeEventListener("storage", loadApplications);
  }, []);

  return (
    <main className="applications-page">
      <div className="applications-header">
        <div>
          <span className="section-label">STUDENT DASHBOARD</span>
          <h1>My Applications</h1>
          <p>Track the internships and jobs you have applied for.</p>
        </div>
        <Link to="/resume" className="apply-btn">Upload Resume</Link>
      </div>

      {applications.length === 0 ? (
        <div className="empty-applications">
          <div>📋</div>
          <h2>No applications yet</h2>
          <p>Open an internship or job and click Apply Now to see it here.</p>
          <Link to="/" className="apply-btn">Browse Opportunities</Link>
        </div>
      ) : (
        <div className="applications-grid">
          {applications.map((application) => (
            <article className="application-card" key={application.applicationId}>
              <div className="application-top">
                <div>
                  <span className="application-company">{application.companyName}</span>
                  <h2>{application.jobTitle}</h2>
                </div>
                <span className="status-badge">{application.status}</span>
              </div>
              <p><strong>Location:</strong> {application.jobLocation}</p>
              <p><strong>Applied:</strong> {application.appliedAt}</p>
              <p><strong>Resume:</strong> {application.resumeName}</p>
              <Link to={`/job/${application.jobId}`} className="details-link">View Job</Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default MyApplications;
