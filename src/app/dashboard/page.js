"use client";

import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  FileCheck, 
  Target, 
  Search,
  ExternalLink,
  ChevronRight,
  Plus
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell,
  PieChart,
  Pie
} from "recharts";
import { useState } from "react";
import Link from "next/link";

const data = [
  { name: "Frontend", value: 85, color: "#4f46e5" },
  { name: "Backend", value: 65, color: "#06b6d4" },
  { name: "DevOps", value: 45, color: "#8b5cf6" },
  { name: "Database", value: 70, color: "#10b981" },
];

const matchData = [
  { name: "Matched", value: 75, color: "#4f46e5" },
  { name: "Missing", value: 25, color: "#e2e8f0" },
];

const recentJobs = [
  { title: "Senior React Developer", company: "Meta", match: "98%", type: "Remote" },
  { title: "Frontend Engineer", company: "Stripe", match: "94%", type: "Hybrid" },
  { title: "Full Stack Engineer", company: "Vercel", match: "89%", type: "Remote" },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-muted-foreground">Welcome back, Alex! Here's what's happening with your job search.</p>
          </div>
          <Link href="/upload">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Update Resume
            </Button>
          </Link>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<FileCheck className="text-blue-500" />} 
            label="ATS Score" 
            value="85/100" 
            trend="+5% from last month"
          />
          <StatCard 
            icon={<Target className="text-green-500" />} 
            label="Job Matches" 
            value="24" 
            trend="12 new today"
          />
          <StatCard 
            icon={<Users className="text-purple-500" />} 
            label="Profile Views" 
            value="156" 
            trend="+12% weekly"
          />
          <StatCard 
            icon={<TrendingUp className="text-orange-500" />} 
            label="App. Response" 
            value="18%" 
            trend="Above average"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Skill Analysis Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Skill Proficiency</CardTitle>
              <CardDescription>Based on your resume analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false}
                      width={80}
                    />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2 border border-border shadow-sm rounded-lg text-xs font-bold">
                              {payload[0].value}%
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Overall Match */}
          <Card>
            <CardHeader>
              <CardTitle>Market Readiness</CardTitle>
              <CardDescription>Average match for your roles.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pt-4">
              <div className="h-[200px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={matchData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {matchData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">75%</span>
                  <span className="text-xs text-muted-foreground uppercase">Ready</span>
                </div>
              </div>
              <div className="mt-4 space-y-2 w-full">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Keyword Match</span>
                  <span className="font-medium text-green-500">Strong</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium text-blue-500">Perfect</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium text-orange-500">Flexible</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Matches Table-like list */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Recommended Jobs</CardTitle>
              <CardDescription>Jobs that perfectly match your profile.</CardDescription>
            </div>
            <Link href="/recommendations">
              <Button variant="outline" size="sm" className="gap-2">
                View All <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-secondary/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">
                      {job.company[0]}
                    </div>
                    <div>
                      <h4 className="font-bold group-hover:text-primary transition-colors">{job.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{job.company}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary">{job.match} Match</div>
                      <div className="text-xs text-muted-foreground">High Relevance</div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, trend }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-secondary rounded-lg">
            {icon}
          </div>
          <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full">
            {trend}
          </span>
        </div>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}
