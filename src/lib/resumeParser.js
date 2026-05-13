/**
 * Professional Resume Parser & Career Track Identification
 * Uses category density analysis to determine the primary career path.
 */

const SKILL_CATEGORIES = {
  "DevOps & Infrastructure": ["Kubernetes", "Docker", "Terraform", "Jenkins", "AWS", "Azure", "GCP", "CI/CD", "Ansible", "Helm", "Prometheus", "Grafana", "CloudNative", "Site Reliability"],
  "Frontend Development": ["React", "Next.js", "Vue", "Angular", "Tailwind", "CSS3", "HTML5", "TypeScript", "JavaScript", "Figma", "Redux"],
  "Backend Development": ["Node.js", "Express", "Python", "Django", "Ruby on Rails", "Go", "Java", "Spring Boot", "GraphQL", "Microservices", "API Design"],
  "Data & AI": ["PyTorch", "TensorFlow", "Pandas", "Scikit-Learn", "Machine Learning", "LLMs", "NLP", "SQL", "Big Data", "Data Engineering"]
};

export async function parseResume(file) {
  // Simulate heavy AI processing
  await new Promise(resolve => setTimeout(resolve, 3000));

  // In a real application, we would use a library like 'pdf-parse' to get the actual text.
  // Here we simulate the extraction of a DevOps-heavy profile to demonstrate the logic.
  const mockText = `
    DevOps Engineer with 6 years of experience in cloud infrastructure. 
    Expert in Kubernetes, Docker, and Terraform. 
    Managed large-scale AWS deployments and implemented CI/CD pipelines using Jenkins and GitHub Actions.
    Proficient in Python scripting and Prometheus monitoring.
  `;

  const detectedSkills = [];
  const categoryCounts = {};

  // Analyze keyword density across categories
  Object.entries(SKILL_CATEGORIES).forEach(([category, keywords]) => {
    categoryCounts[category] = 0;
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = mockText.match(regex);
      if (matches) {
        detectedSkills.push(keyword);
        categoryCounts[category] += matches.length;
      }
    });
  });

  // Identify Primary Career Track
  const primaryCategory = Object.entries(categoryCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];

  return {
    name: "Candidate Profile",
    skills: [...new Set(detectedSkills)],
    primaryCategory,
    experienceYears: 6,
    atsScore: calculateATSScore(detectedSkills, 6),
    seniority: "Senior",
    summary: mockText.trim()
  };
}

function calculateATSScore(skills, exp) {
  let score = 40; // Base
  score += Math.min(skills.length * 3, 30); // Skill variety
  score += Math.min(exp * 5, 30); // Experience weight
  return Math.min(score, 100);
}
