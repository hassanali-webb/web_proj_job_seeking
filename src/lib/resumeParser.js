/**
 * Mock Resume Parser
 * In a production app, this would use a library like 'pdf-parse' or an external API (Azure Form Recognizer, AWS Textract, or OpenAI).
 */

export async function parseResume(file) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Default fallback data (simulated extraction)
  return {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    skills: [
      "React", 
      "JavaScript", 
      "Node.js", 
      "Tailwind CSS", 
      "Next.js", 
      "AWS", 
      "Docker", 
      "Git",
      "TypeScript",
      "REST APIs"
    ],
    experienceYears: 4,
    education: [
      {
        degree: "B.S. in Computer Science",
        school: "State University",
        year: "2020"
      }
    ],
    experience: [
      {
        role: "Software Engineer",
        company: "InnovateTech",
        duration: "2020 - Present",
        description: "Built scalable web applications using React and Node.js."
      },
      {
        role: "Junior Developer",
        company: "WebSol",
        duration: "2019 - 2020",
        description: "Assisted in frontend development and bug fixing."
      }
    ],
    certifications: ["AWS Certified Solutions Architect", "React Developer Nanodegree"],
    atsScore: 85,
    summary: "Dedicated Software Engineer with 4 years of experience building high-performance web applications. Expert in modern JavaScript frameworks and cloud infrastructure."
  };
}

export function calculateATSScore(resume) {
  // Mock logic to calculate ATS score based on common criteria
  let score = 60; // Base score

  if (resume.skills.length > 10) score += 10;
  if (resume.experienceYears >= 3) score += 10;
  if (resume.certifications.length > 0) score += 5;
  if (resume.summary && resume.summary.length > 100) score += 5;
  if (resume.education.length > 0) score += 10;

  return Math.min(score, 100);
}
