import React from "react";
import {
  FaFileArrowUp,
  FaRocket,
  FaCircleCheck,
} from "react-icons/fa6";

const Newsletter = () => {
  return (
    <aside className="right-sidebar">

      <div className="resume-card">
        <div className="resume-icon">
          <FaFileArrowUp />
        </div>

        <h3>Upload Your Resume</h3>

        <p>
          Let recruiters discover you faster. Upload your
          latest resume and increase your chances of getting
          noticed.
        </p>

        <button className="resume-btn">
          Upload Resume
        </button>

        <small>PDF, DOC, DOCX up to 5MB</small>
      </div>

      <div className="why-card">
        <div className="side-heading">
          <FaRocket />
          <h3>Why Choose InternHub?</h3>
        </div>

        <div className="benefit">
          <FaCircleCheck />
          <div>
            <strong>Thousands of opportunities</strong>
            <p>Find jobs and internships in one place.</p>
          </div>
        </div>

        <div className="benefit">
          <FaCircleCheck />
          <div>
            <strong>Easy applications</strong>
            <p>Apply to opportunities without the hassle.</p>
          </div>
        </div>

        <div className="benefit">
          <FaCircleCheck />
          <div>
            <strong>Career growth</strong>
            <p>Discover opportunities that match your skills.</p>
          </div>
        </div>
      </div>

      <div className="career-card">
        <div className="career-card-content">
          <span>🚀</span>
          <h3>Your next opportunity is waiting.</h3>
          <p>
            Keep exploring, keep learning and take the next
            step toward your career.
          </p>
        </div>
      </div>

    </aside>
  );
};

export default Newsletter;