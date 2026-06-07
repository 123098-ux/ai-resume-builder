import React, { useState, useRef } from "react";
import "./App.css";
import {
  generateResume,
  generateCoverLetter,
} from "./services/gemini";
import jsPDF from "jspdf";
import ATSChecker from "./components/ATSChecker";

function App() {
  const [personal, setPersonal] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [projects, setProjects] = useState("");
  const [certifications, setCertifications] = useState("");
  const [skills, setSkills] = useState("");

  const [customSections, setCustomSections] = useState([]);
  const [newHeading, setNewHeading] = useState("");
  const [aiResume, setAiResume] = useState("");
  const [loading, setLoading] = useState(false);
  const resumeRef = useRef();
  const [jobRole, setJobRole] = useState("");
  const [company, setCompany] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [showATS, setShowATS] = useState(false);

  const addSection = () => {
    if (newHeading.trim() !== "") {
      setCustomSections([
        ...customSections,
        { title: newHeading, content: "" },
      ]);
      setNewHeading("");
    }
  };

  const updateCustomContent = (index, value) => {
    const updated = [...customSections];
    updated[index].content = value;
    setCustomSections(updated);
  };
  const handleGenerateResume = async () => {
  try {
    setLoading(true);

    const resume = await generateResume({
      ...personal,
      education,
      experience,
      projects,
      certifications,
      skills,
      customSections: JSON.stringify(customSections),
    });

    setAiResume(resume);
  } catch (error) {
    console.error(error);
    alert("Error generating resume");
  }

  setLoading(false);
};
const handleGenerateCoverLetter = async () => {
  try {
    const letter = await generateCoverLetter({
      ...personal,
      education,
      projects,
      skills,
      jobRole,
      company,
    });

    setCoverLetter(letter);
  } catch (error) {
    console.error(error);
    alert("Error generating cover letter");
  }
};
const downloadPDF = () => {
  if (!aiResume) {
    alert("Generate a resume first");
    return;
  }

  const pdf = new jsPDF();

  const lines = pdf.splitTextToSize(aiResume, 180);

  pdf.text(lines, 10, 10);

  pdf.save("resume.pdf");
};

  return (
    <div className="app">
      <div className="header">
        <h1>AI Resume Builder</h1>
        <p>Create Professional ATS-Friendly Resumes</p>
      </div>

      <div className="container">
        {/* FORM SECTION */}
        <div className="form-card">
          <h2>Personal Information</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={personal.name}
            onChange={(e) =>
              setPersonal({ ...personal, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={personal.email}
            onChange={(e) =>
              setPersonal({ ...personal, email: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={personal.phone}
            onChange={(e) =>
              setPersonal({ ...personal, phone: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Location"
            value={personal.location}
            onChange={(e) =>
              setPersonal({ ...personal, location: e.target.value })
            }
          />

          <h2>Education</h2>
          <textarea
            rows="4"
            placeholder="Enter Educational Details"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />

          <h2>Experience</h2>
          <textarea
            rows="4"
            placeholder="Enter Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          <h2>Projects</h2>
          <textarea
            rows="4"
            placeholder="Describe Projects"
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
          />

          <h2>Certifications</h2>
          <textarea
            rows="4"
            placeholder="Enter Certifications"
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
          />

          <h2>Skills</h2>
          <textarea
            rows="4"
            placeholder="Enter Skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <h2>Job Role</h2>
            <input
              type="text"
              placeholder="Software Engineer"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />

            <h2>Company Name</h2>
            <input
              type="text"
              placeholder="Google"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />

          <h2>Add Custom Section</h2>

          <input
            type="text"
            placeholder="Section Name (Achievements, Languages...)"
            value={newHeading}
            onChange={(e) => setNewHeading(e.target.value)}
          />

          <button onClick={addSection}>
              Add New Section
          </button>

          <br />
          <br />

        <button onClick={handleGenerateResume}>
  {loading ? "Generating..." : "Generate AI Resume"}
</button>

<button onClick={handleGenerateCoverLetter}>
  Generate Cover Letter
</button>

<button onClick={downloadPDF}>
  Download PDF
</button>

<button onClick={() => setShowATS(!showATS)}>
  {showATS ? "Hide ATS Checker" : "Open ATS Checker"}
</button>

          {customSections.map((section, index) => (
            <div key={index}>
              <h3>{section.title}</h3>

              <textarea
                rows="3"
                placeholder={`Enter ${section.title}`}
                value={section.content}
                onChange={(e) =>
                  updateCustomContent(index, e.target.value)
                }
              />
            </div>
          ))}
        </div>

        {/* PREVIEW SECTION */}
        <div className="preview-card">
          <h2>Resume Preview</h2>

          <h1>{personal.name || "Your Name"}</h1>

          <p>
            {personal.email || "email@example.com"} |
            {" "}
            {personal.phone || "Phone Number"}
          </p>

          <p>{personal.location || "Location"}</p>

          <hr />

          <h3>Education</h3>
          <p>{education}</p>

          <h3>Experience</h3>
          <p>{experience}</p>

          <h3>Projects</h3>
          <p>{projects}</p>

          <h3>Certifications</h3>
          <p>{certifications}</p>

          <h3>Skills</h3>
          <p>{skills}</p>

          {customSections.map((section, index) => (
            <div key={index}>
              <h3>{section.title}</h3>
              <p>{section.content}</p>
            </div>
          ))}
          {aiResume && (
  <>
    <hr />
    <h2>AI Generated Resume</h2>

    <div className="ai-resume" ref={resumeRef}>
      <pre>{aiResume}</pre>
    </div>
  </>
)}
    {coverLetter && (
  <>
    <hr />
    <h2>AI Generated Cover Letter</h2>

    <div className="ai-resume">
      <pre>{coverLetter}</pre>
    </div>
  </>
)}
{showATS && <ATSChecker />}
        </div>
      </div>
    </div>
  );
}

export default App;