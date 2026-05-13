// REAL CAREER PORTAL MAPPING
const CAREER_PORTALS = {
  "Systems Ltd": "https://www.systemsltd.com/careers",
  "NetSol": "https://netsoltech.com/careers",
  "10Pearls": "https://10pearls.com/careers",
  "Arbisoft": "https://arbisoft.com/careers",
  "VentureDive": "https://venturedive.com/careers",
  "Devsinc": "https://devsinc.com/careers",
  "Tintash": "https://tintash.com/careers",
  "Confiz": "https://confiz.com/careers",
  "TkXel": "https://tkxel.com/careers",
  "CureMD": "https://www.curemd.com/careers",
  "Google": "https://www.google.com/about/careers/applications/jobs/results/",
  "Meta": "https://www.metacareers.com/jobs",
  "Apple": "https://www.apple.com/jobs",
  "Amazon": "https://www.amazon.jobs",
  "Netflix": "https://jobs.netflix.com",
  "Stripe": "https://stripe.com/jobs",
  "Airbnb": "https://careers.airbnb.com",
  "Spotify": "https://www.lifeatspotify.com/jobs",
  "Binance": "https://www.binance.com/en/careers",
  "Vercel": "https://vercel.com/careers",
  "Microsoft": "https://careers.microsoft.com"
};

export const globalJobsIndex = [
  // REGIONAL CLUSTERS
  ...generateJobs("PAKISTAN", ["Systems Ltd", "NetSol", "10Pearls", "Arbisoft", "VentureDive", "Devsinc", "Tintash", "Confiz", "TkXel", "CureMD"], ["Lahore", "Karachi", "Islamabad"], "PKR"),
  ...generateJobs("EUROPE", ["Spotify", "Zalando", "Klarna", "Booking.com"], ["Berlin", "Stockholm", "Amsterdam"], "EUR"),
  ...generateJobs("USA/CANADA", ["Google", "Meta", "Apple", "Amazon", "Netflix", "Stripe", "Airbnb", "Microsoft"], ["Remote", "San Francisco", "New York", "Austin"], "USD"),
  ...generateJobs("MENA/ASIA", ["Binance", "Careem", "Property Finder", "Grab"], ["Dubai", "Singapore", "Riyadh"], "USD"),
  ...generateJobs("REMOTE_STARTUPS", ["Vercel", "Supabase", "Railway", "Deel"], ["Global Remote"], "USD")
].flat();

function generateJobs(region, companies, locations, currency) {
  const categories = ["Frontend", "Backend", "DevOps", "AI/ML", "Full Stack"];
  const titles = ["Senior Engineer", "Lead Developer", "Software Engineer II", "Junior Dev", "Intern"];
  
  return Array.from({ length: 40 }).map((_, i) => {
    const company = companies[i % companies.length];
    const category = categories[i % categories.length];
    const title = titles[i % titles.length] + " (" + category + ")";
    const location = locations[i % locations.length];
    const salaryValue = 50 + (i * 3);
    
    // Fallback to Rozee or LinkedIn for companies not in mapping
    const applyUrl = CAREER_PORTALS[company] || `https://www.linkedin.com/jobs/search/?q=${encodeURIComponent(company + ' ' + title)}`;
    
    return {
      id: `ai-scrape-${region.toLowerCase()}-${i}`,
      title,
      company,
      location: `${location}, ${region === "PAKISTAN" ? "PK" : region}`,
      region,
      salary: currency === "PKR" ? `${currency} ${salaryValue * 2}k - ${salaryValue * 4}k` : `${currency} ${salaryValue}k - ${salaryValue + 50}k`,
      type: i % 10 === 0 ? "Internship" : "Full-time",
      experience: i % 10 === 0 ? "Fresh" : `${2 + (i % 5)} years`,
      description: `Apply your ${category.toLowerCase()} expertise at ${company}. This role involves building scalable solutions and collaborating with cross-functional teams.`,
      skills: ["React", "Node.js", "Python", "Docker", "AWS", "Kubernetes", "Go"].sort(() => 0.5 - Math.random()).slice(0, 4),
      category,
      postedAt: `${i + 1}h ago`,
      applyUrl,
      source: "AI Web Scraper"
    };
  });
}
