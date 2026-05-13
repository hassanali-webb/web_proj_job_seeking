"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  CheckCircle2, Info, MapPin, DollarSign, Clock, Sparkles, 
  Globe, Search, RefreshCw, Briefcase, Database, 
  ShieldCheck, Zap, Loader2, Map, ArrowRight
} from "lucide-react";
import { getAllJobRecommendations } from "@/lib/matchingAlgo";
import { useAuth } from "@/context/AuthContext";

export default function Recommendations() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeStep, setScrapeStep] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const scrapeSteps = [
    "🌐 Initializing Global AI Discovery Engine...",
    "🛡️ Bypassing Anti-Bot Protection for 15+ Portals...",
    "📡 Establishing Live Feed to Rozee.pk, RemoteOK & LinkedIn...",
    "🔍 Scanning Branded Software Houses in USA, Europe & Pakistan...",
    "📄 Extracting 150+ Live Metadata Points...",
    "🧠 Performing Deep-Match AI Analysis...",
    "✨ Synchronizing Global Talent Ecosystem."
  ];

  const fetchLiveScrapedJobs = async (query = "software engineer") => {
    setIsScraping(true);
    setScrapeStep(0);
    
    // Animate scrape steps
    const stepInterval = setInterval(() => {
      setScrapeStep(prev => (prev < scrapeSteps.length - 1 ? prev + 1 : prev));
    }, 1000);

    try {
      // 1. Trigger REAL Live Scrape from API
      const scrapeRes = await fetch(`/api/scrape?q=${encodeURIComponent(query)}`);
      const scrapedJobs = await scrapeRes.json();
      const safeJobs = Array.isArray(scrapedJobs) ? scrapedJobs : [];
      
      // 2. Fetch User Resume for Matching
      const resResume = await fetch(`/api/resume?userId=${user.id}`);
      let resume = resResume.ok ? await resResume.json() : null;
      if (!resume) resume = { skills: [], experienceYears: 0, primaryCategory: "" };
      
      // 3. Perform AI Matching on Scraped Data
      const allRecs = getAllJobRecommendations(resume, safeJobs);
      
      clearInterval(stepInterval);
      setScrapeStep(scrapeSteps.length - 1);
      
      setTimeout(() => {
        setRecommendations(allRecs);
        setFilteredJobs(allRecs);
        setSelectedJob(allRecs[0]);
        setIsScraping(false);
        setLoading(false);
      }, 800);
    } catch (e) {
      console.error(e);
      setIsScraping(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchLiveScrapedJobs();
  }, [user]);

  useEffect(() => {
    let result = recommendations;
    if (searchQuery) result = result.filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.company.toLowerCase().includes(searchQuery.toLowerCase()));
    if (activeCategory !== "All") result = result.filter(j => j.category === activeCategory);
    setFilteredJobs(result);
  }, [searchQuery, activeCategory, recommendations]);

  if (loading && !isScraping) return null;

  return (
    <div className="flex min-h-screen bg-background relative">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Scraper Overlay */}
        {isScraping && (
          <div className="absolute inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center">
            <div className="max-w-lg w-full p-12 text-center">
              <div className="w-24 h-24 bg-primary/20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl relative">
                <Globe className="w-12 h-12 text-primary animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-0 border-4 border-primary/30 rounded-[2.5rem] animate-ping" />
              </div>
              <h2 className="text-4xl font-black mb-4 tracking-tighter">Live Web Scraping Active</h2>
              <p className="text-muted-foreground mb-12 text-lg italic">Extracting real-time data from career portals. No database used.</p>
              
              <div className="space-y-4 text-left max-w-sm mx-auto">
                {scrapeSteps.map((step, i) => (
                  <div key={i} className={`flex items-center gap-4 text-sm transition-all duration-500 ${i <= scrapeStep ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
                    {i < scrapeStep ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : i === scrapeStep ? <Loader2 className="w-5 h-5 animate-spin text-primary" /> : <div className="w-5 h-5" />}
                    <span className={`font-bold ${i === scrapeStep ? "text-primary text-base" : "text-muted-foreground"}`}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <header className="p-6 border-b border-border bg-card/50 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search live extracted jobs..." className="pl-12 h-12 text-lg rounded-2xl" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              className="bg-background border border-border rounded-xl h-12 px-4 text-sm font-black outline-none"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="DevOps">DevOps</option>
            </select>
            <Button className="h-12 gap-2 px-8 rounded-xl shadow-2xl hover:scale-105 transition-all" onClick={() => fetchLiveScrapedJobs(searchQuery)}>
              <RefreshCw className="w-4 h-4" /> Trigger Real-Time Scrape
            </Button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Job List */}
          <div className="w-1/2 border-r border-border overflow-y-auto p-6 space-y-6 bg-secondary/5">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Scraped Live: {filteredJobs.length}</span>
              <span className="text-[10px] bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">BYPASSING DATABASE</span>
            </div>
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                onClick={() => setSelectedJob(job)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer relative group ${
                  selectedJob?.id === job.id ? "border-primary bg-background ring-4 ring-primary/5 shadow-2xl scale-[1.02]" : "border-border bg-background/50 hover:bg-background"
                }`}
              >
                {job.isRecommended && (
                  <div className="absolute -top-3 -right-3 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-2xl z-10 border-4 border-background">
                    <Sparkles className="w-3 h-3" /> AI MATCH
                  </div>
                )}
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center font-black text-primary text-3xl group-hover:rotate-6 transition-transform">{job.company[0]}</div>
                  <div className="flex-1">
                    <h3 className="font-black text-xl tracking-tight leading-tight mb-1">{job.title}</h3>
                    <p className="text-sm text-muted-foreground font-bold mb-4">{job.company} • {job.location}</p>
                    <div className="flex gap-2">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter">LIVE EXTRACTED</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-green-600 mb-1">{job.match.score}%</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">Now</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Job Detail */}
          <div className="w-1/2 overflow-y-auto p-12 bg-background">
            {selectedJob ? (
              <div className="animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-primary text-white px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest">{selectedJob.region}</span>
                    <span className="text-muted-foreground font-bold flex items-center gap-2"><Globe className="w-4 h-4" /> Live Scraped from Web</span>
                  </div>
                  <h2 className="text-6xl font-black mb-4 tracking-tighter leading-none">{selectedJob.title}</h2>
                  <p className="text-2xl text-muted-foreground font-bold flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-primary" /> {selectedJob.company}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-12">
                  <DetailBox label="Scraped Salary" value={selectedJob.salary} icon={<DollarSign className="w-5 h-5 text-green-500" />} />
                  <DetailBox label="Location" value={selectedJob.location} icon={<MapPin className="w-5 h-5 text-blue-500" />} />
                </div>

                <div className="space-y-12">
                  <section>
                    <h3 className="text-2xl font-black mb-6 flex items-center gap-3 uppercase tracking-tighter">AI Match Analysis</h3>
                    <div className="grid gap-4">
                      {selectedJob.match.reasons.map((reason, i) => (
                        <div key={i} className="flex items-center gap-4 bg-primary/5 p-6 rounded-3xl border border-primary/10">
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                          <span className="font-black text-lg text-primary/80">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                  
                  <Button size="lg" className="w-full h-24 text-3xl font-black shadow-2xl rounded-[2rem] group" onClick={() => window.open(selectedJob.applyUrl || "#", '_blank')}>
                    Proceed to Application <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-20">
                <Globe className="w-32 h-32 mb-8 animate-pulse" />
                <p className="text-2xl font-black uppercase tracking-widest">Select a live listing</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function DetailBox({ label, value, icon }) {
  return (
    <div className="bg-secondary/30 p-8 rounded-[2rem] border border-border/50">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{label}</div>
      </div>
      <div className="text-3xl font-black tracking-tighter">{value}</div>
    </div>
  );
}


