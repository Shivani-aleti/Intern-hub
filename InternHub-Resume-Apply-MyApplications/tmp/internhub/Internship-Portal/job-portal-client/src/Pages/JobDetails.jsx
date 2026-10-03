import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [applied, setApplied] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/jobs.json")
      .then((res) => res.json())
      .then((jobs) => setJob(jobs.find((item) => String(item.id) === String(id))));

    const savedResume = localStorage.getItem("internhubResume");
    if (savedResume) setResume(JSON.parse(savedResume));

    const applications = JSON.parse(localStorage.getItem("internhubApplications") || "[]");
    setApplied(applications.some((item) => String(item.jobId) === String(id)));
  }, [id]);

  const handleResumeUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!/\.(pdf|doc|docx)$/i.test(file.name)) {
      setMessage("Please upload a PDF, DOC, or DOCX resume.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Resume must be below 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const data = {
        name: file.name,
        type: file.type,
        size: file.size,
        data: reader.result,
        uploadedAt: new Date().toLocaleString(),
      };
      localStorage.setItem("internhubResume", JSON.stringify(data));
      setResume(data);
      setMessage("Resume uploaded. You can apply now!");
    };
    reader.readAsDataURL(file);
  };

  const applyNow = () => {
    if (!resume) {
      setMessage("Please upload your resume before applying.");
      return;
    }

    const applications = JSON.parse(localStorage.getItem("internhubApplications") || "[]");
    if (applications.some((item) => String(item.jobId) === String(id))) {
      setApplied(true);
      setMessage("You have already applied for this opportunity.");
      return;
    }

    applications.unshift({
      applicationId: `${id}-${Date.now()}`,
      jobId: job.id,
      companyName: job.companyName,
      jobTitle: job.jobTitle,
      jobLocation: job.jobLocation,
      resumeName: resume.name,
      appliedAt: new Date().toLocaleString(),
      status: "Applied",
    });

    localStorage.setItem("internhubApplications", JSON.stringify(applications));
    setApplied(true);
    setMessage("Application submitted successfully!");
  };

  if (!job) return <main className="loading-box">Loading opportunity...</main>;

  return (
    <main className="job-details-page">
      <div className="job-details-card">
        <span className="section-label">OPPORTUNITY DETAILS</span>
        <h1>{job.jobTitle}</h1>
        <h2>{job.companyName}</h2>
        <div className="job-detail-meta">
          <span>📍 {job.jobLocation}</span>
          <span>💼 {job.employmentType}</span>
          <span>🎓 {job.experienceLevel}</span>
          <span>💰 {job.minPrice}k - {job.maxPrice}k / {job.salaryType}</span>
        </div>
        <p className="job-detail-description">{job.description}</p>

        <div className="application-box">
          <h2>Apply for this opportunity</h2>
          {resume ? (
            <div className="resume-attached">
              <span>📄</span>
              <div>
                <strong>{resume.name}</strong>
                <p>Your uploaded resume is ready.</p>
              </div>
              <Link to="/resume">Change</Link>
            </div>
          ) : (
            <label className="resume-upload-inline">
              <strong>📎 Upload Resume</strong>
              <span>PDF, DOC or DOCX · Maximum 5 MB</span>
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
            </label>
          )}

          {message && <p className="application-message">{message}</p>}

          <button type="button" className="big-apply-btn" onClick={applyNow} disabled={applied}>
            {applied ? "✓ Applied" : "Apply Now"}
          </button>
          <Link to="/my-applications" className="view-applications-link">View My Applications</Link>
        </div>
      </div>
    </main>
  );
};

export default JobDetails;
