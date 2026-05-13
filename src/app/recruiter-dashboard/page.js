"use client";

import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Briefcase, 
  Users, 
  Eye, 
  CheckCircle2, 
  Send,
  X,
  Building2,
  MapPin,
  DollarSign
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    location: "",
    salary: "",
    type: "Full-time",
    description: "",
    skills: "",
    category: "Frontend"
  });

  useEffect(() => {
    async function fetchJobs() {
      const res = await fetch("/api/jobs");
      if (res.ok) {
        const data = await res.json();
        // Filter jobs posted by this recruiter/org
        setJobs(data.filter(j => j.company === user?.orgName));
      }
    }
    if (user) fetchJobs();
  }, [user]);

  const handlePostJob = async (e) => {
    e.preventDefault();
    setIsPosting(true);
    
    const jobPayload = {
      ...newJob,
      company: user.orgName,
      skills: newJob.skills.split(",").map(s => s.trim()),
      experience: "3+ years" // Default
    };

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobPayload)
    });

    if (res.ok) {
      const { job } = await res.json();
      setJobs([job, ...jobs]);
      setShowForm(false);
      setNewJob({ title: "", location: "", salary: "", type: "Full-time", description: "", skills: "", category: "Frontend" });
    }
    setIsPosting(false);
  };

  if (!user || user.role !== "recruiter") return null;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Recruiter Command Center</h1>
            <p className="text-muted-foreground">Managing talent for <span className="text-primary font-bold">{user.orgName}</span></p>
          </div>
          <Button className="gap-2 h-12 px-6 shadow-lg" onClick={() => setShowForm(true)}>
            <Plus className="w-5 h-5" /> Post New Job
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard icon={<Briefcase className="text-blue-500" />} label="Active Jobs" value={jobs.length} />
          <StatCard icon={<Users className="text-green-500" />} label="Total Applicants" value="142" />
          <StatCard icon={<Eye className="text-purple-500" />} label="Profile Views" value="2.4k" />
        </div>

        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Building2 className="w-5 h-5" /> Your Job Listings
        </h2>
        
        <div className="space-y-4">
          {jobs.length > 0 ? jobs.map(job => (
            <Card key={job.id} className="hover:shadow-md transition-all">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center font-bold text-primary">
                    {job.title[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{job.title}</h3>
                    <div className="flex gap-3 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {job.salary}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right mr-4">
                    <div className="text-sm font-bold text-green-600">12 Applicants</div>
                    <div className="text-[10px] text-muted-foreground">Active</div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </CardContent>
            </Card>
          )) : (
            <Card className="p-12 text-center border-dashed bg-secondary/10">
              <p className="text-muted-foreground mb-4">You haven't posted any jobs yet.</p>
              <Button onClick={() => setShowForm(true)}>Post Your First Job</Button>
            </Card>
          )}
        </div>

        {/* Post Job Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
            <Card className="w-full max-w-2xl shadow-2xl animate-in">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-6">
                <div>
                  <CardTitle className="text-2xl">Post a New Role</CardTitle>
                  <CardDescription>Fill in the details to find your perfect match.</CardDescription>
                </div>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-secondary rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </CardHeader>
              <form onSubmit={handlePostJob}>
                <CardContent className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Job Title</label>
                      <Input 
                        placeholder="e.g. Senior DevOps Engineer" 
                        value={newJob.title}
                        onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input 
                        placeholder="e.g. Remote / London" 
                        value={newJob.location}
                        onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Salary Range</label>
                      <Input 
                        placeholder="e.g. $100k - $150k" 
                        value={newJob.salary}
                        onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <select 
                        className="w-full bg-background border border-border rounded-lg h-10 px-3 outline-none"
                        value={newJob.category}
                        onChange={(e) => setNewJob({...newJob, category: e.target.value})}
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Full Stack">Full Stack</option>
                        <option value="AI/ML">AI/ML</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Skills (comma separated)</label>
                    <Input 
                      placeholder="e.g. Kubernetes, AWS, Terraform" 
                      value={newJob.skills}
                      onChange={(e) => setNewJob({...newJob, skills: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Description</label>
                    <textarea 
                      className="w-full min-h-[120px] bg-background border border-border rounded-lg p-3 outline-none"
                      placeholder="Describe the role and responsibilities..."
                      value={newJob.description}
                      onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                      required
                    />
                  </div>
                </CardContent>
                <div className="p-8 border-t border-border flex justify-end gap-4">
                  <Button variant="ghost" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
                  <Button type="submit" className="gap-2 h-12 px-8" disabled={isPosting}>
                    {isPosting ? <RefreshCw className="animate-spin" /> : <Send className="w-4 h-4" />}
                    {isPosting ? "Posting..." : "Publish Job"}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6 flex items-center gap-6">
        <div className="p-4 bg-secondary rounded-2xl">{icon}</div>
        <div>
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function RefreshCw(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}
