import React, { useState } from "react";
import { calculateATSScore } from "../utils/atsChecker";

function ATSChecker() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);

  const handleCheck = () => {
    if (!resumeText || !jobDescription) {
      alert("Please enter both Resume and Job Description");
      return;
    }

    const atsResult = calculateATSScore(
      resumeText,
      jobDescription
    );

    setResult(atsResult);
  };

  return (
    <div className="ats-container">
      <h2>ATS Resume Checker</h2>

      <textarea
        placeholder="Paste Resume Text Here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        rows="8"
      />

      <textarea
        placeholder="Paste Job Description Here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows="8"
      />

      <button onClick={handleCheck}>
        Check ATS Score
      </button>

      {result && (
        <div className="result-card">
          <h3>ATS Score: {result.score}%</h3>

          <h4>Matched Keywords</h4>
          <p>{result.matchedKeywords.join(", ")}</p>

          <h4>Missing Keywords</h4>
          <p>{result.missingKeywords.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default ATSChecker;