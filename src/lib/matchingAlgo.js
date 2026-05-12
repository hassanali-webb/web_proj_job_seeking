/**
 * Smart Match Algorithm for matching resumes against job listings.
 * 
 * Weights:
 * - Skills: 40%
 * - Experience: 30%
 * - Education: 10%
 * - Certifications: 10%
 * - Keywords: 10%
 */

export function calculateMatch(resume, job) {
  let score = 0;
  const reasons = [];

  // 1. Skills Matching (40%)
  const jobSkills = job.skills.map(s => s.toLowerCase());
  const resumeSkills = resume.skills.map(s => s.toLowerCase());
  
  const matchedSkills = jobSkills.filter(skill => 
    resumeSkills.some(rs => rs.includes(skill) || skill.includes(rs))
  );
  
  const skillScore = (matchedSkills.length / jobSkills.length) * 40;
  score += skillScore;
  
  if (matchedSkills.length > 0) {
    reasons.push(`Matched ${matchedSkills.length} key skills: ${matchedSkills.slice(0, 3).join(", ")}...`);
  }

  // 2. Experience Matching (30%)
  // Simple heuristic: compare years of experience
  const jobExpYears = parseInt(job.experience) || 0;
  const resumeExpYears = resume.experienceYears || 0;
  
  if (resumeExpYears >= jobExpYears) {
    score += 30;
    reasons.push("Meets or exceeds experience requirements.");
  } else if (resumeExpYears >= jobExpYears * 0.7) {
    score += 20;
    reasons.push("Experience level is close to requirements.");
  } else {
    score += 10;
  }

  // 3. Education Matching (10%)
  const educationKeywords = ["degree", "bachelor", "master", "phd", "university"];
  const hasEducation = resume.education && resume.education.length > 0;
  if (hasEducation) {
    score += 10;
    reasons.push("Education background matches industry standards.");
  }

  // 4. Keywords Matching (20%) - Combined Certifications & Keywords for simplicity
  const resumeKeywords = [...resume.skills, ...resume.certifications || []].map(k => k.toLowerCase());
  const jobKeywords = [...job.skills, job.title, job.category].map(k => k.toLowerCase());
  
  const keywordOverlap = jobKeywords.filter(k => resumeKeywords.includes(k));
  if (keywordOverlap.length > 2) {
    score += 20;
    reasons.push("Strong keyword alignment with job description.");
  } else {
    score += 10;
  }

  // Cap score at 100
  const finalScore = Math.min(Math.round(score), 100);

  return {
    score: finalScore,
    reasons,
    missingSkills: jobSkills.filter(s => !matchedSkills.includes(s))
  };
}

export function getTopRecommendations(resume, allJobs) {
  return allJobs
    .map(job => ({
      ...job,
      match: calculateMatch(resume, job)
    }))
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, 10);
}
