"use client";

import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, Target, Users, TrendingUp, Plus, ArrowRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResume() {
      if (user) {
        try {
          const res = await fetch(`/api/resume?userId=${user.id}`);
          if (res.ok) {
            const data = await res.json();
            setResumeData(data);
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

  if (authLoading || loading) return null;

  const skillData = [
    { name: "Frontend", value: 85, color: "#4f46e5" },
    { name: "Backend", value: 65, color: "#06b6d4" },
    { name: "DevOps", value: 45, color: "#8b5cf6" },
    { name: "Database", value: 70, color: "#10b981" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-muted-foreground">Welcome back, {user?.firstName}!</p>
          </div>
          <Link href="/upload"><Button className="gap-2"><Plus className="w-4 h-4" /> Update Resume</Button></Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<FileCheck className="text-blue-500" />} 
            label="ATS Score" 
            value={resumeData ? `${resumeData.atsScore}/100` : "N/A"} 
            href="/analyzer"
          />
          <StatCard 
            icon={<Target className="text-green-500" />} 
            label="Job Matches" 
            value={resumeData ? "24" : "0"} 
            href="/recommendations"
          />
          <StatCard 
            icon={<Users className="text-purple-500" />} 
            label="Profile Views" 
            value="156" 
            href="/profile"
          />
          <StatCard 
            icon={<TrendingUp className="text-orange-500" />} 
            label="App. Response" 
            value="18%" 
            href="/notifications"
          />
        </div>

        {resumeData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Skill Proficiency</CardTitle>
                  <Link href="/analyzer" className="text-xs text-primary flex items-center gap-1 hover:underline">
                    View full report <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={skillData} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                        {skillData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="p-12 text-center bg-secondary/20 border-dashed border-2">
            <h3 className="text-xl font-bold mb-4">No Resume Data Found</h3>
            <p className="text-muted-foreground mb-6">Upload your resume to unlock personalized AI insights and job matches.</p>
            <Link href="/upload"><Button size="lg">Upload Your Resume</Button></Link>
          </Card>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, href }) {
  return (
    <Link href={href || "#"}>
      <Card className="hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer">
        <CardContent className="p-6">
          <div className="p-2 bg-secondary rounded-lg w-fit mb-4">{icon}</div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </CardContent>
      </Card>
    </Link>
  );
}
