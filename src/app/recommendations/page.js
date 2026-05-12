"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  ChevronRight, 
  Info,
  CheckCircle2,
  XCircle,
  Search,
  Filter
} from "lucide-react";
import { jobs as allJobs } from "@/data/jobs";
import { getTopRecommendations } from "@/lib/matchingAlgo";
import { Input } from "@/components/ui/input";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    // Get resume from localStorage
    const savedResume = localStorage.getItem("userResume");
    if (savedResume) {
      const resume = JSON.parse(savedResume);
      const topJobs = getTopRecommendations(resume, allJobs);
      setRecommendations(topJobs);
      setSelectedJob(topJobs[0]);
    } else {
      // If no resume, just show all jobs with 0 match
      setRecommendations(allJobs.map(j => ({ ...j, match: { score: 0, reasons: [] } })));
      setSelectedJob(allJobs[0]);
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 flex overflow-hidden">
        {/* Job List */}
        <div className="w-1/2 border-r border-border overflow-y-auto p-6 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">Top Job Matches</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
              <Button variant="outline" size="icon"><Search className="w-4 h-4" /></Button>
            </div>
          </div>

          <div className="space-y-4">
            {recommendations.map((job) => (
              <div 
                key={job.id} 
                onClick={() => setSelectedJob(job)}
                className={`p-5 rounded-xl border transition-all cursor-pointer group ${
                  selectedJob?.id === job.id 
                    ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary" 
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center font-bold text-primary">
                      {job.company[0]}
                    </div>
                    <div>
                      <h3 className="font-bold">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    job.match.score > 80 ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {job.match.score}% Match
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {job.salary}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.postedAt}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {job.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="bg-secondary/50 px-2 py-0.5 rounded text-[10px] font-medium">
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="text-[10px] text-muted-foreground self-center">+{job.skills.length - 3} more</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Detail View */}
        <div className="w-1/2 overflow-y-auto p-8 bg-card/30">
          {selectedJob ? (
            <div className="animate-in">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl font-bold text-primary">
                    {selectedJob.company[0]}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{selectedJob.title}</h2>
                    <p className="text-lg text-muted-foreground">{selectedJob.company}</p>
                  </div>
                </div>
                <Button size="lg" className="px-8">Apply Now</Button>
              </div>

              {/* Match Insights */}
              <Card className="mb-8 border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
                    <Info className="w-4 h-4" /> AI Match Analysis
                  </h3>
                  <div className="space-y-3">
                    {selectedJob.match.reasons.map((reason, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        <span>{reason}</span>
                      </div>
                    ))}
                    {selectedJob.match.missingSkills?.length > 0 && (
                      <div className="flex items-start gap-3 text-sm">
                        <XCircle className="w-5 h-5 text-orange-500 shrink-0" />
                        <span>Missing skills: <span className="font-medium text-orange-600">{selectedJob.match.missingSkills.join(", ")}</span></span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Job Details */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-3">About the Role</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedJob.description} We are seeking a highly motivated individual to join our team...
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map(skill => (
                      <span key={skill} className="bg-secondary px-4 py-1.5 rounded-lg text-sm font-medium border border-border">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Job Benefits</h3>
                  <ul className="grid grid-cols-2 gap-3 text-muted-foreground text-sm">
                    <li className="flex items-center gap-2">✅ Full Health Insurance</li>
                    <li className="flex items-center gap-2">✅ 401(k) Matching</li>
                    <li className="flex items-center gap-2">✅ Flexible Working Hours</li>
                    <li className="flex items-center gap-2">✅ Professional Development</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Briefcase className="w-16 h-16 mb-4 opacity-20" />
              <p>Select a job to view details</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
