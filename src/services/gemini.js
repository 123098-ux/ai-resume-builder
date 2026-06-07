import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.REACT_APP_GEMINI_API_KEY
);

export async function generateResume(data) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are an expert resume writer.

Create a modern, professional, ATS-friendly resume.

Candidate Details:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Location: ${data.location}

Education:
${data.education}

Experience:
${data.experience}

Projects:
${data.projects}

Certifications:
${data.certifications}

Skills:
${data.skills}

Additional Sections:
${data.customSections}

Instructions:

1. Create a strong Professional Summary (3-4 lines).
2. Organize the resume into sections:
   - Professional Summary
   - Education
   - Experience
   - Technical Skills
   - Projects
   - Certifications
   - Additional Sections
3. Convert project descriptions into professional bullet points.
4. Improve wording where necessary.
5. Use ATS-friendly keywords.
6. Use bullet points wherever appropriate.
7. Keep formatting clean and professional.
8. Do not include explanations outside the resume.
9. Return only the completed resume.
10.If a section is empty or not provided, omit that section entirely.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();

}


export async function generateCoverLetter(data) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
Write a professional cover letter.

Candidate Name: ${data.name}
Email: ${data.email}

Job Role: ${data.jobRole}
Company: ${data.company}

Education:
${data.education}

Skills:
${data.skills}

Projects:
${data.projects}

The cover letter should:
- Be professional
- Be 250-350 words
- Highlight relevant skills
- Explain why the candidate is suitable
- End politely
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}

export async function analyzeATS(
  resumeText,
  jobDescription
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are an ATS (Applicant Tracking System) expert.

Analyze the resume against the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Provide:

1. ATS Score (0-100)
2. Matching Skills
3. Missing Skills
4. Strengths
5. Weaknesses
6. Specific Suggestions to Improve ATS Score

Format the response professionally using headings and bullet points.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}