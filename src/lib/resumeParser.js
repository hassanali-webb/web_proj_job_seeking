/**
 * Professional Resume Parser & Career Track Identification
 * Uses category density analysis to determine the primary career path.
 */

const SKILL_CATEGORIES = {
  "Frontend Development": ["React", "Next.js", "Vue", "Angular", "Tailwind", "Bootstrap", "CSS3", "HTML5", "TypeScript", "JavaScript", "Figma", "Redux", "Sass", "Webpack", "Responsive Design", "UI/UX", "Vite", "jQuery"],
  "Backend Development": ["Node.js", "Express", "Python", "Django", "Flask", "Ruby on Rails", "Go", "Java", "Spring Boot", "GraphQL", "Microservices", "API Design", "PHP", "Laravel", "C#", "ASP.NET"],
  "DevOps & Infrastructure": ["Kubernetes", "Docker", "Terraform", "Jenkins", "AWS", "Azure", "GCP", "CI/CD", "Ansible", "Helm", "Prometheus", "Grafana", "CloudNative", "Nginx", "Linux", "Git", "GitHub", "GitLab"],
  "Data & AI": ["PyTorch", "TensorFlow", "Pandas", "Scikit-Learn", "Machine Learning", "LLMs", "NLP", "SQL", "MongoDB", "PostgreSQL", "Big Data", "Data Engineering", "R", "Spark", "MySQL", "Redis", "Elasticsearch"]
};

const SOFT_SKILLS = ["Communication", "Problem Solving", "Teamwork", "Leadership", "Agile", "Scrum", "Management", "Analytical", "Creative"];

/**
 * Deep Analysis Logic - Shared between client and server
 */
export function analyzeResumeText(textContent, filename) {
  const analysisTarget = (textContent + " " + (filename || "")).toLowerCase();
  const detectedSkills = [];
  const categoryCounts = {};
  const foundSoftSkills = [];

  Object.keys(SKILL_CATEGORIES).forEach(cat => categoryCounts[cat] = 0);

  // Deep Keyword Analysis
  Object.entries(SKILL_CATEGORIES).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
      let regex;
      // Stricter matching for very short keywords like R or Go
      if (keyword.length <= 2) {
        regex = new RegExp(`(^|[^a-zA-Z0-9])${keyword}([^a-zA-Z0-9]|$)`, 'gi');
      } else {
        const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        regex = new RegExp(`(^|[^a-zA-Z0-9])${escaped}([^a-zA-Z0-9]|$)`, 'gi');
      }
      
      const matches = analysisTarget.match(regex);
      if (matches) {
        detectedSkills.push(keyword);
        categoryCounts[category] += matches.length;
      }
    });
  });

  // Soft Skills Detection
  SOFT_SKILLS.forEach(skill => {
    const regex = new RegExp(`\\b${skill}\\b`, 'gi');
    if (analysisTarget.match(regex)) {
      foundSoftSkills.push(skill);
    }
  });

  // Education Detection
  const hasDegree = /bachelor|master|phd|bscs|ms|university|college/i.test(analysisTarget);
  const educationLevel = hasDegree ? "Degree Found" : "Not Specified";

  // Project Detection
  const projectMatches = analysisTarget.match(/project|portfolio|built|developed|created/gi) || [];
  const projectCount = Math.floor(projectMatches.length / 2);

  // Identify Primary Career Track
  const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
  let primaryCategory = sortedCategories[0][1] > 0 ? sortedCategories[0][0] : "General Software Development";

  // Refined Experience Detection
  const expMatch = analysisTarget.match(/(\d+)\+?\s*years?/);
  let experienceYears = expMatch ? parseInt(expMatch[1]) : 0;
  
  if (experienceYears === 0) {
    if (analysisTarget.includes("senior") || analysisTarget.includes("lead")) experienceYears = 6;
    else if (analysisTarget.includes("intern") || analysisTarget.includes("junior") || analysisTarget.includes("student")) experienceYears = 1;
    else if (projectCount > 5) experienceYears = 4;
    else experienceYears = 2;
  }

  const allSkills = [...new Set([...detectedSkills, ...foundSoftSkills])];

  return {
    name: filename ? filename.split('.')[0].replace(/[-_]/g, ' ').toUpperCase() : "CANDIDATE PROFILE",
    skills: allSkills.length > 0 ? allSkills : ["Software Development", "Technical Logic"],
    primaryCategory,
    experienceYears,
    educationLevel,
    projectCount,
    atsScore: calculateATSScore(detectedSkills, experienceYears, foundSoftSkills, hasDegree),
    seniority: experienceYears >= 5 ? "Senior" : experienceYears >= 2 ? "Mid-level" : "Junior",
    summary: `Profile focused on ${primaryCategory}. Detected ${allSkills.length} key skills. ${hasDegree ? "Education verified." : ""} Analysis indicates ${experienceYears} years of technical exposure.`
  };
}

export async function parseResume(file) {
  // This is the client-side fallback
  await new Promise(resolve => setTimeout(resolve, 1500));

  let textContent = "";
  try {
    textContent = await file.text();
    // Strip binary non-printable characters
    textContent = textContent.replace(/[^\x20-\x7E\n\r\t]/g, " "); 
  } catch (e) {
    textContent = file.name;
  }

  return analyzeResumeText(textContent, file.name);
}

function calculateATSScore(skills, exp, softSkills, hasDegree) {
  let score = 25;
  score += Math.min(skills.length * 4, 40);
  score += Math.min(softSkills.length * 2, 10);
  score += Math.min(exp * 4, 20);
  if (hasDegree) score += 5;
  return Math.min(score, 100);
}
