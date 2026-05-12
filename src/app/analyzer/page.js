"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  Cell
} from "recharts";
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Zap, 
  Download,
  Share2,
  Lightbulb
} from "lucide-react";

export default function ResumeAnalyzer() {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const savedResume = localStorage.getItem("userResume");
    if (savedResume) {
      setResume(JSON.parse(savedResume));
    }
  }, []);

  if (!resume) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <FileText className="w-16 h-16 text-muted-foreground opacity-20 mb-4" />
          <h2 className="text-2xl font-bold mb-4">No Resume Analyzed Yet</h2>
          <Button onClick={() => window.location.href = "/upload"}>Upload Your Resume</Button>
        </main>
      </div>
    );
  }

  const radarData = [
    { subject: 'Skills Match', A: 85, fullMark: 100 },
    { subject: 'Experience', A: 90, fullMark: 100 },
    { subject: 'Keywords', A: 70, fullMark: 100 },
    { subject: 'Formatting', A: 95, fullMark: 100 },
    { subject: 'Contact Info', A: 100, fullMark: 100 },
    { subject: 'Certifications', A: 60, fullMark: 100 },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Resume Deep-Dive</h1>
            <p className="text-muted-foreground">Comprehensive analysis of your professional profile.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Export Report
            </Button>
            <Button className="gap-2">
              <Share2 className="w-4 h-4" /> Share Results
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Score Card */}
          <Card className="lg:col-span-1 bg-primary text-primary-foreground relative overflow-hidden">
            <CardHeader>
              <CardTitle>Overall ATS Score</CardTitle>
              <CardDescription className="text-primary-foreground/70">Probability of passing automated filters.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="text-8xl font-black mb-4">{resume.atsScore}</div>
              <div className="text-xl font-bold mb-8">Strong Profile</div>
              <div className="w-full bg-white/20 rounded-full h-2 mb-8">
                <div 
                  className="bg-white h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${resume.atsScore}%` }} 
                />
              </div>
              <p className="text-sm text-center text-primary-foreground/80">
                Your resume is in the top 15% of candidates for roles in {resume.skills[0]} and {resume.skills[1]}.
              </p>
            </CardContent>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          </Card>

          {/* Radar Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Profile Strength Map</CardTitle>
              <CardDescription>Dimensional analysis of your candidacy.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fontWeight: 500 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} hide />
                  <Radar
                    name="Candidate"
                    dataKey="A"
                    stroke="#4f46e5"
                    fill="#4f46e5"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Checks */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Analysis Checklist</CardTitle>
              <CardDescription>Detailed breakdown of tracking system criteria.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <CheckItem 
                title="Keywords & Skills" 
                status="pass" 
                desc={`Found ${resume.skills.length} relevant industry keywords.`} 
              />
              <CheckItem 
                title="Formatting & Readability" 
                status="pass" 
                desc="Font sizes and structure are optimal for OCR parsing." 
              />
              <CheckItem 
                title="Quantified Results" 
                status="warning" 
                desc="Try adding more metrics (%, $, #) to your bullet points." 
              />
              <CheckItem 
                title="Contact Information" 
                status="pass" 
                desc="Email, phone, and LinkedIn are correctly formatted." 
              />
              <CheckItem 
                title="Length & Density" 
                status="pass" 
                desc="Your resume has the ideal word count for your experience level." 
              />
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card className="lg:col-span-1 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" /> AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-white rounded-xl shadow-sm border border-border">
                <p className="text-sm font-bold text-primary mb-1">Seniority Detected</p>
                <p className="text-sm">Based on your 4 years of experience, you are perfectly positioned for "Senior" or "Lead" roles.</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm border border-border">
                <p className="text-sm font-bold text-primary mb-1">Skill Gap Identified</p>
                <p className="text-sm">Adding "System Design" or "Microservices" could increase your visibility by 24%.</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm border border-border">
                <p className="text-sm font-bold text-primary mb-1">Job Market Trend</p>
                <p className="text-sm">Demand for your {resume.skills[0]} skills has increased by 12% this quarter.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function CheckItem({ title, status, desc }) {
  return (
    <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-secondary/50 transition-colors">
      {status === "pass" ? (
        <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
      ) : (
        <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0" />
      )}
      <div>
        <h4 className="font-bold text-sm">{title}</h4>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
