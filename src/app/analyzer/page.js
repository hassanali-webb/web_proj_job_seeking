"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { FileText, Download, Share2, Lightbulb } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ResumeAnalyzer() {
  const { user } = useAuth();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResume() {
      if (user) {
        try {
          const res = await fetch(`/api/resume?userId=${user.id}`);
          if (res.ok) {
            const data = await res.json();
            setResume(data);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchResume();
  }, [user]);

  if (loading) return null;

  if (!resume) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <FileText className="w-16 h-16 text-muted-foreground opacity-20 mb-4" />
          <h2 className="text-2xl font-bold mb-4">No Resume Analyzed</h2>
          <Button onClick={() => window.location.href = "/upload"}>Upload Your Resume</Button>
        </main>
      </div>
    );
  }

  const radarData = [
    { subject: 'Skills Match', A: 85 },
    { subject: 'Experience', A: 90 },
    { subject: 'Keywords', A: 70 },
    { subject: 'Formatting', A: 95 },
    { subject: 'Contact Info', A: 100 },
    { subject: 'Certifications', A: 60 },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">AI Resume Deep-Dive</h1>
          <div className="flex gap-4">
            <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
            <Button><Share2 className="w-4 h-4 mr-2" /> Share</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader><CardTitle>Overall Score</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center py-8">
              <div className="text-8xl font-black">{resume.atsScore}</div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardContent className="h-[400px] pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <Radar name="Candidate" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
