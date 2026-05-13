export const jobs = [
  // GLOBAL TECH GIANTS
  { 
    id: "g1", 
    title: "Site Reliability Engineer", 
    company: "Google", 
    location: "Zurich, Switzerland", 
    salary: "CHF 140k - 180k", 
    type: "Full-time", 
    experience: "5+ years", 
    description: "Maintain global infrastructure reliability.", 
    skills: ["Go", "Kubernetes", "Linux", "Python"], 
    category: "DevOps", 
    postedAt: "2 days ago", 
    applyUrl: "https://www.google.com/about/careers/applications/jobs/results/", 
    source: "LinkedIn" 
  },
  { 
    id: "g2", 
    title: "Frontend Engineer (L5)", 
    company: "Apple", 
    location: "Cupertino, CA", 
    salary: "$180k - $240k", 
    type: "Full-time", 
    experience: "6+ years", 
    description: "Build the future of iCloud Web.", 
    skills: ["React", "SwiftUI", "JavaScript"], 
    category: "Frontend", 
    postedAt: "1 day ago", 
    applyUrl: "https://www.apple.com/jobs", 
    source: "Indeed" 
  },
  
  // PAKISTAN MARKET (ROZEE.PK SIMULATION)
  { 
    id: "pk1", 
    title: "Full Stack Developer (MERN)", 
    company: "Systems Ltd", 
    location: "Lahore, Pakistan", 
    salary: "PKR 250k - 400k", 
    type: "Full-time", 
    experience: "3+ years", 
    description: "Build enterprise fintech solutions.", 
    skills: ["MongoDB", "React", "Node.js"], 
    category: "Full Stack", 
    postedAt: "5 hours ago", 
    applyUrl: "https://www.systemsltd.com/careers", 
    source: "Rozee.pk" 
  },
  { 
    id: "pk2", 
    title: "Software Engineering Intern", 
    company: "Avanza Solutions", 
    location: "Karachi, Pakistan", 
    salary: "PKR 30k - 50k", 
    type: "Internship", 
    experience: "Fresh Grad", 
    description: "Learn from the best in the industry.", 
    skills: ["Java", "SQL", "Spring"], 
    category: "Backend", 
    postedAt: "Just now", 
    applyUrl: "https://www.avanzasolutions.com/careers/", 
    source: "Rozee.pk" 
  },

  // INTERNSHIPS GLOBAL
  { 
    id: "int1", 
    title: "UI/UX Design Intern", 
    company: "Adobe", 
    location: "Remote", 
    salary: "$4,000 / mo", 
    type: "Internship", 
    experience: "Student", 
    description: "Help us redefine creative software.", 
    skills: ["Figma", "Visual Design"], 
    category: "Design", 
    postedAt: "3 days ago", 
    applyUrl: "https://adobe.wd5.myworkdayjobs.com/external_university", 
    source: "LinkedIn" 
  },
  { 
    id: "int2", 
    title: "Cloud Security Intern", 
    company: "Cloudflare", 
    location: "Austin, TX", 
    salary: "$5,000 / mo", 
    type: "Internship", 
    experience: "Student", 
    description: "Secure the global edge network.", 
    skills: ["Rust", "Networking", "Security"], 
    category: "Security", 
    postedAt: "1 week ago", 
    applyUrl: "https://www.cloudflare.com/careers/jobs/", 
    source: "Indeed" 
  },

  // ADDING MORE DIVERSE JOBS
  ...Array.from({ length: 30 }).map((_, i) => ({
    id: `m${i}`,
    title: ["Web Developer", "Backend Lead", "DevOps Specialist", "Intern", "Product Designer"][i % 5],
    company: ["Microsoft", "Tesla", "Amazon", "SpaceX", "Binance"][i % 5],
    location: ["Remote", "Dubai", "Singapore", "Berlin", "New York"][i % 5],
    salary: ["$50k - $80k", "$120k - $160k", "PKR 100k - 200k", "€70k - €90k"][i % 4],
    type: i % 10 === 0 ? "Internship" : "Full-time",
    experience: i % 10 === 0 ? "Fresh" : "3+ years",
    description: "Exciting opportunity in a fast-paced environment.",
    skills: ["JavaScript", "Python", "React", "Docker", "AWS"],
    category: ["Frontend", "Backend", "DevOps", "AI/ML", "Design"][i % 5],
    postedAt: `${i + 1} days ago`,
    applyUrl: ["https://careers.microsoft.com", "https://www.tesla.com/careers", "https://www.amazon.jobs", "https://www.spacex.com/careers", "https://www.binance.com/en/careers"][i % 5],
    source: ["LinkedIn", "Indeed", "Rozee.pk", "Glassdoor"][i % 4]
  }))
].flat();
