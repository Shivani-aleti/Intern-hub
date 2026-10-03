import React, { useEffect, useState } from "react";

const Resume = () => {
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("internhubResume");
    if (saved) setResume(JSON.parse(saved));
  }, []);

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) {
      setMessage("Please upload a PDF, DOC, or DOCX file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Please keep the resume below 5 MB.");
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
      setMessage("Resume uploaded successfully!");
    };
    reader.readAsDataURL(file);
  };

  const removeResume = () => {
    localStorage.removeItem("internhubResume");
    setResume(null);
    setMessage("Resume removed.");
  };

  return (
    <main className="resume-page">
      <div className="resume-card">
        <span className="section-label">STUDENT PROFILE</span>
        <h1>Upload Your Resume</h1>
        <p className="resume-intro">Upload your resume once and use it when applying to internships and jobs.</p>

        <label className="resume-upload-box">
          <span className="upload-icon">📄</span>
          <strong>{resume ? "Replace Resume" : "Choose Resume"}</strong>
          <small>PDF, DOC or DOCX · Maximum 5 MB</small>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleUpload} />
        </label>

        {message && <div className="resume-message">{message}</div>}

        {resume && (
          <div className="resume-preview">
            <div>
              <strong>{resume.name}</strong>
              <p>Uploaded: {resume.uploadedAt}</p>
              <p>{(resume.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <div className="resume-actions">
              <a href={resume.data} download={resume.name} className="apply-btn">View / Download</a>
              <button type="button" className="remove-btn" onClick={removeResume}>Remove</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Resume;
