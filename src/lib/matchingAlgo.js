/**
 * Career-Track Aware Matching Algorithm
 */

export function calculateMatch(resume, job) {
  if (!resume || !job) {
    return { score: 0, reasons: ["Insufficient data for matching"], matchedSkills: [], missingSkills: [] };
  }

  let score = 0;
  const reasons = [];
  
  // 1. Primary Category Alignment (40%)
  // Map job categories to our internal skill categories
  const categoryMap = {
    "DevOps": "DevOps & Infrastructure",
    "Cloud": "DevOps & Infrastructure",
    "Frontend": "Frontend Development",
    "Backend": "Backend Development",
    "Full Stack": "Backend Development",
    "AI/ML": "Data & AI"
  };

  const jobInternalCategory = categoryMap[job.category] || "";
  if (jobInternalCategory === resume.primaryCategory) {
    score += 40;
    reasons.push(`Perfect career track alignment: ${resume.primaryCategory}`);
  } else {
    score += 10; // Partial credit for industry overlap
  }

  // 2. Specific Skill Matching (40%)
  const jobSkills = (job.skills || []).map(s => s.toLowerCase());
  const resumeSkills = (resume.skills || []).map(s => s.toLowerCase());
  
  if (jobSkills.length === 0) {
    score += 15; // Baseline for general alignment
    reasons.push("General role alignment detected");
    var matched = [];
  } else {
    var matched = jobSkills.filter(js => resumeSkills.some(rs => rs.includes(js) || js.includes(rs)));
    const skillScore = (matched.length / jobSkills.length) * 40;
    score += skillScore;
  }
  
  if (matched.length > 0) {
    reasons.push(`Matched key technologies: ${matched.join(", ")}`);
  }

  // 3. Seniority & Experience (20%)
  const jobExp = parseInt(job.experience) || 0;
  if (resume.experienceYears >= jobExp) {
    score += 20;
    reasons.push("Experience level meets or exceeds requirements");
  }

  return {
    score: Math.min(Math.round(score), 100),
    reasons,
    matchedSkills: matched,
    missingSkills: jobSkills.filter(js => !matched.includes(js))
  };
}

export function getAllJobRecommendations(resume, allJobs) {
  const processed = allJobs.map(job => ({
    ...job,
    match: calculateMatch(resume, job)
  }));

  processed.sort((a, b) => b.match.score - a.match.score);

  return processed.map((job, index) => ({
    ...job,
    isRecommended: index < 5 && job.match.score > 60
  }));
}
